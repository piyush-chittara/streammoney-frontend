import { Box } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Flex } from '@shared/components/flex';
import { Select } from '@shared/components/select';
import { useState } from 'react';

import Typography from '@mui/material/Typography';
import { JustifyBetween } from '@shared/components/flex';
import { getCryptoIcon } from '@shared/icons';
import { CRYPTO_NAME } from '@constants/crypto';
import { Button } from '@shared/components/button';

const TextField = styled(MuiTextField)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
    },
  },
}));

const currencyOptions = [
  { label: 'Select currency', value: '*' },
  ...Object.entries(CRYPTO_NAME).map(([value, label]) => ({ value, label })),
];

const renderOption = ({ label, value }) => {
  const CryptoIcon = value !== '*' ? getCryptoIcon(value) : null;

  return (
    <JustifyBetween>
      {value === '*' ? (
        <Typography ml={1} color="gray.100">
          {label}
        </Typography>
      ) : (
        <Typography ml={1}>{label}</Typography>
      )}
      {CryptoIcon && <CryptoIcon fontSize="small" />}
    </JustifyBetween>
  );
};

const rateOptions = [
  {
    label: '/month',
    value: 'month',
  },
  {
    label: '/week',
    value: 'week',
  },
  {
    label: '/day',
    value: 'day',
  },
  {
    label: '/hour',
    value: 'hour',
  },
];

const initialValues = {
  rate: 'month',
  currency: '*',
  address: '',
  amount: '',
};

const rateMap = {
  month: 30 * 24 * 3600,
  week: 7 * 24 * 3600,
  day: 1 * 24 * 3600,
  hour: 3600,
};

const prepareValues = (values = {}) => {
  const { amount, ...rest } = values;

  return { ...rest, amount: parseInt(amount, 10) };
};

export const SendStreamForm = ({ onSubmit, onClose }) => {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const handleValueChange = (value, name) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const handleChange = (e, name) => handleValueChange(e.target.value, name);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await onSubmit(prepareValues(values));

      setValues(initialValues);
      onClose();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex flexDirection="column" sx={{ mt: 2 }}>
      <Box width="100%" sx={{ marginTop: 1 }}>
        <TextField
          fullWidth
          placeholder="Enter address"
          onChange={(e) => handleChange(e, 'address')}
          value={values['address']}
        />
      </Box>
      <Box width="100%" sx={{ my: 1 }}>
        <Select
          onChange={(e) => handleChange(e, 'currency')}
          renderOption={renderOption}
          options={currencyOptions}
          value={values['currency']}
          placeholder="Select currency"
        />
      </Box>
      <Grid container spacing={0.5} sx={{ marginBottom: 1 }}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            placeholder="0.00"
            value={values['amount']}
            onChange={(e) => handleChange(e, 'amount')}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            options={rateOptions}
            value={values['rate']}
            onChange={(e) => handleChange(e, 'rate')}
          />
        </Grid>
      </Grid>

      <Box width="100%" sx={{ mt: 4 }}>
        <Button fullWidth disabled={loading} onClick={handleSubmit}>
          Sart streaming
        </Button>
      </Box>
    </Flex>
  );
};
