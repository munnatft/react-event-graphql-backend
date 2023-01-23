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
        username: String!
        email: String!
        password: String
        eventsCreated: [Event!]
    }

    type AuthUser {
        userId: ID!
        username: String!
        email: String!
    }
    type Auth {
        user: AuthUser!
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

    type Message {
        message: String!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input UserInput {
        username: String!
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
        createUser(userInput:UserInput): Message
        bookEvent(eventId: ID!): Booking!
        cancelBooking(bookingId: ID!): Event!
    }
`);

module.exports = schema;
