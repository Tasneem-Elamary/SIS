// import './style.scss';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import MainNavBar from '../../shared/mainNavbar';
import SubNavBar from '../RequestsNavBar';
import studentAction from '../../../state/actions/student.action';
import RegisterationNavbar from '../../shared/registerationNavbar';

const CreateASelfStudy = ({ addStudentAction, addStudentsAction }: any) => {
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
            studentId: '',
            advisorName: '',
            mappedCourseBylaw2005: '',
            mappedCourseBylaw2011: '',
            mappedCourseBylaw2017: '',
            mappedCourseBylaw2019: '',
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
                <Label for="mappedCourseBylaw2005" style={{ color: '#000000' }}>
                  Mapped Course From Bylaw 2005
                </Label>
                <Input
                  type="select"
                  name="mappedCourseBylaw2005"
                  id="mappedCourseBylaw2005"
                  placeholder="Overload Course"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mappedCourseBylaw2005}
                  invalid={
                    !!(
                      errors.mappedCourseBylaw2005 &&
                      touched.mappedCourseBylaw2005
                    )
                  }
                  style={{ width: '80%' }}
                >
                  <option>todo options</option>
                  <option>todo options</option>
                </Input>
                {errors.mappedCourseBylaw2005 &&
                touched.mappedCourseBylaw2005 ? (
                  <FormFeedback>{errors.mappedCourseBylaw2005}</FormFeedback>
                ) : null}
              </FormGroup>

              <FormGroup>
                <Label for="mappedCourseBylaw2011" style={{ color: '#000000' }}>
                  Mapped Course From Bylaw 2011
                </Label>
                <Input
                  type="select"
                  name="mappedCourseBylaw2011"
                  id="mappedCourseBylaw2011"
                  placeholder="Overload Course"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mappedCourseBylaw2011}
                  invalid={
                    !!(
                      errors.mappedCourseBylaw2011 &&
                      touched.mappedCourseBylaw2011
                    )
                  }
                  style={{ width: '80%' }}
                >
                  <option>todo options</option>
                  <option>todo options</option>
                </Input>
                {errors.mappedCourseBylaw2011 &&
                touched.mappedCourseBylaw2011 ? (
                  <FormFeedback>{errors.mappedCourseBylaw2011}</FormFeedback>
                ) : null}
              </FormGroup>

              <FormGroup>
                <Label for="mappedCourseBylaw2017" style={{ color: '#000000' }}>
                  Mapped Course From Bylaw 2017
                </Label>
                <Input
                  type="select"
                  name="mappedCourseBylaw2017"
                  id="mappedCourseBylaw2017"
                  placeholder="Overload Course"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mappedCourseBylaw2017}
                  invalid={
                    !!(
                      errors.mappedCourseBylaw2017 &&
                      touched.mappedCourseBylaw2017
                    )
                  }
                  style={{ width: '80%' }}
                >
                  <option>todo options</option>
                  <option>todo options</option>
                </Input>
                {errors.mappedCourseBylaw2017 &&
                touched.mappedCourseBylaw2017 ? (
                  <FormFeedback>{errors.mappedCourseBylaw2017}</FormFeedback>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label for="mappedCourseBylaw2019" style={{ color: '#000000' }}>
                  Mapped Course From Bylaw 2019
                </Label>
                <Input
                  type="select"
                  name="mappedCourseBylaw2019"
                  id="mappedCourseBylaw2019"
                  placeholder="Overload Course"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mappedCourseBylaw2019}
                  invalid={
                    !!(
                      errors.mappedCourseBylaw2019 &&
                      touched.mappedCourseBylaw2019
                    )
                  }
                  style={{ width: '80%' }}
                >
                  <option>todo options</option>
                  <option>todo options</option>
                </Input>
                {errors.mappedCourseBylaw2019 &&
                touched.mappedCourseBylaw2019 ? (
                  <FormFeedback>{errors.mappedCourseBylaw2019}</FormFeedback>
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

export default connect(null, mapDispatchToProps)(CreateASelfStudy);
