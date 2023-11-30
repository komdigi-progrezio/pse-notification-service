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

export interface sis_software_toolsAttributes {
  id?: number;
  sis_profil_id?: number;
  jenis?: number;
  deskripsi?: string;
  created_at?: Date;
  modified_at?: Date;
}

@Table({ tableName: 'sis_software_tools', schema: 'public', timestamps: false })
export class sis_software_tools
  extends Model<sis_software_toolsAttributes, sis_software_toolsAttributes>
  implements sis_software_toolsAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('sis_software_tools_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'sis_software_tools_pkey', using: 'btree', unique: true })
  id?: number;

  @ForeignKey(() => sis_profil)
  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @ForeignKey(() => par_config)
  @Column({ allowNull: true, type: DataType.INTEGER })
  jenis?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  deskripsi?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @BelongsTo(() => sis_profil)
  sis_profil?: sis_profil;

  @BelongsTo(() => par_config)
  par_config?: par_config;
}
