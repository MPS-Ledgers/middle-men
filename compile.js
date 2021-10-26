const path = require('path')
const fs = require('fs')
const solc = require('solc')
const BasePath = path.resolve(__dirname, 'contracts', 'base.sol')
const source = fs.readFileSync(BasePath, 'utf-8')
module.exports=solc.compile(source, 1).contracts[':Record']