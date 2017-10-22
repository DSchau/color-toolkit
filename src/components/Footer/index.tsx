import * as React from 'react';
import glamorous from 'glamorous';
import { darken, complement, readableColor, rgba } from 'polished';
import * as Code from 'react-icons/lib/md/code';
import * as Github from 'react-icons/lib/go/mark-github';

import { ColorTypes } from '../';
import { COLOR_FADE_IN_TRANSITION, SERIF } from '../../style';

const Container = glamorous.footer({
  flex: '0 0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  padding: `1rem`,
  borderTop: `1px solid transparent`,
  transition: COLOR_FADE_IN_TRANSITION
});

const Message = glamorous.h3({
  margin: 0,
  padding: 0,
  fontSize: 12,
  textAlign: 'center'
}, SERIF);

const Link = glamorous.a({
  color: 'inherit'
});

interface Props {
  backgroundColor: string;
}

export function Footer(props: Props) {
  const color = complement(props.backgroundColor);
  const inverted = rgba(readableColor(color), 0.85);
  return (
    <Container style={{
      backgroundColor: color,
      borderTopColor: darken(0.1, color)
    }}>
      <ColorTypes />
      <Message style={{
        color: inverted
      }}>Made with <Code size={16} /> by <Link href="https://dustinschau.com" target="_blank" rel="noopener">Dustin Schau</Link></Message>
      <Link href="https://github.com/dschau/color-playground" target="_blank" rel="noopener"><Github size={20} color={inverted} /></Link>
    </Container>
  );
}
