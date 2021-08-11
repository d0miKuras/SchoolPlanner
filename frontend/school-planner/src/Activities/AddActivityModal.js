import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Row, Col, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';

const AddActivityModal = (props) => {
    // const [rooms, setRooms] = useState([]);
    // const [groups, setGroups] = useState([]);
    // const [teachers, setTeachers] = useState([]);
    // const [subjects, setSubjects] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API + 'data')
            .then(res => {
                setData(res.data);
            })
    }, []);

    const [activity, setActivity] = useState({ Teacher: { ID: 0 }, Room: { ID: 0 }, Subject: { ID: 0}, Group: {ID: 0}, Day: 0, Slot: 0});
    
    const [selectedTeacher, setSelectedTeacher] = useState({ ID: 0 });
    const [selectedSubject, setSelectedSubject] = useState({ ID: 0 });
    const [selectedGroup, setSelectedGroup] = useState({ ID: 0 });

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'activities', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                Room: props.selectedRoom,
                Group: selectedGroup,
                Teacher: selectedTeacher,
                Subject: selectedSubject,
                Slot: props.slot,
                Day: props.day
            })
        })
        .then(res => res.json())
                .then((result) => {
                    alert(result);
                    props.onHide();
                }, (error) => {
                    alert('Failed');
        })
        
    }

    return (
        <div>
            <RenderForm onHide={props.onHide} show={props.show} selectedRoom={props.selectedRoom}
                rooms={data.Rooms} groups={data.Groups} teachers={data.Teachers} subjects={data.Subjects} selectedTeacher={selectedTeacher}
                setData={setData} setActivity={setActivity} setSelectedTeacher={setSelectedTeacher} setSelectedSubject={setSelectedSubject} setSelectedGroup={setSelectedGroup}
                handleSubmit={handleSubmit}/>
        </div>
    )

}
const RoomList = (props) => {
    return (
        <div>
            <DropdownButton variant='light' title={props.selectedRoom.Name}
                onSelect={(event, eventKey) => { props.setActivity({ Room: event }) }} disabled>
            {props.rooms.map((room)=>
            {
                return <Dropdown.Item eventKey={room.ID}>{room.Name}</Dropdown.Item>
            })}
            </DropdownButton>
        </div>
    )
}
const GroupList = (props) => {
    return (
        <div>
            <Form.Control as='select' custom onChange={(event) => { props.setSelectedGroup({ ID: event.target.value } )}} required>
                {props.groups.map((group) => {
                    return <option value={group.ID}>{group.Name}</option>
                })}
            </Form.Control>
        </div>
    )
}

const TeacherList = (props) => {
    return (
        <div>
            <Form.Control as='select' custom onChange={(event) => { props.setSelectedTeacher({ID: event.target.value})}} required>
                {props.teachers.map((teacher) => {
                    return <option value={teacher.ID}>{teacher.Name}</option>
                })}
            </Form.Control>
        </div>
    )
}
const SubjectList = (props) => {
    return (
        <div>
            <Form.Control as='select' custom onChange={(event) => { props.setSelectedSubject({ ID: event.target.value})}} required>
                {props.subjects.map((subject) => {
                    return <option value={subject.ID}>{subject.Name}</option>
                })}
            </Form.Control>
        </div>
    )
}

const RenderForm = (props) => {
    return (
        <div className='container'>
            <Modal {...props}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                center>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>Add Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={props.handleSubmit}>
                        <Form.Group as={Row} className='mb-3' controlId='Room'>
                            <Form.Label column sm={2}>Room:</Form.Label>
                            <Col md='auto'>
                                <RoomList rooms={props.rooms} selectedRoom={props.selectedRoom}
                                    setActivity={props.setActivity} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className='mb-3' controlId='Group'>
                            <Form.Label column sm={2}>Group:</Form.Label>
                            <Col md='auto'>
                                <GroupList groups={props.groups} setSelectedGroup={props.setSelectedGroup} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className='mb-3' controlId='Teacher'>
                            <Form.Label column sm={2}>Teacher:</Form.Label>
                            <Col md='auto'>
                                <TeacherList teachers={props.teachers} setSelectedTeacher={props.setSelectedTeacher} />
                            </Col>
                            </Form.Group>
                        <Form.Group as={Row} className='mb-3' controlId='Subjects'>
                            <Form.Label column sm={2}>Subject:</Form.Label>
                            <Col md='auto'>
                                <SubjectList subjects={props.subjects} setSelectedSubject={props.setSelectedSubject} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className='mb-3'>
                            <Col sm='1'>
                                <Button variant='outline-primary' type='submit'>Add</Button>
                            </Col>
                            <Col sm='1'>
                                <Button variant='outline-secondary' onClick={props.onHide}>Close</Button>
                            </Col>
                        </Form.Group>

                            
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddActivityModal;