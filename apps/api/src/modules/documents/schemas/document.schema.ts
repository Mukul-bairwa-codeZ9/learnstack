import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { DocumentStatus } from '../enums/document-status.enum';

export type DocumentEntity = HydratedDocument<Document>;

@Schema({
  timestamps: true,
})
export class Document {
  @Prop({
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    required: true,
    trim: true,
  })
  slug: string;

  @Prop({
    type: Object,
    default: {},
  })
  content: Record<string, any>;

  @Prop({
    type: String,
    enum: DocumentStatus,
    default: DocumentStatus.DRAFT,
  })
  status: DocumentStatus;

  @Prop({
    type: Types.ObjectId,
    ref: 'Workspace',
    required: true,
  })
  workspaceId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdBy: Types.ObjectId;

  @Prop({
    type: Date,
    default: null,
  })
  publishedAt?: Date | null;

  @Prop({
    type: Date,
    default: null,
  })
  archivedAt?: Date | null;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);

DocumentSchema.index(
  {
    workspaceId: 1,
    slug: 1,
  },
  {
    unique: true,
  },
);
