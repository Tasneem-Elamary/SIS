import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { scheduleAction } from '../../state/actions';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import MainNavBar from '../shared/mainNavbar';
import RegisterationNavbar from '../shared/registerationNavbar';
import { Button, Input } from 'reactstrap';
import './schedule.scss';
import ViewTable from '../shared/viewTable/ViewTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScheduleNavBar from './scheduleNav';

interface SchedulesProps {
    getAllSchedules: () => Promise<{ schedules: any[] }>;
    uploadCsvSchedules: (data: FormData) => Promise<void>;
}

const UpdateSchedules = ({ getAllSchedules, uploadCsvSchedules }: SchedulesProps) => {
    const [schedules, setSchedules] = useState<any[]>([]);
    const [times, setTimes] = useState<string[]>([]);
    const [activeNav, setActiveNav] = useState(1);
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const navigate = useNavigate();
  
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const getScheduleDetails = (schedules: any[]): any[] => {
        if (schedules.length === 0) return [];
        return schedules.map((schedule) => ({
            id: schedule.id,
            courseCode: schedule.Course.code,
            courseName: schedule.Course.name,
            roomCode: schedule.Room.code,
            instructorName: `${schedule.Instructor.firstName} ${schedule.Instructor.lastName}`,
            groupCode: schedule.Group.groupCode,
            sectionCode: schedule.Section.sectionCode,
            scheduleType: schedule.scheduleType,
            day: schedule.Slot.day,
            startTime: schedule.Slot.startTime.slice(0, 5),
            endTime: schedule.Slot.endTime.slice(0, 5),
            capacity: schedule.Room.capacity
        }));
    };

    useEffect(() => {
        const fetchAllSchedule = async () => {
            try {
                const { schedules } = await getAllSchedules();
                if (schedules.length === 0) {
                    console.log('No schedules found for this room.');
                } else {
                    const uniqueTimes = Array.from(new Set(schedules.map((schedule: any) => {
                        return `${schedule.Slot.startTime.slice(0, 5)} - ${schedule.Slot.endTime.slice(0, 5)}`;
                    })));
                    setTimes(uniqueTimes.sort());
                }
                setSchedules(schedules);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };
        fetchAllSchedule();
    }, [getAllSchedules]);

    const handleFileUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setFile(selectedFile);
        setFileError(null);

        if (selectedFile) {
            handleImport(selectedFile);
        }
    };

    const handleImport = async (selectedFile: File) => {
        if (!selectedFile) {
            setFileError('Please select a CSV file to import.');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            await uploadCsvSchedules(formData);
            console.log("Schedule uploaded");
            // navigate('/view-schedules');  
        } catch (error) {
            setFileError('Failed to upload the file.');
        }
    };

    const navClick = (id: number): void => {
        setActiveNav(id);
    };

    return (
        <div className='page-container'>
            <RegisterationNavbar />
            <MainNavBar activeItem="Schedules" />
            <ScheduleNavBar activeNav={1} />
            <div className="fixed-title" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <h3>Schedule</h3>
                <div>
                   
                    <Button color="primary" onClick={() => fileInputRef.current?.click()}>
                        CSV Schedule
                    </Button>
                    <Input
                        type='file'
                        accept='.csv'
                        innerRef={fileInputRef} // Referencing the input
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                    />
                </div>
                {fileError && <p className="error">{fileError}</p>}
            </div>
            <div className='inside-container'>
                <hr />
                <ViewTable
                    headers={["", "day", "start time", "end time", "Course Code", "Room code", "Schedule type", "capacity"]}
                    features={["day", "startTime", "endTime", "courseCode", "roomCode", "scheduleType", "capacity"]}
                    rowValues={getScheduleDetails(schedules)}
                    showSearchBars={true}
                    handleOnDeleteAction={scheduleAction.deleteSchedulesAction}
                />
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getAllSchedules: scheduleAction.getAllSchedules,
            uploadCsvSchedules: scheduleAction.uploadCsvSchedules,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(UpdateSchedules);
