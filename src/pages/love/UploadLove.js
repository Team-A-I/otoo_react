import React from 'react';
import FileUploadLove from '../../components/love/FileUploadLove';
import { Button, Container, TextField, Typography, Box, Grid, ThemeProvider } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import '../../css/uploadlove.css';
import theme from '../../theme';

const UploadLove = () => {
    return (
    <Container maxWidth="md">
      <ThemeProvider theme={theme}>
      <div style={{ fontFamily: theme.typography.fontFamily }}>
      <Box className="container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="ha_bold" color="lightpurple" className='header-text'>
              누가 더{'\n'}좋아해?{'\n'}묻지{'\n'}마세요
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader/>
                <CardMedia
                    component="img"
                    height="300"
                    image='/otoo_react/images/lovemain.jpg'
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                    카카오톡을 분석해스으 누가 더 좋아하는지 알려주마. 이것은 AI가 평가한 사랑의 척도 한 번 비교해보자고요!
                    </Typography>
                </CardContent>
            </Card>
            {/* <Box className="image-box">
              <img src={lovemain} alt="Bup" className="image" />
              <Typography variant="body1" color="textSecondary">
                끝나지 않는 언쟁 <br /> 이제는 <span className="highlight">몇대몇</span>이 해결 해드립니다.
              </Typography>
            </Box> */}
          </Grid>
        </Grid>
        <FileUploadLove></FileUploadLove>
      </Box>
      </div>
      </ThemeProvider>
    </Container>
    );
};

export default UploadLove;