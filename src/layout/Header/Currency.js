import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import CurrencyPoundOutlinedIcon from '@mui/icons-material/CurrencyPoundOutlined';

import * as CURRENCY from '../../constants/currency';
import { CurrencyInput, CurrencyWrapper } from './styles';

const currencyIcon = {
  [CURRENCY.USD]: AttachMoneyOutlinedIcon,
  [CURRENCY.INR]: CurrencyRupeeOutlinedIcon,
  [CURRENCY.EUR]: EuroOutlinedIcon,
  [CURRENCY.GBP]: CurrencyPoundOutlinedIcon,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 120,
    },
  },
};

function getStyles(theme) {
  return {
    fontWeight: theme.typography.fontWeightMedium,
  };
}

const ALL_CURRENCIES = Object.values(CURRENCY);

export const Currency = ({ onChange, currency }) => {
  const theme = useTheme();

  return (
    <CurrencyWrapper>
      <FormControl sx={{ width: 120 }}>
        <Select
          onChange={onChange}
          value={currency}
          input={<CurrencyInput />}
          MenuProps={MenuProps}
          inputProps={{
            'aria-label': 'Without label',
          }}
        >
          {ALL_CURRENCIES.map((c) => {
            const CurrencyIcon = currencyIcon[c];

            return (
              <MenuItem key={c} value={c} style={getStyles(theme)}>
                <Box display="flex" alignItems="center" width="100%">
                  <CurrencyIcon />
                  <Typography ml={1}>{c}</Typography>
                </Box>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </CurrencyWrapper>
  );
};

Currency.propTypes = {
  onChange: PropTypes.func,
  currency: PropTypes.oneOf(ALL_CURRENCIES),
};
