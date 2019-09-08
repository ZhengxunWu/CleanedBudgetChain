import React, { useState } from "react";
import { Form, Icon, Input, Button, Typography, Spin } from "antd";
import { Link } from "react-router-dom";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const { Title, Paragraph, Text } = Typography;

export const CampaignForm = props => {
  const {
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched
  } = props.form;
  const [campaign, setCampaign] = useState({
    healthCareMax: "",
    educationMax: "",
    infraMax: "",
    min: "",
    goal: "",
    errorMsg: ""
  });

  const [loading, setLoading] = useState(false);
  // Only show error after a field is touched.
  const usernameError = isFieldTouched("username") && getFieldError("username");
  const passwordError = isFieldTouched("password") && getFieldError("password");

  //onsubmit method(min,goal,healca,edu,infra)
  // const accounts = web3.eth.getAccounts();
  // factory.methods.createCampaign().send({
  //   from: accounts[0]
  // });

  const handleSubmit = async event => {
    event.preventDefault();
    let newCampaign = campaign;
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0])
      await factory.methods
        .createCampaign(
          newCampaign.min,
          newCampaign.goal,
          newCampaign.healthCareMax,
          newCampaign.educationMax,
          newCampaign.infraMax
        ).send({
          from: accounts[0]
        });
      window.location.replace("/");
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = e => {
    let t = e;
    let campaignObj = campaign;
    campaignObj[e.target.name] = e.target.value;
    setCampaign(campaignObj);
  };
  return (
    <div>
      <Spin spinning={loading} />
      <Button type="primary">
        <Link to="/">Back</Link>
      </Button>
      <Typography>
        <Title style={{ color: "white" }}>Enter Campaign Info</Title>
      </Typography>
      <Form >
        <h style={{color : 'white'}}>Goal</h><Input onChange={onChange} name="goal" />
        <h style={{color : 'white'}}>Healthcare budget</h><Input onChange={onChange} name="healthCareMax" />
        <h style={{color : 'white'}}>Education budget</h><Input onChange={onChange} name="educationMax" />
        <h style={{color : 'white'}}>infrastructure budget</h><Input onChange={onChange} name="infraMax" />
        <h style={{color : 'white'}}>Minimum Contribution required</h><Input onChange={onChange} name="min" />

        {/* <Form.Item
          validateStatus={usernameError ? "error" : ""}
          help={usernameError || ""}
        >
          {getFieldDecorator("minimum", {
            rules: [
              {
                required: true,
                message: "Please the minimum amount of donation"
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="dollar" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Minimum"
            />
          )}
        </Form.Item>
        <Form.Item
          validateStatus={passwordError ? "error" : ""}
          help={passwordError || ""}
        >
          {getFieldDecorator("goal", {
            rules: [
              {
                required: true,
                message: "Please input total amount of budget for this campaign"
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="dollar" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              type="currency"
              placeholder="Goal"
            />
          )}
        </Form.Item>
        <Form.Item
          validateStatus={passwordError ? "error" : ""}
          help={passwordError || ""}
        >
          {getFieldDecorator("healthcaremax", {
            rules: [
              {
                required: true,
                message: "Please input your budget for healthcare sector!"
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="dollar" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              type="currency"
              placeholder="Healthcare Max"
            />
          )}
        </Form.Item>
        <Form.Item
          validateStatus={passwordError ? "error" : ""}
          help={passwordError || ""}
        >
          {getFieldDecorator("educationmax", {
            rules: [
              {
                required: true,
                message: "Please input your budget for educationmax!"
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="dollar" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              type="currency"
              placeholder="Education Max"
            />
          )}
        </Form.Item>
        <Form.Item
          validateStatus={passwordError ? "error" : ""}
          help={passwordError || ""}
        >
          {getFieldDecorator("inframax", {
            rules: [
              {
                required: true,
                message: "Please input your budget for infrastructure!"
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="dollar" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              type="currency"
              placeholder="Infastructure Max"
            />
          )}
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export const Campaigns = Form.create({ name: "horizontal_login" })(
  CampaignForm
);
