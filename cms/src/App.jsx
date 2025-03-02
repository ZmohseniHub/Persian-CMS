import { useRoutes } from "react-router-dom"
import routes from "./routes"
import Sidebar from "./Components/Sidebar/Sidebar"
import Header from "./Components/Header/Header"

import "./App.css"

export default function App() {

  const router = useRoutes(routes)

  return (
    <>
      <Sidebar />
      <div className="main">
        <Header />
        {router}
      </div>
    </>
  )
}
