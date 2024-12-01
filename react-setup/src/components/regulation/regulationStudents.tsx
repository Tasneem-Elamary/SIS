import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import './style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { StudentType, UserType } from '../../interfaces/domain';
import ViewTable from '../shared/viewTable/ViewTable';
import RegulationNav from './regulationNav';
import regulationAction from '../../state/actions/regulation.action';
import MainNavBar from '../shared/mainNavbar';
import RegisterationNavbar from '../shared/registerationNavbar';
 
function RegulationStudents({getAllStudentsAction}:any) {
  const [rowValues, setRowValues] = useState<(StudentType & { User: UserType })[]>([]);

  const role = localStorage.getItem('role');

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { regulationId } = useParams<string>();
  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getAllStudentsAction(regulationId);
      console.log("Data",data)
      setRowValues(data);
    };

    fetchStudents();
  }, [dispatch]);

  const handleAddStudentClick = () => {
    navigate('/add-student'); 
  };

  return (
    <div className='page-container'>
            <RegisterationNavbar  />
            <MainNavBar activeItem="Regulations" />
<RegulationNav/>    
          <div className="fixed-title">
            <div style={{ marginLeft: "10px" }} className='header-content'>
              <h3>Regulation Students</h3>
                   </div>
            <hr />
          </div>
          <div className="inside-container">
{console.log('results', rowValues)}

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

const mapDispatchToProps = {
  getAllStudentsAction: regulationAction.viewRegulationStudentsAction,
 
};

export default connect(null, mapDispatchToProps) (RegulationStudents); 