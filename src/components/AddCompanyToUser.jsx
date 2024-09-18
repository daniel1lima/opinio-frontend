import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "state/userCompanySlice";

const AddCompanyToUser = () => {
  const dispatch = useDispatch();

  const clerkUser = useAuth();
  const clerkPersonal = useUser().user;

  const user_id = clerkUser.userId;

  const company_id = localStorage.getItem("company_id") || undefined; // Get company_id only if it exists

  dispatch(setUser(clerkUser.userId));

  const email = clerkPersonal.primaryEmailAddress.emailAddress;
  const first_name = clerkPersonal.firstName;
  const last_name = clerkPersonal.lastName;

  // Store companyId and userId in localStorage
  useEffect(() => {
    if (user_id) {
      localStorage.setItem("user_id", user_id);
    }
    if (company_id) {
      localStorage.setItem("company_id", company_id);
    }
  }, [user_id, company_id]);

  return <Navigate to="/Dashboard" />;
};

export default AddCompanyToUser;
