import React, { useState } from 'react';
import { Table, Input, Button } from 'reactstrap';
import './viewtable.scss';
import { useNavigate } from 'react-router-dom';

interface ViewTableProps {
  headers: string[];
  features: string[];
  rowValues: { [key: string]: any }[];
  pathKey?: string;
  showSearchBars: boolean
  arraycolumn:string
}

const ViewTable: React.FC<ViewTableProps> = ({ headers, features, rowValues, pathKey, showSearchBars = false 
  ,arraycolumn,onAccept, onDecline}) => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  // const [rows, setRows] = useState(rowValues);
  // const navigate = useNavigate();

  // console.log(rows)

  // useEffect(() => {
  //   if (rowValues.length > 0) {
  //     setRows(rowValues); // Update rows whenever rowValues changes
  //   }
  // }, [rowValues]);
  // const handleRowClick = (row: any,arrayIndex:number) => {
  // //   if (row.Bylaws && Array.isArray(row.Bylaws) && row.Bylaws.length > 0) {
  // //     console.log(`Bylaws ID: ${row.Bylaws[arrayIndex].id}`);
  // // }
  
  //   if (pathKey) {
  const [checkedData, setCheckedData] = useState<string[]>([]); // Tracks checked row IDs
  const navigate = useNavigate();

  const handleCheckBoxCheck = (rowId: string) => {
    setCheckedData((prevCheckedData) => {
      const isAlreadyChecked = prevCheckedData.includes(rowId);
      return isAlreadyChecked
        ? prevCheckedData.filter((id) => id !== rowId)
        : [...prevCheckedData, rowId];
    });
  };

  const handleRowClick = (row: any, arrayIndex: number) => {
    if (pathKey) {
      let path = pathKey;

      if (path.includes(':id')) {
        path = path.replace(':id', row.id);
      }

      if (path.includes(':bylawId')) {
        if (row.Bylaws && Array.isArray(row.Bylaws) && row.Bylaws.length > 0) {
          path = path.replace(':bylawId', row.Bylaws[arrayIndex].id);
        }
      }

      navigate(path); // Navigate to the dynamic path
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, header: string) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [header]: value,
    });
  };

  
  // const filteredRows = rows.filter((row) => 
  //   features.every((feature) => {
  //     const featureValue = row[feature];

  //   // Log the feature value for debugging
  //   // console.log(featureValue);

  //   // Handle undefined or null values
  //   if (featureValue === undefined || featureValue === null) {
  //     return true; // Filter out if the feature value is undefined or null
  //   }
  //   if (Array.isArray(featureValue)) {
  //    return featureValue.some(item =>
  //     item?.[arraycolumn] // Replace 'key' with the object key you want to filter on (e.g., 'code')
  //           ?.toString()
  //           .toLowerCase()
  //           .includes(filters[feature]?.toLowerCase() || '')
  //       );
  //   }
  //     return featureValue.toString().toLowerCase().includes(filters[feature]?.toLowerCase() || '');
  //   })
  // )
  // console.log(filteredRows)
  const filteredRows = rowValues.filter((row) =>
    features.every((feature) =>
      row[feature]?.toString().toLowerCase().includes(filters[feature]?.toLowerCase() || '')
    )
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
            const arrayFeatures = features.filter(
              (feature) => row[feature] !== undefined && Array.isArray(row[feature])
            );

            if (arrayFeatures.length === 0) {
              return (
                <tr key={rowIndex} style={{ cursor: 'pointer' }}>
                  <td>
                    <Input
                      style={{ marginRight: '7px' }}
                      type="checkbox"
                      // checked={checkedData.includes(row['id'])} 
                      // onChange={() => handleCheckBoxCheck(row['id'])}  // Single checkbox row
                    />
                  </td>
                  {features.map((feature, featureIndex) => (
                    <td key={featureIndex}>{row.hasOwnProperty(feature) ? row[feature] || '-' : '-'}</td>
                  ))}
                  {headers.includes('Decision') && (
                    <td>
                      <Button onClick={() => onAccept(row)} color="success" style={{ marginRight: '5px' }}>
                        Accept
                      </Button>
                      <Button  onClick={() => onDecline(row)} color="danger">Decline</Button>
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
                    checked={checkedData.includes(`${row.id}-${arrayIndex}`)}  // Unique id per array index
                    onChange={() => handleCheckBoxCheck(`${row.id}-${arrayIndex}`)}  // Handle based on unique id
                  />
                </td>
                {features.map((feature, featureIndex) => (
                  <td key={featureIndex}>
                    {row.hasOwnProperty(feature)
                      ? Array.isArray(row[feature])
                        // ? row[feature][arrayIndex]
                        //   ? (
                        //     <a
                        //       href={`/path-to-id/${row[feature][arrayIndex].id}`}
                        //       style={{ display: 'block' }} // Display each item on a new line
                        //     >
                        //       {row[feature][arrayIndex][arraycolumn]}
                        //     </a>
                        //     )
                        //   : '-'
                        ? row[feature][arrayIndex] || '-'
                        : row[feature] || '-'
                      : '-'}
                  </td>
                ))}
                {headers.includes('Decision') && (
                  <td>
                    <Button onClick={() => onAccept(row,arrayIndex)} color="success" style={{ marginRight: '5px' }}>
                      Accept
                    </Button>
                    <Button onClick={() => onDecline(row,arrayIndex)} color="danger">Decline</Button>
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
