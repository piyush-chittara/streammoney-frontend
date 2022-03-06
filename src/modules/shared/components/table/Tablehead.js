import MuiTableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { TableCell } from './styles';

export const TableHead = ({ columns }) => {
  const renderHeader = (header) => {
    if (typeof header === 'function') return header();

    return (
      <Typography variant="button" fontSize="12px">
        {header}
      </Typography>
    );
  };

  return (
    <MuiTableHead>
      <TableRow>
        {columns.map(({ header, colStyles = {} }, headerIndex) => {
          return (
            <TableCell
              key={`header_${headerIndex}`}
              sx={{
                color: 'gray',
                ...colStyles,
              }}
            >
              {renderHeader(header)}
            </TableCell>
          );
        })}
      </TableRow>
    </MuiTableHead>
  );
};
