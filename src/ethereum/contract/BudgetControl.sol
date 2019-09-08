pragma solidity ^0.4.17;

contract CampaignFactory {

    address[] public deployedCampaigns;



    function createCampaign(uint minimum, uint goal, uint _healthcareMax, uint _educationMax, uint _InfraMax) public {

        address newCampaign = new Campaign(minimum, goal, msg.sender,  _healthcareMax, _educationMax, _InfraMax);

        deployedCampaigns.push(newCampaign);

    }



    function getDeployedCampaigns() public view returns (address[]) {

        return deployedCampaigns;

    }

}



contract Campaign {

    struct Request {

        string description;

        uint value;

        address recipient;

        bool complete;

        uint approvalCount;

        mapping(address => bool) approvals;

    }
    
    



    Request[] public requests;

    address public manager;

    uint public minimumContribution;
    
    uint public totalBudget;
    
    uint public healthcareMax;
    
    uint public educationMax;
    
    uint public InfraMax;

    mapping(address => bool) public approvers;

    uint public approversCount;



    modifier adminOnly() {

        require(msg.sender == manager);

        _;

    }


   //government make an intiative for some public goods
    function Campaign(uint minimum, uint goal, address creator, uint _healthcareMax, uint _educationMax, uint _InfraMax) public {

        manager = creator;

        minimumContribution = minimum;
        
        totalBudget = goal;
        
        healthcareMax=_healthcareMax;
        
        educationMax=_educationMax;
        
        InfraMax=_InfraMax;
        
    }



    function contribute() public payable {

        require(msg.value > minimumContribution);


        approvers[msg.sender] = true;

        approversCount++;

    }

//      function compareStrings (string memory a, string memory b) public view 
//       returns (bool) {
//   return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );

//       }

    // 0:healthcare 1: education 2: infrastructure

    function createRequest(string description, uint sector, uint value, address recipient) public adminOnly {
        
        if (sector==0) {
            require(value<=healthcareMax);
        }
        if(sector==1) {
            require(value<=educationMax);
        }
        if(sector==2){
            require(value<=InfraMax);
        }
        
        
        Request memory newRequest = Request({

           description: description,

           value: value,

           recipient: recipient,

           complete: false,

           approvalCount: 0

        });



        requests.push(newRequest);

    }



    function approveRequest(uint index) public {

        Request storage request = requests[index];



        require(approvers[msg.sender]);

        require(!request.approvals[msg.sender]);



        request.approvals[msg.sender] = true;

        request.approvalCount++;

    }



    function finalizeRequest(uint index) public adminOnly {

        Request storage request = requests[index];

       
       //must exceed half of the citizens
        require(request.approvalCount > (approversCount / 2));
       //prevent double spending
        require(!request.complete);


       //execute the money transfer automatically and immediately as long as the requirement has been met 
        request.recipient.transfer(request.value);

        request.complete = true;

    }



    function getSummary() public view returns (

      uint, uint, uint, uint, address

      ) {

        return (

          minimumContribution,

          this.balance,

          requests.length,

          approversCount,

          manager

        );

    }



    function getRequestsCount() public view returns (uint) {

        return requests.length;

    }

}

