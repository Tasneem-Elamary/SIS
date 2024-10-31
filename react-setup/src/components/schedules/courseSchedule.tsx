import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { courseAction, scheduleAction } from '../../state/actions';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import MainNavBar from '../shared/mainNavbar';
import RegisterationNavbar from '../shared/registerationNavbar';
import { Table } from 'reactstrap';
import './schedule.scss';
import CoursesNavlBar from '../Course/courseNavbar';
import CoursesLevelNavBar from '../Course/CoursesLevelNavbar';
import { CourseType } from '../../interfaces/domain';

interface CourseScheduleProps {
    getCourseSchedule: (courseId: string) => Promise<{ schedules: any[], courseData: any }>;
}

const CourseSchedule = ({ getCourseSchedule }: CourseScheduleProps) => {
    const [schedules, setSchedules] = useState<any[]>([]);
    const [courseData, setCourseData] = useState<any>(null);
    const [times, setTimes] = useState<string[]>([]); 
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [course, setCourse] = useState<CourseType>();
    
    useEffect(() => {
        const fetchCourseSchedule = async () => {
            try {
                const { schedules, courseData } = await getCourseSchedule(courseId);

                if (schedules?.length === 0) {
                    console.log("No schedules to preview");
                } else {
                    console.log("courseData result:", courseData);

                    const uniqueTimes = Array.from(new Set(schedules.map((schedule: any) => {
                        return `${schedule.Slot.startTime.slice(0, 5)} - ${schedule.Slot.endTime.slice(0, 5)}`;
                    })));

                    setTimes(uniqueTimes.sort());
                }

                setSchedules(schedules);
                setCourseData(courseData);
            } catch (error) {
                console.error('Error fetching course schedule:', error);
            }
        };

        fetchCourseSchedule();

    }, [courseId, getCourseSchedule]);

    const handleBackClick = () => {
        navigate('/logistics');
    };

    const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const findSchedule = (day: string, startTime: string, endTime: string) => {
        return schedules.find((schedule: any) => {
            const scheduleDay = schedule.Slot.day;
            const scheduleStartTime = schedule.Slot.startTime.slice(0, 5);
            const scheduleEndTime = schedule.Slot.endTime.slice(0, 5);
            return scheduleDay === day && scheduleStartTime === startTime && scheduleEndTime === endTime;
        });
    };

    const renderScheduleDetails = (schedule: any) => {
        if (!schedule) return null;
        const { Instructor, scheduleType, Group, Section } = schedule;
        return (
            <div>
                <div className='black-bold'><span className='blue-bold'>{Instructor.firstName + ' ' + Instructor.lastName} </span></div>
                <div className='blue-bold'>Group: {Group.groupCode} | Section: {Section.sectionCode}</div>
                <div className='blue-bold'>{scheduleType}</div>
            </div>
        );
    };

    return (
        <div className="page-container">
            <RegisterationNavbar />
            <MainNavBar activeItem="Courses" />
            <CoursesLevelNavBar activeItem={1} />
            <div className='container-table'>
                <div className="fixed-header">
                    <div style={{ marginLeft: "10px" }} >
                        <h3>{course?.code}</h3>
                        <CoursesNavlBar activeItem="Offer state" id={undefined} bylawId={undefined} />
                    </div>
                    <hr />
                </div>

                <Table bordered striped>
                    <thead className='table-title'>
                        <tr style={{ border: 'none' }}>
                            <th style={{ border: 'none' }}>Day</th>
                            {times.map((time, index) => (
                                <th style={{ border: 'none' }} key={index}>{time}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="schedules">
                        {days.map((day, dayIndex) => (
                            <tr key={dayIndex}>
                                <td className='black-bold'>{day}</td>
                                {times.map((time, timeIndex) => {
                                    const [startTime, endTime] = time.split(' - ');
                                    const schedule = findSchedule(day, startTime, endTime);
                                    return (
                                        <td key={timeIndex}>
                                            {renderScheduleDetails(schedule)}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getCourseSchedule: scheduleAction.getCourseSchedule,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(CourseSchedule);
