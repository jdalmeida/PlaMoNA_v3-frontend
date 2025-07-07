import { 
  Home, 
  ChevronRight,
  Monitor,
  Person,
  Settings,
  Info
} from '@mui/icons-material';
import { 
  Box, 
  Breadcrumbs,
  Link,
  Chip
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

import { tokens } from '@/app/theme';

const Breadcrumb = () => {
  const router = useRouter();
  const pathname = usePathname();

  const getBreadcrumbItems = () => {
    const items = [
      {
        label: 'Início',
        href: '/',
        icon: <Home sx={{ fontSize: 16 }} />
      }
    ];

    // Adicionar itens baseados na rota atual
    if (pathname.startsWith('/monitoramento')) {
      items.push({
        label: 'Monitoramento',
        href: '/monitoramento',
        icon: <Monitor sx={{ fontSize: 16 }} />
      });
    } else if (pathname.startsWith('/user')) {
      items.push({
        label: 'Perfil',
        href: '/user',
        icon: <Person sx={{ fontSize: 16 }} />
      });
    } else if (pathname.startsWith('/configurarSensor')) {
      items.push({
        label: 'Configurações',
        href: '/configurarSensor',
        icon: <Settings sx={{ fontSize: 16 }} />
      });
    } else if (pathname.startsWith('/sobre')) {
      items.push({
        label: 'Sobre',
        href: '/sobre',
        icon: <Info sx={{ fontSize: 16 }} />
      });
    } else if (pathname.startsWith('/login')) {
      items.push({
        label: 'Login',
        href: '/login',
        icon: <Person sx={{ fontSize: 16 }} />
      });
    } else if (pathname.startsWith('/cadastro')) {
      items.push({
        label: 'Cadastro',
        href: '/cadastro',
        icon: <Person sx={{ fontSize: 16 }} />
      });
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  if (breadcrumbItems.length <= 1) return null;

  return (
    <Box
      sx={{
        py: 1,
        px: 2,
        background: 'rgba(255, 255, 255, 0.6)',
        borderBottom: `1px solid ${tokens.grey[200]}`,
        backdropFilter: 'blur(10px)'
      }}
    >
      <Breadcrumbs
        separator={<ChevronRight sx={{ fontSize: 16, color: tokens.text.secondary }} />}
        aria-label="breadcrumb"
      >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          return isLast ? (
            <Chip
              key={item.href}
              icon={item.icon}
              label={item.label}
              size="small"
              sx={{
                backgroundColor: tokens.primary[50],
                color: tokens.primary[600],
                border: `1px solid ${tokens.primary[200]}`,
                fontWeight: 600,
                '& .MuiChip-icon': {
                  color: tokens.primary[600]
                }
              }}
            />
          ) : (
            <Link
              key={item.href}
              color="inherit"
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                router.push(item.href);
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: tokens.text.secondary,
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  color: tokens.primary[600],
                  textDecoration: 'underline'
                }
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb; 