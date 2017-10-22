import * as React from 'react';
import glamorous from 'glamorous';
import { css } from 'glamor';

import { ColorProvider, Footer, Picker } from './components';

import { GLOBAL } from './style';

const Container = glamorous.main({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%'
});

interface Props {}

function App(props: Props) {
  return (
    <ColorProvider render={({ actions, color }) => (
      <Container>
        <Picker onColorChange={actions.handleColorChange} defaultHex={color}/>
        <Footer backgroundColor={color}/>
      </Container>
    )}
    />
  );
}

GLOBAL
  .forEach(([selector, style]) => {
    css.global(selector as string, style as {});
  });

export default App;
