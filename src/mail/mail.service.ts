import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

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
        user,
      },
    });
  }
  
  async pejabatPendaftarPengganti(user: any): Promise<void> {
    return await this.mailerService.sendMail({
      to: 'pse@layanan.go.id',
      subject: 'Pejabat Pengganti baru telah melakukan pendaftaran',
      template: 'pejabat_pendaftar_pengganti',
      context: {
        user,
      },
    });
  }

  async pendaftaranSubPejabat(user: any): Promise<void> {
    return await this.mailerService.sendMail({
      to: 'pse@layanan.go.id',
      subject: 'Sub-Pejabat baru telah didaftarkan',
      template: 'pendaftaran_sub_pejabat',
      context: {
        user,
      },
    });
  }
  
  async pendaftaranSeBaru(data: any): Promise<void> {
    return await this.mailerService.sendMail({
      to: 'pse@layanan.go.id',
      subject: 'Sistem Elektronik baru telah didaftarkan',
      template: 'pendaftaran_se_baru',
      context: {
        data,
      },
    });
  }

  async pendaftaranSe100(user: any): Promise<void> {
    return await this.mailerService.sendMail({
      to: '',
      subject: 'Sistem Elektronik berikut telah mencapai kelengkapan data 100%',
      template: 'pendaftaran_se_100',
      context: {
        user,
      },
    });
  }

}
