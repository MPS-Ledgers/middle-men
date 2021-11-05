// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.17;

contract Record {
  address public administrator;
  uint256 public hospital_count;
  uint256 public insure_count;
  uint256 public customer_count;
  mapping(address => bool) public hospital;
  mapping(address => bool) public insurance;
  mapping(address => bool) public users;
  mapping(address => uint256[]) public user_aadhaars;
  mapping(address => uint256[]) public user_ds;
  mapping(address => uint256) public insurance_balance;

//   constructor() {
//     administrator = msg.sender;
//   }

  //Adding Hospitals, Insurance and User
  function addHospitals(address hosp) public payable {
    // require(msg.sender==administrator);
    hospital[hosp] = true;
    hospital_count++;
  }

  function addInsurance(address insure) public payable {
    // require(msg.sender==administrator);
    insurance[insure] = true;
    insure_count++;
  }

  function addUser(address cust) public payable {
    // require(msg.sender==administrator);
    users[cust] = true;
    customer_count++;
  }

  function addAadhar(address cust, uint256[] memory AADHAR) public payable {
    require(insurance[msg.sender]);
    require(users[cust]);
    for (uint256 i = 0; i < AADHAR.length; ++i) {
      user_aadhaars[cust].push(AADHAR[i]);
    }
  }

  function getAadhar(address cust) public view returns (uint256[] memory) {
    require(insurance[msg.sender]);
    require(users[cust]);
    return user_aadhaars[cust];
  }

  function addDS(address cust, uint256[] memory DS) public payable {
    require(hospital[msg.sender]);
    require(users[cust]);
    for (uint256 i = 0; i < DS.length; ++i) {
      user_ds[cust].push(DS[i]);
    }
  }

  function getDS(address cust) public view returns (uint256[] memory) {
    require(hospital[msg.sender]);
    require(users[cust]);
    return user_ds[cust];
  }

  function addMoneyToInsurance(address insu) public payable {
    require(users[msg.sender]);
    require(insurance[insu]);

    insu.transfer(msg.value);
  }

  function transferMoney(address hosp) public payable {
    require(insurance[msg.sender]);
    require(hospital[hosp]);

    hosp.transfer(msg.value);
  }
}
