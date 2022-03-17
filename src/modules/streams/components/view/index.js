import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { JustifyBetween } from '@shared/components/flex';
import { Filters } from '../stream-filters';
import { StreamTable } from '../stream-table';

import { streamLayout } from '@modules/wallet/newUtil';



export const StreamsView = () => {
  const [filters, setFilters] = useState({});

  const [data, setData] = useState();

  const onFilterChange = (filter = {}) => {
    setFilters((prev) => ({ ...prev, ...filter }));
  };

  const resetFilters = () => setFilters({});

  useEffect(() => {
    async function getData() {
      const listData = await fetch('https://api.devnet.solana.com', {
        method:"POST", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "jsonrpc": "2.0",
          "id": "123124",
          "method": "getProgramAccounts",
          "params": [
            "2SDZD4qRjff25ANjs3FxTSxFkWnJgHcykqYrfL8JcP6d",
             {
                  "encoding": "base64",
                  "commitment": "confirmed"
             }
          ]
      }
      )
      })

      const jsonData = await listData.json()

      const encodedData = jsonData.result[0].account.data

      console.log(jsonData)
      setData(jsonData);
    }

    getData()
  },[]) 

  
function convert() {
  const encodedData = data.result[0].account.data[0]

  console.log(data, "this si workinsdflkdsnmfk sd")
  const info = streamLayout.decode(Buffer.from(encodedData))
      console.log(info)
    // console.log(newData)
}

  return (
    <Container maxWidth="100%">
      <button onClick={() => convert()}>convert</button>
      <JustifyBetween paddingY={2}>
        <Typography variant="h4">Streams</Typography>
        <Filters onFilterChange={onFilterChange} />
      </JustifyBetween>
      <StreamTable filters={filters} resetFilters={resetFilters} />


    </Container>
  );
};
