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
        const { rooms, activeRoom, activeRoomString, activeRoomID, activities} = this.state;
        return (
            <div>
                <div>
                    <h6>{ activeRoomString }</h6>
                    
                    {/* <DropDownRoomSelect rooms={rooms}/> */}
                    <Dropdown renderMenuOnMount={false}>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            Select Room
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
                    <Calendar selectedRoomID={activeRoomID} selectedRoomName={activeRoom}/>
                </div>
            </div>
        );
    }
}