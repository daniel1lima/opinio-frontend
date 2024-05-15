

import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyId, setUser } from 'state/userCompanySlice';

const AddCompanyToUser = () => {
    const dispatch = useDispatch();

    const { user, companyId } = useSelector(state => state.userCompany);

    console.log("Company ID:", companyId);
    console.log("Company user:", user);

    const clerkUser = useAuth();
    const clerkPersonal = useUser().user;

    dispatch(setUser(clerkUser.userId));

    const email = clerkPersonal.primaryEmailAddress.emailAddress;
    const firstName = clerkPersonal.firstName;
    const lastName = clerkPersonal.lastName;

    // console.log("Email:", email);
    // console.log("First Name:", firstName);
    // console.log("Last Name:", lastName);

    // Pass skip parameter that accepts a boolean
    useEffect(() => {
        const send = async (companyId, user, email, firstName, lastName) => {
            try {
                const response = await fetch(process.env.REACT_APP_BASE_URL + '/management/postCompany', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ companyId, user, email, firstName, lastName })
                });
                // const data = await response.json();
                // console.log(data);
                dispatch(setCompanyId(null));
                dispatch(setUser(null));
            } catch (error) {
                console.error(error);
            }
        };

        send(companyId, user, email, firstName, lastName);
    }, [companyId, user, email, firstName, lastName]);

    return <Navigate to="/Dashboard" />;
};

export default AddCompanyToUser;

