import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [listOfUser, setListOfUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setListOfUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch users');
        setLoading(false);
        console.error(error);
      });
  }, []);

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-list-container">
      <h1>User Directory</h1>
      <div className="user-grid">
        {listOfUser.map((user) => (
          <div key={user.id} className="user-card">
            <h2>{user.name}</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
            <p><strong>Company:</strong> {user.company.name}</p>
            <p><strong>City:</strong> {user.address.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;