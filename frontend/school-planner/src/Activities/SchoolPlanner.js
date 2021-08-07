import React from 'react';
import { Dropdown} from 'react-bootstrap';
import Calendar from './Calendar';




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
        // this.refreshList();
        const { rooms, activeRoom, activeRoomString, activeRoomID, activities} = this.state;
        // let handleRoomSelect = (name) => this.setState({ activeRoom: name });
        // let calendar = <h6>Please select a room</h6>
        // if (this.state.loadCalendar)
        //     calendar = <Calendar activities={activities} activeRoom={activeRoom} activeRoomID={activeRoomID}/>
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
                    <Calendar selectedRoom={activeRoom}/>
                </div>
            </div>
        );
    }
}