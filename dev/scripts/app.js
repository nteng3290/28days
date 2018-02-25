import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

// const config = {
//   apiKey: "AIzaSyCoBmsRR0XSxq84y722qifzhkXr9Umhzz4",
//   authDomain: "track-it-fa2f4.firebaseapp.com",
//   databaseURL: "https://track-it-fa2f4.firebaseio.com",
//   projectId: "track-it-fa2f4",
//   storageBucket: "",
//   messagingSenderId: "660850419997"
// };
// firebase.initializeApp(config);

//lifecycle hook, what we want to do at that point... 
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      last: moment().format(moment.HTML5_FMT.DATE),
      length: '5',
      cycle: '28',
      next: [],
    }
    // bind 'this' so I can use 'this' in the component
    this.dayChange = this.dayChange.bind(this);
    this.calculateDate = this.calculateDate.bind(this);
    // this.countDown = this.countDown.bind(this);
    this.showSidebar = this.showSidebar.bind(this);
  }
  showSidebar(e) {
    e.preventDefault();
    this.sidebar.classList.toggle("show");
  }
  // componentDidMount(){
  //   // when it has been rendered in the page.... we are going to do something
  //   // when we get some sort of data when a value is received...
  //   firebase.database().ref().on('value', (res) => {
  //     // console.log(res.val());
  //     // since our data is coming back as an object we want to make it an array
  //     const userData = res.val();
  //     const dateArray =[];
  //     for(let key in userData) {
  //       userData[key].key = key;
  //       dateArray.push(userData[key])
  //     }
  //     this.setState({
  //       next: dateArray
  //     })
  //   });
  // }
  dayChange(e) {
    // Handling the input
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
    const cycle = this.state.cycle;

    console.log(date);
    console.log(length);

    function calculateCycle (num) {
      const results = [];
      for(let i = 0; i < num; i++) {
        results.push(moment(date).add((cycle * i), 'day').add(length * (i === 0 ? i : i -1), 'day').format('l'))
      }
      return results;
    }
    // Three Cycles -- By Default
    // ternary..... 
    const theDate = calculateCycle (4);
    console.log(theDate);

    // Removing the initial date from the Array 
    const newDate = theDate.slice(1,4);
    console.log(newDate);
    
    this.setState({
      next: newDate,
    })
    // const dbRef = firebase.database().ref();

    // dbRef.push(newDate);

    // const daysTo = newDate.map();
    // console.log(daysTo);

    // this.setState({
    //   next: [
    //     {
    //       daysTo: countDownDays,
    //       date: newDate
    //     }
    //   ]
    // })

  }
  editDate(){

  }
  render() {
    // Rendering the inputs 
    return (
      <div>
        <header>
          <div className="userInfo">
            <button className="user"><i className="fas fa-user"></i></button>
            <button>Login</button>
          </div>
          <div className="title">
            <h1>28</h1>
            <h3>days</h3>
          </div>
          <button onClick={this.showSidebar}>Get Cycle</button>
        </header>
        <div className="wrapper">
          <main>
            <div className="clock">
            </div>
            <section className="nextCycle">
              {/* Here we display the new sates that I got from calculateDate */}
              <div className ="displayCycle">
                {/* <p>{this.state.next}</p> */}
                {this.state.next.map((date, i) => {
                  return (
                    <div className ="oneCycle" key={`date-${i}`}>  
                      <p className ="daysTo">{moment(date).fromNow()}</p>
                      <EditDate data={date} />
                    </div>
                  )
                })}
              </div>
            </section>
          </main>
          <aside className="sidebar" ref={ref => this.sidebar = ref}>
            <form id="mainForm" onSubmit={this.calculateDate}>
              <h2>Calculate Next Cycle</h2>
              <div className="closeButton" onClick={this.showSidebar}>
                <i className="fas fa-times"></i>
              </div>
              <div className="questions">
                <div className="question">
                  <label htmlFor="last">When did your last period end?</label>
                  <input type="date" id="last" value={this.state.last} onChange={this.dayChange} />
                </div>
                <div className="question">
                  <label htmlFor="length">Average length of period?</label>
                  <input type="number" id="length" value={this.state.length} min="3" max="10" onChange={this.dayChange} />
                </div>
                <div className="question">
                  <label htmlFor="cycle">Average cycle Length</label>
                  <input type="number" id="cycle" value={this.state.cycle} min="21" max="45" onChange={this.dayChange} />
                  {/* Numbers outside of this range should create a prompt that shows irregularities */}
                </div>
              </div>
              <input type="submit" value="calculate"/>
            </form>
          </aside>
        </div>
      </div>
    )
  }
}

// function that returns JSX
// function is passed a props
const EditDate = (props) => {
  return (
    <div className="theDate">
      <p>{props.data} <button className="edit"><i className="fas fa-pen-square"></i></button></p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
