/**
 * Add custom Jest matchers for the DOM.
 * https://github.com/testing-library/jest-dom#readme
 */
/* global expect */
import '@testing-library/jest-dom/extend-expect';

import serializer, { matchers } from 'jest-emotion';

/**
 * These matchers help you test agains specific style rules
 * in a test.
 *
 * https://github.com/emotion-js/emotion/tree/master/packages/jest-emotion#custom-matchers
 * */
expect.extend(matchers);

/**
 * The serializer will make sure emotion generated styles
 * show up in snapshots.
 *
 * https://github.com/emotion-js/emotion/tree/master/packages/jest-emotion#snapshot-serializer
 * */
expect.addSnapshotSerializer(serializer);
