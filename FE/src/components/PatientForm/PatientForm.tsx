import React, { useState, useEffect } from 'react';
import { Box, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PatientFormHeader } from './PatientFormHeader';
import { PatientFormFields } from './PatientFormFields';
import { PatientFormActions } from './PatientFormActions';
import { usePatientStore } from '../../stores/patientStore';
import { useClinicStore } from '../../stores/clinicStore';
import { initialFormData, type PatientFormData } from './interface/PatientFormData';
import { formatPhoneNumber, validateForm } from '../../utils/patientFormUtils';
import type { PatientDto } from '../../models/PatientDto';

export const PatientForm: React.FC = () => {
  const navigate = useNavigate();
  const { addPatient, loading: patientLoading, error: patientError } = usePatientStore();
  const { clinics, loading: clinicsLoading, fetchClinics } = useClinicStore();
  
  const [formData, setFormData] = useState<PatientFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<PatientFormData>>({});
  const [submitError, setSubmitError] = useState<string>('');

  useEffect(() => {
    if (clinics.length === 0 && !clinicsLoading) {
      fetchClinics();
    }
  }, [clinics.length, clinicsLoading, fetchClinics]);

  const handleInputChange = (field: keyof PatientFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSelectChange = (field: keyof PatientFormData) => (
    event: any
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      dateOfBirth: event.target.value
    }));
    if (formErrors.dateOfBirth) {
      setFormErrors(prev => ({ ...prev, dateOfBirth: undefined }));
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(event.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
    if (formErrors.phone) {
      setFormErrors(prev => ({ ...prev, phone: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError('');

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const patientDto: PatientDto = {
        clinicAcronym: formData.clinicAcronym,
        ltc: formData.ltc || undefined,
        lastName: formData.lastName.trim(),
        firstName: formData.firstName.trim(),
        middleName: formData.middleName?.trim() || undefined,
        gender: formData.gender as 'M' | 'F',
        dateOfBirth: formData.dateOfBirth,
        phone: formData.phone,
      };

      await addPatient(patientDto);
      navigate('/patients');
    } catch (error) {
      setSubmitError('Failed to create patient. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/patients');
  };

  if (clinicsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <PatientFormHeader 
          submitError={submitError} 
          patientError={patientError ?? undefined} 
        />

        <Box component="form" onSubmit={handleSubmit}>
          <PatientFormFields
            formData={formData}
            formErrors={formErrors}
            clinics={clinics}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleDateChange={handleDateChange}
            handlePhoneChange={handlePhoneChange}
          />

          <PatientFormActions
            patientLoading={patientLoading}
            onCancel={handleCancel}
          />
        </Box>
      </Paper>
    </Box>
  );
};