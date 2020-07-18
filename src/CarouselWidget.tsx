import React, { useState } from 'react';
import './CarousalWidget.css';
import city from './images/city.jpg';
import lake from './images/lake.jpg';
import racing from './images/racing.jpg';
import { ArrowRight, ArrowLeft } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    arrowRight: {
        fill: 'white',
        position: "absolute",
        marginLeft: '200px',
    },
    arrowLeft: {
        fill: 'white',
        position: 'absolute',
    }
});

function CarouselWidget() {
    const [activeImage, setActiveImage] = useState(0);
    const images: any[] = [city, lake, racing];
    const classes = useStyles();

    const getPrevPicIdx = (): number => {
        if (activeImage === 0) {
            return images.length-1;
        } else {
            return activeImage -1 ;
        }
    }

    const getNextPicIdx = (): number => {
        if (activeImage === images.length-1) {
            return 0;
        } else {
            return activeImage + 1;
        }
    }

    const handleNavigationRightOnClick = () => {
        if (activeImage === images.length - 1) {
            setActiveImage(0);
        } else {
            setActiveImage(activeImage + 1);
        }
    }

    const handleNavigationLeftOnClick = () => {
        if (activeImage === 0) {
            setActiveImage(images.length - 1);
        } else {
            setActiveImage(activeImage - 1);
        }
    }

    return (
        <div className="container">
            <div className="widget">
                <div className="prevPic">
                    <img src={images[getPrevPicIdx()]} className="image"/>
                </div>
                <div className="currentPic">
                    <img src={images[activeImage]} className="image"/>
                </div>
                <div className="next-pic">
                <img src={images[getNextPicIdx()]} className="image"/>
                </div>
                
                <ArrowLeft className={classes.arrowLeft} onClick={handleNavigationLeftOnClick}/>
                <ArrowRight className={classes.arrowRight} onClick={handleNavigationRightOnClick}/>
            </div>
           
        </div>
    )
}

export default CarouselWidget;
