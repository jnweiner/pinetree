'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Boom = require('@hapi/boom');
const Path = require('path');
const db = require('../db');

const init = async() => {
  const server = new Hapi.Server({
    port: 3000,
    routes: {
      files: {
        relativeTo: Path.join(__dirname, '../', 'public')
      }
    }
  });

  await server.register(Inert);

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/api/users',
    handler: (req, res) => {

      const sql = 'SELECT * from users WHERE sub = $1';

      const addNewUser = (sub, email) => {
        const sql = 'INSERT INTO users(sub, email) VALUES($1, $2)';
        db.query(sql, [sub, email])
          .then(data => console.log('success adding new user'))
          .catch(err => console.log('err adding new user:', err))
      };

      async function checkForUser() {
        try {
          const { rows } = await db.query(sql, [req.query.sub]);
          if (rows[0]) {
            return rows[0];
          } else {
            console.log('user does not exist yet');
            addNewUser(req.query.sub, req.query.email)
            return 'no user yet, adding...';
          }
        } catch(err) {
          console.log(err);
          throw Boom.isServer();
        }
      }

      return checkForUser();
    
    }
  })

  await server.start();
  console.log('Server listening at', server.info.uri);

};

init();

