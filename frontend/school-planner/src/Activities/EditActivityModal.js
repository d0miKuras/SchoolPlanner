import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Row, Col, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';

const EditActivityModal = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API + 'data')
            .then(res => {
                setData(res.data);
            })
    }, []);
    // const [selectedRoom, setSelectedRoom] = useState(props.room);
    // const [selectedTeacher, setSelectedTeacher] = useState(props.teacher);
    // const [selectedSubject, setSelectedSubject] = useState(props.act.Subject);
    // const [selectedGroup, setSelectedGroup] = useState(props.group);

    const handleSubmit = (event) => {
        // console.log({ Room: props.selectedRoom, Group: props.selectedGroup, Teacher: props.selectedTeacher, Subject: props.selectedSubject, Day: props.Day, Slot: props.slot });
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'activities', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                Room: props.selectedRoom,
                Group: props.selectedGroup,
                Teacher: props.selectedTeacher,
                Subject: props.selectedSubject,
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
            <RenderForm onHide={props.onHide} show={props.show} handleSubmit={handleSubmit} data={data}
                selectedRoom={props.selectedRoom} selectedGroup={props.selectedGroup}
                setSelectedRoom={props.setSelectedRoom} setSelectedGroup={props.setSelectedGroup}
                selectedTeacher={props.selectedTeacher} setSelectedTeacher={props.setSelectedTeacher}
                selectedSubject={props.selectedSubject} setSelectedSubject={props.setSelectedSubject}
                rooms={data.Rooms} groups={data.Groups} teachers={data.Teachers} subjects={data.Subjects}
                activity={props.activity}
            />
        </div>
    )

}

const RenderForm = (props) => {
    return (
        <Modal {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        center>
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>Edit Activity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={props.handleSubmit}>
                    <Form.Group as={Row} className='mb-3' controlId='Room'>
                            <Form.Label column sm={2}>Room:</Form.Label>
                            <Col md='auto'>
                            <RoomList rooms={props.rooms} selectedRoom={props.selectedRoom} setSelectedRoom={props.setSelectedRoom}/>
                            </Col>
                    </Form.Group>
                            <Form.Group as={Row} className='mb-3' controlId='Group'>
                            <Form.Label column sm={2}>Group:</Form.Label>
                            <Col md='auto'>
                                <GroupList groups={props.groups} selectedGroup={props.selectedGroup} setSelectedGroup={props.setSelectedGroup}/>
                            </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3' controlId='Teacher'>
                            <Form.Label column sm={2}>Teacher:</Form.Label>
                            <Col md='auto'>
                                <TeacherList teachers={props.teachers} selectedTeacher={props.selectedTeacher} setSelectedTeacher={props.setSelectedTeacher}/>
                            </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3' controlId='Subject'>
                            <Form.Label column sm={2}>Subject:</Form.Label>
                            <Col md='auto'>
                                <SubjectList subjects={props.subjects} selectedSubject={props.selectedSubject} setSelectedSubject={props.setSelectedSubject}/>
                            </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                            <Col sm='1'>
                                <Button variant='outline-primary' type='submit'>Save</Button>
                            </Col>
                            <Col sm='1'>
                                <Button variant='outline-secondary' onClick={props.onHide}>Close</Button>
                            </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    )
    
}
const RoomList = (props) => {
    return (
        <Form.Control as='select' custom onChange={(event) => { props.setSelectedRoom({ ID: event.target.value }) }} disabled>
            {props.rooms.map((room) => {
                if (room.ID === props.selectedRoom.ID) return <option value={room.ID} selected>{room.Name}</option>
                else return <option value={room.ID}>{room.Name}</option>
            })}
        </Form.Control>
    )
}

const GroupList = (props) => {
    return (
        <Form.Control as='select' custom onChange={(event) => { props.setSelectedGroup({ ID: event.target.value }) }} required>
            {props.groups.map((group) => {
                if (group.ID === props.selectedGroup.ID) return <option value={group.ID} selected>{group.Name}</option>
                else return <option value={group.ID}>{group.Name}</option>
            })}
        </Form.Control>
    )
}

const TeacherList = (props) => {
    return (
        <Form.Control as='select' custom onChange={(event) => { props.setSelectedTeacher({ ID: event.target.value }) }} required>
            {props.teachers.map((teacher) => {
                if (teacher.ID === props.selectedTeacher.ID) return <option value={teacher.ID} selected>{teacher.Name}</option>
                else return <option value={teacher.ID}>{teacher.Name}</option>
            })}
        </Form.Control>
    )
}
const SubjectList = (props) => {
    return (
        <Form.Control as='select' custom onChange={(event) => { props.setSelectedSubject({ ID: event.target.value }) }} required>
            {props.subjects.map((subject) => {
                if (subject.ID === props.selectedSubject.ID) return <option value={subject.ID} selected>{subject.Name}</option>
                else return <option value={subject.ID}>{subject.Name}</option>
            })}
        </Form.Control>
    )
}


export default EditActivityModal;