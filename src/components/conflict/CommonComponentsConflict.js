import React from 'react';
import { Paper, Typography, Tooltip, Button, Grid , Box } from '@mui/material';

// 공통 paper 프레임
export const CustomPaper = ({ children, ...props }) => (
  <Paper elevation={3} style={{ padding: '24px', borderRadius: '35px', ...props.style }}>
    {children}
  </Paper>
);

// 세부 분석 카드 컴포넌트
export const AttributeCard = ({ title, percentage, tooltip, imageSrc }) => (
  <Paper elevation={3} style={{ padding: '16px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' , minHeight: '250px'}}>
    <Box>
      <Typography variant="sub_bold">
        {title}
      </Typography>
      <img src={imageSrc} alt={`${title} 이미지`} style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover', marginBottom: '16px', flexGrow: 1 }} />
      <Typography variant="h3_bold">
        {percentage}%
      </Typography>
      <br></br>
      <Tooltip title={tooltip} arrow>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            fontSize: { xs: 8, sm: 8, md: 10, xl: 15 },
            marginTop: '8px',
            borderColor: '0495D2',
            color: '0495D2',
            '&:hover': {
              borderColor: '0350B7',
              color: '0350B7',          },
          }}
        >
          설명보기
        </Button>
      </Tooltip>
    </Box>
  </Paper>
);

// 결과페이지 타이틀
export const TitleSection = ({ titleText, imgSrc, imgAlt }) => (
  <Grid item xs={12}>
    <Paper elevation={4} sx={{ borderRadius: '35px' }}>
      <Box>
        <Grid container alignItems="flex-start">
          <Grid item xs={12} sm={4}>
            <Grid container justifyContent="center" alignItems="start" direction="column" style={{ height: '100%', minHeight: '220px'}}> 
              <Box ml={5}>
              <Typography variant="h1_bold" color="gray900" gutterBottom dangerouslySetInnerHTML={{ __html: titleText }} />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
              <img src={imgSrc} alt={imgAlt} style={{ maxHeight: '220px', maxWidth: '100%' }} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  </Grid>
);
