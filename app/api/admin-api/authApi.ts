const admin_authApi = {

  login: (data: API_Auth.Login) => $fetch('/api-admin/auth/login', {
    method: 'POST',
    body: data,
  }),

  logout: () => $fetch('/api-admin/auth/logout', {
    method: 'POST',
  }),
}

export default admin_authApi
