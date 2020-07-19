import React, { useState, useEffect, useCallback } from 'react';
import './CarousalWidget.css';
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

interface CarouselWidgetProps {
    images: Array<{img: any, text: string}>;
}

function CarouselWidget(props: CarouselWidgetProps) {
    const [activeImage, setActiveImage] = useState(0);
    const [moveRight, setMoveRight] = useState(false);
    const [moveLeft, setMoveLeft] = useState(false);
    // const images: Array<{img: any, text: string}> = props.images;
    const classes = useStyles();

    const handleNavigationRightOnClick = useCallback(() => {
        let newIdx: number;
        if (activeImage === props.images.length - 1) {
            newIdx = 0;;
        } else {
            newIdx = activeImage + 1;
        }
        setMoveRight(true);
        setTimeout(() => {
            setMoveRight(false);
            setActiveImage(newIdx);
        }, 500);
    }, [setActiveImage,activeImage, props.images.length])

    useEffect(() => {
        const interval = setInterval(() => {
            handleNavigationRightOnClick();
        }, 2000);
        return () => clearInterval(interval);
    }, [handleNavigationRightOnClick])

    const getPrevPicIdx = (): number => {
        if (activeImage === 0) {
            return props.images.length - 1;
        } else {
            return activeImage - 1;
        }
    }

    const getNextPicIdx = (): number => {
        if (activeImage === props.images.length - 1) {
            return 0;
        } else {
            return activeImage + 1;
        }
    }

    const handleNavigationLeftOnClick = () => {
        let newIdx: number;
         if (activeImage === 0) {
            newIdx = props.images.length - 1;
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
                    <img src={props.images[getPrevPicIdx()].img} className="image" alt="#" />
                    <h1 className="exampleText">{props.images[getPrevPicIdx()].text}</h1>
                </div>
                <div className={`currentPic ${moveRight ? 'moveRight' : moveLeft ? 'moveLeft' : ''}`}>
                    <img src={props.images[activeImage].img} className="image" alt="#" />
                    <h1 className="exampleText">{props.images[activeImage].text}</h1>
                </div>
                <div className={`nextPic ${moveRight ? 'move' : ''}`}>
                    <img src={props.images[getNextPicIdx()].img} className="image" alt="#"/>
                    <h1 className="exampleText">{props.images[getNextPicIdx()].text}</h1>
                </div>

                <ArrowLeft className={classes.arrowLeft} onClick={handleNavigationLeftOnClick} />
                <ArrowRight className={classes.arrowRight} onClick={handleNavigationRightOnClick} />
            </div>
    )
}

export default CarouselWidget;
