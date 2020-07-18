import React, { useState, useEffect, useCallback } from 'react';
import './CarousalWidget.css';
import city from './images/city.jpg';
import lake from './images/lake.jpg';
import racing from './images/racing.jpg';
import { ArrowRight, ArrowLeft } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    arrowRight: {
        position: "absolute",
        fill: 'white',  
        zIndex: 3,
        top: "40%",
        right: 0,
        fontSize: "80px",
        "&:hover": {
            cursor: "pointer",
        }
    },
    arrowLeft: {
        position: "absolute",
        fill: 'white',
        zIndex: 3,
        top: "40%",
        left: 0,
        fontSize: "80px",
        "&:hover": {
            cursor: "pointer",
        }
    }
});

function CarouselWidget() {
    const [activeImage, setActiveImage] = useState(0);
    const [moveRight, setMoveRight] = useState(false);
    const [moveLeft, setMoveLeft] = useState(false);
    const images: any[] = [city, lake, racing];
    const classes = useStyles();

    const handleNavigationRightOnClick = useCallback(() => {
        let newIdx: number;
        if (activeImage === images.length - 1) {
            newIdx = 0;;
        } else {
            newIdx = activeImage + 1;
        }
        setMoveRight(true);
        setTimeout(() => {
            setMoveRight(false);
            setActiveImage(newIdx);
        }, 500);
    }, [setActiveImage,activeImage, images.length])

    useEffect(() => {
        const interval = setInterval(() => {
            handleNavigationRightOnClick();
        }, 2000);
        return () => clearInterval(interval);
    }, [handleNavigationRightOnClick])

    const getPrevPicIdx = (): number => {
        if (activeImage === 0) {
            return images.length - 1;
        } else {
            return activeImage - 1;
        }
    }

    const getNextPicIdx = (): number => {
        if (activeImage === images.length - 1) {
            return 0;
        } else {
            return activeImage + 1;
        }
    }

    const handleNavigationLeftOnClick = () => {
        let newIdx: number;
         if (activeImage === 0) {
            newIdx = images.length - 1;
        } else {
            newIdx = activeImage - 1;
        }
        setMoveLeft(true);
        setTimeout(() => {
            setMoveLeft(false);
            setActiveImage(newIdx);
        }, 500);    
    }

    return (
            <div className="widget">
                <div className={`prevPic ${moveLeft ? 'move' : ''}`}>
                    <img src={images[getPrevPicIdx()]} className="image" alt="#" />
                </div>
                <div className={`currentPic ${moveRight ? 'moveRight' : moveLeft ? 'moveLeft' : ''}`}>
                    <img src={images[activeImage]} className="image" alt="#" />
                    <h1 className="exampleText">This is a text</h1>
                </div>
                <div className={`nextPic ${moveRight ? 'move' : ''}`}>
                    <img src={images[getNextPicIdx()]} className="image" alt="#"/>
                </div>

                <ArrowLeft className={classes.arrowLeft} onClick={handleNavigationLeftOnClick} />
                <ArrowRight className={classes.arrowRight} onClick={handleNavigationRightOnClick} />
            </div>
    )
}

export default CarouselWidget;
