import { Route, Redirect } from "react-router-dom";
export default function AuthenticatedRoutes(props) {
  const { component: AuthenticatedComponent, ...rest } = props;
  const isAuthenticated = true;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <AuthenticatedComponent {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
}
