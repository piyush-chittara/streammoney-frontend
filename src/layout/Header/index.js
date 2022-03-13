import Divider from '@mui/material/Divider';

import { WalletBalance } from './WalletBalance';
import { WalletMeta } from './WalletMeta';
import { USD } from '../../constants/currency';
import { ToolBarWrapper, WalletDetails } from './styles';
import { CreateSendStreamContainer } from '@modules/create-send-stream/container';
import { JustifyStart } from '@shared/components/flex';

export const Header = () => {
  return (
    <ToolBarWrapper>
      <WalletDetails>
        <WalletMeta />
        <Divider orientation="vertical" flexItem />
        <WalletBalance balance={1784.34} currency={USD} />
        <Divider orientation="vertical" flexItem />
        <JustifyStart sx={{ px: 2 }}>
          <CreateSendStreamContainer />
        </JustifyStart>
      </WalletDetails>
    </ToolBarWrapper>
  );
};
