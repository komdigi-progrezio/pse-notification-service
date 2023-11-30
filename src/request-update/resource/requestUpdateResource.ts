import { request_update } from 'models/request_update';

export const requestUpdateResource = (data: request_update[]) => {
  const formattedData = data.map((item: request_update) => {
    const getStatus = (item: request_update) => {
      const auth = null; // Retrieve the authenticated user as needed in Nest.js (e.g., from the request object)
      
      if (item.approved === true && (item.finished === false || item.finished === null)) {
        return 'Disetujui - Sedang Dalam Perubahan';
      } else if (item.approved === true && item.finished === true) {
        return 'Sudah Selesai';
      } else {
        if (auth && (auth.hasRole(['Admin', 'Super Admin']))) {
          return 'Menunggu Persetujuan';
        } else {
          return 'Terkirim';
        }
      }
    }

    return {
      id: item.id,
      sis_profil_id: item.sis_profil_id,
      nama_sistem: item.sis_profil ? item.sis_profil.nama_internal : 'Kosong',
      account_id: item.account_id,
      nama_akun: item.sis_profil.account ? item.sis_profil.account.nama : 'Kosong',
      nip_akun: item.sis_profil.account ? item.sis_profil.account.nip : 'Kosong',
      jabatan_akun: item.sis_profil.account ? item.sis_profil.account.jabatan : 'Kosong',
      reason: item.reason,
      approved: item.approved,
      finished: item.finished,
      locked: item.locked,
      status: getStatus(item),
      sis_profil: {
        account: item.sis_profil ? item.sis_profil.account : null,
      },
    };
  });

  return formattedData;
};

