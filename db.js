var _ = require('lodash');
var Faker = require('faker');
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


// Define tables

const User = conn.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

const Post = conn.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Set up relationships

User.hasMany(Post);
Post.belongsTo(User);

// Sync with the database

conn.sync({force:true}).then(() => {
  // Create some fixtures
  _.times(10, () => {
    return User.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    }).then( user => {
      user.createPost({
        title: `Post by ${user.firstName}`,
        content: 'Content of the post...'
      });
    });
  });
});
