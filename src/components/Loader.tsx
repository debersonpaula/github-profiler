import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
// ---------------------------------------------------------------------
// --- STYLE -----------------------------------------------------------
// ---------------------------------------------------------------------
const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',

      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    loaderbar: {
      height: 32,
    },
  }),
  { name: Loader.name },
);
// ---------------------------------------------------------------------
// --- PROPS -----------------------------------------------------------
// ---------------------------------------------------------------------
interface IProps {
  progress: number;
}
// ---------------------------------------------------------------------
// --- COMPONENT -------------------------------------------------------
// ---------------------------------------------------------------------
function Loader(props: IProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress
        className={classes.loaderbar}
        variant="determinate"
        value={props.progress}
      />
    </div>
  );
}
// ---------------------------------------------------------------------
// --- EXPORT  ---------------------------------------------------------
// ---------------------------------------------------------------------
export default Loader;
