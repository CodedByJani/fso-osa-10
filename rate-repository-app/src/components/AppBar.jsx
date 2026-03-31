import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24292e",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingHorizontal: 10,
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
      <ScrollView horizontal>
        <Link to="/" component={Pressable} style={styles.tab}>
          <Text style={styles.text}>Repositories</Text>
        </Link>

        <Link to="/signin" component={Pressable} style={styles.tab}>
          <Text style={styles.text}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
