import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormControl } from 'react-bootstrap';

export class EditTeacherModal extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'teachers', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                ID: event.target.ID.value,
                Name:event.target.Name.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
            (error) => {
                alert('Failed');
        })
    }

    render() {
        return (
            <div className='container'>
                <Modal {...this.props}
                    size='lg'
                    aria-labelledby='contained-modal-title-vcenter'
                    center>
                        <Modal.Header closeButton>
                            <Modal.Title id='contained-modal-title-vcenter'>
                                Edit Teacher
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId='ID'>
                                        <Form.Label>Teacher ID</Form.Label>
                                        <Form.Control type='text' name='ID' required
                                            disabled
                                            defaultValue={ this.props.teacherID}/>
                                    </Form.Group>
                                    <Form.Group controlId='Name'>
                                        <Form.Label>Teacher Name</Form.Label>
                                        <Form.Control type='text' name='Name' required
                                            defaultValue={ this.props.teacherName}
                                            placeholder='Kowalski'/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant='primary' type='submit'>Edit Teacher</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button variant='danger' onClick={ this.props.onHide}>Close</Button>
                    </Modal.Footer>
                    </Modal>
            </div>
        )
    }
}