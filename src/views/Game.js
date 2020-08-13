import React, {useState} from 'react';
import Board from '../components/Board';
import {useDispatch, useSelector} from "react-redux";
import {connectToApp, sendMoveToServer, setGameState, setMoveStatus} from "../redux/actions";
import Modal from "react-bootstrap/Modal";
import "../styles/styles.css";
import {GAME_STATE, MOVE_STATUS, NO_PIECE_SELECTED, NO_TILE_SELECTED} from "../redux/stateConstants";
import {Button} from 'reactstrap'
import OnboardingSlides from '../components/OnboardingSlides';
import Gameover from '../components/Gameover';
import Piece from '../components/Piece';


const Game = () => {
    const gameState = useSelector(state => state.gameState.gameState);
    const selectedPiece = useSelector(state => state.selectedPiece.selected);
    const destinationTile = useSelector(state => state.destinationTile.tile);
    const moveStatus = useSelector(state => state.moveStatus.status);
    const clash = useSelector(state => state.clash);
    const playerPieces = useSelector(state => state.playerPieces.pieces);
    const opponentPieces = useSelector(state => state.opponentPieces.pieces);
    const opponentColor = useSelector(state => state.playerColors.opponentColor);
    const playerColor = useSelector(state => state.playerColors.playerColor);
    const loser = useSelector(state => state.gameState.loser);
    const player = useSelector(state => state.playerColors.playerColor)
   console.log("loser "+loser)
   console.log(`player is ${player}`)
    
    const [onboarding, setOnboarding] = useState(true)
    const dispatch = useDispatch();

    // noinspection JSValidateTypes
    dispatch(connectToApp());


    // const game_over = useSelector(state => state.player1_pieces)

    const movePiece = () => {

        if (moveStatus === MOVE_STATUS.HAS_MOVED) {
            console.log("You've already moved. Wait for your opponent.");
            return;
        }
        if (selectedPiece !== NO_PIECE_SELECTED && destinationTile !== NO_TILE_SELECTED) {
            // noinspection JSValidateTypes
            dispatch(sendMoveToServer(selectedPiece, destinationTile));
            // noinspection JSValidateTypes
            dispatch(setMoveStatus(MOVE_STATUS.HAS_MOVED))
        } else {
            console.log("You must select a piece and a destination tile.");
        }
    }

    // console.log(game_over)
    return (
        <>
            <h2>Your Pieces Remaining: <div className="piece" style={{margin:'auto', display:'inline-block', backgroundColor:playerColor, width:50, height:50}}>{playerPieces.length}</div></h2>
            <h2>Opponent Pieces Remaining: <div className="piece" style={{margin:'auto', display:'inline-block', backgroundColor:opponentColor, width:50, height:50}}>{opponentPieces.length}</div></h2>
            <div className={"mt-3"}>
                <Board/>
                <Button
                    onClick={movePiece}
                >Move</Button>
                <h3 className={"mt-3"}>
                    {
                        moveStatus === MOVE_STATUS.HAS_NOT_MOVED?
                            "Select a piece and a destination tile to move it to."
                            : "Wait for your opponent to select a move."
                    }
                </h3>
            </div>
            <Modal
                show={gameState === GAME_STATE.WAITING}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    You are the only player connected. Please wait for other players to connect.
                </Modal.Body>
            </Modal>
            <Modal
                show={gameState === GAME_STATE.FULL}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    Two players are already playing. Please wait for them to finish.
                </Modal.Body>
            </Modal>
            <Modal
                show={gameState === GAME_STATE.CLASH}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    You rolled {clash.playerRoll}. Your opponent rolled {clash.opponentRoll}.
                    You {clash.playerRoll > clash.opponentRoll ? "won" : "lost"} the clash.
                </Modal.Body>
                <Button
                    variant={"secondary"}
                    onClick={() => dispatch(setGameState(GAME_STATE.STARTED))}
                    size={"sm"}
                    className={"w-25 ml-auto mr-auto mb-2"}
                >Resolve</Button>
            </Modal>
            {onboarding && <OnboardingSlides setOnboarding={setOnboarding}>test</OnboardingSlides>}
            {gameState===GAME_STATE.GAME_OVER && <Gameover loser={loser} player={player}></Gameover>}
        </>
    )
}


export default Game;
