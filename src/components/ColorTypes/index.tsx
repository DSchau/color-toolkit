import * as React from 'react';
import glamorous from 'glamorous';

const Form = glamorous.form({
  display: 'flex',
  flex: 1,
  width: '100%'
});

const Group = glamorous.ul({
  margin: 0,
  padding: 0,
  display: 'flex',
  width: '100%'
});

const Item = glamorous.li({
  margin: 0,
  padding: 0,
  display: 'inline-block',
  listStyleType: 'none'
});

const Button = glamorous.button({
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',
  width: '100%'
});

interface Props {
  unit: string;
  onUnitChange(unit: string): void;
}
interface State {}

export class ColorTypes extends React.Component<Props, State> {
  handleSubmit = ev => {
    ev.preventDefault();
  }

  handleUnitChange = (ev) => {
    const unit = ev.target.getAttribute('name');
    if (this.props.unit !== unit) {
      this.props.onUnitChange(unit);
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Group>
          {['hex', 'rgb', 'hsl'].map(type => <Item key={type}><Button name={type} onClick={this.handleUnitChange}>{type}</Button></Item>)}
        </Group>
      </Form>
    );
  }
}
