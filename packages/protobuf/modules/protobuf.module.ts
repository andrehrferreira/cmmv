import { Module } from '@cmmv/core';

import { ProtobufController } from '../controllers/protobuf.controller';
import { ProtobufTranspile } from '../transpilers/protobuf.transpiler';

export const ProtobufModule = new Module('protobuf', {
    controllers: [ProtobufController],
    transpilers: [ProtobufTranspile],
});
