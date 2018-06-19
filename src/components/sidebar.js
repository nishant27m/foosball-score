import React, {Component} from 'react';

export default class Sidebar extends Component {

  render() {
    return(<div className="sidenav">
      <a href="#">Dashboard</a>
      <a href="#">New Player</a>
      <a href="#">New Team</a>
      <a href="#">Add Match Details</a>
    </div>);
  }
}
