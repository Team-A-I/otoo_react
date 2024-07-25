import * as React from 'react';
import { Box, Button, Typography, Modal, ThemeProvider, Paper, Container } from '@mui/material';
import theme from '../../theme';
import CloseIcon from '@mui/icons-material/Close';
import ReactGA from 'react-ga4';

const modal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  maxWidth: 330,
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 5,
  alignItems: 'center',
  justifyContent: 'center',
};

const SendModal = ({ handlefile, filetitle, filesize, filetype, filecount, open, handleClose }) => {
  const isTxtFile = filetype === 'text/plain';
  const isImageFile = filetype.startsWith('image/');
  const isAudioFile = filetype === 'audio/wav' || filetype === 'audio/mp3';
  const fileTooLarge = (isTxtFile && filesize > 30 * 1024) || (isAudioFile && filesize > 1000 * 1024);
  const tooManyImages = isImageFile && filecount > 5; // 이미지 파일 5개 제한

  const handleConfirm = () => {
    ReactGA.event('file_upload_confirm', {
      event_category: 'User Actions',
      event_label: 'File Upload Confirm'
    });
    handlefile();
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modal}>
              <ThemeProvider theme={theme}>
                <div style={{ fontFamily: theme.typography.fontFamily }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <CloseIcon sx={{ color: "#E1E1E1" }} onClick={handleClose} />
                    </Box>
                    <Typography id="modal-modal-title" variant="h3_bold" component="h2">
                      파일을 업로드 하시겠습니까?
                    </Typography>
                    <Paper elevation={0} sx={{ backgroundColor: fileTooLarge || tooManyImages ? "#FF000070" : "#E1E1E170" }}>
                      <Typography p={2} id="modal-modal-description" sx={{ mt: 5 }}>
                        {filetitle}
                      </Typography>
                    </Paper>
                    {fileTooLarge && (
                      <Typography color="error" sx={{ mt: 2 }}>
                        {isTxtFile ? "30KB 이하의 파일로 조금만 줄여주세요:)" : "1,000KB 이하의 음성 파일만 업로드 가능합니다:)"}
                      </Typography>
                    )}
                    {tooManyImages && (
                      <Typography color="error" sx={{ mt: 2 }}>
                        최대 5개까지 업로드 가능합니다:)
                      </Typography>
                    )}
                    <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', gap: 2 }}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleClose}
                        sx={{
                          borderColor: '#04613E',
                          color: '#04613E',
                          '&:hover': {
                            borderColor: '#03482A',
                            backgroundColor: '#03482A',
                            color: '#fff',
                          }
                        }}
                      >
                        취소
                      </Button>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={handleConfirm}
                        disabled={fileTooLarge || tooManyImages}
                        sx={{
                          backgroundColor: '#04613E',
                          '&:hover': {
                            backgroundColor: '#03482A',
                          },
                        }}
                      >
                        확인
                      </Button>
                    </Box>
                  </Box>
                </div>
              </ThemeProvider>
            </Box>
          </Modal>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default SendModal;
