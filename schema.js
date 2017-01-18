import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from 'graphql';
import db from './db';

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'This represents a post.',
  fields: {
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

const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a user.',
  fields: {
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
    },
    posts: {
      type: new GraphQLList(Post),
      resolve(user) {
        return user.getPosts();
      }
    }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: {
    users: {
      type: new GraphQLList(User),
      args: {
        id: {
          type: GraphQLInt
        },
        email: {
          type: GraphQLString
        }
      },
      resolve(root, args) {
        return db.models.user.findAll({where: args});
      }
    },
    posts: {
      type: new GraphQLList(Post),
      resolve(root, args) {
        return db.models.post.findAll({where: args});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Functions to set stuff',
  fields: {
    addUser: {
      type: User,
      args: {
        firstName: {
          type: new GraphQLNonNull(GraphQLString)
        },
        lastName: {
          type: new GraphQLNonNull(GraphQLString)
        },
        email: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve (source, args) {
        return db.models.user.create({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email.toLowerCase()
        });
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
