import { Box, Typography } from '@mui/material';
import TableRow from '@mui/material/TableRow';

import { NoDataIcon } from '@shared/icons';
import { NoDataContainer, NoDataContent, TableCell } from './styles';

export const NoData = ({ colSpan, noData }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} sx={{ height: '300px' }}>
        <NoDataContainer>
          <NoDataContent>
            {noData || (
              <>
                <NoDataIcon sx={{ fontSize: 80 }} />
                <Box>
                  <Typography variant="h6">No Data found</Typography>
                </Box>
              </>
            )}
          </NoDataContent>
        </NoDataContainer>
      </TableCell>
    </TableRow>
  );
};
