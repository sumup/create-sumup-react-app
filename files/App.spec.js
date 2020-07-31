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

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import App from './App';

/**
 * defaultProps help you have sensible defaults that work
 * for most tests.
 */
const defaultProps = {
  // This will look more complex for real component.
};

/**
 * Having a dedicated test render function for your component
 * makes it easy to keep your tests decoupled and reduces
 * boilerplate.
 */
const renderApp = (props = {}) =>
  render(<App {...{ ...defaultProps, ...props }} />);

describe('App', () => {
  afterEach(cleanup);

  /**
   * Testing by what your user sees gives you more confidence
   * in your tests.
   */
  it('should show a title inside the card', () => {
    const { getByText } = renderApp();
    const heading = getByText('Welcome to SumUp React', { selector: 'h2' });
    expect(heading).not.toBeNull();
  });

  /**
   * For something like a logo, it might make sense to use a test-id
   * data attribute.
   */
  it('should show the SumUp logo', () => {
    const { queryByTestId } = renderApp();
    expect(queryByTestId('sumup-logo')).toBeInTheDocument();
  });
});
