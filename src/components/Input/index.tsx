import * as React from 'react';
import glamorous from 'glamorous';

import { THEME } from '../../style';

const Input = glamorous.input({
  backgroundColor: `rgba(255, 255, 255, 0.85)`,
  padding: THEME.padding,
  fontSize: THEME.fontSize,
  boxSizing: 'border-box',
  border: 'none',
  ':focus': {
    boxShadow: '0 0 8px white'
  }
}).withProps({ type: 'text' });

interface Props {
  color: string;
  onColorChange(color: string): void;
}

interface State {
  color: string;
}

class InputElement extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      color: props.color
    };
  }

  componentWillReceiveProps({ color }: Props) {
    this.setState({
      color
    });
  }

  handleColorChange = ev => {
    const color = ev.target.value;
    this.setState({
      color
    }, () => {
      this.props.onColorChange(color);
    });
  }

  render() {
    const { color } = this.state;
    return  <Input value={color.replace(/^#/, '')} onChange={this.handleColorChange}/>;
  }
}

export { InputElement as Input };
