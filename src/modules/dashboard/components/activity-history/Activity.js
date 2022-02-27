import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import { JustifyStart } from '@shared/components/flex';
import { CANCELED, WITHDREW, STREAMING, DEPOSITED } from '@constants/activites';
import { formatDate } from '@utils/string-helpers';
import { OneOf } from '@utils/prop-helpers';
import { ActivityDetails } from './ActivityDetails';

const ACTIVITY_ICON = {
  [CANCELED]: CloseIcon,
  [WITHDREW]: RemoveIcon,
  [STREAMING]: ArrowRightAltIcon,
  [DEPOSITED]: AddIcon,
};

const getActivityIconColor = (activity, streamForm) => {
  if (activity === STREAMING) {
    return streamForm ? 'success' : 'error';
  }

  return activity === DEPOSITED ? 'success' : 'error';
};

const formatActivityTime = (date) => {
  return `${formatDate(date, {
    month: 'short',
    day: 'numeric',
  })}, ${formatDate(date, { timeStyle: 'short' })}`;
};

export const Activity = ({
  id,
  timestamp,
  activity,
  token,
  value,
  streamTo,
  streamForm,
  rate,
}) => {
  const ActivityIcon = ACTIVITY_ICON[activity];

  return (
    <JustifyStart key={id} padding={2}>
      <Typography variant="body1">{formatActivityTime(timestamp)}</Typography>
      <Box
        sx={{
          mx: 1,
          transform: streamForm ? 'rotate(180deg)' : '0deg',
        }}
      >
        <ActivityIcon
          fontSize="small"
          color={getActivityIconColor(activity, streamForm)}
        />
      </Box>
      <ActivityDetails
        {...{
          activity,
          token,
          value,
          streamTo,
          streamForm,
          rate,
        }}
      />
    </JustifyStart>
  );
};

Activity.propTypes = {
  id: PropTypes.string,
  activity: OneOf([CANCELED, WITHDREW, STREAMING, DEPOSITED]),
  timestamp: PropTypes.number,
  token: PropTypes.string,
  value: PropTypes.number,
  streamTo: PropTypes.string,
  streamForm: PropTypes.string,
  rate: PropTypes.string,
};
