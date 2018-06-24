import React, {Component} from 'react';
import {connect} from 'react-redux';
class MatchList extends Component {

  renderMatch(match) {
    return(
      <tr key = {match.id}>
          <td>{match.id}</td>
          <td>{match.team_a}</td>
          <td>{match.team_b}</td>
          <td>{match.winner_team}</td>
          <td>{match.score}</td>
          <td>{match.date}</td>
      </tr>);
  }


  render() {
      let list = _.map(this.props.matches);
      return (
          <table className="table table-hover">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Opponent A</th>
                  <th>Opponent B</th>
                  <th>Winner</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                  {list.map(this.renderMatch)}
              </tbody>
          </table>
      );
  }

}

function mapStateToProps({ matches }) {
  return { matches };
}

export default connect(mapStateToProps, null)(MatchList);
