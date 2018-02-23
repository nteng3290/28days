import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      last: moment().format(moment.HTML5_FMT.DATE),
      length: '5',
      cycle: '28',
      next: []
    }
    // bind 'this' so I can use 'this' in the component
    this.dayChange = this.dayChange.bind(this);
    this.calculateDate = this.calculateDate.bind(this);
  }
  dayChange(e) {
    // Handling the input
    console.log('this is being handled');
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  calculateDate(e) {
    // Submitting the form......
    console.log(this.state);
    e.preventDefault();
    const date = this.state.last;
    const length = this.state.length;

    console.log(date);
    console.log(length);

    const theDate = moment(date).add(length, 'day').format('l');
    
    console.log(theDate);

    // const newDate = this.setState({
    //   last: moment(this.state.last).add(1, 'day')
    // })
    // console.log(newDate);

  }
  render() {
    // Rendering the inputs 
    return (
      <form onSubmit={this.calculateDate}>
        <label htmlFor="last">1.When was your last period?</label>
        <input type="date" id="last" value={this.state.last} onChange={this.dayChange}/>
        <label htmlFor="length">2.How many days does your period typically last?</label>
        <input type="number" id="length" value={this.state.length} min="3" max="10" onChange={this.dayChange}/>
        <label htmlFor="cycle">3.How long is your cycle?</label>
        <input type="number" id="cycle" value={this.state.cycle} min="21" max="45" onChange={this.dayChange}/>
        {/* Numbers outside of this range should create a prompt that shows irregularities */}
        <input type="submit" value="calculate"/>
      </form>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
