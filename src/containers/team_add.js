import React, { Component } from 'react';
import PlayerList from '../components/player_list';


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

const TeamAddForm = ({addPlayer}) => {
                            let input;
                            return (
                            <form onSubmit={(e) => {e.preventDefault(); addPlayer(input.value); input.value = '';}}>
                                <input className="form-control col-md-12" ref={node => { input = node; } } />
                                <input className="form-control col-md-12" ref={node => { input = node; } } />
                                <button />
                                <br/>
                            </form>);
                        };