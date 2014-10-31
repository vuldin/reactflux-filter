/** @jsx React.DOM */
var React = require('react/addons');

var FilterItemMain = require('./filterItemMain');
var FilterItemExpand = require('./filterItemExpand');

var FilterItem = React.createClass({
  render:function(){
    var cx = React.addons.classSet;
    var children = [];
    if(this.props.item.childrenobj != undefined) children = this.props.item.childrenobj.items;
    var classes = cx({
      'enable':this.props.item.enabled,
      'disable':!this.props.item.enabled,
      'opaque':this.props.item.opaque
    });
    var mainWidth=this.props.styles.width;
    if(children.length>0){
      mainWidth=+mainWidth.substring(0,mainWidth.length-2);
      mainWidth-=15;
      mainWidth-=1; // border-right:1px
      mainWidth=mainWidth+'px';
    }
    return (
      <div className={classes} style={this.props.styles}>
        <FilterItemMain
          width={mainWidth}
          height={this.props.styles.height}
          item={this.props.item}/>
        <FilterItemExpand
          height={this.props.styles.height}
          isLast={this.props.isLast}
          item={this.props.item}/>
      </div>
    );
  }
});
module.exports = FilterItem;
