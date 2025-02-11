import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { useMockedUser } from 'src/auth/hooks';

// ----------------------------------------------------------------------

//Customize -- Left nav bar user details
export function NavUserDetails({ sx, ...other }: BoxProps) {
  const { user } = useMockedUser();

  return (
    <Box sx={[{ px: 2, py: 5, textAlign: 'left' }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar src={user?.photoURL} alt={user?.displayName} sx={{ width: 48, height: 48 }}>
            {user?.displayName?.charAt(0).toUpperCase()}
          </Avatar>
        </Box>

        <Box sx={{ mb: 2, mt: 1.5, width: 1 }}>
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ mb: 1, color: 'var(--layout-nav-text-primary-color)' }}
          >
            {user?.displayName}
          </Typography>

          <Typography
            variant="body2"
            noWrap
            sx={{ color: 'var(--layout-nav-text-disabled-color)' }}
          >
            {user?.email}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
