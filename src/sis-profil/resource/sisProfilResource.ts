import * as moment from 'moment';

export const sisProfilResource = (data: any) => {
  const formattedData = data.map((item: any) => {
    const approved = () => {
      if (item.approved === 1) {
        return 1;
      } else {
        return 0;
      }
    };

    const publish = () => {
      if (
        item.approved === 1 &&
        (item.publish === 0 || item.publish === null)
      ) {
        return 0;
      } else {
        return 1;
      }
    };

    const percent = () => {
      const arr = [];

      if (item.nama_internal) {
        arr.push(1);
      }
      if (item.nama_eksternal) {
        arr.push(1);
      }
      if (item.deskripsi) {
        arr.push(1);
      }
      if (item.cakupan_wilayah) {
        arr.push(1);
      }
      if (item.sifat_khusus) {
        arr.push(1);
      }

      const total = arr.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );

      const a = [];
      if (total > 0) {
        a.push(1);
      } else {
        a.push(0);
      }

      if (item.sis_fungsikhususes.length > 0) {
        a.push(1);
      } else {
        a.push(0);
      }
      if (item.sis_ruang_lingkups.length > 0) {
        a.push(1);
      } else {
        a.push(0);
      }
      if (item.sis_jenis_layanans.length > 0) {
        a.push(1);
      } else {
        a.push(0);
      }
      if (item.sis_pengamen.length > 0) {
        a.push(1);
      } else {
        a.push(0);
      }
      if (item.sis_tata_kelolas.length > 0) {
        a.push(1);
      } else {
        a.push(0);
      }
      if (item.sis_sops.length > 0) {
        a.push(1);
      } else {
        a.push(0);
      }
      if (item.sis_softwares.length > 0) {
        a.push(1);
      } else {
        a.push(0);
      }
      if (item.sis_hardwares.length > 0) {
        a.push(1);
      } else {
        a.push(0);
      }
      if (item.sis_tenaga_ahli_stocks.length > 0) {
        a.push(1);
      } else {
        a.push(0);
      }
      const totalItem = a.length;
      const totalSum = a.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );

      return (totalSum / totalItem) * 100;
    };

    return {
      id: item.id,
      nama_internal: item.nama_internal,
      nama_instansi:
        item.sis_penyelenggara &&
        item.sis_penyelenggara.par_satuan_kerja &&
        item.sis_penyelenggara.par_satuan_kerja.par_instansi &&
        item.sis_penyelenggara.par_satuan_kerja.par_instansi.name
          ? item.sis_penyelenggara.par_satuan_kerja.par_instansi.name
          : 'Kosong',
      nama_pejabat: item.account ? item.account.nama : 'Kosong',
      nama_penanggungjawab: item.sis_penanggung_jawab
        ? item.sis_penanggung_jawab.nama
        : 'Kosong',
      nama_penanggungjawab_satuan_kerja:
        (item.sis_penyelenggara === null || item.sis_penyelenggara.par_satuan_kerja === null)
          ? 'Kosong'
          : item.sis_penyelenggara.par_satuan_kerja.name,
      deskripsi: item.deskripsi,
      no_reg: item.no_reg,
      deleted: item.deleted,
      status: item.publish ? 'Terdaftar' : 'Belum Terdaftar',
      approved: approved(),
      publish: publish(),
      progress: percent(),
      tgl_daftar: moment(item.created_at).format('DD MM YYYY hh:mm'),
    };
  });

  return formattedData;
};
