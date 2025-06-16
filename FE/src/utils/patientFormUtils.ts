import type { PatientFormData } from "../components/PatientForm/interface/PatientFormData";

export const validateForm = (
  formData: PatientFormData,
): Partial<PatientFormData> => {
  const errors: Partial<PatientFormData> = {};

  if (!formData.clinicAcronym) {
    errors.clinicAcronym = "Clinic is required";
  }
  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required";
  }
  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required";
  }
  //   if (!formData.gender) {
  //     errors.gender = "Gender is required";
  //   }
  if (!formData.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required";
  }
  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phone)) {
    errors.phone = "Phone number must be in format ###-###-####";
  }

  return errors;
};

export const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");

  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  } else {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10,
    )}`;
  }
};
