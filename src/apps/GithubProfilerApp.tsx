import React from 'react';

import FlexBodyPanel from '../components/flex-wrapper/FlexBodyPanel';
import FlexTopPanel from '../components/flex-wrapper/FlexTopPanel';
import FlexWrapper from '../components/flex-wrapper/FlexWrapper';
import GithubSearchProfileContainer from '../containers/GithubSearchProfileContainer';
import GithubUserProfileContainer from '../containers/GithubUserProfileContainer';
import Header from '../components/Header';
import { GitHubModel } from '../models/GitHubModel';
import { IGitHubState } from '../interfaces/states/IGitHubState';

export default class GithubProfilerApp extends React.Component<{}, IGitHubState> {
  private _model: GitHubModel;

  state: IGitHubState = { isQuerying: true, progress: 0 };

  constructor(props: any) {
    super(props);
    this._model = new GitHubModel(this.setState.bind(this));
  }

  render() {
    const { isQuerying, isCompleted, user } = this.state;
    return (
      <FlexWrapper>
        <FlexTopPanel>
          <Header />
        </FlexTopPanel>

        {isQuerying && (
          <FlexBodyPanel vCenterAlign hCenterAlign>
            <GithubSearchProfileContainer onSearch={this._model.getUser} state={this.state} />
          </FlexBodyPanel>
        )}

        {isCompleted && user && (
          <FlexBodyPanel>
            <GithubUserProfileContainer user={user} onAddNotes={this._model.addUserNote} />
          </FlexBodyPanel>
        )}
      </FlexWrapper>
    );
  }
}
