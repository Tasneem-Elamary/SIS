import React from 'react';
import { Table, Input } from 'reactstrap';
import './viewtable.scss';

interface ViewTableProps {
  headers: string[];
  features:string[];
  rowValues: { [key: string]: any }[]; // The rowValues is an array of objects with any values.
}

const ViewTable: React.FC<ViewTableProps> = ({ headers,features, rowValues }) => {
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
            <tr key={index}>
              <th scope="row">
                <Input style={{ marginRight: "7px" }} type="checkbox" />
                {row.code}
              </th>
              {features.map((feature, index) => (
                <td key={index}>{row[feature]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewTable;
