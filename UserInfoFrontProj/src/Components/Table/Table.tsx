import React from "react";
import { useTable, useSortBy, useFilters, Column, Row } from "react-table";
import { useEffect } from "react";
import "./../../Styles/Table.css"; // Import your existing styles

export interface TableProps<D extends object> {
  columns: Column<D>[];
  data: D[];
  rowClass?: Function;
  setRowData: Function;
}

const TableComponent = <D extends object>({
  columns,
  data,
  rowClass,
  setRowData
}: TableProps<D>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useFilters,
      useSortBy
    );

  useEffect(() => {
    setRowData(rows);
  }, [rows]);

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className="table-header">
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} className="table-column-header">
                {column.render("Header")}
                {column.canFilter ? column.render("Filter") : null}
                <div className="table-column-sort">
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : "🔼"
                      : ""}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              className={rowClass ? rowClass(row) : "table-row"}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    className="table-column"
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;
