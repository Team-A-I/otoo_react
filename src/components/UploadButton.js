import React from 'react';
import { Button, Tooltip } from '@mui/material';
import ReactGA from 'react-ga';

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
    color: '#ffffff',
    '&:hover': {
      backgroundColor: disabled ? disabledColor : hoverColor
    },
    width: '100%',
    height: '50px',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 1300,
    borderRadius: 20,
    fontSize: '20px',
  };

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
    ReactGA.event({
      category: 'User',
      action: 'Clicked Upload Button',
      label: 'File Upload'
    });
  };

  return (
    <Tooltip title={title_str} arrow>
      <Button
        variant="contained"
        onClick={handleClick}
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
