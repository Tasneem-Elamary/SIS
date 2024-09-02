import React, { useState } from 'react';
import './login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button, FormGroup, Input, FormFeedback } from 'reactstrap';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { userAction } from '../../../state/actions';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import { userApi } from '../../../api';

interface LoginProps {
  loginAction: (credentials: { email: string; password: string }) => (dispatch: Dispatch, getState: () => any, extraArgument: { navigate: NavigateFunction }) => Promise<void>;
}

const Login = ({ loginAction }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (values: { email: string; password: string }, bag: any) => {
const user={email:values.email,password:values.password}
const response = await userApi.login(user);
console.log('API Response:', response);
localStorage.setItem('token', response.data.token);
localStorage.getItem('role');
if (response.data.user.role === 'student') {
  console.log('Navigating to /view-students');
  navigate('/view-students');
} 
console.log(localStorage.getItem('role'))
    try {
      if (values.email && values.password) {
        await loginAction(values, navigate);
      }
    } finally {
      bag.setSubmitting(false);
    }
  };

  return (
    <div className='login-container'>
      <Formik
        initialValues={{
          email: '',
          password: '',
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
          <Form onSubmit={handleSubmit} className='login-form'>
            <h3 className='login-title'>Login</h3>

            <FormGroup className='login-input'>
              <Input
                className='login-input'
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                invalid={!!(errors.email && touched.email)}
              />
              {errors.email && touched.email ? (<FormFeedback>{errors.email}</FormFeedback>) : null}
            </FormGroup>

            <FormGroup className='login-input password-group'>
              <Input
                className='login-input password-input'
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Enter your password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                invalid={!!(errors.password && touched.password)}
              />
              <span className='password-icon' onClick={handleShowPassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

              {errors.password && touched.password ? (<FormFeedback>{errors.password}</FormFeedback>) : null}
            </FormGroup>

            <Button
              type="submit"
              color="primary"
              className='login-button'
              disabled={isSubmitting || !isValid}
            >
              Login
            </Button>

            <p className="text-center mt-3">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      loginAction: (credentials: { email: string; password: string }, navigate: NavigateFunction) =>
        (dispatch: Dispatch) => userAction.loginAction(credentials, navigate)(dispatch),
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Login);