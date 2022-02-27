import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { styled } from '@mui/material/styles';

export const CryptoShares = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}));

export const CryptoList = styled(Stack)(() => ({
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));
