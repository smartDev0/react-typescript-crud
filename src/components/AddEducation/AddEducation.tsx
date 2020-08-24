import React, { Component } from 'react';
import styled from "styled-components";

import { Button, Form, Modal, Container, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PlusCircle } from 'react-bootstrap-icons';
import { Pencil } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';
import { educationApi } from '../../services/ProfileApi';


const Label = styled.label`
  width:100%
`;

class AddEducation extends Component {
    state = {
        education: [{}, {}],
        educationFrom: null,
        educationTo: null,
        educationType: '',
        educationInstitution: '',
        educationDescription: '',
        experienceModalShow: false,
        experienceDeleteModalShow: false,
        educationModalShow: false,
        educationDeleteModalShow: false,
    };

    private educationSubmit = (): void => {
        const { educationFrom, educationTo, educationType, educationInstitution, educationDescription } = this.state;
        const educationData = {
            from: educationFrom,
            to: educationTo,
            type: educationType,
            institution: educationInstitution,
            description: educationDescription,
        }
        this.setState({
            educationModalShow: false
        });

        educationApi(educationData)
            .then(response => {
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

    render() {
        return (
            <>
                <Modal show={this.state.educationModalShow} aria-labelledby="contained-modal-title-vcenter" onHide={() => this.setState({ educationModalShow: false })} style={{ marginTop: 100 }}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Your Education
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                        <Container>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="educationFrom">
                                        <Label>From</Label>
                                        <DatePicker
                                            className="form-control"
                                            selected={this.state.educationFrom}
                                            onChange={(date) => this.setState({ educationFrom: date })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="educationTo">
                                        <Label>To</Label>
                                        <DatePicker
                                            className="form-control"
                                            selected={this.state.educationTo}
                                            onChange={(date) => this.setState({ educationTo: date })}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group controlId="educationType">
                                        <Form.Label>Type</Form.Label>
                                        <Form.Control as="select" onChange={(val) => this.setState({ educationType: val })}>
                                            <option value="1">Course</option>
                                            <option value="2">Certification</option>
                                            <option value="3">Graduation</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="educationInstitution">
                                        <Form.Label>Institution</Form.Label>
                                        <Form.Control type="text" placeholder="Enter institution" value={this.state.educationInstitution} onChange={(text) => this.setState({ educationInstitution: text })} />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId="educationDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Description" value={this.state.educationDescription} onChange={(text) => this.setState({ educationDescription: text })} />
                                    </Form.Group>
                                </Col>
                            </Row>
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
                    <Row key={index} style={{ marginBottom: 10, position: 'relative' }}>
                        <Pencil size={25} color="#007bff" style={{ position: 'absolute', top: 10, right: 15, cursor: 'pointer', zIndex: 1000 }} onClick={() => this.setState({ educationModalShow: true })} />
                        <Trash size={25} color="#007bff" style={{ position: 'absolute', top: 50, right: 15, cursor: 'pointer', zIndex: 1000 }} onClick={() => this.setState({ educationDeleteModalShow: true })} />
                        <Col md={1} style={{ color: 'red', fontWeight: 500 }}>Quest</Col>
                        <Col md={11}>
                            <div style={{ fontWeight: 500 }}>Course/Certification/Graduation</div>
                            <div style={{ fontWeight: 500 }}>University of Some Place</div>
                            <div style={{ fontWeight: 500 }}>Jul 2019 - Present: 1 year 2 mons</div>
                            <div style={{ fontWeight: 500 }}>Ireland</div>
                            <div style={{ color: 'grey' }}>Develop and maintain high availability and disaster recovery for a critical solution in the company. This solution contaions a REST API developed using C# deployed on Microsoft Azure, Azure Redis Cache and some Aure Functions projects that works with an Auzure Service Bus to control our events flow and integration with third party application. Help the company to engage with the best agile practices using Scrum</div>
                        </Col>
                    </Row>
                ))
                }
            </>
        )
    }
}

export default AddEducation;