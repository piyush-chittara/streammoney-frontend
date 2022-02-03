import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

import { APP_ROUTES } from "../../routes";

export default [
  {
    key: "dashboard",
    icon: RemoveRedEyeOutlinedIcon,
    title: "Dashboard",
    route: APP_ROUTES.DASHBOARD,
  },
  {
    key: "currency",
    icon: MonetizationOnOutlinedIcon,
    title: "Currency",
    route: APP_ROUTES.CURRENCY,
  },
  {
    key: "streams",
    icon: CompareArrowsOutlinedIcon,
    title: "Streams",
    route: APP_ROUTES.STREAMS,
  },
  {
    key: "activities",
    icon: RestoreOutlinedIcon,
    title: "Activities",
    route: APP_ROUTES.ACTIVITY,
  },
  {
    key: "user",
    icon: PersonOutlineOutlinedIcon,
    title: "User",
    route: APP_ROUTES.ACTIVITY,
  },
];

export const misc = [
  {
    key: "help",
    icon: HelpOutlineOutlinedIcon,
    title: "Help",
    route: APP_ROUTES.HELP,
  },
  {
    key: "settings",
    icon: SettingsOutlinedIcon,
    title: "Settings",
    route: APP_ROUTES.SETTINGS,
  },
];
