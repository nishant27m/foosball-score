import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderInput, renderMultiselect, renderSelectList, renderDateTimePicker } from '../components/react_formwidgets';
import { createTeam } from '../actions/index';
class Team extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="card">
        <div className="card-header">New Team</div>
          <div className="card-body">
            <form onSubmit={handleSubmit(createTeam)}>
                <div className="form-group">
                    <label>Team Name</label>
                    <Field name="teamName" component={renderInput} placeholder="Enter Team Name"/>
                </div>
                <div className="form-group">
                    <label>Players</label>
                    <Field name="players" component={renderMultiselect} data={[ 'Guitar', 'Cycling', 'Hiking' ]}/>
                </div>
                <div className = "btn-toolbar">
                    <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
                    <button type="button" className="btn btn-warning" disabled={pristine || submitting} onClick={reset}>Reset </button>
                </div>
            </form>
          </div>
      </div>
    );
  }
}

function validate(values) {
  var errors = {};
  if(!values.teamName) {
    errors.teamName = 'Please enter valid Team Name';
  }
  if(values.players === undefined || values.players.length == 0) {
    errors.players = 'Select atleast one player ';
  }
  return errors;
}

export default reduxForm({
        form: 'NewTeam',
        validate : validate
        }, null, { createTeam } )(Team);
