import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { IStandardProps } from '../../helpers/IStandardProps';
// ---------------------------------------------------------------------
// --- STYLE -----------------------------------------------------------
// ---------------------------------------------------------------------
const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(2),
      flex: '1 0 auto',
      width: '100%',
    },
    vcenter: {
      display: 'flex',
      alignItems: 'center',
    },
    hcenter: {
      alignSelf: 'center',
    },
  }),
  { name: FlexBodyPanel.name },
);
// ---------------------------------------------------------------------
// --- PROPS -----------------------------------------------------------
// ---------------------------------------------------------------------
interface IProps extends IStandardProps {
  vCenterAlign?: boolean;
  hCenterAlign?: boolean;
}

// ---------------------------------------------------------------------
// --- COMPONENT -------------------------------------------------------
// ---------------------------------------------------------------------
function FlexBodyPanel(props: IProps) {
  const classes = useStyles();

  const className = clsx(
    classes.root,
    props.vCenterAlign && classes.vcenter,
    props.hCenterAlign && classes.hcenter,
  );

  return <div className={className}>{props.children}</div>;
}
// ---------------------------------------------------------------------
// --- EXPORT  ---------------------------------------------------------
// ---------------------------------------------------------------------
export default FlexBodyPanel;
