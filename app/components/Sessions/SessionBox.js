import React from 'react';
import Session from './Session';

export default class SessionBox extends React.Component {
    render() {
        let sessionNodes = this.props.data.map((session) => {
            return(
              <Session
                  user={session.user}
                  game={session.game}
                  description={session.description}
                  date={session.date}
                  system={session.system}
                  slots={session.slots}
                  id={session.id}
                  key={session.id}
              >
              </Session>
            );
        });
        return (
            <div className="panel-group sessionBox">
                {sessionNodes}
            </div>
        );
    }
}