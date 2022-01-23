import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
export default function AuthenticatedRoutes(props) {
  const { component: AuthenticatedComponent, ...rest } = props;
  const token = localStorage.getItem("portal-token");

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <AuthenticatedComponent {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
}
