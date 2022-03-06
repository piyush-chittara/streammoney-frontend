import { Table } from '@shared/components/table';
import { priceToString } from '@utils/string-helpers';

import { Action } from './Action';
import { WalletCurrency } from './WalletCurrency';

import mock from './mock';
import { Flow, NetFlow } from './MonthlyFlow';

const columns = [
  {
    id: 'currency',
    header: 'Currency',
    cell: ({ value }) => <WalletCurrency currency={value} />,
  },
  {
    id: 'balance',
    header: 'Wallet balance',
  },
  {
    id: 'marketPrice',
    header: 'Market price in USD',
    cell: ({ value }) => priceToString(value),
  },
  {
    id: 'flow',
    header: 'Incoming/Outgoing per month in USD',
    cell: ({ value }) => <Flow flow={value} />,
    colStyles: {
      minWidth: 100,
    },
  },
  {
    id: 'netFlow',
    header: 'Monthly net flow in USD',
    cell: ({ value }) => <NetFlow netFlow={value} />,
    colStyles: {
      minWidth: 100,
    },
  },
  {
    id: 'action',
    header: 'Deposit/Withdraw',
    cell: () => <Action />,
    colStyles: {
      textAlign: 'center',
    },
  },
];

export const CurrencyTable = () => {
  return <Table data={mock} columns={columns} />;
};
