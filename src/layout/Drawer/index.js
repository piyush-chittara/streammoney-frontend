import { useRouter } from "next/router";

import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

import navigation, { misc } from "./navigation";
import { Drawer, DrawerHeader, ListItem, MiscLinksWrapper } from "./styles";

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
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      </DrawerHeader>

      <List>{navigation.map(renderNavs)}</List>

      <MiscLinksWrapper>
        <List>{misc.map(renderNavs)}</List>
      </MiscLinksWrapper>
    </Drawer>
  );
};
