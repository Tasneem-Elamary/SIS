import React, { useEffect, useState } from 'react';
import { Table, Input, Button } from 'reactstrap';
import './viewtable.scss';
import { useNavigate } from 'react-router-dom';

interface ViewTableProps {
  headers: string[];
  features: string[];
  rowValues: { [key: string]: any }[];
  pathKey?: string;
  showSearchBars: boolean
  arraycolumn?: string
}

const ViewTable: React.FC<ViewTableProps> = ({ headers, features, rowValues, pathKey, showSearchBars = false,  onAccept, onDecline, onCheckedRowsChange }) => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
 
  const [checkedRows, setCheckedRows] = useState<number[]>([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (rowValues.length > 0) {
     
      setCheckedRows([])// Update rows whenever rowValues changes
    }
  }, [rowValues]);

  
  useEffect(() => {
    if (onCheckedRowsChange) {
      onCheckedRowsChange(checkedRows);
      
    }
  }, [checkedRows, onCheckedRowsChange]);

  const handleRowClick = (row: any) => {
    console.log(row)
    if (pathKey) {
      let path = pathKey;
      if (path.includes(':courseId')) {
        path = path.replace(':courseId', row.CourseId);
      }
      if (path.includes(':taId')) {
        path = path.replace(':taId', row.id);
      }
      if (path.includes(':doctorId')) {
        path = path.replace(':doctorId', row.id);
      }
      if (path.includes(':bylawId')) {
        path = path.replace(':bylawId', row.BylawId);
        
      }
      navigate(path);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, header: any) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [header]: value,
    });
  };

  const handleCheckboxChange = (rowIndex: number) => {
    setCheckedRows((prevCheckedRows) =>
      prevCheckedRows.includes(rowIndex)
        ? prevCheckedRows.filter((id) => id !== rowIndex) // Uncheck
        : [...prevCheckedRows, rowIndex] // Check
    );
  };

  const filteredRows = rowValues.filter((row) =>
    features.every((feature) => {
      const featureValue = row[feature];
  
      if (filters[feature]) {
        
          return featureValue?.toString().toLowerCase().includes(filters[feature].toLowerCase());
        
      }
      return true;
    })
  );

  return (
    <div>
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
           
              return (
                <tr key={rowIndex} style={{ cursor: 'pointer' }}>
                  <td>
                    <Input
                      style={{ marginRight: '7px' }}
                      type="checkbox"
                      checked={checkedRows.includes(rowIndex)}
                      onChange={() => handleCheckboxChange(rowIndex)}
                    />
                  </td>
                  {features.map((feature, featureIndex) => (
                    <td
                      key={featureIndex}
                      onClick={feature.toLowerCase().includes("code") ? () => handleRowClick(row) : undefined}
                      style={feature.toLowerCase().includes("code") ? { cursor: 'pointer', color: '#007bff' } : {}}
                    >
                      {row.hasOwnProperty(feature) ? row[feature] || '-' : '-'}
                    </td>
                  ))}
                  {headers.includes('Decision') && (
                    <td>
                      <Button onClick={() => onAccept(row)} color="success" style={{ marginRight: '5px' }}>
                        Accept
                      </Button>
                      <Button onClick={() => onDecline(row)} color="danger">
                        Decline
                      </Button>
                    </td>
                  )}
                </tr>
              );
            
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewTable;

