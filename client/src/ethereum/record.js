import web3 from "./web3";
import Record from "./build/Record.json";

const instance = new web3.eth.Contract(
  JSON.parse(Record.interface),
  "0x691254Ab7050248e8a83C3c456895A92eE9E84E7"
);

export default instance;
