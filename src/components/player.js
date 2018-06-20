import React, {Component} from 'react';

export default class Player extends Component {

    constructor(props) {
        super(props);
        this.player = props.player;
    }

    render() {
        return (<a href="#" className="list-group-item">{this.player.text}</a>);
    }
}