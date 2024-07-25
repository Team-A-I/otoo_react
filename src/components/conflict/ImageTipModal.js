import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, ThemeProvider } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // 캐러셀 스타일
import CloseIcon from '@mui/icons-material/Close';
import theme from '../../theme';
import ReactGA from 'react-ga4';

const slides = [
  {
    title: "이런 경우에 사용해요",
    content: "친구랑 갈등 상황이 생길때🤜🤛",
    image: "/images/조별과제.jpg",
    alt: "조별과제"
  },
  {
    title: "이런 경우에 사용해요",
    content: "연인과 말다툼이 생길때😠💕",
    image: "/images/갈등연인.png",
    alt: "연인갈등"
  },
];

const TextTipModal = ({ open, handleClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleConfirm = () => {
    ReactGA.event('text_tip_confirm', {
      event_category: 'User Actions',
      event_label: 'Text Tip Confirm'
    });
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ fontFamily: theme.typography.fontFamily }}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <IconButton 
              sx={{ position: 'absolute', top: 10, right: 10 }} 
              onClick={handleConfirm}
            >
              <CloseIcon />
            </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {slides[currentSlide]?.title}
            </Typography>
            <Carousel 
              showArrows={true} 
              showThumbs={false} 
              showStatus={false} 
              onChange={handleSlideChange}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    style={{
                      position: 'absolute',
                      zIndex: 2,
                      top: 'calc(50% - 50px)',
                      width: 30,
                      height: 30,
                      cursor: 'pointer',
                      color: '#888', // 기본 상태 회색
                      background: 'none',
                      border: 'none',
                      left: 15,
                    }}
                    className="control-arrow control-prev"
                  >
                    ◀
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    style={{
                      position: 'absolute',
                      zIndex: 2,
                      top: 'calc(50% - 50px)',
                      width: 30,
                      height: 30,
                      cursor: 'pointer',
                      color: '#888', // 기본 상태 회색
                      background: 'none',
                      border: 'none',
                      right: 15,
                    }}
                    className="control-arrow control-next"
                  >
                    ▶
                  </button>
                )
              }
            >
              {slides.map((slide, index) => (
                <div key={index}>
                  <Typography sx={{ p: { xs: 1, md: 3 } }}>
                    {slide.content}
                  </Typography>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: { xs: '200px', md: '350px' } }}>
                    <img src={slide.image} alt={slide.alt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </Box>
                </div>
              ))}
            </Carousel>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default TextTipModal;
