import { ReactNode } from "react";
import IntrinsicAttributes = JSX.IntrinsicAttributes;
import HomePage from "./pages/HomePage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

interface RouteConfig {
    path: string;
    Element: (props: IntrinsicAttributes) => ReactNode | JSX.Element;
    isProtected: boolean;
    subRoutes?: RouteConfig[];
  }

  const routes: RouteConfig[] = [
    { path: '/', Element: HomePage , isProtected: false },
    { path: '/register', Element: Register , isProtected: false },
    { path: '/login', Element: Login , isProtected: false },

  ]

  export default routes;