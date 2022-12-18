const root = process.cwd()

const fs = require('fs');
const path = require('path');
const { parseBuffer } = require('../parse');

module.exports = function loadEnv(target) {

    if (!target) return null;

    const envFilePath = path.join(root, '.env');
    const bufferEnv = fs.readFileSync(envFilePath);
    const envObject = parseBuffer(bufferEnv);

    let found = Object.entries(envObject)

    if(envObject == null) {
        return null;
    } else {
       for (const [key, value] of Object.entries(envObject)) {
        if (key == target) {
            return value;
        } else {
            null;
        }
       }
    }
}