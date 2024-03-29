
export async function loginUser(email, password) {
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Invalid username or password');
  }
}


export async function register(username, email, password) {
  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
}

export const updateProfile = async (userInfo, username, email, password, repass) => {
  try {
    const response = await fetch('/api/users/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        userInfo: userInfo,
        username: username,
        email: email,
        password: password,
        repass: repass
      })
    });

    if (!response.ok) {
      throw new Error(response.message);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};




