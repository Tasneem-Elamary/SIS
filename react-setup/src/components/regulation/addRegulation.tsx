import { FormGroup, Label, Input, Button, Table } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MainNavBar from "../shared/mainNavbar";
import RegisterationNavbar from "../shared/registerationNavbar";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import Regulation from '../../state/actions/regulation.action';


const AddRegulation = () => {
    const [createdRegulation, setCreatedRegulation] = useState({ id: '', credit_hours: 0.0, min_GPA: 0.0, min_Hours: 0, FacultyId: '' })
    const [gpaData, setGpaData] = useState([{ letter: '', point: 0.0 }]);
    const [limits, setLimits] = useState([{ min_GPA: 0.0, hoursAllowed: 0 }]);

    const dispatch = useDispatch(); // Use dispatch

    const handleGpaChange = (index:number, field:string, value:string) => {
        const updatedData = [...gpaData];
        updatedData[index][field] = field === 'point' ? parseFloat(value) : value;
        setGpaData(updatedData);
    };

    const handleLimitsChange = (index, field, value) => {
        const updatedLimits = [...limits];
        updatedLimits[index][field] = field === 'min_GPA' ? parseFloat(value) : parseInt(value);
        setLimits(updatedLimits);
    };

    const addNewGPA = () => {
        setGpaData([...gpaData, { letter: '', point: 0.0 }]);
    };

    const addNewLimit = () => {
        setLimits([...limits, { min_GPA: 0.0, hoursAllowed: 0 }]);
    };

    const handleSubmitGradeSchema = async () => {
        // Dispatch action to add grades
        const regulationId = createdRegulation?.id;
        await dispatch(Regulation.addRegulationGradesAction(regulationId, gpaData));
        console.log('Submitted GPA Data: ', gpaData);
    };

    const handleSubmitEnrollmentLimits = async () => {

        const regulationId = createdRegulation?.id;
        await dispatch(Regulation.addRegulationLimitsAction(regulationId, limits));
        console.log('Submitted Enrollment Limits Data: ', limits);
    };

    const handleSubmitRegulationDetails = async (values) => {

        const FacultyId = 'b1238c1a-f86e-11da-bd1a-00112444be1e';  //should be dynamic

        const regulation = await dispatch(Regulation.addRegulationDetailsAction(FacultyId, values));
        if (regulation) setCreatedRegulation(regulation)
        console.log("Submitted regulation details: ", values);
    };

    return (
        <div className="page-container">
            <RegisterationNavbar />
            <MainNavBar activeItem="Regulations" />
            <div className="fixed-title-padding"></div>
            <div className="fixed-title">
                <h4>Add regulation</h4>
                <hr />
            </div>

            <div className="inside-container">
                {/* Regulation Details Form */}
                <Formik
                    initialValues={{ code: '', year: '', min_GPA: '', credit_Hours: '', min_Hours: '' }}
                    onSubmit={handleSubmitRegulationDetails}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <FormGroup>
                                <Label for="code">Regulation Code</Label>
                                <Field id="code" name="code" placeholder="Enter regulation code" type="text" as={Input} />
                                <ErrorMessage name="code" component="div" className="error-message" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="year">Year</Label>
                                <Field id="year" name="year" placeholder="Enter issuing year" type="number" min={1900} max={new Date().getFullYear()} as={Input} />
                                <ErrorMessage name="year" component="div" className="error-message" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="min_GPA">Minimum GPA</Label>
                                <Field id="min_GPA" name="min_GPA" placeholder="Minimum GPA to graduate" type="number" as={Input} />
                                <ErrorMessage name="min_GPA" component="div" className="error-message" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="credit_Hours">Total credit hours</Label>
                                <Field id="credit_Hours" name="credit_Hours" placeholder="Total credit hours" type="number" as={Input} />
                                <ErrorMessage name="credit_Hours" component="div" className="error-message" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="min_Hours">Minimum credit hours to graduate</Label>
                                <Field id="min_Hours" name="min_Hours" placeholder="Minimum credit hours to graduate" type="number" as={Input} />
                                <ErrorMessage name="min_Hours" component="div" className="error-message" />
                            </FormGroup>

                            <Button color="primary" type="submit" disabled={isSubmitting}>Submit regulation details</Button>
                        </Form>
                    )}
                </Formik>
                <hr />
                <div className="row-container">
                    {/* Grade Schema Form */}
                    <div>
                        <Label for="grade">Grade Schema</Label>
                        <Formik
                            initialValues={{}}
                            onSubmit={handleSubmitGradeSchema}
                        >
                            {() => (
                                <Form>
                                    <Table bordered>
                                        <thead>
                                            <tr>
                                                <th>Letter</th>
                                                <th>GPA point</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gpaData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <FormGroup>
                                                            <Field
                                                                name={`gpaData[${index}].letter`}
                                                                placeholder="ex: A+"
                                                                as={Input}
                                                                value={data.letter}
                                                                onChange={(e) => handleGpaChange(index, 'letter', e.target.value)}
                                                            />
                                                        </FormGroup>
                                                    </td>
                                                    <td>
                                                        <FormGroup>
                                                            <Field
                                                                name={`gpaData[${index}].point`}
                                                                type="number"
                                                                placeholder="ex: 4.0"
                                                                as={Input}
                                                                value={data.point}
                                                                onChange={(e) => handleGpaChange(index, 'point', e.target.value)}
                                                                step="0.1"
                                                                min="0.0"
                                                            />
                                                        </FormGroup>
                                                    </td>
                                                </tr>
                                            ))}
                                            <AiOutlinePlus onClick={addNewGPA} style={{ cursor: 'pointer' }} />
                                        </tbody>
                                    </Table>
                                    <Button color="primary" type="submit">Submit Grade Schema</Button>
                                </Form>
                            )}
                        </Formik>
                    </div>

                    {/* Enrollment Limits Form */}
                    <div>
                        <Label for="limits">Enrollment Limits</Label>
                        <Formik
                            initialValues={{}}
                            onSubmit={handleSubmitEnrollmentLimits}
                        >
                            {() => (
                                <Form>
                                    <Table bordered>
                                        <thead>
                                            <tr>
                                                <th>min_GPA</th>
                                                <th>hoursAllowed</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {limits.map((data, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <FormGroup>
                                                            <Field
                                                                name={`limits[${index}].min_GPA`}
                                                                type="number"
                                                                placeholder="ex: 3.4"
                                                                as={Input}
                                                                value={data.min_GPA}
                                                                onChange={(e) => handleLimitsChange(index, 'min_GPA', e.target.value)}
                                                                step="0.1"
                                                                min="0.0"
                                                            />
                                                        </FormGroup>
                                                    </td>
                                                    <td>
                                                        <FormGroup>
                                                            <Field
                                                                name={`limits[${index}].hoursAllowed`}
                                                                type="number"
                                                                placeholder="ex: 18"
                                                                as={Input}
                                                                value={data.hoursAllowed}
                                                                onChange={(e) => handleLimitsChange(index, 'hoursAllowed', e.target.value)}
                                                                step="1"
                                                                min="1"
                                                            />
                                                        </FormGroup>
                                                    </td>
                                                </tr>
                                            ))}
                                            <AiOutlinePlus onClick={addNewLimit} style={{ cursor: 'pointer' }} />
                                        </tbody>
                                    </Table>
                                    <Button color="primary" type="submit">Submit Enrollment Limits</Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRegulation;
