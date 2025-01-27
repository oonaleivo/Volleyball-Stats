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

  const handleResetPoints = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        attackPoints: 0,
        blockPoints: 0,
        acePoints: 0,
      }))
    );
  };

  return (
    <div className="app-container">
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
            <span>Attack Points: {player.attackPoints}</span>
            <span>Block Points: {player.blockPoints}</span>
            <span>Ace Points: {player.acePoints}</span>
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
      <button className="reset-points" onClick={handleResetPoints}>Reset Points</button>
    </div>
  );
};

export default VolleyballStatsApp;