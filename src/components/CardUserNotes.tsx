import React, { useState } from 'react';
import AddNotesDialog from './AddNotesDialog';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// ---------------------------------------------------------------------
// --- STYLE -----------------------------------------------------------
// ---------------------------------------------------------------------
const useStyles = makeStyles(
  () => ({
    root: {
      width: 240,
    },
  }),
  { name: CardUserNotes.name },
);
// ---------------------------------------------------------------------
// --- PROPS -----------------------------------------------------------
// ---------------------------------------------------------------------
interface IProps {
  notes?: string[];
  onAddNotes: (note: string) => void;
}
// ---------------------------------------------------------------------
// --- COMPONENT -------------------------------------------------------
// ---------------------------------------------------------------------
function CardUserNotes(props: IProps) {
  const classes = useStyles();
  const { notes, onAddNotes } = props;
  const [openForm, setOpenForm] = useState(false);

  if (!notes) {
    return null;
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="body1">Notes:</Typography>
        <List>
          {notes.map((note, index) => (
            <ListItem key={index}>{note}</ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            setOpenForm(true);
          }}
        >
          Add Note
        </Button>
      </CardActions>

      <AddNotesDialog
        open={openForm}
        onClose={() => {
          setOpenForm(false);
        }}
        onSubmit={onAddNotes}
      />
    </Card>
  );
}
// ---------------------------------------------------------------------
// --- EXPORT  ---------------------------------------------------------
// ---------------------------------------------------------------------
export default CardUserNotes;
