import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { sis_penyelenggara } from './sis_penyelenggara';
import { par_instansi } from './par_instansi';
import { sis_penanggung_jawab } from './sis_penanggung_jawab';
import { par_propinsi } from './par_propinsi';
import { par_kota } from './par_kota';

export interface par_satuan_kerjaAttributes {
  id?: number;
  parent_id?: number;
  name?: string;
  created_at?: Date;
  modified_at?: Date;
  alamat?: string;
  kota?: number;
  propinsi?: number;
  kode_pos?: string;
  instansi_id?: number;
  no_telp?: string;
  website?: string;
}

@Table({ tableName: 'par_satuan_kerja', schema: 'public', timestamps: false })
export class par_satuan_kerja
  extends Model<par_satuan_kerjaAttributes, par_satuan_kerjaAttributes>
  implements par_satuan_kerjaAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('par_satuan_kerja_gid_seq'::regclass)",
    ),
  })
  @Index({ name: 'par_instansi_copy_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  parent_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(250) })
  name?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({ allowNull: true, type: DataType.STRING })
  alamat?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  kota?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  propinsi?: number;

  @Column({ allowNull: true, type: DataType.STRING(10) })
  kode_pos?: string;

  @ForeignKey(() => par_instansi)
  @Column({ allowNull: true, type: DataType.INTEGER })
  instansi_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  no_telp?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  website?: string;

  @HasMany(() => sis_penyelenggara, { sourceKey: 'id' })
  sis_penyelenggaras?: sis_penyelenggara[];

  @BelongsTo(() => par_instansi)
  par_instansi?: par_instansi;

  @HasOne(() => sis_penanggung_jawab, { sourceKey: 'id' })
  sis_penanggung_jawab?: sis_penanggung_jawab;

  @HasOne(() => par_propinsi, { sourceKey: 'propinsi' })
  par_propinsi?: par_propinsi;

  @HasOne(() => par_kota, { sourceKey: 'kota' })
  par_kota?: par_kota;
}
