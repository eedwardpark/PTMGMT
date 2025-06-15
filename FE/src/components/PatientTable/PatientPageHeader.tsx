import React from 'react';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { usePatientStore } from '../../stores/patientStore';

interface PatientPageHeaderProps {
  onAddClick: () => void;
  searchPlaceholder?: string;
  addButtonText?: string;
}

export const PatientPageHeader: React.FC<PatientPageHeaderProps> = ({
  onAddClick,
  searchPlaceholder = "Search...",
  addButtonText = "ADD NEW"
}) => {
  const { searchTerm, setSearchTerm } = usePatientStore();

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
      <TextField
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: 400 }}
      />
      <Button 
        variant="contained" 
        startIcon={<AddIcon />}
        onClick={onAddClick}
        size="small"
        sx={{ 
          fontSize: '0.875rem',
          px: 2,
          py: 1
        }}
      >
        {addButtonText}
      </Button>
    </Box>
  );
};