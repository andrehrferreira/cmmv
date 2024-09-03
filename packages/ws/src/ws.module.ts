import { Module } from "@cmmv/core";

import { WSTranspile } from "./ws.transpile";
import { WSContract } from "./ws.contract";

export let WSModule = new Module({
    contracts: [WSContract],
    transpilers: [WSTranspile]
})