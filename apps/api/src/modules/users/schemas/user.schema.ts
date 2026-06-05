import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/modules/access/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    default: null,
  })
  refreshToken?: string;

  @Prop({
  type: String,
  enum: Role,
  default: Role.ADMIN,
})
role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);