import React, { Component } from 'react';
import styled from "styled-components";
import { Button, Form, Modal, Container, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PlusCircle } from 'react-bootstrap-icons';
import { Pencil } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';
import { addExperienceApi } from '../../services/ProfileApi';
import { deleteExperienceApi } from '../../services/ProfileApi';
import { editExperienceApi } from '../../services/ProfileApi';
import { updateExperienceApi } from '../../services/ProfileApi';

const Label = styled.label`
  width:100%
`;

class AddExperience extends Component {
    state = {
        experienceId: '',
        experienceFrom: null,
        experienceTo: null,
        experienceCompany: '',
        experiencePosition: '',
        experienceDescription: '',
        experiences: [],
        experienceModalShow: false,
        experienceDeleteModalShow: false,
    };

    public componentDidMount() {
        const name = `experiences`;
        let experiences = JSON.parse(localStorage.getItem(name) || '{}');
        experiences = Array.isArray(experiences) ? experiences : [];
        this.setState({ experiences });
    }

    public initailState = () => {
        this.setState({
            experienceId: '',
            experienceFrom: null,
            experienceTo: null,
            experienceCompany: '',
            experiencePosition: '',
            experienceDescription: '',
            experienceModalShow: false,
            experienceDeleteModalShow: false,
        })
    }


    private experienceSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const { experienceId, experienceFrom, experienceTo, experienceCompany, experiencePosition, experienceDescription } = this.state;
        if (!experienceId) {
            const experienceData = {
                id: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase(),
                from: experienceFrom,
                to: experienceTo,
                company: experienceCompany,
                position: experiencePosition,
                description: experienceDescription,
            }
            this.setState({
                experienceModalShow: false
            });

            let response = addExperienceApi(experienceData);
            this.setState({ experiences: response });
            this.initailState();
        } else {
            const experienceData = {
                id: experienceId,
                from: experienceFrom,
                to: experienceTo,
                company: experienceCompany,
                position: experiencePosition,
                description: experienceDescription,
            }
            this.setState({
                experienceModalShow: false
            });

            let response = updateExperienceApi(experienceData);
            this.setState({ experiences: response });
            this.initailState();
        }
    }

    private static propKey(propertyName: string, value: any): object {
        return { [propertyName]: value };
    }

    private setStateWithEvent(event: any, columnType: string) {
        this.setState(AddExperience.propKey(columnType, (event.target as any).value));
    }

    toJSONLocal = (date: Date) => {
        var local = new Date(date);
        return local.toJSON().slice(0, 10);
    }

    deleteExperience = (id: String) => {
        let response = deleteExperienceApi(id);
        this.setState({ experiences: response });
        this.initailState();
        this.setState({ experienceDeleteModalShow: false })
    }

    editExperience = (id: String) => {
        let response = editExperienceApi(id);
        if (response) {
            this.setState({
                experienceId: response.id,
                experienceFrom: new Date(response.from),
                experienceTo: new Date(response.to),
                experienceCompany: response.company,
                experiencePosition: response.position,
                experienceDescription: response.description,
                experienceModalShow: true,
            });
        }
    }

    render() {
        return (
            <>
                <Modal show={this.state.experienceModalShow} aria-labelledby="contained-modal-title-vcenter" onHide={() => this.setState({ experienceModalShow: false })} style={{ marginTop: 100 }}>
                    <Form onSubmit={this.experienceSubmit}>
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
                                    <Col md={12} hidden>
                                        <Form.Group controlId="experience-id">
                                            <Form.Control type="text" value={this.state.experienceId} onChange={(event) => console.log(event)} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">Save</Button>
                            <Button variant="secondary" onClick={() => this.setState({ experienceModalShow: false })}>Close</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <PlusCircle onClick={() => this.setState({ experienceModalShow: true })} size={30} color="#007bff" style={{ cursor: 'pointer' }} />
                </div>
                {this.state.experiences.map((item, index) => (
                    <div key={index} style={{ marginBottom: 10, position: 'relative' }} >
                        <Row>
                            <Pencil size={25} color="#007bff" style={{ position: 'absolute', top: 10, right: 15, cursor: 'pointer', zIndex: 1000 }} onClick={() => this.editExperience(item['id'])} />
                            <Trash size={25} color="#007bff" style={{ position: 'absolute', top: 50, right: 15, cursor: 'pointer', zIndex: 1000 }} onClick={() => this.setState({ experienceDeleteModalShow: true })} />
                            <Col md={1} style={{ color: 'red', fontWeight: 500 }}>Quest</Col>
                            <Col md={11}>
                                <div style={{ fontWeight: 500 }}>{item['position']}</div>
                                <div style={{ fontWeight: 500 }}>{item['company']}</div>
                                <div style={{ fontWeight: 500 }}>{this.toJSONLocal(item['from'])} ~ {this.toJSONLocal(item['to'])}</div>
                                <div style={{ fontWeight: 500 }}>Ireland</div>
                                <div style={{ color: 'grey' }}>{item['description']}</div>
                            </Col>
                        </Row>
                        <Modal show={this.state.experienceDeleteModalShow} onHide={() => this.setState({ experienceDeleteModalShow: false })} style={{ marginTop: 100 }}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Experience</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure to delete this experience?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.setState({ experienceDeleteModalShow: false })}>
                                    Close
                                                                        </Button>
                                <Button variant="primary" onClick={() => this.deleteExperience(item['id'])}>
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

export default AddExperience;