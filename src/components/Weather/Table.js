import React from "react";

const Table = ({ headers, data }) => (
  <table className="table is-fullwidth is-hoverable">
    <thead>
      <tr>{headers.map((title, index) => <th key={index}>{title}</th>)}</tr>
    </thead>
    <tbody>
      {data.map((data, index) => (
        <tr key={index}>
          <td>{data.timestamp}</td>
          <td>{data.temperature}</td>
          <td>{data.rain}</td>
          <td>{data.heat_index}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;