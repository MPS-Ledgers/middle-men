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
    it("adds a user", async () => {
        await record.methods.addUser(accounts[1]).send({ from: accounts[0] });
    });
    it("adds aadhaar", async () => {
        const asciiArray = [
            81,
            109,
            81,
            71,
            75,
            51,
            112,
            102,
            98,
            70,
            78,
            107,
            82,
            89,
            85,
            114,
            82,
            101,
            98,
            100,
            97,
            75,
            89,
            110,
            122,
            104,
            55,
            103,
            86,
            100,
            111,
            72,
            106,
            105,
            110,
            103,
            114,
            89,
            106,
            74,
            51,
            80,
            52,
            111,
            87,
            80,
        ];
        await record.methods.addUser(accounts[1]).send({ from: accounts[0] });
        await record.methods
            .addInsurance(accounts[2])
            .send({ from: accounts[0] });
        await record.methods
            .addHospitals(accounts[3])
            .send({ from: accounts[0] });
        await record.methods
            .addAadhar(accounts[1], asciiArray)
            .send({ from: accounts[2], gas: "6100000" });
    });
    it("send money", async () => {
        await record.methods.addUser(accounts[1]).send({ from: accounts[0] });
        await record.methods
            .addInsurance(accounts[2])
            .send({ from: accounts[0] });
        await record.methods
            .addHospitals(accounts[3])
            .send({ from: accounts[0] });
        await record.methods.addMoneyToInsurance(accounts[2]).send({
            from: accounts[1],
            value: web3.utils.toWei("10", "ether"),
        });
        await record.methods
            .transferMoney(accounts[3])
            .send({ from: accounts[2], value: web3.utils.toWei("5", "ether") });
    });
});
