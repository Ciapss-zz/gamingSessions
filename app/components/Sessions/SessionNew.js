import React from 'react';
import axios from 'axios';
import GameSelect from './GameSelect';
import SystemSelect from './SystemSelect';
import 'react-date-picker/index.css'
import { DateField, Calendar } from 'react-date-picker'

export default class SessionNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {},
            user: '',
            description: '',
            date: '',
            system: '',
            slots: '',
        };
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSystemChange = this.handleSystemChange.bind(this);
        this.handleSlotsChange = this.handleSlotsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUserChange(e) {
        this.setState({user: e.target.value});
    }
    handleDescriptionChange(e) {
        this.setState({description: e.target.value});
    }
    handleDateChange(dateString, { dateMoment, timestamp }) {
        this.setState({date: dateString});
    }
    handleSystemChange(e) {
        this.setState({system: e.target.value});
    }
    handleSlotsChange(e) {
        this.setState({slots: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        let user = this.state.user;
        let description = this.state.description;
        let date = this.state.date;
        let slots = this.state.slots;

        if (!user || !description || !date || !system || !slots) {
            return;
        }
        let newSession = {
            user: user,
            description: description,
            date: date,
            system: system,
            slots: slots
        };
        this.props.onSessionSubmit(newSession);
        this.setState({user: '', game: {}, description: '', date: '', system: '', slots: ''});
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="col-lg-6">
                <div className="form-group">
                    <label htmlFor="email">User:</label>
                    <input className="form-control" type="text" placeholder="User" value={this.state.user} onChange={this.handleUserChange} /> 
                </div>
                <div className="form-group">
                    <label htmlFor="email">Description:</label>
                    <textarea className="form-control" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Date:</label>
                    <DateField
                        dateFormat="YYYY-MM-DD"
                        forceValidDate={true}
                        defaultValue={1475779534404}
                        showClock={false}
                        footer={false}
                        updateOnDateClick={true}
                        collapseOnDateClick={true}
                        weekNumbers={false}
                        onChange={this.handleDateChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">System:</label>
                    <SystemSelect onChange={this.handleSystemChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Slots:</label>
                    <input className="form-control" type="text" placeholder="Slots" value={this.state.slots} onChange={this.handleSlotsChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Game:</label>
                    <GameSelect />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
        );
    }
}