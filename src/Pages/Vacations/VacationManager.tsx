import { useState } from 'react';
import styles from './VacationManager.module.css';

const VacationManager = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    duration: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica para enviar los datos
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Manage Vacation Packages</h2>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Add New Package</h3>
        <input
          type="text"
          name="name"
          placeholder="Package Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (days)"
          value={formData.duration}
          onChange={handleChange}
        />
        <input type="file" accept="image/*" />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className={styles.submitButton}>Add Package</button>
      </form>

      <div className={styles.packageList}>
        <h3>Existing Packages</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Beach Paradise</td>
              <td>Cancún, Mexico</td>
              <td>$1,200</td>
              <td>7 days</td>
              <td>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VacationManager;
