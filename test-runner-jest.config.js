/**
 * Jest config for @storybook/test-runner. Re-exports CJS config so ESM package can load it.
 * See: test-runner-jest.config.cjs
 */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
export default require('./test-runner-jest.config.cjs');
