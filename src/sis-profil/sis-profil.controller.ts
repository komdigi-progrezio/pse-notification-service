import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SisProfilService } from './sis-profil.service';

@Controller()
export class SisProfilController {
  constructor(private readonly sisProfileService: SisProfilService) {}

  @MessagePattern('getComplete')
  getComplete() {
    return this.sisProfileService.findComplete({});
  }

  @MessagePattern('getNew')
  getNew() {
    return this.sisProfileService.findNew({});
  }

  @MessagePattern('getUbahData')
  getUbahData(@Payload() request: { filter: string; q: string }) {
    return this.sisProfileService.getUbahData(request);
  }

  @MessagePattern('getPergantian')
  getPergantian() {
    return this.sisProfileService.getPergantian();
  }

  @MessagePattern('getPejabatBaru')
  getPejabatBaru() {
    return this.sisProfileService.getPejabatBaru();
  }
}
