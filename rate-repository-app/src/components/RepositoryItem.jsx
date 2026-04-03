import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
  },
  header: {
    flexDirection: "row",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  info: {
    flex: 1,
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
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontWeight: "bold",
  },
  statLabel: {
    color: "#666",
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "k";
  }
  return count;
};

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />

        <View style={styles.info}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {formatCount(item.stargazersCount)}
          </Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{formatCount(item.forksCount)}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{formatCount(item.reviewCount)}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {formatCount(item.ratingAverage)}
          </Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
