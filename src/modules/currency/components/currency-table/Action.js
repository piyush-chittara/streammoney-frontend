import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { JustifyCenter } from '@shared/components/flex';
import { ActionButton } from './styles';

export const Action = () => {
  return (
    <JustifyCenter>
      <ActionButton action="deposit">
        <AddIcon />
      </ActionButton>
      <ActionButton action="withdraw" sx={{ ml: 2 }}>
        <RemoveIcon />
      </ActionButton>
    </JustifyCenter>
  );
};
