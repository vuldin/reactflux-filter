/** @jsx React.DOM */
var React = require('react/addons');

var ExpanderItem = React.createClass({
  render:function(){
    var cx = React.addons.classSet;
    var classes = cx({
      'enable':this.props.item.enabled,
      'disable':!this.props.item.enabled
    });
    return (
      <div className={classes} style={this.props.styles}/>
    );
  }
});
module.exports = ExpanderItem;
