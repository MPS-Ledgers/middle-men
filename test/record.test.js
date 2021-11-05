const assert = require("assert");
const Web3 = require("web3");
const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
const web3 = new Web3(provider);

const compiledRecord = require("../src/ethereum/build/Record.json");

let accounts;
let record;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  record = await new web3.eth.Contract(JSON.parse(compiledRecord.interface))
    .deploy({ data: compiledRecord.bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Record", () => {
  it("deploys a record and a campaign", () => {
    assert.ok(record.options.address);
  });
});
