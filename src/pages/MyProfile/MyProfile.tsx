import React, { Component } from "react";
import styled from "styled-components";
import { Button, Form, Container, Tabs, Tab, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { firebase } from "../../firebase";
import AddExperience from '../../components/AddExperience/AddExperience';
import AddEducation from '../../components/AddEducation/AddEducation';
import { meApi } from '../../services/ProfileApi';
import { skillsApi } from '../../services/ProfileApi';
import { wholeSaveApi } from '../../services/ProfileApi';
import { RouteComponentProps } from "react-router-dom";

const Label = styled.label`
  width:100%
`;

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

interface InterfaceProps {
  history?: any;
}

class MyProfile extends Component<InterfaceProps & RouteComponentProps> {
  state = {
    dob: null,
    username: '',
    email: '',
    bio: '',
    skills: null,
  };

  public componentDidMount() {
    firebase.auth.onAuthStateChanged(async (authUser: any) => {
      if (authUser !== null && authUser !== undefined) {
        let token = await authUser.getIdToken();
        localStorage.setItem('token', token);
        this.setState({
          username: authUser.displayName,
          email: authUser.email
        });
      } else {
        this.props.history.push("/")
      }
    });
    let me = JSON.parse(localStorage.getItem('me') || '{}');
    if(Object.keys(me).length !== 0) {
      this.setState({
        dob: new Date(me.dob),
        bio: me.bio,
      })
    }
    let skills = JSON.parse(localStorage.getItem('skills') || '{}');
    skills = Array.isArray(skills) ? skills : [];
    this.setState({ skills });
  }

  public saveProfile = () => {
    const user = {
      username: this.state.username,
      email: this.state.email,
      dob: this.state.dob,
      bio: this.state.bio,
    }
    meApi(user);
    this.setState({
      username: this.state.username,
      email: this.state.email,
      dob: this.state.dob,
      bio: this.state.bio,
    })
  }

  public handleSkillsChange = (skills: any) => {
    this.setState({ skills });
  }

  saveSkills = () => {
    skillsApi(this.state.skills)
  }

  public wholeSave = () => {
    wholeSaveApi().then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <br></br>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="success" onClick={() => this.wholeSave()}>Save All</Button>
          </div>
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
                      value={this.state.skills}
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