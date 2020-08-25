import React, { Component } from 'react';
import styled from "styled-components";
import { Button, Form, Modal, Container, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PlusCircle } from 'react-bootstrap-icons';
import { Pencil } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';
import { addEducationApi } from '../../services/ProfileApi';
import { deleteEducationApi } from '../../services/ProfileApi';
import { editEducationApi } from '../../services/ProfileApi';
import { updateEducationApi } from '../../services/ProfileApi';

const Label = styled.label`
  width:100%
`;

class AddEducation extends Component {
    state = {
        educations: [],
        educationId: '',
        educationFrom: null,
        educationTo: null,
        educationType: '',
        educationInstitution: '',
        educationDescription: '',
        educationModalShow: false,
        educationDeleteModalShow: false,
    }

    public componentDidMount() {
        const name = `educations`;
        let educations = JSON.parse(localStorage.getItem(name) || '{}');
        educations = Array.isArray(educations) ? educations : [];
        this.setState({ educations });
    }

    public initailState = () => {
        this.setState({
            educationId: '',
            educationFrom: null,
            educationTo: null,
            educationType: '',
            educationInstitution: '',
            educationDescription: '',
            educationModalShow: false,
            educationDeleteModalShow: false,
        })
    }

    private educationSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const { educationId, educationFrom, educationTo, educationType, educationInstitution, educationDescription } = this.state;
        if (!educationId) {
            const educationData = {
                id: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase(),
                from: educationFrom,
                to: educationTo,
                type: educationType,
                institution: educationInstitution,
                description: educationDescription,
            }
            this.setState({
                educationModalShow: false
            });

            let response = addEducationApi(educationData);
            this.setState({ educations: response });
            this.initailState();

        } else {
            const educationData = {
                id: educationId,
                from: educationFrom,
                to: educationTo,
                type: educationType,
                institution: educationInstitution,
                description: educationDescription,
            }
            this.setState({
                educationModalShow: false
            });

            let response = updateEducationApi(educationData);
            this.setState({ educations: response });
            this.initailState();

        }
    }

    private static propKey(propertyName: string, value: any): object {
        return { [propertyName]: value };
    }

    private setStateWithEvent(event: any, columnType: string) {
        this.setState(AddEducation.propKey(columnType, (event.target as any).value));
    }

    toJSONLocal = (date: Date) => {
        var local = new Date(date);
        return local.toJSON().slice(0, 10);
    }

    deleteEducation = (id: String) => {
        let response = deleteEducationApi(id);
        this.setState({ educations: response });
        this.initailState();
        this.setState({ educationDeleteModalShow: false })
    }

    editEducation = (id: String) => {
        let response = editEducationApi(id);
        if (response) {
            this.setState({
                educationId: response.id,
                educationFrom: new Date(response.from),
                educationTo: new Date(response.to),
                educationType: response.type,
                educationInstitution: response.institution,
                educationDescription: response.description,
                educationModalShow: true,
            });
        }
    }

    render() {
        return (
            <>
                <Modal show={this.state.educationModalShow} aria-labelledby="contained-modal-title-vcenter" onHide={() => this.setState({ educationModalShow: false })} style={{ marginTop: 100 }}>
                    <Form onSubmit={this.educationSubmit}>
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
                                            <Form.Control as="select" onChange={(event) => this.setState({ educationType: event.target.value })}>
                                                <option value="Course">Course</option>
                                                <option value="Certification">Certification</option>
                                                <option value="Graduation">Graduation</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="education-Institution">
                                            <Form.Label>Institution</Form.Label>
                                            <Form.Control type="text" placeholder="Enter institution" value={this.state.educationInstitution} onChange={(event) => this.setStateWithEvent(event, 'educationInstitution')} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group controlId="education-Description">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={3} placeholder="Description" value={this.state.educationDescription} onChange={(event) => this.setStateWithEvent(event, 'educationDescription')} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12} hidden>
                                        <Form.Group controlId="education-id">
                                            <Form.Control type="text" value={this.state.educationId} onChange={(event) => console.log(event)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">Save</Button>
                            <Button variant="secondary" onClick={() => this.setState({ educationModalShow: false })}>Close</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <PlusCircle onClick={() => this.setState({ educationModalShow: true })} size={30} color="#007bff" style={{ cursor: 'pointer' }} />
                </div>
                {this.state.educations.map((item, index) => (
                    <div key={index}>
                        <Row style={{ marginBottom: 10, position: 'relative' }}>
                            <Pencil size={25} color="#007bff" style={{ position: 'absolute', top: 10, right: 15, cursor: 'pointer', zIndex: 1000 }} onClick={() => this.editEducation(item['id'])} />
                            <Trash size={25} color="#007bff" style={{ position: 'absolute', top: 50, right: 15, cursor: 'pointer', zIndex: 1000 }} onClick={() => this.setState({ educationDeleteModalShow: true })} />
                            <Col md={1} style={{ color: 'red', fontWeight: 500 }}>Quest</Col>
                            <Col md={11}>
                                <div style={{ fontWeight: 500 }}>{item['type']}</div>
                                <div style={{ fontWeight: 500 }}>{item['institution']}</div>
                                <div style={{ fontWeight: 500 }}>{this.toJSONLocal(item['from'])} ~ {this.toJSONLocal(item['to'])}</div>
                                <div style={{ fontWeight: 500 }}>Ireland</div>
                                <div style={{ color: 'grey' }}>{item['description']}</div>
                            </Col>
                        </Row>
                        <Modal show={this.state.educationDeleteModalShow} onHide={() => this.setState({ educationDeleteModalShow: false })} style={{ marginTop: 100 }}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Education</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure to delete this education?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.setState({ educationDeleteModalShow: false })}>
                                    Close
                                  </Button>
                                <Button variant="primary" onClick={() => this.deleteEducation(item['id'])}>
                                    Delete
                                  </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                ))
                }
            </>
        )
    }
}

export default AddEducation;