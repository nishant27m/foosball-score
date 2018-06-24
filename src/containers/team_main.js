import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Team from './team';
import TeamList from './team_list';
import {fetchTeams} from '../actions';

class TeamMain extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchTeams();
    }

    render() {
        return(
        <div>
            <Team/>
            <TeamList/>
        </div>);
    }
}

export default connect(null, {fetchTeams})(TeamMain);
