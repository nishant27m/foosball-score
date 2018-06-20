import React, { Component } from 'react';
import PlayerAdd from '../containers/player_add';
import Sidebar from './sidebar'

export default class App extends Component {
  render() {
    return (
        <div>
            <Sidebar/>
            <PlayerAdd/>
         </div>

    );
  }
}
