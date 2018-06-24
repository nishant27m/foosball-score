import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchPlayers} from '../actions';
import PlayerList from './player_list';
import Player from './player';

class PlayerMain extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
      this.props.fetchPlayers();
    }

    render() {
        return(
        <div>
            <Player/>
            <PlayerList/>
        </div>);
    }

}

export default connect(null, {fetchPlayers})(PlayerMain);
