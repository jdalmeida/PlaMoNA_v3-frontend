import { trpc } from '@/utils/trpc';

// Hooks para usuários
export const useRegisterUser = () => {
  return trpc.user.register.useMutation();
};

export const useLoginUser = () => {
  return trpc.user.login.useMutation();
};

export const useRecuperarSenha = () => {
  return trpc.user.recuperarSenha.useMutation();
};

export const useValidateCodigo = () => {
  return trpc.user.validateCodigo.useMutation();
};

export const useNovaSenha = () => {
  return trpc.user.novaSenha.useMutation();
};

export const useMe = () => {
  return trpc.user.me.useQuery();
};

export const useUpdateUser = () => {
  return trpc.user.updateUser.useMutation();
};

// Hooks para sensores
export const usePesquisaSensores = (idSensor?: number) => {
  return trpc.sensor.pesquisaSensores.useQuery(
    { idSensor },
    { enabled: !!idSensor }
  );
};

export const useAtualizaConfSensor = () => {
  return trpc.sensor.atualizaConfSensor.useMutation();
};

export const useGetConfiguracaoSensor = (idSensor: number) => {
  return trpc.sensor.getConfiguracaoSensor.useQuery(
    { idSensor },
    { enabled: !!idSensor }
  );
};

export const useGetNiveisAlerta = (idSensor: number) => {
  return trpc.sensor.getNiveisAlerta.useQuery(
    { idSensor },
    { enabled: !!idSensor }
  );
};

// Hooks para medições
export const useObterMedicao = (periodo: string) => {
  return trpc.medicao.obterMedicao.useQuery(
    { periodo },
    { enabled: !!periodo }
  );
};

export const useObterComparacao = (periodo: string, comp1: string, comp2: string) => {
  return trpc.medicao.obterComparacao.useQuery(
    { periodo, comp1, comp2 },
    { enabled: !!(periodo && comp1 && comp2) }
  );
};

export const useObterDia = (periodo: 'dia' | 'diaEsp', comp1: string) => {
  return trpc.medicao.obterDia.useQuery(
    { periodo, comp1 },
    { enabled: !!(periodo && comp1) }
  );
};

export const useGetEstatisticas = () => {
  return trpc.medicao.getEstatisticas.useQuery();
};

// Hooks para clima
export const useGetClima = () => {
  return trpc.clima.getClima.useQuery();
};

export const useGetPrevisao = () => {
  return trpc.clima.getPrevisao.useQuery();
}; 