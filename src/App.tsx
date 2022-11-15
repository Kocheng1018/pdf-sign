import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './App.css'
import HomePage from "@/pages/index"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  }
])

function App() {
  return (
    <div id="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
