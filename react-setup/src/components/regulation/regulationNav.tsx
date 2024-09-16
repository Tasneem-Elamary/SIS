import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import './style.scss';
import regulationAction from '../../state/actions/regulation.action';
import MainNavBar from '../shared/mainNavbar';
import RegisterationNavbar from '../shared/registerationNavbar';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

interface RegulationsProps {
  getAllRegulationsAction: () => Promise<any>;
}

const Regulations = ({ getAllRegulationsAction }: RegulationsProps) => {
  const [regulations, setRegulations] = useState([]);
  const navigate = useNavigate();
  const [activeRegulation, setActiveRegulation] = useState<string | null>(null);

  const handleNavItemClick = (regulationId: string) => {
    setActiveRegulation(regulationId);
  };
  useEffect(() => {
    const fetchRegulations = async () => {
      try {
        const fetchedRegulations = await getAllRegulationsAction();
        
        if (fetchedRegulations) {
          console.log(fetchedRegulations);
          setRegulations(fetchedRegulations);
        }
      } catch (error) {
        console.error('Error fetching regulations:', error);
      }
    };

    fetchRegulations();
  }, [getAllRegulationsAction]);

  const handleNavigation = (regulationId: string) => {
    navigate(`/regulation-details/${regulationId}`);
  };

  return (
    <div className="container555">
      <RegisterationNavbar />
      <MainNavBar activeItem="Regulations" regulations={regulations}/>

      {/* Sub-navbar with mapped regulations */}
      <Navbar expand="md" className="sub-navbar">
        <Nav className="me-auto" navbar>
        {regulations.map((regulation: any) => (
            <NavItem key={regulation.id}>
            <NavLink 
              href={`/regulation/${regulation.id}`} 
              className={`nav-link-custom ${activeRegulation === regulation.id ? 'active-nav-item' : ''}`} 
              onClick={() => handleNavItemClick(regulation.id)}
            
            >
              {regulation.code}
            </NavLink>
          </NavItem>
        ))}

        </Nav>
      </Navbar>

   
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getAllRegulationsAction: regulationAction.viewAllRegulationsAction,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Regulations);
