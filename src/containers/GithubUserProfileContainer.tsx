import React from 'react';
import Grid from '@material-ui/core/Grid';

import CardUserInfo from '../components/CardUserInfo';
import CardUserLangs from '../components/CardUserLangs';
import CardUserNotes from '../components/CardUserNotes';
import CardUserStats from '../components/CardUserStats';
import { IGitHubUserState } from '../interfaces/states/IGitHubUserState';

export default function GithubUserProfileContainer(props: IProps) {
  const { name, login, location, stats, langs, notes, avatar } = props.user;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <CardUserInfo avatar={avatar} location={location} login={login} name={name} />
        </Grid>
        <Grid item>
          <CardUserStats stats={stats} />
        </Grid>
        <Grid item>
          <CardUserLangs langs={langs} />
        </Grid>
        <Grid item>
          <CardUserNotes notes={notes} onAddNotes={props.onAddNotes} />
        </Grid>
      </Grid>
    </>
  );
}

interface IProps {
  user: Partial<IGitHubUserState>;
  onAddNotes: (note: string) => void;
}
