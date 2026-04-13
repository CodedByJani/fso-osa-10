import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id, variables = {}) => {
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: {
      id,
      first: 4,
      ...variables,
    },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const hasNextPage = data?.repository?.reviews?.pageInfo?.hasNextPage;

    if (!hasNextPage || loading) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    repository: data?.repository,
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useRepository;
