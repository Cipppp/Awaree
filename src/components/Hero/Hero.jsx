import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import readingImg from '../../assets/reading_time.png';
import arrowImg from '../../assets/arrow.png';
import content from '../../content';

function Hero() {
    return (
        <div className="grid grid-cols-2 h-full justify-items-center items-center">
            <div>
                <h1 className="p-20 text-5xl font-josefin">
                    {content.hero.text}
                </h1>
            </div>

            <div className="pt-20">
                <LazyLoadImage src={readingImg} />
            </div>

            <div className="arrow">
                <a href="#">
                    <LazyLoadImage src={arrowImg} />
                </a>
            </div>
        </div>
    );
}

export default Hero;
