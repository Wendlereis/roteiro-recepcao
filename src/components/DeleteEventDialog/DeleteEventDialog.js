import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export function DeleteEventDialog({ open, onConfirm, onClose }) {
  return (
    <Dialog open={open}>
      <DialogTitle>Deseja remover este evento?</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Essa ação não poderá ser revertida.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} autoFocus>
          Aceitar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
