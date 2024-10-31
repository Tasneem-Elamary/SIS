import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { scheduleAction } from '../../state/actions';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import MainNavBar from '../shared/mainNavbar';
import RegisterationNavbar from '../shared/registerationNavbar';
import { Nav, NavItem, Table } from 'reactstrap';
import './schedule.scss';
import ViewTable from '../shared/viewTable/ViewTable';
import 'bootstrap/dist/css/bootstrap.min.css';
 

const ScheduleNavBar = ({ activeNav }) => {
    

    return (
 
        <Nav pills>
            <NavItem 
              key={1} 
              className={activeNav === 1 ? 's-active' : 's-not-active'}
 
            >
                <NavLink className='nav-link-text' to="/update-schedules">
                   Edit Schedules
                </NavLink>
            </NavItem>
            
            <NavItem 
              key={2} 
              className={activeNav === 2 ? 's-active' : 's-not-active'}
              
            >
                <NavLink  className='nav-link-text'to="/all-schedules">
                    All schedules
                </NavLink>
            </NavItem>
        </Nav>
 
 
    );
};


export default ScheduleNavBar;
