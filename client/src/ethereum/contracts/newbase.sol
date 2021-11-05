// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.17;
contract Record{
    address public administrator;
    uint256 public hospital_count;
    uint256 public insure_count;
    uint256 public customer_count;
    mapping (address=>bool) public hospital;
    mapping (address=>bool) public insurance;
    mapping (address=>bool) public users;
    mapping (address=>uint[]) public user_aadhaars;
    mapping (address=>uint[]) public user_ds;
    mapping (address=>uint) public insurance_balance;
    
    function Record() public {
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

    function addAadhar(address cust,uint[] memory AADHAR) payable public{
        require(insurance[msg.sender]);
        require(users[cust]);
        for(uint i=0;i<AADHAR.length;++i){
            user_aadhaars[cust].push(AADHAR[i]);            
        }
    }

    function getAadhar(address cust) public view returns(uint[] memory) {
        require(insurance[msg.sender]);
        require(users[cust]);
        return user_aadhaars[cust];
    }
    
    function addDS(address cust,uint[] memory DS) payable public{
        require(hospital[msg.sender]);
        require(users[cust]);
        for(uint i=0;i<DS.length;++i){
            user_ds[cust].push(DS[i]);            
        }
    }

    function getDS(address cust) public view returns(uint[] memory) {
        require(hospital[msg.sender]);
        require(users[cust]);
        return user_ds[cust];
    }
    
    function addMoneyToInsurance(address insu) payable public{
        require(users[msg.sender]);
        require(insurance[insu]);
        
        insu.transfer(msg.value);
    }
    
    function transferMoney(address hosp) payable public {
        require(insurance[msg.sender]);
        require(hospital[hosp]);
        
        hosp.transfer(msg.value);
    }
}