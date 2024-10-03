import RegisterationNavbar from '../../shared/registerationNavbar';
import MainNavBar from '../../shared/mainNavbar';
import CoursesNavBar from '../CoursesLevelNavbar';
import { Button } from 'reactstrap';
import ViewTable from '../../shared/viewTable/ViewTable';
import './style.scss'
import { useEffect, useState } from 'react';
import { CourseType, InstructorType, ResultType, UserType } from '../../../interfaces/domain';
import { useDispatch, useSelector } from 'react-redux';
import { courseAction, instructorAction, reultAction } from '../../../state/actions';
import { useNavigate } from 'react-router-dom';
import resultAction from '../../../state/actions/result.action';



function AllResults({ }) {
    const [role, setRole] = useState<string>("student"); 
    const [rowValues, setrowValues] = useState<ResultType[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate(); 


    useEffect(() => {
        const fetchResults = async () => {
            if (role === "student") {
                const fetchedResults = await dispatch(reultAction.getStudentResultsAction("f7b79116-2c6b-4915-83f8-dea1285408f6"));
                setrowValues(fetchedResults);
            } else {
                const fetchedResults = await dispatch(reultAction.getAllResultsAction());
                setrowValues(fetchedResults);
            }
        };

        fetchResults();
    }, [dispatch]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
       
        const file = e.target.files?.[0] || null;
        console.log(file);
        
        setSelectedFile(file);

        if (file) {
            // Automatically trigger the upload after selecting a file
            await handleUploadClick(file);
        }
    };

    const handleUploadClick = async (file: File) => {
        if (!file) {
            alert("Please select a file before uploading");
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        try {
            const uploadedResults = await dispatch(resultAction.uploadResults(formData));
            console.log(uploadedResults)
            if (uploadedResults) {
                // Merge with existing rows (rowValues)
                setrowValues((prevRows) => {
                    const newRows = uploadedResults.map((newResult: ResultType) => {
                       
                        const existingRow = prevRows.find(row => row.id === newResult.id);
                        return existingRow ? { ...existingRow, ...newResult } : newResult;
                    });
                    

                    // Return merged array: keep previous rows that are not updated + new/updated rows
                    return [
                        ...prevRows.filter(row => !uploadedResults.some(newResult => newResult.id === row.id)),
                        ...newRows
                    ];
                });

                
            }



        } catch (error) {
            throw new Error('Failed to upload the file.');
        }

    }


    return (
        <div className="CreateLecturer">
            <RegisterationNavbar />
            <MainNavBar activeItem="Result" />
            <div className='container-table'>
                <div className="fixed-header">
                    <div style={{ marginLeft: "10px" }} className='header-content'>
                    <h3>{role === "student" ? "Transcript" : "Results"}</h3>
                    {role !== "student" && (
                            <>
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                                <Button
                                    onClick={() => document.getElementById('fileInput')?.click()}
                                    color='primary'
                                    className='download-button'
                                >
                                    Upload Result
                                </Button>
                            </>
                        )}
                    </div>
                    <hr />
                </div>
                <ViewTable headers={["", "Student Code", "Course Code", "Semster", "Course Work", "Midterm Grade", "Final Grade", "Grade Letter"]}
                    features={["Student", "Course", "Semester", "courseWork", "midtermGrade", "finalGrade", "Grade"]} rowValues={rowValues} pathKey="/Course/:id/bylaw/:bylawId" showSearchBars={true} arraycolumn='code' />
            </div>

        </div>
    );
}

export default AllResults;