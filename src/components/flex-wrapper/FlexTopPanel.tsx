import { makeStyles } from '@material-ui/core/styles';
import { IStandardProps } from '../../helpers/IStandardProps';
// ---------------------------------------------------------------------
// --- STYLE -----------------------------------------------------------
// ---------------------------------------------------------------------
const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }),
  { name: FlexTopPanel.name },
);
// ---------------------------------------------------------------------
// --- COMPONENT -------------------------------------------------------
// ---------------------------------------------------------------------
function FlexTopPanel(props: IStandardProps) {
  const classes = useStyles();
  return <div className={classes.root}>{props.children}</div>;
}
// ---------------------------------------------------------------------
// --- EXPORT  ---------------------------------------------------------
// ---------------------------------------------------------------------
export default FlexTopPanel;
