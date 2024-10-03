import './style.scss';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button, FormGroup, Label, Input, FormFeedback, Alert } from 'reactstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavBar from '../../../shared/mainNavbar';
import SubNavBar from '../../UsersNavbar';
import studentAction from '../../../../state/actions/student.action';
import RegisterationNavbar from '../../../shared/registerationNavbar';

const AddStudent = ({ addStudentAction, addStudentsAction }: any) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const navigate = useNavigate(); 
  const handleFormSubmit = (values: any, bag: any) => {
    if (values) {
      addStudentAction(values);
      navigate('/view-students');

    } else {
      bag.setSubmitting(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
    setFileError(null);
  };

  const handleImport = async () => {
    if (!file) {
      setFileError('Please select a CSV file to import.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await addStudentsAction(formData);

      navigate('/view-students');
      // Modal uploaded successfully to implement
    } catch (error) {
      setFileError('Failed to upload the file.');
    }
  };

  return (
    <div>             
      <RegisterationNavbar />
    <MainNavBar activeItem="Users" />
    
    <div
      className='container'
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
      <h3 style={{ color: '#000000' }}>Create Student</h3>
      <hr />
      <Formik
        initialValues={{
          studentCode: '',
          name: '',
          email: '',
          gender: '',
          bylawCode: '',
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
              <Label for="code" style={{ color: '#000000' }}>
                Code
              </Label>
              <Input
                type="text"
                name="studentCode"
                id="studentCode"
                placeholder="student code"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.studentCode}
                invalid={!!(errors.studentCode && touched.studentCode)}
                style={{ width: '80%' }}
              />
              {errors.studentCode && touched.studentCode ? (
                <FormFeedback>{errors.studentCode}</FormFeedback>
              ) : null}
            </FormGroup>

            <FormGroup>
              <Label for="name" style={{ color: '#000000' }}>
                Name
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="student name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                invalid={!!(errors.name && touched.name)}
                style={{ width: '80%' }}
              />
              {errors.name && touched.name ? (
                <FormFeedback>{errors.name}</FormFeedback>
              ) : null}
            </FormGroup>

            <FormGroup>
              <Label for="email" style={{ color: '#000000' }}>
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                invalid={!!(errors.email && touched.email)}
                style={{ width: '80%' }}
              />
              {errors.email && touched.email ? (
                <FormFeedback>{errors.email}</FormFeedback>
              ) : null}
            </FormGroup>

            <FormGroup>
              <Label for="bylawCode" style={{ color: '#000000' }}>
                Regulation
              </Label>
              <Input
                type="text"
                name="bylawCode"
                id="bylawCode"
                placeholder="regulation code"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bylawCode}
                invalid={!!(errors.bylawCode && touched.bylawCode)}
                style={{ width: '80%' }}
              />
              {errors.bylawCode && touched.bylawCode ? (
                <FormFeedback>{errors.bylawCode}</FormFeedback>
              ) : null}
            </FormGroup>

            <FormGroup tag="fieldset">
              <legend style={{ color: '#000000', fontSize: '16px' }}>
                Gender
              </legend>
              <FormGroup check inline>
                <Label check style={{ color: '#000000' }}>
                  <Field type="radio" name="gender" value="Male" /> Male
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check style={{ color: '#000000' }}>
                  <Field type="radio" name="gender" value="Female" /> Female
                </Label>
              </FormGroup>
            </FormGroup>

            <div className="d-flex justify-content-start">
              <Button
                
                color="primary"
                className="create-button"
                disabled={isSubmitting || !isValid}
                style={{ marginRight: '15px' }}
              >
                Create
              </Button>
            </div>

            <FormGroup>
              <div className="or-break-container">
                <div className="line"></div>
                <h5 className="or">OR</h5>
                <div className="line"></div>
              </div>
            </FormGroup>

            <FormGroup>
              <h5>CSV file to import</h5>
              <Input
                className="file-upload"
                id="exampleFile"
                name="file"
                type="file"
                onChange={handleFileUpload}
                
              />
              {fileError && <FormFeedback>{fileError}</FormFeedback>}
            </FormGroup>

            <FormGroup>
              <Button color="primary" className="create-button" onClick={handleImport}>
                Import
              </Button>
            </FormGroup>
          </Form>
        )}
      </Formik>
      </div>  </div>
  );
};

const mapDispatchToProps = {
  addStudentAction: studentAction.addStudentAction,
  addStudentsAction: studentAction.addStudentsAction,
};

export default connect(null, mapDispatchToProps)(AddStudent);
