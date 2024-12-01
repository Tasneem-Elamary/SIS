import React, { useEffect, useState } from 'react';
import { Table, Input, Button } from 'reactstrap';
import './viewtable.scss';
import { useNavigate } from 'react-router-dom';
import { RiCloseLargeFill, RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import ModalExample from '../../helpers/modal';

interface ViewTableProps {
  headers: string[];// Table header
  features: string[];// features to be viewed header
  rowValues: { [key: string]: any }[]; // Array of row data
  pathKey?: string; // For dynamic navigation path
  showSearchBars: boolean;
  onAccept?: (row: any, arrayIndex?: number) => void;
  onDecline?: (row: any, arrayIndex?: number) => void;
  handleOnDeleteAction?: any;
}

const ViewTable: React.FC<ViewTableProps> = ({
  headers,
  features,
  rowValues,
  pathKey,
  showSearchBars = false,
  onAccept,
  onDecline,

  handleOnDeleteAction
}) => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [rows, setRows] = useState(rowValues);
  const [checkedRows, setCheckedRows] = useState<string[]>([]); // For UI row checks
  const [checkedData, setCheckedData] = useState<string[]>([]); // For IDs used in backend
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setRows(rowValues.map((row) => {
      const updatedRow: { [key: string]: any } = {};
      Object.keys(row).forEach((key) => {
        updatedRow[key] = row[key] === null ? '-' : row[key];
      });
      return updatedRow;
    }));
    // Reset rows and checked (row & data) when rowValues update
    setCheckedRows([]);
    setCheckedData([]);
  }, [rowValues]);



  // Handle row navigation based on pathKey and row data
  const handleRowClick = (row: any, arrayIndex: number) => {
    if (pathKey) {
      let path = pathKey;
      path = path.replace(':courseId', row.CourseId || '');
      path = path.replace(':taId', row.id || '');
      path = path.replace(':doctorId', row.id || '');
      if (row.Bylaws && Array.isArray(row.Bylaws) && row.Bylaws.length > 0) {
        path = path.replace(':bylawId', row.Bylaws[arrayIndex].id || '');
      }
      navigate(path);
    }
  };

  // Update filters for searchable columns
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, header: string) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [header]: value,
    });
  };

  // Filter rows based on search inputs
  const filteredRows = rows.filter((row) =>
    features.every((feature) =>
      row[feature]?.toString().toLowerCase().includes(filters[feature]?.toLowerCase() || '')
    )
  );

  // Toggle row check and update checkedData for backend IDs
  const handleRowCheck = (rowIndex: number, arrayIndex?: number) => {
    const rowId = arrayIndex !== undefined ? `${rowIndex}-${arrayIndex}` : `${rowIndex}`;
    const rowPrimaryId = rowValues[rowIndex]['id']; // Use database ID
    console.log("Deleting rows with IDs:", rowPrimaryId);

    setCheckedRows((prevCheckedRows) =>
      prevCheckedRows.includes(rowId)
        ? prevCheckedRows.filter((id) => id !== rowId)
        : [...prevCheckedRows, rowId]
    );

    setCheckedData((prevCheckedData) =>
      prevCheckedData.includes(rowPrimaryId)
        ? prevCheckedData.filter((id) => id !== rowPrimaryId)
        : [...prevCheckedData, rowPrimaryId]
    );

  };

  const handleOnDelete = async () => {
    console.log("Deleting rows with IDs:", checkedData);

    try {
      console.log("Deleting rows with IDs:", checkedData);


      const message = dispatch(handleOnDeleteAction(checkedData));
      if (message) {
        console.log("debug message ", message)
        setSuccessMessage(message)
        setSuccessModalOpen(true)
      }
      //clear the selection after deletion
      setCheckedRows([]);
      setCheckedData([]);
    } catch (error) {
      console.error("Error deleting rows:", error);
    }

  };
  const handleDelete = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  }
  const handleOnCancel = () => {
    setDeleteModalOpen(!isDeleteModalOpen);

  }
  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
  };
  // Cancel selection and reset checked states
  const handleCancel = () => {
    setCheckedRows([]);
    setCheckedData([]);
  };

  return (
    <div>


      {checkedRows.length > 0 && (
        <div className='view-table-selected'>
          <span>{checkedRows.length} items selected</span>
          <span className='delete-icon' onClick={handleDelete}><RiDeleteBin6Line /> Delete</span>

          <ModalExample
            title="Delete Records"
            isOpen={isDeleteModalOpen}
            content="Are you sure you want to continue?"
            onConfirm={handleOnDelete}
            onCancel={handleOnCancel}
            confirmBTNText="Delete"
            confirmBTNColor="danger"
          />


          <ModalExample

            content={successMessage}
            isOpen={isSuccessModalOpen}
            onCancel={handleCloseSuccessModal}
            cancelBTNText="OK"
            cancelBTNColor="success"
          />

          <span className='cancel-icon' onClick={handleCancel}><RiCloseLargeFill /> Cancel</span>
        </div>
      )}

      <Table striped bordered>
        <thead className="table-title">
          <tr>
            {headers.map((header, index) => (
              <th key={index}>
                {header}
                {showSearchBars && index > 0 && (
                  <Input
                    type="text"
                    placeholder={`Search ${header}`}
                    value={filters[features[index - 1]] || ''}
                    onChange={(e) => handleFilterChange(e, features[index - 1])}
                    style={{ marginTop: '5px', fontSize: 'small', width: '150px' }}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row, rowIndex) => {
            const arrayFeatures = features.filter(
              (feature) => row[feature] !== undefined && Array.isArray(row[feature])
            );

            if (arrayFeatures.length === 0) {
              return (
                <tr key={rowIndex} style={{ cursor: 'pointer' }}>
                  <td>
                    {handleOnDeleteAction && <Input
                      type="checkbox"
                      checked={checkedRows.includes(`${rowIndex}`)}
                      onChange={() => handleRowCheck(rowIndex)}
                    />}
                  </td>
                  {features.map((feature, featureIndex) => (
                    <td key={featureIndex} onClick={() => handleRowClick(row, rowIndex)}>
                      {row[feature] != null ? row[feature] : '-'}
                    </td>
                  ))}
                  {headers.includes('Decision') && (
                    <td>
                      <Button onClick={(e) => { e.stopPropagation(); onAccept && onAccept(row); }} color="success">
                        Accept
                      </Button>
                      <Button onClick={(e) => { e.stopPropagation(); onDecline && onDecline(row); }} color="danger">
                        Decline
                      </Button>
                    </td>
                  )}
                </tr>
              );
            }

;
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewTable;


