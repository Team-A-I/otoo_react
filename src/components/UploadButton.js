import React from 'react';
import { Button, Tooltip } from '@mui/material';

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
    marginRight: className.includes('upload') ? '8px' : '0',
    marginLeft: className.includes('toggle-input') ? '8px' : '0',
    marginTop: className.includes('textfield') ? '16px' : '0',
    backgroundColor: disabled ? disabledColor : defaultColor,
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: disabled ? disabledColor : hoverColor
    }
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
