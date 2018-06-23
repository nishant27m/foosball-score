import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderInput, renderMultiselect, renderSelectList, renderDateTimePicker } from '../components/react_formwidgets';
import Team from './team';
import TeamList from '../components/team_list';



export default class TeamAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams : []
        }
    }

    componentDidMount() {

    }

    addTeam(val) {
        const team = {text : val}
        this.state.teams.push(team);
        this.setState({teams: this.state.teams});
    }


    render() {
        return(
        <div>
            <Team/>
            <TeamList teams = {this.state.teams}/>
        </div>);
    }

}
