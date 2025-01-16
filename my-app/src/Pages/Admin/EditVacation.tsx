import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../Services/api';
import { Vacation } from '../../Models/Vacation';
import { VacationForm } from './VacationForm';

const EditVacation = () => {
  const { id } = useParams();
  const [vacation, setVacation] = useState<Vacation | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos de la vacación
    apiService.vacations.getById(Number(id))
      .then(setVacation);
  }, [id]);

  const handleSubmit = async (data: Partial<Vacation>) => {
    try {
      await apiService.vacations.update(Number(id), data);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error updating vacation:', error);
    }
  };

  return (
    <div>
      <h2>Edit Vacation</h2>
      {vacation && <VacationForm 
        initialData={vacation}
        onSubmit={handleSubmit}
      />}
    </div>
  );
};

export default EditVacation; 