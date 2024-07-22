import React, { useState } from 'react';
import { Box, Typography, Button, ThemeProvider } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import theme1 from "../theme";

const cardData = [
  { title: "데이터 추출방법", image: "/images/톡설명1.png", alt: "talk1", description: "카톡에서 1:1 대화를 txt파일로 추출해주세요." },
  { title: "텍스트파일 업로드방법", image: "/images/톡설명2.png", alt: "talk2", description: "70KB이하의 카톡txt 파일을 업로드 할 수 있습니다." },
  { title: "캡쳐파일 업로드방법", image: "/images/톡설명3.png", alt: "talk3", description: "5장 이하의 카톡캡쳐 파일을 업로드할 수 있습니다." }
];

const OnboardingCarousel = ({ onSkip }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const renderIndicator = (clickHandler, isSelected, index) => (
    <span
      key={index}
      onClick={clickHandler}
      onKeyDown={clickHandler}
      role="button"
      style={{
        display: 'inline-block',
        width: isSelected ? '10px' : '8px',
        height: isSelected ? '10px' : '8px',
        margin: '0 4px',
        borderRadius: '50%',
        backgroundColor: isSelected ? '#000' : '#ccc',
        cursor: 'pointer'
      }}
    />
  );

  return (
    <ThemeProvider theme={theme1}>
      <div style={{ fontFamily: theme1.typography.fontFamily }}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1300
          }}
        >
          <Box
            sx={{
              width: '80%',
              maxWidth: '600px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              position: 'relative',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Carousel
              infiniteLoop={false}
              useKeyboardArrows
              showThumbs={false}
              showStatus={false}
              showArrows={true}
              selectedItem={currentSlide}
              onChange={(index) => setCurrentSlide(index)}
              renderIndicator={false}
            >
              {cardData.map((card, index) => (
                <Box key={index} sx={{ textAlign: 'center', p: 2 }}>
                  <Box sx={{ mb: 5 }}>
                    <Typography 
                      variant="h2_bold" 
                      sx={{ 
                        display: 'inline-block',
                        position: 'relative',
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          width: '100%',
                          height: '35%',
                          bottom: 0,
                          left: 0,
                          backgroundColor: 'yellow',
                          zIndex: -1,
                        }
                      }}
                    >
                      {card.title}
                    </Typography>
                  </Box>
                  <img src={card.image} alt={card.alt} style={{ maxWidth: '100%', height: 'auto', margin: '0 auto' }} />
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="title_bold">
                      {card.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Carousel>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: '10vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '80%',
              maxWidth: '600px',
              color: 'white'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              {cardData.map((_, index) => renderIndicator(() => setCurrentSlide(index), currentSlide === index, index))}
            </Box>
            <Button
              variant="text"
              color="primary"
              onClick={onSkip}
              sx={{
                color: 'white'
              }}
            >
              Skip
            </Button>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default OnboardingCarousel;
