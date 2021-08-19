import React, { useEffect, useState } from 'react';
import { Dropdown} from 'react-bootstrap';
import Calendar from './Calendar';



// const SchoolPlanner = (props) => {
//     const [rooms, setRooms] = useState([]);
//     const [activities, setActivities] = useState([]);
//     const [activeRoomString, setActiveRoomString] = useState('Select room in the dropdown menu:');
//     const [loadCalendar, setLoadCalendar] = useState(false);
//     const [activeRoom, setActiveRoom] = useState('');
//     const [activeRoomID, setActiveRoomID] = useState(0);
// }
export class SchoolPlanner extends React.Component{
    constructor(props) {
        super(props);
        this.state = {rooms:[], activities:[], activeRoomString:'Select room in the dropdown menu:', loadCalendar:false, activeRoom:'', activeRoomID: 0}
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'rooms')
            .then(response => response.json())
            .then(data => {
                this.setState({ rooms: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    


    render() {
        const { rooms, activeRoom, activeRoomString, activeRoomID, activities } = this.state;
        let calendar = <h6 style={{ color: 'red' }}>Please select a room!</h6>
        if (activeRoomID != 0) {
            calendar = <Calendar selectedRoomID={activeRoomID} selectedRoomName={activeRoom}/>
        }
        return (
            <div>
                <div>
                    <h6>Room:</h6>
                    
                    {/* <DropDownRoomSelect rooms={rooms}/> */}
                    <Dropdown renderMenuOnMount={false}>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            {activeRoom}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {rooms.map(room => 
                                <Dropdown.Item eventKey={room.ID} onSelect={() => {
                                    this.setState({ activeRoomString: 'Room ' + room.Name, loadCalendar:true, activeRoom: room.Name, activeRoomID: room.ID});
                                }
                                }>{room.Name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div>
                    {/* <Calendar selectedRoomID={activeRoomID} selectedRoomName={activeRoom}/> */}
                    {calendar}
                </div>
            </div>
        );
    }
}