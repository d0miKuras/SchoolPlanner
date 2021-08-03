import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddRoomModal } from './AddRoomModal';
import { EditRoomModal } from './EditRoomModal';

export class Rooms extends React.Component{
    constructor(props) {
        super(props);
        this.state = {rooms:[], addModalShow:false, editModalShow:false}
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

    componentDidUpdate() {
        this.refreshList();
    }

    deleteRoom(roomID) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'rooms', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    ID: roomID
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
    }
    render() {
        const { rooms, roomName, roomID } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return(
            
            <div>
                <Table className='mt-4' striped hover bordered variant='light'>
                    <thead variant='dark'>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Options</th>
                    </thead>
                    <tbody>
                        {rooms.map(room =>
                            <tr key={room.ID}>
                                <td>{room.ID}</td>
                                <td>{room.Name}</td>
                                <td size='sm'>
                                    <ButtonToolbar>
                                        <div className='mx-2'><Button variant='info'
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                roomID: room.ID,
                                                roomName: room.Name
                                            })}>Edit</Button>
                                        </div>
                                        <div className='mx-2'>
                                            <Button variant='danger'
                                            onClick={() => this.deleteRoom(room.ID)}>Delete</Button>
                                        </div>
                                        
                                        <EditRoomModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            roomID={roomID}
                                            roomName={roomName}
                                            />
                                    </ButtonToolbar>
                                    {/* <ButtonToolbar>

                                    </ButtonToolbar> */}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary' onClick={() => this.setState({ addModalShow: true })}>Add Room</Button>
                    <AddRoomModal show={this.state.addModalShow} onHide={ addModalClose}></AddRoomModal>
                </ButtonToolbar>
            </div>
        );
    }
    
}