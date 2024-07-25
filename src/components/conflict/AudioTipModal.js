import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, ThemeProvider } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // 캐러셀 스타일
import CloseIcon from '@mui/icons-material/Close';
import theme1 from "../../theme";
import ReactGA from 'react-ga4';

const slides = [
  {
    content: "서운하고 억울했던 일들을 말해주세요.👂",
    image: "/images/6음성녹음.png",
    alt: "음성"
  },
  {
    content: `이야기가 끝났으면 "누가 잘못했어?"라고 말하고
    종료버튼을 눌러주세요👆`,
    image: "/images/7음성업로드.png",
    alt: "음성2"
  }
];

const AudioTipModal = ({ open, handleClose }) => {// eslint-disable-next-line
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const getTitle = () => {
    return "사용 설명";
  };

  const handleConfirm = () => {
    ReactGA.event('audio_tip_confirm', {
      event_category: 'User Actions',
      event_label: 'Audio Tip Confirm'
    });
    handleClose();
  };

  return (
    <ThemeProvider theme={theme1}>
      <div style={{ fontFamily: theme1.typography.fontFamily }}>
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
              {getTitle()}
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
}

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

export default AudioTipModal;
