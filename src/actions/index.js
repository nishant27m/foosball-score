import axios from 'axios';

export const FETCH_TEAMS = 'FETCH_TEAMS';
export const FETCH_PLAYERS = 'FETCH_PLAYERS';
export const FETCH_MATCHES = 'FETCH_MATCHES';
export const CREATE_PLAYERS = 'CREATE_PLAYERS';
export const CREATE_TEAM = 'CREATE_TEAM';
export const GET_PLAYER = 'http://localhost:3001/api/players';
const ROOT_URL = 'http://localhost:3001';

export  function selectBook(book) {
    console.log('Book has been seleted : '+book.title);
    return {
        type : 'BOOK_SELECTED',
        payload : book
    };
}

export  function createPlayer(values, callback) {
  const request = axios.post('http://localhost:3001/api/add_player', values)
                  .then(() => callback());
  return {
    type: CREATE_PLAYERS,
    payload: request
  };
}

export  function createTeam(values, callback) {
  const request = axios.post('http://localhost:3001/api/add_team', values)
                  .then(() => callback());
  return {
    type: CREATE_TEAM,
    payload: request
  };
}

export  function createMatch(props) {
    console.dir(props);
}

export function fetchPlayers() {
    const request = axios.get('http://localhost:3001/api/players');
    return {
      type: FETCH_PLAYERS,
      payload: request
    };
}

export function fetchTeams() {
    const request = axios.get('http://localhost:3001/api/teams');
    return {
      type: FETCH_TEAMS,
      payload: request
    };
}

export function fetchMatches() {
    const request = axios.get('http://localhost:3001/api/matches');
    return {
      type: FETCH_MATCHES,
      payload: request
    };
}
