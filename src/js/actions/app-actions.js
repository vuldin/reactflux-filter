var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var AppActions = {
  setLocalFilter:function(filter){
    AppDispatcher.handleServerAction({
      actionType:AppConstants.SETLOCALFILTER,
      item:filter
    })
  },
  addLocalItem:function(item){
    AppDispatcher.handleServerAction({
      actionType:AppConstants.ADDLOCALITEM,
      item:item
    })
  }
  enable:function(item){
    AppDispatcher.handleViewAction({
      actionType:AppConstants.ENABLE,
      item:item
    })
  },
  disable:function(item){
    AppDispatcher.handleViewAction({
      actionType:AppConstants.DISABLE,
      item:item
    })
  },
  expand:function(item){
    AppDispatcher.handleViewAction({
      actionType:AppConstants.EXPAND,
      item:item
    })
  },
  contract:function(item){
    AppDispatcher.handleViewAction({
      actionType:AppConstants.CONTRACT,
      item:item
    })
  }
};

module.exports = AppActions;

