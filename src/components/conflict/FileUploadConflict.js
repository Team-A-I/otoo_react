import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  ThemeProvider,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UploadButton from '../UploadButton';
import theme1 from "../../theme";
import SendModal from '../modal/SendModal';
import TextTipModal from './TextTipModal';
import AudioTipModal from './AudioTipModal';
import ImageTipModal from './ImageTipModal';
import Recorder from '../../components/conflict/Recorder';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const btnUploadLabelText = "텍스트 파일 업로드";
const btnUploadLabelImage = "이미지 파일 업로드";
const btnUploadLabelVoice = "음성 파일 업로드";
const headerText = "갈등 판결 '몇대몇'";
const headerText2 = "누가 맞는지 \n 판결 해드리겠습니다.";
const subtxt = "※ 카카오톡에서 내보내기 한 대화내용만 가능합니다. \n 　※일대일 대화만 분석 가능합니다.";
const subimage = "※ 카카오톡 캡쳐기능을 사용한 이미지만 업로드 가능합니다. \n 　※일대일 대화만 분석 가능합니다.";
const subaudio = "※ 마이크로 음성녹음 또는 녹음된 음성파일을 업로드해주세요.";
const subaudio2 = "※ 음성 파일은 .wav, .mp3 형식만 업로드 가능합니다.";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [fileType, setFileType] = useState('');
  const [fileCount, setFileCount] = useState(0);// eslint-disable-next-line
  const [jsonContent, setJsonContent] = useState(null);// eslint-disable-next-line
  const [showInput, setShowInput] = useState(false);// eslint-disable-next-line
  const [textInput, setTextInput] = useState("");// eslint-disable-next-line
  const [showCarousel, setShowCarousel] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [openTextTipModal, setOpenTextTipModal] = useState(false); 
  const [openAudioTipModal, setOpenAudioTipModal] = useState(false); 
  const [openImageTipModal, setOpenImageTipModal] = useState(false);
  const textFileInputRef = useRef(null);
  const imageFileInputRef = useRef(null);
  const audioFileInputRef = useRef(null);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [recording, setRecording] = useState(false);

  const resetFileInput = () => {
    if (selectedTab === 2) {
      textFileInputRef.current.value = null;
    } else if (selectedTab === 1) {
      imageFileInputRef.current.value = null;
    } else {
      audioFileInputRef.current.value = null;
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetFileInput();
  };

  const handleOpenTextTipModal = () => setOpenTextTipModal(true);
  const handleCloseTextTipModal = () => setOpenTextTipModal(false);
  const handleOpenAudioTipModal = () => setOpenAudioTipModal(true);
  const handleCloseAudioTipModal = () => setOpenAudioTipModal(false);
  const handleOpenImageTipModal = () => setOpenImageTipModal(true); 
  const handleCloseImageTipModal = () => setOpenImageTipModal(false); 

  const handleFileChange = useCallback((event) => {
    const selectedFiles = Array.from(event.target.files);
    const selectedFile = selectedFiles[0];
    const isImage = selectedFile.type.startsWith('image/');
    const isText = selectedFile.type === 'text/plain';
    const isAudio = selectedFile.type.startsWith('audio/');

    if (selectedFiles.length > 0) {
      if (isImage) {
        setFiles(selectedFiles);
        setFileName(selectedFiles.map(file => file.name).join(', '));
        setFileSize(selectedFiles.reduce((acc, file) => acc + file.size, 0));
        setFileType(selectedFiles.map(file => file.type).join(', '));
        setFileCount(selectedFiles.length);
      } else if (isText || isAudio) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setFileSize(selectedFile.size);
        setFileType(selectedFile.type);
        setFileCount(1);
      }
      setOpenModal(true);
    }
  }, []);

  const handleFileRead = useCallback((event) => {
    const content = event.target.result;
    try {
      const json = { text: content, file };
      setJsonContent(json);
      if (file.type.startsWith('audio/')) {
        navigate('/stt-loading', { state: { jsonContent: json } });
      } else {
        navigate('/loading-conflict', { state: { jsonContent: json } });
      }
    } catch (error) {
      console.error("Error parsing file:", error);
    }
  }, [file, navigate]);

  const handleFileUpload = () => {
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const reader = new FileReader();
      if (fileExtension === 'txt') {
        reader.onload = handleFileRead;
        reader.readAsText(file);
      } else if (fileExtension === 'wav' || fileExtension === 'mp3') {
        reader.onload = handleFileRead;
        reader.readAsDataURL(file);
      } else {
        const json = { text: textInput, files };
        setJsonContent(json);
        navigate('/loading-conflict', { state: { jsonContent: json } });
      }
    } else if (files.length > 0) {
      const json = { text: textInput, files };
      setJsonContent(json);
      navigate('/loading-conflict', { state: { jsonContent: json } });
    } else if (textInput.trim()) {
      const json = { text: textInput };
      setJsonContent(json);
      navigate('/loading-conflict', { state: { jsonContent: json } });
    } else {
      // 파일이나 텍스트 입력이 없을 때 처리
    }
  };

  const handleButtonClick = () => {
    if (selectedTab === 2) {
      textFileInputRef.current?.click();
    } else if (selectedTab === 1) {
      imageFileInputRef.current?.click();
    } else {
      audioFileInputRef.current?.click();
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleRecordingStateChange = (state) => {
    setRecording(state);
  };

  useEffect(() => {
    if (selectedTab === 1) {
      setShowCarousel(false); // Force re-render by toggling the state
      setTimeout(() => setShowCarousel(true), 0);
    }
  }, [selectedTab]);

  return (
      <ThemeProvider theme={theme1}>
      <div style={{ fontFamily: theme1.typography.fontFamily }}>
      <Container maxWidth="lg">
        

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0',
            boxSizing: 'border-box',
            marginTop: 5,
            paddingBottom: '100px',
          }}
        >
          
          
          
          {selectedTab === 0 && (
              <Box sx={{ textAlign: 'center', mb: 3, mt: 3, width: '100%', position: 'relative' }}>
                <Box sx={{ maxWidth: '700px', mx: 'auto', position: 'relative' }}>
                  <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                    <Typography variant="h2_bold" gutterBottom>
                      {headerText}<br />
                    </Typography>
                    <Typography variant="h2_bold"  gutterBottom>
                      {headerText2}<br /><br />
                    </Typography>
                  </Box>
                  <Box sx={{ position: 'absolute', right: 0 }}>
                    <img
                      src="/images/Tips.png"
                      alt="Tip!"
                      onClick={
                        selectedTab === 0
                          ? handleOpenAudioTipModal
                          : selectedTab === 1
                          ? handleOpenImageTipModal
                          : handleOpenTextTipModal
                      }
                      style={{
                        cursor: 'pointer',
                        width: '4rem',
                        height: '4rem',
                      }}
                      className="tip-icon"
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 10 }}>
                  <Typography variant="sub_bold" color="textSecondary" sx={{ mt: 1 }} gutterBottom>
                    {subaudio}<br />
                  </Typography>
                  <Typography variant="sub_bold" color="textSecondary" gutterBottom>
                    {subaudio2}
                  </Typography>
                </Box>
              </Box>
            )}

            {selectedTab === 1 && (
              <Box sx={{ textAlign: 'center', mb: 3, mt: 3, width: '100%', position: 'relative' }}>
                <Box sx={{ maxWidth: '700px', mx: 'auto', position: 'relative' }}>
                  <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                    <Typography variant="h2_bold" gutterBottom>
                      {headerText}<br />
                    </Typography>
                    <Typography variant="h2_bold" gutterBottom>
                      {headerText2}<br /><br />
                    </Typography>
                  </Box>
                  <Box sx={{ position: 'absolute', right: 0 }}>
                    <img
                      src="/images/Tips.png"
                      alt="Tip!"
                      onClick={
                        selectedTab === 0
                          ? handleOpenAudioTipModal
                          : selectedTab === 1
                          ? handleOpenImageTipModal
                          : handleOpenTextTipModal
                      }
                      style={{
                        cursor: 'pointer',
                        width: '4rem',
                        height: '4rem',
                      }}
                      className="tip-icon"
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 10 }}>
                  <Typography variant="sub_bold" color="textSecondary" sx={{ mt: 1, whiteSpace: 'pre-line' }} gutterBottom>
                    {subimage}<br />
                  </Typography>
                </Box>
              </Box>
            )}

            {selectedTab === 2 && (
              <Box sx={{ textAlign: 'center', mb: 3, mt: 3, width: '100%', position: 'relative' }}>
                <Box sx={{ maxWidth: '700px', mx: 'auto', position: 'relative' }}>
                  <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                    <Typography variant="h2_bold" gutterBottom>
                      {headerText}<br />
                    </Typography>
                    <Typography variant="h2_bold" gutterBottom>
                      {headerText2}<br /><br />
                    </Typography>
                  </Box>
                  <Box sx={{ position: 'absolute', right: 0 }}>
                    <img
                      src="/images/Tips.png"
                      alt="Tip!"
                      onClick={
                        selectedTab === 0
                          ? handleOpenAudioTipModal
                          : selectedTab === 1
                          ? handleOpenImageTipModal
                          : handleOpenTextTipModal
                      }
                      style={{
                        cursor: 'pointer',
                        width: '4rem',
                        height: '4rem',
                      }}
                      className="tip-icon"
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 10 }}>
                  <Typography variant="sub_bold" color="textSecondary" sx={{ mt: 1, whiteSpace: 'pre-line' }} gutterBottom>
                    {subtxt}
                  </Typography>
                </Box>
              </Box>
            )}



          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              centered
              TabIndicatorProps={{ style: { backgroundColor: '#04613E' } }}
              sx={{
                '& .MuiTab-root': {
                  color: '#04613E',
                  '&.Mui-selected': {
                    color: '#04613E',
                  },
                },
              }}
            >
              <Tab label="음성 업로드" />
              <Tab label="이미지 업로드" />
              <Tab label="텍스트 업로드" />
            </Tabs>
          </Box>




          {selectedTab === 0 && (
            <Box sx={{ width: '100%', mt: 5, textAlign: 'center' }}>
              <Recorder onRecordingStateChange={handleRecordingStateChange} />
              <input
                accept=".wav,.mp3"
                style={{ display: 'none' }}
                ref={audioFileInputRef}
                type="file"
                onChange={handleFileChange}
              />
            </Box>
          )}

          {selectedTab === 1 && showCarousel && (
            <Box sx={{ width: '100%', mt: 1, textAlign: 'center', p: 2 }}>
              <Carousel
                showArrows={true}
                showThumbs={false}
                showStatus={false} // 페이지 인디케이터를 숨깁니다.
                showIndicators={true} // dot 인디케이터를 표시합니다.
                infiniteLoop={true}
                emulateTouch={true}
                useKeyboardArrows={true}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev && (
                    <Button 
                      onClick={onClickHandler} 
                      title={label} 
                      sx={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: 15, 
                        zIndex: 2, 
                        color: 'white', 
                        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                        borderRadius: '50%', 
                        width: 40, 
                        height: 40, 
                        minWidth: 40, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }
                      }}
                    >
                      {"<"}
                    </Button>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                  hasNext && (
                    <Button 
                      onClick={onClickHandler} 
                      title={label} 
                      sx={{ 
                        position: 'absolute', 
                        top: '50%', 
                        right: 15, 
                        zIndex: 2, 
                        color: 'white', 
                        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                        borderRadius: '50%', 
                        width: 40, 
                        height: 40, 
                        minWidth: 40, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }
                      }}
                    >
                      {">"}
                    </Button>
                  )
                }
              >
                <div>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                  '채팅방 메뉴 〉 캡처 ' 를 눌러주세요👆
                  </Typography>
                  <img
                    src="/images/5모바일캡쳐.png"
                    alt="5모바일캡쳐"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '400px',
                      objectFit: 'contain', // 비율을 유지하며 이미지를 맞춤
                      margin: '0 auto',
                    }}
                  />
                </div>
                <div>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    '내려받기' 버튼을 눌러주세요👆
                  </Typography>
                  <img
                    src="/images/4모바일선택.png"
                    alt="4모바일선택"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '400px',
                      objectFit: 'contain', // 비율을 유지하며 이미지를 맞춤
                      margin: '0 auto',
                    }}
                  />
                </div>
              </Carousel>

              <input
                accept="image/*"
                style={{ display: 'none' }}
                ref={imageFileInputRef}
                type="file"
                onChange={handleFileChange}
                multiple
              />
            </Box>
          )}

          {selectedTab === 2 && (
            <Box sx={{ width: '100%', mt: 1, textAlign: 'center', p: 2 }}>
              <Carousel
                showArrows={true}
                showThumbs={false}
                showStatus={false} // 페이지 인디케이터를 숨깁니다.
                showIndicators={true} // dot 인디케이터를 표시합니다.
                infiniteLoop={true}
                emulateTouch={true}
                useKeyboardArrows={true}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev && (
                    <Button 
                      onClick={onClickHandler} 
                      title={label} 
                      sx={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: 15, 
                        zIndex: 2, 
                        color: 'white', 
                        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                        borderRadius: '50%', 
                        width: 40, 
                        height: 40, 
                        minWidth: 40, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }
                      }}
                    >
                      {"<"}
                    </Button>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                  hasNext && (
                    <Button 
                      onClick={onClickHandler} 
                      title={label} 
                      sx={{ 
                        position: 'absolute', 
                        top: '50%', 
                        right: 15, 
                        zIndex: 2, 
                        color: 'white', 
                        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                        borderRadius: '50%', 
                        width: 40, 
                        height: 40, 
                        minWidth: 40, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }
                      }}
                    >
                      {">"}
                    </Button>
                  )
                }
              >
                <div>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    원하는 상대방의 채팅방에서 '메뉴' 버튼을 누르고 대화 내보내기를 클릭해주세요👆
                  </Typography>
                  <img
                    src="/images/1pc카톡추출.png"
                    alt="텍스트 설명 이미지 1"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '400px',
                      objectFit: 'contain', // 비율을 유지하며 이미지를 맞춤
                      margin: '0 auto',
                    }}
                  />
                </div>
                <div>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    텍스트 파일을 선택해주세요👆
                  </Typography>
                  <img
                    src="/images/2pc카톡업로드.png"
                    alt="텍스트 설명 이미지 2"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '400px',
                      objectFit: 'contain', // 비율을 유지하며 이미지를 맞춤
                      margin: '0 auto',
                    }}
                  />
                </div>
              </Carousel>

              <input
                accept="image/*"
                style={{ display: 'none' }}
                ref={imageFileInputRef}
                type="file"
                onChange={handleFileChange}
                multiple
              />
            </Box>
          )}


          {!recording && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              width: '100%', 
              mt: 2, 
              p: 2, 
              backgroundColor: '#fff', 
              position: 'sticky', 
              bottom: 0, 
              zIndex: 1000 
            }}>
              <UploadButton
                label={
                  selectedTab === 0 
                    ? btnUploadLabelVoice 
                    : selectedTab === 1 
                    ? btnUploadLabelImage 
                    : btnUploadLabelText
                }
                onClick={handleButtonClick}
                disabled={false}
                className="conflict-btn-upload"
                title_str={
                  selectedTab === 0 
                    ? "음성 파일을 업로드해주세요" 
                    : selectedTab === 1 
                    ? "이미지 파일만 올려주세요" 
                    : "txt 파일만 올려주세요" 
                }
                defaultColor='#01A762'
                hoverColor='#04613E'
                disabledColor='#B0B0B0'
                fontColor='#ffffff'
              />
              <SendModal
                open={openModal}
                handleClose={handleCloseModal}
                handlefile={handleFileUpload}
                filetitle={fileName}
                filesize={fileSize}
                filetype={fileType}
                filecount={fileCount}
              />
            </Box>
          )}

          <TextTipModal open={openTextTipModal} handleClose={handleCloseTextTipModal} />
          <AudioTipModal open={openAudioTipModal} handleClose={handleCloseAudioTipModal} />
          <ImageTipModal open={openImageTipModal} handleClose={handleCloseImageTipModal} />
        </Box>
      </Container>
      <style>{`
      
        .responsive-image {
          max-width: 80%;
          max-height: 90%;
          margin: 0 auto;
        }

        @media (min-width: 960px) {
          .responsive-image {
          max-width: 50%;
          }
        }
        
        .responsive-image1 {
          max-width: 100%;
          max-height: 100%;
          margin: 0 auto;
        }

        @media (min-width: 960px) {
          .responsive-image1 {
          max-width: 100%;
          }
        }

        .carousel .control-dots {
          position: relative; /* 위치를 상대적으로 변경하여 이미지 아래에 배치 */
          bottom: 0; /* 아래에 위치하게 설정 */
          margin-top: 20px; /* 이미지와 dot 사이의 간격 */
        }

        .carousel .control-dots .dot {
          background: gray; /* 기본 dot 색상 */
          opacity: 0.5; /* 기본 상태의 투명도 */
        }

        .carousel .control-dots .dot.selected {
          background: darkgray; /* 선택된 dot 색상 */
          opacity: 1; /* 선택된 상태의 투명도 */
        }
          

      `}</style>
      </div>
    </ThemeProvider>
  );
};

export default FileUpload;
