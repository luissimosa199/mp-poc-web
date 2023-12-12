import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

@modelOptions({ options: { allowMixed: 0 } })
class Visit {
  @prop()
  timestamp: Date;

  @prop()
  utm_params: Record<string, string>;

  @prop()
  entry_point: string;

  @prop()
  device: Record<string, any>;

  @prop()
  os: Record<string, any>;

  @prop()
  browser: Record<string, any>;
}

class PushSubscriptionKeys {
  @prop({ required: true })
  p256dh!: string;

  @prop({ required: true })
  auth!: string;
}

@modelOptions({ options: { allowMixed: 0 } })
class PushSubscription {
  @prop({ required: true })
  endpoint!: string;

  @prop({ required: false }) // It can be null based on the Push API
  expirationTime?: number | null;

  @prop({ required: true })
  keys!: PushSubscriptionKeys;
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "mppushuseragent",
  },
  options: {
    allowMixed: 0,
  },
})
export class MpPushUserAgent {
  @prop()
  name?: string;

  @prop()
  _id: string;

  @prop({ required: false })
  PushSubscription?: PushSubscription;

  @prop({ type: () => [Visit] })
  visits: Visit[];
}

export const MpPushUserAgentModel =
  mongoose.models.MpPushUserAgent || getModelForClass(MpPushUserAgent);
