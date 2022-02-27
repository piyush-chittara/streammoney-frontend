import { Box } from '@mui/material';
import { useRouter } from 'next/router';

import Fade from '@mui/material/Fade';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

import logImg from '@assets/images/stream-money-logo-img.png';
import navigation, { misc } from './navigation';
import { Drawer, DrawerHeader, ListItem, MiscLinksWrapper } from './styles';
import Image from 'next/image';

export const AppDrawer = ({ toggleDrawer, open }) => {
  const { push } = useRouter();

  const renderNavs = ({ key, icon: LinkIcon, title, route }) => (
    <ListItem button key={key} open={open} onClick={() => push(route)}>
      <ListItemIcon>
        <LinkIcon />
      </ListItemIcon>
      <Fade in={open}>
        <ListItemText primary={title} />
      </Fade>
    </ListItem>
  );

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Box onClick={toggleDrawer} sx={{ cursor: 'pointer' }}>
          <Image
            src={logImg}
            alt="stream-money-logo"
            width="56px"
            height="80px"
          />
        </Box>
      </DrawerHeader>

      <List>{navigation.map(renderNavs)}</List>

      <MiscLinksWrapper>
        <List>{misc.map(renderNavs)}</List>
      </MiscLinksWrapper>
    </Drawer>
  );
};
