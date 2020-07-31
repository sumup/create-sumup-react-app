/**
 * Copyright 2020, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @jsx jsx */
import styled from '@emotion/styled';
import { jsx, css, Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { Card, Heading, List, Text, BaseStyles } from '@sumup/circuit-ui';

import { light } from '@sumup/design-tokens';

import { ReactComponent as LogoIcon } from './assets/logo.svg';

const Logo = styled(LogoIcon)`
  ${({ theme }) => css`
    display: block;
    fill: ${theme.colors.white};
    margin-bottom: ${theme.spacings.tera};
    margin-top: ${theme.spacings.peta};
  `};
`;

const Container = styled('header')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 450px;
  min-height: 100vh;
  margin: 0 auto;
`;

const globalStyles = css`
  body {
    background-color: ${light.colors.n100};
  }
`;

const App = () => (
  <ThemeProvider theme={light}>
    <BaseStyles />
    <Global styles={globalStyles} />
    <Container>
      <Logo data-testid="sumup-logo" />
      <Card>
        <Heading size={Heading.KILO}>Welcome to SumUp React</Heading>
        <Text>
          This is a <code>create-react-app</code>
          -based project featuring some SumUp-specific customizations:
        </Text>
        <List size={List.MEGA}>
          <li>Circuit UI integration</li>
          <li>Emotion support (incl. babel plugin)</li>
          <li>Lodash support (incl. babel plugin)</li>
          <li>
            SumUp ESLint and Prettier configuration (in and outside{' '}
            <code>react-scripts</code>)
          </li>
        </List>
        <Text
          size={Text.GIGA}
          css={css`
            text-align: center;
          `}
        >
          Now go and build things!
          <br />
        </Text>
        <Text
          size={Text.GIGA}
          css={css`
            text-align: center;
            transform: scale3d(1.5, 1.5, 1);
          `}
        >
          <span role="img" aria-label="Emojis for building things">
            🔨👩🏽‍💻👨🏼‍💻🚀
          </span>
        </Text>
      </Card>
    </Container>
  </ThemeProvider>
);

export default App;
