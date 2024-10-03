import React, { useEffect, useState } from 'react';
import { Table, Input ,Button} from 'reactstrap';
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
  const [rows, setRows] = useState(rowValues);
  const navigate = useNavigate();

  console.log(rows)

  useEffect(() => {
    if (rowValues.length > 0) {
      setRows(rowValues); // Update rows whenever rowValues changes
    }
  }, [rowValues]);
  const handleRowClick = (row: any,arrayIndex:number) => {
  //   if (row.Bylaws && Array.isArray(row.Bylaws) && row.Bylaws.length > 0) {
  //     console.log(`Bylaws ID: ${row.Bylaws[arrayIndex].id}`);
  // }
  
    if (pathKey) {

      let path = pathKey;

      if (path.includes(':id')) {
        path = path.replace(':id', row.id);
      }

      if (path.includes(':bylawId')) {
        if (row.Bylaws && Array.isArray(row.Bylaws) && row.Bylaws.length > 0) {
        path = path.replace(':bylawId', row.Bylaws[arrayIndex].id);}
      }

      navigate(path); // Navigate to the dynamic path
    }
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, header: any) => {
    console.log(header)

    const value = e.target.value;
    setFilters({
      ...filters,
      [header]: value,
    });
  };

  
  const filteredRows = rows.filter((row) => 
    features.every((feature) => {
      const featureValue = row[feature];

    // Log the feature value for debugging
    // console.log(featureValue);

    // Handle undefined or null values
    if (featureValue === undefined || featureValue === null) {
      return true; // Filter out if the feature value is undefined or null
    }
    if (Array.isArray(featureValue)) {
     return featureValue.some(item =>
      item?.[arraycolumn] // Replace 'key' with the object key you want to filter on (e.g., 'code')
            ?.toString()
            .toLowerCase()
            .includes(filters[feature]?.toLowerCase() || '')
        );
    }
      return featureValue.toString().toLowerCase().includes(filters[feature]?.toLowerCase() || '');
    })
  )
  console.log(filteredRows)
  return (
    <div>
      <Table striped bordered>
        <thead className='table-title'>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>
                {header}
                {showSearchBars && index > 0 && ( // Exclude the first column from search bars
                  <Input
                    type="text"
                    placeholder={`Search ${header}`}
                    value={filters[features[index - 1]] || ''}
                    onChange={(e) => handleFilterChange(e, features[index - 1])}
                    style={{ marginTop: '5px', fontSize: 'small', width: "150px" }}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>

        {filteredRows .map((row, rowIndex) => {
            // Check if any feature value is an array
            const arrayFeatures = features.filter((feature) => row[feature] !== undefined&&Array.isArray(row[feature]) );
          // console.log(arrayFeatures)
            // If no array-based features, just render the row normally
            if (arrayFeatures.length === 0) {
              return (
                <tr key={rowIndex} onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
                  <td>
                    <Input style={{ marginRight: '7px' }} type="checkbox" />
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

            // If there are array-based features, create a row for each array element
            const maxArrayLength = Math.max(...arrayFeatures.map((feature) => row[feature].length));
           
            // Render multiple rows for the array features
            return Array.from({ length: maxArrayLength }).map((_, arrayIndex) => (
              <tr key={`${rowIndex}-${arrayIndex}`} onClick={() => handleRowClick(row,arrayIndex)} style={{ cursor: 'pointer' }}>
                <td>
                  <Input style={{ marginRight: '7px' }} type="checkbox" />
                </td>
                {features.map((feature, featureIndex) => (
                  <td key={featureIndex}>
                    {/* If this feature is an array, display the current array item, else display the regular value */}
                    {row.hasOwnProperty(feature)
                      ? Array.isArray(row[feature])
                        ? row[feature][arrayIndex]
                          ? (
                            <a
                              href={`/path-to-id/${row[feature][arrayIndex].id}`}
                              style={{ display: 'block' }} // Display each item on a new line
                            >
                              {row[feature][arrayIndex][arraycolumn]}
                            </a>
                            )
                          : '-'
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
