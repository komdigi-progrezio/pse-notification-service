import { Module } from '@nestjs/common';
import { SisProfilService } from './sis-profil.service';
import { SisProfilController } from './sis-profil.controller';

@Module({
  controllers: [SisProfilController],
  providers: [SisProfilService],
})
export class SisProfilModule {}
