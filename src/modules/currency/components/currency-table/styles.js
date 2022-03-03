import { styled } from '@mui/material/styles';
import { green, red } from '@mui/material/colors';

import IconButton from '@mui/material/IconButton';

export const ActionButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'action',
})(({ theme, action }) => ({
  color:
    action === 'deposit'
      ? theme.palette.success.main
      : theme.palette.error.main,
  backgroundColor: action === 'deposit' ? green[100] : red[100],
  borderRadius: 2,
  width: 45,
  height: 35,
  '&:hover': {
    backgroundColor: action === 'deposit' ? green[200] : red[200],
  },
}));
