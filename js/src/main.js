var Cell = React.createClass({
  getInitialState: function() {
      return {display: 'visible'};
  },

  hide: function() {
    this.setState({display: 'hidden'});
  },

  render: function() {
    return (<td style={{visibility: this.state.display}} onClick={this.hide}>{this.props.value}</td>);
  }
});

var Row = React.createClass({
  render: function() {
    var columns = [];
    for(var i = 1; i <= this.props.columns; i++) {
      columns.push(<Cell key={i + this.props.multiplier} value={i + this.props.multiplier} />);
    }
    return(<tr>{columns}</tr>);
  }
});

var Table = React.createClass({
  render: function() {
    var tbody = [];
    for(var i = 0; i < this.props.rows - 1; i++) {
      tbody.push(<Row multiplier={this.props.columns * i} key={i} columns={this.props.columns} />);
    }

    if(this.props.lastRow === 0) {
      var multiplier = (this.props.startsWith) ? this.props.startsWith : this.props.columns * (this.props.rows - 1);
      tbody.push(<Row multiplier={multiplier} key={multiplier - 1} columns={this.props.columns} />);
      return (
        <table><tbody>{tbody}</tbody></table>
      );
    }

    var topHeight = Math.round((400 / this.props.rows) * (this.props.rows - 1));
    return (
      <div>
        <div style={{height: topHeight + 'px'}}>
          <table><tbody>{tbody}</tbody></table>
        </div>
        <div style={{height: (400 - topHeight) + 'px'}}>
          <Table startsWith={(this.props.rows - 1) * this.props.columns} rows={1} columns={this.props.lastRow} lastRow={0} />
        </div>
      </div>
    );
  }
});

var Frame = React.createClass({
  render: function () {
    return (
      <div className="frame">
        <Table rows={this.props.rows} columns={this.props.columns} lastRow={this.props.lastRow} />
      </div>
    );
  }
});

var Picker = React.createClass({
  getInitialState: function() {
    return {count: this.props.initialCount};
  },
  decrement: function() {
    this.setState({count: this.state.count - 1});
  },

  increment: function() {
    this.setState({count: this.state.count + 1});
  },

  render: function() {
    var sqrt = Math.sqrt(this.state.count);
    var rows = Math.round(sqrt);
    var columns = Math.ceil(sqrt);
    var lastRow = this.state.count % columns;

    return (
      <div>
        <button onClick={this.decrement}>-</button>
        {this.state.count}
        <button onClick={this.increment}>+</button>
        <Frame rows={rows} columns={columns} lastRow={lastRow}/>
      </div>
    );
  }
});

var Container = React.createClass({
  render: function() {
    return (
      <Picker initialCount={25}/>
    );
  }
});

ReactDOM.render(<Container />, document.getElementById('container'));
