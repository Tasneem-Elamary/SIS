import RegisterationNavbar from '../../shared/registerationNavbar';
import MainNavBar from '../../shared/mainNavbar';
import CoursesNavBar from '../CoursesLevelNavbar';
import { Button } from 'reactstrap';
import ViewTable from '../../shared/viewTable/ViewTable';
import './style.scss'
import { useEffect, useState } from 'react';
import { CourseType, InstructorType, UserType } from '../../../interfaces/domain';
import { useDispatch, useSelector } from 'react-redux';
import { courseAction, instructorAction } from '../../../state/actions';
import { useNavigate, useParams } from 'react-router-dom';




function CourseLevel() {
    const [rowValues, setRowValues] = useState<CourseType[]>([]);
    const [checkedRows, setCheckedRows] = useState<number[]>([]);
   
    const { level } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCourses = async () => {
            const fetchedCourse = await dispatch(courseAction.getCourseByLevelAction(level));
            setRowValues(fetchedCourse);
        };

        fetchCourses();
    }, [dispatch, level]);

    // Handle changes in selected rows
    const onCheckedRowsChange = (selectedRowIds: string[]) => {
        setCheckedRows(selectedRowIds);
    };

    // Function to delete selected rows
    const handleDeleteSelectedRows =async () => {
        // Here you can dispatch an action to delete rows from the backend
        // Filter out the selected rows from `rowValues`
        const remainingRows = rowValues.filter((_, index) => !checkedRows.includes(index));
        const deletedRows = rowValues.filter((_, index) => checkedRows.includes(index));
        await Promise.all(
            deletedRows.map(async (row) => {
                await dispatch(courseAction.deletecourseWithBylawAndDpartmentAction(row.CourseId, row.BylawId, row.DepartmentId));
            })
        );
        setRowValues(remainingRows);
       
        setCheckedRows([]);
    };

    return (
        <div className="CreateLecturer">
            <RegisterationNavbar />
            <MainNavBar activeItem="Courses" />
            <CoursesNavBar activeItem={level} />
            <div className='container-table'>
                <div className="fixed-header">
                    <div style={{ marginLeft: "10px" }} className='header-content'>
                        <h3>Level {level} courses</h3>
                        <Button color='primary' className='download-button'>Download course List</Button>
                    </div>
                    <hr />
                </div>

                {/* Show message with the count of selected rows and delete button */}
                {checkedRows.length > 0 && (
                    <div className="selection-message">
                        <span>{checkedRows.length} row(s) selected.</span>
                        <Button color="danger" onClick={handleDeleteSelectedRows} style={{ marginLeft: '10px' }}>
                            Delete Selected
                        </Button>
                    </div>
                )}

                <ViewTable
                    headers={["", "Course Code", "Bylaw Code", "DepartmentCode"]}
                    features={["CourseCode", "BylawCode", "DepartmentCode"]}
                    rowValues={rowValues}
                    pathKey="/Course/:courseId/bylaw/:bylawId"
                    showSearchBars={true}
                    arraycolumn='code'
                    onCheckedRowsChange={onCheckedRowsChange} // Pass handler as a prop
                />
            </div>
        </div>
    );
}

export default CourseLevel;