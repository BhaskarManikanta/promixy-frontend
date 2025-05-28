import { useState, useTransition } from 'react';
import './App.css'

const SignUpForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = formData;

    if (!email.endsWith('@gmail.com')) {
      setError('Only Gmail addresses are allowed');
      setSuccess('');
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch('https://promixy-backend.onrender.com/add-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Something went wrong');
          setSuccess('');
        } else {
          setSuccess('Thanks for Registration!');
          setError('');
          setFormData({ name: '', email: '' });
          setTimeout(()=>{
             window.location.href = 'https://promixy1.blogspot.com';
          },2000)
        }
      } catch (err) {
        setError('Failed to connect to server');
        setSuccess('');
        console.error(err);
      }
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.heading}>Sign up</h2>
        <p style={styles.subheading}>Join and get Instant Access to Premium Tools</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
            disabled={isPending}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
            disabled={isPending}
          />

          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}

          <button type="submit" style={styles.button} disabled={isPending}>
            {isPending ? <div style={styles.spinner} /> : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
  },
  box: {
    width: '350px',
    padding: '40px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    textAlign: 'center',
    background: '#fff',
  },
  heading: {
    marginBottom: '10px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  subheading: {
    marginBottom: '20px',
    fontSize: '14px',
    color: '#555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    fontSize: '13px',
  },
  success: {
    color: 'green',
    fontSize: '13px',
  },
  spinner: {
    width: '18px',
    height: '18px',
    border: '3px solid rgba(255, 255, 255, 0.6)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  // You must add this keyframes to global CSS:
  // @keyframes spin {
  //   0% { transform: rotate(0deg); }
  //   100% { transform: rotate(360deg); }
  // }
};

export default SignUpForm;
