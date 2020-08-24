import React, { Component } from "react";
import styled from "styled-components";

import Navigation from "./../../components/Navigation/Navigation";
import { Button, Form, Container, Alert, Tabs, Tab, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { firebase } from "../../firebase";
import AddExperience from '../../components/AddExperience/AddExperience';
import AddEducation from '../../components/AddEducation/AddEducation';
import { meApi } from '../../services/ProfileApi';
import { skillsApi } from '../../services/ProfileApi';

const Label = styled.label`
  width:100%
`;

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

class MyProfile extends Component {
  state = {
    dob: null,
    username: '',
    email: '',
    bio: '',
    skills: [],
    selectedOption: null,
    saveSuccessFlag: false
  };

  public componentDidMount() {
    firebase.auth.onAuthStateChanged(async (authUser: any) => {
      let token = await authUser.getIdToken();
      localStorage.setItem('token', token);
      this.setState({
        username: authUser.displayName,
        email: authUser.email,
      });
    });
  }

  saveProfile = () => {
    const user = {
      username: this.state.username,
      email: this.state.email,
      dob: this.state.dob,
      bio: this.state.bio,
    }
    meApi(user).then(response => {
      console.log(response);
    })
      .catch(error => {
        console.log(error);
      });
    this.showAlert();
  }

  showAlert = () => {
    this.setState({ saveSuccessFlag: true });
    let that = this;
    setTimeout(function () {
      that.setState({ saveSuccessFlag: false });
    }, 2000);
  }

  handleSkillsChange = (selectedOption: any) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  saveSkills = () => {
    skillsApi(this.state.skills).then(response => {
      console.log(response);
    })
      .catch(error => {
        console.log(error);
      });
    this.showAlert();
  }

  render() {
    console.log(this.state);

    return (
      <div>
        <Navigation />
        <br></br>
        <Container>
          <Alert variant="success" show={this.state.saveSuccessFlag}>
            Succefully Saved!
          </Alert>
          <Tabs defaultActiveKey="me" style={{ marginBottom: 10 }}>
            <Tab eventKey="me" title="Me">
              <Row>
                <Col md={6}>
                  <Form.Group controlId="Username">
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" placeholder="Enter user name" value={this.state.username} disabled />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="Email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={this.state.email} disabled />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="Dob">
                    <Label>Date of Birth</Label>
                    <DatePicker
                      className="form-control"
                      selected={this.state.dob}
                      onChange={(date) => this.setState({ dob: date })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}></Col>
                <Col md={6}>
                  <Form.Group controlId="Bio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Write your job" value={this.state.bio} onChange={e => this.setState({ bio: e.target.value })} />
                  </Form.Group>
                  <p>Take your time to write a short and good job</p>
                </Col>
              </Row>
              <Button variant="primary" onClick={() => this.saveProfile()}>Save</Button>
            </Tab>
            <Tab eventKey="expreience" title="Experience">
              <AddExperience />
            </Tab>
            <Tab eventKey="education" title="Education">
              <AddEducation />
            </Tab>
            <Tab eventKey="skill" title="Skills">
              <Row>
                <Col md={6}>
                  <Form.Group controlId="Skills">
                    <Form.Label>Skills</Form.Label>
                    <Select
                      value={this.state.selectedOption}
                      isMulti
                      name="colors"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      closeMenuOnSelect={false}
                      options={options}
                      onChange={this.handleSkillsChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" onClick={() => this.saveSkills()}>Save</Button>
            </Tab>
          </Tabs>
        </Container>
      </div>
    );
  }
};
export default MyProfile;