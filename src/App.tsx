import { RouteObject, useRoutes } from "react-router-dom";
import "./App.css";
import NavBar from "./layout/navBar";
import HomePage from "./pages/index";
import SignNewFile from "./pages/signNewFile";

function App(): JSX.Element {
  const router: RouteObject[] = [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "/signnewfile",
      element: <SignNewFile />,
    },
  ];

  const el = useRoutes(router);

  return (
    <div id="App" className="h-full w-full grid grid-rows-[60px_1fr]">
      <NavBar />
      {el}
    </div>
  );
}

export default App;
