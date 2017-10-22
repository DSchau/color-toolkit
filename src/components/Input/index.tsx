import * as React from 'react';
import glamorous from 'glamorous';

import { THEME } from '../../style';

const Input = glamorous.input({
  padding: THEME.padding,
  fontSize: THEME.fontSize,
  boxSizing: 'border-box',
  border: 'none'
}).withProps({ type: 'text' });

interface Props {
  color: string;
  defaultValue: string;
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
