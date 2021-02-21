import React, { FormEvent, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// ---------------------------------------------------------------------
// --- STYLE -----------------------------------------------------------
// ---------------------------------------------------------------------
const useStyles = makeStyles(
  (theme) => ({
    input: {
      fontSize: theme.typography.h4.fontSize,
    },
  }),
  { name: SearchUserId.name },
);
// ---------------------------------------------------------------------
// --- PROPS -----------------------------------------------------------
// ---------------------------------------------------------------------
interface IProps {
  onSearch: (userId: string) => void;
}
// ---------------------------------------------------------------------
// --- COMPONENT -------------------------------------------------------
// ---------------------------------------------------------------------
function SearchUserId(props: IProps) {
  const classes = useStyles();

  const [userId, setUserId] = useState('');

  const handleSearch = () => {
    if (userId) {
      props.onSearch(userId);
    }
  };

  const handleFormSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div>
      <form onSubmit={handleFormSearch}>
        <Typography variant="h4" component="span">
          github.com/{' '}
        </Typography>
        <Input
          value={userId}
          className={classes.input}
          placeholder="User Id"
          onChange={(ev) => setUserId(ev.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </form>
    </div>
  );
}
// ---------------------------------------------------------------------
// --- EXPORT  ---------------------------------------------------------
// ---------------------------------------------------------------------
export default SearchUserId;
