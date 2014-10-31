/** @jsx React.DOM */
var React = require('react');

var FilterItem = require('./filterItem');

var FilterItems = React.createClass({
  componentDidMount:function(){
      window.addEventListener('resize',this.handleResize);
  },
  handleResize:function(e){
    /*
     * calling setState (even though
     * not being used due to flux)
     * does something that is required
     * (aside from just calling
     * the render function) needed.
     * The following state object
     * could be used but would be
     * repeating state details kept
     * in firebase:
     * this.setState({
     *   windowWidth:window.innerWidth,
     *   windowHeight:window.innerHeight,
     *   height:this.props.filter.height,
     *   width:this.props.filter.width
     * });
    */
    if(this.isMounted())this.setState({});
  },
  render:function(){
    var height = this.props.filter.height;
    var width = this.props.filter.width;
    if(height!=undefined){
      if(height.indexOf('px')>0){
        height = +height.substring(0,height.length-2);
      }else{
        height=window.innerHeight;
      }
      height=height/this.props.filter.items.length;
      height=height+'px';
    }
    /*
    // only needed if emplementing horizontal mode
    if(width!=undefined){
      if(width.indexOf('px')){
        width = parseInt(width.substring(0,width.length-2));
      }
    }
    */
    var filter=this.props.filter; // since this is not the same within the map below
    var isLast=false; // to handle no border on last expander element
    var items = this.props.filter.items.map(function(item,i){
      var styles = {
        width:width,
        height:height
      };
      if(i!=filter.items.length-1){
      //if(i<filter.items.length-2){
        styles['border-bottom']='1px black solid';
      }
      else isLast=true;
      return (
        <FilterItem
          key={'.'+i}
          styles={styles}
          isLast={isLast}
          item={item}/>
      );
    });
    return (
      <div className='filter'>
        {items}
      </div>
    );
  }
});
module.exports = FilterItems;
