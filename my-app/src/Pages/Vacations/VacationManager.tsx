import styles from './VacationManager.module.css';
import { Vacation } from '../../api/api';
import VacationCard from './VacationCard';

const VacationManager = ({ vacation }: { vacation: Vacation }) => {
  return (
    <div className={styles.container}>
      <h1>Available Vacations</h1>
      <div className={styles.grid}>
        <VacationCard vacation={vacation} />
      </div>
    </div>
  );
};

export default VacationManager;
