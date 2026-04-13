import { FlatList, View, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { useQuery, useMutation } from "@apollo/client";
import { format } from "date-fns";
import { ME, DELETE_REVIEW } from "../graphql/queries";
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
  },
  reviewContentRow: {
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
  actionButtons: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  viewButton: {
    backgroundColor: "#0366d6",
  },
  deleteButton: {
    backgroundColor: "#d73a49",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
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

const ReviewItem = ({ review, onRepositoryPress, onDeleteReview }) => {
  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");

  const handleDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => onDeleteReview(review.id),
          style: "destructive",
        },
      ],
    );
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewContentRow}>
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
      <View style={styles.actionButtons}>
        <Pressable
          style={[styles.button, styles.viewButton]}
          onPress={() => onRepositoryPress(review.repositoryId)}
        >
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const onRepositoryPress = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  const onDeleteReview = async (reviewId) => {
    try {
      await deleteReview({
        variables: {
          deleteReviewId: reviewId,
        },
      });
      // Refetch the reviews list after deletion
      refetch();
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Failed to delete review");
    }
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
        <ReviewItem
          review={item}
          onRepositoryPress={onRepositoryPress}
          onDeleteReview={onDeleteReview}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.container}
    />
  );
};

export default MyReviews;
