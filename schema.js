import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import db from './db';

const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a user.',
  fields: () => {
    id: {
      type: GraphQLInt,
      resolve(user) {
        return user.id
      }
    },
    firstName: {
      type: GraphQLString,
      resolve(user) {
        return user.firstName
      }
    },
    lastName: {
      type: GraphQLString,
      resolve(user) {
        return user.lastName
      }
    },
    email: {
      type: GraphQLString,
      resolve(user) {
        return user.email
      }
    }
  }
});

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'This represents a post.',
  fields: () => {
    id: {
      type: GraphQLInt,
      resolve(post) {
        return post.id
      }
    },
    title: {
      type: GraphQLString,
      resolve(post) {
        return post.title
      }
    },
    content: {
      type: GraphQLString,
      resolve(post) {
        return post.content
      }
    }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return {
      users: {
        type: new GraphQLList(User),
        args: {
          id: {
            type: GraphQLInt
          },
          email {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return db.models.user.findAll({where: args});
        }
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;
