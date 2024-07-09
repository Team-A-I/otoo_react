import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useState } from 'react';
import "../css/ExplainAnalysis.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ThemeProvider, Typography,} from '@mui/material';
import theme from '../theme';

function ExplainAnalysis() {
    const cardData = [
        { image: "/otoo_react/images/톡설명1.png", alt: "talk1", description: "카카오톡에서 1:1 대화를 txt파일로 추출해주세요." },
        { image: "/otoo_react/images/톡설명2.png", alt: "talk2", description: "원하는 분야를 고르고 카톡txt 파일을 업로드 해주세요." }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const renderIndicator = (clickHandler, isSelected, index) => {
        return (
            <span
                className={isSelected ? "indicator selected" : "indicator"}
                onClick={clickHandler}
                onKeyDown={clickHandler}
                role="button"
                key={index}
            />
        );
    };

    const next = () => {
        setCurrentSlide((prev) => (prev + 1) % cardData.length);
    };

    const prev = () => {
        setCurrentSlide((prev) => (prev - 1 + cardData.length) % cardData.length);
    };

    return (
        <>
        <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
            <div className="carousel-wrapper">
                <button className="prev-arrow" onClick={prev}>
                    <ArrowBackIosIcon />
                </button>
                <div className="carousel-container">
                    <Carousel 
                        infiniteLoop 
                        useKeyboardArrows 
                        autoPlay 
                        showThumbs={false}
                        showStatus={false} 
                        showArrows={false}
                        interval={6000} 
                        selectedItem={currentSlide}
                        onChange={(index) => setCurrentSlide(index)}
                        renderIndicator={renderIndicator}
                    >
                        {cardData.map((card, index) => (
                            <div key={index} className='edubanner_container'>
                                <img src={card.image} alt={card.alt} />
                                <Typography variant='h6' mt={1}>{card.description}</Typography>
                            </div>
                        ))}
                    </Carousel>
                </div>
                <button className="next-arrow" onClick={next}>
                    <ArrowForwardIosIcon />
                </button>
            </div>
        </div>
        </ThemeProvider>
        </>
    );
}

export default ExplainAnalysis;