import React from 'react';
import './App.scss';
import { Clock } from './components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  clockName: string;
  hasClock: boolean;
};

export class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    clockName: 'Clock-0',
    hasClock: true,
  };

  timer: number = 0;

  componentDidMount(): void {
    this.timer = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);

    document.addEventListener('contextmenu', this.hideClock.bind(this));
    document.addEventListener('click', this.showClock.bind(this));
  }

  componentWillUnmount(): void {
    window.clearInterval(this.timer);
    document.removeEventListener('contextmenu', this.hideClock.bind(this));
    document.removeEventListener('click', this.showClock.bind(this));
  }

  hideClock(event: MouseEvent): void {
    event.preventDefault();
    this.setState({ hasClock: false });
  }

  showClock(): void {
    this.setState({ hasClock: true });
  }

  render(): React.ReactNode {
    const { clockName, hasClock } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && <Clock name={clockName} />}
      </div>
    );
  }
}
