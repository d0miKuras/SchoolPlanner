import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';

import { AddGroupModal } from './AddGroupModal';
import { EditGroupModal } from './EditGroupModal';

export class Groups extends React.Component{

    constructor(props) {
        super(props);
        this.state = { groups: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'groups')
            .then(response => response.json())
            .then(data => {
                this.setState({ groups: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteGroup(groupID) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'groups', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    ID: groupID
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
        const { groups, groupName, groupID } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div>
                <Table className='mt-4' striped hover bordered variant='light'>
                    <thead variant='light'>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Options</th>
                    </thead>
                    <tbody>
                        {groups.map(group =>
                            <tr key={group.ID}>
                                <td>{group.ID}</td>
                                <td>{group.Name}</td>
                                <td>
                                    <ButtonToolbar>
                                        <div className='mx-2'><Button variant='info'
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                groupID: group.ID,
                                                groupName: group.Name
                                            })}>Edit</Button>
                                        </div>
                                        <div className='mx-2'>
                                            <Button variant='danger'
                                            onClick={() => this.deleteGroup(group.ID)}>Delete</Button>
                                        </div>

                                        <EditGroupModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            groupID={groupID}
                                            groupName={groupName}
                                            />
                                    </ButtonToolbar>
                                </td>

                            </tr>)}
                    </tbody>
                    
                </Table>
                <ButtonToolbar>
                    <Button variant='primary' onClick={() => this.setState({ addModalShow: true })}>Add Group</Button>
                    <AddGroupModal show={this.state.addModalShow} onHide={ addModalClose}></AddGroupModal>
                </ButtonToolbar>
            </div>
        );
    }
    
}