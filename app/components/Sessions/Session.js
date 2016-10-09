import React from 'react';
import SessionScss from '../../scss/Session.scss';

export default class Session extends React.Component {
    render() {
        return (
            <div className="session row">
                <div className="col-xs-8">
                    <div className="panel panel-default">
                        <div className="panel-heading"><strong>{this.props.game}</strong></div>
                        <div className="panel-body">
                            <div className="session--text">
                                <p>{this.props.user}</p>
                                <p>{this.props.description}</p>
                            </div>
                            <div className="session--date">{this.props.date}</div>
                            <div className="session--system">{this.props.system}</div>
                            <div className="session--slots">{this.props.slots}</div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-3">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <a className="btn btn-primary session--btn" href={this.props.id} role="button">Link</a>
                            <a className="btn btn-primary session--btn" href="#" role="button">Link</a>
                            <a className="btn btn-primary session--btn" href="#" role="button">Link</a>
                        </div>
                     </div>
                </div>
            </div>
        );
    }
}