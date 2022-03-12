import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Select } from '@shared/components/select';
import { JustifyBetween } from '@shared/components/flex';
import { ellipsedId, getAvatarSymbol } from '@utils/string-helpers';

const Styles = {
  avatar: {
    width: '20px',
    height: '20px',
    fontSize: '12px',
    marginRight: 1,
    backgroundColor: 'secondary.main',
  },
};

const addressOptions = [
  {
    label: 'All addresses',
    value: '*',
  },
  {
    label: 'crypto-miner',
    value: 'BwBeze36sBgr31tw4o2YqvFAGZAU1e5tCErQQNoRuz4',
  },
];

const renderOption = ({ label, value }) => {
  return (
    <JustifyBetween>
      {value === '*' ? (
        <Typography ml={1}>{label}</Typography>
      ) : (
        <>
          <Tooltip title={value}>
            <Avatar sx={Styles.avatar} variant="rounded">
              {getAvatarSymbol(label)}
            </Avatar>
          </Tooltip>
          <Typography ml={1}>{label || ellipsedId(value)}</Typography>
        </>
      )}
    </JustifyBetween>
  );
};

export const AddressFilters = ({ onFilterChange }) => {
  const [address, setAddress] = useState(addressOptions[0].value);

  const handleFilterChange = (e) => {
    const value = e.target.value;

    setAddress(value);

    onFilterChange({ address: value });
  };

  return (
    <Box sx={{ width: 180 }}>
      <Select
        options={addressOptions}
        value={address}
        onChange={handleFilterChange}
        renderOption={renderOption}
      />
    </Box>
  );
};
