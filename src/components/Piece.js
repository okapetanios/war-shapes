import React from 'react';
import {useSelector} from "react-redux";

const Piece = props => {

    const clashTile  = useSelector(state => state.clash.tile);

    return (
        <div className={props.id === clashTile? "burst-8" : "piece"} style={{backgroundColor: props.color}}/>
    );
}

export default Piece;