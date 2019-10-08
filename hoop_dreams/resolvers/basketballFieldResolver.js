const {
    getAllBasketballFields,
    getBasketballFieldById
  } = require('../services/basketballFieldService');
  const { PickupGames } = require('../data/db');
  
  module.exports = {
  
    queries : {

      // Sækir alla korfuboltavellina frá services eða kastar error
      allBasketballFields: (parent, args) =>
        getAllBasketballFields(args.status).then(fields => fields).catch(err => { throw err; }),
  
      // Sækir korfuboltavelli eftir auðkenni frá services eða kastar error
      basketballField: (parent, args) =>
        getBasketballFieldById(args.id).then(field => field).catch(err => { throw err; })
        
    },
  
    types : {
  
      BasketballField : {
        // Sækja leiki fyrir völl með því að ná í leiki sem hafa locationID sem þennan körfuboltavöll
        pickupGames: (parent) =>
          new Promise((res, err) =>
            PickupGames.find({ fieldLocationId: parent.id }, (error, games) => error ? err(new InternalServerError(false)) : res(games)))
            .then(games => games)
            .catch(error => { throw error; }),
        }
  
    }
  }