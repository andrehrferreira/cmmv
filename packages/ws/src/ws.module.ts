import { Module } from "@cmmv/core";

import { WSContract } from "./ws.contract";

export let WSModule = new Module({
    contracts: [WSContract]
})