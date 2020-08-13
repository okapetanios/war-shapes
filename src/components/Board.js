import React, { useState, useEffect } from 'react';
import Tile from '../components/Tile';

const BOARD_SIZE = 25;

const Board = () => {


    const [tiles, setTiles] = useState([])
    const [tileSelectedIndex, setTileSelectedIndex] = useState(-1)


    const popTiles = tileIndex => {
        let tempTiles = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            tempTiles.push(<Tile key={i} id={i} selected={i === tileSelectedIndex} select={setTileSelectedIndex}></Tile>)
        }
        return tempTiles;
    }

    useEffect(() => {
        setTiles(popTiles());
    }, [])

    useEffect(() => {
        setTiles(popTiles(tileSelectedIndex));
    }, [tileSelectedIndex])




    return (
        <div className="board">
            {tiles.map((tile) => {
                return tile
            })}
        </div>
    )

}


export default Board;
