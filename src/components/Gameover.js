import React from 'react';
import { useSelector } from "react-redux";
import {Container} from 'reactstrap';

const Gameover = ({loser, player}) => {

  
console.log("playher "+player)
console.log("loser "+loser)
    return (
        <Container>
        <div className="gameover">
            <div>Game Over</div>
            {player===loser?(<div style={{color:player}}>{player.toUpperCase() + ", You Lost!"}</div>):<div style={{color:player}}>{player.toUpperCase() + ", You Won!"}</div>}
  
            
            
        </div>
    </Container>);

}

export default Gameover;