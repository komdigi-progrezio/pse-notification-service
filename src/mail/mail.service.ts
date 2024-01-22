import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as moment from 'moment';
import { account } from 'models/account';
import { sis_profil } from 'models/sis_profil';
import { request_update } from 'models/request_update';

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
