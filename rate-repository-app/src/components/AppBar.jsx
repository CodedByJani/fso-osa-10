import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link, useNavigate } from "react-router-native";
import Constants from "expo-constants";
import { useQuery, useApolloClient } from "@apollo/client";
import { useContext } from "react";
import Text from "./Text";
import { ME } from "../graphql/queries";
import AuthStorageContext from "../contexts/AuthStorageContext";

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
  const { data } = useQuery(ME, { fetchPolicy: "cache-and-network" });
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={Pressable} style={styles.tab}>
          <Text style={styles.text}>Repositories</Text>
        </Link>

        {data?.me && (
          <Link to="/create-review" component={Pressable} style={styles.tab}>
            <Text style={styles.text}>Create a review</Text>
          </Link>
        )}

        {data?.me ? (
          <Pressable onPress={signOut} style={styles.tab}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        ) : (
          <>
            <Link to="/signin" component={Pressable} style={styles.tab}>
              <Text style={styles.text}>Sign in</Text>
            </Link>
            <Link to="/signup" component={Pressable} style={styles.tab}>
              <Text style={styles.text}>Sign up</Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
