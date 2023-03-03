import React from 'react';
import { Tooltip, Zoom } from '@mui/material';


const CryptoPairTooltip = ({ title, children }) => {
  return <Tooltip title={title} TransitionComponent={Zoom} arrow>{children}/</Tooltip>;
};

export default CryptoPairTooltip;
