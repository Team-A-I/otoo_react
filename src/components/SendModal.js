import * as React from 'react';
import { Box, Button, Typography, Modal, ThemeProvider, Paper, Container } from '@mui/material';
import theme from '../theme';
import CloseIcon from '@mui/icons-material/Close';
  
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
  
  const SendModal = ({ handlefile, filetitle, open, handleClose }) => {
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
                      <Paper elevation={0} sx={{ backgroundColor: "#E1E1E170" }}>
                        <Typography p={2} id="modal-modal-description" sx={{ mt: 5 }}>
                          {filetitle}
                        </Typography>
                      </Paper>
                      <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={handleClose}
                        >
                          취소
                        </Button>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={handlefile}>
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
  