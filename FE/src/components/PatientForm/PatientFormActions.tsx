import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';

interface PatientFormActionsProps {
  patientLoading: boolean;
  onCancel: () => void;
}

export const PatientFormActions: React.FC<PatientFormActionsProps> = ({ 
  patientLoading, 
  onCancel 
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 6 }}>
      <Button
        variant="outlined"
        onClick={onCancel}
        disabled={patientLoading}
        sx={{ 
          px: 4, 
          py: 1.5,
          textTransform: 'uppercase',
          fontWeight: 600,
          bgcolor: 'grey.300',
          color: 'white',
          border: 'none',
          '&:hover': {
            bgcolor: 'grey.400',
            border: 'none'
          }
        }}
      >
        CANCEL
      </Button>
      <Button
        type="submit"
        variant="contained"
        disabled={patientLoading}
        sx={{ 
          px: 4, 
          py: 1.5,
          textTransform: 'uppercase',
          fontWeight: 600,
          bgcolor: 'primary.main'
        }}
      >
        {patientLoading ? <CircularProgress size={20} color="inherit" /> : 'SAVE'}
      </Button>
    </Box>
  );
};