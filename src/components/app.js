import React, { Component } from 'react';
import BookList from '../containers/book_list';
import Sidebar from './sidebar'

export default class App extends Component {
  render() {
    return (
        <div>
            <Sidebar/>
            <BookList/>
         </div>

    );
  }
}
