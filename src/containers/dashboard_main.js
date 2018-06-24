import React, { Component } from 'react';
import Graph from './graph';
import PlayerGraph from './player_graph';
import {connect} from 'react-redux';
import {fetchMatches} from '../actions';

class DashboardMain extends Component {

  constructor(props) {
      super(props);
  }


  render() {

      return( <div>
                <PlayerGraph/>
                <Graph/>
              </div>);

  }

}

export default connect(null, null)(DashboardMain);
