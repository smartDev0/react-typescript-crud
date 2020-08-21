import React, { Component } from "react";
import styled from "styled-components";
import * as routes from "./../../constants/routes";

import Navigation from "./../../components/Navigation/Navigation";
import { Tabs, Tab } from "react-bootstrap";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { auth, firebase } from "../../firebase";

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
    experience: [],
    education: [],
    educationFrom: null,
    educationTo: null,
    educationType: '',
    educationInstitution: '',
    educationDescription: '',
    skills: [],
  };

  handleChangeDob = (date: any) => {
    this.setState({
      dob: date,
    });
  };
  handleChangeExperienceFrom = (date: any) => {
    this.setState({
      experienceFrom: date,
    });
  };
  handleChangeExperienceTo = (date: any) => {
    this.setState({
      experienceTo: date,
    });
  };
  public componentDidMount() {
    firebase.auth.onAuthStateChanged((authUser: any) => {
      this.setState({
        username: authUser.displayName,
        email: authUser.email,
      });
    });
  }
  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  private setStateWithEvent(event: any, columnType: string) {
    this.setState(MyProfile.propKey(columnType, (event.target as any).value));
  }
  private mySubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // const { email, username, bio, dob } = this.state;

  }

  private experienceSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { experience, experienceFrom, experienceTo, experienceCompany, experiencePosition, experienceDescription } = this.state;
    const experienceData = {
      from: experienceFrom,
      to: experienceTo,
      company: experienceCompany,
      position: experiencePosition,
      description: experienceDescription,
    }
    const data = [];
    data.push(experienceData)
    this.setState({
      experience: data
    });
  }

  render() {
    console.log(this.state)
    const {
      email, username, bio, dob,
      experienceCompany, experienceFrom, experienceTo,
      experiencePosition, experienceDescription,
      educationFrom, educationTo, educationType,
      educationInstitution, educationDescription
    } = this.state;
    return (
      <div>
        <Navigation />
        <br></br>
        <div className="container">
          <Tabs defaultActiveKey="me">
            <Tab eventKey="me" title="Me">
              <form onSubmit={this.mySubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>User name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter user name"
                        name="username"
                        value={username}
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
                        value={email}
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
                        onChange={this.handleChangeDob}
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
                        value={bio}
                        onChange={e => this.setState({ bio: e.target.value })}
                      ></textarea>
                      <p>Take your time to write a short and good job</p>
                    </div>
                  </div>
                </div>

                <Button variant="primary">Save</Button>
              </form>
            </Tab>
            <Tab eventKey="expreience" title="Experience">
              <form onSubmit={this.experienceSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <Label>From</Label>
                      <DatePicker
                        className="form-control"
                        selected={this.state.experienceFrom}
                        onChange={this.handleChangeExperienceFrom}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <Label>To</Label>
                      <DatePicker
                        className="form-control"
                        selected={this.state.experienceTo}
                        onChange={this.handleChangeExperienceTo}
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
                        value={experienceCompany}
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
                        value={experiencePosition}
                        onChange={event => this.setStateWithEvent(event, "experiencePosition")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <Label>Description</Label>
                      <textarea
                        className="form-control"
                        placeholder="description"
                        value={experienceDescription}
                        onChange={event => this.setStateWithEvent(event, "experienceDescription")}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <Button variant="primary" type="submit">Add</Button>
              </form>
            </Tab>
            <Tab eventKey="education" title="Education">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <Label>From</Label>
                      <DatePicker
                        className="form-control"
                        selected={this.state.dob}
                        onChange={this.handleChangeDob}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <Label>To</Label>
                      <DatePicker
                        className="form-control"
                        selected={this.state.dob}
                        onChange={this.handleChangeDob}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Type</label>
                      <select className="form-control" name="type">
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
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <Label>Description</Label>
                      <textarea
                        className="form-control"
                        placeholder="description"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <Button variant="primary">Save</Button>
              </form>
            </Tab>
            <Tab eventKey="skill" title="Skills">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Skills</label>
                      <Select
                        defaultValue={[options[2], options[3]]}
                        isMulti
                        name="colors"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        closeMenuOnSelect={false}
                        options={options}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
};
export default MyProfile;