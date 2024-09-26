"use client"
// todo: refactor using server side compatible form

import { useState } from 'react';

export default function Register () {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    teamName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to submit registration data
  };

  return (
    <div>
      <h1>Register for tournament here</h1>
      <form onSubmit={ handleSubmit }>
        {/* Add input fields for name, email, team name */ }
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
