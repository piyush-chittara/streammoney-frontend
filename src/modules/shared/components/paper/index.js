import MuiPaper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const Paper = styled(MuiPaper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '100%',
}));
