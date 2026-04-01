import { Text as NativeText, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontFamily: "System",
  },
});

const Text = ({ style, ...props }) => {
  return <NativeText style={[styles.text, style]} {...props} />;
};

export default Text;
