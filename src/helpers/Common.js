// return the user data from the session storage
export const getEmployeeId = () => {
    const userStr = sessionStorage.getItem('employeeId');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('employeeId');
    sessionStorage.removeItem('outletId');
    window.location.reload();
}


// return the token from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}

// set the token and user from the session storage
export const setUserSession = (token, employeeId,outletId) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('employeeId', JSON.stringify(employeeId));
    sessionStorage.setItem('outletId', JSON.stringify(outletId));
}

export const windowReload = () =>{
    window.location.reload();
}