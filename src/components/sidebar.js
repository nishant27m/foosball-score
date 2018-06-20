import React, {Component} from 'react';

export default class Sidebar extends Component {

  render() {
    return(<div className="sidenav">
      <a href="dashboard">Dashboard</a>
      <a href="addPlayer">New Player</a>
      <a href="addTeam">New Team</a>
      <a href="addMatch">Add Match Details</a>
    </div>);
  }
}
