import { Switch, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import NotFound from "./pages/not-found/NotFound";
import AuthenticatedRoutes from "./routes/Authenticated.route";
import "./App.scss";
import Dashboard from "./pages/dashboard/Dashboard";
import Header from "./shared/header/Header";
const PAGE_URLS = {
  homePage: {
    path: "/",
    title: "Home",
    protected: false,
  },
  LoginPage: {
    path: "/login",
    title: "Login",
    protected: false,
  },
  SignupPage: {
    path: "/signup",
    title: "Signup",
    protected: false,
  },
  DashBoard: {
    path: "/dashboard",
    title: "Dashboard",
    protected: true,
  },
  notFoundPage: {
    path: "/not-found",
    title: "not-found",
    protected: false,
  },
};
const AppRoutes = [
  {
    path: PAGE_URLS.homePage.path,
    title: PAGE_URLS.homePage.title,
    protected: PAGE_URLS.homePage.protected,
    component: LandingPage,
  },
  {
    path: PAGE_URLS.LoginPage.path,
    title: PAGE_URLS.LoginPage.title,
    protected: PAGE_URLS.LoginPage.protected,
  },
  {
    path: PAGE_URLS.LoginPage.path,
    title: PAGE_URLS.LoginPage.title,
    protected: PAGE_URLS.LoginPage.protected,
  },
  {
    path: PAGE_URLS.SignupPage.path,
    title: PAGE_URLS.SignupPage.title,
    protected: PAGE_URLS.SignupPage.protected,
  },
  {
    path: PAGE_URLS.DashBoard.path,
    title: PAGE_URLS.DashBoard.title,
    protected: PAGE_URLS.DashBoard.protected,
    component: Dashboard,
  },
  {
    path: PAGE_URLS.notFoundPage.path,
    title: PAGE_URLS.notFoundPage.title,
    protected: PAGE_URLS.notFoundPage.protected,
  },
];

export default function App() {
  const AppAuthenticatedRoutes = () => {
    return AppRoutes.filter((items) => items.protected).map((route) => {
      const { path, title, component } = route;
      return (
        <AuthenticatedRoutes key={path} exact {...{ path, title, component }} />
      );
    });
  };
  // console.log(AppAuthenticatedRoutes);
  return (
    <div className="main-container">
      <Header />
      <BrowserRouter>
        <Switch>
          {AppAuthenticatedRoutes()}
          <Route exact path={PAGE_URLS.homePage.path} component={LandingPage} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
