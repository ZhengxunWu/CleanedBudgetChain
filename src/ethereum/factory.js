//import web3 instance
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

//create a usable,deployed instance of contract based on its abi and deployed address
const instance=new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xAFfc364046f263DEce09B44453105E35d338659C'
);

//note: this is a deployed copy of the 'campaignfactory'
//so everywhere in this project, you import this file and use factory.methods.
//<method name> to get access to the contract method, 
//view function with .call()
export default instance;