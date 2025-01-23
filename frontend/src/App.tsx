import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import routes from "./routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    {routes.map(({ path, Element, isProtected }) =>
      isProtected ? (
        <Route key={path} >
          <Route path={path} Component={Element} key={path}>
          </Route>
        </Route>
      ) : (
        <Route path={path} Component={Element} key={path}>
        </Route>
      )
    )}
  </Route>
  )
);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
