import React from "react";
import { Table } from 'reactstrap';

export default class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
}

  render() {
    return (
      <Table>
        <thead>
        <tr>{this.props.headers.map((title, index) => <th key={index}>{title}</th>)}</tr>
        </thead>
        <tbody>
          {this.props.data.map((data, index) => (
          <tr key={index}>
            <td>{data.temperature}°C, feels like {data.heat_index} </td>
          </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
