const common = [
  '--require-module ts-node/register', // Load TypeScript module
  // '--require-module tsconfig-paths/register', // Load TypeScript module
  `--format-options '{"snippetInterface": "synchronous"}'`, // Custom formatting
  '--publish-quiet'
].join(' ');

module.exports = {
  default: common,
};
