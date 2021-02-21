import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import convertToPercent from '../helpers/convertToPercent';
// ---------------------------------------------------------------------
// --- STYLE -----------------------------------------------------------
// ---------------------------------------------------------------------
const useStyles = makeStyles(
  () => ({
    root: {
      width: 240,
    },
  }),
  { name: CardUserLangs.name },
);
// ---------------------------------------------------------------------
// --- PROPS -----------------------------------------------------------
// ---------------------------------------------------------------------
interface IProps {
  langs?: { name: string; rate: number }[];
}
// ---------------------------------------------------------------------
// --- COMPONENT -------------------------------------------------------
// ---------------------------------------------------------------------
function CardUserLangs(props: IProps) {
  const classes = useStyles();
  const { langs } = props;

  if (!langs) {
    return null;
  }

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table size="small">
        <TableBody>
          {langs.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{convertToPercent(row.rate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
// ---------------------------------------------------------------------
// --- EXPORT  ---------------------------------------------------------
// ---------------------------------------------------------------------
export default CardUserLangs;
