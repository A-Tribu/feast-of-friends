const User = require('./User');
const Event = require('./Event');
const Dish = require('./Dish');
const Combo = require('./Combo');

//user can organize many potluck events
User.hasMany(Event, {
  foreignKey: 'organizer',
});

//an event has one organizer 
Event.belongsTo(User,{
    foreignKey: 'organizer',
});

//user can be contributors to many potluck events through junction table Combo
User.belongsToMany(Event, {
    through: Combo,
});

//event has many contributing users
Event.belongsToMany(User, {
    through: Combo,
});

//user can contribute many dishes
User.hasMany(Dish, {
    foreignKey: 'preparedBy',
});

//a dish belongs to one user
Dish.belongsTo(User, {
    foreignKey: 'preparedBy',
});

//an event can have many dishes
Event.belongsToMany(Dish,{
    through: Combo,
});

//a dish is signed up to an event
Dish.belongsTo(Event,{
    foreignKey: 'eventID',
});


module.exports = { User, Event, Dish, Combo};
