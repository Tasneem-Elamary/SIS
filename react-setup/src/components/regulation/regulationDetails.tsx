//import RegisterationNavbar from '../../../shared/registerationNavbar';

import { Button, Card, Nav, NavItem } from 'reactstrap';

import './style.scss';
import { useEffect, useState } from 'react';
//import { RegulationType } from '../../../../interfaces/domain'; // Update with the correct type if needed
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import regulationAction from '../../state/actions/regulation.action';
import MainNavBar from '../shared/mainNavbar';
import RegisterationNavbar from '../shared/registerationNavbar';
import ViewTable from '../shared/viewTable/ViewTable';

function RegulationDetails({ userType, path }: any) {
  const [rowValues, setrowValues] = useState<any[]>([]); // Adjust type based on regulation structure

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegulationDetails = async () => {
      // Fetching logic using regulation action
      const fetchedRegulations = await dispatch(regulationAction.viewRegulationDetailsAction());

      // Ensure we only set values that are not undefined
      if (fetchedRegulations) {
        setrowValues(fetchedRegulations);
      }
    };

    fetchRegulationDetails();
  }, [dispatch]);

  const handleAddLecturerClick = () => {
    navigate(path);
  };

  return (
    <div className='container1'>
      <RegisterationNavbar />
      <MainNavBar activeItem="Regulations" />
    { // <UsersNavBar activeItem={userType} />
    }
 <div className='container2' >
 <Nav tabs>
{      /*  {fetchedRegulations.map((regulation) => (
          <NavItem key={regulation.code}>
            <NavLink to={''}
            >
              {tab}
            </NavLink>
          </NavItem>
        ))}*/}
      </Nav>
 </div>
      </div>

  );
}

export default RegulationDetails;
