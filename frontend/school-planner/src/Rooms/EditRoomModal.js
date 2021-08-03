import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormControl } from 'react-bootstrap';

export class EditRoomModal extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'rooms', {
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
                                Edit Room
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId='ID'>
                                        <Form.Label>Room ID</Form.Label>
                                        <Form.Control type='text' name='ID' required
                                            disabled
                                            defaultValue={ this.props.roomID}/>
                                    </Form.Group>
                                    <Form.Group controlId='Name'>
                                        <Form.Label>Room Name</Form.Label>
                                        <Form.Control type='text' name='Name' required
                                            defaultValue={ this.props.roomName}
                                            placeholder='123'/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant='primary' type='submit'>Edit Room</Button>
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