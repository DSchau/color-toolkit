import * as React from 'react';
import glamorous from 'glamorous';
import { complement, rgba, readableColor } from 'polished';
import * as ColorLens from 'react-icons/lib/md/color-lens';

import { Picker } from './Picker';

import { THEME } from '../../style';

import { ColorChange } from './interfaces';

const Container = glamorous.div({});
const Button = glamorous.button({
  boxSizing: 'border-box',
  border: 'none',
  padding: THEME.padding,
  fontSize: THEME.fontSize
});

interface Props {
  color: string;
  onChangeComplete(hex: string): void;
}
interface State {
  visible: boolean
}

export class ColorPicker extends React.Component<Props, State> {
  state = {
    visible: false
  };

  handleButtonClick = () => {
    this.setState({
      visible: true
    });
  }

  handleChange = (color: ColorChange) => {
    this.props.onChangeComplete(color.hex);
  }

  handleClose = () => {
    this.setState({
      visible: false
    });
  }
  
  render() {
    const { visible } = this.state;
    const color = complement(this.props.color);
    return (
      <Container>
        <Button onClick={this.handleButtonClick} style={{
          backgroundColor: color
        }}><ColorLens size={THEME.fontSize * 1.25} color={rgba(readableColor(color), 0.85)} /></Button>
        <Picker color={this.props.color} onChangeComplete={this.props.onChangeComplete} onClose={this.handleClose} visible={visible} />
      </Container>
    );
  }
}
