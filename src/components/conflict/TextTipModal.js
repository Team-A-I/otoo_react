import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton,ThemeProvider } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // 캐러셀 스타일
import CloseIcon from '@mui/icons-material/Close';
import theme from '../../theme';

const TextTipModal = ({ open, handleClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const getTitle = () => {
    if (currentSlide < 2) {
      return "이런 경우에 사용해요";
    } if(currentSlide <8) {
      return "사용 설명(모바일)";
    } else {
      return "사용 설명(PC)";
    }
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
          onClick={handleClose}
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
          <div>
            <Typography sx={{ p: { xs: 1, md: 3 } }}>
              친구랑 갈등 상황이 생길때🤜🤛
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: { xs: '250px', md: '450px' } }}>
              <img src="/images/조별과제.jpg" alt="조별과제" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Box>

          </div>
          <div>
            <Typography sx={{ p: { xs: 1, md: 3 } }}>
              연인과 말다툼이 생길때😠💕
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: { xs: '250px', md: '450px' } }}>
              <img src="/images/갈등연인.png" alt="연인갈등" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Box>

          </div>
          <div>
            <Typography sx={{ p: { xs: 1, md: 3 } }}>
              원하는 상대방의 채팅방에서 '메뉴' 버튼을 눌러주세요👆
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: { xs: '250px', md: '450px' } }}>
              <img src="/images/까똑.png" alt="설명 이미지 3" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Box>
          </div>
          <div>
            <Typography sx={{ p: { xs: 1, md: 3 } }}>
            '채팅방 설정' 아이콘을 눌러주세요👆
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: { xs: '250px', md: '450px' } }}>
              <img src="/images/까똑2.png" alt="설명 이미지 4" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Box>

          </div>
          <div>
            <Typography sx={{ p: { xs: 1, md: 3 } }}>
            '대화내용 내보내기' 를 눌러주세요👆
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: { xs: '250px', md: '450px' } }}>
              <img src="/images/까똑3.png" alt="설명 이미지 5" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Box>
          </div>
          <div>
            <Typography sx={{ p: { xs: 1, md: 3 } }}>
            '모든 메세지 내부 저장소에 저장' 을 눌러주세요👆
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: { xs: '250px', md: '450px' } }}>
              <img src="/images/깨똑설명.png" alt="설명 이미지 5" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Box>
          </div>
          <div>
            <Typography sx={{ p: { xs: 1, md: 3 } }}>
            '채팅방 메뉴 〉 캡처 ' 를 눌러주세요👆
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: { xs: '250px', md: '450px' } }}>
              <img src="/images/까똑5.png" alt="설명 이미지 5" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Box>
          </div>
          <div>
            <Typography sx={{ p: { xs: 1, md: 3 } }}>
            '내려받기' 버튼을 눌러주세요👆
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: { xs: '250px', md: '450px' } }}>
              <img src="/images/까똑6.png" alt="설명 이미지 5" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Box>
          </div>
          <div>
            <Typography sx={{ p: { xs: 1, md: 3 } }}>
            '우측 상단 메뉴 〉 대화내용 내보내기' 을 눌러주세요👆
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: { xs: '250px', md: '450px' } }}>
              <img src="/images/깨똑설명2.png" alt="설명 이미지 5" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Box>
          </div>
          <div>
            <Typography sx={{ p: { xs: 1, md: 3 } }}>
            '업로드 버튼 〉 파일선택' 을 눌러주세요👆
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: { xs: '250px', md: '450px' } }}>
              <img src="/images/깨똑설명4.png" alt="설명 이미지 5" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Box>
          </div>

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

export default TextTipModal;
