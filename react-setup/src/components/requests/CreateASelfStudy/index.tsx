import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavBar from '../../shared/mainNavbar';
import SubNavBar from '../RequestsNavBar';
import studentAction from '../../../state/actions/student.action';
import RegisterationNavbar from '../../shared/registerationNavbar';

const CreateASelfStudy = ({ requestEnrollmentByStudentCodeAction, fetchAllowedCourses }: any) => {
  const navigate = useNavigate();
  const [allowedCourses, setAllowedCourses] = useState([]);

  const handleFormSubmit = async(values: any, bag: any) => {
    if (values) {
      const formData = {
        ...values,
        enrollmentType: 'selfstudy',
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
        console.log("allowed courses", allowedCourses, studentId);
      } catch (error) {
        console.error("Failed to load allowed courses:", error);
      }
    };

    loadAllowedCourses();
  }, [fetchAllowedCourses]);

  return (
    <div>
      <RegisterationNavbar />
      <MainNavBar activeItem="Requests" />
      <SubNavBar activeItem="CreateASelfStudy" />
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
        <h3 style={{ color: '#000000' }}>Create a self-study</h3>
        <hr />
        <Formik
          initialValues={{
            StudentId: '',
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
                <Label for="studentId" style={{ color: '#000000' }}>
                  Student code
                </Label>
                <Input
                  type="text"
                  name="StudentId"
                  id="StudentId"
                  placeholder="student code"
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
                <Label for="course" style={{ color: '#000000' }}>
                  Select course
                </Label>
                <Input
                  type="select"
                  name="CourseId"
                  id="CourseId"
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

              <div className="d-flex justify-content-start">
                <Button
                  type="submit"
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

export default connect(null, mapDispatchToProps)(CreateASelfStudy);
