import { Dialog } from "@mui/material";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const CustomDialog: React.FC<DialogProps> = ({ open, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {children}
    </Dialog>
  );
};