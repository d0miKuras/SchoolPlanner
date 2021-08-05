import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddTeacherModal } from './AddTeacherModal';
import { EditTeacherModal } from './EditTeacherModal';

export class Teachers extends React.Component{

    constructor(props) {
        super(props);

        this.state = { teachers: [], addModalShow: false, editModalShow: false}
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'teachers')
            .then(response => response.json())
            .then(data => {
                this.setState({ teachers: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteTeacher(teacherID) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'teachers', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    ID: teacherID
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
        const { teachers, teacherName, teacherID } = this.state;
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
                        {teachers.map(teacher =>
                            <tr key={teacher.ID}>
                                <td>{teacher.ID}</td>
                                <td>{teacher.Name}</td>
                                <td>
                                    <ButtonToolbar>
                                        <div className='mx-2'><Button variant='info'
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                teacherID: teacher.ID,
                                                teacherName: teacher.Name
                                            })}>Edit</Button>
                                        </div>
                                        <div className='mx-2'>
                                            <Button variant='danger'
                                            onClick={() => this.deleteTeacher(teacher.ID)}>Delete</Button>
                                        </div>

                                        <EditTeacherModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            teacherID={teacherID}
                                            teacherName={teacherName}
                                            />
                                    </ButtonToolbar>
                                </td>

                            </tr>)}
                    </tbody>
                    
                </Table>
                <ButtonToolbar>
                    <Button variant='primary' onClick={() => this.setState({ addModalShow: true })}>Add Teacher</Button>
                    <AddTeacherModal show={this.state.addModalShow} onHide={ addModalClose}></AddTeacherModal>
                </ButtonToolbar>
            </div>
        ); 
    }
    
}