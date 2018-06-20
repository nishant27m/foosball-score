import React, {Component} from 'react';
import Team from './team';

export default class TeamList extends Component {

    constructor(props) {
        super(props);
        this.teams = props.teams;
    }

    render() {
        const teamsNode = this.teams.map((team) => {
            return (<div class="h-divider" /><Team team={team} key={team.id}/><div class="h-divider" />)
        });
        return (<div className="list-group" style={{marginTop:'30px'}}>{playersNode}</div>);
    }

}