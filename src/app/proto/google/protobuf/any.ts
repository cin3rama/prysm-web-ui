/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


/**
 *  `Any` contains an arbitrary serialized protocol buffer message along with a
 *  URL that describes the type of the serialized message.
 *
 *  Protobuf library provides support to pack/unpack Any values in the form
 *  of utility functions or additional generated methods of the Any type.
 *
 *  Example 1: Pack and unpack a message in C++.
 *
 *      Foo foo = ...;
 *      Any any;
 *      any.PackFrom(foo);
 *      ...
 *      if (any.UnpackTo(&foo)) {
 *        ...
 *      }
 *
 *  Example 2: Pack and unpack a message in Java.
 *
 *      Foo foo = ...;
 *      Any any = Any.pack(foo);
 *      ...
 *      if (any.is(Foo.class)) {
 *        foo = any.unpack(Foo.class);
 *      }
 *
 *   Example 3: Pack and unpack a message in Python.
 *
 *      foo = Foo(...)
 *      any = Any()
 *      any.Pack(foo)
 *      ...
 *      if any.Is(Foo.DESCRIPTOR):
 *        any.Unpack(foo)
 *        ...
 *
 *   Example 4: Pack and unpack a message in Go
 *
 *       foo := &pb.Foo{...}
 *       any, err := anypb.New(foo)
 *       if err != nil {
 *         ...
 *       }
 *       ...
 *       foo := &pb.Foo{}
 *       if err := any.UnmarshalTo(foo); err != nil {
 *         ...
 *       }
 *
 *  The pack methods provided by protobuf library will by default use
 *  'type.googleapis.com/full.type.name' as the type URL and the unpack
 *  methods only use the fully qualified type name after the last '/'
 *  in the type URL, for example "foo.bar.com/x/y.z" will yield type
 *  name "y.z".
 *
 *
 *  JSON
 *  ====
 *  The JSON representation of an `Any` value uses the regular
 *  representation of the deserialized, embedded message, with an
 *  additional field `@type` which contains the type URL. Example:
 *
 *      package google.profile;
 *      message Person {
 *        string first_name = 1;
 *        string last_name = 2;
 *      }
 *
 *      {
 *        "@type": "type.googleapis.com/google.profile.Person",
 *        "firstName": <string>,
 *        "lastName": <string>
 *      }
 *
 *  If the embedded message type is well-known and has a custom JSON
 *  representation, that representation will be embedded adding a field
 *  `value` which holds the custom JSON in addition to the `@type`
 *  field. Example (for message [google.protobuf.Duration][]):
 *
 *      {
 *        "@type": "type.googleapis.com/google.protobuf.Duration",
 *        "value": "1.212s"
 *      }
 *
 */
export interface Any {
  /**
   *  A URL/resource name that uniquely identifies the type of the serialized
   *  protocol buffer message. This string must contain at least
   *  one "/" character. The last segment of the URL's path must represent
   *  the fully qualified name of the type (as in
   *  `path/google.protobuf.Duration`). The name should be in a canonical form
   *  (e.g., leading "." is not accepted).
   *
   *  In practice, teams usually precompile into the binary all types that they
   *  expect it to use in the context of Any. However, for URLs which use the
   *  scheme `http`, `https`, or no scheme, one can optionally set up a type
   *  server that maps type URLs to message definitions as follows:
   *
   *  * If no scheme is provided, `https` is assumed.
   *  * An HTTP GET on the URL must yield a [google.protobuf.Type][]
   *    value in binary format, or produce an error.
   *  * Applications are allowed to cache lookup results based on the
   *    URL, or have them precompiled into a binary to avoid any
   *    lookup. Therefore, binary compatibility needs to be preserved
   *    on changes to types. (Use versioned type names to manage
   *    breaking changes.)
   *
   *  Note: this functionality is not currently available in the official
   *  protobuf release, and it is not used for type URLs beginning with
   *  type.googleapis.com.
   *
   *  Schemes other than `http`, `https` (or the empty scheme) might be
   *  used with implementation specific semantics.
   *
   */
  typeUrl: string;
  /**
   *  Must be a valid serialized protocol buffer of the above specified type.
   */
  value: Uint8Array;
}

const baseAny: object = {
  typeUrl: "",
};

export const Any = {
  encode(message: Any, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.typeUrl);
    writer.uint32(18).bytes(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Any {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAny } as Any;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.typeUrl = reader.string();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Any {
    const message = { ...baseAny } as Any;
    if (object.typeUrl !== undefined && object.typeUrl !== null) {
      message.typeUrl = String(object.typeUrl);
    } else {
      message.typeUrl = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Any>): Any {
    const message = { ...baseAny } as Any;
    if (object.typeUrl !== undefined && object.typeUrl !== null) {
      message.typeUrl = object.typeUrl;
    } else {
      message.typeUrl = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toJSON(message: Any): unknown {
    const obj: any = {};
    obj.typeUrl = message.typeUrl || "";
    obj.value = message.value !== undefined ? base64FromBytes(message.value) : undefined;
    return obj;
  },
};

interface WindowBase64 {
  atob(b64: string): string;
  btoa(bin: string): string;
}

const windowBase64 = (globalThis as unknown as WindowBase64);
const atob = windowBase64.atob || ((b64: string) => Buffer.from(b64, 'base64').toString('binary'));
const btoa = windowBase64.btoa || ((bin: string) => Buffer.from(bin, 'binary').toString('base64'));

function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(''));
}
type Builtin = Date | Function | Uint8Array | string | number | undefined;
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;