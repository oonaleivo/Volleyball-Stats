import React, { useState } from "react";
import "./VolleyballStatsApp.css"; // Import the CSS file

const VolleyballStatsApp = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");

  const handleAddPlayer = () => {
    if (newPlayer.trim() !== "") {
      setPlayers((prevPlayers) => [
        ...prevPlayers,
        {
          name: newPlayer,
          attackPoints: 0,
          blockPoints: 0,
          acePoints: 0,
        },
      ]);
      setNewPlayer("");
    }
  };

  const handleAddPoint = (index, pointType) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, i) =>
        i === index
          ? {
              ...player,
              [pointType]: player[pointType] + 1,
            }
          : player
      )
    );
  };

  const totalAttackPoints = players.reduce((total, player) => total + player.attackPoints, 0);
  const totalBlockPoints = players.reduce((total, player) => total + player.blockPoints, 0);
  const totalAcePoints = players.reduce((total, player) => total + player.acePoints, 0);

  return (
    <div className="app-container">
    <h1>Volleyball Game Stats</h1>
      <div className="add-player">
        <input
          type="text"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          placeholder="Enter player name"
        />
        <button onClick={handleAddPlayer}>Add Player</button>
      </div>
      <div className="players-list">
        {players.map((player, index) => (
          <div key={index} className="player-row">
            <span>{player.name}</span>
            <span>Attacks: {player.attackPoints}</span>
            <span>Blocks: {player.blockPoints}</span>
            <span>Aces: {player.acePoints}</span>
            <span>Total Points: {player.attackPoints + player.blockPoints + player.acePoints}</span>
            <button onClick={() => handleAddPoint(index, "attackPoints")}>
              Attack
            </button>
            <button onClick={() => handleAddPoint(index, "blockPoints")}>
              Block
            </button>
            <button onClick={() => handleAddPoint(index, "acePoints")}>
              Ace
            </button>
          </div>
        ))}
      </div>
      </div>    
  );
};

export default VolleyballStatsApp;