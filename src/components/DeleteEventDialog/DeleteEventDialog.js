import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export function DeleteEventDialog({ open, isLoading, onConfirm, onClose }) {
  return (
    <Dialog open={open}>
      <DialogTitle>Deseja remover este evento?</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Essa ação não poderá ser revertida.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button onClick={onConfirm} disabled={isLoading} autoFocus>
          {isLoading ? "Salvando..." : "Aceitar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
