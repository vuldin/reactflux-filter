/** @jsx React.DOM */
var React = require('react/addons');

var AppActions = require('../actions/app-actions.js');
var ExpanderItem = require('./expanderItem.js');

var FilterItemExpand = React.createClass({
  render:function(){
    var childrenobj = {display:false};
    if(this.props.item.childrenobj != undefined) childrenobj = this.props.item.childrenobj;
    var cx = React.addons.classSet;
    var classes = cx({
      'glyphicon':true,
      /*
      'glyphicon-plus':!childrenobj.display,
      'glyphicon-minus':childrenobj.display
      'glyphicon-chevron-left':!childrenobj.display,
      */
      'glyphicon-chevron-right':childrenobj.display
    });
    var styles={
      height:this.props.height
    };
    var expander={};
    if(childrenobj.display){
      expander = (
        <div
          className={'expander'}
          style={styles}
          onClick={this.handleExpandToggle}>
          <span
            className={classes}/>
        </div>
      );
    }
    else {
      var width = '16px'; // 15+1 to account for border?
      var height = this.props.height;
      if(height!=undefined){
        if(height.indexOf('px')>0){
          height = +height.substring(0,height.length-2);
        }else height=window.innerHeight;
        height=height/childrenobj.items.length;
        //height-=1; // border-bottom: 1px
        height=height+'px';
      }
      var isLast=this.props.isLast;
      var items = childrenobj.items.map(function(item,i){
        var styles = {
          width: width,
          height: height
        };
        if(!isLast){
          styles['border-bottom']='1px black solid';
        }else{
          if(i != childrenobj.items.length-1) styles['border-bottom']='1px black solid';
        }
        return (
          <ExpanderItem
            key={i}
            styles={styles}
            item={item}/>
        );
      });
      expander = (
        <div
          className={'expander'}
          onClick={this.handleExpandToggle}>
          {items}
        </div>
      );
    }
    return expander;
  },
  handleExpandToggle:function(){
    if(!this.props.item.childrenobj.display)AppActions.expand(this);
    else AppActions.contract(this);
  }
});
module.exports = FilterItemExpand;
