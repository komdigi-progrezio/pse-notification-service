import { account } from 'models/account';
import * as moment from 'moment';

// Format date strings
export const accountResource = async (data: Promise<account[]>) => {
  return (await data).map(item => ({
    ...item.toJSON(),
    last_login: item.last_login
        ? moment(item.last_login).format('YYYY-MM-DD HH:mm:ss')
        : null, 
    last_logout: item.last_logout
        ? moment(item.last_logout).format('YYYY-MM-DD HH:mm:ss')
        : null, 
  }));
};
