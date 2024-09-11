import { Module } from '@cmmv/core';

import { ProtobufController } from '../controllers/protobuf.controller';
import { ProtobufTranspile } from '../transpilers/protobuf.transpiler';

export let ProtobufModule = new Module('protobuf', {
    controllers: [ProtobufController],
    transpilers: [ProtobufTranspile],
});
