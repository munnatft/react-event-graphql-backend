const Event = require("../../models/event");
const User = require("../../models/user");
const {dateToString} = require("../../helpers/date");
const { transformEvents } = require("./merge");

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map((event)=>{
                return transformEvents(event)
            })
        } catch (error) {
            throw error
        }
        
    },
    createEvent: async ( args, req ) => {
        if(!req.isAuth) {
            throw new Error("Unauthenticated!")
        }
        try {
            const event = new Event({
                title : args.eventInput.title,
                description : args.eventInput.description,
                price : +args.eventInput.price,
                date : dateToString(args.eventInput.date),
                createdBy : req.userId
            });
            const result = await event.save();
            const user = await User.findById(req.userId);
            if(!user) {
                throw new Error("User Not Found!");
            }
            user.eventsCreated.push(event)
            await user.save()
            return transformEvents(result)
        } catch (error) {
            throw error
        }
    }
}