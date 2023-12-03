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
}
