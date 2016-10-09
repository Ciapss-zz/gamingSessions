import React from 'react';
import axios from 'axios';

export default class GamesSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: []
    };
    this.getGames = this.getGames.bind(this);
    this.getGames();
  }
  getGames() {
      axios.get('/games').then(function(response){
          this.setState({ game: response.data });
      }.bind(this)).catch(function (error) {
          console.log(error);
      });
  }
  render() {
    let gameNodes = this.state.game.map((game) => {
      return (
        <option 
          data-img={game.img} 
          value={game._id}
          key={game._id}
        >
          {game.title}
        </option>
      )
    });
    return (
      <select className="form-control" name="game">
        {gameNodes}
      </select>
    )
  }
}