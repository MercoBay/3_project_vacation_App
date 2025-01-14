import { useState, useEffect } from 'react';
import { apiService } from '../../Services/api';
import styles from './VacationList.module.css';

interface Vacation {
  id: number;
  description: string;
  price: string;
  image_url: string;
  start_date: string;
  end_date: string;
  country_id: number;
}

const VacationList = () => {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const response = await apiService.vacations.getAll();
        setVacations(response);
      } catch (err) {
        console.error('Error fetching vacations:', err);
        setError('Error al cargar las vacaciones');
      }
    };

    fetchVacations();
  }, []);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Vacaciones Disponibles</h2>
      <div className={styles.grid}>
        {vacations.map((vacation) => (
          <div key={vacation.id} className={styles.card}>
            <img 
              src={vacation.image_url} 
              alt={vacation.description}
              className={styles.image}
            />
            <div className={styles.content}>
              <h3>{vacation.description}</h3>
              <p>Precio: ${vacation.price}</p>
              <p>Fecha inicio: {new Date(vacation.start_date).toLocaleDateString()}</p>
              <p>Fecha fin: {new Date(vacation.end_date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VacationList;
