// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract CampaignFactory{
    
    struct Campaign{
        uint campaign_id;
        string title;
        uint requiredAmount; 
        string category;
        string description;
        string imgURI; 
        address payable owner;
        address dr_address;
        uint receivedAmount;
    }

    mapping(uint => bool) public campaign_status;
    mapping(uint => Campaign) public all_campaigns;
    mapping(address => uint[]) public dr_mapping;
    event donated(address indexed donar, uint indexed amount, uint indexed timestamp);
    
    uint public campaign_count;

    function createCampaign(string memory _title, uint _requiredAmount, string memory _category,
        string memory _description, string memory _imgURI, address _dr_address) public returns (uint) 
        {
            campaign_count++;
            Campaign memory newCampaign;
            newCampaign = Campaign(campaign_count, _title, _requiredAmount, _category,  _description, _imgURI, payable(msg.sender), _dr_address, 0);
            all_campaigns[campaign_count] = newCampaign;
            campaign_status[campaign_count] = false;
            dr_mapping[_dr_address].push(campaign_count);
            
            return campaign_count;
        }

    function verifyCampaign(uint c_id) public {
        campaign_status[c_id] = true;
        removeVerifiedCampaignFromDr(msg.sender, c_id);
    } 

    function getCampaignIdByDr(address _dr_address, uint ind) public view returns(uint){
        return dr_mapping[_dr_address][ind];
    }

    function getCampaignLengthByDr(address _dr_address) public view returns(uint){
        return dr_mapping[_dr_address].length;
    }

    function getCampaignDetailsById(uint _id) public view returns(string memory, uint, string memory, string memory, string memory, address){
        return (
            all_campaigns[_id].title, all_campaigns[_id].requiredAmount, all_campaigns[_id].category, 
            all_campaigns[_id].description, all_campaigns[_id].imgURI, all_campaigns[_id].owner
        );
    }

    function getCampaignStatusById(uint _id) public view returns(bool){
        return campaign_status[_id];
    }

    function removeVerifiedCampaignFromDr(address _dr_address, uint c_id) public{
        for(uint i=0; i < dr_mapping[_dr_address].length; i++){
            if( c_id == dr_mapping[_dr_address][i]){
                delete dr_mapping[_dr_address][i];
                break;
            }
        }  
    }
    
    function donate(uint _campaignId) payable external{
        require(all_campaigns[_campaignId].requiredAmount > all_campaigns[_campaignId].receivedAmount, "Required Amount Fulfilled");
        (all_campaigns[_campaignId].owner).transfer(msg.value);
        all_campaigns[_campaignId].receivedAmount+=msg.value;
        emit donated(msg.sender, msg.value, block.timestamp);
    }
}