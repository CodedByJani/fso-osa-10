import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
  },
  fullName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: "#666",
    marginBottom: 5,
  },
  language: {
    backgroundColor: "#0366d6",
    color: "#fff",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    overflow: "hidden",
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fullName}>{item.fullName}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.language}>{item.language}</Text>

      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;
