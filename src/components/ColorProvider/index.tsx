import * as React from 'react';
import { rgb, parseToRgb, parseToHsl } from 'polished';

interface PropsRender {
  render(state: RenderContent): React.ReactChild;
}

interface PropsChildren {
  children(state: RenderContent): React.ReactChild;
}

type Props = (PropsRender | PropsChildren) & {

}

interface State {
  color: string;
  unit: string;
}

type RenderContent = State & {
  actions: {
    handleColorChange(color: string): void;
  }
}

export class ColorProvider extends React.Component<Props, State> {
  state = {
    color: '#18C29C',
    unit: 'hex'
  };

  handleColorChange = (color: string) => {
    this.setState({
      color
    });
  }

  handleUnitChange = (unit: string) => {
    const colorTable = {
      rgb: color => {
        const { red, green, blue } = parseToRgb(color);
        return `rgb(${[red, green, blue].join(', ')})`;
      },
      hex: color => rgb(color),
      hsl: color => {
        const { hue, saturation, lightness } = parseToHsl(color);
        return `hsl(${[hue, saturation, lightness].join(', ')})`;
      }
    };
    this.setState({
      color: colorTable[unit](this.state.color),
      unit
    });
  }

  render() {
    const { render, children = render } = (this.props as any);
    return children({
      actions: {
        handleColorChange: this.handleColorChange,
        handleUnitChange: this.handleUnitChange
      },
      ...this.state
    });
  }
}
