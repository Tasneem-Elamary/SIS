import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink as RouterNavLink, useNavigate, useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import './style.scss';

import RegulationNav from './regulationNav';
import { Nav, NavItem, Navbar, TabContent, TabPane, Table } from 'reactstrap';
import regulationAction from '../../state/actions/regulation.action';
import MainNavBar from '../shared/mainNavbar';
import RegisterationNavbar from '../shared/registerationNavbar';

interface RegulationDetailsProps {
    getRegulationDetails: (regulationId: string) => Promise<any>;
    getRegulationlimits: (regulationId: string) => Promise<any>;
    getCourseDetails: (regulationId: string) => Promise<any>;
}

const RegulationDetails = ({ getRegulationDetails, getRegulationlimits, getCourseDetails }: RegulationDetailsProps) => {
    const [regulation, setRegulation] = useState<any>(null);
    const [limits, setLimits] = useState<any>([]);
    const [grades, setGrades] = useState<any>([]);
    const [courses, setCourses] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { regulationId } = useParams<string>();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<number>(1);  

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (regulationId) {
                try {
                    setLoading(true);

              
                    if (activeTab === 1) {
                        const bylaw = await getRegulationDetails(regulationId);
                        if (isMounted) {
                            setRegulation(bylaw);
                        }
                    } else if (activeTab === 3) {
                        const { Grades, BylawRules } = await getRegulationlimits(regulationId);
                        if (isMounted) {
                            setLimits(BylawRules);
                            setGrades(Grades);
                        }
                    } else if (activeTab === 4) {
                        const courses = await getCourseDetails(regulationId);
                        if (isMounted) {
                            setCourses(courses);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    if (isMounted) {
                        setLoading(false);
                    }
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [regulationId, activeTab, getRegulationDetails, getRegulationlimits, getCourseDetails]);

    const subNavValues = [
        { id: 1, label: 'General' },
        { id: 2, label: 'Requirements' },
        { id: 3, label: 'Registration Limits' },
        { id: 4, label: 'Courses' }
    ];

    const toggleTab = (tab: number) => {
        if (activeTab !== tab) setActiveTab(tab); 
    };

    return (
        <div>
            <RegisterationNavbar />
            <MainNavBar activeItem="Regulations" />
            <RegulationNav />
            <div className="fixed-title-padding"></div>

            <div className='reg-container'>
                        <div className='reg-fixed-header'>
                            <h4>{regulation?.code}</h4>
                            <p>{regulation?.description}</p>
                        </div>
                     
                {/* Sub-navbar with tabs */}
                <div className='regulation-detail-container'>
                <Navbar expand="md" className="sub-reg-nav">
                    <Nav className="me-auto" navbar>
                        {subNavValues.map((tab) => (
                            <NavItem key={tab.id}>
                                <RouterNavLink
                                    to="#"
                                    className={activeTab === tab.id ? "nav-reg-link-active" : "nav-reg-link-custom"}
                                    onClick={() => toggleTab(tab.id)}
                                >
                                    {tab.label}
                                </RouterNavLink>
                            </NavItem>
                        ))}
                    </Nav>
                </Navbar>

                {/* TabContent */}
                <TabContent className='tab-container' activeTab={activeTab}>
                    {/* Tab 1 - General */}
                    <TabPane tabId={1} className={activeTab === 1 ? 'show' : 'hide'}>
                        <Table className='reg-table'bordered>
                            <tbody>
                                <tr>
                                    <td><span className='black-bold'>Regulation Code</span></td>
                                    <td>{regulation?.code}</td>
                                </tr>
                                <tr>
                                    <td><span className='black-bold'>Issued For</span></td>
                                    <td>{regulation?.Faculty?.name}</td>
                                </tr>
                                <tr>
                                    <td><span className='black-bold'>Issued In</span></td>
                                    <td>{regulation?.year}</td>
                                </tr>
                                <tr>
                                    <td><span className='black-bold'>Graduation credit hours</span></td>
                                    <td>{regulation?.credit_Hours}</td>
                                </tr>
                                <tr>
                                    <td><span className='black-bold'>Graduation GPA</span></td>
                                    <td>{regulation?.min_GPA}</td>
                                </tr>
                                <tr>
                                    <td className='black-bold'>Students</td>
                                    <td className='blue-bold'><a href={`/regulation/students/${regulationId}`}>{regulation?.studentsCount}</a></td>
                                </tr>
                            </tbody>
                        </Table>
                    </TabPane>

                    {/* Tab 2 - Requirements */}
                    <TabPane tabId={2} className={activeTab === 2 ? 'show' : 'hide'}>
                        <h4>Requirements</h4>
                        <p>List all the requirements for this regulation...</p>
                    </TabPane>

                    {/* Tab 3 - Registration Limits */}
                    <TabPane tabId={3} className={activeTab === 3 ? 'reg-limit-tables':'hide' }>
                    <Table className='reg-limit-table-1' bordered striped>
                            <thead>
                                <tr>
                                    <th>Minimum GPA</th>
                                    <th>Hours Allowed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {limits && limits.length > 0 ? (limits.map((limit:{min_GPA:number,hoursAllowed:number}) => (
                                    <tr key={limit.min_GPA}>
                                        <td><span className='black-bold'>{limit?.min_GPA}</span></td>
                                        <td>{limit?.hoursAllowed}</td>
                                    </tr>
                                ))) : <p>NO limits detected for this bylaw</p>}
                            </tbody>
                        </Table>
                        <Table className='reg-limit-table' bordered striped>
                            <thead>

                                <th colSpan={grades.length + 1} style={{ textAlign: 'center' }}>Grade Schema</th>

                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ width: '50px' }}><strong>Grade</strong></td>
                                    {grades.map((grade:{letter:string,point:number}, index:number) => (
                                        <td key={index} style={{ width: '50px', textAlign: 'center' }}>{grade.letter}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td><strong>point</strong></td>
                                    {grades.map((grade:{letter:string,point:number}, index:number) => (
                                        <td key={index} style={{ width: '50px', textAlign: 'center' }} >{grade.point}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </Table>
                    </TabPane>



                    {/* Tab 4 - Courses */}
                    <TabPane tabId={4} className={activeTab === 4 ? 'show' : 'hide'}>
                        <Table className='reg-table' bordered>
                            <thead>
                                <tr>
                                    <th>Course Code</th>
                                    <th>Course Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course: any) => (
                                    <tr key={course.code}>
                                        <td className='blue-bold'>{course.code}</td>
                                        <td>{course.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </TabPane>

                </TabContent>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getRegulationDetails: regulationAction.viewRegulationDetailsAction,
            getRegulationlimits: regulationAction.viewRegulationRulesAction,
            getCourseDetails: regulationAction.viewRegulationCoursesAction,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(RegulationDetails);
