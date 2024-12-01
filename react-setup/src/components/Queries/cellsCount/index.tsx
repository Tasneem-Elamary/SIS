import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { courseAction, scheduleAction } from '../../../state/actions';
import MainNavBar from '../../shared/mainNavbar';
import RegisterationNavbar from '../../shared/registerationNavbar';
import OueriesNavBar from '../Oueries Navbar';
import ViewTable from '../../shared/viewTable/ViewTable';
import { CourseInstructorType } from '../../../interfaces/domain';

const CellsCount = ({ getAllSchedulesAction }: any) => {
  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const fetchedSchedules = await getAllSchedulesAction();
        console.log("Fetched schedules",fetchedSchedules);

        if (fetchedSchedules) {
          const data = fetchedSchedules.schedules.map((schedule: any) => {
            return {
              cell:schedule.cell,
              courseName: schedule.Course.name,
              courseCode: schedule.Course.code,
              groupCode: schedule.Group.groupCode,
              sectionCode: schedule.Section.sectionCode,
              roomCode: schedule.Room.code,
              offerType:schedule.scheduleType,
              count:  schedule.Section.capacity,
              capacity: schedule.Section.capacity,
              
              
            };
          });
          setSchedules(data);
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [getAllSchedulesAction]);

  const handleExportFileSubmit = () => {
    try {
      const resultData = schedules;
      if (resultData) {
        const csvData = convertToCSV(resultData);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cells count.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (error) {
      console.error('Error exporting file:', error);
    }
  };

  const convertToCSV = (data: any) => {
    const headers = [ 'Cell id', 'Course Name', 'Course code','Group code','Section Code','Room','Offer type','count','capacity'];
    const rows = data.map((item: any) => [item.cell,item.courseName,item.courseCode, item.groupCode,item.sectionCode,item.roomCode,item.offerType,item.count,item.capacity,]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    return csvContent;
  };

  if (loading) return <div>Loading courses...</div>;

  return (
    <div>
      <RegisterationNavbar />
      <MainNavBar activeItem="Queries" />
      <OueriesNavBar activeItem="CreateAnOverload" />
      <div className="fixed-title">
        <div style={{ marginLeft: "10px" }} className='header-content'>
          <h5>Cells count</h5>
          <Button color='primary' className='title-button' onClick={handleExportFileSubmit}>
            Export file
          </Button>
        </div>
        <hr />
      </div>
      <div className="inside-container">
        <ViewTable 
          headers={["",  'Cell id', 'Course Name', 'Course code','Group code','Section Code','Room','Offer type','count','capacity']} 
          features={['cell','courseName','courseCode', 'groupCode','sectionCode','roomCode','offerType','count','capacity']}
          rowValues={schedules}
          showSearchBars={false}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  courses: state?.course?.courses,
});

const mapDispatchToProps = {
  getAllSchedulesAction: scheduleAction.getAllSchedules,
};

export default connect(mapStateToProps, mapDispatchToProps)(CellsCount);
