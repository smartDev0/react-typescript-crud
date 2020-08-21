import React, { Component } from "react";
import styled from "styled-components";
import * as routes from "./../../constants/routes";

import Navigation from "./../../components/Navigation/Navigation";
import { Tabs, Tab } from "react-bootstrap";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";


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
        startDate: new Date(),
    };
    handleChange = (date: any) => {
        this.setState({
            startDate: date,
        });
    };
    render() {
        return (
          <div>
            <Navigation />
            <br></br>
            <div className="container">
              <Tabs defaultActiveKey="me">
                <Tab eventKey="me" title="Me">
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>User name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter user name"
                            name="username"
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
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <Label>Date of Birth</Label>
                          <DatePicker
                            className="form-control"
                            selected={this.state.startDate}
                            onChange={this.handleChange}
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
                          ></textarea>
                          <p>Take your time to write a short and good job</p>
                        </div>
                      </div>
                    </div>

                    <Button variant="primary">Save</Button>
                  </form>
                </Tab>
                <Tab eventKey="expreience" title="Experience">
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <Label>From</Label>
                          <DatePicker
                            className="form-control"
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <Label>To</Label>
                          <DatePicker
                            className="form-control"
                            selected={this.state.startDate}
                            onChange={this.handleChange}
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
                <Tab eventKey="education" title="Education">
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <Label>From</Label>
                          <DatePicker
                            className="form-control"
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <Label>To</Label>
                          <DatePicker
                            className="form-control"
                            selected={this.state.startDate}
                            onChange={this.handleChange}
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