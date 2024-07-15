const { ApolloServer, gql} = require('apollo-server');
const {users, events, participants, locations} = require('./data');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    events: [Event!]
  }

  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
    user: User!
    location: Location!
    participants: [Participant!]
  }

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
    events: [Event!]
  }

  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
    events:[Event!]
    username: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User! 

    events: [Event!]!
    event(id: ID!): Event!

    locations: [Location!]!
    location(id: ID!): Location!

    participants: [Participant!]!
    participant(id: ID!): Participant!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, args) => users.find((user) => user.id == args.id),

    events: () => events,
    event: (parent, args)=> events.find((event)=>event.id==args.id),

    locations: () => locations,
    location: (parent, args) => locations.find((location) => location.id == args.id),
    
    participants: () => participants,
    participant: (parent, args) => participants.find((participant) => participant.id == args.id),
  },
  Event: {
    user: (parent, args) => users.find(user => user.id == parent.user_id),
    location: (parent, args) => locations.find(location => location.id == parent.location_id),
    participants: (parent, args) => {
        return participants
          .filter(participant => participant.user_id == parent.user_id)
          .map(participant => {
            const user = users.find(user => user.id == participant.user_id);
            return {
              ...participant,
              username: user.username 
            };
          });
      },
  },

};


const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`👀  Server ready at ${url}`);
});