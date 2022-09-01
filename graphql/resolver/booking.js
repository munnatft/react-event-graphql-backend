const { dateToString } = require("../../helpers/date");
const Booking = require("../../models/booking");
const Event = require("../../models/event");
const { transformBooking, transformEvents } = require("./merge");

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const event = await Event.findOne({ _id: args.eventId });
      if (!event) {
        throw new Error("No Event Found!");
      }
      const booking = new Booking({
        userId: req.userId,
        eventId: event,
      });
      const result = await booking.save();
      return transformBooking(result);
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async (args,req) => {
    if(!req.isAuth) {
        throw new Error("Unauthenticated!")
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate("eventId");
      const event = transformEvents(booking.eventId);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (error) {
      throw error;
    }
  },
};
