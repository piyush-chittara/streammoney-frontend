import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { JustifyAround, JustifyStart } from '@shared/components/flex';
import { priceToString } from '@utils/string-helpers';

export const Flow = ({ flow }) => {
  const { incoming, outgoing } = flow;

  return (
    <JustifyAround>
      <JustifyStart>
        <AddIcon sx={{ fontSize: 13 }} /> {priceToString(incoming)}{' '}
        <ArrowDropUpIcon color="success" />
      </JustifyStart>
      <JustifyStart>
        {' '}
        <RemoveIcon sx={{ fontSize: 13 }} /> {priceToString(outgoing)}{' '}
        <ArrowDropDownIcon color="error" />
      </JustifyStart>
    </JustifyAround>
  );
};

export const NetFlow = ({ netFlow }) => {
  return (
    <JustifyStart>
      {netFlow > 0 ? (
        <AddIcon sx={{ fontSize: 13 }} />
      ) : (
        <RemoveIcon sx={{ fontSize: 13 }} />
      )}
      {priceToString(netFlow)}{' '}
      {netFlow > 0 ? (
        <ArrowDropUpIcon color="success" />
      ) : (
        <ArrowDropUpIcon color="error" />
      )}
    </JustifyStart>
  );
};
