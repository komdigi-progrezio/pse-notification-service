import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as moment from 'moment';
import { account } from 'models/account';
import { sis_profil } from 'models/sis_profil';
import { request_update } from 'models/request_update';
import { sis_fungsikhusus } from 'models/sis_fungsikhusus';
import { sis_ruang_lingkup } from 'models/sis_ruang_lingkup';
import { sis_jenis_layanan } from 'models/sis_jenis_layanan';
import { sis_pengaman } from 'models/sis_pengaman';
import { sis_software } from 'models/sis_software';
import { sis_hardware } from 'models/sis_hardware';
import { sis_tenaga_ahli_stock } from 'models/sis_tenaga_ahli_stock';
import { sis_tata_kelola } from 'models/sis_tata_kelola';
import { sis_sop } from 'models/sis_sop';
import { sis_tenaga_ahli } from 'models/sis_tenaga_ahli';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async pejabatPendaftarAktivasi(email: string): Promise<void> {
    const data = await this.mailerService.sendMail({
      to: email,
      subject: 'Akun PSE Berhasil Diaktifkan',
      template: 'pejabat_pendaftar_aktivasi',
      context: {
        email,
      },
    });

    return data;
  }

  async pejabatPendaftarBaru(user: any): Promise<void> {
    const emailAdmin = await this.getUserAdmin();

    const data = {
      to: emailAdmin,
      subject: 'Pejabat Pendaftar baru telah melakukan pendaftaran',
      template: 'pejabat_pendaftar_baru',
      context: {
        created_at: moment(user.created_at).format('DD/MM/YYYY HH:mm'),
        username: user.username,
        nama: user.nama,
        nip: user.nip,
        jabatan: user.jabatan,
        instansi_induk_text: user.instansi_induk_text,
      },
    };
    const resp = await this.mailerService.sendMail(data);
    return resp;
  }

  async pejabatPendaftarPengganti(user: any): Promise<void> {
    const emailAdmin = await this.getUserAdmin();

    return await this.mailerService.sendMail({
      to: emailAdmin,
      subject: 'Pejabat Pengganti baru telah melakukan pendaftaran',
      template: 'pejabat_pendaftar_pengganti',
      context: {
        created_at: moment(user.created_at).format('DD/MM/YYYY HH:mm'),
        username: user.username,
        nama: user.nama,
        nip: user.nip,
        jabatan: user.jabatan,
        instansi_induk_text: user.instansi_induk_text,
      },
    });
  }

  async pendaftaranSubPejabat(user: any): Promise<void> {
    const emailAdmin = await this.getUserAdmin();

    return await this.mailerService.sendMail({
      to: emailAdmin,
      subject: 'Sub-Pejabat baru telah didaftarkan',
      template: 'pendaftaran_sub_pejabat',
      context: {
        created_at: moment(user.created_at).format('DD/MM/YYYY HH:mm'),
        username: user.username,
        nama: user.nama,
        nip: user.nip,
        jabatan: user.jabatan,
        instansi_induk_text: user.instansi_induk_text,
      },
    });
  }

  async pendaftaranSeBaru(sisProfil: any): Promise<void> {
    const emailAdmin = await this.getUserAdmin();
    const acc = await account.findByPk(sisProfil.account_id);

    return await this.mailerService.sendMail({
      to: emailAdmin,
      subject: 'Sistem Elektronik baru telah didaftarkan',
      template: 'pendaftaran_se_baru',
      context: {
        created_at: moment(sisProfil.created_at).format('DD/MM/YYYY HH:mm'),
        nama_internal: sisProfil.nama_internal,
        nama_eksternal: sisProfil.nama_eksternal,
        username: acc.username,
        nama: acc.nama,
        instansi_induk_text: acc.instansi_induk_text,
      },
    });
  }

  async pendaftaranSe100(sisProfil: any): Promise<void> {
    const emailAdmin = await this.getUserAdmin();
    const acc = await account.findByPk(sisProfil.account_id);

    await this.mailerService.sendMail({
      to: 'Tu.D3@bssn.go.id',
      subject: 'Sistem Elektronik berikut telah mencapai kelengkapan data 100%',
      template: 'pendaftaran_se_100_bsre',
      context: {
        created_at: moment(sisProfil.created_at).format('DD/MM/YYYY HH:mm'),
        nama_internal: sisProfil.nama_internal,
        nomor_pemohon: sisProfil.id,
        nomor_registratsi: sisProfil.no_reg,
        instansi_induk_text: acc.instansi_induk_text,
        nama: acc.nama,
      },
    });

    return await this.mailerService.sendMail({
      to: emailAdmin,
      subject: 'Sistem Elektronik berikut telah mencapai kelengkapan data 100%',
      template: 'pendaftaran_se_100',
      context: {
        created_at: moment(sisProfil.created_at).format('DD/MM/YYYY HH:mm'),
        nama_internal: sisProfil.nama_internal,
        nama_eksternal: sisProfil.nama_eksternal,
        instansi_induk_text: acc.instansi_induk_text,
      },
    });
  }

  async userApproved(user: any): Promise<void> {
    return await this.mailerService.sendMail({
      to: user.username,
      subject:
        'Account Anda pada PSE telah disetujui #' +
        moment().format('YYYYMMDDHHmmss'),
      template: 'user_approves',
      context: {
        name: user.nama,
        appUrl: process.env.APP_DOMAIN,
      },
    });
  }

  async userRegistration(user: any): Promise<void> {
    return await this.mailerService.sendMail({
      to: user.username,
      subject:
        'Pendaftaran Account Menunggu Persetujuan Admin #' +
        moment().format('YYYYMMDDHHmmss'),
      template: 'user_registration',
      context: {
        name: user.nama,
      },
    });
  }

  async userEnableAccountSubstitution(req: any): Promise<void> {
    const user = req.user;
    const random_password = req.password;

    return await this.mailerService.sendMail({
      to: user.username,
      subject: 'Aktifkan User Berhasil',
      template: 'user_enable_substitution',
      context: {
        name: user.nama,
        username: user.username,
        random_password,
      },
    });
  }

  async userDisableAccountSubstitution(user: any): Promise<void> {
    return await this.mailerService.sendMail({
      to: user.username,
      subject: 'Non Aktifkan User Berhasil',
      template: 'user_disable_substitution',
      context: {
        name: user.nama,
      },
    });
  }

  async userRejectRegistration(request: { user: any; alasan: string }): Promise<void> {
    const { user, alasan } = request;
    return await this.mailerService.sendMail({
      to: user.username,
      subject: 'Penolakan User Berhasil',
      template: 'user_reject_registration',
      context: {
        name: user.nama,
        alasan: alasan,
      },
    });
  }

  async systemRegistration(system: any): Promise<void> {
    const usernameEmail = await account.findByPk(system.account_id);

    return await this.mailerService.sendMail({
      to: usernameEmail.username,
      subject: 'Sistem Elektronik Anda Menunggu Verifikasi!',
      template: 'system_registration',
      context: {
        name: usernameEmail.nama,
        nama_internal: system.nama_internal,
        created_at: moment(system.created_at).format('DD/MM/YYYY HH:mm'),
      },
    });
  }

  async systemRegistrationPublish(system: any): Promise<void> {
    const usernameEmail = await account.findByPk(system.account_id);

    return await this.mailerService.sendMail({
      to: usernameEmail.username,
      subject: 'Sistem Elektronik Anda Sudah Dipublikasi',
      template: 'system_publish',
      context: {
        name: usernameEmail.nama,
        nama_internal: system.nama_internal,
        created_at: moment(system.created_at).format('DD/MM/YYYY HH:mm'),
      },
    });
  }

  async systemRegistrationInitial(system: any): Promise<void> {
    const usernameEmail = await account.findByPk(system.account_id);

    return await this.mailerService.sendMail({
      to: usernameEmail.username,
      subject: 'Sistem Elektronik Disetujui',
      template: 'system_initial',
      context: {
        name: usernameEmail.nama,
        nama_internal: system.nama_internal,
        created_at: moment(system.created_at).format('DD/MM/YYYY HH:mm'),
      },
    });
  }

  async systemRegistrationApproved(system: any): Promise<void> {
    const usernameEmail = await account.findByPk(system.account_id);
    const acc = await account.findByPk(system.account_id);
    const item: any = await sis_profil.findByPk(system.id);
    if(item.dokumen){
      console.log("With Attach")
      const filePath = process.cwd() + '/assets/document/' + item.dokumen;
      console.log(filePath)

      await this.mailerService.sendMail({
        to: 'Tu.D3@bssn.go.id',
        subject: 'Sistem Elektronik berikut telah mencapai kelengkapan data 100%',
        template: 'pendaftaran_se_100_bsre',
        context: {
          created_at: moment(system.created_at).format('DD/MM/YYYY HH:mm'),
          nama_internal: system.nama_internal,
          nomor_pemohon: system.id,
          nomor_registratsi: system.no_reg,
          nama: acc.nama,
          instansi_induk_text: acc.instansi_induk_text,
          name_sifat_khusus: system.name_sifat_khusus,
        },
        attachments: [
          {
            filename: system.dokumen,
            path: filePath,
            contentDisposition: 'attachment'
          },
        ],
      });
    } else {
      console.log("Without Attach")

      await this.mailerService.sendMail({
        to: 'Tu.D3@bssn.go.id',
        subject: 'Sistem Elektronik berikut telah mencapai kelengkapan data 100%',
        template: 'pendaftaran_se_100_bsre',
        context: {
          created_at: moment(system.created_at).format('DD/MM/YYYY HH:mm'),
          nama_internal: system.nama_internal,
          nomor_pemohon: system.id,
          nomor_registratsi: system.no_reg,
          nama: acc.nama,
          instansi_induk_text: acc.instansi_induk_text,
          name_sifat_khusus: system.name_sifat_khusus,
        },
      });
    }
    
    return await this.mailerService.sendMail({
      to: usernameEmail.username,
      subject: 'Pencantuman Tanda Terdaftar Sistem Elektronik',
      template: 'system_approved',
      context: {
        name: usernameEmail.nama,
        nama_internal: system.nama_internal,
        created_at: moment(system.created_at).format('DD/MM/YYYY HH:mm'),
        no_reg: system.no_reg,
        img_badge: '/storage/badge/' + system.img_badge,
      },
    });
  }

  async systemRegistrationNotificationBadge(system: any): Promise<void> {
    const acc = await account.findByPk(system.account_id);

    return await this.mailerService.sendMail({
      to: acc.username,
      subject: 'Pemasangan Certificate & Badge Sistem Elektronik',
      template: 'system_notification_badge',
      context: {
        nama_internal: system.nama_internal,
        no_reg: system.no_reg,
        img_badge: '/storage/badge/' + system.img_badge,
      },
    });
  }

  async systemRequestUpdate(body: any): Promise<void> {
    const emailAdmin = await this.getUserAdmin();
    const system = await sis_profil.findByPk(body.sis_profil_id);
    const requestUpdate = await request_update.findByPk(body.id);
    const user = await account.findByPk(body.user_id);

    return await this.mailerService.sendMail({
      to: emailAdmin,
      subject: 'Permintaan Pengajuan Perubahan Data',
      template: 'system_request_update',
      context: {
        nama_internal: system.nama_internal,
        nama_eksternal: system.nama_eksternal,
        reason: body.reason,
        username: user.username,
        nama: user.nama,
        instansi_induk_text: user.instansi_induk_text,
        created_at: moment(requestUpdate.created_at).format('DD/MM/YYYY HH:mm'),
      },
    });
  }
  async userSystemRequestUpdate(body: any): Promise<void> {
    const emailAdmin = await this.getUserAdmin();
    const system = await sis_profil.findByPk(body.sis_profil_id);
    const requestUpdate = await request_update.findByPk(body.id);
    const user = await account.findByPk(body.user_id);

    return await this.mailerService.sendMail({
      to: user.username,
      subject: 'Permintaan Pengajuan Perubahan Data',
      template: 'user_system_request_update',
      context: {
        nama_internal: system.nama_internal,
        nama_eksternal: system.nama_eksternal,
        reason: body.reason,
        username: user.username,
        nama: user.nama,
        instansi_induk_text: user.instansi_induk_text,
        created_at: moment(requestUpdate.created_at).format('DD/MM/YYYY HH:mm'),
      },
    });
  }

  async checkProgressSystem(sis_profil_id: any) {
    const item: any = await sis_profil.findByPk(sis_profil_id);
    const percent = async () => {
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
      item.sis_fungsikhususes = await sis_fungsikhusus.findOne({
        where: {
          sis_profil_id: item.id,
        },
      });
      if (item.sis_fungsikhususes) {
        a.push(1);
      } else {
        a.push(0);
      }
      item.sis_ruang_lingkups = await sis_ruang_lingkup.findOne({
        where: {
          sis_profil_id: item.id,
        },
      });
      if (item.sis_ruang_lingkups) {
        a.push(1);
      } else {
        a.push(0);
      }
      item.sis_jenis_layanans = await sis_jenis_layanan.findOne({
        where: {
          sis_profil_id: item.id,
        },
      });
      if (item.sis_jenis_layanans) {
        a.push(1);
      } else {
        a.push(0);
      }
      item.sis_pengamen = await sis_pengaman.findOne({
        where: {
          sis_profil_id: item.id,
        },
      });
      if (item.sis_pengamen) {
        a.push(1);
      } else {
        a.push(0);
      }
      item.sis_hardwares = await sis_hardware.findOne({
        where: {
          sis_profil_id: item.id,
        },
      });

      if (item.sis_hardwares) {
        a.push(1);
      } else {
        a.push(0);
      }
      item.sis_softwares = await sis_software.findOne({
        where: {
          sis_profil_id: item.id,
        },
      });
      if (item.sis_softwares) {
        a.push(1);
      } else {
        a.push(0);
      }
      item.sis_tenaga_ahli_stocks = await sis_tenaga_ahli.findOne({
        where: {
          sis_profil_id: item.id,
        },
      });

      if (item.sis_tenaga_ahli_stocks) {
        a.push(1);
      } else {
        a.push(0);
      }
      item.sis_tata_kelolas = await sis_tata_kelola.findOne({
        where: {
          sis_profil_id: item.id,
        },
      });
      if (item.sis_tata_kelolas) {
        a.push(1);
      } else {
        a.push(0);
      }
      item.sis_sops = await sis_sop.findOne({
        where: {
          sis_profil_id: item.id,
        },
      });
      if (item.sis_sops) {
        a.push(1);
      } else {
        a.push(0);
      }

      const totalItem = a.length;
      const totalSum: number = a.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );

      return (totalSum / totalItem) * 100;
    };

    if ((await percent()) === 100) {
      const emailAdmin = await this.getUserAdmin();
      const acc = await account.findByPk(item.account_id);
      const filePath = process.cwd() + '/assets/document/' + item.dokumen;
      console.log(acc.instansi_induk_text);

      await this.mailerService.sendMail({
        to: 'Tu.D3@bssn.go.id',
        subject: 
          'Sistem Elektronik berikut telah mencapai kelengkapan data 100%',
        template: 'pendaftaran_se_100_bsre',
        context: {
          created_at: moment(item.created_at).format('DD/MM/YYYY HH:mm'),
          nama_internal: item.nama_internal,
          nomor_pemohon: item.id,
          nomor_registratsi: item.no_reg,
          nama: acc.nama,
          instansi_induk_text: acc.instansi_induk_text,
        },
        attachments: [
          {
            name: item.dokumen,
            path: filePath,
          },
        ],
      });

      await this.mailerService.sendMail({
        // to: 'emailadmin@yopmail.com',
        to: emailAdmin,
        subject:
          'Sistem Elektronik berikut telah mencapai kelengkapan data 100%',
        template: 'pendaftaran_se_100',
        context: {
          created_at: moment(item.created_at).format('DD/MM/YYYY HH:mm'),
          nama_internal: item.nama_internal,
          nama_eksternal: item.nama_eksternal,
          instansi_induk_text: acc.instansi_induk_text,
          nama: acc.nama,
          username: acc.username,
        },
      });
    }
  }

  async getUserAdmin() {
    const acc = await account.findAll({
      attributes: ['username'],
      where: {
        is_admin: 1,
        is_notify: true,
      },
    });

    return acc.map((account) => account.username);
  }
}
