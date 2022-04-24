import SvgIcon from '@mui/material/SvgIcon';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import { CANCELED, WITHDREW, STREAMING, DEPOSITED } from '@constants/activites';

import EtherSVG from '@assets/svg/ethereum-eth-logo.svg';
import BitcoinSVG from '@assets/svg/bitcoin-btc-logo.svg';
import SolanaSVG from '@assets/svg/solana-sol-logo.svg';
import RippleSVG from '@assets/svg/xrp-xrp-logo.svg';
import BinanceSVG from '@assets/svg/bnb-bnb-logo.svg';

export const LinkIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        fill="currentColor"
        d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
      />
    </SvgIcon>
  );
};

export const NoDataIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        fill="currentColor"
        d="M22.11 21.46L20.84 22.73L19.1 21C19.07 21 19.03 21 19 21H5C3.9 21 3 20.11 3 19V5C3 4.97 3 4.93 3 4.9L1.11 3L2.39 1.73L20.7 20.04L20.7 20.05L22.11 21.46M21 17.8L6.2 3H15L21 9V17.8M19.5 10L14 4.5V10H19.5Z"
      />
    </SvgIcon>
  );
};

export const EthereumIcon = (props) => {
  return (
    <SvgIcon fontSize="large" component={EtherSVG} inheritViewBox {...props} />
  );
};

export const SolanaIcon = (props) => {
  return (
    <SvgIcon fontSize="large" component={SolanaSVG} inheritViewBox {...props} />
  );
};

export const BitcoinIcon = (props) => {
  return (
    <SvgIcon
      fontSize="large"
      component={BitcoinSVG}
      inheritViewBox
      {...props}
    />
  );
};

export const RippleIcon = (props) => {
  return (
    <SvgIcon fontSize="large" component={RippleSVG} inheritViewBox {...props} />
  );
};

export const BinanceIcon = (props) => {
  return (
    <SvgIcon
      fontSize="large"
      component={BinanceSVG}
      inheritViewBox
      {...props}
    />
  );
};

const IconMap = {
  ether: EthereumIcon,
  solana: SolanaIcon,
  bitcoin: BitcoinIcon,
  ripple: RippleIcon,
  binance: BinanceIcon,
};

export const getCryptoIcon = (crypto) => {
  return IconMap[crypto];
};

const ACTIVITY_ICON = {
  [CANCELED]: CloseIcon,
  [WITHDREW]: RemoveIcon,
  [STREAMING]: ArrowRightAltIcon,
  [DEPOSITED]: AddIcon,
};

export const getActivityIcon = (activity) =>
  activity ? ACTIVITY_ICON[activity] : null;
