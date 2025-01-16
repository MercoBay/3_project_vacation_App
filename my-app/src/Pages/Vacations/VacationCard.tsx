import { useState, useEffect } from 'react';
import styles from './VacationCard.module.css';
import type { Vacation } from '../../types/vacation';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../Services/api';

interface VacationCardProps {
  vacation: Vacation;
  onDelete?: (id: number) => void;
}

const VacationCard = ({ vacation, onDelete }: VacationCardProps) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this vacation?')) {
      try {
        await apiService.vacations.delete(id);
        onDelete?.(id);
      } catch (error) {
        console.error('Error deleting vacation:', error);
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'v' && e.altKey) {
        setShowDetails(true);
      }
      if (e.key === 'Escape') {
        setShowDetails(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={vacation.image_url} alt={vacation.country} />
        </div>
        <div className={styles.content}>
          <h3>{vacation.country}</h3>
          <p>{vacation.description}</p>
          <div className={styles.price}>
            ${vacation.price.toLocaleString()}
          </div>
          <div className={styles.dates}>
            <p>From: {new Date(vacation.start_date).toLocaleDateString()}</p>
            <p>To: {new Date(vacation.end_date).toLocaleDateString()}</p>
          </div>
          <button 
            className={styles.detailsButton}
            onClick={() => setShowDetails(true)}
          >
            View Details
          </button>
        </div>
        {isAdmin && (
          <div className={styles.adminControls}>
            <button onClick={() => navigate(`/admin/edit/${vacation.id}`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(vacation.id)}>
              Delete
            </button>
          </div>
        )}
      </div>

      {showDetails && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{vacation.country}</h2>
            <img src={vacation.image_url} alt={vacation.country} />
            <div className={styles.modalDetails}>
              <h3>Activities</h3>
              <ul>
                {vacation.details.activities.map(activity => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
              <h3>Includes</h3>
              <ul>
                {vacation.details.includes.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p><strong>Location:</strong> {vacation.details.location}</p>
            </div>
            <button onClick={() => setShowDetails(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default VacationCard; 