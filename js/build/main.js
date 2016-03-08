
var Container = React.createClass({
  displayName: 'Container',

  getInitialState: function () {
    return {
      question: 1
    };
  },

  componentDidMount: function () {
    this.getData = $.getJSON('data/quiz.json', function (data) {
      this.setState({ data: data });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.getData.abort();
  },

  decrement: function () {
    if (this.state.question > 1) {
      this.setState({ question: this.state.question - 1 });
    }
  },

  increment: function () {
    if (this.state.question < this.state.data.length) {
      this.setState({ question: this.state.question + 1 });
      $('table > tbody > tr > td').css('visibility', 'visible');
    }
  },

  render: function () {
    if (this.state.data === undefined) return React.createElement(
      'div',
      null,
      'Loading data...'
    );
    var clues = this.state.data[this.state.question - 1];
    var totalClues = clues["clues"].length;
    var sqrt = Math.sqrt(totalClues);
    var rows = Math.round(sqrt);
    var columns = Math.ceil(sqrt);
    var lastRow = totalClues % columns;

    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'navigateQuestions' },
        React.createElement(
          'button',
          { onClick: this.decrement },
          'Prev'
        ),
        this.state.question,
        ' of ',
        this.state.data.length,
        React.createElement(
          'button',
          { onClick: this.increment },
          'Next'
        )
      ),
      React.createElement(
        'div',
        { className: 'flex' },
        React.createElement(Frame, { rows: rows, columns: columns, lastRow: lastRow, clues: clues }),
        React.createElement(StatusFrame, null)
      )
    );
  }
});

var StatusFrame = React.createClass({
  displayName: 'StatusFrame',

  render: function () {
    return React.createElement(
      'div',
      { className: 'status' },
      'Clues:'
    );
  }
});

var Frame = React.createClass({
  displayName: 'Frame',

  hideAll: function () {
    $('table > tbody > tr > td').css('visibility', 'hidden');
  },

  render: function () {
    return React.createElement(
      'div',
      { className: 'frame', style: { backgroundImage: 'url(' + this.props.clues["image"] + ')' } },
      React.createElement(Table, { rows: this.props.rows, columns: this.props.columns, lastRow: this.props.lastRow, clues: this.props.clues["clues"] }),
      React.createElement(
        'button',
        { onClick: this.hideAll },
        'Show Answer'
      )
    );
  }
});

var Table = React.createClass({
  displayName: 'Table',

  render: function () {
    var tbody = [];
    for (var i = 0; i < this.props.rows - 1; i++) {
      tbody.push(React.createElement(Row, { multiplier: this.props.columns * i, key: i, columns: this.props.columns, clues: this.props.clues }));
    }

    if (this.props.lastRow === 0) {
      var multiplier = this.props.startsWith ? this.props.startsWith : this.props.columns * (this.props.rows - 1);
      tbody.push(React.createElement(Row, { multiplier: multiplier, key: multiplier - 1, columns: this.props.columns, clues: this.props.clues }));
      return React.createElement(
        'table',
        null,
        React.createElement(
          'tbody',
          null,
          tbody
        )
      );
    }

    var topHeight = Math.round(400 / this.props.rows * (this.props.rows - 1));
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { style: { height: topHeight + 'px' } },
        React.createElement(
          'table',
          null,
          React.createElement(
            'tbody',
            null,
            tbody
          )
        )
      ),
      React.createElement(
        'div',
        { style: { height: 400 - topHeight + 'px' } },
        React.createElement(Table, { startsWith: (this.props.rows - 1) * this.props.columns, rows: 1,
          columns: this.props.lastRow, lastRow: 0, clues: this.props.clues })
      )
    );
  }
});

var Row = React.createClass({
  displayName: 'Row',

  render: function () {
    var columns = [];
    for (var i = 1; i <= this.props.columns; i++) {
      columns.push(React.createElement(Cell, { key: i + this.props.multiplier, value: i + this.props.multiplier, clue: this.props.clues[i - 1 + this.props.multiplier] }));
    }
    return React.createElement(
      'tr',
      null,
      columns
    );
  }
});

var Cell = React.createClass({
  displayName: 'Cell',

  hide: function () {
    $(this.tdRef).css('visibility', 'hidden');
    console.log(this.props.clue);
  },

  render: function () {
    return React.createElement(
      'td',
      { ref: ref => this.tdRef = ref, onClick: this.hide },
      this.props.value
    );
  }
});

ReactDOM.render(React.createElement(Container, null), document.getElementById('container'));