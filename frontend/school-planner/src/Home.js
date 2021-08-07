import React, { Component } from 'react';
import { SchoolPlanner } from './Activities/SchoolPlanner';

export class Home extends React.Component{
    render()
    {
        return(
            <div className="mt-5 d-flex justify-content-left">
                <SchoolPlanner/>
            </div>
        );
    }

}