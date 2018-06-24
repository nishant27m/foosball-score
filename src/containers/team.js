import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderInput, renderMultiselectDropdown, renderSelectList, renderDateTimePicker } from '../components/react_formwidgets';
import { createTeam, fetchPlayers } from '../actions/index';
import {GET_PLAYER} from '../actions/index';
import {connect} from 'react-redux';
import _ from 'lodash';

class Team extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.fetchPlayers();
  }

  onSubmit(values) {
      this.props.createTeam(values, () => {
        this.props.history.push('addTeam');
      });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    let dataSourceConfig = {
      label: 'id',
      text: 'name'
    };

    let dataSource = _.map(this.props.players);
    return (
      <div className="card">
        <div className="card-header">New Team</div>
          <div className="card-body">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className="form-group">
                    <label>Team Name</label>
                    <Field name="teamName" component={renderInput} placeholder="Enter Team Name"/>
                </div>
                <div className="form-group">
                    <label>Players</label>
                    <Field name="players" component={renderMultiselectDropdown}
                    dataSource={dataSource} dataSourceConfig={dataSourceConfig} />
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

function mapStateToProps({ players }) {
  return { players };
}

export default reduxForm({
        form: 'NewTeam',
        validate : validate
      })
      (connect( mapStateToProps, { createTeam, fetchPlayers } )(Team));
