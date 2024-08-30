import { Module } from "@cmmv/core";

import { ViewTranspile } from "./view.transpile";

export let ViewModule = new Module({
    transpilers: [ViewTranspile]
})