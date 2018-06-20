import React, { Component } from 'react';
import TeamList from '../components/team_list';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import SelectList from 'react-widgets/lib/SelectList';
import Multiselect from 'react-widgets/lib/Multiselect';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

const colors = [ { color: 'Red', value: 'ff0000' },
  { color: 'Green', value: '00ff00' },
  { color: 'Blue', value: '0000ff' } ]

const renderDropdownList = ({ input, data, valueField, textField }) =>
  <DropdownList {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange} />

const renderMultiselect = ({ input, data, valueField, textField }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />

const renderSelectList = ({ input, data }) =>
  <SelectList {...input}
    onBlur={() => input.onBlur()}
    data={data} />

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
  <DateTimePicker
    onChange={onChange}
    format="DD MMM YYYY"
    time={showTime}
    value={!value ? null : new Date(value)}
  />


export default class TeamAdd extends Component {

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


const TeamAddForm = ({addTeam}) => {
                            let input;
                            return (
                            <form onSubmit={(e) => {e.preventDefault(); addTeam(input.value); input.value = '';}}>
                                <input className="form-control col-md-12" ref={node => { input = node; } } />
                                <input className="form-control col-md-12" ref={node => { input = node; } } />
                                <button />
                                <br/>
                            </form>);
                        };

ReactWidgetsForm = reduxForm({form: 'reactWidgets'})(TeamAddForm)

export default ReactWidgetsForm
