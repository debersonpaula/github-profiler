import { makeStyles } from '@material-ui/core/styles';
import { IStandardProps } from '../../helpers/IStandardProps';
// ---------------------------------------------------------------------
// --- STYLE -----------------------------------------------------------
// ---------------------------------------------------------------------
const useStyles = makeStyles(
  () => ({
    root: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
  }),
  { name: FlexWrapper.name },
);
// ---------------------------------------------------------------------
// --- COMPONENT -------------------------------------------------------
// ---------------------------------------------------------------------
function FlexWrapper(props: IStandardProps) {
  const classes = useStyles();
  return <div className={classes.root}>{props.children}</div>;
}
// ---------------------------------------------------------------------
// --- EXPORT  ---------------------------------------------------------
// ---------------------------------------------------------------------
export default FlexWrapper;
