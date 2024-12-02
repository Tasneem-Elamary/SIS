import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink as RouterNavLink, useNavigate, useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import './style.scss';

import RegulationNav from './regulationNav';
import { Button, Dropdown, DropdownItem, DropdownMenu, Form, FormGroup, Input, Label, Nav, NavItem, Navbar, TabContent, TabPane, Table } from 'reactstrap';
import regulationAction from '../../state/actions/regulation.action';
import MainNavBar from '../shared/mainNavbar';
import RegisterationNavbar from '../shared/registerationNavbar';
import { CourseType } from '../../interfaces/domain';

interface RegulationDetailsProps {
  getRegulationDetails: (regulationId: string) => Promise<any>;
  getRegulationlimits: (regulationId: string) => Promise<any>;
  getCourseDetails: (regulationId: string) => Promise<any>;
  getCoursesNotIn: (regulationId: string) => Promise<any>;
  AddCourseToRegulation: (regulationId: string, courseId: string, isElective: boolean) => Promise<any>;
}

const RegulationDetails = ({ getRegulationDetails, getRegulationlimits, getCourseDetails, getCoursesNotIn, AddCourseToRegulation }: RegulationDetailsProps) => {
  const [regulation, setRegulation] = useState<any>(null);
  const [limits, setLimits] = useState<any>([]);
  const [grades, setGrades] = useState<any>([]);
  const [courses, setCourses] = useState<any>([]);
  const [notInCourses, setNotInCourses] = useState<any>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isElective, setIsElective] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { regulationId } = useParams<string>();
  const [activeTab, setActiveTab] = useState<number>(1);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (regulationId) {
        try {
          setLoading(true);
          if (activeTab === 1) {
            const bylaw = await getRegulationDetails(regulationId);
            if (isMounted) setRegulation(bylaw);
          } else if (activeTab === 3) {
            const { Grades, BylawRules } = await getRegulationlimits(regulationId);
            if (isMounted) {
              setLimits(BylawRules);
              setGrades(Grades);
            }
          } else if (activeTab === 4) {
            const courses = await getCourseDetails(regulationId);
            const notInCourses = await getCoursesNotIn(regulationId);
            if (isMounted) {
              setCourses(courses);
              setNotInCourses(notInCourses);
            }
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          if (isMounted) setLoading(false);
        }
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [regulationId, activeTab, getRegulationDetails, getRegulationlimits, getCourseDetails, getCoursesNotIn]);

  const toggleTab = (tab: number) => { if (activeTab !== tab) setActiveTab(tab); };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourse && regulationId) {
      await AddCourseToRegulation(regulationId, selectedCourse, isElective);
      setSelectedCourse(null);
      setIsElective(false);
      const updatedCourses = await getCoursesNotIn(regulationId);
      setNotInCourses(updatedCourses);
    }
  };

  return (
    <div>
      <RegisterationNavbar />
      <MainNavBar activeItem="Regulations" />
      <RegulationNav />
      <div className="fixed-title-padding"></div>
      <div className="reg-container">
        <div className="reg-fixed-header">
          <h4>{regulation?.code}</h4>
          <p>{regulation?.description}</p>
        </div>

        <div className="regulation-detail-container">
          <Navbar expand="md" className="sub-reg-nav">
            <Nav className="me-auto" navbar>
              {[
                { id: 1, label: 'General' },
                { id: 2, label: 'Requirements' },
                { id: 3, label: 'Registration Limits' },
                { id: 4, label: 'Courses' }
              ].map(tab => (
                <NavItem key={tab.id}>
                  <RouterNavLink to="#" className={activeTab === tab.id ? 'nav-reg-link-active' : 'nav-reg-link-custom'} onClick={() => toggleTab(tab.id)}>
                    {tab.label}
                  </RouterNavLink>
                </NavItem>
              ))}
            </Nav>
          </Navbar>

          <TabContent className="tab-container" activeTab={activeTab}>
            {/* Tab 1 */}
            <TabPane tabId={1}>
              <Table className="reg-table" bordered>
                <tbody>
                  <tr><td>Regulation Code</td><td>{regulation?.code}</td></tr>
                  <tr><td>Issued For</td><td>{regulation?.Faculty?.name}</td></tr>
                  <tr><td>Issued In</td><td>{regulation?.year}</td></tr>
                  <tr><td>Graduation credit hours</td><td>{regulation?.credit_Hours}</td></tr>
                  <tr><td>Graduation GPA</td><td>{regulation?.min_GPA}</td></tr>
                </tbody>
              </Table>
            </TabPane>

            {/* Tab 4 */}
            <TabPane tabId={4}>
              <Table className="reg-table" bordered>
                <thead><tr><th>Course Code</th><th>Course Name</th></tr></thead>
                <tbody>
                  {courses.map((course: any) => (
                    <tr key={course.code}><td>{course.code}</td><td>{course.name}</td></tr>
                  ))}
                </tbody>
              </Table>

              <Form onSubmit={handleAddCourse}>
                <FormGroup>
                  <Label for="addCourseSelect">Add course to regulation</Label>
                  <Input id="addCourseSelect" type="select" value={selectedCourse || ''} onChange={e => setSelectedCourse(e.target.value)}>
                    <option value="">Select Course</option>
                    {notInCourses.map((course: CourseType) => (
                      <option key={course.id} value={course.id}>{course.code} - {course.name}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup check>
                  <Input type="checkbox" checked={isElective} onChange={() => setIsElective(!isElective)} />
                  <Label check>Is Elective</Label>
                </FormGroup>
                <Button type="submit">Add Course</Button>
              </Form>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({
    getRegulationDetails: regulationAction.viewRegulationDetailsAction,
    getRegulationlimits: regulationAction.viewRegulationRulesAction,
    getCourseDetails: regulationAction.viewRegulationCoursesAction,
    getCoursesNotIn: regulationAction.viewCoursesNotInRegulationAction,
    AddCourseToRegulation: regulationAction.addRegulationCourseAction
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(RegulationDetails);
