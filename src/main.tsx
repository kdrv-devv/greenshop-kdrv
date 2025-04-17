import { createRoot } from "react-dom/client";
import "./index.css";
import PorivderConfg from "./tools/provider";
import { root } from "./roots";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <PorivderConfg>
    <RouterProvider router={root} />
  </PorivderConfg>
);
