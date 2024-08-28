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
  // console.log("Retrieved company_id:", company_id);

  // console.log("Company ID:", company_id);
  // console.log("Company user:", user_id);

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

  // Pass skip parameter that accepts a boolean
  useEffect(() => {
    const send = async (company_id, user_id, email, first_name, last_name) => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BASE_URL + "/management/postUser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              company_id,
              user_id,
              email,
              first_name,
              last_name,
            }),
          },
        );
        // const data = await response.json();
        // console.log(data);
        const data = await response.json();
        console.log("API Response:", response);
      } catch (error) {
        console.error(error);
      }
    };

    send(company_id, user_id, email, first_name, last_name);
  }, [company_id, user_id, email, first_name, last_name]);

  return <Navigate to="/Dashboard" />;
};

export default AddCompanyToUser;
