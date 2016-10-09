import React from 'react';
import axios from 'axios';

export default class SystemSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      system: []
    };
    this.getSystems = this.getSystems.bind(this);
    this.getSystems();
  }
  getSystems() {
      axios.get('/systems').then(function(response){
          this.setState({ system: response.data });
      }.bind(this)).catch(function (error) {
          console.log(error);
      });
  }
  render() {
    let systemNodes = this.state.system.map((system) => {
      return (
        <option 
          value={system._id}
          key={system._id}
        >
          {system.title}
        </option>
      )
    });
    return (
      <select className="form-control" name="system">
        {systemNodes}
      </select>
    )
  }
}