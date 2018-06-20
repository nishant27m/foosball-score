import React, {Component} from 'react';
import Player from './player';

export default class PlayerList extends Component {

    constructor(props) {
        super(props);
        this.players = props.players;
    }

    render() {
        const playersNode = this.players.map((player) => {
            return (<Player player={player} key={player.id}/>)
        });
        return (<div className="list-group" style={{marginTop:'30px'}}>{playersNode}</div>);
    }

}