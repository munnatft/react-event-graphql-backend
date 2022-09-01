const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        createdBy: User!
    }

    type User {
        _id: ID!
        email: String!
        password: String
        eventsCreated: [Event!]
    }
    type Auth {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type Booking {
        _id: ID!
        event: Event!
        user: User!
        createdAt: String!
        updatedAt: String!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type Query {
        events: [Event!]!
        bookings: [Booking!]!
        login(email: String!, password: String!): Auth!
    }

    type Mutation {
        createEvent(eventInput:EventInput): Event
        createUser(userInput:UserInput): User
        bookEvent(eventId: ID!): Booking!
        cancelBooking(bookingId: ID!): Event!
    }
`);

module.exports = schema;
