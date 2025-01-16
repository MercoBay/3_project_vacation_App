import { useState, useEffect } from 'react';
import type { Vacation } from '../../types/vacation';
import VacationCard from './VacationCard';
import styles from './VacationsList.module.css';
import { sampleVacations } from '../../data/vacations';

const VacationList = () => {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setVacations(sampleVacations);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.vacationList}>
      <h1>Available Vacations</h1>
      <div className={styles.grid}>
        {vacations.map(vacation => (
          <VacationCard 
            key={vacation.id} 
            vacation={vacation}
          />
        ))}
      </div>
    </div>
  );
};

export default VacationList;
