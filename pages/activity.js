import { Button, Container, List, Typography, Modal, Box, TextField, ListItem } from '@mui/material';
import { useLocalStorage } from '@solana/wallet-adapter-react';
import React, { useState, useEffect } from 'react';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px', 
    boxShadow: 24,
    p: 4,
  };


const LOCAL_STORAGE_KEY = "addressBook";


function Activity() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = useState('');

    const [address, setAddress] = useState('');

    const [addressBook , setAddressBook ] = useState([]);

    
    useEffect(() => {
        // fires when app component mounts to the DOM
        const storageBook = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storageBook) {
            setAddressBook(storageBook);
        }
    }, []);

    useEffect(() => {
        // fires when todos array gets updated
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(addressBook));
    }, [addressBook]);

    const addAddress = () =>  {
        // adds new todo to beginning of todos array
        const newAddress = {
            name: name, 
            address: address
        }
        setAddressBook([newAddress, ...addressBook]);

        setName('')
        setAddress('')

        handleClose();
    }

    return ( 
        <Container >
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add contact
          </Typography>
          <Container id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField id="standard-basic" label="Name" variant="standard" value={name} onChange={(e) => setName(e.target.value) } />
              <TextField id="standard-basic" label="Address" variant="standard" value={address} onChange={(e) => setAddress(e.target.value)} />

          </Container>
          <Button id="modal-modal-button" onClick={addAddress}>
              Add
          </Button>
        </Box>
      </Modal>
            <Container style={{display: 'flex', justifyContent:'space-between', marginTop:'20px'}}>

<Container>
    <Typography variant='h4' style={{fontWeight:'900', color:"eeeee"}}> Address Book </Typography>

    {addressBook &&  addressBook.map((contact) => {
        return (
        <List key={contact.address} style={{display:'flex', justifyContent:'space-between'}}>
            <ListItem>{contact.name}</ListItem>
            <ListItem>{contact.address}</ListItem>
        </List>

        )
    
    })}

</Container>


<Button variant="outlined" style={{maxHeight: '50px'}} onClick={handleOpen}>New contact</Button>

</Container>

        </Container>
        
     );
}

export default Activity;