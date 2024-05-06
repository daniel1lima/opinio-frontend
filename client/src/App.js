import {  CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import { useMemo } from "react";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import SignInPage from "scenes/signin";
import SignUpPage from "scenes/signup";
import Onboarding from "scenes/onboarding";
import AddCompanyToUser from "components/AddCompanyToUser";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  const mode = useSelector((state) => state.global.mode); //use state information globally
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); //pass it into the createtheme function
  return (
    <div className="app">
      <BrowserRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <SignedIn>
              <Routes>
                <Route path="/addUser/*" element={<AddCompanyToUser />} />
                <Route element={<Layout />}>
                  <Route
                    path="/*"
                    element={<Navigate to="/dashboard" replace />}
                  />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/reviews" element={<Transactions />} />
                </Route>
              </Routes>
            </SignedIn>
            <SignedOut>
              <Routes>
                <Route path="/*" element={<Navigate to="/onboarding" />} />

                <Route path="/onboarding" element={<Onboarding />} />

                <Route
                  path="/sign-in/*"
                  redirectUrl="/dashboard"
                  element={<SignInPage />}
                />
                
                <Route
                  path="/sign-up/*"
                  redirectUrl="/addUser"
                  element={<SignUpPage />}
                />

                <Route path="/addUser/*" element={<AddCompanyToUser />} />
              </Routes>
            </SignedOut>
          </ThemeProvider>
        </ClerkProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
