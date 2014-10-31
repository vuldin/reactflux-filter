/** @jsx React.DOM */
var React = require('react');

var AppActions = require('../actions/app-actions');

var FilterItemMain = React.createClass({
  render:function(){
    var styles={
      width:this.props.width,
      height:this.props.height
    };
    return (
      <div
        className='main'
        style={styles}
        onClick={this.handleEnableToggle}>
        <div className='filterLabel'>
          {this.props.item.text}
        </div>
      </div>
    );
  },
  handleEnableToggle:function(){
    if(this.props.item.enabled)AppActions.disable(this);
    else AppActions.enable(this);
  }
});
module.exports = FilterItemMain;
