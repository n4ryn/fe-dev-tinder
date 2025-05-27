import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";

// Components
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Signup from "./components/Signup";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import ContactUs from "./components/ContactUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import CancellationAndRefund from "./components/CancellationAndRefund";
import ShippingAndDelivery from "./components/ShippingAndDelivery";

// Utils
import appStore from "./utils/appStore";
import { ToastProvider } from "./utils/ToastProvider";

function App() {
  return (
    <>
      <ToastProvider>
        <Provider store={appStore}>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/" element={<Feed />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route
                  path="/terms-and-conditions"
                  element={<TermsAndConditions />}
                />
                <Route
                  path="/cancellation-and-refund-policy"
                  element={<CancellationAndRefund />}
                />
                <Route
                  path="/shipping-and-delivery-policy"
                  element={<ShippingAndDelivery />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </ToastProvider>
    </>
  );
}

export default App;
