import React from "react";
import { Formik } from "formik";
import { Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import UserContext from "./UserContext";

class ForgotPassword extends React.Component {
  construct() {}
  render() {
    return (
      <UserContext.Consumer>
        {(props) => (
          <Container>
            <Row>
              <div className="wrapper fade-in-down">
                <div id="form-content" className="login-form text-center">
                  <h2 className="text-uppercase">Forgot Password</h2>
                  <Formik
                    initialValues={{
                      email: "",
                    }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.email) {
                        errors.email = "Required";
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setFieldError, setSubmitting }) => {
                      props.api
                        .forgotPassword(values.email)
                        .then((result) => {
                          console.log(result);
                        })
                        .catch((error) => {
                          console.log(error);
                          this.setState({ error });
                          setSubmitting(false);
                        });
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <>
                        <form onSubmit={handleSubmit}>
                          <input
                            type="email"
                            name="email"
                            className="fade-in first text-left"
                            placeholder="Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <small className="form-text text-muted">
                            {errors.email && touched.email && errors.email}
                          </small>
                          <Button
                            type="submit"
                            variant="primary"
                            type="submit"
                            className="fade-in third submit-btn button-ellipse"
                            disabled={isSubmitting}
                          >
                            SEND RESET LINK
                          </Button>
                        </form>
                        <div className="form-footer">
                          <p>
                            Don't have an account?{" "}
                            <Link
                              className="btn-link underline-hover"
                              to="/register"
                            >
                              Sign up
                            </Link>
                          </p>
                          <p>
                            Remember your password?{" "}
                            <Link
                              className="btn-link underline-hover"
                              to="/login"
                            >
                              Login
                            </Link>
                          </p>
                        </div>
                      </>
                    )}
                  </Formik>
                </div>
              </div>
            </Row>
          </Container>
        )}
      </UserContext.Consumer>
    );
  }
}

export default ForgotPassword;