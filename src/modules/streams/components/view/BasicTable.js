import {useMemo} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Keypair } from '@solana/web3.js';



export default function BasicTable({data}) {

  const newData = data.map( (el) => {
    const startTime = new Date(el.start_time * 1000).toUTCString();

    const endTime = new Date(el.end_time * 1000).toUTCString();

    const sender =  Keypair.fromSeed(el.sender ).publicKey.toString()
    const recipient =  Keypair.fromSeed(el.recipient).publicKey.toString();

    const amount = el.amount

    const jsondata = {
      "start_time": startTime, 
      "end_time": endTime,
      "sender": sender, 
      "recipient": recipient, 
      "amount": amount
    
    }
    return jsondata
  })

  console.log('this si the new dat',newData)
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
          {newData.map( (el,i) => {
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