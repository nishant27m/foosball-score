import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import _ from 'lodash';
import { renderInput, renderMultiselect, renderDropdownList, renderDateTimePicker } from '../components/react_formwidgets';
import { createMatch } from '../actions/index';
import {fetchTeams} from '../actions';

class Match extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.fetchTeams();
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    let dataSource = _.map(this.props.teams);
    console.log('dataSource : ', dataSource);
    return (
      <div className="card">
        <div className="card-header">New Match</div>
          <div className="card-body">
            <form onSubmit={handleSubmit(createMatch)}>
                <div className="form-group">
                    <label>Team 1</label>
                    <Field name="team1" component={renderDropdownList} data={dataSource}
                      valueField='id' textField='team_name' />
                </div>
                <div className="form-group">
                    <label>Team 2</label>
                    <Field name="team2" component={renderDropdownList} data={dataSource}
                      valueField='id' textField='team_name' />
                </div>
                <div className="form-group">
                    <label>Winner</label>
                    <Field name="winner" component={renderDropdownList} data={[ 'Guitar', 'Cycling', 'Hiking' ]}/>
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
  console.log('values : ',values);
  if(!values.team1) {
    errors.team1 = 'Please enter valid Team Name 1';
  }
  if(!values.team2) {
    errors.team2 = 'Please enter valid Team Name 2';
  }
  if(!values.dateofmatch) {
    errors.dateofmatch = 'Please enter date of match';
  }
  return errors;
}

function mapStateToProps({ teams }) {
  return { teams };
}

export default reduxForm({
        form: 'NewMatch',
        validate : validate
      })(connect( mapStateToProps, { createMatch, fetchTeams} )(Match));
