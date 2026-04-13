import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import { ME } from "../graphql/queries";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  separator: {
    height: 10,
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
  repositoryName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    color: "#666",
    marginBottom: 5,
  },
  reviewText: {
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, onRepositoryPress }) => {
  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");

  return (
    <Pressable onPress={() => onRepositoryPress(review.repositoryId)}>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewContent}>
          <Text style={styles.repositoryName}>
            {review.repository.fullName}
          </Text>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const MyReviews = () => {
  const { data, loading } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  const navigate = useNavigate();

  const onRepositoryPress = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  if (loading) {
    return null;
  }

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || [];

  if (reviews.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          You haven't written any reviews yet
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} onRepositoryPress={onRepositoryPress} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.container}
    />
  );
};

export default MyReviews;
