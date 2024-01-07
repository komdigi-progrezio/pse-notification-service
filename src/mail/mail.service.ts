import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as moment from 'moment';
import { account } from 'models/account';

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
    return await this.mailerService.sendMail({
      to: 'pse@layanan.go.id',
      subject: 'Pejabat Pendaftar baru telah melakukan pendaftaran',
      template: 'pejabat_pendaftar_baru',
      context: {
        created_at: moment(user.created_at).format('dd/MM/yyyy HH:mm'),
        username: user.username,
        nama: user.nama,
        nip: user.nip,
        jabatan: user.jabatan,
        instansi_induk_text: user.instansi_induk_text,
      },
    });
  }

  async pejabatPendaftarPengganti(user: any): Promise<void> {
    return await this.mailerService.sendMail({
      to: 'pse@layanan.go.id',
      subject: 'Pejabat Pengganti baru telah melakukan pendaftaran',
      template: 'pejabat_pendaftar_pengganti',
      context: {
        created_at: moment(user.created_at).format('dd/MM/yyyy HH:mm'),
        username: user.username,
        nama: user.nama,
        nip: user.nip,
        jabatan: user.jabatan,
        instansi_induk_text: user.instansi_induk_text,
      },
    });
  }

  async pendaftaranSubPejabat(user: any): Promise<void> {
    return await this.mailerService.sendMail({
      to: 'pse@layanan.go.id',
      subject: 'Sub-Pejabat baru telah didaftarkan',
      template: 'pendaftaran_sub_pejabat',
      context: {
        created_at: moment(user.created_at).format('dd/MM/yyyy HH:mm'),
        username: user.username,
        nama: user.nama,
        nip: user.nip,
        jabatan: user.jabatan,
        instansi_induk_text: user.instansi_induk_text,
      },
    });
  }

  async pendaftaranSeBaru(sisProfil: any): Promise<void> {
    return await this.mailerService.sendMail({
      to: 'pse@layanan.go.id',
      subject: 'Sistem Elektronik baru telah didaftarkan',
      template: 'pendaftaran_se_baru',
      context: {
        created_at: moment(sisProfil.created_at).format('dd/MM/yyyy HH:mm'),
        nama_internal: sisProfil.nama_internal,
        nama_eksternal: sisProfil.nama_eksternal,
        username: sisProfil.user.username,
        nama: sisProfil.user.nama,
        instansi_induk_text: sisProfil.user.instansi_induk_text,
      },
    });
  }

  async pendaftaranSe100(sisProfil: any): Promise<void> {
    return await this.mailerService.sendMail({
      to: 'pse@layanan.go.id',
      subject: 'Sistem Elektronik berikut telah mencapai kelengkapan data 100%',
      template: 'pendaftaran_se_100',
      context: {
        created_at: moment(sisProfil.created_at).format('dd/MM/yyyy HH:mm'),
        nama_internal: sisProfil.nama_internal,
        nama_eksternal: sisProfil.nama_eksternal,
        instansi_induk_text: sisProfil.user.instansi_induk_text,
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

  async userEnableAccountSubstitution(
    user: any,
    random_password: any,
  ): Promise<void> {
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
    return await this.mailerService.sendMail({
      to: system.user.username,
      subject: 'Sistem Elektronik Anda Menunggu Verifikasi!',
      template: 'system_registration',
      context: {
        name: system.user.nama,
        nama_internal: system.nama_internal,
        created_at: moment(system.created_at).format('dd/MM/yyyy HH:mm'),
      },
    });
  }

  async systemRegistrationPublish(system: any): Promise<void> {
    return await this.mailerService.sendMail({
      to: system.user.username,
      subject: 'Sistem Elektronik Anda Sudah Dipublikasi',
      template: 'system_publish',
      context: {
        name: system.user.nama,
        nama_internal: system.nama_internal,
        created_at: moment(system.created_at).format('dd/MM/yyyy HH:mm'),
      },
    });
  }

  async systemRegistrationInitial(system: any): Promise<void> {
    return await this.mailerService.sendMail({
      to: system.user.username,
      subject: 'Sistem Elektronik Disetujui',
      template: 'system_initial',
      context: {
        name: system.user.nama,
        nama_internal: system.nama_internal,
        created_at: moment(system.created_at).format('dd/MM/yyyy HH:mm'),
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
        created_at: moment(system.created_at).format('dd/MM/yyyy HH:mm'),
        no_reg: system.no_reg,
        img_badge: '/storage/badge/' + system.img_badge,
      },
    });
  }

  async systemRegistrationNotificationBadge(system: any): Promise<void> {
    return await this.mailerService.sendMail({
      to: system.user.username,
      subject: 'Pemasangan Certificate & Badge Sistem Elektronik',
      template: 'system_notification_badge',
      context: {
        nama_internal: system.nama_internal,
        no_reg: system.no_reg,
        img_badge: '/storage/badge/' + system.img_badge,
      },
    });
  }
}
