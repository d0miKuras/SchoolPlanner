import React, { Component } from 'react';
import { Dropdown, Table } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap/DropdownButton'


export class DropDownRoomSelect extends React.Component{

    render() {
        const { rooms } = this.props;
        return (
            <Dropdown renderMenuOnMount={false}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Select Room
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {rooms.map(room => 
                            <Dropdown.Item eventKey={room.ID} onSelect={this.props.onSelect(room.Name)}>{room.Name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
        )
    }


}