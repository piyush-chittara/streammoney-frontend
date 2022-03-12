import { Box, Typography } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Button } from '@shared/components/button';
import { PopoverForm } from '@shared/components/popover-form';
import { SendStreamForm } from '../form';

const renderAnchor = ({ onClick, id }) => (
  <Button id={id} onClick={onClick} startIcon={<ArrowRightAltIcon />}>
    Send
  </Button>
);

export const CreateSendStreamView = ({ onSubmit }) => {
  return (
    <PopoverForm title="Send" renderAnchor={renderAnchor}>
      <Typography variant="h4">Send</Typography>
      <SendStreamForm onSubmit={onSubmit} />
    </PopoverForm>
  );
};
