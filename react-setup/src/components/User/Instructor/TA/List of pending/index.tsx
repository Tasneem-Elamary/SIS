import RegisterationNavbar from '../../../../shared/registerationNavbar';
import MainNavBar from '../../../../shared/mainNavbar';
import UsersNavBar from '../../../UsersNavbar';
import CreateLecturerForm from '../../createLecturerForm';
import { Button } from 'reactstrap';
import ViewTable from '../../../../shared/viewTable/ViewTable';
import InstructorNavbar from '../TANavbar'
import './style.scss'
import { useEffect, useState } from 'react';
import { InstructorType, StudentType, UserType } from '../../../../../interfaces/domain';
import { useDispatch, useSelector } from 'react-redux';
import { instructorAction } from '../../../../../state/actions';
import { useParams } from 'react-router-dom';



function ListOfPendingStudents() {
    const { id } = useParams();
    const [rowValues, setrowValues] = useState<StudentType[]>([]);
    const [instructor, setInstructor] = useState<InstructorType>();
    const role = localStorage.getItem('role');

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchStudents = async () => {
            const fetchedInstructor = await dispatch(instructorAction.getPendingStudentsAction(id));
            setInstructor(fetchedInstructor)

           const transformedStudents = fetchedInstructor.Students.flatMap(student =>
            student.Schedules.map(schedule => ({
                ...student,
                cell: schedule.cell 
            }))
        );

        setrowValues(transformedStudents);
        };

        fetchStudents();
    }, [dispatch]);


     const handleAcceptClick = async(Row) => {
  
    setrowValues((prevRows) => {
        return prevRows.filter((row) => {
          
          return !(row.id === Row.id && row.cell===Row.cell);
        });
      });
    const fetchedStudent = await dispatch(instructorAction.approveRegularRequest(Row.id,Row.cell));
  };

  const handleDeclineClick =async (Row) => {
  
    setrowValues((prevRows) => {
      return prevRows.filter((row) => {
        
        return !(row.id === Row.id && row.cell===Row.cell);
      });
    });
    const fetchedStudent = await dispatch(instructorAction.rejectRegularRequest(Row.id,Row.Schedules[arrayIndex].cell));
 
  };
    return (
        <div className="student-list-page">
            <RegisterationNavbar />
            <MainNavBar activeItem="Users" />
            {role === 'faculty admin' && ( <UsersNavBar activeItem="Lecturer" />)}
            <div className="content-section">

                <div className="user-header">
                <h3>Eng {`${instructor?.firstName} ${instructor?.lastName}`}</h3>
                    <InstructorNavbar activeItem="List of pending"  id={id}/>

                </div>

                {/* Search Bar */}
                <div className="search-section">
                    <h4>Student</h4>
                    <input type="text" placeholder="Search..." />
                </div>

                {/* Table Section */}
                <div className="table-section">
                    <ViewTable
                        headers={["", "student Code","Name" ,"Schedule Cell","Decision"]}
                        features={["studentCode", "name", "cell"]}
                        rowValues={rowValues}
                        showSearchBars={false}// Replace with actual data
                        arraycolumn='cell'
                        onAccept={handleAcceptClick}  // Pass the accept handler as a prop
                       onDecline={handleDeclineClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListOfPendingStudents;