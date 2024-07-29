import { createTheme, responsiveFontSizes } from '@mui/material';
// 테마 생성
let theme = createTheme({
  palette: {
    primary: {
      main: '#04613E',
      contrastText: '#fff',
    },
    oblack: '#333333',
    owhite: '#F8F7F3',
    darkgreen: '#04613E',
    lightgreen: '#01A762',
    vlightgreen: '#01A76280',
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
      gray200: '#E1E1E1',
      gray100: '#f1f1f1'
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
    verybig_bold:{
      fontSize: '130px',
      [createTheme().breakpoints.down('lg')]: {
        fontSize: '90px',
      },
      [createTheme().breakpoints.down('md')]: {
        fontSize: '60px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '50px',
      },
      fontWeight: 700,
      color: '#1B1F23'
    },
    hbig_bold:{
      fontSize: '95px',
      [createTheme().breakpoints.down('lg')]: {
        fontSize: '68px',
      },
      [createTheme().breakpoints.down('md')]: {
        fontSize: '50px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '40px',
      },
      fontWeight: 700,
      color: '#1B1F23'
    },
    hbig_mid:{
      fontSize: '95px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '75px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '56px',
      },
      fontWeight: 500,
      color: '#1B1F23'
    },
    ha_bold: {
      fontSize: '60px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '50px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '38px',
      },
      fontWeight: 700,
      color: '#1B1F23'
    },
    ha_mid: {
      fontSize: '60px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '50px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '38px',
      },
      fontWeight: 500,
      color: '#1B1F23'
    },
    hb_bold: {
      fontSize: '47px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '41px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '18px',
      },
      fontWeight: 700,
      color: '#1B1F23'
    },
    hb_mid: {
      fontSize: '47px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '41px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '32px',
      },
      fontWeight: 500,
      color: '#1B1F23'
    },
    hc_bold: {
      fontSize: '30px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '20px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '10px',
      },
      fontWeight: 700,
      color: '#1B1F23'
    },
    hc_mid: {
      fontSize: '32px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '29px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '25px',
      },
      fontWeight: 500,
      color: '#1B1F23'
    },
    h1_bold: {
      fontSize: '24px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '21px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '20px',
      },
      fontWeight: 700,
      color: '#1B1F23'
    },
    h1_mid: {
      fontSize: '24px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '21px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '20px',
      },
      fontWeight: 500,
      color: '#1B1F23'
    },
    h2_bold: {
      fontSize: '22px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '19px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '19px',
      },
      fontWeight: 700,
      color: '#1B1F23'
    },
    h2_bold2: {
      fontSize: '22px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '19px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '16px',

      },
      fontWeight: 700,
      color: '#1B1F23'
    },
    h2_mid: {
      fontSize: '22px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '19px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '1px',
      },
      fontWeight: 500,
      color: '#1B1F23'
    },
    h3_bold: {
      fontSize: '17px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '15px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '14px',
      },
      fontWeight: 700,
      color: '#1B1F23'
    },
    h3_mid: {
      fontSize: '17px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '16px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '14px',
      },
      fontWeight: 500,
      color: '#1B1F23'
    },
    title_bold: {
      fontSize: '18px',
      [createTheme().breakpoints.down('lg')]: {
        fontSize: '16px',
      },
      [createTheme().breakpoints.down('md')]: {
        fontSize: '14px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '14px',
      },
      fontWeight: 700,
      color: '#1B1F23'
    },
    title_mid: {
      fontSize: '18px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '17px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '16px',
      },
      fontWeight: 500,
      color: '#1B1F23'
    },
    sub_bold: {
      fontSize: '16px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '15px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '11px',
      },
      fontWeight: 700,
      color: '#1B1F23'
    },
    sub_mid: {
      fontSize: '16px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '15px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '14px',
      },
      fontWeight: 500,
      color: '#1B1F23'
    },
    body1: {
      fontSize: '14px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '13px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '12px',
      },
      fontWeight: 500,
      color: '#1B1F23'
    },
    body2: {
      fontSize: '13px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '12px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '11px',
      },
      fontWeight: 500,
      color: '#1B1F23'
    },
    body3: {
      fontSize: '12px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '11px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '10px',
      },
      fontWeight: 500,
      color: '#1B1F23'
    },
    body4: {
      fontSize: '11px',
      [createTheme().breakpoints.down('md')]: {
        fontSize: '10px',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '9px',
      },
      fontWeight: 500,
      color: '#1B1F23'
    },
  },
});
// 반응형 폰트 크기 적용
theme = responsiveFontSizes(theme);
export default theme;