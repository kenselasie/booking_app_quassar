import { Notify } from 'quasar';

export const successNotify = (msg: string) => {
  return  Notify.create({
      message: msg,
      position: 'top-right',
      color: 'green',
    });
}

export const errorNotify = (msg: string) => {
  return  Notify.create({
      message: msg,
      position: 'top-right',
      color: 'red',
    });

}
