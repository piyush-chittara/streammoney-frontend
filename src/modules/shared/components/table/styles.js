import MuiTableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const TableCell = styled(MuiTableCell)(() => ({
  height: '75px',
  borderBottom: '1px solid rgba(235, 235, 235, 1)',
}));

export const NoDataContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const NoDataContent = styled(Box)(() => ({
  textAlign: 'center',
  color: 'rgba(128, 128, 128, 0.6)',
}));
