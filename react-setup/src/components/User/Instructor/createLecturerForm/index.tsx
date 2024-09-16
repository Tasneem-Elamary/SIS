import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import  instructorAction from '../../../../state/actions/instructor.action';
import { useNavigate } from 'react-router-dom'

const CreateLecturerForm = ({ addInstructorAction , userType}) => {
    const navigate = useNavigate();
    const handleFormSubmit = (values, bag) => {
        if (values) {
            console.log(values)
            addInstructorAction(values);
            navigate('/');
          } else {
            bag.isSubmitting(false);
          }
        
    };

    return (
        <div style={{ marginTop: '30px', marginLeft: '70px', marginRight: '70px', padding: '50px', backgroundColor: '#ffffff' }}>
            <h3 style={{ color: '#000000' }}>
                {userType === 'Lecturer' ? 'Create New Lecturer' : 'Create New Doctor'}
            </h3>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    DepartmentCode: '', // New field for Department Code
                    birthDate: '', // New field for Birth Date
                    gender: '',
                    employmentType: '',
                    type: userType === 'Lecturer' ? 'TA' : 'Professor',
                    role: userType === 'Lecturer' ? 'teaching assistant' : 'professor'
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
                        {/* First Name */}
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

                        {/* Last Name */}
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

                        {/* Email */}
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

                        {/* Department Code */}
                        <FormGroup>
                            <Label for="DepartmentCode" style={{ color: '#000000' }}>Department Code</Label>
                            <Input
                                type="text"
                                name="DepartmentCode"
                                id="DepartmentCode"
                                placeholder="department code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.DepartmentCode}
                                invalid={errors.DepartmentCode && touched.DepartmentCode}
                                style={{ width: '80%' }}
                            />
                            {errors.DepartmentCode && touched.DepartmentCode ? (<FormFeedback>{errors.DepartmentCode}</FormFeedback>) : null}
                        </FormGroup>

                        {/* Birth Date */}
                        <FormGroup>
                            <Label for="birthDate" style={{ color: '#000000' }}>Birth Date</Label>
                            <Input
                                type="date"
                                name="birthDate"
                                id="birthDate"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.birthDate}
                                invalid={errors.birthDate && touched.birthDate}
                                style={{ width: '80%' }}
                            />
                            {errors.birthDate && touched.birthDate ? (<FormFeedback>{errors.birthDate}</FormFeedback>) : null}
                        </FormGroup>

                        {/* Gender */}
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

                        {/* Employment Type */}
                        <FormGroup tag="fieldset">
                            <legend style={{ color: '#000000', fontSize: '16px' }}>Employment Type</legend>
                            <FormGroup check inline>
                                <Label check style={{ color: '#000000' }}>
                                    <Field type="radio" name="employmentType" value="full time" /> Full Time
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check style={{ color: '#000000' }}>
                                    <Field type="radio" name="employmentType" value="part time" /> Part Time
                                </Label>
                            </FormGroup>
                        </FormGroup>

                        {/* Submit and Cancel Buttons */}
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