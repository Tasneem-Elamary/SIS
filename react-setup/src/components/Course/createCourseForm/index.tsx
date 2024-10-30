import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import  courseAction from '../../../state/actions/course.action';
import { useNavigate } from 'react-router-dom'

const CreateCourseForm = ({ addCourseAction }) => {
    const navigate = useNavigate();

    const handleFormSubmit = (values, bag) => {
        if (values) {
            console.log(values);
            addCourseAction(values);
            navigate(`/Courses/level/${values.level}`);
        } else {
            bag.isSubmitting(false);
        }
    };

    return (
        <div style={{ marginTop: '30px', marginLeft: '70px', marginRight: '70px', padding: '50px', backgroundColor: '#ffffff' }}>
            <h3 style={{ color: '#000000' }}>Create New Course</h3>
            <Formik
                initialValues={{
                    code: '',
                    name: '',
                    creditHours: '',
                    level: '',
                    min_GPA: '',
                    minEarnedHours: ''
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
                    isValid
                }) => (
                    <Form onSubmit={handleSubmit}>
                        {/* Course Code */}
                        <FormGroup>
                            <Label for="code" style={{ color: '#000000' }}>Course Code</Label>
                            <Input
                                type="text"
                                name="code"
                                id="code"
                                placeholder="Course code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.code}
                                invalid={errors.code && touched.code}
                                style={{ width: '80%' }}
                            />
                            {errors.code && touched.code ? (<FormFeedback>{errors.code}</FormFeedback>) : null}
                        </FormGroup>

                        {/* Course Name */}
                        <FormGroup>
                            <Label for="name" style={{ color: '#000000' }}>Course Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Course name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                invalid={errors.name && touched.name}
                                style={{ width: '80%' }}
                            />
                            {errors.name && touched.name ? (<FormFeedback>{errors.name}</FormFeedback>) : null}
                        </FormGroup>

                        {/* Credit Hours */}
                        <FormGroup>
                            <Label for="creditHours" style={{ color: '#000000' }}>Credit Hours</Label>
                            <Input
                                type="number"
                                name="creditHours"
                                id="creditHours"
                                placeholder="Credit hours"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.creditHours}
                                invalid={errors.creditHours && touched.creditHours}
                                style={{ width: '80%' }}
                            />
                            {errors.creditHours && touched.creditHours ? (<FormFeedback>{errors.creditHours}</FormFeedback>) : null}
                        </FormGroup>

                        {/* Level */}
                        <FormGroup>
                            <Label for="level" style={{ color: '#000000' }}>Level</Label>
                            <Input
                                type="number"
                                name="level"
                                id="level"
                                placeholder="Level"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.level}
                                invalid={errors.level && touched.level}
                                style={{ width: '80%' }}
                            />
                            {errors.level && touched.level ? (<FormFeedback>{errors.level}</FormFeedback>) : null}
                        </FormGroup>

                        {/* Minimum GPA */}
                        <FormGroup>
                            <Label for="min_GPA" style={{ color: '#000000' }}>Minimum GPA</Label>
                            <Input
                                type="number"
                                name="min_GPA"
                                id="min_GPA"
                                placeholder="Minimum GPA"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.min_GPA}
                                invalid={errors.min_GPA && touched.min_GPA}
                                style={{ width: '80%' }}
                            />
                            {errors.min_GPA && touched.min_GPA ? (<FormFeedback>{errors.min_GPA}</FormFeedback>) : null}
                        </FormGroup>

                        {/* Minimum Earned Hours */}
                        <FormGroup>
                            <Label for="minEarnedHours" style={{ color: '#000000' }}>Minimum Earned Hours</Label>
                            <Input
                                type="number"
                                name="minEarnedHours"
                                id="minEarnedHours"
                                placeholder="Minimum earned hours"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.minEarnedHours}
                                invalid={errors.minEarnedHours && touched.minEarnedHours}
                                style={{ width: '80%' }}
                            />
                            {errors.minEarnedHours && touched.minEarnedHours ? (<FormFeedback>{errors.minEarnedHours}</FormFeedback>) : null}
                        </FormGroup>

                        {/* Submit and Cancel Buttons */}
                        <div className="d-flex justify-content-start">
                            <Button type="submit" color="primary" disabled={isSubmitting || !isValid} style={{ marginRight: '15px' }}>
                                Create
                            </Button>
                            <Button type="button" color="secondary" onClick={() => navigate('/courses')}>
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
    addCourseAction: courseAction.addCourseAction,
};

export default connect(null, mapDispatchToProps)(CreateCourseForm);