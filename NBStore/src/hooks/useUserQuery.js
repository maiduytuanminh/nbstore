import { useQuery } from '@tanstack/react-query';
import * as UserService from '../services/UserService';

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await UserService.getAllUser();
      return res;
    },
    staleTime: 5 * 60 * 1000, // Cache trong 5 phút
    keepPreviousData: true,
  });
};