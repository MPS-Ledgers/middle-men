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
  mapping(address => mapping ( address => uint256[])) public user_aadhaars;
  mapping(address => mapping(address => mapping(uint => uint256[]))) public user_ds;
  mapping(address => mapping(address=>uint)) public ds_count;
  // 0 => 1 DS
  // 1 => 2 DS
  mapping(address => uint256) public insurance_balance;

  function addHospitals(address hosp) public payable {
    hospital[hosp] = true;
    hospital_count++;
  }

  function addInsurance(address insure) public payable {
    insurance[insure] = true;
    insure_count++;
  }

  function addUser(address cust) public payable {
    users[cust] = true;
    customer_count++;
  }

  function addAadhar(address cust, uint256[] memory AADHAR) public payable {
    require(insurance[msg.sender]);
    require(users[cust]);
    
    for (uint256 i = 0; i < AADHAR.length; ++i) {
      user_aadhaars[cust][msg.sender].push(AADHAR[i]);
    }
  }

  function getAadhar(address cust) public view returns (uint256[] memory) {
    require(insurance[msg.sender]);
    require(users[cust]);

    return user_aadhaars[cust][msg.sender];
  }

  function addDS(address cust, uint256[] memory DS) public payable {
    require(hospital[msg.sender]);
    require(users[cust]);
    
    for (uint256 i = 0; i < DS.length; ++i) {
      user_ds[cust][msg.sender][ds_count[cust][msg.sender]].push(DS[i]);
    }
    ds_count[cust][msg.sender]++;
  }

  function getDS(address cust, address hosp) public view returns (uint256[] memory) {
    require(users[cust]);
    require(insurance[msg.sender]);
    require(hospital[hosp]);
    
    return user_ds[cust][hosp][ds_count[cust][hosp]-1];
  }

  function addMoneyToInsurance(address insu) public payable {
    require(users[msg.sender]);
    require(insurance[insu]);

    insurance_balance[insu] += msg.value;
    insu.transfer(msg.value);
  }

  function transferMoney(address hosp) public payable {
    require(insurance[msg.sender]);
    require(hospital[hosp]);
    
    insurance_balance[msg.sender] -= msg.value;
    hosp.transfer(msg.value);
  }
}
