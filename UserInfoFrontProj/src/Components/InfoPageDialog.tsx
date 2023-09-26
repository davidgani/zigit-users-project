import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"
import { CustomDialog } from "./Dialog/Dialog"
import { useNavigate } from "react-router-dom"


export const InfoPageDialog: React.FC<{ showDialog: boolean }> = ({ showDialog }) => {
    let navigate = useNavigate();

    return (
        <CustomDialog open={showDialog} onClose={() => { navigate("/") }}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
                <DialogContentText>Unable to authenticate user, please sign in again</DialogContentText>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center' }}>
                <Button variant="contained" color="primary" onClick={() => { navigate("/") }}>
                    Ok
                </Button>
            </DialogActions>
        </CustomDialog>)
}