import React, { useEffect, useState } from 'react';
import { Button, Dropdown, SplitButton, Table } from 'react-bootstrap';
import axios from 'axios';
import AddActivityModal from './AddActivityModal';
import EditActivityModal from './EditActivityModal';

const Calendar = (props) =>{
    const [activities, setActivities] = useState([]);
    const [addActModal, setActModal] = useState(false);
    const [editActModal, setEditActModal] = useState(false);
    const [actDay, setActDay] = useState(-1);
    const [actSlot, setActSlot] = useState(-1);
    // const [selectedRoom, setSelectedRoom] = useState({ID:0});
    const [selectedTeacher, setSelectedTeacher] = useState({ID:0});
    const [selectedSubject, setSelectedSubject] = useState({ID:0});
    const [selectedGroup, setSelectedGroup] = useState({ID: 0});
    // const [activity, setActivity] = useState({ Room: { ID: 0 }, Teacher: { ID: 0 }, Subject: { ID: 0 }, Group: {ID:0}, Day: 0, Slot: 0});
    useEffect(() => {
        axios.get(process.env.REACT_APP_API + 'activities/' + props.selectedRoomID)
            .then(res => {
                setActivities(res.data);
            });
    }, [activities, actDay, actSlot])

    const handleShowAdd = () =>{
        setActModal(true);
    }

    const handleShowEdit = () => {
        setEditActModal(true);
    }

    const handleCloseAdd = () => {
        setActModal(false);
    }

    const handleCloseEdit = () => {
        setEditActModal(false);
    }

    const handleClickAdd = (event) =>{
        setActDay(event.target.value);
        setActSlot(event.target.name);
        handleShowAdd();
    }

    const handleClickEdit = (event) => {
        const act = findActivity(props.selectedRoomID, event.target.attributes.value.value, event.target.name, activities);
        setActDay(act.Day);
        setActSlot(act.Slot);
        // setSelectedRoom(act.Room);
        setSelectedGroup(act.Group);
        setSelectedTeacher(act.Teacher);
        setSelectedSubject(act.Subject);
        handleShowEdit();
    }

    const handleClickDelete = (event) => {
        const act = findActivity(props.selectedRoomID, event.target.attributes.value.value, event.target.name, activities);
        setActDay(act.Day);
        setActSlot(act.Slot);
        const selectedRoom = { Name: props.selectedRoomName, ID: props.selectedRoomID };
        setSelectedGroup(act.Group);
        setSelectedTeacher(act.Teacher);
        setSelectedSubject(act.Subject);
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'activities', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    Room: selectedRoom,
                    Group: selectedGroup,
                    Teacher: selectedTeacher,
                    Subject: selectedSubject,
                    Day: actDay,
                    Slot: actSlot
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
        // console.log({
        //     Room: selectedRoom,
        //     Group: selectedGroup,
        //     Teacher: selectedTeacher,
        //     Subject: selectedSubject,
        //     Day: actDay,
        //     Slot: actSlot
        // });
    }

    return (
        <div>
            <RenderCalendar activities={activities}
                selectedRoom={{ Name: props.selectedRoomName, ID: props.selectedRoomID }}
                // selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom}
                actDay={actDay} actSlot={actSlot}
                setActDay={setActSlot} setActSlot={setActSlot}
                selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}
                selectedTeacher={selectedTeacher} setSelectedTeacher={setSelectedTeacher}
                selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}
                // activity={activity} setActivity={setActivity}
                handleShowAdd={handleShowAdd} handleCloseAdd={handleCloseAdd} handleClickAdd={handleClickAdd} handleCloseEdit={handleCloseEdit} handleClickDelete={handleClickDelete}
                handleClickEdit={handleClickEdit}
                addActModal={addActModal} setActModal={setActModal}
                editActModal={editActModal} />
        </div>
    )
}

function findActivity(roomID, day, slot, activities) {
    
    for (var act of activities) {
        if (act.Room.ID === roomID && act.Day == day && act.Slot == slot)
            return act;
    }
    return null;
}

function RenderCalendar(props) {
    let rows = [];
    for (let slot = 1; slot < 7; slot++){
        var cols = [];
        for (let day = 0; day < 6; day++){
            if (day == 0) cols.push(<td>{slot + 7}:00-{slot + 7}:45</td>);
            else if (findActivity(props.selectedRoom.ID, day, slot, props.activities)) {
                var act = findActivity(props.selectedRoom.ID, day, slot, props.activities);
                cols.push(
                    <td>
                        <SplitButton id='dropdown-split-variants-primary' variant='primary' title={findActivity(props.selectedRoom.ID, day, slot, props.activities).Group.Name}>
                            <Dropdown.Item value={day} name={slot} onClick={(event) => props.handleClickEdit(event)}>Edit</Dropdown.Item>
                            <Dropdown.Item value={day} name={slot} onClick={(event) => props.handleClickDelete(event)}>Delete</Dropdown.Item>

                        </SplitButton>
                        {/* <Button variant='primary' value={day} name={slot} onClick={(event) => props.handleClickEdit(event)}>{findActivity(props.selectedRoom.ID, day, slot, props.activities).Group.Name}</Button> */}
                        <EditActivityModal show={props.editActModal} onHide={props.handleCloseEdit} activities={props.activities}
                            day={props.actDay} slot={props.actSlot}
                            selectedRoom={props.selectedRoom}
                            // setSelectedRoom={props.setSelectedRoom}
                            selectedGroup={props.selectedGroup} setSelectedGroup={props.setSelectedGroup}
                            selectedTeacher={props.selectedTeacher} setSelectedTeacher={props.setSelectedTeacher}
                            selectedSubject={props.selectedSubject} setSelectedSubject={props.setSelectedSubject}
                            findActivity={findActivity} />
                    </td>
                )
            }
            else {
                cols.push(
                    <td>
                        <Button variant='light' value={day} name={slot} onClick={(event) => props.handleClickAdd(event)}>Add New</Button>
                        <AddActivityModal show={props.addActModal} onHide={props.handleCloseAdd} selectedRoom={props.selectedRoom} day={props.actDay} slot={props.actSlot}/>
                    </td>
                )
            }
        }
        rows.push(<tr>{cols}</tr>)
    }
    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Slot</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    )
}

export default Calendar;