import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import StudentNavlBar from './studentNavBar';
import RegistrationNavbar from '../../../shared/registerationNavbar';
import studentAction from '../../../../state/actions/student.action';
import ViewSchedule from '../../../shared/viewTable/viewSchedule';


interface AllSchedulesProps {
    getAllSchedules: (studentId: string) => Promise<{ schedules: any[] }>;
 
}

const StudentSchedule = ({ getAllSchedules }: AllSchedulesProps) => {
    const [schedules, setSchedules] = useState<any[]>([]);
    const [times, setTimes] = useState<string[]>([]);

    const navigate = useNavigate();
    const studentId = localStorage.getItem('id')??'';

    useEffect(() => {
        const fetchAllSchedule = async () => {
 
            try {
                const { schedules } = await getAllSchedules(studentId);
                setSchedules
                console.log('role', localStorage.getItem('id'));
                console.log('schedules', schedules);

                if (!Array.isArray(schedules)) {
                    console.error('Schedules is not an array:', schedules);
                    return;
                }

                if (schedules.length === 0) {
                    console.log('No schedules found for this room.');
                } 

                setSchedules(schedules);

            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };

        fetchAllSchedule();
    }, [getAllSchedules]);





    return (
        <div className="container555">
            <RegistrationNavbar />
            <StudentNavlBar activeItem="student Schedule" />

            <div className="room-schedule-container">
                <ViewSchedule schedules={schedules} />
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getAllSchedules: studentAction.getStudnetScheduleAction,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(StudentSchedule);
