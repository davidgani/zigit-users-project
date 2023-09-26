import { useEffect, useState } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import UserCard from '../../Components/UserInfoCard';
import { fetchProjectsDataRequest } from './Requests/FetchProjectsData';
import { useLocation } from 'react-router-dom';
import IUserDetails from '../../Shared/IUserDetails';
import { IUserInfoTableData } from '../../Shared/IUserInfoTableData';
import UserInfoTableComponent from '../../Components/UserInfoTable';
import { InfoPageDialog } from '../../Components/InfoPageDialog';
import backgroundImage from './../../assets/background.jpg'
import { makeStyles } from '@material-ui/core';
import { Row } from 'react-table';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    minHeight: '100vh',
    background: `url(${backgroundImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
  }}));

const UserInfoPage: React.FC = () => {

  const [projects, setProjects] = useState<Row<IUserInfoTableData>[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const location = useLocation();
  const userDetails = location.state.userDetails as IUserDetails;
  const classes = useStyles();




  useEffect(() => {
    fetchProjectsDataRequest(userDetails.id, userDetails.token).then(result => {
      setProjects(result as Row<IUserInfoTableData>[]);
    }).catch(() => {
      setShowDialog(true);
    })

  }, [])

  return (
    <div className={classes.root}>
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          <Paper elevation={3}>
            <UserCard {...userDetails} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper elevation={3}>
            <UserInfoTableComponent rowData={projects}  />
          </Paper>
        </Grid>
      </Grid>
     <InfoPageDialog showDialog={showDialog}/>
    </Container>
    </div>
  );
}

export default UserInfoPage;