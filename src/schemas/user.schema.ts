import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


@Schema()
export class USER {
  @Prop()
  username: string;

  @Prop({unique:true})
  email: string;

  @Prop()
  password: string;

  @Prop()
  country: string;
}

export type UserDocument = HydratedDocument<USER>;

export const UserSchema = SchemaFactory.createForClass(USER);
