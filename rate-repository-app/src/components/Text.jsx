import { Text as NativeText, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.main,
  },
});

const Text = ({ style, ...props }) => {
  return <NativeText style={[styles.text, style]} {...props} />;
};

export default Text;
