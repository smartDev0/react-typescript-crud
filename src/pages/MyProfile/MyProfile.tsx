import React, { Component } from "react";
import styled from "styled-components";

import Navigation from "./../../components/Navigation/Navigation";
import { Tabs, Tab } from "react-bootstrap";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { firebase } from "../../firebase";
import axios from 'axios';
import { Modal, Container, Alert } from "react-bootstrap";
import { PlusCircle } from 'react-bootstrap-icons';
import { Pencil } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';

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
    experienceFrom: null,
    experienceTo: null,
    experienceCompany: '',
    experiencePosition: '',
    experienceDescription: '',
    experience: [{}, {}, {}],
    education: [{}, {}],
    educationFrom: null,
    educationTo: null,
    educationType: '',
    educationInstitution: '',
    educationDescription: '',
    skills: [],
    token: null,
    selectedOption: null,
    experienceModalShow: false,
    experienceDeleteModalShow: false,
    educationModalShow: false,
    educationDeleteModalShow: false,
    saveSuccessFlag: false
  };

  public componentDidMount() {
    firebase.auth.onAuthStateChanged(async (authUser: any) => {
      let token = await authUser.getIdToken();
      this.setState({
        username: authUser.displayName,
        email: authUser.email,
        token: token
      });
    });
  }

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  private setStateWithEvent(event: any, columnType: string) {
    this.setState(MyProfile.propKey(columnType, (event.target as any).value));
  }

  saveProfile = () => {
    let httpHeaders = { headers: { 'Authorization': 'Bearer ' + this.state.token } };
    axios.post(`${process.env.REACT_APP_SERVER_API}/saveProfile`, httpHeaders)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({ saveSuccessFlag: true });
    let that = this;
    setTimeout(function () {
      that.setState({ saveSuccessFlag: false });
    }, 2000);
  }

  private experienceSubmit = (): void => {
    const { experienceFrom, experienceTo, experienceCompany, experiencePosition, experienceDescription } = this.state;
    const experienceData = {
      from: experienceFrom,
      to: experienceTo,
      company: experienceCompany,
      position: experiencePosition,
      description: experienceDescription,
    }
    this.setState({
      experienceModalShow: false
    });

    let httpHeaders = { headers: { 'Authorization': 'Bearer ' + this.state.token } };
    axios.post(`${process.env.REACT_APP_SERVER_API}/addExperience`, experienceData, httpHeaders)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({ saveSuccessFlag: true });
    let that = this;
    setTimeout(function () {
      that.setState({ saveSuccessFlag: false });
    }, 2000);
  }

  private educationSubmit = (): void => {
    const { educationFrom, educationTo, educationType, educationInstitution, experienceDescription } = this.state;
    const educationData = {
      from: educationFrom,
      to: educationTo,
      type: educationType,
      institution: educationInstitution,
      description: experienceDescription,
    }
    this.setState({
      educationModalShow: false
    });

    let httpHeaders = { headers: { 'Authorization': 'Bearer ' + this.state.token } };
    axios.post(`${process.env.REACT_APP_SERVER_API}/addEducatione`, educationData, httpHeaders)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

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
    let httpHeaders = { headers: { 'Authorization': 'Bearer ' + this.state.token } };
    axios.post(`${process.env.REACT_APP_SERVER_API}/saveSkills`, httpHeaders)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({ saveSuccessFlag: true });
    let that = this;
    setTimeout(function () {
      that.setState({ saveSuccessFlag: false });
    }, 2000);
  }

  render() {
    console.log(this.state);

    return (
      <div>
        <Navigation />
        <br></br>
        <div className="container">
          <Alert variant="success" show={this.state.saveSuccessFlag}>
            Succefully Saved!
          </Alert>
          <Tabs defaultActiveKey="me" style={{ marginBottom: 10 }}>
            <Tab eventKey="me" title="Me">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>User name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter user name"
                      name="username"
                      value={this.state.username}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={this.state.email}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <Label>Date of Birth</Label>
                    <DatePicker
                      className="form-control"
                      selected={this.state.dob}
                      onChange={(date) => this.setState({ dob: date })}
                    />
                  </div>
                </div>
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <div className="form-group">
                    <Label>Bio</Label>
                    <textarea
                      className="form-control"
                      placeholder="Write your job"
                      value={this.state.bio}
                      onChange={e => this.setState({ bio: e.target.value })}
                    ></textarea>
                    <p>Take your time to write a short and good job</p>
                  </div>
                </div>
              </div>
              <Button variant="primary" onClick={() => this.saveProfile()}>Save</Button>
            </Tab>
            <Tab eventKey="expreience" title="Experience">
              <Modal show={this.state.experienceModalShow} aria-labelledby="contained-modal-title-vcenter" onHide={() => this.setState({ experienceModalShow: false })} style={{ marginTop: 100 }}>
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Add Your Experience
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                  <Container>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <Label>From</Label>
                          <DatePicker
                            className="form-control"
                            selected={this.state.experienceFrom}
                            onChange={(date) => this.setState({ experienceFrom: date })}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <Label>To</Label>
                          <DatePicker
                            className="form-control"
                            selected={this.state.experienceTo}
                            onChange={(date) => this.setState({ experienceTo: date })}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Company</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter company"
                            name="company"
                            value={this.state.experienceCompany}
                            onChange={event => this.setStateWithEvent(event, "experienceCompany")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Position</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter position"
                            name="position"
                            value={this.state.experiencePosition}
                            onChange={event => this.setStateWithEvent(event, "experiencePosition")}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <Label>Description</Label>
                          <textarea
                            className="form-control"
                            placeholder="description"
                            value={this.state.experienceDescription}
                            onChange={event => this.setStateWithEvent(event, "experienceDescription")}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" type="submit" onClick={() => this.experienceSubmit()}>Save</Button>
                  <Button variant="secondary" onClick={() => this.setState({ experienceModalShow: false })}>Close</Button>
                </Modal.Footer>
              </Modal>
              <Modal show={this.state.experienceDeleteModalShow} onHide={() => this.setState({ experienceDeleteModalShow: false })} style={{ marginTop: 100 }}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this experience?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => this.setState({ experienceDeleteModalShow: false })}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => this.setState({ experienceDeleteModalShow: false })}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <PlusCircle onClick={() => this.setState({ experienceModalShow: true })} size={30} color="#007bff" style={{ cursor: 'pointer' }} />
              </div>
              {this.state.experience.map((item, index) => (
                <div className="row" key={index} style={{ marginBottom: 10, position: 'relative' }}>
                  <Pencil size={25} color="#007bff" style={{ position: 'absolute', top: 10, right: 15, cursor: 'pointer', zIndex: 1000 }} onClick={() => this.setState({ experienceModalShow: true })} />
                  <Trash size={25} color="#007bff" style={{ position: 'absolute', top: 50, right: 15, cursor: 'pointer', zIndex: 1000 }} onClick={() => this.setState({ experienceDeleteModalShow: true })} />
                  <div className="col-md-1" style={{ color: 'red', fontWeight: 500 }}>Quest</div>
                  <div className="col-md-11">
                    <div style={{ fontWeight: 500 }}>Staff Software Engingeer - Scrum Master</div>
                    <div style={{ fontWeight: 500 }}>Quest Software - Full-time</div>
                    <div style={{ fontWeight: 500 }}>Jul 2019 - Present: 1 year 2 mons</div>
                    <div style={{ fontWeight: 500 }}>Ireland</div>
                    <div style={{ color: 'grey' }}>Develop and maintain high availability and disaster recovery for a critical solution in the company. This solution contaions a REST API developed using C# deployed on Microsoft Azure, Azure Redis Cache and some Aure Functions projects that works with an Auzure Service Bus to control our events flow and integration with third party application. Help the company to engage with the best agile practices using Scrum</div>
                  </div>
                </div>
              ))
              }
            </Tab>
            <Tab eventKey="education" title="Education">
              <Modal show={this.state.educationModalShow} aria-labelledby="contained-modal-title-vcenter" onHide={() => this.setState({ educationModalShow: false })} style={{ marginTop: 100 }}>
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Add Your Education
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                  <Container>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <Label>From</Label>
                          <DatePicker
                            className="form-control"
                            selected={this.state.dob}
                            onChange={(date) => this.setState({ educationFrom: date })}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <Label>To</Label>
                          <DatePicker
                            className="form-control"
                            selected={this.state.dob}
                            onChange={(date) => this.setState({ educationTo: date })}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Type</label>
                          <select className="form-control" name="type"
                            onChange={(val) => this.setState({ educationType: val })}
                          >
                            <option value="1">Course</option>
                            <option value="2">Certification</option>
                            <option value="3">Graduation</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Institution</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter institution"
                            name="company"
                            onChange={(text) => this.setState({ educationInstitution: text })}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <Label>Description</Label>
                          <textarea
                            className="form-control"
                            placeholder="description"
                            onChange={(text) => this.setState({ educationDescription: text })}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" type="submit" onClick={() => this.educationSubmit()}>Save</Button>
                  <Button variant="secondary" onClick={() => this.setState({ educationModalShow: false })}>Close</Button>
                </Modal.Footer>
              </Modal>
              <Modal show={this.state.educationDeleteModalShow} onHide={() => this.setState({ educationDeleteModalShow: false })} style={{ marginTop: 100 }}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Education</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this education?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => this.setState({ educationDeleteModalShow: false })}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => this.setState({ educationDeleteModalShow: false })}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <PlusCircle onClick={() => this.setState({ educationModalShow: true })} size={30} color="#007bff" style={{ cursor: 'pointer' }} />
              </div>
              {this.state.education.map((item, index) => (
                <div className="row" key={index} style={{ marginBottom: 10, position: 'relative' }}>
                  <Pencil size={25} color="#007bff" style={{ position: 'absolute', top: 10, right: 15, cursor: 'pointer', zIndex: 1000 }} onClick={() => this.setState({ educationModalShow: true })} />
                  <Trash size={25} color="#007bff" style={{ position: 'absolute', top: 50, right: 15, cursor: 'pointer', zIndex: 1000 }} onClick={() => this.setState({ educationDeleteModalShow: true })} />
                  <div className="col-md-1" style={{ color: 'red', fontWeight: 500 }}>Quest</div>
                  <div className="col-md-11">
                    <div style={{ fontWeight: 500 }}>Course/Certification/Graduation</div>
                    <div style={{ fontWeight: 500 }}>University of Some Place</div>
                    <div style={{ fontWeight: 500 }}>Jul 2019 - Present: 1 year 2 mons</div>
                    <div style={{ fontWeight: 500 }}>Ireland</div>
                    <div style={{ color: 'grey' }}>Develop and maintain high availability and disaster recovery for a critical solution in the company. This solution contaions a REST API developed using C# deployed on Microsoft Azure, Azure Redis Cache and some Aure Functions projects that works with an Auzure Service Bus to control our events flow and integration with third party application. Help the company to engage with the best agile practices using Scrum</div>
                  </div>
                </div>
              ))
              }
            </Tab>
            <Tab eventKey="skill" title="Skills">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Skills</label>
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
                    </div>
                  </div>
                </div>
                <Button variant="primary" onClick={() => this.saveSkills()}>Save</Button>
              </form>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
};
export default MyProfile;