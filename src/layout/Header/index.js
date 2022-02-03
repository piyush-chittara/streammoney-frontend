import { useState } from 'react';

import { WalletBalance } from './WalletBalance';
import { WalletMeta } from './WalletMeta';

import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';

import { CurrencyWrapper, ToolBarWrapper, WalletDetails } from './styles';

const currencyIcon = {
  USD: AttachMoneyOutlinedIcon,
  INR: CurrencyRupeeOutlinedIcon,
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

export const Header = () => {
  const theme = useTheme();
  const [currency, setCurrency] = useState('USD');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrency(value);
  };

  return (
    <ToolBarWrapper>
      <WalletDetails>
        <WalletMeta />
        <Divider orientation="vertical" flexItem />
        <WalletBalance balance={1784.34} currency={currency} />
      </WalletDetails>
      <CurrencyWrapper>
        <FormControl sx={{ width: 120 }}>
          <Select
            onChange={handleChange}
            value={currency}
            input={<OutlinedInput />}
            MenuProps={MenuProps}
            inputProps={{
              'aria-label': 'Without label',
            }}
          >
            {['USD', 'INR'].map((c) => {
              const CurrIcon = currencyIcon[c];
              return (
                <MenuItem key={c} value={c} style={getStyles(theme)}>
                  <Box display="flex" alignItems="center" width="100%">
                    <CurrIcon />
                    <Typography ml={1}>{c}</Typography>
                  </Box>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </CurrencyWrapper>
    </ToolBarWrapper>
  );
};
