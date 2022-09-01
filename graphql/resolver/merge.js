const User = require("../../models/user");
const Event = require("../../models/event");
const { dateToString } = require("../../helpers/date");

const getEvents = async (eventIDs) => {
  try {
    const events = await Event.find({ _id: { $in: eventIDs } });
    return events.map((event) => {
      return transformEvents(event)
    });
  } catch (error) {
    throw error;
  }
};

const getEventCreator = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User Not Found!");
    }
    return {
      ...user._doc,
      _id: user.id,
      eventsCreated: getEvents.bind(this, user._doc.eventsCreated),
    };
  } catch (error) {
    throw error;
  }
};

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error("No Event Found!");
    }
    return transformEvents(event);
  } catch (error) {
    throw error;
  }
};

const transformEvents = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    createdBy: getEventCreator.bind(this, event.createdBy),
  };
};

const transformBooking = (booking) => {
    return {
        ...booking._doc,
        _id: booking.id,
        event: singleEvent.bind(this,booking.eventId),
        user: getEventCreator.bind(this,booking.userId),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
}


exports.transformEvents = transformEvents;
exports.transformBooking = transformBooking;
