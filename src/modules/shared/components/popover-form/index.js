import PropTypes from 'prop-types';
import MuiPopover from '@mui/material/Popover';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { usePopover } from '@hooks/usePopover';
import { Button } from '../button';
import { OneOf, OneOfType } from '@utils/prop-helpers';
import React from 'react';

const Popover = styled(MuiPopover)(() => ({
  '&.MuiPopover-root': {
    marginTop: '20px',
  },
}));

const defaultOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};

const defaultTransform = {
  vertical: 'top',
  horizontal: 'left',
};

export const PopoverForm = ({
  children,
  renderAnchor,
  title = 'Open',
  origin = defaultOrigin,
  transformOrigin = defaultTransform,
  containerStyle = {},
  ...props
}) => {
  const { open, onClick, onClose, anchorEl, id } = usePopover('popover-form');

  return (
    <>
      {renderAnchor ? (
        renderAnchor({ id, onClick })
      ) : (
        <Button aria-describedby={id} onClick={onClick}>
          {title}
        </Button>
      )}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={origin}
        transformOrigin={transformOrigin}
        {...props}
      >
        <Box
          sx={{
            width: '400px',
            minHeight: '300px',
            p: 2,
            ...containerStyle,
          }}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { onClose });
            }
            return child;
          })}
        </Box>
      </Popover>
    </>
  );
};

PopoverForm.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  origin: PropTypes.shape({
    vertical: OneOfType([OneOf(['bottom', 'center', 'top']), PropTypes.number]),
    horizontal: OneOfType([
      OneOf(['left', 'center', 'right']),
      PropTypes.number,
    ]),
  }),
  transformOrigin: PropTypes.shape({
    vertical: OneOfType([OneOf(['bottom', 'center', 'top']), PropTypes.number]),
    horizontal: OneOfType([
      OneOf(['left', 'center', 'right']),
      PropTypes.number,
    ]),
  }),
  renderAnchor: PropTypes.func,
  containerStyle: PropTypes.shape({}),
};
