import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import routes from "./routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    {routes.map(({ path, Element, isProtected, subRoutes }) =>
      isProtected ? (
        <Route key={path} >
          <Route path={path} Component={Element} key={path}>
            {subRoutes &&
              subRoutes.map((subRoute) => (
                <Route path={subRoute.path} Component={subRoute.Element} key={subRoute.path}>
                  {subRoute.subRoutes &&
                    subRoute.subRoutes.map((nestedRoute) => (
                      <Route path={nestedRoute.path} Component={nestedRoute.Element} key={nestedRoute.path} />
                    ))}
                </Route>
              ))}
          </Route>
        </Route>
      ) : (
        <Route path={path} Component={Element} key={path}>
          {subRoutes &&
            subRoutes.map((subRoute) => (
              <Route path={subRoute.path} Component={subRoute.Element} key={subRoute.path}>
                {subRoute.subRoutes &&
                  subRoute.subRoutes.map((nestedRoute) => (
                    <Route path={nestedRoute.path} Component={nestedRoute.Element} key={nestedRoute.path} />
                  ))}
              </Route>
            ))}
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
