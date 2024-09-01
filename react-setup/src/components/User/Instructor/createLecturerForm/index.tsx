import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import  instructorAction from '../../../../state/actions/instructor.action';

const CreateLecturerForm = ({ addInstructorAction , userType}) => {
    const handleFormSubmit = (values, bag) => {
        if (values) {
            addInstructorAction(values);
          } else {
            bag.isSubmitting(false);
          }
        
    };

    return (
        <div style={{ marginTop: '30px',marginLeft: '70px',marginRight: '70px', padding: '50px', backgroundColor: '#ffffff' }}>
          <h3 style={{ color: '#000000' }}>
                {userType === 'Lecturer' ? 'Create New Lecturer' : 'Create New Doctor'}
            </h3>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    gender: '',
                    employmentType: '',
                    type: userType === 'Lecturer' ? 'TA' : 'Professor',
                    role: userType === 'Lecturer' ? 'Teaching Assistant' : 'professor'
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
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="firstName" style={{ color: '#000000' }}>First Name</Label>
                            <Input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="first name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                invalid={errors.firstName && touched.firstName}
                                style={{ width: '80%' }}
                            />
                            {errors.firstName && touched.firstName ? (<FormFeedback>{errors.firstName}</FormFeedback>) : null}
                        </FormGroup>

                        <FormGroup>
                            <Label for="lastName" style={{ color: '#000000' }}>Last Name</Label>
                            <Input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="last name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                invalid={errors.lastName && touched.lastName}
                                style={{ width: '80%' }}
                            />
                            {errors.lastName && touched.lastName ? (<FormFeedback>{errors.lastName}</FormFeedback>) : null}
                        </FormGroup>

                        <FormGroup>
                            <Label for="email" style={{ color: '#000000' }}>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                invalid={errors.email && touched.email}
                                style={{ width: '80%' }}
                            />
                            {errors.email && touched.email ? (<FormFeedback>{errors.email}</FormFeedback>) : null}
                        </FormGroup>

                        <FormGroup>
                            <Label for="password" style={{ color: '#000000' }}>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                invalid={errors.password && touched.password}
                                style={{ width: '80%' }}
                            />
                            {errors.password && touched.password ? (<FormFeedback>{errors.password}</FormFeedback>) : null}
                        </FormGroup>

                        <FormGroup tag="fieldset">
                            <legend style={{ color: '#000000', fontSize: '16px' }}>Gender</legend>
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

                        <FormGroup tag="fieldset">
                            <legend style={{ color: '#000000', fontSize: '16px' }}>Employment Type</legend>
                            <FormGroup check inline>
                                <Label check style={{ color: '#000000' }}>
                                    <Field type="radio" name="employmentType" value="full time" /> FullTime
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check style={{ color: '#000000' }}>
                                    <Field type="radio" name="employmentType" value="part time" /> PartTime
                                </Label>
                            </FormGroup>
                        </FormGroup>

                        <div className="d-flex justify-content-start">
                            <Button type="submit" color="primary" disabled={isSubmitting || !isValid} style={{ marginRight: '15px' }}>
                                Create
                            </Button>
                            <Button type="button" color="secondary">
                                Cancel
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const mapDispatchToProps = {
    addInstructorAction: instructorAction.addInstructorAction,
};

export default connect(null, mapDispatchToProps)(CreateLecturerForm);