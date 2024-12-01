import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { courseAction } from '../../../state/actions';
import MainNavBar from '../../shared/mainNavbar';
import RegisterationNavbar from '../../shared/registerationNavbar';
import OueriesNavBar from '../Oueries Navbar';
import ViewTable from '../../shared/viewTable/ViewTable';
import { CourseInstructorType } from '../../../interfaces/domain';

const CoursesInstructors = ({ getCoursesInstructorsAction }: any) => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getCoursesInstructorsAction();
        if (fetchedCourses) {
          const coursesInstructors = fetchedCourses.map((course: CourseInstructorType) => {
            return {
              ...course,
              instructorFullName: `${course.instructorFirstName} ${course.instructorLastName}`,
            };
          });
          setCourses(coursesInstructors);
        }
        console.log(fetchedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [getCoursesInstructorsAction]);

  const handleExportFileSubmit = () => {
    try {
      const resultData = courses;
      if (resultData) {
        const csvData = convertToCSV(resultData);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'CoursesInstructors.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (error) {
      console.error('Error exporting file:', error);
    }
  };

  const convertToCSV = (data: any) => {
    const headers = [ 'Course Code', 'Course Name', 'Instructor Name'];
    const rows = data.map((item: any) => [item.courseCode, item.courseName, item.instructorFullName]);
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
          <h5>Courses Instructors</h5>
          <Button color='primary' className='title-button' onClick={handleExportFileSubmit}>
            Export file
          </Button>
        </div>
        <hr />
      </div>
      <div className="inside-container">
        <ViewTable 
          headers={["", 'Course Code', 'Course Name', 'Instructor Name']} 
          features={['courseCode', 'courseName', 'instructorFullName']}
          rowValues={courses}
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
  getCoursesInstructorsAction: courseAction.getcoursesInstructorsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesInstructors);
