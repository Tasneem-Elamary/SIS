import React from 'react';
import { Table, Input } from 'reactstrap';
import './viewtable.scss';
import { useNavigate } from 'react-router-dom';

interface ViewTableProps {
  headers: string[];
  features: string[];
  rowValues: { [key: string]: any }[]; 
  pathKey?: string;// The rowValues is an array of objects with any values.
}

const ViewTable: React.FC<ViewTableProps> = ({ headers,features, rowValues , pathKey}) => {
  const navigate = useNavigate();
  const handleRowClick = (path: string | undefined) => {
    if (path) {
      navigate(path); // Navigate to the provided path
    }
  };
  return (
    <div>
      <Table striped>
        <thead className='table-title'>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowValues.map((row, index) => (
            <tr key={index} onClick={() => handleRowClick(pathKey )}
            style={{ cursor: 'pointer' }}>
              <th scope="row">
                <Input style={{ marginRight: "7px" }} type="checkbox" />
                {row.code}
              </th>
              {console.log(features)
              // features.map((feature, index) => (
              //   <td key={index}>{row[feature]}</td>
              // ))
              }
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewTable;
