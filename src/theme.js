import { createTheme, responsiveFontSizes } from '@mui/material';

// 테마 생성
let theme = createTheme({
  palette: {
    lightblue: '#0495D2',
    creamgray: '#F1F0EB',
    deepblue: '#0350B7',
    lightpurple: '#ECD3D8',
    peach: '#FFCFAA',
    dyellow: '#EECA42',
    green: '#346F79',
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
    // 96px
    h1: {
      fontWeight: 700,
      color: '#1B1F23'
    },
    // 60px
    h2: {
      fontWeight: 700,
      color: '#1B1F23'
    },
    //48px
    h3: {
      color: '#1B1F23'
    },
    //34px
    h4: {
      color: '#1B1F23'
    },
    //24px
    h5: {
      color: '#1B1F23'
    },
    //20px
    h6: {
      color: '#1B1F23'
    },
    //16px
    subtitle1: {
      color: '#1B1F23'
    },
    //14px
    subtitle2: {
  
      color: '#1B1F23'
    },
    //16px
    body1: {
      color: '#1B1F23'
    },
    //14px
    body2: {
      color: '#1B1F23'
    },
    //14px
    button: {
      color: '#1B1F23'
    },
    //12px
    caption: {
      color: '#1B1F23'
    },
    //10px
    overline: {
      color: '#1B1F23'
    },
  },
});

// 반응형 폰트 크기 적용
theme = responsiveFontSizes(theme);

export default theme;
