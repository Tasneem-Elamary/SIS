import React, { useState } from 'react';
import './style.scss'; // Import the SCSS file
import { StudentType } from '../../../interfaces/domain';
import { useDispatch, useSelector } from 'react-redux';
import studentAction from '../../../state/actions/student.action';

const RankStudentForm: React.FC = () => {
  const [studentId, setStudentId] = useState('');
  const [rank, setRank] = useState<number | null>(null);
  const [rowValues, setrowValues] = useState<StudentType[]>([]);
  const [prefix, setPrefix] = useState('');  // State for prefix
  const [limit, setLimit] = useState<number | ''>('');  // State for limit


  const dispatch = useDispatch();

  const handleGetRank = async () => {

    const fetchedRank = await dispatch(studentAction.getStudentRank(studentId));
    setRank(fetchedRank);
  };

  const exportCSV = async () => {
    try {
      const students = await dispatch(studentAction.getTopStudentsByGPA(prefix, limit));

      const csvContent = convertToCSV(students);

      // Create a Blob from the CSV data
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

      // Create a link element, and programmatically click it to download the file
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'top_students.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  const convertToCSV = (data: any[]) => {
    // Get headers (keys of the first object in the array)
    const headers = Object.keys(data[0]).join(',') + '\n';

    // Map the data to CSV rows
    const rows = data.map(row => Object.values(row).join(',')).join('\n');

    return headers + rows;
  };



  return (
    <div className="rank-student-form">
      <h2>Rank of students</h2>

      
        <div className="input-group">
          <label>id prefix</label>
          <select value={prefix} onChange={(e) => setPrefix(e.target.value)}>
            <option value="">Select id prefix</option>
            <option value="23L2">23L2</option>
            <option value="23L3">23L3</option>
            <option value="23CSL3">23L3</option>
            {/* Add more options as needed */}
          </select>

          <label>Limit</label>
          <input
            type="number"
            placeholder="Enter first n students"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))} // Ensure limit is a number
          />

          <button onClick={exportCSV}>Export File</button>
        </div>

        <div className="divider">
          <div className="divider-line"></div>
          <span>OR</span>
        </div>

        <div className="input-group">
          <label>Student ID</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter student ID"
          />
          <button onClick={handleGetRank}>
            Get Rank
          </button>
        </div>

        {rank !== null && (
          <div className="rank-result">
            {rank}
          </div>
        )}
      </div>
      );
};

export default RankStudentForm;