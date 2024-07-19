import React from 'react';
import { Button, Tooltip, Box } from '@mui/material';

const UploadButton = ({
  onClick,
  disabled,
  label,
  className,
  title_str,
  defaultColor,
  hoverColor,
  disabledColor
}) => {
  const sxStyles = {
    backgroundColor: disabled ? disabledColor : defaultColor,
    color: '#3A1D1D',
    '&:hover': {
      backgroundColor: disabled ? disabledColor : hoverColor
    },
    width: '100%',
    height: '70px',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 1300,
    borderRadius: 0,
    fontSize: '16px'
  };

  return (
    <Tooltip title={title_str} arrow>
      <Button
        variant="contained"
        onClick={onClick}
        disabled={disabled}
        component="span"
        sx={sxStyles}
      >
        {label}
      </Button>
    </Tooltip>
  );
};

export default UploadButton;
