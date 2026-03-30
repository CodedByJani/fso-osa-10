import { View, StyleSheet } from "react-native";
import RepositoryList from "./components/RepositoryList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <RepositoryList />
    </View>
  );
};

export default Main;
