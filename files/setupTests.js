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

/**
 * Add custom Jest matchers for the DOM.
 * https://github.com/testing-library/jest-dom#readme
 */
import '@testing-library/jest-dom/extend-expect';

import serializer, { matchers } from 'jest-emotion';

/**
 * These matchers help you test agains specific style rules
 * in a test.
 *
 * https://github.com/emotion-js/emotion/tree/master/packages/jest-emotion#custom-matchers
 */
// eslint-disable-next-line no-undef
expect.extend(matchers);

/**
 * The serializer will make sure emotion generated styles
 * show up in snapshots.
 *
 * https://github.com/emotion-js/emotion/tree/master/packages/jest-emotion#snapshot-serializer
 */
// eslint-disable-next-line no-undef
expect.addSnapshotSerializer(serializer);
