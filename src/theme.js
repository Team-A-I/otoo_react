import { createTheme } from '@mui/material';

// 사용방법
// 사용할 페이지에 import theme from "../../theme"
// <ThemeProvider theme={theme}></ThemeProvider> Container 아래 적용
// <Typography variant="typography style" color="palette color"></Typography>
// <Button variant="contained" sx={{backgroundColor:theme.palette.원하는 색상}}></Button>

const theme = createTheme({
    palette: {
      lightblue: '#0495D2',
      creamgray: '#F1F0EB',
      vyellow: '#FAE300',
      deepblue: '#0350B7',
      lightpurple: '#ECD3D8',
      peach: '#FFCFAA',
      //text_title
        gray900: '#1B1F23',
        gray800: '#252525',
        gray700: '#393939',
      //text_subtitle
        gray600: '#404040',
        gray500: '#6E6E6E',
      //caption
        gray400: '#919191',
        gray300: '#C8C8C8',
      //line
        gray200: '#E1E1E1'
    },
    typography: {
      fontFamily: [
        'Pretendard',
        'BMDoHyeon'
      ].join(','),
      nav_bold: {
        fontSize: '16px',
        fontWeight: 700,
        color: '#1B1F23'
      },
      nav_mid: {
        fontSize: '16px',
        fontWeight: 500,
        color: '#1B1F23'
      },
      ha_bold: {
        fontSize: '50px',
        fontWeight: 700,
        color: '#1B1F23'
      },
      ha_mid: {
        fontSize: '50px',
        fontWeight: 500,
        color: '#1B1F23'
      },
      hb_bold: {
        fontSize: '40px',
        fontWeight: 700,
        color: '#1B1F23'
      },
      hb_mid: {
        fontSize: '40px',
        fontWeight: 500,
        color: '#1B1F23'
      },
      hc_bold: {
        fontSize: '32px',
        fontWeight: 700,
        color: '#1B1F23'
      },
      hc_mid: {
        fontSize: '32px',
        fontWeight: 500,
        color: '#1B1F23'
      },
      h1_bold: {
        fontSize: '24px',
        fontWeight: 700,
        color: '#1B1F23'
      },
      h1_mid: {
        fontSize: '24px',
        fontWeight: 500,
        color: '#1B1F23'
      },
      h2_bold: {
        fontSize: '22px',
        fontWeight: 700,
        color: '#1B1F23'
      },
      h2_mid: {
        fontSize: '22px',
        fontWeight: 500,
        color: '#1B1F23'
      },
      h3_bold: {
        fontSize: '17px',
        fontWeight: 700,
        color: '#1B1F23'
      },
      h3_mid: {
        fontSize: '17px',
        fontWeight: 500,
        color: '#1B1F23'
      },
      title_bold: {
        fontSize: '18px',
        fontWeight: 700,
        color: '#1B1F23'
      },
      title_mid: {
        fontSize: '18px',
        fontWeight: 500,
        color: '#1B1F23'
      },
      sub_bold: {
        fontSize: '16px',
        fontWeight: 700,
        color: '#1B1F23'
      },
      sub_mid: {
        fontSize: '16px',
        fontWeight: 500,
        color: '#1B1F23'
      },
      body1: {
        fontSize: '14px', 
        fontWeight: 500,
        color: '#1B1F23'
      },
      body2: {
        fontSize: '13px', 
        fontWeight: 500,
        color: '#1B1F23'
      },
      body3: {
        fontSize: '12px', 
        fontWeight: 500,
        color: '#1B1F23'
      },
      body4: {
        fontSize: '11px', 
        fontWeight: 500,
        color: '#1B1F23'
      },
    },
  });

export default theme;