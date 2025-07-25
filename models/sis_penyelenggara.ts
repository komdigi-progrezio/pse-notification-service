import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { sis_profil } from './sis_profil';
import { par_satuan_kerja } from './par_satuan_kerja';

export interface sis_penyelenggaraAttributes {
  id?: number;
  sis_profil_id?: number;
  nama?: string;
  alamat?: string;
  kelurahan?: string;
  kecamatan?: string;
  kota?: number;
  kode_pos?: string;
  propinsi?: number;
  no_telepon?: string;
  created_at?: Date;
  modified_at?: Date;
  url?: string;
  par_satuan_kerja_id?: number;
}

@Table({ tableName: 'sis_penyelenggara', schema: 'public', timestamps: false })
export class sis_penyelenggara
  extends Model<sis_penyelenggaraAttributes, sis_penyelenggaraAttributes>
  implements sis_penyelenggaraAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('sis_penyelenggara_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'sis_penyelenggara_pkey', using: 'btree', unique: true })
  id?: number;

  @ForeignKey(() => sis_profil)
  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(500) })
  nama?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  alamat?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  kelurahan?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  kecamatan?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  kota?: number;

  @Column({ allowNull: true, type: DataType.STRING(5) })
  kode_pos?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  propinsi?: number;

  @Column({ allowNull: true, type: DataType.STRING(20) })
  no_telepon?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  url?: string;

  @ForeignKey(() => par_satuan_kerja)
  @Column({ allowNull: true, type: DataType.INTEGER })
  par_satuan_kerja_id?: number;

  @BelongsTo(() => sis_profil)
  sis_profil?: sis_profil;

  @BelongsTo(() => par_satuan_kerja)
  par_satuan_kerja?: par_satuan_kerja;
}
