import * as React from 'react';
import * as debounce from 'lodash.debounce';

interface PropsRender {
  render(state: State): React.ReactChild;
}

interface PropsChildren {
  children(state: State): React.ReactChild;
}

type Props = (PropsChildren | PropsRender) & {
  scrollDebounce?: number;
};

interface State {
  deltaX: number;
  deltaY: number;
}

export class ScrollProvider extends React.Component<Props, State> {
  state = {} as State;
  constructor(props: Props) {
    super(props);

    this.handleScroll = debounce(this.handleScroll.bind(this), typeof props.scrollDebounce === 'number' ? props.scrollDebounce : 15);
  }

  componentDidMount() {
    document.addEventListener('wheel', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('wheel', this.handleScroll);
  }

  handleScroll(ev: MouseWheelEvent) {
    this.setState({
      deltaX: ev.deltaX,
      deltaY: ev.deltaY
    });
  }

  render() {
    const { render, children = render } = this.props as any;
    return children(this.state);
  }
}
