import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: { height: 10 },
  header: {
    backgroundColor: "#fff",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sortButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f6f8fa",
  },
  sortButtonActive: {
    borderColor: "#0366d6",
    backgroundColor: "#0366d6",
  },
  sortButtonText: {
    fontSize: 12,
    color: "#333",
  },
  sortButtonTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortingSelector = ({ sortOrder, onSortChange }) => {
  const sortOptions = [
    { label: "Latest", orderBy: "CREATED_AT", orderDirection: "DESC" },
    {
      label: "Highest Rated",
      orderBy: "RATING_AVERAGE",
      orderDirection: "DESC",
    },
    { label: "Lowest Rated", orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  ];

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Sort by:</Text>
      <View style={styles.sortButtonContainer}>
        {sortOptions.map((option) => (
          <Pressable
            key={option.label}
            style={[
              styles.sortButton,
              sortOrder.label === option.label && styles.sortButtonActive,
            ]}
            onPress={() => onSortChange(option)}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortOrder.label === option.label && styles.sortButtonTextActive,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  onItemPress,
  sortOrder,
  onSortChange,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <SortingSelector sortOrder={sortOrder} onSortChange={onSortChange} />
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => onItemPress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState({
    label: "Latest",
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  });

  const { repositories } = useRepositories({
    orderBy: sortOrder.orderBy,
    orderDirection: sortOrder.orderDirection,
  });

  const navigate = useNavigate();

  const onItemPress = (id) => {
    navigate(`/repository/${id}`);
  };

  const onSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onItemPress={onItemPress}
      sortOrder={sortOrder}
      onSortChange={onSortChange}
    />
  );
};

export default RepositoryList;
