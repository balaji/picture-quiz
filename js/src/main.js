
var Container = React.createClass({
  getInitialState: function() {
    return {
      question: 1,
      data: [{}]
    }
  },

  componentDidMount: function() {
    this.getData = $.getJSON('data/quiz.json', function(data) {
      this.setState({data: data});
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.getData.abort();
  },

  decrement: function() {
    this.setState({count: this.state.count - 1});
  },

  increment: function() {
    this.setState({count: this.state.count + 1});
  },

  render: function() {
    var clues = this.state.data[this.state.question - 1];
    if(clues["clues"] === undefined) return(<div/>);
    var totalClues = clues["clues"].length
    var sqrt = Math.sqrt(totalClues);
    var rows = Math.round(sqrt);
    var columns = Math.ceil(sqrt);
    var lastRow = totalClues % columns;

    return (
      <div>
        <button onClick={this.decrement}>-</button>
        {this.state.count}
        <button onClick={this.increment}>+</button>
        <Frame rows={rows} columns={columns} lastRow={lastRow} clues={clues}/>
      </div>
    );
  }
});

var Frame = React.createClass({
  render: function () {
    return (
      <div className="frame" style={{backgroundImage: 'url(' + this.props.clues["image"] + ')'}}>
        <Table rows={this.props.rows} columns={this.props.columns} lastRow={this.props.lastRow} clues={this.props.clues["clues"]} />
      </div>
    );
  }
});

var Table = React.createClass({
  render: function() {
    var tbody = [];
    for(var i = 0; i < this.props.rows - 1; i++) {
      tbody.push(<Row multiplier={this.props.columns * i} key={i} columns={this.props.columns} clues={this.props.clues} />);
    }

    if(this.props.lastRow === 0) {
      var multiplier = (this.props.startsWith) ? this.props.startsWith : this.props.columns * (this.props.rows - 1);
      tbody.push(<Row multiplier={multiplier} key={multiplier - 1} columns={this.props.columns} clues={this.props.clues} />);
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
          <Table startsWith={(this.props.rows - 1) * this.props.columns} rows={1}
          columns={this.props.lastRow} lastRow={0} clues={this.props.clues} />
        </div>
      </div>
    );
  }
});

var Row = React.createClass({
  render: function() {
    var columns = [];
    for(var i = 1; i <= this.props.columns; i++) {
      columns.push(<Cell key={i + this.props.multiplier} value={i + this.props.multiplier} clue={this.props.clues[i - 1 + this.props.multiplier]} />);
    }
    return(<tr>{columns}</tr>);
  }
});

var Cell = React.createClass({
  getInitialState: function() {
      return {display: 'visible'};
  },

  hide: function() {
    this.setState({display: 'hidden'});
    console.log(this.props.clue);
  },

  render: function() {
    return (<td style={{visibility: this.state.display}} onClick={this.hide}>{this.props.value}</td>);
  }
});

ReactDOM.render(<Container />, document.getElementById('container'));
