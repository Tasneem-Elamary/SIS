import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logisticAction } from '../../../state/actions';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import MainNavBar from '../mainNavbar';
import RegisterationNavbar from '../registerationNavbar';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter } from 'reactstrap';
import './logistics.scss'
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
<div className='logistics-container'>

     <div><ul>
        {roomValues.map((room: any) => (
          <li key={room.id}>{room.type} {room.code}</li>
        ))}
      </ul></div> 
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
