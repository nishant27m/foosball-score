import React, { Component } from 'react';
import PlayerList from '../components/player_list';


export default class PlayerAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
          players : []
        }
    }

    componentDidMount() {

    }

    addPlayer(val) {
        const player = {text : val}
        this.state.players.push(player);
        this.setState({players: this.state.players});
    }


    render() {
        return(
        <div>
            <h4> Add New Player </h4>
            <PlayerAddForm addPlayer={this.addPlayer.bind(this)} />
            <PlayerList players = {this.state.players}/>
        </div>);
    }

}

const PlayerAddForm = ({addPlayer}) => {
                            let input;
                            return (
                            <form onSubmit={(e) => {e.preventDefault(); addPlayer(input.value); input.value = '';}}>
                                <input className="form-control col-md-12" ref={node => { input = node; } } />
                                <br/>
                            </form>);
                        };