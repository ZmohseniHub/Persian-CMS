import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"

import App from './App.jsx'
import "./custom.css"
import "./cms.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
