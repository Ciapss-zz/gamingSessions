import React from 'react';
import axios from 'axios';
import SessionBox from './SessionBox';
import SessionNew from './SessionNew';


export default class SessionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: []
        };
        this.showSessions = this.showSessions.bind(this);
        this.handleSessionSubmit = this.handleSessionSubmit.bind(this);
    }
    componentDidMount() {
        this.showSessions();
    }
    showSessions() {
        axios.get('/sessions').then(function(response){
            this.setState({ sessions: response.data });
        }.bind(this)).catch(function (error) {
            console.log(error);
        });
    }
    saveSessions(sessions) {
        axios.post('/sessions').then(function(response) {
            console.log(response);
            this.setState({sessions: sessions});
        }.bind(this)).catch(function (error) {
            console.log(error);
        });
    }
    handleSessionSubmit(session) {
        let sessions = this.state.sessions;
        session.id = Date.now();
        let newSessions = sessions.concat(session);
        this.saveSessions(newSessions);
    }
    render() {
        return (
            <div className="app">
                <div className="row">
                    <SessionBox data={this.state.sessions} />
                </div>
                <SessionNew onSessionSubmit={this.handleSessionSubmit}></SessionNew>
            </div>
        );
    }
}
