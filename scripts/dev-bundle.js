const fs = require('fs-extra');
const dest = './node_modules/@skyux/layout';

const rimraf = require('rimraf');
rimraf.sync(dest);

fs.ensureDirSync(dest);
fs.copySync('./dist', dest);
