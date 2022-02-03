import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#202124",
    },
    secondary: {
      main: "#9218d6",
    },
  },
});

export default theme;
