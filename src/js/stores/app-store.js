var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');

var CHANGE_EVENT = 'change';
var OTHERS=true; // determines target(s) of _setKey function

var _filter = {};

function _setKey(isOthers,item,keys,vals,array){
  var items=_filter.items;
  if(array != undefined) items=array;
  items.forEach(function(d,i){
    if(!isOthers){
      if(d.text===item.text){ // TODO should be unique id to handle identically named keys on item and list
        for(var j=0;j<keys.length;j++){
          if(d.childrenobj[keys[j]]!=undefined) d.childrenobj[keys[j]]=vals[j];
          else if(d[keys[j]]!=undefined) d[keys[j]]=vals[j];
        }
      }
    }else{
      if(d.text!=item.text){
        //console.log(d,keys,vals);
        for(var j=0;j<keys.length;j++){
          //console.log(keys[j]);
          if(d.childrenobj!=undefined){
            //console.log('childrenobj defined');
            if(d.childrenobj[keys[j]]!=undefined){
            //console.log(d,keys[j],vals[j]);
              d.childrenobj[keys[j]]=vals[j];
            }
          }
          if(d[keys[j]]!=undefined){
            //console.log('key is on this');
            d[keys[j]]=vals[j];
          }
        }
      }
    }
  });
}
function _setFilter(filter){
  _filter = filter;
}
function _enableItem(item){
  _setKey(!OTHERS,item,['enabled'],[true]);
  _setKey(OTHERS,item,['enabled'],[true],item.childrenobj.items);
}
function _disableItem(item){
  _setKey(!OTHERS,item,['enabled'],[false]);
  _setKey(OTHERS,item,['enabled'],[false],item.childrenobj.items);
}
function _expandItem(item){
  _setKey(OTHERS,item,['display','opaque'],[false,true]);
  _setKey(!OTHERS,item,['display','opaque'],[true,false]);
}
function _contractItem(item){
  _setKey(!OTHERS,item,['display'],[false]);
  _setKey(OTHERS,item,['opaque'],[false]);
}
var AppStore = merge(EventEmitter.prototype, {
  emitChange:function(){
    this.emit(CHANGE_EVENT);
  },
  addChangeListener:function(callback){
    this.on(CHANGE_EVENT,callback);
  },
  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT,callback);
  },
  getFilter:function(){
    return _filter;
  },
  dispatcherIndex:AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
      case AppConstants.SETLOCALFILTER:
        _setFilter(action.item);
        break;
      case AppConstants.ENABLE:
        _enableItem(action.item.props.item);
        break;
      case AppConstants.DISABLE:
        _disableItem(action.item.props.item);
        break;
      case AppConstants.EXPAND:
        _expandItem(action.item.props.item);
        break;
      case AppConstants.CONTRACT:
        _contractItem(action.item.props.item);
        break;
    }
    AppStore.emitChange();
    return true;
  })
});

module.exports = AppStore;
