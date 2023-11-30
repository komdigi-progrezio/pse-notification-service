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

export interface par_propinsiAttributes {
  id?: number;
  nama?: string;
}

@Table({ tableName: 'par_propinsi', schema: 'public', timestamps: false })
export class par_propinsi
  extends Model<par_propinsiAttributes, par_propinsiAttributes>
  implements par_propinsiAttributes
{
  @ForeignKey(() => par_satuan_kerja)
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('par_propinsi_id_seq'::regclass)"),
  })
  @Index({ name: 'par_propinsi_pkey', using: 'btree', unique: true })
  @Index({ name: 'par_propinsi_id_key', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  nama?: string;

  @BelongsTo(() => par_satuan_kerja)
  par_satuan_kerja?: par_satuan_kerja;
}
