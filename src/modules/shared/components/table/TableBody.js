import MuiTableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import get from 'lodash.get';

import { TableCell } from './styles';
import { NoData } from './NoData';

export const TableBody = ({ columns, data, isLoading, noData }) => {
  return (
    <MuiTableBody>
      {data.length ? (
        data.map((d, rowIndex) => {
          return (
            <TableRow key={`row_${rowIndex}`}>
              {columns.map(({ id, path, cell, colStyles = {} }, cellIndex) => {
                const value = get(d, path || id, '');

                return (
                  <TableCell
                    key={`cell_${cellIndex}`}
                    sx={{
                      ...colStyles,
                    }}
                  >
                    {cell ? cell({ value, rowData: d }) : value}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })
      ) : (
        <NoData colSpan={columns.length} noData={noData} />
      )}
    </MuiTableBody>
  );
};
