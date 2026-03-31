import { View, StyleSheet, Pressable } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24292e",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  tab: {
    padding: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/" component={Pressable} style={styles.tab}>
        <Text style={styles.text}>Repositories</Text>
      </Link>

      <Link to="/signin" component={Pressable} style={styles.tab}>
        <Text style={styles.text}>Sign in</Text>
      </Link>
    </View>
  );
};

export default AppBar;
