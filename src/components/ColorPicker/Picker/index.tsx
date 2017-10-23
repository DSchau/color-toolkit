import * as React from 'react';
import { Portal } from 'react-portal';
import glamorous from 'glamorous';
import { SketchPicker } from 'react-color';

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
  animation: `125ms ease-in-out ${FADE_IN}`
});

const StyledSketchPicker = glamorous(SketchPicker)<{
  color: string;
  disableAlpha: boolean;
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
  private containerEl: HTMLElement;
  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyup);
  }

  componentWillUnmount() {
    this.containerEl = null;
    document.removeEventListener('keyup', this.handleKeyup);
  }

  handleChangeComplete = (color: ColorChange) => {
    this.props.onChangeComplete(color.hex);
  }

  handleClick = (ev) => {
    if (this.containerEl === ev.target) {
      this.props.onClose();
    }
  }

  handleKeyup = (ev: KeyboardEvent) => {
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
        <Container innerRef={node => this.containerEl = node}onClick={this.handleClick}>
          <StyledSketchPicker color={this.props.color} disableAlpha={true} onChangeComplete={this.handleChangeComplete} />
        </Container>
      </Portal>
    );
  }
}