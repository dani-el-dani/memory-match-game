import { useEffect, useState } from "react"
import frontImg from '../assets/phoneImage256.webp'
import AI from "../assets/AI.webp"
import battery from "../assets/battery.webp"
import diamond from "../assets/diamond.webp"
import brickWall from "../assets/brickWall.webp"
import telescope from "../assets/telescope.webp"
import waterDrop from "../assets/waterDrop.webp"

const images = [AI, battery, brickWall, diamond, telescope, waterDrop]

export default function Card({flipState, flipCounter, index, setFlipState, img, setMoves}){
    function handleCardClick(){
        if(flipState[index] === "not flipped" && flipCounter !== 2){
            const currentflipState = flipState.slice()
            currentflipState[index] = "flipped"
            setFlipState(currentflipState)
            setMoves(prev => prev + 1)
        }
    }
    return(
        <div onClick={handleCardClick} className="card-container">
            <div className={`flip-container ${flipState[index] !== "not flipped" ? "flipped" : ''}`}>
                <div className="front">
                    <div className="img-Container">
                        <img src={frontImg} alt="" />
                    </div>
                </div>
                <div className="back">
                    <div className="img-Container">
                        {flipState[index] !== "not flipped" && <div className="img-Container back-img">
                            <img src={images[img-1]} alt="" />
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}