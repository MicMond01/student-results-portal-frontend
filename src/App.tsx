import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./route";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { AnimatePresence } from "framer-motion";
import { AuthRoleProvider } from "./context/auth-role";
import { SidebarProvider } from "./context/sidebar";

function App() {
  return (
    <div>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <AuthRoleProvider>
        <SidebarProvider>
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <AppRoutes />
            </AnimatePresence>
          </BrowserRouter>
        </SidebarProvider>
      </AuthRoleProvider>
      </PersistGate>
    </Provider>
    </div>
  );
}

export default App;
