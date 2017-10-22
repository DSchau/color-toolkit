import * as React from 'react';

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
}

type RenderContent = State & {
  actions: {
    handleColorChange(color: string): void;
  }
}

export class ColorProvider extends React.Component<Props, State> {
  state = {
    color: '#18C29C'
  };

  handleColorChange = (color: string) => {
    this.setState({
      color
    });
  }

  render() {
    const { render, children = render } = (this.props as any);
    return children({
      actions: {
        handleColorChange: this.handleColorChange
      },
      ...this.state
    });
  }
}
