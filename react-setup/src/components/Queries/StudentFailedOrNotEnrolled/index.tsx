import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { courseAction } from '../../../state/actions';
import MainNavBar from '../../shared/mainNavbar';
import RegisterationNavbar from '../../shared/registerationNavbar';
import OueriesNavBar from '../Oueries Navbar';
import studentAction from '../../../state/actions/student.action';

const StudentToEnrollInCourse = ({ getCourseAction, failedOrNotEnrolledAction }: any) => {
  const [withIdPrefix, setWithIdPrefix] = useState(false);
  const [withLastNSemesters, setWithLastNSemesters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getCourseAction();
        setCourses(fetchedCourses);
        console.log(fetchedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [getCourseAction]);

  const handleFormSubmit = async (values: any, bag: any) => {
    try {
      if (values) {
        const resultData = await failedOrNotEnrolledAction(values.overloadCourse);
        if (resultData) {
          // Convert the resultData to CSV format
          const csvData = convertToCSV(resultData);

          // Create a Blob from the CSV string
          const blob = new Blob([csvData], { type: 'text/csv' });

          // Create a link to download the Blob
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'failed_or_not_enrolled_courses.csv'; // Specify the file name
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
        bag.setSubmitting(false);
      } else {
        bag.setSubmitting(false);
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      bag.setSubmitting(false);
    }
  };

  // Function to convert data to CSV format
  const convertToCSV = (data: any) => {
    const headers = ['Course ID', 'Student Name', 'Gained Hours', 'GPA']; 
    const rows = data.map((item: any) => [item.courseId, item.name, item.gainedHours, item.GPA]); // Adjust the data structure according to API response

    console.log(rows)
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    return csvContent;
  };

  if (loading) return <div>Loading courses...</div>;

  return (
    <div>
      <RegisterationNavbar />
      <MainNavBar activeItem="Queries" />
      <OueriesNavBar activeItem="CreateAnOverload" />

      <div className="container" style={{ marginTop: '30px', marginLeft: '70px', marginRight: '70px', padding: '50px', backgroundColor: '#ffffff' }}>
        <h3 style={{ color: '#000000' }}>Student who failed or didn't take a specific course</h3>
        <hr />

        <Formik
          initialValues={{
            studentId: '',
            advisorName: '',
            overloadCourse: '',
            lastNSemesters: '',
          }}
          onSubmit={handleFormSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid }) => (
            <Form className="form" onSubmit={handleSubmit}>
              <FormGroup check>
                <Label check>
                  <Input 
                    type="checkbox" 
                    checked={withIdPrefix} 
                    onChange={() => setWithIdPrefix(!withIdPrefix)} 
                  />
                  Check if you want with ID prefix
                </Label>
              </FormGroup>

              <FormGroup check>
                <Label check>
                  <Input 
                    type="checkbox" 
                    checked={withLastNSemesters} 
                    onChange={() => setWithLastNSemesters(!withLastNSemesters)} 
                  />
                  Check if you want with active last n semesters
                </Label>
              </FormGroup>

              {withIdPrefix && (
                <FormGroup>
                  <Label for="studentId" style={{ color: '#000000' }}>Level</Label>
                  <Input
                    type="select"
                    name="studentId"
                    id="studentId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.studentId}
                    invalid={!!(errors.studentId && touched.studentId)}
                    style={{ width: '80%' }}
                  >
                    <option value="">Select a level</option>
                    {[1, 2, 3, 4, 5].map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </Input>
                  {errors.studentId && touched.studentId ? <FormFeedback>{errors.studentId}</FormFeedback> : null}
                </FormGroup>
              )}

              <FormGroup>
                <Label for="overloadCourse" style={{ color: '#000000' }}>Course Code/Name</Label>
                <Input
                  type="select"
                  name="overloadCourse"
                  id="overloadCourse"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.overloadCourse}
                  invalid={!!(errors.overloadCourse && touched.overloadCourse)}
                  style={{ width: '80%' }}
                >
                  <option value="">Select a course</option>
                  {courses && courses.map((course: any) => (
                    <option key={course.id} value={course.id}>
                      {course.code} - {course.name}
                    </option>
                  ))}
                </Input>
                {errors.overloadCourse && touched.overloadCourse ? <FormFeedback>{errors.overloadCourse}</FormFeedback> : null}
              </FormGroup>

              {withLastNSemesters && (
                <FormGroup>
                  <Label for="lastNSemesters" style={{ color: '#000000' }}>Last N Semesters</Label>
                  <Input
                    type="number"
                    name="lastNSemesters"
                    id="lastNSemesters"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastNSemesters}
                    invalid={!!(errors.lastNSemesters && touched.lastNSemesters)}
                    style={{ width: '80%' }}
                  />
                  {errors.lastNSemesters && touched.lastNSemesters ? <FormFeedback>{errors.lastNSemesters}</FormFeedback> : null}
                </FormGroup>
              )}

              <div className="d-flex justify-content-start">
                <Button color="primary" className="create-button" disabled={isSubmitting || !isValid}>
                  Export File
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  courses: state?.course?.courses, 
});

const mapDispatchToProps = {
  getCourseAction: courseAction.getCourseAction, 
  failedOrNotEnrolledAction: studentAction.getFailedOrUnenrolledCoursesAction,};

export default connect(mapStateToProps, mapDispatchToProps)(StudentToEnrollInCourse);
