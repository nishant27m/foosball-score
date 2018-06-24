import React, {Component} from 'react';
import {connect} from 'react-redux';

import _ from 'lodash';

class PlayerList extends Component {

    renderPlayers(player) {
      return(
        <tr key = {player.id}>
            <td>{player.id}</td>
            <td>{player.name}</td>
        </tr>);
    }

    render() {
        let list = _.map(this.props.players);
        return (
            <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                    {list.map(this.renderPlayers)}
                </tbody>
            </table>
        );
    }

}

function mapStateToProps({ players }) {
  return { players };
}

export default connect(mapStateToProps, null)(PlayerList);
