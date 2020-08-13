import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Slide from "./Slide";
import SlideIndicator from "./SlideIndicator";
import {} from "../redux/actions";
import {Button} from 'reactstrap';

const TOTAL_SLIDES = 3;

const OnboardingSlides = props => {
    const playerColor= useSelector(state => state.playerColors.playerColor)
    const [activeSlide, setActiveSlide] = useState(1);
    
    const setOnboarding=props.setOnboarding;
    const dispatch = useDispatch();

    const setSlideState = id => {
        if (id === activeSlide)
            return "active";
        return "inactive";
    }

    const nextSlide = () => {
        let id = activeSlide;
        id < TOTAL_SLIDES ? setActiveSlide(id + 1) : setOnboarding(false);
    }

    const generateSlideIndicators = () => {
        let indicators = [];
        for (let i = 1; i <= TOTAL_SLIDES; i++) {
            indicators.push(
                <SlideIndicator slideStatus={setSlideState(i)} key={i} 
                                slideID={i} 
                                clickHandler={() => setActiveSlide(i)} />
            )
        }
        return indicators;
    }

    return (
        <div className="slides-bg">
            <Slide setOnboarding={setOnboarding} slideStatus={setSlideState(1)} slideId={1}>
                <h1>Welcome to War Shapes</h1>
                <p>Warshapes is a prototype simultaneous, turn-based game.</p>
                <p>It is not like a traditional turn-based game.</p>
                <p>Once each player submits their move, the moves will be resolved at the same time.</p>
                <p>The last player to have pieces left will win.</p>
                <div className="fit my-4">
                </div>
            </Slide>
            <Slide setOnboarding={setOnboarding} slideStatus={setSlideState(2)} slideId={2}>
                <h1>Click a piece of your color.</h1>
                <div className="piece" style={{backgroundColor: playerColor, width:"100px", height: "100px"}}></div>
                <p>Then click an EMPTY tile.</p>
                <p>Then click <Button>Move</Button> to submit your move.</p>
                
                <p>Wait for your opponent to enter their move.
                </p>
                <div className="fit my-4">
                </div>
            </Slide>
            <Slide setOnboarding={setOnboarding} slideStatus={setSlideState(3)} slideId={3}>
                <h1>If your piece and an opponent's piece end up on the same tile...</h1>
                <p>...they will battle via a randomly generated number for each piece involved in the fight.</p>
                <p>The higher number wins the battle</p>
                <p>The first player that loses all their pieces LOSES THE GAME!</p>
                <h1>Good Luck!</h1>
            </Slide>
            <div className="slides-controls">
                <button className="align-left control-btn" onClick={() => setOnboarding(false)}>Skip</button>
                <div className="align-center">
                    {generateSlideIndicators()}
                </div>
                <button className="align-right control-btn" onClick={nextSlide}>
                    {
                        activeSlide < TOTAL_SLIDES ? "Next" : "Done"
                    }
                </button>
            </div>
        </div>
    )
}

export default OnboardingSlides;