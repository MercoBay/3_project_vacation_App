import { useState, useEffect } from 'react';
import { apiService } from '../../Services/api';
import type { Vacation } from '../../types/vacation';
import VacationForm from './VacationForm';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingVacation, setEditingVacation] = useState<Vacation | null>(null);

  useEffect(() => {
    loadVacations();
  }, []);

  const loadVacations = async () => {
    const data = await apiService.vacations.getAll();
    setVacations(data);
  };

  const handleCreate = () => {
    setEditingVacation(null);
    setShowForm(true);
  };

  const handleEdit = (vacation: Vacation) => {
    setEditingVacation(vacation);
    setShowForm(true);
  };

  const handleSubmit = async (data: Partial<Vacation>) => {
    try {
      if (editingVacation) {
        await apiService.vacations.update(editingVacation.id, data);
      } else {
        await apiService.vacations.create(data);
      }
      setShowForm(false);
      loadVacations();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.dashboard}>
      <h1>Vacation Management</h1>
      <button onClick={handleCreate}>Add New Vacation</button>
      
      {showForm && (
        <VacationForm
          initialData={editingVacation ? {
            ...editingVacation,
            price: editingVacation.price.toString()
          } : undefined}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className={styles.vacationsList}>
        {vacations.map(vacation => (
          <div key={vacation.id} className={styles.vacationItem}>
            <h3>{vacation.country}</h3>
            <p>{vacation.description}</p>
            <div className={styles.actions}>
              <button onClick={() => handleEdit(vacation)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
