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
import { par_config } from './par_config';

export interface sis_networkAttributes {
  id?: number;
  sis_profil_id?: number;
  jenis?: number;
  type?: string;
  keterangan?: string;
  created_at?: Date;
  modified_at?: Date;
}

@Table({ tableName: 'sis_network', schema: 'public', timestamps: false })
export class sis_network
  extends Model<sis_networkAttributes, sis_networkAttributes>
  implements sis_networkAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('sis_network_id_seq'::regclass)"),
  })
  @Index({ name: 'sis_network_pkey', using: 'btree', unique: true })
  id?: number;

  @ForeignKey(() => sis_profil)
  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @ForeignKey(() => par_config)
  @Column({ allowNull: true, type: DataType.INTEGER })
  jenis?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  type?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  keterangan?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @BelongsTo(() => sis_profil)
  sis_profil?: sis_profil;

  @BelongsTo(() => par_config)
  par_config?: par_config;
}
