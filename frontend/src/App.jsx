import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateGroup from "./pages/CreateGroup";
import AddExpense from "./pages/AddExpense";
import AddMember from "./pages/AddMember";
import GroupsList from "./pages/GroupsList";
import GroupDetails from "./pages/GroupDetails";

import ProtectedRoute from "./components/ProtectedRoute";
import PageLayout from "./components/PageLayout";

import { useAuth } from "./context/AuthContext";

function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ---------- PROTECTED ROUTES ---------- */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PageLayout title="Dashboard" bgClass="bg-dashboard">
                <Dashboard />
              </PageLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-group"
          element={
            <ProtectedRoute>
              <PageLayout title="Create Group" bgClass="bg-create-group">
                <CreateGroup />
              </PageLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-member"
          element={
            <ProtectedRoute>
              <PageLayout title="Add Member" bgClass="bg-add-member">
                <AddMember />
              </PageLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-expense"
          element={
            <ProtectedRoute>
              <PageLayout title="Add Expense" bgClass="bg-add-expense">
                <AddExpense />
              </PageLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <PageLayout title="Your Groups" bgClass="bg-view-groups">
                <GroupsList />
              </PageLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups/:groupId"
          element={
            <ProtectedRoute>
              <PageLayout title="Group Details" bgClass="bg-view-groups">
                <GroupDetails />
              </PageLayout>
            </ProtectedRoute>
          }
        />

        {/* ---------- DEFAULT ---------- */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
