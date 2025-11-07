// package: attention_span_data
// file: app/src/schema/schema.proto

import * as jspb from "google-protobuf";

export class UserAttention extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getAge(): number;
  setAge(value: number): void;

  getGender(): string;
  setGender(value: string): void;

  getResidence(): string;
  setResidence(value: string): void;

  getReasonLas(): LowAttentionReasonMap[keyof LowAttentionReasonMap];
  setReasonLas(value: LowAttentionReasonMap[keyof LowAttentionReasonMap]): void;

  getScreentime(): number;
  setScreentime(value: number): void;

  getAttentionSpan(): number;
  setAttentionSpan(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserAttention.AsObject;
  static toObject(includeInstance: boolean, msg: UserAttention): UserAttention.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserAttention, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserAttention;
  static deserializeBinaryFromReader(message: UserAttention, reader: jspb.BinaryReader): UserAttention;
}

export namespace UserAttention {
  export type AsObject = {
    name: string,
    age: number,
    gender: string,
    residence: string,
    reasonLas: LowAttentionReasonMap[keyof LowAttentionReasonMap],
    screentime: number,
    attentionSpan: number,
  }
}

export interface LowAttentionReasonMap {
  LOW_ATTENTION_REASON_UNSPECIFIED: 0;
  FAMILY_PROBLEMS: 1;
  LACK_OF_SLEEP_AND_POOR_HEALTH: 2;
  MULTITASKING: 3;
  STRESS_AND_ANXIETY: 4;
  RELATIONSHIP: 5;
  SMARTPHONES_AND_SOCIAL_MEDIA: 6;
  LACK_OF_GOAL_CLARITY: 7;
}

export const LowAttentionReason: LowAttentionReasonMap;

