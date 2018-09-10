const { promisify } = require('util');
const { join } = require('path');
const copyFile = promisify(require('fs').copyFile);

(async () => {
  await copyFile(
    join(__dirname, '../../../README.md'),
    join(__dirname, '../README.md')
  );
})();
