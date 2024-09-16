import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import './style.scss';
import regulationAction from '../../state/actions/regulation.action';
import RegulationNav from './regulationNav';
import { Nav, NavItem, TabContent, TabPane, Table } from 'reactstrap';

interface RegulationDetailsProps {
    getRegulationDetails: (regulationId: string) => Promise<any>;
}

const RegulationDetails = ({ getRegulationDetails }: RegulationDetailsProps) => {
    const [regulation, setRegulation] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { regulationId } = useParams<string>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRegulationDetails = async () => {
            if (regulationId) {
                try {
                    setLoading(true);
                    const bylaw = await getRegulationDetails(regulationId);
                    setRegulation(bylaw);
                } catch (error) {
                    console.error('Error fetching regulation details:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchRegulationDetails();
    }, [regulationId, getRegulationDetails]); // Depend on regulationId and the getRegulationDetails function

    const handleBackClick = () => {
        navigate('/regulations'); // Navigate back to the regulations list
    };

    const [activeTab, setActiveTab] = useState('1'); // Active tab state

    const toggleTab = (tab: string) => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    return (
        <div className="container1">
            <div className="fixed-tems">
            <RegulationNav  /></div>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    regulation ? (
                        <div className='fixed-header2'>
                            <h3>Regulation Code: {regulation.code}</h3>
                            <p>{regulation.description}</p> 
                        </div>
                    ) : (
                        <p>No regulation details found.</p>
                    )
                )}
            </div>


            <Nav tabs className='sub-reg-nav'>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => toggleTab('1')} to={''}          >
                        General
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => toggleTab('2')} to={''}          >
                        Requirements
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => toggleTab('3')} to={''}          >
                        Registration Limits
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '4' })}
                        onClick={() => toggleTab('4')} to={''}          >
                        Courses
                    </NavLink>
                </NavItem>
            </Nav>
         
            <div className='regulation-detail-container'>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Table bordered>
                        <tbody>

                            <tr>
                                <td><span className='black-bold'>Regulation Code</span></td>
                                <td>{regulation?.code}</td>
                            </tr>
                            <tr>
                                <td><span className='black-bold'>Faculty</span></td>
                                <td>{regulation?.Faculty.name}</td>
                            </tr>
                            <tr>
                                <td><span className='black-bold'>Issued on</span></td>
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
                                <td>Students</td>
                                <td><a href="/students/132">0 students</a></td>
                            </tr>
                        </tbody>
                    </Table>
                </TabPane>

                <TabPane tabId="2">
                    <h4>Requirements</h4>
                    <p>List all the requirements for this regulation...</p>
                </TabPane>

                <TabPane tabId="3">
                    <h4>Registration Limits</h4>
                    <p>Show the registration limits here...</p>
                </TabPane>

                <TabPane tabId="4">
                    <h4>Courses</h4>
                    <p>List the courses under this regulation here...</p>
                </TabPane>
            </TabContent>
        </div>
        </div>
        
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getRegulationDetails: regulationAction.viewRegulationDetailsAction,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(RegulationDetails);
