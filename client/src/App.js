import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useMemo } from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Insights from "scenes/insights";
import Integrations from "scenes/integrations";
import Reviews from "scenes/reviews";
import SignInPage from "scenes/signin";
import SignUpPage from "scenes/signup";
import Onboarding from "scenes/onboarding";
import Invited from "scenes/invited";
import AddCompanyToUser from "components/AddCompanyToUser";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SignedInRoutes />
            <SignedOutRoutes />
          </ThemeProvider>
        </ClerkProvider>
      </BrowserRouter>
    </div>
  );
}

function SignedInRoutes() {
  return (
    <SignedIn>
      <Routes>
        <Route path="/addUser/*" element={<AddCompanyToUser />} />
        <Route element={<Layout />}>
          <Route path="/*" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/integrations" element={<Integrations />} />
        </Route>
      </Routes>
    </SignedIn>
  );
}

function SignedOutRoutes() {
  return (
    <SignedOut>
      <Routes>
        <Route path="/*" element={<Navigate to="/onboarding" />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/invited" element={<Invited />} />
        <Route path="/sign-in/*" redirectUrl="/dashboard" element={<SignInPage />} />
        <Route path="/sign-up/*" redirectUrl="/addUser" element={<SignUpPage />} />
        <Route path="/addUser/*" element={<AddCompanyToUser />} />
      </Routes>
    </SignedOut>
  );
}

export default App;
