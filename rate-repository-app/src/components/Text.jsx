import { Text as NativeText, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});

const Text = ({ children, style }) => {
  return <NativeText style={[styles.text, style]}>{children}</NativeText>;
};

export default Text;
