import Loader from '../components/Loader';
import SearchUserId from '../components/SearchUserId';
import { IGitHubState } from '../interfaces/states/IGitHubState';

export default function GithubSearchProfileContainer(props: IProps) {
  const { isLoading, isFailed, errorMessage, progress } = props.state;

  if (isLoading) {
    return <Loader progress={progress || 0} />;
  }

  return (
    <>
      <SearchUserId onSearch={props.onSearch} />
      {isFailed && <div>{errorMessage}</div>}
    </>
  );
}

interface IProps {
  onSearch: (userId: string) => void;
  state: IGitHubState;
}
