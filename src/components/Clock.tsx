import React from 'react';

type State = {
  today: Date;
};

type Props = {
  name: string;
};

export class Clock extends React.Component<Props, State> {
  state: Readonly<State> = {
    today: new Date(),
  };

  timer: number = 0;

  componentDidMount(): void {
    this.timer = window.setInterval(() => {
      const today = new Date();

      // eslint-disable-next-line no-console
      console.log(today.toUTCString().slice(-12, -4));
      this.setState({ today });
    }, 1000);
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.name === this.props.name) {
      return;
    }

    // eslint-disable-next-line no-console
    console.warn(`Renamed from ${prevProps.name} to ${this.props.name}`);
  }

  componentWillUnmount(): void {
    window.clearInterval(this.timer);
  }

  render(): React.ReactNode {
    const { name } = this.props;
    const { today } = this.state;

    return (
      <div className="Clock">
        <strong className="Clock__name">{name}</strong>

        {' time is '}

        <span className="Clock__time">
          {today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
