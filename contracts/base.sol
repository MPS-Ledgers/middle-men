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
    mapping (address=>mapping(address=>uint[])) public user_aadhar;
    mapping (address=>mapping(address=>uint[])) public treatment_summaries;
    mapping (address=>mapping(address=>bool)) public user_insure_relation;
    mapping (address=>mapping(address=>bool)) public grant_Write_Access_to_Insurance;
    mapping (address=>mapping(address=>bool)) public grant_View_Acess_To_Hospital;
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
        require(users[msg.sender]);
        grant_Write_Access_to_Insurance[msg.sender][insure]=true;
    }

    //Creating User Insurance Relation 
    function userInsurance(address cust) payable public{
        require(insurance[msg.sender]);
        require(users[cust]);
        require(grant_Write_Access_to_Insurance[cust][msg.sender]);
        user_insure_relation[cust][msg.sender]=true;
    }

    //Insurance Company adding AADHAR of User
    function addAadhar(address cust,uint[] memory AADHAR) payable public{
        require(insurance[msg.sender]);
        require(users[cust]);
        require(user_insure_relation[cust][msg.sender]);
        for(uint i=0;i<AADHAR.length;++i){
            user_aadhar[msg.sender][cust].push(AADHAR[i]);            
        }
    }

    //Grant access to hospital for viewing user insurance
    function grantViewAcessToHospital(address hosp) payable public{
        require(hospital[hosp]);
        require(users[msg.sender]);
        grant_View_Acess_To_Hospital[hosp][msg.sender]=true;
    }

    //Hospital send Aadhar and discharge summary to Insurance
    function HospitalToInsurance(address insure,uint prize) payable public{
        require(insurance[insure]);
        require(hospital[msg.sender]);
    }
}