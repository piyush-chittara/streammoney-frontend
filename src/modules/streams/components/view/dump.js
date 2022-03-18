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