import React from 'react';
import { styled } from '@mui/material/styles';
import { Tooltip, Button, tooltipClasses } from '@mui/material';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));


const FriendshipButton = ({ onClick, disabled, label, className }) => {
  const sxStyles = {
    marginRight: className.includes('upload') ? '8px' : '0',
    marginLeft: className.includes('toggle-input') ? '8px' : '0',
    marginTop: className.includes('textfield') ? '16px' : '0',
    backgroundColor: disabled ? '#B0B0B0' : '#0495D2',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: disabled ? '#B0B0B0' : '#295961'
    }
  };

  return (
    <LightTooltip title="카톡 캡쳐이미지 또는 txt파일만 올려주세요" arrow>
      <Button
        variant="contained"
        onClick={onClick}
        disabled={disabled}
        component="span"
        sx={sxStyles}
      >
        {label}
      </Button>
    </LightTooltip>
  );
};

export default FriendshipButton;
