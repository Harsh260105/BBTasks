// Simulated API for authentication
export const fakeLoginAPI = (username, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {

      if (username === 'admin' && password === 'admin123') {
        resolve({
          user: { 
            id: '123456',
            name: 'Admin User',
            username: 'admin',
            email: 'admin@example.com',
            role: 'admin'
          }
        },);
      } 

      if (username === 'user' && password === 'user123') {
        resolve({
          user: { 
            id: '789012',
            name: 'Regular User',
            username: 'user',
            email: 'user@example.com',
            role: 'user'
          }
        });
      } 

      else {
        reject('Invalid credentials');
      }

    }, 1000);
  });

export const logoutAPI = () => {
  return fetch('/api/logout', {
    method: 'POST',
    credentials: 'include',
  });
};
