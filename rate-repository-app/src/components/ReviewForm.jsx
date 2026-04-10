import { View, StyleSheet, TextInput, Button } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-native";
import Text from "./Text";
import useCreateReview from "../hooks/useCreateReview";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  errorText: {
    color: "#d73a4a",
    marginBottom: 10,
  },
  inputError: {
    borderColor: "#d73a4a",
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});

const validationSchema = Yup.object().shape({
  ownerName: Yup.string().required("Repository owner username is required"),
  repositoryName: Yup.string().required("Repository name is required"),
  rating: Yup.number()
    .required("Rating is required")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100"),
  text: Yup.string().optional(),
});

export const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          ownerName: "",
          repositoryName: "",
          rating: "",
          text: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              style={[
                styles.input,
                touched.ownerName && errors.ownerName && styles.inputError,
              ]}
              placeholder="Repository owner's username"
              value={values.ownerName}
              onChangeText={handleChange("ownerName")}
              onBlur={handleBlur("ownerName")}
            />
            {touched.ownerName && errors.ownerName && (
              <Text style={styles.errorText}>{errors.ownerName}</Text>
            )}

            <TextInput
              style={[
                styles.input,
                touched.repositoryName &&
                  errors.repositoryName &&
                  styles.inputError,
              ]}
              placeholder="Repository name"
              value={values.repositoryName}
              onChangeText={handleChange("repositoryName")}
              onBlur={handleBlur("repositoryName")}
            />
            {touched.repositoryName && errors.repositoryName && (
              <Text style={styles.errorText}>{errors.repositoryName}</Text>
            )}

            <TextInput
              style={[
                styles.input,
                touched.rating && errors.rating && styles.inputError,
              ]}
              placeholder="Rating (0-100)"
              value={values.rating}
              onChangeText={handleChange("rating")}
              onBlur={handleBlur("rating")}
              keyboardType="numeric"
            />
            {touched.rating && errors.rating && (
              <Text style={styles.errorText}>{errors.rating}</Text>
            )}

            <TextInput
              style={[
                styles.input,
                styles.multilineInput,
                touched.text && errors.text && styles.inputError,
              ]}
              placeholder="Review (optional)"
              value={values.text}
              onChangeText={handleChange("text")}
              onBlur={handleBlur("text")}
              multiline
            />
            {touched.text && errors.text && (
              <Text style={styles.errorText}>{errors.text}</Text>
            )}

            <Button title="Create review" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview({
        ownerName: values.ownerName,
        repositoryName: values.repositoryName,
        rating: values.rating,
        text: values.text,
      });

      // Navigate to repository view after successful creation
      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
