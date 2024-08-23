import { Module } from "@cmmv/core";
import { ExpressTranspile } from "../transpilers/express.transpiler";

export let ExpressModule = new Module({
    transpilers: [ExpressTranspile]
});