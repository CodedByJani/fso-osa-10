import { View, StyleSheet } from "react-native";
import { Routes, Route, Navigate } from "react-router-native";

import RepositoryList from "./components/RepositoryList";
import AppBar from "./components/AppBar";
import SignIn from "./components/SignIn";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />

      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
