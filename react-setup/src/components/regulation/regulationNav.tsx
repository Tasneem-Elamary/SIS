import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import './style.scss';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import regulationAction from '../../state/actions/regulation.action';

interface RegulationsProps {
  getAllRegulationsAction: () => Promise<any>;
}

const Regulations = ({ getAllRegulationsAction }: RegulationsProps) => {
 console.log(localStorage.getItem('token'))
  const [regulations, setRegulations] = useState<any[]>([]);
  const { regulationId } = useParams<{ regulationId: string }>(); 
  const navigate = useNavigate();
  const [activeRegulation, setActiveRegulation] = useState<string | undefined>(regulationId); 
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

  const handleNavItemClick = (id: string) => {
    setActiveRegulation(id); 
    navigate(`/regulation/${id}`); 
  };

  return (
        <Navbar expand="md" className="sub-navbar">
          <Nav className="me-auto" navbar>
            {regulations.map((regulation: any) => (
              <NavItem key={regulation.id}>
                <NavLink
                  className={regulation.id === regulationId ?"nav-link-active" : "nav-link-custom"}  
                  onClick={() => handleNavItemClick(regulation.id)}  
                >
                  <div >{regulation.code}</div>
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Navbar>
 
 
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
