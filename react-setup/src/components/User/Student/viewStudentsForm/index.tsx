import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import studentAction from '../../../../state/actions/student.action';
import './style.scss';
import ViewTable from '../../../shared/viewTable/ViewTable';
import { StudentType, UserType } from '../../../../interfaces/domain';
import MainNavBar from '../../../shared/mainNavbar';
import SubNavBar from '../../UsersNavbar';
import { useNavigate } from 'react-router-dom';
import RegisterationNavbar from '../../../shared/registerationNavbar';

function AllStudents() {
  const [rowValues, setRowValues] = useState<(StudentType & { User: UserType })[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await dispatch(studentAction.getAllStudentsAction());
      setRowValues(data);
    };

    fetchStudents();
  }, [dispatch]);

  const handleAddStudentClick = () => {
    navigate('/add-student'); // Use the navigate function to go to the "Add Student" page
  };

  return (
    <div className='page-container'>
      <RegisterationNavbar />
      <MainNavBar activeItem="Users"/>
      <SubNavBar activeItem="Student"/>
     
        
          <div className="fixed-title">
            <div style={{ marginLeft: "10px" }} className='header-content'>
              <h3>Students</h3>
              <Button color='primary' className='add-button' onClick={handleAddStudentClick}>Add Student</Button>
            </div>
            <hr />
          </div>
          <div className="inside-container">
          <ViewTable 
            headers={["", "Student Code", "Name", "Email"]} 
            features={["studentCode", "name", "email"]} 
            rowValues={rowValues.map(student => ({
              ...student,
              email: student.User.email,
            }))}
            showSearchBars={false}
          />
        </div>
      </div>
   
  );
}

export default AllStudents;
