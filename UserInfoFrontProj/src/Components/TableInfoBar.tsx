import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { IUserInfoTableData } from "../Shared/IUserInfoTableData";
import { Row } from "react-table";

const useStyles = makeStyles((theme) => ({
  infoBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
  },
  infoText: {
    margin: 0,
  },
}));

const TableInfoBar = ({ data }: { data: Row<IUserInfoTableData>[] }) => {
  const classes = useStyles();
  const [finishedProjects, setFinishedProjects] = useState<Row<IUserInfoTableData>[]>([]);

  useEffect(() => {
    setCompletedProjects();
  }, [data]);

  const getAvgScore = () => {
    let totalScore = 0;

    if (finishedProjects.length < 1) {
      return 0;
    }

    finishedProjects?.forEach((row) => {
      totalScore += row?.values.score;
    });

    return totalScore / finishedProjects.length;
  };

  const getFinishedProjectsPercentage = () => {
    return `${finishedProjects.length > 0 ? (finishedProjects.length / data.length) * 100 : 0}%`;
  }

  const setCompletedProjects = () => {
    let total = 0;
    let completedProjects = [] as Row<IUserInfoTableData>[];

    data?.forEach((row) => {
      if (row.values.madeDeadLine) {
        completedProjects.push(row);
        total++;
      }
    })

    setFinishedProjects(completedProjects);
  };

  return (
    <Paper elevation={1} className={classes.infoBar}>
      <div>
        <Typography variant="subtitle1" className={classes.infoText}>
          Finished Projects: {getFinishedProjectsPercentage()}
        </Typography>
        <Typography variant="subtitle1" className={classes.infoText}>
          Average score of finished projects: {getAvgScore()}
        </Typography>
      </div>
    </Paper>
  );
};

export default TableInfoBar;