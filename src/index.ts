import * as fs from "fs";
import * as path from "path";

import { Application } from "@cmmv/core";
import { FastifyAdapter, FastifyModule } from "@cmmv/http";
import { ProtobufModule } from "@cmmv/protobuf";

const app = Application.create({
    httpAdapter: FastifyAdapter,
    httpBind: "0.0.0.0:3000",
    modules: [
        FastifyModule,
        ProtobufModule,
    ]
});