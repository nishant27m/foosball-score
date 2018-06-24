import React, {Component} from 'react';
import {connect} from 'react-redux';
import Team from './team';

class TeamList extends Component {

  renderTeams(team) {
    return(
      <tr key = {team.id}>
          <td>{team.id}</td>
          <td>{team.team_name}</td>
          <td>{team.players.map(player => <span key= {player.id} > {player.name} </span>)}</td>
      </tr>);
  }

  renderPlayer(player) {
    return(
      <span>player.name</span>);
  }

  render() {
      let list = _.map(this.props.teams);
      return (
          <table className="table table-hover">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Team Name</th>
                  <th>Players</th>
                </tr>
              </thead>
              <tbody>
                  {list.map(this.renderTeams)}
              </tbody>
          </table>
      );
  }

}

function mapStateToProps({ teams }) {
  return { teams };
}

export default connect(mapStateToProps, null)(TeamList);
