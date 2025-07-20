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

  // not yet implemented on master data storePejabatPublic
  @MessagePattern('pejabatPendaftarBaru')
  pejabatPendaftarBaru(@Payload() request: any) {
    return this.mailService.pejabatPendaftarBaru(request);
  }

  // not yet implemented on master data storePejabatPublic
  @MessagePattern('pejabatPendaftarPengganti')
  pejabatPendaftarPengganti(@Payload() request: any) {
    return this.mailService.pejabatPendaftarPengganti(request);
  }

  // not yet implemented on user parentUserFilter
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

  @MessagePattern('userApproved')
  userApproved(@Payload() request: any) {
    return this.mailService.userApproved(request);
  }

  @MessagePattern('userRegistration')
  userRegistration(@Payload() request: any) {
    return this.mailService.userRegistration(request);
  }

  @MessagePattern('userGetOtp')
  userGetOtp(@Payload() request: { username: any; otpCode: { otpCode: number } }) {
    return this.mailService.userGetOtp(request);
  }

  @MessagePattern('userDisableAccountSubstitution')
  userDisableAccountSubstitution(@Payload() request: any) {
    return this.mailService.userDisableAccountSubstitution(request);
  }

  @MessagePattern('userRejectRegistration')
  userRejectRegistration(@Payload() request: { user: any; alasan: string }) {
    return this.mailService.userRejectRegistration(request);
  }

  @MessagePattern('userEnableAccountSubstitution')
  userEnableAccountSubstitution(@Payload() request: any) {
    return this.mailService.userEnableAccountSubstitution(request);
  }

  @MessagePattern('systemRegistration')
  systemRegistration(@Payload() request: any) {
    return this.mailService.systemRegistration(request);
  }

  @MessagePattern('systemRegistrationPublish')
  systemRegistrationPublish(@Payload() request: any) {
    return this.mailService.systemRegistrationPublish(request);
  }

  @MessagePattern('systemRegistrationInitial')
  systemRegistrationInitial(@Payload() request: any) {
    return this.mailService.systemRegistrationInitial(request);
  }

  @MessagePattern('systemRegistrationApproved')
  systemRegistrationApproved(@Payload() request: any) {
    return this.mailService.systemRegistrationApproved(request);
  }

  @MessagePattern('systemRegistrationNotificationBadge')
  systemRegistrationNotificationBadge(@Payload() request: any) {
    return this.mailService.systemRegistrationNotificationBadge(request);
  }

  @MessagePattern('systemRequestUpdate')
  systemRequestUpdate(@Payload() request: any) {
    return this.mailService.systemRequestUpdate(request);
  }
  @MessagePattern('userSystemRequestUpdate')
  userSystemRequestUpdate(@Payload() request: any) {
    return this.mailService.userSystemRequestUpdate(request);
  }
  @MessagePattern('checkProgressSystem')
  checkProgressSystem(@Payload() request: any) {
    return this.mailService.checkProgressSystem(request);
  }

  @MessagePattern('sendCreatePasswordEmail')
  sendCreatePasswordEmail(@Payload() request: { email: string; link: string }) {
    return this.mailService.sendCreatePasswordEmail(request);
  }

}
