import { Avatar, Box, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { CANCELED, DEPOSITED, STREAMING, WITHDREW } from '@constants/activites';
import { CRYPTO_NAME } from '@constants/crypto';
import { getActivityIcon, getCryptoIcon, LinkIcon } from '@shared/icons';
import {
  formatDate,
  ellipsedId,
  priceToString,
  capitalize,
  getAvatarSymbol,
} from '@utils/string-helpers';
import { ActivityItemContainer, ActivityDetails } from './styles';
import { JustifyBetween } from '@shared/components/flex';

const formatTimeStamp = (date) => formatDate(date, { timeStyle: 'short' });

export const ActivityItem = ({
  id,
  nickName,
  startDate,
  endDate,
  activity,
  streamType,
  currency,
  status,
  rate,
  txLink,
  amount,
  cryptoQty,
}) => {
  const ActivityIcon = getActivityIcon(activity);
  const CryptoIcon = getCryptoIcon(currency);

  const getActivityIconColor = (a, s) => {
    if (a === STREAMING) {
      return s === 'incoming' ? 'success' : 'error';
    }

    return a === DEPOSITED ? 'success' : 'error';
  };

  const crypto = (
    <Box ml={1} sx={{ display: 'flex', alignItems: 'center' }}>
      <CryptoIcon />{' '}
      {[WITHDREW, DEPOSITED].includes(activity) ? (
        <span style={{ margin: '0px 5px' }}>{cryptoQty}</span>
      ) : (
        ''
      )}{' '}
      <span style={{ margin: '0px 5px' }}>{CRYPTO_NAME[currency]}</span>
    </Box>
  );

  return (
    <ActivityItemContainer
      sx={{
        border: '1px solid',
        borderColor: 'grey.300',
        my: 1,
        borderRadius: 1,
      }}
    >
      <ActivityDetails>
        <Typography variant="body1">
          {formatTimeStamp(new Date(endDate))}
        </Typography>

        <Box
          style={{
            transform: streamType === 'incoming' ? 'rotate(180deg)' : '',
            display: 'flex',
            alignItems: 'center',
            margin: '0px 15px',
          }}
        >
          <ActivityIcon
            fontSize="small"
            color={getActivityIconColor(activity, streamType)}
          />
        </Box>

        <Typography variant="body1">
          {capitalize(activity === STREAMING ? streamType : activity)}{' '}
          {[STREAMING, CANCELED].includes(activity) ? 'Stream in' : ''}
        </Typography>
        {crypto}
        {[STREAMING, CANCELED].includes(activity) ? (
          <>
            <Typography variant="body1">
              {streamType === 'outgoing' ? 'to' : 'from'}
            </Typography>
            <Avatar
              sx={{
                width: '30px',
                height: '30px',
                fontSize: '14px',
                marginRight: 1,
                backgroundColor: 'secondary.main',
                marginLeft: 1,
              }}
              variant="rounded"
            >
              {getAvatarSymbol(nickName)}
            </Avatar>
            <Typography variant="body1">{capitalize(nickName)}</Typography>
            {activity === STREAMING && (
              <>
                {' '}
                <Typography variant="body1" sx={{ ml: 0.5 }}>
                  {`of ${priceToString(amount)} ${rate}`}
                </Typography>
                {streamType === 'incoming' ? (
                  <ArrowDropUpIcon color="success" />
                ) : (
                  <ArrowDropDownIcon color="error" />
                )}
              </>
            )}
          </>
        ) : null}
      </ActivityDetails>
      <JustifyBetween
        sx={{
          border: '1px solid',
          borderColor: 'grey.300',
          color: 'grey.500',
          borderRadius: 1,
          width: '200px',
          px: 1,
          py: 0.5,
          fontSize: '13px',
          fontWeight: 'bold',
        }}
      >
        Tx: {ellipsedId(txLink)}
        <LinkIcon fontSize="small" />
      </JustifyBetween>
    </ActivityItemContainer>
  );
};
