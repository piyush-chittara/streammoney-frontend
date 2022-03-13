import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';

import { drawerWidth } from '../Drawer/styles';

export const CurrencyInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
    },
  },
}));

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  // zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    width: `calc(100% - ${theme.spacing(7)} - 1px)`,
  }),
}));

export const ToolBarWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

export const WalletWrapper = styled('div')(({ theme }) => ({
  padding: `0px ${theme.spacing(2)}`,
  // borderRight: `1px solid ${theme.palette.primary.light}`,
  display: 'flex',
  alignItems: 'center',
  width: 220,
}));

export const WalletInfo = styled('div')(({ theme }) => ({
  padding: `0px ${theme.spacing(2)}`,
  width: '100%',
}));

export const WalletDetails = styled('div')(() => ({
  minWidth: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
}));

export const CurrencyWrapper = styled('div')(({ theme }) => ({
  /* padding: `0px ${theme.spacing(2)}`, */
  // borderLeft: `1px solid ${theme.palette.primary.light}`,
  display: 'flex',
  alignItems: 'center',
  width: 120,
}));
