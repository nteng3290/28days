import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      last: '',
      length: '5',
      cycle: '28',
      next: []
    }
    this.dayChange = this.dayChange.bind(this);
  }
  dayChange(e) {
    // Handling the input
    // e.preventDefault();
    // e.target.id = "hey";
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  calculateDate() {

  }
  render() {
    // Rendering the inputs 
    return (
      <form>
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
