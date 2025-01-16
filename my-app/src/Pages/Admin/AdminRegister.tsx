import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../Services/api';
import styles from './AdminRegister.module.css';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    adminCode: '' // Código secreto para registrarse como admin
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.adminCode !== 'ADMIN123') { // Código de ejemplo
      setError('Invalid admin code');
      return;
    }

    try {
      await apiService.auth.register({
        ...formData,
        role_id: 1 // 1 = admin
      });
      navigate('/login');
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Admin Registration</h2>
      {error && <div className={styles.error}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Admin Code</label>
          <input
            type="password"
            value={formData.adminCode}
            onChange={(e) => setFormData({...formData, adminCode: e.target.value})}
            required
          />
        </div>

        <button type="submit">Register as Admin</button>
      </form>
    </div>
  );
};

export default AdminRegister; 