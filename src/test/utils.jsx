import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { render } from "@testing-library/react";
import { rootReducer } from "../store";

function renderWithWithWrappers(ui, options = {}) {
  const { preloadedState = {}, route = "/" } = options;
  const store = configureStore({ reducer: rootReducer, preloadedState });
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>,
  );
}

export { renderWithWithWrappers };
