import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PlayersReducers from './reducer_players';
import TeamsReducers from './reducer_teams';
import MatchesReducers from './reducer_matches';
import StatisticsReducers from './reducer_statistics';

const rootReducer = combineReducers({
    players: PlayersReducers,
    teams: TeamsReducers,
    matches: MatchesReducers,
    form: formReducer,
    statistics: StatisticsReducers
});

export default rootReducer;
