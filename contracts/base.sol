// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.21;
contract Record{
    address public administrator;
    address[] public hospital;
    address[] public insurance;
    address[] public users;
    uint256 public hospital_count;
    uint256 public insure_count;
    uint256 public customer_count;
    mapping (address=>address) public user_insure_relation;
    constructor() public{
        administrator=msg.sender;
    }
    function addHospitals(address hosp) public payable{
        require(msg.sender==administrator);
        hospital.push(hosp);
        hospital_count++;
    }
    function addInsurance(address insure) public payable{
        require(msg.sender==administrator);
        insurance.push(insure);
        insure_count++;
    }   
    function addUser(address cust) public payable{
        require(msg.sender==administrator);
        users.push(cust);
        customer_count++;
    }
    function getInsurance(address cust,address insure) payable public{
        user_insure_relation[cust]=insure;
    }
}