import * as React from 'react';
import { Portal } from 'react-portal';
import glamorous from 'glamorous';
import { ChromePicker } from 'react-color';

import { FADE_IN, SCALE_IN, Z_INDEX_OVERLAY, Z_INDEX_SUPER } from '../../../style';
import { ColorChange } from '../interfaces';

const Container = glamorous.div({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: Z_INDEX_OVERLAY,
  animation: `125ms ease-in-out ${FADE_IN}`,
  // backgroundColor: `rgba(0, 0, 0, 0.5)`
});

const StyledChromePicker = glamorous(ChromePicker)<{
  color: string;
  onChangeComplete(color: ColorChange);
}>({
  animation: `250ms ease-in-out ${SCALE_IN}`,
  zIndex: Z_INDEX_SUPER
});

interface Props {
  color: string;
  onClose(): void;
  onChangeComplete(color: string): void;
  visible: boolean;
}
interface State {

}

export class Picker extends React.Component<Props, State> {
  private ESCAPE_KEY = 27;
  componentDidMount() {
    document.addEventListener('keypress', this.handleKeypress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeypress);
  }

  handleChangeComplete = (color: ColorChange) => {
    this.props.onChangeComplete(color.hex);
  }

  handleKeypress = (ev: KeyboardEvent) => {
    const code = ev.which || ev.keyCode;
    if (code === this.ESCAPE_KEY) {
      this.props.onClose();
    }
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <Portal>
        <Container onClick={this.props.onClose}>
          <StyledChromePicker color={this.props.color} onChangeComplete={this.handleChangeComplete} />
        </Container>
      </Portal>
    );
  }
}