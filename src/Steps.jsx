'use strict';

var React = require('react');


var Steps = React.createClass({
  _previousStepsWidth: 0,
  _totalItemsWidth: 0,
  getInitialState() {
    return {
      init: false,
      tailWidth: 0
    };
  },
  componentDidMount() {
    var $dom = React.findDOMNode(this);
    var tw = 0;
    var len = $dom.children.length - 1;
    var i;
    for (i = 0; i <= len; i++) {
      tw += $dom.children[i].offsetWidth;
    }

    this._totalItemsWidth = tw;
    this._previousStepsWidth = React.findDOMNode(this).offsetWidth;
    this._update();
    if (window.attachEvent) {
      window.attachEvent('onresize', this._resize);
    } else {
      window.addEventListener('resize', this._resize);
    }
  },
  componentWillUnmount() {
    if (window.attachEvent) {
      window.detachEvent('onresize', this._resize);
    } else {
      window.removeEventListener('resize', this._resize);
    }
  },
  _resize() {
    var w = React.findDOMNode(this).offsetWidth;
    if (this._previousStepsWidth === w) {
      return;
    }
    this._previousStepsWidth = w;
    this._update();
  },
  _update() {
    var len = this.props.children.length - 1;
    var dw = Math.round((this._previousStepsWidth - this._totalItemsWidth) / len) - 1;
    if (dw <= 0) {
      return;
    }
    this.setState({
      init: true,
      tailWidth: dw
    });
  },
  render() {
    var props = this.props;
    var prefixCls = props.prefixCls ? props.prefixCls : 'rc';
    var children = props.children;
    var len = children.length - 1;
    return (
      <div className={prefixCls + '-steps' + (this.state.init ? '' : ' ' + prefixCls + '-steps-init') + (props.size === 'small' ? ' ' + prefixCls + '-steps-small' : '')}>
        {React.Children.map(children, function(ele, idx) {
          var np = {
            stepNumber: (idx + 1).toString(),
            stepLast: idx === len,
            tailWidth: this.state.tailWidth,
            prefixCls: prefixCls
          };
          return React.cloneElement(ele, np);
        }, this)}
      </div>
    );
  }
});

module.exports = Steps;
