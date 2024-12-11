import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasOne,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { sis_penyelenggara } from './sis_penyelenggara';
import { request_update } from './request_update';
import { account } from './account';
import { sis_penanggung_jawab } from './sis_penanggung_jawab';
import { sis_fungsikhusus } from './sis_fungsikhusus';
import { sis_ruang_lingkup } from './sis_ruang_lingkup';
import { sis_jenis_layanan } from './sis_jenis_layanan';
import { sis_pengaman } from './sis_pengaman';
import { sis_tata_kelola } from './sis_tata_kelola';
import { sis_sop } from './sis_sop';
import { sis_software } from './sis_software';
import { sis_hardware } from './sis_hardware';
import { sis_tenaga_ahli_stock } from './sis_tenaga_ahli_stock';
import { sis_tenaga_ahli } from './sis_tenaga_ahli';
import { sis_helpdesk } from './sis_helpdesk';
import { sis_document } from './sis_document';
import { sis_integrasi } from './sis_integrasi';
import { sis_sertifikat } from './sis_sertifikat';
import { sis_pengguna } from './sis_pengguna';
import { sis_network } from './sis_network';
import { sis_peripheral } from './sis_peripheral';
import { sis_software_tools } from './sis_software_tools';

export interface sis_profilAttributes {
  id?: number;
  account_id?: number;
  nama_internal?: string;
  nama_eksternal?: string;
  deskripsi?: string;
  fungsi?: string;
  cakupan_wilayah?: string;
  keterkaitan_sistem?: number;
  keterkaitan_sistem_text?: string;
  sifat_khusus?: string;
  created_at?: Date;
  modified_at?: Date;
  approved?: number;
  approved_date?: Date;
  no_reg?: number;
  img_badge?: string;
  flag_sistem_pengaman?: number;
  flag_sertifikasi?: number;
  flag_dasar_hukum?: number;
  flag_sop?: number;
  kategori_akses?: string;
  url?: string;
  publish?: number;
  publish_date?: Date;
  deleted?: number;
  flag_tenaga_ahli?: number;
  is_locked?: boolean;
  locked_at?: Date;
  keylock?: string;
  keylock_at?: Date;
  keylock_expired?: Date;
  approved_publish?: boolean;
  approved_publish_date?: Date;
  dokumen?: string;
}

@Table({ tableName: 'sis_profil', schema: 'public', timestamps: false })
export class sis_profil
  extends Model<sis_profilAttributes, sis_profilAttributes>
  implements sis_profilAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('sis_profil_id_seq'::regclass)"),
  })
  @Index({ name: 'sis_profil_pkey', using: 'btree', unique: true })
  @Index({ name: 'sis_profil_id_key', using: 'btree', unique: true })
  id?: number;

  @ForeignKey(() => account)
  @Column({ allowNull: true, type: DataType.INTEGER })
  @Index({ name: 'account_index', using: 'btree', unique: false })
  account_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  nama_internal?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  nama_eksternal?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  deskripsi?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  fungsi?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  cakupan_wilayah?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  keterkaitan_sistem?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  keterkaitan_sistem_text?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  sifat_khusus?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  approved?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  approved_date?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  no_reg?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  img_badge?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  flag_sistem_pengaman?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  flag_sertifikasi?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  flag_dasar_hukum?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  flag_sop?: number;

  @Column({ allowNull: true, type: DataType.STRING(20) })
  kategori_akses?: string;

  @Column({ allowNull: true, type: DataType.STRING(300) })
  url?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  publish?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  publish_date?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal('0'),
  })
  deleted?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  flag_tenaga_ahli?: number;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  is_locked?: boolean;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  locked_at?: Date;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  keylock?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  keylock_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  keylock_expired?: Date;

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
    defaultValue: Sequelize.literal('true'),
  })
  approved_publish?: boolean;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  approved_publish_date?: Date;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  dokumen?: string;

  @HasOne(() => sis_penyelenggara, { sourceKey: 'id' })
  sis_penyelenggara?: sis_penyelenggara;

  @HasOne(() => request_update, { sourceKey: 'id' })
  request_update?: request_update;

  @BelongsTo(() => account)
  account?: account;

  @HasOne(() => sis_penanggung_jawab, { sourceKey: 'id' })
  sis_penanggung_jawab?: sis_penanggung_jawab;

  @HasMany(() => sis_fungsikhusus, { sourceKey: 'id' })
  sis_fungsikhususes?: sis_fungsikhusus[];

  @HasMany(() => sis_ruang_lingkup, { sourceKey: 'id' })
  sis_ruang_lingkups?: sis_ruang_lingkup[];

  @HasMany(() => sis_jenis_layanan, { sourceKey: 'id' })
  sis_jenis_layanans?: sis_jenis_layanan[];

  @HasMany(() => sis_pengaman, { sourceKey: 'id' })
  sis_pengaman?: sis_pengaman[];

  @HasMany(() => sis_tata_kelola, { sourceKey: 'id' })
  sis_tata_kelolas?: sis_tata_kelola[];

  @HasMany(() => sis_sop, { sourceKey: 'id' })
  sis_sops?: sis_sop[];

  @HasMany(() => sis_software, { sourceKey: 'id' })
  sis_softwares?: sis_software[];

  @HasMany(() => sis_hardware, { sourceKey: 'id' })
  sis_hardwares?: sis_hardware[];

  @HasMany(() => sis_tenaga_ahli_stock, { sourceKey: 'id' })
  sis_tenaga_ahli_stocks?: sis_tenaga_ahli_stock[];

  @HasMany(() => sis_tenaga_ahli, { sourceKey: 'id' })
  sis_tenaga_ahlis?: sis_tenaga_ahli[];

  @HasMany(() => sis_helpdesk, { sourceKey: 'id' })
  sis_helpdesks?: sis_helpdesk[];

  @HasMany(() => sis_document, { sourceKey: 'id' })
  sis_documents?: sis_document[];

  @HasMany(() => sis_integrasi, { sourceKey: 'id' })
  sis_integrasis?: sis_integrasi[];

  @HasMany(() => sis_sertifikat, { sourceKey: 'id' })
  sis_sertifikats?: sis_sertifikat[];

  @HasMany(() => sis_pengguna, { sourceKey: 'id' })
  sis_penggunas?: sis_pengguna[];

  @HasMany(() => sis_network, { sourceKey: 'id' })
  sis_networks?: sis_network[];

  @HasMany(() => sis_peripheral, { sourceKey: 'id' })
  sis_peripherals?: sis_peripheral[];

  @HasMany(() => sis_software_tools, { sourceKey: 'id' })
  sis_software_tools?: sis_software_tools[];
}
