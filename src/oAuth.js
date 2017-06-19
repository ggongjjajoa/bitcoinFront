
const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";
const TOKEN_TYPE = "TOKEN_TYPE";
const USERNAME = "USERNAME";
const AUTHORITY = "AUTHORITY";
const VERIFYEMAIL = "VERIFYEMAIL";
const VERIFYOTP = "VERIFYOTP";

export const setOAuthToken = (data) => {
    const {access_token, refresh_token, token_type} = data;
    sessionStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.setItem(ACCESS_TOKEN, access_token);
    sessionStorage.setItem(REFRESH_TOKEN, refresh_token);
    sessionStorage.setItem(TOKEN_TYPE, token_type);
}

export const getOAuthToken = () => {
    let result = {
        ACCESS_TOKEN: sessionStorage.getItem(ACCESS_TOKEN),
        REFRESH_TOKEN: sessionStorage.getItem(REFRESH_TOKEN),
        TOKEN_TYPE: sessionStorage.getItem(TOKEN_TYPE)
    };
    return result;
}

export const getUsername = () => {
    return sessionStorage.getItem(USERNAME);
}

export const setAuthority = (data) => {
    if (data.authorities.length > 0) {
        for (let i = 0; i < data.authorities.length; i++) {
            if (data.authorities[i].authority == 'ROLE_TEST') {
                sessionStorage.setItem(AUTHORITY, data.authorities[i].authority);
                break;
            }
            if(data.authorities[i].authority == 'ROLE_ADMIN'){
                sessionStorage.setItem(AUTHORITY, data.authorities[i].authority);
            }
        }
    }
    if (sessionStorage.getItem(AUTHORITY) == null) {
        sessionStorage.setItem(AUTHORITY, "ROLE_USER")
    }
}

export const setPrincipal = (data) => {
    sessionStorage.setItem(VERIFYOTP, data.principal.isOtpkey);
    sessionStorage.setItem(VERIFYEMAIL, data.principal.email);
}

export const getPrincipalOtp = () => {
    return sessionStorage.getItem(VERIFYOTP);
}

export const getPrincipalEmail = () => {
    return sessionStorage.getItem(VERIFYEMAIL);
}

export const getAuthority = () => {
    return sessionStorage.getItem(AUTHORITY);
}

export const deleteOAuthToken = () => {
    sessionStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.removeItem(REFRESH_TOKEN);
    sessionStorage.removeItem(USERNAME);
    sessionStorage.removeItem(AUTHORITY);
    sessionStorage.removeItem(VERIFYOTP);
    sessionStorage.removeItem(VERIFYEMAIL);
}
