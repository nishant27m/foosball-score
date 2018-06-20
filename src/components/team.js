import React, {Component} from 'react';
import Player from './Player'

export default class Team extends Component {

    constructor(props) {
        super(props);
        this.team = props.team;
    }

    render() {
        const playersNode = this.team.players.map((player) => {
             return (<Player player={player} key={player.id}/>)
        });
        return (
            <div>
                <h4>this.team.name</h4>
                <div className="list-group" style={{marginTop:'30px'}}>{playersNode}</div>
            </div>
        );
    }
}