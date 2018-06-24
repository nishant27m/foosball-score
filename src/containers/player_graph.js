import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderDropdownList } from '../components/react_formwidgets';
import {connect} from 'react-redux';
import { getStatistics, fetchPlayers } from '../actions';

class PlayerGraph extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.fetchPlayers();
  }

  onSubmit(values) {
      values.id = values.player.id;
      this.props.getStatistics(values);
  }

  render() {
    let dataSource = _.map(this.props.players);
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="card">
        <div className="card-header">Select Player</div>
          <div className="card-body">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className="form-group">
                    <label>Player Name</label>
                    <Field name="player" component={renderDropdownList} data={dataSource}
                      valueField='id' textField='name' />
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

function mapStateToProps({ players }) {
  return { players };
}

export default reduxForm({
        form: 'PlayerGraph',
        validate : validate
      })
      (connect( mapStateToProps, { getStatistics, fetchPlayers } )(PlayerGraph));
