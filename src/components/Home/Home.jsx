import scrollTo from 'gatsby-plugin-smoothscroll';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ReactComponent as HomeImg } from '../../assets/reading.svg';
import { ReactComponent as FastImg } from '../../assets/fast.svg';
import arrowImg from '../../assets/arrow.png';
import fastImg from '../../assets/fast.png';
import prefImg from '../../assets/preferences.png';
import content from '../../content';
import './Home.css';

function Home() {
    const handleOnClick = () => {
        scrollTo('#slide_section');
    };
    return (
        <>
            {/* First slide  */}
            <div className="grid grid-rows-2 sm:grid sm:grid-cols-2 sm:grid-rows-none justify-items-center items-center h-screen md:pt-10 ">
                <div>
                    <h1 className="p-4 sm:p-10 md:p-10 lg:p-14 xl:p-20 text-xl text-center md:text-xl lg:text-2xl xl:text-4xl font-josefin">
                        {content.hero.text}
                    </h1>
                </div>

                <div className="md:pl-16 lg:pl-18 xl:pl-20 flex justify-center items-center">
                    <HomeImg className="h-9/12 w-9/12 home_img" />
                </div>

                <div className="w-full col-span-2 sm:flex justify-center items-center hidden">
                    <LazyLoadImage
                        src={arrowImg}
                        onClick={handleOnClick}
                        className="cursor-pointer hidden sm:w-10 sm:flex sm:mb-20 sm:justify-center sm:items-center md:w-12 lg:w-14 xl:mb-20"
                    />
                </div>
            </div>

            {/* Second slide */}
            <div
                className="block items-center justify-center h-full w-full"
                id="slide_section"
            >
                <div>
                    <svg
                        id="visual"
                        viewBox="0 0 900 200"
                        version="1.1"
                        className="w-auto"
                    >
                        <path
                            d="M0 153L11.5 150.8C23 148.7 46 144.3 69 145.5C92 146.7 115 153.3 138.2 153C161.3 152.7 184.7 145.3 207.8 141.2C231 137 254 136 277 134C300 132 323 129 346 127C369 125 392 124 415.2 131.3C438.3 138.7 461.7 154.3 484.8 162C508 169.7 531 169.3 554 163.2C577 157 600 145 623 138.8C646 132.7 669 132.3 692.2 135.3C715.3 138.3 738.7 144.7 761.8 150.2C785 155.7 808 160.3 831 161C854 161.7 877 158.3 888.5 156.7L900 155L900 0L888.5 0C877 0 854 0 831 0C808 0 785 0 761.8 0C738.7 0 715.3 0 692.2 0C669 0 646 0 623 0C600 0 577 0 554 0C531 0 508 0 484.8 0C461.7 0 438.3 0 415.2 0C392 0 369 0 346 0C323 0 300 0 277 0C254 0 231 0 207.8 0C184.7 0 161.3 0 138.2 0C115 0 92 0 69 0C46 0 23 0 11.5 0L0 0Z"
                            fill="#fcf7f8"
                        ></path>
                        <path
                            d="M0 114L11.5 111.2C23 108.3 46 102.7 69 104C92 105.3 115 113.7 138.2 119.8C161.3 126 184.7 130 207.8 130.3C231 130.7 254 127.3 277 120.7C300 114 323 104 346 100.8C369 97.7 392 101.3 415.2 102.7C438.3 104 461.7 103 484.8 106.7C508 110.3 531 118.7 554 117.3C577 116 600 105 623 100.8C646 96.7 669 99.3 692.2 106C715.3 112.7 738.7 123.3 761.8 121.8C785 120.3 808 106.7 831 103.8C854 101 877 109 888.5 113L900 117L900 0L888.5 0C877 0 854 0 831 0C808 0 785 0 761.8 0C738.7 0 715.3 0 692.2 0C669 0 646 0 623 0C600 0 577 0 554 0C531 0 508 0 484.8 0C461.7 0 438.3 0 415.2 0C392 0 369 0 346 0C323 0 300 0 277 0C254 0 231 0 207.8 0C184.7 0 161.3 0 138.2 0C115 0 92 0 69 0C46 0 23 0 11.5 0L0 0Z"
                            fill="#c6c2c3"
                        ></path>
                        <path
                            d="M0 106L11.5 100.3C23 94.7 46 83.3 69 79.7C92 76 115 80 138.2 82.3C161.3 84.7 184.7 85.3 207.8 84.3C231 83.3 254 80.7 277 83.8C300 87 323 96 346 98.2C369 100.3 392 95.7 415.2 89.5C438.3 83.3 461.7 75.7 484.8 73.2C508 70.7 531 73.3 554 75.3C577 77.3 600 78.7 623 81.5C646 84.3 669 88.7 692.2 89.7C715.3 90.7 738.7 88.3 761.8 84.7C785 81 808 76 831 77.5C854 79 877 87 888.5 91L900 95L900 0L888.5 0C877 0 854 0 831 0C808 0 785 0 761.8 0C738.7 0 715.3 0 692.2 0C669 0 646 0 623 0C600 0 577 0 554 0C531 0 508 0 484.8 0C461.7 0 438.3 0 415.2 0C392 0 369 0 346 0C323 0 300 0 277 0C254 0 231 0 207.8 0C184.7 0 161.3 0 138.2 0C115 0 92 0 69 0C46 0 23 0 11.5 0L0 0Z"
                            fill="#929090"
                        ></path>
                        <path
                            d="M0 62L11.5 58.8C23 55.7 46 49.3 69 49C92 48.7 115 54.3 138.2 55C161.3 55.7 184.7 51.3 207.8 51C231 50.7 254 54.3 277 59.7C300 65 323 72 346 75.3C369 78.7 392 78.3 415.2 75C438.3 71.7 461.7 65.3 484.8 61.2C508 57 531 55 554 58.2C577 61.3 600 69.7 623 72.7C646 75.7 669 73.3 692.2 71.5C715.3 69.7 738.7 68.3 761.8 66.2C785 64 808 61 831 60C854 59 877 60 888.5 60.5L900 61L900 0L888.5 0C877 0 854 0 831 0C808 0 785 0 761.8 0C738.7 0 715.3 0 692.2 0C669 0 646 0 623 0C600 0 577 0 554 0C531 0 508 0 484.8 0C461.7 0 438.3 0 415.2 0C392 0 369 0 346 0C323 0 300 0 277 0C254 0 231 0 207.8 0C184.7 0 161.3 0 138.2 0C115 0 92 0 69 0C46 0 23 0 11.5 0L0 0Z"
                            fill="#626161"
                        ></path>
                        <path
                            d="M0 17L11.5 22.2C23 27.3 46 37.7 69 38.2C92 38.7 115 29.3 138.2 28.7C161.3 28 184.7 36 207.8 37.2C231 38.3 254 32.7 277 31.5C300 30.3 323 33.7 346 33.5C369 33.3 392 29.7 415.2 31.2C438.3 32.7 461.7 39.3 484.8 41.5C508 43.7 531 41.3 554 38.3C577 35.3 600 31.7 623 29C646 26.3 669 24.7 692.2 24.5C715.3 24.3 738.7 25.7 761.8 26.3C785 27 808 27 831 28.8C854 30.7 877 34.3 888.5 36.2L900 38L900 0L888.5 0C877 0 854 0 831 0C808 0 785 0 761.8 0C738.7 0 715.3 0 692.2 0C669 0 646 0 623 0C600 0 577 0 554 0C531 0 508 0 484.8 0C461.7 0 438.3 0 415.2 0C392 0 369 0 346 0C323 0 300 0 277 0C254 0 231 0 207.8 0C184.7 0 161.3 0 138.2 0C115 0 92 0 69 0C46 0 23 0 11.5 0L0 0Z"
                            fill="#353535"
                        ></path>
                    </svg>
                </div>
                <div
                    id="slide_section"
                    className="justify-between items-center md:grid md:grid-cols-2"
                >
                    <div className="mx-auto">
                        <h1 className="p-10 text-center text-xs sm:text-xs md:text-md md:leading lg:text-xl xl:text-xl tracking-wide leading-5 lg:leading-8 font-josefin">
                            Studying at any level requires good time management,
                            and if you find yourself struggling to meet
                            deadlines, or you feel overwhelmed with work, or you
                            frequently end up having to stay up late into the
                            night to finish off a piece of homework, this is a
                            sign that you need to work on your time management
                            skills.
                        </h1>
                    </div>
                    <div className="z-10">
                        <LazyLoadImage src={fastImg} />
                    </div>
                </div>
                <div>
                    <svg
                        id="visual"
                        viewBox="0 0 900 200"
                        version="1.1"
                        className="w-full"
                    >
                        <path
                            d="M0 51L11.5 55.7C23 60.3 46 69.7 69 70.5C92 71.3 115 63.7 138.2 56.2C161.3 48.7 184.7 41.3 207.8 44C231 46.7 254 59.3 277 66.2C300 73 323 74 346 69.2C369 64.3 392 53.7 415.2 53.7C438.3 53.7 461.7 64.3 484.8 63.5C508 62.7 531 50.3 554 48.2C577 46 600 54 623 58.8C646 63.7 669 65.3 692.2 66.2C715.3 67 738.7 67 761.8 61.2C785 55.3 808 43.7 831 36.8C854 30 877 28 888.5 27L900 26L900 201L888.5 201C877 201 854 201 831 201C808 201 785 201 761.8 201C738.7 201 715.3 201 692.2 201C669 201 646 201 623 201C600 201 577 201 554 201C531 201 508 201 484.8 201C461.7 201 438.3 201 415.2 201C392 201 369 201 346 201C323 201 300 201 277 201C254 201 231 201 207.8 201C184.7 201 161.3 201 138.2 201C115 201 92 201 69 201C46 201 23 201 11.5 201L0 201Z"
                            fill="#fcf7f8"
                        ></path>
                        <path
                            d="M0 59L11.5 65.3C23 71.7 46 84.3 69 89.5C92 94.7 115 92.3 138.2 85.7C161.3 79 184.7 68 207.8 65.5C231 63 254 69 277 77C300 85 323 95 346 92.5C369 90 392 75 415.2 74.5C438.3 74 461.7 88 484.8 89.7C508 91.3 531 80.7 554 78.5C577 76.3 600 82.7 623 85.3C646 88 669 87 692.2 88.7C715.3 90.3 738.7 94.7 761.8 97.3C785 100 808 101 831 98.3C854 95.7 877 89.3 888.5 86.2L900 83L900 201L888.5 201C877 201 854 201 831 201C808 201 785 201 761.8 201C738.7 201 715.3 201 692.2 201C669 201 646 201 623 201C600 201 577 201 554 201C531 201 508 201 484.8 201C461.7 201 438.3 201 415.2 201C392 201 369 201 346 201C323 201 300 201 277 201C254 201 231 201 207.8 201C184.7 201 161.3 201 138.2 201C115 201 92 201 69 201C46 201 23 201 11.5 201L0 201Z"
                            fill="#c6c2c3"
                        ></path>
                        <path
                            d="M0 100L11.5 104.5C23 109 46 118 69 122.7C92 127.3 115 127.7 138.2 121.7C161.3 115.7 184.7 103.3 207.8 100.7C231 98 254 105 277 107.2C300 109.3 323 106.7 346 104.7C369 102.7 392 101.3 415.2 104C438.3 106.7 461.7 113.3 484.8 113C508 112.7 531 105.3 554 100.7C577 96 600 94 623 92.5C646 91 669 90 692.2 90.7C715.3 91.3 738.7 93.7 761.8 94.7C785 95.7 808 95.3 831 100.7C854 106 877 117 888.5 122.5L900 128L900 201L888.5 201C877 201 854 201 831 201C808 201 785 201 761.8 201C738.7 201 715.3 201 692.2 201C669 201 646 201 623 201C600 201 577 201 554 201C531 201 508 201 484.8 201C461.7 201 438.3 201 415.2 201C392 201 369 201 346 201C323 201 300 201 277 201C254 201 231 201 207.8 201C184.7 201 161.3 201 138.2 201C115 201 92 201 69 201C46 201 23 201 11.5 201L0 201Z"
                            fill="#929090"
                        ></path>
                        <path
                            d="M0 145L11.5 142.8C23 140.7 46 136.3 69 132C92 127.7 115 123.3 138.2 126C161.3 128.7 184.7 138.3 207.8 140.8C231 143.3 254 138.7 277 135.8C300 133 323 132 346 134C369 136 392 141 415.2 143.7C438.3 146.3 461.7 146.7 484.8 142.5C508 138.3 531 129.7 554 128.5C577 127.3 600 133.7 623 137.8C646 142 669 144 692.2 143.8C715.3 143.7 738.7 141.3 761.8 140C785 138.7 808 138.3 831 140.5C854 142.7 877 147.3 888.5 149.7L900 152L900 201L888.5 201C877 201 854 201 831 201C808 201 785 201 761.8 201C738.7 201 715.3 201 692.2 201C669 201 646 201 623 201C600 201 577 201 554 201C531 201 508 201 484.8 201C461.7 201 438.3 201 415.2 201C392 201 369 201 346 201C323 201 300 201 277 201C254 201 231 201 207.8 201C184.7 201 161.3 201 138.2 201C115 201 92 201 69 201C46 201 23 201 11.5 201L0 201Z"
                            fill="#626161"
                        ></path>
                        <path
                            d="M0 164L11.5 165.5C23 167 46 170 69 171C92 172 115 171 138.2 171.8C161.3 172.7 184.7 175.3 207.8 174.5C231 173.7 254 169.3 277 168.8C300 168.3 323 171.7 346 170.5C369 169.3 392 163.7 415.2 162C438.3 160.3 461.7 162.7 484.8 166.2C508 169.7 531 174.3 554 173.7C577 173 600 167 623 162.3C646 157.7 669 154.3 692.2 154.7C715.3 155 738.7 159 761.8 158.7C785 158.3 808 153.7 831 151.3C854 149 877 149 888.5 149L900 149L900 201L888.5 201C877 201 854 201 831 201C808 201 785 201 761.8 201C738.7 201 715.3 201 692.2 201C669 201 646 201 623 201C600 201 577 201 554 201C531 201 508 201 484.8 201C461.7 201 438.3 201 415.2 201C392 201 369 201 346 201C323 201 300 201 277 201C254 201 231 201 207.8 201C184.7 201 161.3 201 138.2 201C115 201 92 201 69 201C46 201 23 201 11.5 201L0 201Z"
                            fill="#353535"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* Third slide */}
            <div
                className="block items-center justify-center h-full w-full"
                id="slide_section"
            >
                <div>
                    <svg
                        id="visual"
                        viewBox="0 0 900 200"
                        version="1.1"
                        className="w-auto"
                    >
                        <path
                            d="M0 153L11.5 150.8C23 148.7 46 144.3 69 145.5C92 146.7 115 153.3 138.2 153C161.3 152.7 184.7 145.3 207.8 141.2C231 137 254 136 277 134C300 132 323 129 346 127C369 125 392 124 415.2 131.3C438.3 138.7 461.7 154.3 484.8 162C508 169.7 531 169.3 554 163.2C577 157 600 145 623 138.8C646 132.7 669 132.3 692.2 135.3C715.3 138.3 738.7 144.7 761.8 150.2C785 155.7 808 160.3 831 161C854 161.7 877 158.3 888.5 156.7L900 155L900 0L888.5 0C877 0 854 0 831 0C808 0 785 0 761.8 0C738.7 0 715.3 0 692.2 0C669 0 646 0 623 0C600 0 577 0 554 0C531 0 508 0 484.8 0C461.7 0 438.3 0 415.2 0C392 0 369 0 346 0C323 0 300 0 277 0C254 0 231 0 207.8 0C184.7 0 161.3 0 138.2 0C115 0 92 0 69 0C46 0 23 0 11.5 0L0 0Z"
                            fill="#fcf7f8"
                        ></path>
                        <path
                            d="M0 114L11.5 111.2C23 108.3 46 102.7 69 104C92 105.3 115 113.7 138.2 119.8C161.3 126 184.7 130 207.8 130.3C231 130.7 254 127.3 277 120.7C300 114 323 104 346 100.8C369 97.7 392 101.3 415.2 102.7C438.3 104 461.7 103 484.8 106.7C508 110.3 531 118.7 554 117.3C577 116 600 105 623 100.8C646 96.7 669 99.3 692.2 106C715.3 112.7 738.7 123.3 761.8 121.8C785 120.3 808 106.7 831 103.8C854 101 877 109 888.5 113L900 117L900 0L888.5 0C877 0 854 0 831 0C808 0 785 0 761.8 0C738.7 0 715.3 0 692.2 0C669 0 646 0 623 0C600 0 577 0 554 0C531 0 508 0 484.8 0C461.7 0 438.3 0 415.2 0C392 0 369 0 346 0C323 0 300 0 277 0C254 0 231 0 207.8 0C184.7 0 161.3 0 138.2 0C115 0 92 0 69 0C46 0 23 0 11.5 0L0 0Z"
                            fill="#c6c2c3"
                        ></path>
                        <path
                            d="M0 106L11.5 100.3C23 94.7 46 83.3 69 79.7C92 76 115 80 138.2 82.3C161.3 84.7 184.7 85.3 207.8 84.3C231 83.3 254 80.7 277 83.8C300 87 323 96 346 98.2C369 100.3 392 95.7 415.2 89.5C438.3 83.3 461.7 75.7 484.8 73.2C508 70.7 531 73.3 554 75.3C577 77.3 600 78.7 623 81.5C646 84.3 669 88.7 692.2 89.7C715.3 90.7 738.7 88.3 761.8 84.7C785 81 808 76 831 77.5C854 79 877 87 888.5 91L900 95L900 0L888.5 0C877 0 854 0 831 0C808 0 785 0 761.8 0C738.7 0 715.3 0 692.2 0C669 0 646 0 623 0C600 0 577 0 554 0C531 0 508 0 484.8 0C461.7 0 438.3 0 415.2 0C392 0 369 0 346 0C323 0 300 0 277 0C254 0 231 0 207.8 0C184.7 0 161.3 0 138.2 0C115 0 92 0 69 0C46 0 23 0 11.5 0L0 0Z"
                            fill="#929090"
                        ></path>
                        <path
                            d="M0 62L11.5 58.8C23 55.7 46 49.3 69 49C92 48.7 115 54.3 138.2 55C161.3 55.7 184.7 51.3 207.8 51C231 50.7 254 54.3 277 59.7C300 65 323 72 346 75.3C369 78.7 392 78.3 415.2 75C438.3 71.7 461.7 65.3 484.8 61.2C508 57 531 55 554 58.2C577 61.3 600 69.7 623 72.7C646 75.7 669 73.3 692.2 71.5C715.3 69.7 738.7 68.3 761.8 66.2C785 64 808 61 831 60C854 59 877 60 888.5 60.5L900 61L900 0L888.5 0C877 0 854 0 831 0C808 0 785 0 761.8 0C738.7 0 715.3 0 692.2 0C669 0 646 0 623 0C600 0 577 0 554 0C531 0 508 0 484.8 0C461.7 0 438.3 0 415.2 0C392 0 369 0 346 0C323 0 300 0 277 0C254 0 231 0 207.8 0C184.7 0 161.3 0 138.2 0C115 0 92 0 69 0C46 0 23 0 11.5 0L0 0Z"
                            fill="#626161"
                        ></path>
                        <path
                            d="M0 17L11.5 22.2C23 27.3 46 37.7 69 38.2C92 38.7 115 29.3 138.2 28.7C161.3 28 184.7 36 207.8 37.2C231 38.3 254 32.7 277 31.5C300 30.3 323 33.7 346 33.5C369 33.3 392 29.7 415.2 31.2C438.3 32.7 461.7 39.3 484.8 41.5C508 43.7 531 41.3 554 38.3C577 35.3 600 31.7 623 29C646 26.3 669 24.7 692.2 24.5C715.3 24.3 738.7 25.7 761.8 26.3C785 27 808 27 831 28.8C854 30.7 877 34.3 888.5 36.2L900 38L900 0L888.5 0C877 0 854 0 831 0C808 0 785 0 761.8 0C738.7 0 715.3 0 692.2 0C669 0 646 0 623 0C600 0 577 0 554 0C531 0 508 0 484.8 0C461.7 0 438.3 0 415.2 0C392 0 369 0 346 0C323 0 300 0 277 0C254 0 231 0 207.8 0C184.7 0 161.3 0 138.2 0C115 0 92 0 69 0C46 0 23 0 11.5 0L0 0Z"
                            fill="#353535"
                        ></path>
                    </svg>
                </div>
                <div
                    id="slide_section"
                    className="justify-between items-center md:grid md:grid-cols-2"
                >
                    <div className="z-10">
                        <LazyLoadImage src={prefImg} />
                    </div>
                    <div className="mx-auto">
                        <h1 className="p-10 text-center text-xs sm:text-xs md:text-md md:leading lg:text-xl xl:text-xl tracking-wide leading-5 lg:leading-8 font-josefin">
                            Rather than putting an entire essay on your agenda,
                            divide up the tasks into smaller, more easily
                            achievable goals: read a chapter of a book and make
                            notes, write the essay plan, write the introduction,
                            and so on.
                        </h1>
                    </div>
                </div>
                <div>
                    <svg
                        id="visual"
                        viewBox="0 0 900 200"
                        version="1.1"
                        className="w-full"
                    >
                        <path
                            d="M0 51L11.5 55.7C23 60.3 46 69.7 69 70.5C92 71.3 115 63.7 138.2 56.2C161.3 48.7 184.7 41.3 207.8 44C231 46.7 254 59.3 277 66.2C300 73 323 74 346 69.2C369 64.3 392 53.7 415.2 53.7C438.3 53.7 461.7 64.3 484.8 63.5C508 62.7 531 50.3 554 48.2C577 46 600 54 623 58.8C646 63.7 669 65.3 692.2 66.2C715.3 67 738.7 67 761.8 61.2C785 55.3 808 43.7 831 36.8C854 30 877 28 888.5 27L900 26L900 201L888.5 201C877 201 854 201 831 201C808 201 785 201 761.8 201C738.7 201 715.3 201 692.2 201C669 201 646 201 623 201C600 201 577 201 554 201C531 201 508 201 484.8 201C461.7 201 438.3 201 415.2 201C392 201 369 201 346 201C323 201 300 201 277 201C254 201 231 201 207.8 201C184.7 201 161.3 201 138.2 201C115 201 92 201 69 201C46 201 23 201 11.5 201L0 201Z"
                            fill="#fcf7f8"
                        ></path>
                        <path
                            d="M0 59L11.5 65.3C23 71.7 46 84.3 69 89.5C92 94.7 115 92.3 138.2 85.7C161.3 79 184.7 68 207.8 65.5C231 63 254 69 277 77C300 85 323 95 346 92.5C369 90 392 75 415.2 74.5C438.3 74 461.7 88 484.8 89.7C508 91.3 531 80.7 554 78.5C577 76.3 600 82.7 623 85.3C646 88 669 87 692.2 88.7C715.3 90.3 738.7 94.7 761.8 97.3C785 100 808 101 831 98.3C854 95.7 877 89.3 888.5 86.2L900 83L900 201L888.5 201C877 201 854 201 831 201C808 201 785 201 761.8 201C738.7 201 715.3 201 692.2 201C669 201 646 201 623 201C600 201 577 201 554 201C531 201 508 201 484.8 201C461.7 201 438.3 201 415.2 201C392 201 369 201 346 201C323 201 300 201 277 201C254 201 231 201 207.8 201C184.7 201 161.3 201 138.2 201C115 201 92 201 69 201C46 201 23 201 11.5 201L0 201Z"
                            fill="#c6c2c3"
                        ></path>
                        <path
                            d="M0 100L11.5 104.5C23 109 46 118 69 122.7C92 127.3 115 127.7 138.2 121.7C161.3 115.7 184.7 103.3 207.8 100.7C231 98 254 105 277 107.2C300 109.3 323 106.7 346 104.7C369 102.7 392 101.3 415.2 104C438.3 106.7 461.7 113.3 484.8 113C508 112.7 531 105.3 554 100.7C577 96 600 94 623 92.5C646 91 669 90 692.2 90.7C715.3 91.3 738.7 93.7 761.8 94.7C785 95.7 808 95.3 831 100.7C854 106 877 117 888.5 122.5L900 128L900 201L888.5 201C877 201 854 201 831 201C808 201 785 201 761.8 201C738.7 201 715.3 201 692.2 201C669 201 646 201 623 201C600 201 577 201 554 201C531 201 508 201 484.8 201C461.7 201 438.3 201 415.2 201C392 201 369 201 346 201C323 201 300 201 277 201C254 201 231 201 207.8 201C184.7 201 161.3 201 138.2 201C115 201 92 201 69 201C46 201 23 201 11.5 201L0 201Z"
                            fill="#929090"
                        ></path>
                        <path
                            d="M0 145L11.5 142.8C23 140.7 46 136.3 69 132C92 127.7 115 123.3 138.2 126C161.3 128.7 184.7 138.3 207.8 140.8C231 143.3 254 138.7 277 135.8C300 133 323 132 346 134C369 136 392 141 415.2 143.7C438.3 146.3 461.7 146.7 484.8 142.5C508 138.3 531 129.7 554 128.5C577 127.3 600 133.7 623 137.8C646 142 669 144 692.2 143.8C715.3 143.7 738.7 141.3 761.8 140C785 138.7 808 138.3 831 140.5C854 142.7 877 147.3 888.5 149.7L900 152L900 201L888.5 201C877 201 854 201 831 201C808 201 785 201 761.8 201C738.7 201 715.3 201 692.2 201C669 201 646 201 623 201C600 201 577 201 554 201C531 201 508 201 484.8 201C461.7 201 438.3 201 415.2 201C392 201 369 201 346 201C323 201 300 201 277 201C254 201 231 201 207.8 201C184.7 201 161.3 201 138.2 201C115 201 92 201 69 201C46 201 23 201 11.5 201L0 201Z"
                            fill="#626161"
                        ></path>
                        <path
                            d="M0 164L11.5 165.5C23 167 46 170 69 171C92 172 115 171 138.2 171.8C161.3 172.7 184.7 175.3 207.8 174.5C231 173.7 254 169.3 277 168.8C300 168.3 323 171.7 346 170.5C369 169.3 392 163.7 415.2 162C438.3 160.3 461.7 162.7 484.8 166.2C508 169.7 531 174.3 554 173.7C577 173 600 167 623 162.3C646 157.7 669 154.3 692.2 154.7C715.3 155 738.7 159 761.8 158.7C785 158.3 808 153.7 831 151.3C854 149 877 149 888.5 149L900 149L900 201L888.5 201C877 201 854 201 831 201C808 201 785 201 761.8 201C738.7 201 715.3 201 692.2 201C669 201 646 201 623 201C600 201 577 201 554 201C531 201 508 201 484.8 201C461.7 201 438.3 201 415.2 201C392 201 369 201 346 201C323 201 300 201 277 201C254 201 231 201 207.8 201C184.7 201 161.3 201 138.2 201C115 201 92 201 69 201C46 201 23 201 11.5 201L0 201Z"
                            fill="#353535"
                        ></path>
                    </svg>
                </div>
            </div>
        </>
    );
}

export default Home;
