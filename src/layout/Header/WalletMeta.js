import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import { WalletWrapper, WalletInfo } from "./styles";

const style = {
  avatar: {
    width: "30px",
    height: "30px",
    fontSize: "14px",
    backgroundColor: "secondary.main",
  },
};

export const WalletMeta = () => {
  return (
    <WalletWrapper>
      <Avatar sx={style.avatar} variant="rounded">
        P
      </Avatar>
      <WalletInfo>
        <div>
          <Typography variant="caption" sx={{ color: "primary.main" }}>
            Personal Wallet
          </Typography>
        </div>
        <Typography variant="caption" sx={{ color: "primary.light" }}>
          0x834as8...2323
        </Typography>
      </WalletInfo>
    </WalletWrapper>
  );
};
