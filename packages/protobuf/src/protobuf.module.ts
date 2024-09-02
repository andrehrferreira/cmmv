import { Module } from "@cmmv/core";

import { ProtobufTranspile } from "./protobuf.transpiler";

export let ProtobufModule = new Module({
    transpilers: [ProtobufTranspile]
})