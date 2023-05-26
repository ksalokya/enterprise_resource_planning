import { useContext } from 'react';
import { DarkMode } from '../../App';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function ComponentLoader(props) {
    const isDarkModeEnabled = useContext(DarkMode);
    return (
        <Box sx={{
            width: 600,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 99,
            ...props.style
        }}>
            <Skeleton sx={{ backgroundColor: '#aaaaaa' }} variant="rounded" />
            <Skeleton sx={{ backgroundColor: '#aaaaaa' }} animation="wave" />
            <Skeleton sx={{ backgroundColor: '#aaaaaa' }} animation={false} />
            <Skeleton sx={{ marginTop: 2, backgroundColor: isDarkModeEnabled ? '#333333' : '#aaaaaa' }} variant="rounded" />
            <Skeleton sx={{ backgroundColor: isDarkModeEnabled ? '#333333' : '#aaaaaa' }} animation="wave" />
            <Skeleton sx={{ backgroundColor: isDarkModeEnabled ? '#333333' : '#aaaaaa' }} animation={false} />
        </Box>
    );
}