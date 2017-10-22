import * as React from 'react';
import glamorous from 'glamorous';

const Form = glamorous.form({});

const Group = glamorous.ul({
  margin: 0,
  padding: 0,
  display: 'flex',
  width: 200
});

const Item = glamorous.li({
  margin: 0,
  padding: 0,
  display: 'inline-block',
  listStyleType: 'none',
  width: '100%'
});

const Button = glamorous.button({
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',
  width: '100%'
});

interface Props {}
interface State {}

export class ColorTypes extends React.Component<Props, State> {
  handleSubmit = ev => {
    ev.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Group>
          {['hex', 'rgb', 'hsl'].map(type => <Item key={type}><Button>{type}</Button></Item>)}
        </Group>
      </Form>
    );
  }
}
