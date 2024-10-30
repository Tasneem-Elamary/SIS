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

const ViewTable: React.FC<ViewTableProps> = ({ headers, features, rowValues, pathKey, showSearchBars = false, arraycolumn, onAccept, onDecline, onCheckedRowsChange }) => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [rows, setRows] = useState(rowValues);
  const [checkedRows, setCheckedRows] = useState<number[]>([]);
  const navigate = useNavigate();

  const featurePathMap: { [key: string]: (id: string, bylawId?: string) => string } = {
    course: (id, bylawId) => `/Course/${id}/bylaw/${bylawId}`,
    bylaw: (id) => `/Course/${id}`,
    department: (id) => `/Department/${id}`,
    // Add other features and their paths here as needed
  };

  useEffect(() => {
    if (rowValues.length > 0) {
      setRows(rowValues); 
      setCheckedRows([])// Update rows whenever rowValues changes
    }
  }, [rowValues]);

  // Notify parent component of the checked rows count whenever it changes
  useEffect(() => {
    if (onCheckedRowsChange) {
      onCheckedRowsChange(checkedRows);
      
    }
  }, [checkedRows, onCheckedRowsChange]);

  const handleRowClick = (row: any, arrayIndex: number) => {
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
        // if (row.Bylaws && Array.isArray(row.Bylaws) && row.Bylaws.length > 0) {
        //   path = path.replace(':bylawId', row.Bylaws[arrayIndex].id);
        // }
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

  const handleCheckboxChange = (rowIndex: number,row:any, arrayIndex?: number) => {
    const rowId = rowIndex; // Create unique identifier for each row or sub-row
    setCheckedRows((prevCheckedRows) =>
      prevCheckedRows.includes(rowId)
        ? prevCheckedRows.filter((id) => id !== rowId) // Uncheck
        : [...prevCheckedRows, rowId] // Check
    );
  };

  const filteredRows = rows
    .map((row) => {
      const filteredRow = { ...row };
      features.forEach((feature) => {
        const featureValue = row[feature];

        if (featureValue === undefined || featureValue === null && !filters[feature]) return filteredRow[feature] = '';
        else if (featureValue === undefined || featureValue === null && filters[feature]) {
          filteredRow[feature] = null; // Mark as non-match
          return;
        }
        if (Array.isArray(featureValue)) {
          filteredRow[feature] = featureValue.filter((item) =>
            item?.[arraycolumn]?.toString().toLowerCase().includes(filters[feature]?.toString().toLowerCase() || "")
          );
        } else {
          filteredRow[feature] = featureValue?.toString().toLowerCase().includes(filters[feature]?.toLowerCase() || '')
            ? featureValue
            : null;
        }
      });
      return filteredRow;
    })
    .filter((row) =>
      features.every((feature) => {
        const featureValue = row[feature];
        if (Array.isArray(featureValue)) {
          return featureValue.length > 0;
        }
        return featureValue !== null;
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
            const arrayFeatures = features.filter((feature) => row[feature] !== undefined && Array.isArray(row[feature]));
            if (arrayFeatures.length === 0) {
              return (
                <tr key={rowIndex} style={{ cursor: 'pointer' }}>
                  <td>
                    <Input
                      style={{ marginRight: '7px' }}
                      type="checkbox"
                      checked={checkedRows.includes(rowIndex)}
                      onChange={() => handleCheckboxChange(rowIndex,row)}
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
            }
            const maxArrayLength = Math.max(...arrayFeatures.map((feature) => row[feature].length));
            return Array.from({ length: maxArrayLength }).map((_, arrayIndex) => (
              <tr key={`${rowIndex}-${arrayIndex}`} style={{ cursor: 'pointer' }}>
                <td>
                  <Input
                    style={{ marginRight: '7px' }}
                    type="checkbox"
                    checked={checkedRows.includes(`${rowIndex}-${arrayIndex}`)}
                    onChange={() => handleCheckboxChange(rowIndex, arrayIndex)}
                  />
                </td>
                {features.map((feature, featureIndex) => (
                  <td
                    key={featureIndex}
                    onClick={feature.toLowerCase().includes("code") ? () => handleRowClick(row, arrayIndex) : undefined}
                    style={feature.toLowerCase().includes("code") ? { cursor: 'pointer', color: '#007bff' } : {}}
                  >
                    {row.hasOwnProperty(feature)
                      ? Array.isArray(row[feature])
                        ? row[feature][arrayIndex]
                          ? (
                            <a
                              href={`/path-to-id/${row[feature][arrayIndex].id}`}
                              style={{ display: "block" }}
                            >
                              {row[feature][arrayIndex][arraycolumn]}
                            </a>
                          )
                          : "-"
                        : row[feature] || "-"
                      : "-"}
                  </td>
                ))}
                {headers.includes('Decision') && (
                  <td>
                    <Button onClick={() => onAccept(row, arrayIndex)} color="success" style={{ marginRight: '5px' }}>
                      Accept
                    </Button>
                    <Button onClick={() => onDecline(row, arrayIndex)} color="danger">
                      Decline
                    </Button>
                  </td>
                )}
              </tr>
            ));
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewTable;

