const eventResolver = require("./event");
const userResolver = require("./user");
const bookingResolver = require("./booking");

const rootResolver = {
    ...eventResolver,
    ...userResolver,
    ...bookingResolver
}

module.exports = rootResolver;