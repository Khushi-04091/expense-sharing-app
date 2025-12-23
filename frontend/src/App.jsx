import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateGroup from "./pages/CreateGroup";
import AddExpense from "./pages/AddExpense";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AddMember from "./pages/AddMember";
import GroupDetails from "./pages/GroupDetails";


import { useAuth } from "./context/AuthContext";


function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />
        <Route
  path="/add-member"
  element={
    <ProtectedRoute>
      <>
        <Navbar />
        <AddMember />
      </>
    </ProtectedRoute>
  }
/>


        <Route
          path="/create-group"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <CreateGroup />
              </>
            </ProtectedRoute>
          }
        />
        <Route
  path="/groups/:groupId"
  element={
    <ProtectedRoute>
      <>
        <Navbar />
        <GroupDetails />
      </>
    </ProtectedRoute>
  }
/>


        <Route
          path="/add-expense"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <AddExpense />
              </>
            </ProtectedRoute>
          }
        />

        {/* default route */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


