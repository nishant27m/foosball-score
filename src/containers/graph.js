import React, {Component} from 'react';
import {connect} from 'react-redux';
import PieChart from 'react-simple-pie-chart';
import _ from 'lodash';

class Graph extends Component {

    renderPlayers(player) {
      return(
        <tr key = {player.id}>
            <td>{player.id}</td>
            <td>{player.name}</td>
        </tr>);
    }

    render() {
        if(!this.props.statistics.success) {
          return(<div>No data found</div>);
        }
        console.log('statistics', this.props.statistics);
        var {success, fail} = this.props.statistics;
        let stats = [];
        stats.push({color: '#f00', value:success});
        stats.push({color: '#0f0', value:fail});
        return (
            <div className="graph">
              <PieChart slices={stats}/>
            </div>
        );
    }

}

function mapStateToProps({ statistics }) {
  return { statistics };
}

export default connect(mapStateToProps, null)(Graph);
