export async function fetchUserByEmail(email) {
  const options = { headers: { "X-Secret-Token": "qwerty" } };
  const response = await fetch(`/api/users/email/${email}`, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function createNewUser(user) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const response = await fetch("/api/users", options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function fetchContacts(userId) {
  const response = await fetch(`/api/user/contacts?user_id=${userId}`);
  // if (!response.ok) {
  //   throw new Error(response.statusText);
  // }
  return await response.json();
}

export async function addToFavorites(userId, contactId) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId, contact_id: contactId }),
  };
  const response = await fetch(`/api/user/contacts/favorites`, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function deleteFromFavorites(userId, contactId) {
  const options = {
    method: "DELETE",
  };
  const response = await fetch(
    `/api/user/contacts/favorites/${contactId}?user_id=${userId}`,
    options
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function deleteContact(userId, contactId) {
  const options = {
    method: "DELETE",
  };
  const response = await fetch(
    `/api/user/contacts/${contactId}?user_id=${userId}`,
    options
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export async function createContact(body) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch("/api/user/contacts", options);
  return await response.json();
}

export async function updateContact(contactId, body) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`/api/user/contacts/${contactId}`, options);
  return await response.json();
}

export async function fetchSingleContact(userId, contactId ) {
  const response = await fetch(`/api/user/contacts/${contactId}?user_id=${userId}`);
  
  return await response.json();
}
