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

const LABELS = {
  audio: "음성 파일 업로드",
  image: "이미지 파일 업로드",
  text: "텍스트 파일 업로드",
  header1: "갈등 판결 '몇대몇'",
  header2: "누가 맞는지 \n 판결 해드리겠습니다.",
  subtext: {
    audio: "※ 마이크로 음성녹음 또는 녹음된 음성파일을 업로드해주세요.\n※ 음성 파일은 .wav, .mp3 형식만 업로드 가능합니다.",
    image: "※ 카카오톡 캡쳐기능을 사용한 이미지만 업로드 가능합니다.\n※일대일 대화만 분석 가능합니다.",
    text: "※ 카카오톡에서 내보내기 한 대화내용만 가능합니다.\n※일대일 대화만 분석 가능합니다."
  }
};

const TIPS = [
  { src: "/images/5모바일캡쳐.png", text: "채팅방 메뉴 〉 캡처 ' 를 눌러주세요👆" },
  { src: "/images/4모바일선택.png", text: "내려받기' 버튼을 눌러주세요👆" },
];

const TEXT_TIPS = [
  { src: "/images/1pc카톡추출.png", text: "원하는 상대방의 채팅방에서 '메뉴' 버튼을 누르고 대화 내보내기를 클릭해주세요👆" },
  { src: "/images/2pc카톡업로드.png", text: "텍스트 파일을 선택해주세요👆" },
];

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [fileType, setFileType] = useState('');
  const [fileCount, setFileCount] = useState(0);// eslint-disable-next-line
  const [jsonContent, setJsonContent] = useState(null);// eslint-disable-next-line
  const [showInput, setShowInput] = useState(false);// eslint-disable-next-line
  const [textInput, setTextInput] = useState("");
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

  const handleTipModal = (type, open) => {
    if (type === 'audio') setOpenAudioTipModal(open);
    if (type === 'image') setOpenImageTipModal(open);
    if (type === 'text') setOpenTextTipModal(open);
  };

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
    }
  };

  const handleButtonClick = () => {
    if (selectedTab === 2) textFileInputRef.current?.click();
    else if (selectedTab === 1) imageFileInputRef.current?.click();
    else audioFileInputRef.current?.click();
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleRecordingStateChange = (state) => {
    setRecording(state);
  };

  useEffect(() => {
    if (selectedTab === 1) {
      setShowCarousel(false);
      setTimeout(() => setShowCarousel(true), 0);
    }
  }, [selectedTab]);

  const renderHeader = () => (
    <Box sx={{ textAlign: 'center', mb: 3, mt: 3, width: '100%', position: 'relative' }}>
      <Box sx={{ maxWidth: '700px', mx: 'auto', position: 'relative' }}>
        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <Typography variant="h2_bold" gutterBottom>{LABELS.header1}<br /></Typography>
          <Typography 
            variant="h2_bold" 
            sx={{ 
              mt: 1, 
              whiteSpace: 'normal', 
              '@media (max-width:600px)': {
                whiteSpace: 'pre-line'
              } 
            }} 
            gutterBottom
          >
            {LABELS.header2}<br /><br />
          </Typography>
        </Box>
        <Box sx={{ position: 'absolute', right: 0 }}>
          <img
            src="/images/Tips.png"
            alt="Tip!"
            onClick={() => handleTipModal(selectedTab === 0 ? 'audio' : selectedTab === 1 ? 'image' : 'text', true)}
            style={{ cursor: 'pointer', width: '3rem', height: '3rem' }}
            className="tip-icon"
          />
        </Box>
      </Box>
      <Box sx={{ mt: 10 }}>
        <Typography variant="sub_bold" color="textSecondary" sx={{ mt: 1, whiteSpace: 'pre-line' }} gutterBottom>
          {selectedTab === 0 ? LABELS.subtext.audio : selectedTab === 1 ? LABELS.subtext.image : LABELS.subtext.text}
        </Typography>
      </Box>
    </Box>
  );
  
  

  const renderCarousel = (tips) => (
    <Box sx={{ width: '100%', mt: 1, textAlign: 'center', p: 2 }}>
      <Carousel
        showArrows
        showThumbs={false}
        showStatus={false}
        showIndicators
        infiniteLoop
        emulateTouch
        useKeyboardArrows
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <Button 
              onClick={onClickHandler} 
              title={label} 
              sx={{ position: 'absolute', top: '50%', left: 15, zIndex: 2, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '50%', width: 40, height: 40, minWidth: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
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
              sx={{ position: 'absolute', top: '50%', right: 15, zIndex: 2, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '50%', width: 40, height: 40, minWidth: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
            >
              {">"}
            </Button>
          )
        }
      >
        {tips.map((tip, index) => (
          <div key={index}>
            <Typography variant="h6" sx={{ mb: 1 }}>{tip.text}</Typography>
            <img
              src={tip.src}
              alt={tip.text}
              style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain', margin: '0 auto' }}
            />
          </div>
        ))}
      </Carousel>
    </Box>
  );

  return (
    <ThemeProvider theme={theme1}>
      <div style={{ fontFamily: theme1.typography.fontFamily }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0', boxSizing: 'border-box', marginTop: 5, paddingBottom: '100px' }}>
            {renderHeader()}
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <Tabs value={selectedTab} onChange={handleTabChange} centered TabIndicatorProps={{ style: { backgroundColor: '#04613E' } }} sx={{ '& .MuiTab-root': { color: '#04613E', '&.Mui-selected': { color: '#04613E' } } }}>
                <Tab label="음성 업로드" />
                <Tab label="이미지 업로드" />
                <Tab label="텍스트 업로드" />
              </Tabs>
            </Box>
            {selectedTab === 0 && (
              <Box sx={{ width: '100%', mt: 5, textAlign: 'center' }}>
                <Recorder onRecordingStateChange={handleRecordingStateChange} />
                <input accept=".wav,.mp3" style={{ display: 'none' }} ref={audioFileInputRef} type="file" onChange={handleFileChange} />
              </Box>
            )}
            {selectedTab === 1 && showCarousel && renderCarousel(TIPS)}
            {selectedTab === 2 && renderCarousel(TEXT_TIPS)}
            {selectedTab === 1 && (
              <Box sx={{ width: '100%', mt: 5, textAlign: 'center' }}>
                <input accept="image/*" style={{ display: 'none' }} ref={imageFileInputRef} type="file" onChange={handleFileChange} multiple />
              </Box>
            )}
            {selectedTab === 2 && (
              <Box sx={{ width: '100%', mt: 5, textAlign: 'center' }}>
                <input accept=".txt" style={{ display: 'none' }} ref={textFileInputRef} type="file" onChange={handleFileChange} />
              </Box>
            )}
            {!recording && (
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2, p: 2, backgroundColor: '#fff', position: 'sticky', bottom: 0, zIndex: 1000 }}>
                <UploadButton
                  label={selectedTab === 0 ? LABELS.audio : selectedTab === 1 ? LABELS.image : LABELS.text}
                  onClick={handleButtonClick}
                  disabled={false}
                  className="conflict-btn-upload"
                  title_str={selectedTab === 0 ? "음성 파일을 업로드해주세요" : selectedTab === 1 ? "이미지 파일만 올려주세요" : "txt 파일만 올려주세요"}
                  defaultColor='#01A762'
                  hoverColor='#04613E'
                  disabledColor='#B0B0B0'
                  fontColor='#ffffff'
                />
                <SendModal open={openModal} handleClose={handleCloseModal} handlefile={handleFileUpload} filetitle={fileName} filesize={fileSize} filetype={fileType} filecount={fileCount} />
              </Box>
            )}
            <TextTipModal open={openTextTipModal} handleClose={() => handleTipModal('text', false)} />
            <AudioTipModal open={openAudioTipModal} handleClose={() => handleTipModal('audio', false)} />
            <ImageTipModal open={openImageTipModal} handleClose={() => handleTipModal('image', false)} />
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
            position: relative;
            bottom: 0;
            margin-top: 20px;
          }
          .carousel .control-dots .dot {
            background: gray;
            opacity: 0.5;
          }
          .carousel .control-dots .dot.selected {
            background: darkgray;
            opacity: 1;
          }
        `}</style>
      </div>
    </ThemeProvider>
  );
};

export default FileUpload;
