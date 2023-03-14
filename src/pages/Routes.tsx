import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dogs, DogsWithRedux } from "./";

function RoutesList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dogs />} />
        <Route path="/dogs-dux" element={<DogsWithRedux />} />
        <Route path="/*" element={<div>404 Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesList;
