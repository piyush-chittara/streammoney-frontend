import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { priceToString } from "../../utils/string-helpers";

const style = {
  wrapper: {
    width: 220,
    padding: "0px 16px",
  },
};

export const WalletBalance = ({ currency = "USD", balance }) => {
  return (
    <Box sx={style.wrapper}>
      <div>
        <Typography
          variant="caption"
          sx={{ color: "primary.light" }}
        >{`YOUR WALLET BALANCE IN ${currency.toUpperCase()}`}</Typography>
      </div>
      <div>
        <Typography variant="button" sx={{ color: "primary.main" }}>
          {priceToString(balance)}
        </Typography>
      </div>
    </Box>
  );
};

WalletBalance.propTypes = {
  currency: PropTypes.oneOf(["INR", "USD"]).isRequired,
  balance: PropTypes.number.isRequired,
};
