import { Module } from "@cmmv/core";

import { ProtobufController } from "./protobuf.controller";
import { ProtobufTranspile } from "./protobuf.transpiler";

export let ProtobufModule = new Module({
    controllers: [ProtobufController],
    transpilers: [ProtobufTranspile]
})