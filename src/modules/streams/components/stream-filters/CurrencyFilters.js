import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Select } from '@shared/components/select';
import { JustifyBetween } from '@shared/components/flex';
import { getCryptoIcon } from '@shared/icons';
import { CRYPTO_NAME } from '@constants/crypto';

const currencyOptions = [
  {
    label: 'All currencies',
    value: '*',
  },
  ...Object.entries(CRYPTO_NAME).map(([value, label]) => ({ value, label })),
];

const renderOption = ({ label, value }) => {
  const CryptoIcon = value !== '*' ? getCryptoIcon(value) : null;

  return (
    <JustifyBetween>
      <Typography ml={1}>{label}</Typography>
      {CryptoIcon && <CryptoIcon fontSize="small" />}
    </JustifyBetween>
  );
};

export const CurrencyFilters = ({ onFilterChange }) => {
  const [currency, setCurrency] = useState(currencyOptions[0].value);

  const handleFilterChange = (e) => {
    const value = e.target.value;

    setCurrency(value);

    onFilterChange({ currency: value });
  };

  return (
    <Box sx={{ width: 180 }}>
      <Select
        options={currencyOptions}
        value={currency}
        onChange={handleFilterChange}
        renderOption={renderOption}
      />
    </Box>
  );
};
