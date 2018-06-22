import React, { Component } from 'react';
import TeamList from '../components/team_list';
import { Field, reduxForm } from 'redux-form';
import { renderInput, renderMultiselect, renderSelectList, renderDateTimePicker } from '../components/react_formwidgets';
import { createTeam } from '../actions/index';

const colors = [ { color: 'Red', value: 'ff0000' },
  { color: 'Green', value: '00ff00' },
  { color: 'Blue', value: '0000ff' } ]



class TeamAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
          // name, players
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
            <h4> Add New Team </h4>
            <TeamAddForm addTeam={this.addTeam.bind(this)} />
            <TeamList teams = {this.state.teams}/>
        </div>);
    }

}


const TeamAddForm = props  => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit(createTeam)}>
            <div>
                <label>Team Name</label>
                <Field name="teamName" component={renderInput} type="" placeholder="Enter Team Name"/>
            </div>
            <div>
                <label>Players</label>
                <Field name="players" component={renderMultiselect} data={[ 'Guitar', 'Cycling', 'Hiking' ]}/>
            </div>
            <div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Reset Values </button>
            </div>
        </form>
    )
};


function validate(values) {
  var errors = {};
  if(!values.teamName) {
    errors.teamName = 'Please enter valid Team Name';
  }
  if(values.players === undefined || values.players.length == 0) {
    errors.players = 'Select atleast one player';
  }
  return errors;
}

export default reduxForm({
        form: 'NewTeam',
        validate : validate
        }, null, { createTeam } )(TeamAddForm);
