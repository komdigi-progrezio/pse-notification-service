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

export interface sis_documentAttributes {
  id: string;
  sis_profil_id?: number;
  name?: string;
  dokumen?: string;
  created_at?: Date;
  modified_at?: Date;
  category?: number;
}

@Table({ tableName: 'sis_document', schema: 'public', timestamps: false })
export class sis_document
  extends Model<sis_documentAttributes, sis_documentAttributes>
  implements sis_documentAttributes
{
  @Column({ primaryKey: true, type: DataType.STRING(255) })
  @Index({ name: 'sis_document_pkey', using: 'btree', unique: true })
  id!: string;

  @ForeignKey(() => sis_profil)
  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  dokumen?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @ForeignKey(() => par_config)
  @Column({ allowNull: true, type: DataType.INTEGER })
  category?: number;

  @BelongsTo(() => sis_profil)
  sis_profil?: sis_profil;

  @BelongsTo(() => par_config)
  par_config?: par_config;
}
