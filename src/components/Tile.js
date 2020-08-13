import React, { useState, useEffect } from 'react';
import Piece from "./Piece"
import { useSelector, useDispatch } from "react-redux";
import { setDestinationTile, setSelectedPiece } from "../redux/actions";
import {MOVE_STATUS} from "../redux/stateConstants";

// Board tells tile it is selected

const Tile = (props) => {

    const playerPieces = useSelector(state => state.playerPieces.pieces);
    const opponentPieces = useSelector(state => state.opponentPieces.pieces);
    const selectedPiece = useSelector(state => state.selectedPiece.selected);
    const destinationTile = useSelector(state => state.destinationTile.tile);
    const opponentColor = useSelector(state => state.playerColors.opponentColor);
    const playerColor = useSelector(state => state.playerColors.playerColor);
    const moveStatus = useSelector(state => state.moveStatus.status);


    const dispatch = useDispatch();

    const selectPiece = id => {
        if (playerPieces.includes(id)) {
            // noinspection JSValidateTypes
            dispatch(setSelectedPiece(id));
        } else if (!playerPieces.includes(id) && !opponentPieces.includes(id)) {
            // noinspection JSValidateTypes
            dispatch(setDestinationTile(id))
        } else {
            console.log("You may only select your own piece.");
        }
    }

    return (
        <div className={"tiles" + (selectedPiece === props.id || destinationTile === props.id ? ' tile-selected' : '')}
            onClick={() => {
                if (moveStatus === MOVE_STATUS.HAS_NOT_MOVED) {
                    selectPiece(props.id);
                }
            }}>
            {
                playerPieces.includes(props.id) ?
                    <Piece id={props.id} color={playerColor} />
                    : <></>
            }

            {
                opponentPieces.includes(props.id) ?
                    <Piece id={props.id} color={opponentColor} />
                    : <></>
            }
        </div>
    )
}


export default Tile;

// onClick={() => {
//     if (moveStatus === MOVE_STATUS.HAS_NOT_MOVED) {
//         selectPiece(props.id);
//     }
// }}>
// {
//    playerPieces.includes(props.id) || opponentPieces.includes(props.id) ?
//        <Piece id={props.id}/>
