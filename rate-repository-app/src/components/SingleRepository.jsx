import { FlatList, View, StyleSheet, Pressable, Linking } from "react-native";
import { useParams } from "react-router-native";
import { format } from "date-fns";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  repositoryInfo: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
  },
  githubButton: {
    backgroundColor: "#0366d6",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  githubButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  reviewContainer: {
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: "row",
  },
  ratingContainer: {
    alignItems: "center",
    borderColor: "#0366d6",
    borderRadius: 20,
    borderWidth: 2,
    height: 40,
    justifyContent: "center",
    marginRight: 15,
    width: 40,
  },
  ratingText: {
    color: "#0366d6",
    fontWeight: "bold",
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    color: "#666",
    marginBottom: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  const handleOpenGitHub = () => {
    if (repository.url) {
      Linking.openURL(repository.url);
    }
  };

  return (
    <View style={styles.repositoryInfo}>
      <RepositoryItem item={repository} />
      <Pressable style={styles.githubButton} onPress={handleOpenGitHub}>
        <Text style={styles.githubButtonText}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository(id);

  if (loading && !repository) {
    return null;
  }

  const reviews = repository?.reviews?.edges.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
