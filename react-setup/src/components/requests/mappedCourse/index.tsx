import './style.scss';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import MainNavBar from '../../shared/mainNavbar';
import SubNavBar from '../../requests/RequestsNavBar';
import studentAction from '../../../state/actions/student.action';
import RegisterationNavbar from '../../shared/registerationNavbar';

const MappedCourse = ({ addStudentAction, addStudentsAction }: any) => {
  const navigate = useNavigate();
  const handleFormSubmit = (values: any, bag: any) => {
    if (values) {
      addStudentAction(values);
      navigate('/');
    } else {
      bag.setSubmitting(false);
    }
    console.log('Form Submit');
  };

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
            studentId: '',
            advisorName: '',
            scheduleCourse: '',
            mappedCourse: '',
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
                  Student ID
                </Label>
                <Input
                  type="text"
                  name="studentId"
                  id="studentId"
                  placeholder="student id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.studentId}
                  invalid={!!(errors.studentId && touched.studentId)}
                  style={{ width: '80%' }}
                />
                {errors.studentId && touched.studentId ? (
                  <FormFeedback>{errors.studentId}</FormFeedback>
                ) : null}
              </FormGroup>

            

              <FormGroup>
                <Label for="scheduleCourse" style={{ color: '#000000' }}>
                  Schedule Course ( Registered )
                </Label>
                <Input
                  type="select"
                  name="scheduleCourse"
                  id="scheduleCourse"
                  placeholder="schedule course"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.scheduleCourse}
                  invalid={!!(errors.scheduleCourse && touched.scheduleCourse)}
                  style={{ width: '80%' }}
                >
                  <option>todo options</option>
                  <option>todo options</option>
                </Input>
                {errors.scheduleCourse && touched.scheduleCourse ? (
                  <FormFeedback>{errors.scheduleCourse}</FormFeedback>
                ) : null}
              </FormGroup>

              <FormGroup>
                <Label for="mappedCourse" style={{ color: '#000000' }}>
                  Mapped Course From By Low 2011( Replaced )
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
              </FormGroup>

              <div className="d-flex justify-content-start">
                <Button
                  color="primary"
                  className="create-button"
                  disabled={isSubmitting || !isValid}
                  style={{ marginRight: '15px' }}
                >
                  submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>{' '}
    </div>
  );
};

const mapDispatchToProps = {
  addStudentAction: studentAction.addStudentAction,
  addStudentsAction: studentAction.addStudentsAction,
};

export default connect(null, mapDispatchToProps)(MappedCourse);
