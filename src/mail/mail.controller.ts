import { Controller } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern('pejabatPendaftarAktivasi')
  pejabatPendaftarAktivasi(@Payload() request: any) {
    return this.mailService.pejabatPendaftarAktivasi(request);
  }

}
