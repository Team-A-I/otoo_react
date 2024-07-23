import React, { useState, useRef, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  ThemeProvider,
  Tabs,
  Tab,
  Button,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UploadButton from '../UploadButton';
import theme1 from "../../theme";
import SendModal from '../modal/SendModal';
import TextTipModal from './TextTipModal'; // 텍스트 Tip 모달 컴포넌트 임포트
import AudioTipModal from './AudioTipModal'; // 음성 Tip 모달 컴포넌트 임포트
import Recorder from '../../components/conflict/Recorder';

const btnUploadLabel = "카카오톡 파일 업로드";
const btnVoiceUploadLabel = "음성파일 업로드";

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
  const textFileInputRef = useRef(null);
  const audioFileInputRef = useRef(null);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [recording, setRecording] = useState(false);

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenTextTipModal = () => setOpenTextTipModal(true);
  const handleCloseTextTipModal = () => setOpenTextTipModal(false);
  const handleOpenAudioTipModal = () => setOpenAudioTipModal(true);
  const handleCloseAudioTipModal = () => setOpenAudioTipModal(false);

  const handleFileChange = useCallback((event) => {
    const selectedFiles = Array.from(event.target.files);
    const selectedFile = selectedFiles[0];
    const isImage = selectedFile.type.startsWith('image/');

    if (selectedFiles.length > 0) {

      if (isImage) {
        setFiles(selectedFiles);
        setFileName(selectedFiles.map(file => file.name).join(', '));
        setFileSize(selectedFiles.reduce((acc, file) => acc + file.size, 0));
        setFileType(selectedFiles.map(file => file.type).join(', '));
        setFileCount(selectedFiles.length);
      } else {
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
    if (selectedTab === 0) {
      textFileInputRef.current.click();
    } else {
      audioFileInputRef.current.click();
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleRecordingStateChange = (state) => {
    setRecording(state);
  };

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


          {/* 탭에 따라 상단 내용 변경 */}
          {selectedTab === 0 && (
            <Box sx={{ textAlign: 'center', mb: 3, mt: 3 }}>
              <Typography variant="h2_bold" gutterBottom>
                갈등 판결 '몇대몇'<br/>
              </Typography>
              <Typography variant="h2_bold" gutterBottom>
                누가 맞는지 판결 해드리겠습니다.<br/><br/>
              </Typography>
              <Typography variant="sub_bold" color="textSecondary" sx={{mt:1}} gutterBottom>
                ※ 카카오톡에서 내보내기 한 대화내용이나<br/>　캡쳐한 이미지만 업로드 가능합니다.
              </Typography>
            </Box>
          )}

          {selectedTab === 1 && (
            <Box sx={{ textAlign: 'center', mb: 3, mt: 3 }}>
              <Typography variant="h2_bold" gutterBottom>
                갈등 판결 '몇대몇'<br/>
              </Typography>
              <Typography variant="h2_bold"  gutterBottom>
                누가 맞는지 판결 해드리겠습니다.<br/><br/>
              </Typography>
              <Typography variant="sub_bold" color="textSecondary"  sx={{mt:1}} gutterBottom>
                ※ 마이크로 음성녹음 또는 녹음된 음성파일을 업로드해주세요.<br/>
              </Typography>
              <Typography variant="sub_bold" color="textSecondary" gutterBottom>
                ※ 음성 파일은 .wav, .mp3 형식만 업로드 가능합니다.
              </Typography>
            </Box>
          )}

          {/* Tip 버튼을 우측 상단에 배치 */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <Button
            variant="text"
            onClick={selectedTab === 0 ? handleOpenTextTipModal : handleOpenAudioTipModal}
            sx={{ color: '#04613E' }}
            >
            Tip !
            </Button>
          </Box>

          {/* 탭 추가 */}
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
              <Tab label="텍스트 업로드" />
              <Tab label="음성 업로드" />
            </Tabs>
          </Box>

          {/* 탭에 따라 내용 변경 */}
          {selectedTab === 0 && (
            <Box sx={{ width: '100%', mt: 10, textAlign: 'center', p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <img 
                    src="/images/말풍선.png" 
                    alt="텍스트 업로드용 이미지 1" 
                    className="responsive-image"
                  />
                </Grid>
                <Grid item xs={6}>
                  <img 
                    src="/images/누가.png" 
                    alt="텍스트 업로드용 이미지 2" 
                    className="responsive-image1"
                  />
                </Grid>
              </Grid>
              <input
                accept=".txt,image/*"
                style={{ display: 'none' }}
                ref={textFileInputRef}
                type="file"
                onChange={handleFileChange}
                multiple
              />
            </Box>
          )}

          {selectedTab === 1 && (
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
                label={selectedTab === 0 ? btnUploadLabel : btnVoiceUploadLabel}
                onClick={handleButtonClick}
                disabled={false}
                className="conflict-btn-upload"
                title_str={selectedTab === 0 ? "카톡 캡쳐이미지 또는 txt파일만 올려주세요" : "음성 파일을 업로드해주세요"}
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
      `}</style>
      </div>
    </ThemeProvider>
  );
};

export default FileUpload;
