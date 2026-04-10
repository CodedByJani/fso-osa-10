import { View, StyleSheet, TextInput, Button } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-native";
import Text from "./Text";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

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
});

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be at most 30 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must be at most 50 characters"),
  passwordConfirmation: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          username: "",
          password: "",
          passwordConfirmation: "",
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
                touched.username && errors.username && styles.inputError,
              ]}
              placeholder="Username"
              value={values.username}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              style={[
                styles.input,
                touched.password && errors.password && styles.inputError,
              ]}
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TextInput
              style={[
                styles.input,
                touched.passwordConfirmation &&
                  errors.passwordConfirmation &&
                  styles.inputError,
              ]}
              placeholder="Confirm password"
              value={values.passwordConfirmation}
              onChangeText={handleChange("passwordConfirmation")}
              onBlur={handleBlur("passwordConfirmation")}
              secureTextEntry
            />
            {touched.passwordConfirmation && errors.passwordConfirmation && (
              <Text style={styles.errorText}>
                {errors.passwordConfirmation}
              </Text>
            )}

            <Button title="Sign up" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      // Create the user
      await signUp({
        username: values.username,
        password: values.password,
      });

      // Sign in the newly created user
      await signIn({
        username: values.username,
        password: values.password,
      });

      // Redirect to home page
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
