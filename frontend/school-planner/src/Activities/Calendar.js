import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import AddActivityModal from './AddActivityModal';

const Calendar = (props) =>{
    const [activities, setActivities] = useState([]);
    const [addActModal, setActModal] = useState(false);
    const [actDay, setActDay] = useState(-1);
    const [actSlot, setActSlot] = useState(-1);
    useEffect(() => {
        axios.get(process.env.REACT_APP_API + 'activities/' + props.selectedRoomID)
            .then(res => {
                setActivities(res.data);
            });
    }, [activities])

    const handleShow = () =>{
        setActModal(true);
    }

    const handleClose = () => {
        setActModal(false);
    }

    const handleClick = (event) =>{
        setActDay(event.target.value);
        setActSlot(event.target.name);
        handleShow();
    }

    return (
        <div>
            <RenderCalendar activities={activities} selectedRoom={{ Name: props.selectedRoomName, ID: props.selectedRoomID }}
                actDay={actDay} actSlot={actSlot}
                setActDay={setActSlot} setActSlot={setActSlot}
                handleShow={handleShow} handleClose={handleClose} handleClick={handleClick}
                addActModal={addActModal} setActModal={setActModal} />
        </div>
    )
}

function findActivity(roomID, day, slot, activities) {
    
    for (var act of activities) {
        if (act.Room.ID == roomID && act.Day == day && act.Slot == slot)
            return act;
    }
    return null;
}

function RenderCalendar(props) {
    let rows = [];
    for (let day = 0; day < 5; day++){
        var cols = [];
        for (let slot = 0; slot < 6; slot++){
            if (slot == 0) cols.push(<td>{slot + 8}:00-{slot + 8}:45</td>);
            else if (findActivity(props.selectedRoom.ID, day, slot, props.activities)) cols.push(
                <td>
                    <Button variant='primary'>{findActivity(props.selectedRoom.ID, day, slot, props.activities).Group.Name}</Button>
                </td>
            )
            else {
                cols.push(
                    <td>
                        <Button variant='light' value={day} name={slot} onClick={(event) => props.handleClick(event)}>Add New</Button>
                        <AddActivityModal show={props.addActModal} onHide={props.handleClose} selectedRoom={props.selectedRoom} day={props.actDay} slot={props.actSlot}/>
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