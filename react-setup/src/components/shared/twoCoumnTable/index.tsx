import React from 'react';
import { Table } from 'reactstrap';
import './styl.scss'

const TwoColumnTable = ({ headers, values ,renderItem }) => {
  return (
    <Table bordered className="details-table">
      <tbody>
        {headers.map((header, index) => (
          <tr key={index}>
            <th>{header}</th>
            <td>
              {/* Check if the value is an array */}
              {Array.isArray(values[index]) 
                ? (
                  <ul>
                    {values[index].map((item: any, idx: number) => (
                      <li key={idx}>
                        {/* Use the custom render function if provided, otherwise render the item directly */}
                        {renderItem ? renderItem(item) : item}
                      </li>
                    ))}
                  </ul>
                )
                : values[index] // If it's not an array, display the value directly
              }
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TwoColumnTable;