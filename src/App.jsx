import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";
import Scrolltotop from "./components/UI/ScrollToTop";
import { RequireAuth } from "./Utils/RequireAuth";
import {
  Register,
  Login,
  Settings,
  ForgotPassword,
  AdminDashboard,
  AdminProducts,
  AdminVideos,
  UserManagement,
  Userdetails,
} from "./Pages";

const App = () => {
  return (
    <div className="w-full h-full text-sm sm:text-[15px] font text-zinc-700">
      <div>
        <Toaster
          toastOptions={{
            duration: 5000,
            position: "top-center",
            success: {
              style: {
                background: "#222",

                color: "#fff",
              },
            },
            error: {
              duration: 5000,
              position: "top-center",
              style: {
                background: "red",
                color: "#fff",
              },
            },
          }}
        />
      </div>
      <Router>
        <Scrolltotop />

        <Routes>
          {/*    AUTH PAGE */}

          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={<Login />} />
          {/*    LANDING PAGE  */}

          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth link={"/"}>
                <AdminDashboard />
              </RequireAuth>
            }
          />

          <Route
            path="/setting"
            element={
              <RequireAuth link={"/"}>
                <Settings />
              </RequireAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequireAuth link={"/"}>
                <UserManagement />
              </RequireAuth>
            }
          />
          <Route
            path="/videos"
            element={
              <RequireAuth link={"/"}>
                <AdminVideos />
              </RequireAuth>
            }
          />
          <Route
            path="/products"
            element={
              <RequireAuth link={"/"}>
                <AdminProducts />
              </RequireAuth>
            }
          />

          <Route
            path="/user/:id"
            element={
              <RequireAuth link={"/"}>
                <Userdetails />
              </RequireAuth>
            }
          />

          {/**Protected routes */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
