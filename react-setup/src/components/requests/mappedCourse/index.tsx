import './style.scss';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import MainNavBar from '../../shared/mainNavbar';
import SubNavBar from '../../requests/RequestsNavBar';
import studentAction from '../../../state/actions/student.action';

import RegisterationNavbar from '../../shared/registerationNavbar';
import { useState, useEffect } from 'react';

const MappedCourse = ({ requestEnrollmentByStudentCodeAction, fetchAllowedCourses }: any) => {
  const [allowedCourses, setAllowedCourses] = useState([]);

  const handleFormSubmit = async (values: any, bag: any) => {
    if (values) {
      const formData = {
        ...values,
        enrollmentType: 'regular',
      };
      await requestEnrollmentByStudentCodeAction(formData);
    } else {
      bag.setSubmitting(false);
    }
  };

  useEffect(() => {
    const studentId = localStorage.getItem('id') || '';

    const loadAllowedCourses = async () => {
      try {
        const courses = await fetchAllowedCourses(studentId);
        setAllowedCourses(courses);
        console.log("allowed courses", courses, studentId); // Updated to log courses directly
      } catch (error) {
        console.error("Failed to load allowed courses:", error);
      }
    };

    if (studentId) loadAllowedCourses(); // Only load if studentId exists
  }, [fetchAllowedCourses]);

  return (
    <div>
      <RegisterationNavbar />
      <MainNavBar activeItem="Requests" />
      <SubNavBar activeItem="MappedCourse" />
      <div
        className="container"
        style={{
          width: 'auto',
          height: 'auto',
          marginTop: '30px',
          marginLeft: '70px',
          marginRight: '70px',
          padding: '50px',
          backgroundColor: '#ffffff',
        }}
      >
        <h3 style={{ color: '#000000' }}>Mapped Course</h3>
        <hr />
        <Formik
          initialValues={{
            StudentId: '',
            // advisorName: '',
            // scheduleCourse: '',
            CourseId: '',
          }}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
          }) => (
            <Form className="form" onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="StudentId" style={{ color: '#000000' }}>
                  Student Code
                </Label>
                <Input
                  type="text"
                  name="StudentId"
                  id="StudentId"
                  placeholder="Student Code"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.StudentId}
                  invalid={!!(errors.StudentId && touched.StudentId)}
                  style={{ width: '80%' }}
                />
                {errors.StudentId && touched.StudentId ? (
                  <FormFeedback>{errors.StudentId}</FormFeedback>
                ) : null}
              </FormGroup>

              <FormGroup>
                <Label for="CourseId" style={{ color: '#000000' }}>
                  Schedule Course ( Registered )
                </Label>
                <Input
                  type="select"
                  name="CourseId"
                  id="CourseId"
                  placeholder="schedule course"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.CourseId}
                  invalid={!!(errors.CourseId && touched.CourseId)}
                  style={{ width: '80%' }}
                >
                  <option value="">Select a course</option>
                  {allowedCourses?.map((course: any) => (
                    <option key={course?.id} value={course?.id}>
                      {course?.code} - {course?.name}
                    </option>
                  ))}
                </Input>
                {errors.CourseId && touched.CourseId ? (
                  <FormFeedback>{errors.CourseId}</FormFeedback>
                ) : null}
              </FormGroup>

              {/* <FormGroup>
                <Label for="mappedCourse" style={{ color: '#000000' }}>
                  Mapped Course From By Low 2011 ( Replaced )
                </Label>
                <Input
                  type="select"
                  name="mappedCourse"
                  id="mappedCourse"
                  placeholder="mapped course"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mappedCourse}
                  invalid={!!(errors.mappedCourse && touched.mappedCourse)}
                  style={{ width: '80%' }}
                >
                  <option>todo options</option>
                  <option>todo options</option>
                </Input>
                {errors.mappedCourse && touched.mappedCourse ? (
                  <FormFeedback>{errors.mappedCourse}</FormFeedback>
                ) : null}
              </FormGroup> */}

              <div className="d-flex justify-content-start">
                <Button
                  color="primary"
                  className="create-button"
                  disabled={isSubmitting || !isValid}
                  style={{ marginRight: '15px' }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  requestEnrollmentByStudentCodeAction: studentAction.requestEnrollmentByStudentCodeAction,
  fetchAllowedCourses: studentAction.getAllowedCoursesAction,

};

export default connect(null, mapDispatchToProps)(MappedCourse);
