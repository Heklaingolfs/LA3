const moment = require('moment');
const basketballFieldResolver = require('./basketballFieldResolver');
const pickupGameResolver = require('./pickupGameResolver');
const playerResolver = require('./playerResolver');
const { GraphQLScalarType } = require('graphql')

module.exports = {

    // Fá dagsetningartíma á íslensku llll formatti
    Moment: new GraphQLScalarType ({
        name: 'Moment',
        parseValue: value => value,
        parseLiteral: value => value,
        serialize: value => moment(new Date(value)).locale('is-IS').format('llll')
    }),
    // Queries resolvers sem eru fengnir út frá subest í resolvers
    Query: {
        ...basketballFieldResolver.queries,
        ...pickupGameResolver.queries,
        ...playerResolver.queries
    },

    // Mutation resolvers sem eru fengnir út frá subest í resolvers
    Mutation: {
        ...pickupGameResolver.mutations,
        ...playerResolver.mutations
    },

    /* Tegundir resolvers */
    ...basketballFieldResolver.types,
    ...pickupGameResolver.types,
    ...playerResolver.types
};