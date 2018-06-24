const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const app = express();

app.set('port', (process.env.PORT || 3001));
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.disable('etag');
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Express only serves static assets in production
console.log("NODE_ENV: ", process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  // Return the main index.html, so react-router render the route in the client
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/build', 'index.html'));
  });
}

const host = "opensource27m.ccdfvbkrhm6j.us-east-2.rds.amazonaws.com"
const user = "opensource"
const pswd = "opensource$123"
const dbname = "foosballscore"

// config db ====================================
const pool = mysql.createPool({
  host: host,
  user: user,
  password: pswd,
  port: "3306",
  database: dbname
});

const PLAYERS_COLUMNS = ['id','name','created','modified'];
const TEAMS_COLUMNS = ['id','team_name','created','modified'];
const TEAMS_PLAYERS_COLUMNS = ['id','id_players','id_teams','created', 'modified'];
const TEAMS_PLAYERS = ['id','id_players','id_teams','team_name', 'name'];
const MATCH_DETAILS_COLUMNS = ['id', 'id_team_a','id_team_b','id_winner_team','match_date','score','created','modified'];

app.post('/api/add_player', (req, res) => {
  const INSERT_PLAYER = `INSERT INTO players (name) values ('${req.body.name}')`;
  const e = {};
  pool.query(INSERT_PLAYER, function(err, result) {
      if (err) {
        throw err;
      }
      else {
        getPlayers(result.insertId, res);
      }
  });
});

app.get('/api/players', (req, res) => {
    getPlayers(null, res);
});

function getPlayers(id, res) {

      try {
      let queryString = 'SELECT * from players';
      if(id) {
        queryString += ' where id = '+id;
      }
      pool.query(queryString, function(err, rows, fields) {
            if (err) {
              throw err;
            }
              if (rows.length > 0) {
                  res.json(rows.map((entry) => {
                        const e = {};
                        PLAYERS_COLUMNS.forEach((c) => {e[c] = entry[c];});
                        return e;
                      })
                  );
              }
              else {
                  res.json([]);
              }
          });
      }
      catch(error) {
        console.error(error);
        // expected output: SyntaxError: unterminated string literal
        // Note - error messages will vary depending on browser
      }

}

app.post('/api/add_team', (req, res) => {

       try {
      const INSERT_TEAM = `INSERT INTO teams (team_name) values ('${req.body.teamName}')`;
      console.log('add_team', req.body);
      pool.query(INSERT_TEAM, function(err, result) {
          if (err) {
            throw err;
          }
          else {
            let id_teams = result.insertId;
            for(var id_players of req.body.players) {
                addTeamPlayers(id_teams, id_players);
            }
            getTeams(id_teams, res);
          }
      });
    }
    catch(error) {
      console.error(error);
      // expected output: SyntaxError: unterminated string literal
      // Note - error messages will vary depending on browser
    }
});

function addTeamPlayers(id_teams, id_players) {
      try {
          const INSERT_TEAM_PLAYERS = `INSERT INTO team_players (id_players, id_teams)
                    values ('${id_players}', '${id_teams}')`;
          pool.query(INSERT_TEAM_PLAYERS, function(err, result) {
              if (err) {
                throw err;
              }
          });
      }
      catch(error) {
        console.error(error);
        // expected output: SyntaxError: unterminated string literal
        // Note - error messages will vary depending on browser
      }
}


app.get('/api/teams', (req, res) => {
    try {
        getTeams(null, res);
     }
    catch(error) {
        console.error(error);
        // expected output: SyntaxError: unterminated string literal
        // Note - error messages will vary depending on browser
    }
});

function getTeams(id_teams, res) {

        try {
              let queryString = `select t.id, t.team_name, p.id as id_players, p.name from teams t
                                    left join team_players tp on tp.id_teams = t.id
                                      left join players p on  tp.id_players = p.id`;
              if(id_teams) {
                queryString += ' where t.id = '+id_teams;
              }
              pool.query(queryString, function(err, rows, fields) {
                  if (err) throw err;
                  if (rows.length > 0) {
                      let teamMap = {};
                      rows.map((entry) => {
                          let id = entry['id'];
                          let e = {};
                          if(teamMap[id]) {
                            e = teamMap[id];
                          }
                          else {
                            teamMap[id] = e;
                            e.players = [];
                          }
                          const player = {};
                          TEAMS_PLAYERS.forEach((c) => {
                              if(c === 'id' || c === 'team_name') {
                                  e[c] = entry[c];
                              }
                              else {
                                  player[c] = entry[c];
                              }
                          })
                          e.players.push(player);
                      });
                      res.json(teamMap);
                    }
                });
          }
          catch(error) {
              console.error(error);
              // expected output: SyntaxError: unterminated string literal
              // Note - error messages will vary depending on browser
          }
}

app.post('/api/add_match', (req, res) => {
    try {
      console.log('add_match', req.body);
      const INSERT_MATCH = `INSERT INTO match_details(id_team_a, id_team_b, score, id_winner_team, match_date)
       values ('${req.body.team1.id}', '${req.body.team2.id}', '${req.body.score}', '${req.body.winner.id}', '${req.body.dateofmatch}')`;
      const e = {};
      pool.query(INSERT_MATCH, function(err, result) {
          if (err) {
            throw err;
          }
          else {
            getMatches(result.insertId, res);
          }
      });
    }
    catch(error) {
      console.error(error);
      // expected output: SyntaxError: unterminated string literal
      // Note - error messages will vary depending on browser
    }
});

function getMatches(id_match, res) {
      try {
                let queryString = `select * from match_details`;
                if(id_match) {
                    queryString += ' where id = '+id_match;
                }
                pool.query(queryString, function(err, rows, fields) {
                    if (err) {
                        throw err;
                    }
                    if (rows.length > 0) {
                        res.json(rows.map((entry) => {
                            const e = {};
                            MATCH_DETAILS_COLUMNS.forEach((c) => {e[c] = entry[c];});
                            return e;
                            })
                        );
                    }
                    else {
                    res.json([]);
                    }
                });
     }
     catch(error) {
       console.error(error);
       // expected output: SyntaxError: unterminated string literal
       // Note - error messages will vary depending on browser
     }
}

app.get('/api/matches', (req, res) => {
    try {
        getMatches(null, res);
    }
    catch(error) {
           console.error(error);
           // expected output: SyntaxError: unterminated string literal
           // Note - error messages will vary depending on browser
         }
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
