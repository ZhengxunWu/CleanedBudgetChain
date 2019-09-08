import React, { Component, useState } from "react";
import { Button, Typography } from "antd";
import { Campaigns } from "../campaign";
import { Link } from "react-router-dom";
import factory from "../../ethereum/factory";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";



const { Title, Paragraph, Text } = Typography;

// class CampaignIndex extends Component {
//   async componentDidMount() {
//     const campaigns=await factory.methods.getDeployedCampaigns().call();
//     console.log(campaigns);
//   }

//   render() {
//     return <div>campaign Campaign!</div>;
//   }
// }

// export default CampaignIndex;

export const HomePage = props => {
  const [campaignIds, setCampaign] = useState([]);
  const handleClick = () => {
    var test = factory.methods.getDeployedCampaigns().call();

    test.then(val => {
      setCampaign(val);
      console.log(`Val = ${val}`);
    });
  };
  
//  / /show:id=1 
  let campaigns = campaignIds.map(val => {
    //route to new page with metadata getsummary() and create request btn +
    //requests list by requests with info (with state/up/down)
    //request btn request form 
  //to={this.props.myroute} onClick={() => hello(someValue)}
     const campaign=Campaign("0xAFfc364046f263DEce09B44453105E35d338659C")
     const summary=campaign.methods.getSummary().call();
    return <div>
          <Link onClick={() => console.log(summary[1])}>{val}</Link>
          </div>;}
   // return <Show key="{parseInt(val, 16)}%10000000000" value="{val}"/>}
);
  return (
    <div>
      <Typography>
        <Title style={{ color: "white" }}>Welcome to the BudgetChain!</Title>
        <h4 style={{ color: "grey" }}>The distributed solution to avoid fraud based on Ethereum blockchain</h4>
      </Typography>
      <Button onClick={handleClick}>Get All current campaigns</Button>
      <Button type="primary">
        <Link to="/Campaigns/:campaignId">Create Campaign</Link>
      </Button>
      <div></div>
      {campaigns}
    </div>
  );
};
