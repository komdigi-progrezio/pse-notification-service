import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { sis_document } from './sis_document';
import { sis_pengguna } from './sis_pengguna';
import { sis_hardware } from './sis_hardware';
import { sis_network } from './sis_network';
import { sis_peripheral } from './sis_peripheral';
import { sis_software } from './sis_software';
import { sis_software_tools } from './sis_software_tools';
import { sis_tenaga_ahli } from './sis_tenaga_ahli';
import { sis_tenaga_ahli_stock } from './sis_tenaga_ahli_stock';

export interface par_configAttributes {
  id?: number;
  param_name?: string;
  param_value?: string;
  created_at?: Date;
  modified_at?: Date;
  category?: string;
  instansi_id?: number;
  approved?: number;
}

@Table({ tableName: 'par_config', schema: 'public', timestamps: false })
export class par_config
  extends Model<par_configAttributes, par_configAttributes>
  implements par_configAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('par_config_id_seq'::regclass)"),
  })
  @Index({ name: 'par_config_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  param_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  param_value?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  category?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  instansi_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  approved?: number;

  @HasOne(() => sis_document, { sourceKey: 'id' })
  sis_document?: sis_document;

  @HasOne(() => sis_pengguna, { sourceKey: 'id' })
  sis_pengguna?: sis_pengguna;

  @HasOne(() => sis_hardware, { sourceKey: 'id' })
  sis_hardware?: sis_hardware;

  @HasOne(() => sis_network, { sourceKey: 'id' })
  sis_network?: sis_network;

  @HasOne(() => sis_peripheral, { sourceKey: 'id' })
  sis_peripheral?: sis_peripheral;

  @HasOne(() => sis_software, { sourceKey: 'id' })
  sis_software?: sis_software;

  @HasOne(() => sis_software_tools, { sourceKey: 'id' })
  sis_software_tool?: sis_software_tools;

  @HasOne(() => sis_tenaga_ahli, { sourceKey: 'id' })
  sis_tenaga_ahli?: sis_tenaga_ahli;

  @HasOne(() => sis_tenaga_ahli_stock, { sourceKey: 'id' })
  sis_tenaga_ahli_stock?: sis_tenaga_ahli_stock;
}
