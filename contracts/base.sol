// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.21;
contract Record{
    address public administrator;
    uint256 public hospital_count;
    uint256 public insure_count;
    uint256 public customer_count;
    mapping (address=>bool) public hospital;
    mapping (address=>bool) public insurance;
    mapping (address=>bool) public users;
    mapping (address=>mapping(address=>bool)) public user_insure_relation;
    mapping (address=>mapping(address=>bool)) public grant_Write_Access_to_Insurance;
    constructor() public{
        administrator=msg.sender;
    }

    //Adding Hospitals, Insurance and User
    function addHospitals(address hosp) public payable{
        require(msg.sender==administrator);
        hospital[hosp]=true;
        hospital_count++;
    }
    function addInsurance(address insure) public payable{
        require(msg.sender==administrator);
        insurance[insure]=true;
        insure_count++;
    }   
    function addUser(address cust) public payable{
        require(msg.sender==administrator);
        users[cust]=true;
        customer_count++;
    }

    //function to grant access to Insurance
    function grantWriteAccesstoInsurance(address insure) payable public{
        require(insurance[insure]);
        grant_Write_Access_to_Insurance[msg.sender][insure]=true;
    }

    //Creating User Insurance Relation 
    function getInsurance(address cust) payable public{
        require(insurance[msg.sender]);
        require(grant_Write_Access_to_Insurance[cust][msg.sender]);
        user_insure_relation[cust][msg.sender]=true;
    }

    //Insurance Company adding AADHAR of User
    function addAadhar(address cust) payable public{
        require(insurance[msg.sender]);
        require(user_insure_relation[cust][msg.sender]);
        //Code to add AADHAR
    }
}