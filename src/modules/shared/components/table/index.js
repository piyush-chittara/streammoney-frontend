import * as React from 'react';
import PropTypes from 'prop-types';
import MuiTable from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import { TableHead } from './Tablehead';
import { TableBody } from './TableBody';

export const Table = ({ data, columns, isLoading, noData }) => {
  return (
    <TableContainer component={Paper} sx={{ borderColor: 'gray' }}>
      <MuiTable>
        <TableHead columns={columns} />
        <TableBody
          columns={columns}
          data={data}
          isLoading={isLoading}
          noData={noData}
        />
      </MuiTable>
    </TableContainer>
  );
};

const Column = PropTypes.shape({
  id: PropTypes.string.isRequired,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  cell: PropTypes.func,
  colStyles: PropTypes.shape({}),
});

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  columns: PropTypes.arrayOf(Column).isRequired,
  isLoading: PropTypes.bool,
  noData: PropTypes.element,
};
