import React, { useState } from "react";
import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";
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
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 14,
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
    <View>
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

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { sortOrder, onSortChange, searchKeyword, onSearchChange } =
      this.props;

    return (
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search repositories..."
          value={searchKeyword}
          onChangeText={onSearchChange}
        />
        <SortingSelector sortOrder={sortOrder} onSortChange={onSortChange} />
      </View>
    );
  };

  render() {
    const { repositories, onItemPress } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <Pressable onPress={() => onItemPress(item.id)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
      />
    );
  }
}

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState({
    label: "Latest",
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  });

  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories } = useRepositories({
    orderBy: sortOrder.orderBy,
    orderDirection: sortOrder.orderDirection,
    searchKeyword: debouncedSearchKeyword,
  });

  const navigate = useNavigate();

  const onItemPress = (id) => {
    navigate(`/repository/${id}`);
  };

  const onSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  const onSearchChange = (text) => {
    setSearchKeyword(text);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onItemPress={onItemPress}
      sortOrder={sortOrder}
      onSortChange={onSortChange}
      searchKeyword={searchKeyword}
      onSearchChange={onSearchChange}
    />
  );
};

export default RepositoryList;
