import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";

import Body from "./components/Body";
import Chat from "./components/Chat";
import Connections from "./components/Connections";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Pricing from "./components/Pricing";
import Profile from "./components/Profile";
import Requests from "./components/Requests";
import Signup from "./components/Signup";

import { AuthProvider } from "./context/AuthProvider";
import { ToastProvider } from "./context/ToastProvider";

import appStore from "./utils/appStore";

function App() {
  return (
    <>
      <ToastProvider>
        <Provider store={appStore}>
          <BrowserRouter basename="/">
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Body />}>
                  <Route path="/" element={<Feed />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/connections" element={<Connections />} />
                  <Route path="/requests" element={<Requests />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/pricing" element={<Pricing />} />
                </Route>
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </Provider>
      </ToastProvider>
    </>
  );
}

export default App;
