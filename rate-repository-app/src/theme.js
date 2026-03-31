import { Platform } from "react-native";

const theme = {
  colors: {
    primary: "#0366d6",
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
};

export default theme;
