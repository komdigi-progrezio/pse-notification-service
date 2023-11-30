import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sis_profil } from 'models/sis_profil';
import { SisProfilModule } from './sis-profil/sis-profil.module';
import { sis_penyelenggara } from 'models/sis_penyelenggara';
import { par_satuan_kerja } from 'models/par_satuan_kerja';
import { par_instansi } from 'models/par_instansi';
import { sis_penanggung_jawab } from 'models/sis_penanggung_jawab';
import { par_propinsi } from 'models/par_propinsi';
import { par_kota } from 'models/par_kota';
import { sis_fungsikhusus } from 'models/sis_fungsikhusus';
import { request_update } from 'models/request_update';
import { sis_ruang_lingkup } from 'models/sis_ruang_lingkup';
import { sis_jenis_layanan } from 'models/sis_jenis_layanan';
import { sis_pengaman } from 'models/sis_pengaman';
import { sis_tata_kelola } from 'models/sis_tata_kelola';
import { sis_sop } from 'models/sis_sop';
import { sis_software } from 'models/sis_software';
import { sis_software_tools } from 'models/sis_software_tools';
import { sis_tenaga_ahli_stock } from 'models/sis_tenaga_ahli_stock';
import { sis_hardware } from 'models/sis_hardware';
import { sis_tenaga_ahli } from 'models/sis_tenaga_ahli';
import { sis_helpdesk } from 'models/sis_helpdesk';
import { sis_document } from 'models/sis_document';
import { sis_integrasi } from 'models/sis_integrasi';
import { sis_peripheral } from 'models/sis_peripheral';
import { sis_sertifikat } from 'models/sis_sertifikat';
import { sis_pengguna } from 'models/sis_pengguna';
import { sis_network } from 'models/sis_network';
import { account } from 'models/account';
import { account_roles } from 'models/account_roles';
import { roles } from 'models/roles';
import { role_has_permissions } from 'models/role_has_permissions';
import { permissions } from 'models/permissions';
import { par_config } from 'models/par_config';
import { users } from 'models/users';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([
      account,
      account_roles,
      roles,
      role_has_permissions,
      permissions,
      par_config,
      sis_fungsikhusus,
      sis_profil,
      sis_penyelenggara,
      par_satuan_kerja,
      par_instansi,
      sis_penanggung_jawab,
      par_propinsi,
      par_kota,
      request_update,
      sis_fungsikhusus,
      sis_ruang_lingkup,
      sis_jenis_layanan,
      sis_pengaman,
      sis_tata_kelola,
      sis_sop,
      sis_software,
      sis_hardware,
      sis_tenaga_ahli_stock,
      sis_tenaga_ahli,
      sis_helpdesk,
      sis_document,
      sis_integrasi,
      sis_sertifikat,
      sis_pengguna,
      sis_network,
      sis_peripheral,
      sis_software_tools,
      users,
    ]),
    SisProfilModule,
  ],
})
export class AppModule {}
