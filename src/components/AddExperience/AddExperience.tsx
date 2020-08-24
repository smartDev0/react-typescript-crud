import React, { Component } from 'react';
import styled from "styled-components";

import { Button, Form, Modal, Container, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { firebase } from "../../firebase";
import { PlusCircle } from 'react-bootstrap-icons';
import { Pencil } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';
import { educationApi } from '../../services/ProfileApi';

const Label = styled.label`
  width:100%
`;

class AddExperience extends Component {
    state = {
        experienceFrom: null,
        experienceTo: null,
        experienceCompany: '',
        experiencePosition: '',
        experienceDescription: '',
        experience: [{}, {}, {}],
        selectedOption: null,
        experienceModalShow: false,
        experienceDeleteModalShow: false,
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

        educationApi(experienceData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        this.showAlert();
    }

    private static propKey(propertyName: string, value: any): object {
        return { [propertyName]: value };
    }

    private setStateWithEvent(event: any, columnType: string) {
        this.setState(AddExperience.propKey(columnType, (event.target as any).value));
    }

    showAlert = () => {
        this.setState({ saveSuccessFlag: true });
        let that = this;
        setTimeout(function () {
            that.setState({ saveSuccessFlag: false });
        }, 2000);
    }


    render() {
        return (
            <>
                <Modal show={this.state.experienceModalShow} aria-labelledby="contained-modal-title-vcenter" onHide={() => this.setState({ experienceModalShow: false })} style={{ marginTop: 100 }}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Your Experience
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                        <Container>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="ExperienceFrom">
                                        <Label>From</Label>
                                        <DatePicker
                                            className="form-control"
                                            selected={this.state.experienceFrom}
                                            onChange={(date) => this.setState({ experienceFrom: date })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="ExperienceTo">
                                        <Label>To</Label>
                                        <DatePicker
                                            className="form-control"
                                            selected={this.state.experienceTo}
                                            onChange={(date) => this.setState({ experienceTo: date })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="Company">
                                        <Form.Label>Company</Form.Label>
                                        <Form.Control type="text" placeholder="Enter company" value={this.state.experienceCompany} onChange={event => this.setStateWithEvent(event, "experienceCompany")} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="Position">
                                        <Form.Label>Position</Form.Label>
                                        <Form.Control type="text" placeholder="Enter position" value={this.state.experiencePosition} onChange={event => this.setStateWithEvent(event, "experiencePosition")} />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId="experienceDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Write your job" value={this.state.experienceDescription} onChange={event => this.setStateWithEvent(event, "experienceDescription")} />
                                    </Form.Group>
                                </Col>
                            </Row>
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
            </>
        )
    }
}

export default AddExperience;