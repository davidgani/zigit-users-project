import { useEffect, useRef, useState } from "react";
import { IUserInfoTableData } from "../Shared/IUserInfoTableData";
import  DefaultColumnFilter  from "./Table/ColumnFilters";
import TableComponent from "./Table/Table";
import { Column, Row } from "react-table";
import TableInfoBar from "./TableInfoBar";
import { Grid } from "@mui/material";

const PASSING_SCORE = 90;
const FAILING_SCORE = 70;


const getUserStatusColor = (row: any) => {
  const red = "red";
  const green = "green";
  const defaultColor = "default";

  if (row.values.score > PASSING_SCORE) {
    return green;
  } else if (row.values.score < FAILING_SCORE) {
    return red;
  }
  return defaultColor;
};

const BooleanCell: React.FC<{ value: boolean }> = ({ value }) => (
    <span>{value ? 'Yes' : 'No'}</span>
  );

const UserInfoTableComponent = ({rowData}: {rowData: Row<IUserInfoTableData>[]}) => {
const [data, setRowData] = useState<Row<IUserInfoTableData>[]>(rowData);

return (
    <Grid container flexDirection={"column"}>
    <Grid item xs={12}>
      <TableInfoBar data={data} />
    </Grid>
    <Grid item xs={12}>
    <TableComponent
          columns={columns}
          data={rowData}
          setRowData={setRowData}
          rowClass={getUserStatusColor} />
    </Grid>
  </Grid>

  );
};
export default UserInfoTableComponent;

const columns = [
    {
      Header: "Name",
      accessor: "name",
      Filter: DefaultColumnFilter
    } as Column,
    {
      Header: "Score",
      accessor: "score",
      Filter: DefaultColumnFilter
    } as Column,
    {
      Header: "BugsCount",
      accessor: "bugsCount",
      Filter: DefaultColumnFilter
    } as Column,
    {
      Header: "DurationInDays",
      accessor: "durationInDays",
      Filter: DefaultColumnFilter
    } as Column,
    {
      Header: "MadeDeadline",
      accessor: "madeDeadLine",
      Cell: ({ cell: { value } }: { cell: { value: boolean } }) => (
        <BooleanCell value={value} />
      ),
      Filter: DefaultColumnFilter
    } as Column,
  ];
