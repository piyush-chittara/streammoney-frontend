import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { getCryptoIcon } from '@shared/icons';
import { getAvatarSymbol, roundTo } from '@utils/string-helpers';
import {
  JustifyEnd,
  JustifyStart,
  JustifyBetween,
} from '@shared/components/flex';

const Styles = {
  avatar: {
    width: '30px',
    height: '30px',
    fontSize: '14px',
    marginRight: 1,
    backgroundColor: 'secondary.main',
  },
  item: {
    flexGrow: 0,
    flexBasis: '50%',
  },
  wrapper: {
    padding: 2,
    border: '1px solid',
    borderColor: 'grey.300',
    borderRadius: 1.5,
  },
};

export const Stream = ({ userId, direction, token, value }) => {
  const CryptoIcon = getCryptoIcon(token);

  return (
    <JustifyBetween sx={Styles.wrapper}>
      <JustifyStart sx={Styles.item}>
        <Avatar sx={Styles.avatar} variant="rounded">
          {getAvatarSymbol(userId)}
        </Avatar>
        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
          {userId}
        </Typography>
      </JustifyStart>
      <JustifyEnd sx={Styles.item}>
        <CryptoIcon />
        <Box ml={1}>{roundTo(value)}</Box>
        {direction === 'incoming' ? (
          <ArrowDropUpIcon color="success" />
        ) : (
          <ArrowDropDownIcon color="error" />
        )}
      </JustifyEnd>
    </JustifyBetween>
  );
};
