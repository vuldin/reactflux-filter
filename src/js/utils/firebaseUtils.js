var Firebase = require('firebase');

var AppActions = require('../actions/app-actions');
var AppStore = require('../stores/app-store');

var firebaseRef = new Firebase('https://react-filter.firebaseio.com/filter/');
firebaseRef.on('child_changed',function(snapshot){
  firebaseRef.on('value',function(d){
    AppActions.setLocalFilter(d.val());
  });
});
function _setFilter(){
  firebaseRef.set(AppStore.getFilter());
}

var FirebaseUtils = {
  getDummyItems:function(){
    var SampleData = require('../SampleData.js');
    SampleData.init();
    var items = [];
    var items = JSON.parse(localStorage.getItem('items'));
    AppActions.setLocalItems(items);
  },
  getFilter:function(){
    firebaseRef.once('value',function(snapshot){
      AppActions.setLocalFilter(snapshot.val());
    });
  },
  updateFilter:function(){
    _setFilter();
  }
};
module.exports = FirebaseUtils;
