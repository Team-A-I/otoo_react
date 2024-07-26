import * as React from 'react';
import { Box, Button, Typography, Modal, Accordion, AccordionSummary, AccordionDetails, ThemeProvider, Paper, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from '../../theme';
import Cookies from 'js-cookie';
import ReactGA from 'react-ga4';

const TermsOfService = () => {
    return (
        <Container>
          <Typography variant="h6" gutterBottom>
            서비스 이용약관
          </Typography>
    
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              제1장 총칙
            </Typography>
            <Typography variant="body1" gutterBottom>
              제1조 (목적)
            </Typography>
            <Typography variant="body2" paragraph>
              이 약관은 OTOO (이하 "회사"라 함)이 제공하는 몇대몇 서비스의 이용 조건과 회사와 이용자의 권리, 의무, 책임사항을 규정하는 것을 목적으로 합니다.
            </Typography>
            <Typography variant="body1" gutterBottom>
              제2조 (정의)
            </Typography>
            <Typography variant="body2" paragraph>
              1. "서비스"란 회사가 제공하는 몇대몇 서비스를 의미합니다.<br/>
              2. "이용자"란 이 약관에 동의하고 회사가 제공하는 서비스를 이용하는 자를 말합니다.
            </Typography>
          </Box>
    
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              제2장 이용계약의 체결
            </Typography>
            <Typography variant="body1" gutterBottom>
              제3조 (이용계약의 성립)
            </Typography>
            <Typography variant="body2" paragraph>
              1. 이용계약은 이용자가 본 약관에 동의하고 회사의 이용신청 양식을 작성하여 제출함으로써 체결됩니다.
              <br/>
              2. 회사는 이용신청에 대한 승낙 여부를 이용자에게 통지함으로써 계약이 성립합니다.
            </Typography>
            <Typography variant="body1" gutterBottom>
              제4조 (서비스의 제공 및 변경)
            </Typography>
            <Typography variant="body2" paragraph>
              1. 회사는 이용자에게 지속적이고 안정적인 서비스를 제공하기 위하여 최선을 다하며, 필요 시 서비스의 내용을 변경할 수 있습니다.
              <br/>
              2. 서비스의 변경이 필요한 경우 회사는 변경 사유와 변경 일정을 이용자에게 사전에 공지합니다.
            </Typography>
          </Box>
    
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              제3장 서비스 이용
            </Typography>
            <Typography variant="body1" gutterBottom>
              제5조 (서비스 이용의 제한)
            </Typography>
            <Typography variant="body2" paragraph>
              1. 이용자는 다음 각 호의 행위를 하여서는 안 됩니다.
              <br />가. 타인의 개인정보를 부정하게 사용하는 행위
              <br />나. 서비스의 운영을 방해하거나 고의로 시스템에 부하를 일으키는 행위
              <br />다. 법령에 위반되는 내용을 게시하거나 전송하는 행위
            </Typography>
            <Typography variant="body1" gutterBottom>
              제6조 (서비스 이용료)
            </Typography>
            <Typography variant="body2" paragraph>
              1. 서비스의 기본적인 이용은 무료이나, 회사는 일부 유료 서비스를 제공할 수 있으며, 이 경우에는 별도의 요금 체계가 적용됩니다.
              <br />2. 유료 서비스의 이용 요금 및 결제 방법은 서비스 이용약관과 별도로 정해질 수 있습니다.
            </Typography>
          </Box>
    
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              제4장 개인정보보호
            </Typography>
            {/* <Typography variant="body1" gutterBottom>
              제7조 (개인정보의 수집 및 이용)
            </Typography>
            <Typography variant="body2" paragraph>
              1. 회사는 이용자의 개인정보를 수집할 때 반드시 이용자의 동의를 받으며, 수집된 개인정보는 회사의 개인정보처리방침에 따라 보호됩니다.
              <br />2. 회사는 이용자의 개인정보를 제3자에게 제공하거나 이용하지 않습니다. 단, 법령의 규정에 따라 제공이 요구되는 경우에는 예외로 합니다.
            </Typography>
            <Typography variant="body1" gutterBottom>
              제8조 (데이터 수집 및 활용)
            </Typography>
            <Typography variant="body2" paragraph>
              1. 회사는 서비스 제공과 관련하여 필요한 범위 내에서 이용자의 개인정보를 수집할 수 있습니다. 이 경우, 회사는 다음의 사항을 준수합니다:
              <br />가. 수집된 개인정보는 명확한 목적을 위해 사용되며, 이용자의 동의 없이는 해당 목적을 벗어난 다른 용도로 사용하지 않습니다.
              <br />나. 회사는 개인정보의 수집과 관련된 법령 및 규제를 준수하며, 이를 위한 필요한 기술적, 관리적 조치를 취합니다.
              <br />다. 이용자는 개인정보 수집에 대해 동의를 거부할 권리가 있으며, 동의를 거부하는 경우 서비스 이용에 제한이 있을 수 있습니다.
            </Typography>
            <Typography variant="body1" gutterBottom>
              제9조 (정보 보유기간 및 파기)
            </Typography>
            <Typography variant="body2" paragraph>
              1. 회사는 이용자의 개인정보를 보유하는 기간은 개인정보의 수집 및 이용 목적이 달성되는 시점부터 시작하여, 해당 목적이 달성된 후에는 지체 없이 파기합니다. 단, 다음의 경우에는 예외로 합니다:
              <br />가. 관계 법령에서 보유 기간을 정하고 있는 경우에는 해당 기간 동안 보존합니다.
              <br />나. 이용자가 별도의 개인정보 보유 기간(보유 기간 5년)에 동의한 경우에는 동의한 기간 동안 보존합니다.
            </Typography> */}
          </Box>
    
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              제5장 책임 제한
            </Typography>
            <Typography variant="body1" gutterBottom>
              제10조 (면책조항)
            </Typography>
            <Typography variant="body2" paragraph>
              1. 회사는 천재지변, 전쟁, 사고 등 불가항력적인 사유가 발생한 경우에는 서비스 제공에 대한 책임을 면할 수 있습니다.
              <br />2. 회사는 이용자가 게시한 정보의 정확성, 신뢰성 등에 대해서는 일체 책임을 지지 않습니다.
            </Typography>
          </Box>
    
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              제6장 이용자의 권리와 의무
            </Typography>
            <Typography variant="body1" gutterBottom>
              제11조 (이용자의 권리)
            </Typography>
            <Typography variant="body2" paragraph>
              1. 이용자는 회사가 제공하는 서비스를 이용함으로써 얻는 모든 권리는 본인에게 있습니다.
              <br />2. 회사는 이용자가 서비스 이용 중 발생하는 문제에 대해 적극적으로 응대하고 해결하여야 합니다.
            </Typography>
            <Typography variant="body1" gutterBottom>
              제12조 (이용자의 의무)
            </Typography>
            <Typography variant="body2" paragraph>
              1. 이용자는 본 약관 및 회사가 정한 이용규정, 관계 법령 등을 준수하여야 합니다.
              <br />2. 이용자는 서비스 이용 시 다른 이용자의 권리를 침해하거나 회사의 업무를 방해하는 행위를 하여서는 안 됩니다.
            </Typography>
          </Box>
    
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              제7장 분쟁 해결
            </Typography>
            <Typography variant="body1" gutterBottom>
              제13조 (준거법 및 관할법원)
            </Typography>
            <Typography variant="body2" paragraph>
              1. 본 약관에 정하지 않은 사항 및 이 약관의 해석에 관한 사항은 대한민국 법률을 적용합니다.
              <br />2. 서비스 이용으로 인한 분쟁 발생 시, 당사자 간 원만한 해결을 위해 노력합니다. 해결이 어려운 경우 서울중앙지방법원을 관할 법원으로 합니다.
            </Typography>
            <Typography variant="body1" gutterBottom>
              제14조 (약관의 효력과 변경)
            </Typography>
            <Typography variant="body2" paragraph>
              1. 본 약관은 회사의 서비스 홈페이지 등에서 공지함으로써 효력을 발생합니다.
              <br />2. 회사는 필요 시 본 약관을 변경할 수 있으며, 변경된 약관은 공지한 시점부터 효력을 발생합니다.
            </Typography>
          </Box>
    
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              부칙
            </Typography>
            <Typography variant="body2" paragraph>
              본 약관은 2024년 7월 10일부터 시행됩니다.
            </Typography>
          </Box>
        </Container>
      );
  };

const sections = [
  {
    title: "와주셔서 감사해요:)",
    content: "몇대몇은 모든 데이터를 저장하지 않습니다. 안심하고 이용하셔도 됩니다."
  },
  {
    title: "몇대몇은 아직 성장중이에요",
    content: "서비스에서 규정한 데이터에 한해서만 작동합니다. 에러에 취약할 수 있으니, 설명서를 잘 보고 짧은 대화로 사용 부탁드립니다."
  },
];

const agreeText = "몇대몇을 이용함으로써 개인정보 처리방침(쿠키 정책 포함)에 동의합니다.";
const agreeButtonText = "동의하기";

const modal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75vw',
  maxWidth: 480,
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const AgreeModal = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const isAgreed = Cookies.get('userAgreed');
    if (!isAgreed) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    ReactGA.event('agree_button_click', {
      event_category: 'User Actions',
      event_label: 'Agree Button Clicked'
    });
    Cookies.set('userAgreed', 'true', { expires: 30 });
    setOpen(false);
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <div style={{ fontFamily: theme.typography.fontFamily }}>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modal}>
              <ThemeProvider theme={theme}>
                <div style={{ fontFamily: theme.typography.fontFamily }}>
                  <Typography variant="h2_bold">
                    반가워요!<br /> 몇대몇 서비스 이용을 위해 아래의 내용에 동의해주세요.
                  </Typography>
                  {sections.map((section, index) => (
                    <Paper variant="outlined" sx={{ mt: index === 0 ? 4 : 1, p: 2 }} key={index}>
                      <Typography variant="sub_bold">{section.title}</Typography>
                      <Typography variant="body1" mt={2}>{section.content}</Typography>
                    </Paper>
                  ))}
                  <Box mt={5}>
                    <Typography variant="body1">{agreeText}</Typography>
                    <Accordion variant="outlined">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography color="deepblue">개인정보 처리방침 상세보기</Typography>
                      </AccordionSummary>
                      <AccordionDetails style={{ maxHeight: '200px', overflow: 'auto' }}>
                        {TermsOfService()}
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                  <Button variant="contained" fullWidth sx={{ mt: 5 }} onClick={handleClose}>
                    {agreeButtonText}
                  </Button>
                </div>
              </ThemeProvider>
            </Box>
          </Modal>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default AgreeModal;
