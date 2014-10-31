/** @jsx React.DOM */
var React = require('react');

var AppStore = require('../stores/app-store');
var FilterItems = require('./filterItems');
var FirebaseUtils = require('../utils/firebaseUtils');

function getFilter(){
  return {filter:AppStore.getFilter()};
}

var App = React.createClass({
  getInitialState:function(){
    return {filter:{items:[]}};
  },
  componentWillMount:function(){
    AppStore.addChangeListener(this._onChange);
  },
  componentDidMount:function(){
    // after 10 secs, start checking for server updates every 5 secs
    setTimeout(setInterval(FirebaseUtils.updateFilter,5000),10000);
  },
  _onChange:function(){
    this.setState(getFilter());
  },
  render:function(){
    return (
      <FilterItems
        key={this.state.filter.key}
        ref={'.'+this.state.filter.key}
        filter={this.state.filter}/>
    );
  }
});
module.exports = App;
