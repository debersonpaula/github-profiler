import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// ---------------------------------------------------------------------
// --- STYLE -----------------------------------------------------------
// ---------------------------------------------------------------------
const useStyles = makeStyles(
  () => ({
    root: {
      width: 240,
    },
  }),
  { name: CardUserStats.name },
);
// ---------------------------------------------------------------------
// --- PROPS -----------------------------------------------------------
// ---------------------------------------------------------------------
interface IProps {
  stats?: {
    followers: number;
    following: number;
    forks: number;
    repos: number;
    stars: number;
    watchers: number;
  };
}
// ---------------------------------------------------------------------
// --- COMPONENT -------------------------------------------------------
// ---------------------------------------------------------------------
function CardUserStats(props: IProps) {
  const classes = useStyles();
  const { stats } = props;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="body2">
          <b>{stats?.followers}</b> followers
        </Typography>
        <Typography variant="body2">
          <b>{stats?.repos}</b> public repositories
        </Typography>
        <Typography variant="body2">
          <b>{stats?.stars}</b> stars
        </Typography>
        <Typography variant="body2">
          <b>{stats?.watchers}</b> watchers
        </Typography>
        <Typography variant="body2">
          <b>{stats?.forks}</b> forks
        </Typography>
      </CardContent>
    </Card>
  );
}
// ---------------------------------------------------------------------
// --- EXPORT  ---------------------------------------------------------
// ---------------------------------------------------------------------
export default CardUserStats;
