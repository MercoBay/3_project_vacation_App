import { useState, useEffect } from 'react';
import styles from './VacationDetailsModal.module.css';
import { apiService } from '../../api/api';
import type { Vacation } from '../../types/vacation';

interface ModalProps {
  vacationId: number;
  onClose: () => void;
}

const VacationDetailsModal = ({ vacationId, onClose }: ModalProps) => {
  const [vacation, setVacation] = useState<Vacation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await apiService.vacations.getById(vacationId);
        setVacation(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [vacationId]);

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        {loading ? (
          <p>Loading...</p>
        ) : vacation ? (
          <>
            <h2>{vacation.country}</h2>
            <img src={vacation.image_url} alt={vacation.country} />
            <p>{vacation.description}</p>
            <p>Price: ${vacation.price}</p>
            <p>Dates: {new Date(vacation.start_date).toLocaleDateString()} - {new Date(vacation.end_date).toLocaleDateString()}</p>
          </>
        ) : (
          <p>Vacation not found</p>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default VacationDetailsModal; 