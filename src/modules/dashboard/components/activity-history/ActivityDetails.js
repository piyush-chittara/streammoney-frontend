import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { getCryptoIcon } from '@shared/icons';
import { capitalize, priceToString } from '@utils/string-helpers';
import { CANCELED, WITHDREW, STREAMING, DEPOSITED } from '@constants/activites';

export const ActivityDetails = ({
  activity,
  token,
  value,
  streamTo,
  streamForm,
  rate,
}) => {
  const CryptoIcon = getCryptoIcon(token);

  const icon = (
    <Box sx={{ mx: 1 }}>
      <CryptoIcon />
    </Box>
  );

  if (activity === WITHDREW || activity === DEPOSITED) {
    return (
      <>
        <Typography variant="body1">{capitalize(activity)}</Typography>
        {icon}
        <Typography variant="body1">{priceToString(value)}</Typography>
      </>
    );
  }

  if (activity === CANCELED || activity === STREAMING) {
    return (
      <>
        <Typography variant="body1">
          {`${capitalize(activity)} ${
            activity === CANCELED
              ? 'streaming in'
              : `${priceToString(value)} ${rate} in`
          }`}
        </Typography>
        {icon}
        <Typography variant="body1">
          {`${streamTo ? 'to' : 'from'}`}{' '}
          <strong>{streamTo || streamForm}</strong>
        </Typography>
      </>
    );
  }
};
