import React from 'react';
import  { Route, IndexRoute } from 'react-router';
import App from './components/app';
import PlayerMain from './containers/player_main';
import TeamMain from './containers/team_main';
import MatchDetails from './containers/match_main';
import DashboardMain from './containers/dashboard_main';


export default (
    <Route path="/" component={App} >
        <Route path="addPlayer" component={PlayerMain} />
        <Route path="addTeam" component={TeamMain} />
        <Route path="addMatch" component={MatchDetails} />
        <Route path="dashboard" component={DashboardMain} />
        <Route path="/" component={DashboardMain} />
    </Route>
);
