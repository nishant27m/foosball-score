import React, { Component } from 'react';
import Match from './match';
import MatchList from './match_list';
import {connect} from 'react-redux';
import {fetchMatches} from '../actions';

class MatchMain extends Component {

  constructor(props) {
      super(props);
  }

  componentDidMount() {
    //  this.props.fetchMatches();
  }

  render() {

      return( <div>
                <Match/>
                <MatchList/>
              </div>);

  }

}

export default connect(null, {fetchMatches})(MatchMain);
