import React, { useState, useEffect, useCallback, ReactNodeArray } from 'react';
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
    // images: Array<{img: any, text: string}>;
    numOfImgs: number;
    children: ReactNodeArray;
}

function CarouselWidget(props: CarouselWidgetProps) {
    const [activeImage, setActiveImage] = useState(0);
    const [moveRight, setMoveRight] = useState(false);
    const [moveLeft, setMoveLeft] = useState(false);
    // const images: Array<{img: any, text: string}> = props.images;
    const classes = useStyles();

    const handleNavigationRightOnClick = useCallback(() => {
        let newIdx: number;
        if (activeImage === props.numOfImgs - 1) {
            newIdx = 0;;
        } else {
            newIdx = activeImage + 1;
        }
        setMoveRight(true);
        setTimeout(() => {
            setMoveRight(false);
            setActiveImage(newIdx);
        }, 500);
    }, [setActiveImage,activeImage, props.numOfImgs])

    useEffect(() => {
        const interval = setInterval(() => {
            handleNavigationRightOnClick();
        }, 2000);
        return () => clearInterval(interval);
    }, [handleNavigationRightOnClick])

    const getPrevPicIdx = (): number => {
        if (activeImage === 0) {
            return props.numOfImgs - 1;
        } else {
            return activeImage - 1;
        }
    }

    const getNextPicIdx = (): number => {
        if (activeImage === props.numOfImgs - 1) {
            return 0;
        } else {
            return activeImage + 1;
        }
    }

    const handleNavigationLeftOnClick = () => {
        let newIdx: number;
         if (activeImage === 0) {
            newIdx = props.numOfImgs - 1;
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
                    {props.children[getPrevPicIdx()]}
                </div>
                <div className={`currentPic ${moveRight ? 'moveRight' : moveLeft ? 'moveLeft' : ''}`}>
                    {props.children[activeImage]}
                </div>
                <div className={`nextPic ${moveRight ? 'move' : ''}`}>
                    {props.children[getNextPicIdx()]}
                </div>

                <ArrowLeft className={classes.arrowLeft} onClick={handleNavigationLeftOnClick} />
                <ArrowRight className={classes.arrowRight} onClick={handleNavigationRightOnClick} />
            </div>
    )
}

export default CarouselWidget;
