import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { WorkspaceVisibility } from '../enums/workspace.enums';

export type WorkspaceDocument = HydratedDocument<Workspace>;

@Schema({
  timestamps: true,
})
export class Workspace {
  @Prop({
    required: true,
    trim: true,
    maxlength: 100,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  slug: string;

  @Prop({
    default: '',
    maxlength: 500,
  })
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  ownerId: Types.ObjectId;

  @Prop({
    enum: WorkspaceVisibility,
    default: WorkspaceVisibility.PRIVATE,
  })
  visibility: WorkspaceVisibility;
}

export const WorkspaceSchema =
  SchemaFactory.createForClass(Workspace);