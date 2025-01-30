import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.jsx";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { fetchProfile } from "./api/userAPI.js";

const Root = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return <App />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
