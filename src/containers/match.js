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

  onSubmit(values) {
    console.log('Match : ', values);
    this.props.createMatch(values, () => {
        this.props.history.push('addMatch');
    });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    let dataSource = _.map(this.props.teams);
    return (
      <div className="card">
        <div className="card-header">New Match</div>
          <div className="card-body">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className="form-group">
                    <label>Opponent A</label>
                    <Field name="team1" component={renderDropdownList} data={dataSource}
                      valueField='id' textField='team_name' />
                </div>
                <div className="form-group">
                    <label>Opponent B</label>
                    <Field name="team2" component={renderDropdownList} data={dataSource}
                      valueField='id' textField='team_name' />
                </div>
                <div className="form-group">
                    <label>Score</label>
                    <Field name="score" component={renderInput} placeholder=""/>
                </div>
                <div className="form-group">
                    <label>Winner</label>
                    <Field name="winner" component={renderDropdownList} data={dataSource}
                      valueField='id' textField='team_name' />
                </div>
                <div className="form-group">
                    <label>Date Of Match</label>
                    <Field name="dateofmatch" component={renderDateTimePicker} showTime='false'/>
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
    errors.team1 = 'Please enter valid Opponent A';
  }
  if(!values.team2 || values.team1 === values.team2) {
    errors.team2 = 'Please enter valid Opponent B';
  }
  if(values.team1 === values.team2) {
    errors.winner = 'Please select correct winner';
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
