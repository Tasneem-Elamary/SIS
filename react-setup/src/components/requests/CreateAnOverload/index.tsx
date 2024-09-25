import './style.scss';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import MainNavBar from '../../shared/mainNavbar';
import SubNavBar from '../RequestsNavBar';
import studentAction from '../../../state/actions/student.action';
import RegisterationNavbar from '../../shared/registerationNavbar';

const CreateAnOverload = ({ addStudentAction, addStudentsAction }: any) => {
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
      <SubNavBar activeItem="CreateAnOverload" />
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
        <h3 style={{ color: '#000000' }}>Create An Overload</h3>
        <hr />
        <Formik
          initialValues={{
            studentId: '',
            advisorName: '',
            overloadCourse: '',
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
                <Label for="advisorName" style={{ color: '#000000' }}>
                  Advisor Name
                </Label>
                <Input
                  type="text"
                  name="advisorName"
                  id="advisorName"
                  placeholder="advisor name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.advisorName}
                  invalid={!!(errors.advisorName && touched.advisorName)}
                  style={{ width: '80%' }}
                />
                {errors.advisorName && touched.advisorName ? (
                  <FormFeedback>{errors.advisorName}</FormFeedback>
                ) : null}
              </FormGroup>

              <FormGroup>
                <Label for="overloadCourse" style={{ color: '#000000' }}>
                  Overload Course
                </Label>
                <Input
                  type="select"
                  name="overloadCourse"
                  id="overloadCourse"
                  placeholder="Overload Course"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.overloadCourse}
                  invalid={!!(errors.overloadCourse && touched.overloadCourse)}
                  style={{ width: '80%' }}
                >
                  <option>todo options</option>
                  <option>todo options</option>
                </Input>
                {errors.overloadCourse && touched.overloadCourse ? (
                  <FormFeedback>{errors.overloadCourse}</FormFeedback>
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

export default connect(null, mapDispatchToProps)(CreateAnOverload);
