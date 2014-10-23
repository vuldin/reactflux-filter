var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');

var AppDispatcher = copyProperties(new Dispatcher(),{
  handleServerAction:function(action){
    this.dispatch({
      source:'SERVER_ACTION',
      action:action
    })
  },
  handleViewAction:function(action){
    this.dispatch({
      source:'VIEW_ACTION',
      action:action
    })
  }
})

module.exports = AppDispatcher;

