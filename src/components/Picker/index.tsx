import * as React from 'react';
import glamorous from 'glamorous';
import { adjustHue, darken, lighten } from 'polished';

import { ScrollProvider } from '../';
import { validHex } from '../../util';
import { COLOR_FADE_IN_TRANSITION } from '../../style';

const Container = glamorous.div<{}>({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  transition: COLOR_FADE_IN_TRANSITION
});

const PickerContainer = glamorous.div({
  display: 'flex'
});

import { ColorPicker, Input } from '../';

interface Props {
  defaultHex: string;
  onColorChange(color: string): void;
}
interface State {
  hex: string;
}

export class Picker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hex: props.defaultHex
    }
  }

  handleColorChange = (possibleHex: string) => {
    const hex = possibleHex.charAt(0) !== '#' ? `#${possibleHex}` : possibleHex;
    if (validHex(hex)) {
      this.setState({
        hex
      }, () => this.props.onColorChange(hex));
    }
  }

  getBackgroundColor(deltaX: number, deltaY: number) {
    return (color: string) => {
      try {
        if (deltaX === 0 && deltaY === 0) {
          return color;
        } else if (deltaY !== 0) {
          return (deltaY > 0 ? darken : lighten)(Math.abs(deltaY / 100), color);
        } else if (deltaX !== 0) {
          return adjustHue(Math.abs(deltaX), color);
        }
        return color;
      } catch (e) {
        return color;
      }
    };
  }

  render() {
    return (
      <ScrollProvider render={({ deltaX = 0, deltaY = 0}) => (
        <Container style={{
          backgroundColor: this.getBackgroundColor(deltaX, deltaY)(this.state.hex)
        }}>
          <PickerContainer>
            <Input color={this.state.hex} defaultValue={this.props.defaultHex} onColorChange={this.handleColorChange}/>
            <ColorPicker color={this.state.hex} onChangeComplete={this.handleColorChange} />
          </PickerContainer>
        </Container>
      )}
      />
    );
  }
}
