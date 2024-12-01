import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { courseAction } from '../../../state/actions';
import MainNavBar from '../../shared/mainNavbar';
import RegisterationNavbar from '../../shared/registerationNavbar';
import OueriesNavBar from '../Oueries Navbar';
import ViewTable from '../../shared/viewTable/ViewTable';
import { CourseInstructorType, StudentType } from '../../../interfaces/domain';
import studentAction from '../../../state/actions/student.action';
import CourseEnrollmentType from '../../../interfaces/domain/courseEnrollment';

const PendingStudents = ({ getPendingEnrollmentsAction }: any) => {
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const fetchedStudents = await getPendingEnrollmentsAction();
        console.log(fetchedStudents);

        if (fetchedStudents) {
          const enrollments = fetchedStudents.data.map((student: any) => {//need to change
            return {
              ...student,
              
            };
          });
          setEnrollments(enrollments);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [getPendingEnrollmentsAction]);

  const handleExportFileSubmit = () => {
    try {
      const resultData = enrollments;
      if (resultData) {
        const csvData = convertToCSV(resultData);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pending students.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (error) {
      console.error('Error exporting file:', error);
    }
  };

  const convertToCSV = (data: any) => {
    const headers = ['Student Code', 'Students Name', 'Course Name'];
    const rows = data.map((item: any) => [item.courseCode, item.courseName, item.instructorFullName]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    return csvContent;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <RegisterationNavbar />
      <MainNavBar activeItem="Queries" />
      <OueriesNavBar activeItem="CreateAnOverload" />
      <div className="fixed-title">
        <div style={{ marginLeft: "10px" }} className='header-content'>
          <h5>Pending students</h5>
          <Button color='primary' className='title-button' onClick={handleExportFileSubmit}>
            Export file
          </Button>
        </div>
        <hr />
      </div>
      <div className="inside-container">
        <ViewTable 
          headers={["", 'Student Code', 'Students Name', 'Course Name']} 
          features={['studentCode', 'studentName', 'courseName']}
          rowValues={enrollments}
          showSearchBars={false}
        />
      </div>
    </div>
  );
};

 

const mapDispatchToProps = {
    getPendingEnrollmentsAction: studentAction.getPendingEnrollmentsAction,
};

export default connect(null, mapDispatchToProps)(PendingStudents);
