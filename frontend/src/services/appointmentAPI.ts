import { ICalenderData } from 'src/pages/models';
import http from './base';
import { AxiosError } from 'axios';

export const addAppointment = async (payload: ICalenderData) => {
  const path = '/appointment';

  try {
    const { data } = await http.post(path, payload);
    return await Promise.resolve(data);
  } catch (err) {
    return await Promise.reject(err as AxiosError);
  }
};

export const updateAppointment = async (
  id: string,
  payload: Partial<ICalenderData>
) => {
  const path = `/appointment/${id}`;

  try {
    const { data } = await http.patch(path, payload);
    return await Promise.resolve(data);
  } catch (err) {
    return await Promise.reject(err as AxiosError);
  }
};

export const deleteAppointment = async (id: string) => {
  const path = `/appointment/${id}`;
  try {
    const { data } = await http.delete(path);
    return await Promise.resolve(data);
  } catch (err) {
    return await Promise.reject(err as AxiosError);
  }
};
