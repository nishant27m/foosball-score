import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderInput, renderMultiselect, renderSelectList, renderDateTimePicker } from '../components/react_formwidgets';
import {connect} from 'react-redux';
import { createPlayer } from '../actions';

class Player extends Component {

  constructor(props) {
    super(props);
  }

  onSubmit(values) {
      this.props.createPlayer(values, () => {
        this.props.history.push('addPlayer');
      });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="card">
        <div className="card-header">New Player</div>
          <div className="card-body">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className="form-group">
                    <label>Player Name</label>
                    <Field name="name" component={renderInput} placeholder=""/>
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
  if(!values.name) {
    errors.name = 'Please enter valid Player Name';
  }
  return errors;
}

export default reduxForm({
        form: 'NewPlayer',
        validate : validate
      })
      (connect(null, { createPlayer })(Player));
