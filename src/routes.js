import React from 'react';
import  { Route, IndexRoute } from 'react-router';
import App from './components/app';
import PlayerAdd from './containers/player_add';
import TeamAdd from './containers/team_add';
import MatchDetails from './containers/match_details';
import Dashboard from './containers/dashboard';


export default (
    <Route path="/" component={App} >
        <Route path="addPlayer" component={PlayerAdd} />
        <Route path="addTeam" component={TeamAdd} />
        <Route path="addMatch" component={MatchDetails} />
        <Route path="dashboard" component={Dashboard} />
    </Route>
);