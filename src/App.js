import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import React, { Component } from 'react';
import BigCalendar, { Views } from 'react-big-calendar';
import moment from 'moment';

import './App.css';

const testEvents = [
  {
    start: new Date(2018, 5, 15, 8, 15),
    end: new Date(2018, 5, 15, 13, 15),
    title: 'Test Event A',
  },
  {
    start: new Date(2018, 5, 15, 10, 45),
    end: new Date(2018, 5, 15, 17),
    title: 'Test Event C',
  },
  {
    start: new Date(2018, 5, 15, 14),
    end: new Date(2018, 5, 15, 20),
    title: 'Test Event D',
  },
  {
    start: new Date(2018, 5, 15, 15, 30),
    end: new Date(2018, 5, 15, 20, 30),
    title: 'Test Event E',
  },
];

const badEventB = {
  start: new Date(2018, 5, 15, 8, 45),
  end: new Date(2018, 5, 15, 15),
  title: 'Test Event B',
};

const goodEventB = {
  start: new Date(2018, 5, 15, 8, 45),
  end: new Date(2018, 5, 15, 16),
  title: 'Test Event B',
};

BigCalendar.momentLocalizer(moment);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: Views.DAY,
      showBadEvents: true,
    };
  }

  onToggleEvents = () => {
    this.setState((prevState) => ({
      showBadEvents: !prevState.showBadEvents,
    }));
  }

  render() {
    const events = this.state.showBadEvents ?
      [...testEvents, badEventB] :
      [...testEvents, goodEventB];

    return (
      <div className="App">
        <div className="bugDescription">
          <strong>Bug description:</strong> Test Event E is from 3:30 - 8:30 and is almost completely covered up by
          Test Event C.
          <br />
          <br />
          If Test Event B goes beyond the start time of Test Event E, the events display properly.
          To see this in action, click the "Toggle Event B Time" button.
          <br />
          <br />
          <button onClick={this.onToggleEvents}>Toggle Test Event B Time</button>
        </div>
        <div className="calendarWrapper">
          <BigCalendar
            defaultDate={new Date(2018, 5, 15)}
            events={events}
            view={this.state.view}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            onView={(view) => this.setState({ view })}
          />
        </div>
      </div>
    );
  }
}

export default App;
