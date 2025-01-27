import React, { useState } from "react";
import "./VolleyballStatsApp.css"; // Import the CSS file
import { saveAs } from "file-saver";    // Import the file-saver library

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

    const handleSaveStats = () => {
        const stats = players.map(player => (
          `Name: ${player.name}\n` +
          `Attacks: ${player.attackPoints}\n` +
          `Blocks: ${player.blockPoints}\n` +
          `Aces: ${player.acePoints}\n` +
          `Total Points: ${player.attackPoints + player.blockPoints + player.acePoints}\n`
        )).join('\n');
    
        const blob = new Blob([stats], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "volleyball_stats.txt");
      };

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
                <button className="save-stats" onClick={handleSaveStats}>Save Stats</button>
            </div>
        );
    };

    export default VolleyballStatsApp;