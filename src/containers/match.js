import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderInput, renderMultiselect, renderSelectList, renderDateTimePicker } from '../components/react_formwidgets';
import { createMatch } from '../actions/index';
class Match extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="card">
        <div className="card-header">New Match</div>
          <div className="card-body">
            <form onSubmit={handleSubmit(createMatch)}>
                <div className="form-group">
                    <label>Team 1</label>
                    <Field name="team1" component={renderMultiselect} data={[ 'Guitar', 'Cycling', 'Hiking' ]}/>
                </div>
                <div className="form-group">
                    <label>Team 2</label>
                    <Field name="team2" component={renderMultiselect} data={[ 'Guitar', 'Cycling', 'Hiking' ]}/>
                </div>
                <div className="form-group">
                    <label>Date Of Match</label>
                    <Field name="dateofmatch" component={renderDateTimePicker}/>
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
  if(!values.team1) {
    errors.team1 = 'Please enter valid Team Name 1';
  }
  if(!values.team2) {
    errors.team2 = 'Please enter valid Team Name 2';
  }
  console.log('date of match : '+values.dateofmatch);
  if(!values.dateofmatch) {
    errors.dateofmatch = 'Please enter date of match';
  }
  return errors;
}

export default reduxForm({
        form: 'NewMatch',
        validate : validate
      }, null, { createMatch } )(Match);
