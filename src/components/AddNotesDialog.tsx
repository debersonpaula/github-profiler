import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// ---------------------------------------------------------------------
// --- PROPS -----------------------------------------------------------
// ---------------------------------------------------------------------
interface IProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (note: string) => void;
}
// ---------------------------------------------------------------------
// --- COMPONENT -------------------------------------------------------
// ---------------------------------------------------------------------
export default function AddNotesDialog(props: IProps) {
  const { open, onClose, onSubmit } = props;
  const [note, setNote] = useState('');

  const handleClose = () => {
    setNote('');
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(note);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Write note for this user</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="note"
          fullWidth
          value={note}
          onChange={(ev) => {
            setNote(ev.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
