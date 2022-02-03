import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';

import { AppBar } from './AppBar';
import { AppDrawer } from './Drawer';
import { Header } from './Header';

export const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: 'common.white' }}>
          <Header />
        </Toolbar>
      </AppBar>
      <AppDrawer toggleDrawer={toggleDrawer} open={open} />
      <Box component="main" sx={{ flexGrow: 1, pt: 10 }}>
        {children}
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
