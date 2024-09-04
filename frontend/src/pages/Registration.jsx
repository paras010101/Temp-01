import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Login.css"; // Import specific CSS file
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() { // Rename the component to reflect its purpose
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "", // Add email field for registration
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/auth", data); // Use the correct registration endpoint
      console.log("Registration response:", response.data); // Handle successful registration

      // Implement logic to handle successful registration here (e.g., store token, redirect)
      navigate("/login"); // Example: Redirect to home page after successful registration
    } catch (error) {
      console.error("Error registering:", error);
      // Handle registration errors here (e.g., display error message)
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <div className="registration-container">
        <h2>Registration</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field type="text" id="username" name="username" className="input-field" />
                <ErrorMessage name="username" component="div" className="error-message" />
              </div>


              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" className="input-field" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Registration; // Rename the component to match the purpose