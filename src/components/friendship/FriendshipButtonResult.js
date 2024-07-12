import React from 'react';
import { Button} from '@mui/material';

const FriendshipButtonResult = ({ onClick, disabled, label, className }) => {
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
      <Button
        variant="contained"
        onClick={onClick}
        disabled={disabled}
        component="span"
        sx={sxStyles}
      >
        {label}
      </Button>
  );
};

export default FriendshipButtonResult;
