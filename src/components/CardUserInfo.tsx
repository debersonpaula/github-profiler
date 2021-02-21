import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
// ---------------------------------------------------------------------
// --- STYLE -----------------------------------------------------------
// ---------------------------------------------------------------------
const useStyles = makeStyles(
  () => ({
    root: {
      width: 240,
      height: 290,
    },
    location: {
      display: 'flex',
      alignItems: 'center',
    },
    locationIcon: {
      width: '0.7em',
      height: '0.7em',
    },
    avatar: {
      height: 180,
    },
  }),
  { name: CardUserInfo.name },
);
// ---------------------------------------------------------------------
// --- PROPS -----------------------------------------------------------
// ---------------------------------------------------------------------
interface IProps {
  login?: string;
  name?: string;
  location?: string;
  avatar?: string;
}
// ---------------------------------------------------------------------
// --- COMPONENT -------------------------------------------------------
// ---------------------------------------------------------------------
function CardUserInfo(props: IProps) {
  const classes = useStyles();
  const { avatar, location, login, name } = props;

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.avatar} image={avatar} title={`${login}'s avatar`} />
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body1">{login}</Typography>

        <div className={classes.location}>
          <LocationOnIcon className={classes.locationIcon} />
          <Typography variant="body2">{location}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}
// ---------------------------------------------------------------------
// --- EXPORT  ---------------------------------------------------------
// ---------------------------------------------------------------------
export default CardUserInfo;
