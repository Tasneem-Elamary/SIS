import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logisticAction } from '../../state/actions';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import MainNavBar from '../shared/mainNavbar';
import RegisterationNavbar from '../shared/registerationNavbar';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter } from 'reactstrap';
import './logistics.scss'
import { Link } from 'react-router-dom';
interface LogisticsProps {
  getAllRoomsAction: () => Promise<any>;
}

const Logistics = ({ getAllRoomsAction }: LogisticsProps) => {
  const [roomValues, setRoomValues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogistics = async () => {
      try {
        const fetchedLogistics = await getAllRoomsAction();

        if (fetchedLogistics) {
          console.log(fetchedLogistics);
          setRoomValues(fetchedLogistics);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchLogistics();
  }, [getAllRoomsAction]);

  const handleNavigatingScheduleClick = (roomId:string) => {
    navigate(`/roon-schedule/${roomId}`);
  };

  return (
    <div className="container555">
    <RegisterationNavbar />
    <MainNavBar activeItem="Logistics" />

    <div className="fixed-header">
        <div style={{ marginLeft: "10px" }} className='header-content'>
            <h3>Locations</h3>
        </div>
    </div>

    <div className="logistics-container">
        <ul className='room-grid'>
            {roomValues.map((room: any) => (
                <li className='room-item' key={room.id}>
                    <text className='room-type'>{room.type} </text>
                    <Link to={`/room-schedule/${room.id}`} className="no-underline"><span>{room.code}</span></Link> 
                </li>
            ))}
        </ul>
    </div>
</div>

  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getAllRoomsAction: logisticAction.getAllRoomsAction,     },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Logistics);
