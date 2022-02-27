import PropTypes from 'prop-types';
import { Container, Typography, Box, Stack } from '@mui/material';

import { getCryptoIcon } from '@shared/icons';
import { Paper } from '@shared/components/paper';
import { priceToString } from '@utils/string-helpers';
import { sortByField } from '@utils/object-helpers';

import { CryptoList, CryptoShares } from './styles';

const dummyTokens = [
  {
    id: 'ether',
    name: 'ETHx',
    value: 128.78,
  },
  {
    id: 'solana',
    name: 'SOLx',
    value: 20,
  },
  {
    id: 'ripple',
    name: 'XRPx',
    value: 30,
  },
  {
    id: 'binance',
    name: 'XRPx',
    value: 25,
  },
];

export const BalanceSummary = ({ balance = 178.87, tokens = dummyTokens }) => {
  const topThree = sortByField([...tokens], 'value').slice(0, 3);

  return (
    <Paper>
      <Container>
        <Box sx={{ textAlign: 'left', width: '100%', marginBottom: 1 }}>
          <Typography variant="button" sx={{ color: 'gray' }}>
            Your Balance in USD
          </Typography>
          <Typography variant="h4">{priceToString(balance)}</Typography>

          <CryptoList spacing={2} sx={{ marginTop: 4 }}>
            <Box sx={{ textAlign: 'left', width: '100%' }}>
              <Typography variant="button" sx={{ color: 'gray' }}>
                Top three crypto
              </Typography>
            </Box>
            {topThree.map(({ id, name, value }) => {
              const CryptoIcon = getCryptoIcon(id);

              return (
                <CryptoShares key={id}>
                  <Box display="flex" alignItems="center">
                    <CryptoIcon />
                    <Typography variant="body2" sx={{ marginLeft: 1.5 }}>
                      {name}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {priceToString(value)}
                  </Typography>
                </CryptoShares>
              );
            })}
          </CryptoList>
        </Box>
      </Container>
    </Paper>
  );
};

BalanceSummary.propTypes = {
  balance: PropTypes.number.isRequired,
  tokens: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
