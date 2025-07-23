import * as API from '../apis/apis'
import axios from 'axios';

function validateUserState(userState, setErrors) {
    const newErrors = {};

    if (userState.name !== '' && !userState.name.trim()) newErrors.name = '*User Name is required';
    if (userState.email !== '' && !userState.email.includes('@')) newErrors.email = '*Email should be a valid domain';
    if (userState.mobile !== '' && !userState.mobile.match(/^\d{10}$/)) newErrors.mobile = '*Mobile should be a 10-digit number';
    if (userState.password !== '' && userState.password.length < 6) newErrors.password = '*Password should be at least 6 characters';
    if (userState.confirm !== '' && userState.confirm !== userState.password) newErrors.confirm = "*Passwords don't match";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
}

export function handleProfileSubmit(user, userState, setErrors, setLoading, setVisibleSuccessPopup, setVisibleFailedPopup) {
    if (validateUserState(userState, setErrors)) {
        setLoading(true);

        const token = JSON.parse(localStorage.getItem('token'));

        updateUserApiCall(userState, user, token)
            .then(response => {
                setLoading(false);
                user = response.data.payload;
                localStorage.setItem('user', JSON.stringify(user));
                setVisibleSuccessPopup(true);
            })
            .catch(() => {
                setLoading(false);
                setVisibleFailedPopup(true);
            });
    }
};

// API call function, returns promise
function updateUserApiCall(userState, user, token) {
    return axios.post(
        API.updateUserApi,
        {
            id: user.id,
            name: userState.name,
            mobile: userState.mobile,
            email: userState.email,
            password: userState.password,
        },
        {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        }
    );
}