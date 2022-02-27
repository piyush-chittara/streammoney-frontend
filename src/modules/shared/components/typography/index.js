import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

export const StrongText = ({ children, ...props }) => {
  return (
    <Typography {...props} variant="body1">
      <strong>{children}</strong>
    </Typography>
  );
};

export const BodyText = ({ children, regular = true, ...props }) => {
  return (
    <Typography {...props} variant={regular ? 'body2' : 'body1'}>
      {children}
    </Typography>
  );
};

BodyText.propTypes = {
  content: PropTypes.node,
  regular: PropTypes.bool,
};

export const Caption = ({ children, ...props }) => {
  return (
    <Typography {...props} variant="caption">
      {children}
    </Typography>
  );
};

export const ButtonLabel = ({ children, ...props }) => {
  return (
    <Typography {...props} variant="button">
      {children}
    </Typography>
  );
};
