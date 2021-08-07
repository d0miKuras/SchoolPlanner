import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

const Calendar = (props) =>{
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        axios.get(process.env.REACT_APP_API + 'activities/' + props.selectedRoom)
            .then(res => {
                setActivities(res.data);

            });
    })
    return (
        <div>
            <RenderCalendar activities={activities} selectedRoom={props.selectedRoom}/>
        </div>
    )
}


function findActivity(roomName, day, slot, activities) {
    
    for (var act of activities) {
        if (act.Room.Name == roomName && act.Day == day && act.Slot == slot)
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
            else if (findActivity(props.selectedRoom, day, slot, props.activities)) cols.push(
                <td>
                    <Button variant='light'>{findActivity(props.selectedRoom, day, slot, props.activities).Group.Name}</Button>
                </td>
            )
            else cols.push(
                <td>
                    <Button variant='light'>Add New</Button>
                </td>
            )
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