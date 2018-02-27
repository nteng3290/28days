import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import UserLogin from './UserLogin';
import Cycle from './Cycle';

const config = {
  apiKey: "AIzaSyCoBmsRR0XSxq84y722qifzhkXr9Umhzz4",
  authDomain: "track-it-fa2f4.firebaseapp.com",
  databaseURL: "https://track-it-fa2f4.firebaseio.com",
  projectId: "track-it-fa2f4",
  storageBucket: "",
  messagingSenderId: "660850419997"
};
firebase.initializeApp(config);

//lifecycle hook, what we want to do at that point... 
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      last: moment().format(moment.HTML5_FMT.DATE),
      length: '5',
      cycle: '28',
      next: [],
    }
    // bind 'this' so I can use 'this' in the component
    this.dayChange = this.dayChange.bind(this);
    this.calculateDate = this.calculateDate.bind(this);
    this.showSidebar = this.showSidebar.bind(this);
  }
  showSidebar(e) {
    e.preventDefault();
    this.sidebar.classList.toggle("show");
  }
  componentDidMount(){
    // when it has been rendered in the page.... we are going to do something
    // when we get some sort of data when a value is received...
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref(`users/${user.uid}`).on('value', (res) => {
          console.log(res.val());
          // since our data is coming back as an object we want to make it an array
          const userData = res.val();
          const dateArray =[];
          for(let key in userData) {
            dateArray.push(userData[key])
          }
          console.log(dateArray);
          
          this.setState({
            next: dateArray,
            loggedIn: true,
            user: user,
          })
        });
      }
      else{
        this.setState({
          next: [],
          loggedIn: false,
          user: {},
        });
      }
    })
  }
  dayChange(e) {
    // Handling the input
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  calculateDate(e) {
    // Submitting the form......
    // console.log(this.state);
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
    const theDate = calculateCycle (4);
    console.log(theDate);

    // Removing the initial date from the Array 
    const newDate = theDate.slice(1,4);
    // console.log(newDate);
    
    // this.setState({
    //   next: newDate,
    // })

    // const dbRef = firebase.database().ref();
    const dbRef = firebase.database().ref(`users/${this.state.user.uid}`);

    dbRef.set(newDate);

    this.showSidebar(e);

  }
  render() {
    // Rendering the inputs 
    return (
      <div>
        <header>
          <div className="title">
            <h1>28</h1>
            <h3>days</h3>
            <div className="infinityDesign">
              <img src="./assets/infinity.png" />
            </div>
          </div>
          <UserLogin />
        </header>
        <div className="wrapper">
          <main>
            {this.state.loggedIn ?
              <div className="mainContent">
                <div className="getCycle">
                  <button onClick={this.showSidebar}>Get Cycle</button>
                  <h3>{moment().format('llll')}</h3>
                </div>
                <section className="nextCycle">
                  {/* Here we display the new sates that I got from calculateDate */}
                  <div className="displayCycle">
                    {/* <p>{this.state.next}</p> */}
                    {this.state.next.map((date, i) => {
                      return (
                        <Cycle date={date} key={`date-${i}`}/>
                      )
                    })}
                  </div>
                </section>
              </div>
              :
              <div className="welcomePage">
                <div className="welcome">
                  <h2>w<span>e</span>lcom<span>e</span></h2>
                  <p><span className="logoNum">28</span><span className="logoDay">days</span> is a simple app that calcualte and monitors your next period cycle.</p>
                  <p>Create an account to get started!</p>
                </div>
                <div className="clock">
                  <img src="./assets/cycle.svg" />
                  <h2>{moment().format("LT")}</h2>
                </div>
              </div>
            }
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

ReactDOM.render(<App />, document.getElementById('app'));
