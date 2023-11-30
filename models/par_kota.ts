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
import { par_satuan_kerja } from './par_satuan_kerja';

export interface par_kotaAttributes {
  id?: number;
  nama?: string;
  id_propinsi?: number;
}

@Table({ tableName: 'par_kota', schema: 'public', timestamps: false })
export class par_kota
  extends Model<par_kotaAttributes, par_kotaAttributes>
  implements par_kotaAttributes
{
  @ForeignKey(() => par_satuan_kerja)
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('par_kota_id_seq'::regclass)"),
  })
  @Index({ name: 'par_kota_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  nama?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  id_propinsi?: number;

  @BelongsTo(() => par_satuan_kerja)
  par_satuan_kerja?: par_satuan_kerja;
}
