import { useState } from 'react';

export const usePopover = (anchorId = 'popover-anchor') => {
  const [anchorEl, setAnchorEl] = useState(null);

  const onClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? anchorId : undefined;

  return { open, anchorEl, onClick, onClose, id };
};
