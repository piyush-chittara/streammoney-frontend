import MuiButton from '@mui/material/Button';

export const Button = ({ children, ...props }) => {
  return (
    <MuiButton
      {...props}
      sx={{
        backgroundColor: 'success.light',
        color: 'common.white',
        textTransform: 'none',
        paddingX: 3,
        borderRadius: 0.5,
        ':hover': {
          backgroundColor: 'success.main',
        },
      }}
    >
      {children}
    </MuiButton>
  );
};
