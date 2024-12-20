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



function ListOfSelfStudyOROverloadStudents({activeItem}) {
    const { id } = useParams();
    const [rowValues, setrowValues] = useState<StudentType[]>([]);
    const [instructor, setInstructor] = useState<InstructorType>();
    const role = localStorage.getItem('role');

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
          // Fetching logic based on userType
          let fetchedInstructor;
          if (activeItem === 'selfstudy') {
            fetchedInstructor = await dispatch(instructorAction.getselfStudyStudentsAction(id)); // Adjust this if fetching is different
          } else if (activeItem=== 'overload') {
            // Assuming a different fetch action for doctors, replace this with the actual action if different
            fetchedInstructor= await dispatch(instructorAction.getOverloadStudentsAction(id));
          }
    
          // Ensure we only set values that are not undefined
          if (fetchedInstructor) {
            setInstructor(fetchedInstructor)
            const transformedStudents = fetchedInstructor.Students.flatMap(student =>
              student.Courses.map(course => ({
                  ...student,
                  code: course.code // add the `cell` property from the schedule to each student entry
              }))
          );
  
          setrowValues(transformedStudents);
          }
        };
    
        fetchUsers();
      }, [dispatch]);


      const handleAcceptClick = async(Row) => {
       
        setrowValues((prevRows) => {
          return prevRows.filter((row) => {
            
            return !(row.id === Row.id && row.code===Row.code);
          });
        });
        const fetchedStudent = await dispatch(instructorAction.approveselfstudyOROverloadRequest(Row.id,Row.code,activeItem));
      };
    
      const handleDeclineClick = async(Row) => {
      
        setrowValues((prevRows) => {
          return prevRows.filter((row) => {
            
            return !(row.id === Row.id && row.code===Row.code);
          });
        });
        const fetchedStudent = await dispatch(instructorAction.rejectedselfstudyOROverloadRequest(Row.id,Row.code,activeItem));
     
      };
    return (
        <div className="student-list-page">
            <RegisterationNavbar />
            <MainNavBar activeItem="Users" />
            {role === 'faculty admin' && ( <UsersNavBar activeItem="Lecturer" />)}
            <div className="content-section">

                <div className="user-header">
                <h3>Eng {`${instructor?.firstName} ${instructor?.lastName}`}</h3>
                    <InstructorNavbar activeItem={activeItem}  id={id}/>

                </div>

                {/* Search Bar */}
                <div className="search-section">
                    <h4>Student</h4>
                    <input type="text" placeholder="Search..." />
                </div>

                {/* Table Section */}
                <div className="table-section">
                    <ViewTable
                        headers={["", "Student Code" ,"GPA","gained Hours","course Code","Decision"]}
                        features={["studentCode", "GPA","gainedHours","code"]}
                        rowValues={rowValues}
                        showSearchBars={false}// Replace with actual data
                        arraycolumn="code"
                        onAccept={handleAcceptClick}  // Pass the accept handler as a prop
                        onDecline={handleDeclineClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListOfSelfStudyOROverloadStudents;