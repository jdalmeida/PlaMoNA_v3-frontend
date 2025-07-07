/* eslint-disable react/no-array-index-key */
'use client';
import { 
  WaterDrop, 
  Security, 
  Analytics,
  School,
  LocationOn,
  Email,
  Phone,
  TrendingUp,
  Warning,
  CheckCircle
} from '@mui/icons-material';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Fade,
  Slide
} from '@mui/material';

import { tokens } from '@/app/theme';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const dynamic = 'force-dynamic';

export default function SobrePage () {
  const features = [
    {
      icon: <WaterDrop sx={{ fontSize: 40, color: tokens.primary[600] }} />,
      title: 'Monitoramento em Tempo Real',
      description: 'Sensores avançados coletam dados 24/7 sobre o nível das águas com precisão milimétrica.'
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: tokens.secondary[600] }} />,
      title: 'Análise Inteligente',
      description: 'Algoritmos de IA processam dados históricos para prever tendências e identificar padrões.'
    },
    {
      icon: <Warning sx={{ fontSize: 40, color: tokens.warning[600] }} />,
      title: 'Sistema de Alertas',
      description: 'Notificações automáticas quando o nível da água atinge limites críticos de segurança.'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: tokens.success[600] }} />,
      title: 'Segurança da Comunidade',
      description: 'Proteção preventiva contra enchentes e inundações através de monitoramento contínuo.'
    }
  ];

  const technologies = [
    { name: 'Next.js', category: 'Frontend', color: 'primary' },
    { name: 'React', category: 'Frontend', color: 'primary' },
    { name: 'Material-UI', category: 'Frontend', color: 'primary' },
    { name: 'Node.js', category: 'Backend', color: 'secondary' },
    { name: 'tRPC', category: 'Backend', color: 'secondary' },
    { name: 'PostgreSQL', category: 'Database', color: 'success' },
    { name: 'Prisma', category: 'Database', color: 'success' },
    { name: 'TypeScript', category: 'Language', color: 'warning' },
    { name: 'Tailwind CSS', category: 'Styling', color: 'info' },
    { name: 'Docker', category: 'DevOps', color: 'error' }
  ];

  const team = [
    /*{
      name: 'Geovane Griesang',
      role: 'Professor',
      avatar: '/ifsul_colorido.png',
      description: 'Especialista em desenvolvimento de software e sistemas de monitoramento.',
      expertise: ['Desenvolvimento de Software', 'Sistemas de Monitoramento', 'Análise de Dados'],
      email: 'geovane.griesang@ifsul.edu.br'
    }*/
  ];

  const objectives = [
    'Reduzir riscos de enchentes através de monitoramento preventivo',
    'Fornecer dados precisos para tomada de decisões em emergências',
    'Criar uma plataforma acessível para toda a comunidade',
    'Desenvolver tecnologia sustentável e escalável',
    'Contribuir para a pesquisa em monitoramento ambiental'
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${tokens.primary[600]} 0%, ${tokens.primary[800]} 100%)`,
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth='lg'>
          <Fade in timeout={1000}>
            <Box textAlign='center'>
              <WaterDrop sx={{ fontSize: 80, mb: 3, opacity: 0.8 }} />
              <Typography
                variant='h1'
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 700,
                  mb: 3,
                  background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Sobre o PlaMoNA
              </Typography>
              <Typography
                variant='h5'
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  fontWeight: 300,
                  mb: 4,
                  opacity: 0.9,
                  maxWidth: 800,
                  mx: 'auto'
                }}
              >
                Plataforma de Monitoramento do Nível das Águas
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  fontSize: '1.1rem',
                  opacity: 0.8,
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Uma solução inovadora desenvolvida pelo IFSul para proteger comunidades 
                contra enchentes através de tecnologia avançada e monitoramento em tempo real.
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Missão e Visão */}
      <Container maxWidth='lg' sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Slide direction="up" in timeout={800}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: `1px solid ${tokens.grey[200]}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  height: '100%'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <CheckCircle sx={{ color: tokens.success[600], mr: 2, fontSize: 32 }} />
                  <Typography variant='h4' sx={{ fontWeight: 600, color: tokens.text.primary }}>
                    Nossa Missão
                  </Typography>
                </Box>
                <Typography variant='body1' sx={{ color: tokens.text.secondary, lineHeight: 1.7, mb: 3 }}>
                  Desenvolver e implementar soluções tecnológicas inovadoras para o monitoramento 
                  ambiental, contribuindo para a segurança e bem-estar das comunidades através 
                  da prevenção de desastres naturais.
                </Typography>
                <Typography variant='body1' sx={{ color: tokens.text.secondary, lineHeight: 1.7 }}>
                  O PlaMoNA representa o compromisso do IFSul com a inovação tecnológica 
                  e a responsabilidade social, unindo pesquisa acadêmica e aplicação prática.
                </Typography>
              </Paper>
            </Slide>
          </Grid>

          <Grid item xs={12} md={6}>
            <Slide direction="up" in timeout={1000}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: `1px solid ${tokens.grey[200]}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  height: '100%'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <TrendingUp sx={{ color: tokens.primary[600], mr: 2, fontSize: 32 }} />
                  <Typography variant='h4' sx={{ fontWeight: 600, color: tokens.text.primary }}>
                    Nossa Visão
                  </Typography>
                </Box>
                <Typography variant='body1' sx={{ color: tokens.text.secondary, lineHeight: 1.7, mb: 3 }}>
                  Ser referência nacional em sistemas de monitoramento ambiental inteligente, 
                  expandindo nossa tecnologia para outras regiões e contribuindo para a 
                  criação de cidades mais seguras e sustentáveis.
                </Typography>
                <Typography variant='body1' sx={{ color: tokens.text.secondary, lineHeight: 1.7 }}>
                  Buscamos constantemente inovar e aprimorar nossas soluções, sempre 
                  com foco na excelência técnica e no impacto social positivo.
                </Typography>
              </Paper>
            </Slide>
          </Grid>
        </Grid>
      </Container>

      {/* Características Principais */}
      <Box sx={{ py: 8, background: 'rgba(255, 255, 255, 0.5)' }}>
        <Container maxWidth='lg'>
          <Box textAlign='center' sx={{ mb: 6 }}>
            <Typography
              variant='h3'
              sx={{
                fontWeight: 700,
                color: tokens.text.primary,
                mb: 2
              }}
            >
              Características Principais
            </Typography>
            <Typography
              variant='h6'
              sx={{
                color: tokens.text.secondary,
                fontWeight: 300
              }}
            >
              Tecnologia avançada para monitoramento inteligente
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Fade in timeout={800 + index * 200}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      border: `1px solid ${tokens.grey[200]}`,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      transition: 'transform 0.3s ease-in-out',
                      height: '100%',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 0 }}>
                      <Box sx={{ mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography
                        variant='h6'
                        sx={{
                          fontWeight: 600,
                          color: tokens.text.primary,
                          mb: 2
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          color: tokens.text.secondary,
                          lineHeight: 1.6
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Objetivos */}
      <Container maxWidth='lg' sx={{ py: 8 }}>
        <Box textAlign='center' sx={{ mb: 6 }}>
          <Typography
            variant='h3'
            sx={{
              fontWeight: 700,
              color: tokens.text.primary,
              mb: 2
            }}
          >
            Nossos Objetivos
          </Typography>
          <Typography
            variant='h6'
            sx={{
              color: tokens.text.secondary,
              fontWeight: 300
            }}
          >
            Metas que guiam nosso trabalho e desenvolvimento
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: `1px solid ${tokens.grey[200]}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}
        >
          <List>
            {objectives.map((objective, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemIcon>
                  <CheckCircle sx={{ color: tokens.success[600] }} />
                </ListItemIcon>
                <ListItemText
                  primary={objective}
                  primaryTypographyProps={{
                    variant: 'body1',
                    color: tokens.text.primary,
                    fontWeight: 500
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>

      {/* Tecnologias Utilizadas */}
      <Box sx={{ py: 8, background: 'rgba(255, 255, 255, 0.5)' }}>
        <Container maxWidth='lg'>
          <Box textAlign='center' sx={{ mb: 6 }}>
            <Typography
              variant='h3'
              sx={{
                fontWeight: 700,
                color: tokens.text.primary,
                mb: 2
              }}
            >
              Tecnologias Utilizadas
            </Typography>
            <Typography
              variant='h6'
              sx={{
                color: tokens.text.secondary,
                fontWeight: 300
              }}
            >
              Stack tecnológico moderno e robusto
            </Typography>
          </Box>

          <Grid container spacing={2} justifyContent='center'>
            {technologies.map((tech, index) => (
              <Grid item key={index}>
                <Chip
                  label={tech.name}
                  size='large'
                  sx={{
                    backgroundColor: `${tech.color}`,
                    color: tokens.text.primary,
                    border: `1px solid ${tech.color}`,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    px: 2,
                    py: 1,
                    '&:hover': {
                      backgroundColor: `${tech.color}`,
                      transform: 'scale(1.05)'
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Equipe */}
      <Container maxWidth='lg' sx={{ py: 8 }}>
        <Box textAlign='center' sx={{ mb: 6 }}>
          <Typography
            variant='h3'
            sx={{
              fontWeight: 700,
              color: tokens.text.primary,
              mb: 2
            }}
          >
            Nossa Equipe
          </Typography>
          <Typography
            variant='h6'
            sx={{
              color: tokens.text.secondary,
              fontWeight: 300
            }}
          >
            Profissionais dedicados e especializados
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in timeout={800 + index * 200}>
                <Card
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: `1px solid ${tokens.grey[200]}`,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s ease-in-out',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 0 }}>
                    <Avatar
                      src={member.avatar}
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        border: `3px solid ${tokens.primary[200]}`
                      }}
                    />
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 600,
                        color: tokens.text.primary,
                        mb: 1
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{
                        color: tokens.primary[600],
                        fontWeight: 500,
                        mb: 2
                      }}
                    >
                      {member.role}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{
                        color: tokens.text.secondary,
                        lineHeight: 1.6,
                        mb: 2
                      }}
                    >
                      {member.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {member.expertise.map((skill, skillIndex) => (
                        <Chip
                          key={skillIndex}
                          label={skill}
                          size='small'
                          sx={{
                            mr: 0.5,
                            mb: 0.5,
                            backgroundColor: tokens.primary[50],
                            color: tokens.primary[700],
                            fontSize: '0.7rem'
                          }}
                        />
                      ))}
                    </Box>
                    <Link
                      href={`mailto:${member.email}`}
                      sx={{
                        color: tokens.primary[600],
                        textDecoration: 'none',
                        fontSize: '0.8rem',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {member.email}
                    </Link>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Instituição */}
      <Box sx={{ py: 8, background: 'rgba(255, 255, 255, 0.5)' }}>
        <Container maxWidth='lg'>
          <Paper
            elevation={0}
            sx={{
              p: 6,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: `1px solid ${tokens.grey[200]}`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
              <School sx={{ color: tokens.primary[600], mr: 2, fontSize: 40 }} />
              <Typography
                variant='h3'
                sx={{
                  fontWeight: 700,
                  color: tokens.text.primary
                }}
              >
                IFSul - Campus Venâncio Aires
              </Typography>
            </Box>
            <Typography
              variant='body1'
              sx={{
                color: tokens.text.secondary,
                lineHeight: 1.7,
                mb: 4,
                maxWidth: 800,
                mx: 'auto'
              }}
            >
              O Instituto Federal de Educação, Ciência e Tecnologia Sul-rio-grandense (IFSul) 
              é uma instituição de ensino superior pública federal brasileira, 
              reconhecida pela excelência em ensino, pesquisa e extensão.
            </Typography>
            <Grid container spacing={4} justifyContent='center'>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <LocationOn sx={{ color: tokens.primary[600], mr: 1 }} />
                  <Typography variant='body1' sx={{ fontWeight: 500 }}>
                    Venâncio Aires, RS - Brasil
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Email sx={{ color: tokens.primary[600], mr: 1 }} />
                  <Typography variant='body1' sx={{ fontWeight: 500 }}>
                    contato@ifsul.edu.br
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Phone sx={{ color: tokens.primary[600], mr: 1 }} />
                  <Typography variant='body1' sx={{ fontWeight: 500 }}>
                    (51) 3793-4200
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      <Footer />
    </div>
  );
}
