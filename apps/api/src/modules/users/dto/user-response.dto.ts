import { Expose, Transform } from 'class-transformer';

type UserTransformSource = {
  _id?: { toString(): string };
  id?: string;
};
export class UserResponseDto {
  @Expose()
  @Transform(
    ({ obj }: { obj: UserTransformSource }) =>
      obj._id?.toString() ?? obj.id ?? '',
  )
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
