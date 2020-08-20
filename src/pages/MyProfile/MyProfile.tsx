import React, { Component } from "react";
import styled from "styled-components";
import * as routes from "./../../constants/routes";

import Navigation from "./../../components/Navigation/Navigation";
import { Tabs, Tab } from "react-bootstrap";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const Label = styled.label`
  width:100%
`;

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
                                            <p>
                                                Take your time to write a short and good job
                                        </p>
                                        </div>
                                    </div>
                                </div>

                                <Button variant="primary">Save</Button>
                            </form>
                        </Tab>
                        <Tab eventKey="expreience" title="Experience">
                            Expre
                        </Tab>
                        <Tab eventKey="education" title="Education">
                            tewt1
                        </Tab>
                        <Tab eventKey="skill" title="Skills">
                            tewt1
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
};
export default MyProfile;