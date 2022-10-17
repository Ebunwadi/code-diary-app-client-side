import React from 'react';
import { Box, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { Link as RouterLink} from "react-router-dom";
import Link from '@mui/material/Link';


const primary = purple[500]; // #f44336

export default function Error() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        Oops!!!
      </Typography>
      <Typography variant="h3" style={{ color: 'white' }}>
        something went wrong.
      </Typography>
      
      <RouterLink to="/login">
        <Link component="span" variant="body2">
      <Typography variant="h6" style={{ color: 'white' }}>
            
            {"You can click here to go Back"}
        </Typography>
        </Link>
        </RouterLink>
    </Box>
  );
}