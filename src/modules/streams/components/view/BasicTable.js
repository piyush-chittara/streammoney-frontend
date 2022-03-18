import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';




export default function BasicTable({data}) {

  return (
    <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sender</TableCell>
            <TableCell align="right">Recipient</TableCell>
            <TableCell align="right">StartDate</TableCell>
            <TableCell align="right">EndDate</TableCell>
            <TableCell align="right">Amount Paid Till now</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&  data.map( (el,i) => {
            return (
              <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                { el.sender  }
              </TableCell>
              <TableCell align="right">{el.recipient }</TableCell>
              <TableCell align="right">{el.start_time}</TableCell>
              <TableCell align="right">{el.end_time}</TableCell>
              <TableCell align="right">{ el.amount}</TableCell>
            </TableRow>

            )
          }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}