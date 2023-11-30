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

export interface sis_tenaga_ahli_stockAttributes {
  id?: number;
  sis_profil_id?: number;
  jenis?: number;
  jumlah_personil?: string;
  status?: string;
  created_at?: Date;
  modified_at?: Date;
}

@Table({
  tableName: 'sis_tenaga_ahli_stock',
  schema: 'public',
  timestamps: false,
})
export class sis_tenaga_ahli_stock
  extends Model<
    sis_tenaga_ahli_stockAttributes,
    sis_tenaga_ahli_stockAttributes
  >
  implements sis_tenaga_ahli_stockAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('sis_tenaga_ahli_stock_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'sis_tenaga_ahli_stock_pkey', using: 'btree', unique: true })
  id?: number;

  @ForeignKey(() => sis_profil)
  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @ForeignKey(() => par_config)
  @Column({ allowNull: true, type: DataType.INTEGER })
  jenis?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  jumlah_personil?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  status?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @BelongsTo(() => sis_profil)
  sis_profil?: sis_profil;

  @BelongsTo(() => par_config)
  par_config?: par_config;
}
