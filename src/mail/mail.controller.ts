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

  @MessagePattern('pejabatPendaftarBaru')
  pejabatPendaftarBaru(@Payload() request: any) {
    return this.mailService.pejabatPendaftarBaru(request);
  }

  @MessagePattern('pejabatPendaftarPengganti')
  pejabatPendaftarPengganti(@Payload() request: any) {
    return this.mailService.pejabatPendaftarPengganti(request);
  }
  
  @MessagePattern('pendaftaranSubPejabat')
  pendaftaranSubPejabat(@Payload() request: any) {
    return this.mailService.pendaftaranSubPejabat(request);
  }
  
  @MessagePattern('pendaftaranSeBaru')
  pendaftaranSeBaru(@Payload() request: any) {
    return this.mailService.pendaftaranSeBaru(request);
  }
  
  @MessagePattern('pendaftaranSe100')
  pendaftaranSe100(@Payload() request: any) {
    return this.mailService.pendaftaranSe100(request);
  }

}
