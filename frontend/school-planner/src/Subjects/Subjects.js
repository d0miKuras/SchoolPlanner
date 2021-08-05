import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddSubjectModal } from './AddSubjectModal';
import { EditSubjectModal } from './EditSubjectModal';

export class Subjects extends React.Component{

    constructor(props) {
        super(props);

        this.state = { subjects: [], addModalShow: false, editModalShow: false}
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'subjects')
            .then(response => response.json())
            .then(data => {
                this.setState({ subjects: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteSubject(subjectID) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'subjects', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    ID: subjectID
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
        const { subjects, subjectName, subjectID } = this.state;
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
                        {subjects.map(subject =>
                            <tr key={subject.ID}>
                                <td>{subject.ID}</td>
                                <td>{subject.Name}</td>
                                <td>
                                    <ButtonToolbar>
                                        <div className='mx-2'><Button variant='info'
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                subjectID: subject.ID,
                                                subjectName: subject.Name
                                            })}>Edit</Button>
                                        </div>
                                        <div className='mx-2'>
                                            <Button variant='danger'
                                            onClick={() => this.deleteSubject(subject.ID)}>Delete</Button>
                                        </div>

                                        <EditSubjectModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            subjectID={subjectID}
                                            subjectName={subjectName}
                                            />
                                    </ButtonToolbar>
                                </td>

                            </tr>)}
                    </tbody>
                    
                </Table>
                <ButtonToolbar>
                    <Button variant='primary' onClick={() => this.setState({ addModalShow: true })}>Add Subject</Button>
                    <AddSubjectModal show={this.state.addModalShow} onHide={ addModalClose}></AddSubjectModal>
                </ButtonToolbar>
            </div>
        ); 
    }
    
}