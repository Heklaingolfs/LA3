const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

// Tengja Mongodb
const mongoDBString = "mongodb://root:Root123@ds235833.mlab.com:35833/hoopdreams"
const connection = mongoose.createConnection( mongoDBString, { useNewUrlParser: true } );

// Player schema fyrir MongoDB schema-ið
const playersSchema = new Schema({
    name: { type: String, required: true },
    playedGamesIds: { type: [Schema.Types.ObjectId], required: true },
}, { collection: 'players' });

// Pickup schema fyrir MongoDB schema-ið
const pickupGamesSchema = new Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    fieldLocationId: { type: String, required: true },
    registeredPlayersIds: { type: [Schema.Types.ObjectId], required: true },
    hostId: { type: Schema.Types.ObjectId, required: true },
}, { collection: 'pickupGames' });

// Connect schema fyrir MongoDB schema-ið
module.exports = {
    PickupGames: connection.model('PickupGames', pickupGamesSchema),
    Players: connection.model('PlayersSchema', playersSchema)
};