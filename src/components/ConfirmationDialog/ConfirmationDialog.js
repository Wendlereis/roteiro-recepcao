import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export function ConfirmationDialog({ open, onConfirm, onClose, isLoading }) {
  return (
    <Dialog open={open}>
      <DialogTitle>Confirmar novos dados?</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Ao alterar um evento, os horários futuros poderão ser recalculados.
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
