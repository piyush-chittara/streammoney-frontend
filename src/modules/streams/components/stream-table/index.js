import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { CRYPTO_NAME } from '@constants/crypto';

import { JustifyStart } from '@shared/components/flex';
import { Table } from '@shared/components/table';
import { getCryptoIcon } from '@shared/icons';
import {
  capitalize,
  ellipsedId,
  formatTime,
  getAvatarSymbol,
  priceToString,
} from '@utils/string-helpers';

import mock from './mock';
import { useEffect, useState } from 'react';
import { jsonToQuery } from '@utils/object-helpers';
import { usePrevious } from '@hooks/usePrevious';

const Styles = {
  avatar: {
    width: '20px',
    height: '20px',
    fontSize: '12px',
    marginRight: 1,
    backgroundColor: 'secondary.main',
  },
};

const StreamWith = ({ address, nickName }) => {
  return (
    <JustifyStart>
      <Avatar sx={Styles.avatar} variant="rounded">
        {getAvatarSymbol(nickName)}
      </Avatar>
      <Typography ml={1}>
        {capitalize(nickName) || ellipsedId(address)}
      </Typography>
    </JustifyStart>
  );
};

const Currency = ({ currency }) => {
  const CryptoIcon = getCryptoIcon(currency);

  return (
    <JustifyStart>
      <CryptoIcon fontSize="small" />
      <Typography ml={1}>{`${CRYPTO_NAME[currency]}x`}</Typography>
    </JustifyStart>
  );
};

export const Flow = ({ flow, type, showSign = true }) => {
  const flowSign =
    type === 'incoming' ? (
      <AddIcon sx={{ fontSize: 13 }} />
    ) : (
      <RemoveIcon sx={{ fontSize: 13 }} />
    );

  return (
    <JustifyStart>
      {showSign ? flowSign : null}
      {priceToString(flow)}{' '}
      {type === 'incoming' ? (
        <ArrowDropUpIcon color="success" />
      ) : (
        <ArrowDropDownIcon color="error" />
      )}
    </JustifyStart>
  );
};

const columns = [
  {
    id: 'withUser',
    header: 'To/From',
    cell: ({ rowData }) => (
      <StreamWith address={rowData.address} nickName={rowData.nickName} />
    ),
  },
  {
    id: 'duration',
    header: 'Start / End Date',
    cell: ({ rowData }) =>
      `${formatTime(rowData.startDate)} - ${formatTime(rowData.endDate)}`,
  },
  {
    id: 'streamType',
    header: 'Streams',
    cell: ({ value }) => `${capitalize(value)}`,
  },
  {
    id: 'currency',
    header: 'Currency',
    cell: ({ value }) => <Currency currency={value} />,
  },
  {
    id: 'flow',
    header: 'Incoming/Outgoing Per Month in USD',
    cell: ({ rowData }) => (
      <Flow flow={rowData.flow} type={rowData.streamType} />
    ),
    colStyles: {
      minWidth: 100,
    },
  },
  {
    id: 'streamed',
    header: 'Streamed so far in USD',
    cell: ({ rowData }) => (
      <Flow
        flow={rowData.streamed}
        type={rowData.streamType}
        showSign={false}
      />
    ),
  },
];

const filterFunction = (filters = {}, rows = []) => {
  const appliedFilters = Object.entries(filters);

  return rows.filter((rowData) =>
    appliedFilters.every(([key, value]) => {
      if (value === '*') return true;

      return rowData[key] === value;
    }),
  );
};

export const StreamTable = ({ filters, resetFilters }) => {
  const [data, setData] = useState([]);
  const appliedFilters = jsonToQuery(filters);

  const previousFilters = usePrevious(appliedFilters, '');

  useEffect(() => {
    if (appliedFilters !== previousFilters) {
      setData(filterFunction(filters, mock));
    }
  }, [appliedFilters, previousFilters, filters]);

  useEffect(() => {
    resetFilters();
  }, [mock]);

  return <Table columns={columns} data={data} />;
};
