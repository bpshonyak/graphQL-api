var Sequelize = require('sequelize');

const conn = new Sequelize('graph_ql', 'root', 'root', {
  port: 8889,
  dialect: 'mysql'
});

conn
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
