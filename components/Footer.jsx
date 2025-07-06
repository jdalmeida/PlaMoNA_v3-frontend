import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import { tokens } from '@/app/theme';

const Footer = () => {
  return (
    <>
      <Box
        py='2em'
        px={{ sm: '5em', xs: '2em' }}
        width='100vw'
        mt='5em'
        className='shadow-lg'
        sx={{
          background: tokens.primary[300] + '77',
          color: '#000000',
          backdropFilter: 'blur(2px)'
        }}
      >
        <Box display='flex' justifyContent='space-between' flexDirection='row'>
          <Box
            sx={{
              objectFit: 'contain',
              width: { sm: '20em', xs: '10em' },
              height: 'auto',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Image src='/logo_horizontal.png' alt='PlaMoNa' width={1000} height={400} />
          </Box>
          <Box
            sx={{
              objectFit: 'contain',
              width: { sm: '20em', xs: '10em' },
              height: 'auto',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Image src='/ifsul_colorido.png' alt='IFSUL' width={1474} height={268} />
          </Box>
        </Box>
        <Typography variant='body2' textAlign='center'>
          2023 &copy; IFSul - Venâncio Aires
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
