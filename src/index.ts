import * as dotenv from "dotenv";
import { Start } from "./Start";
import { End } from "./End";

function main() {
    dotenv.config();
    if (process.argv.length < 3) {
        console.error("missing start or end.\nUsage: node dist/index.js [start/end]");
        return;
    }
    let mode = process.argv[2];
    let runner = new Start();
    if (mode == "end") {
        runner = new End();
    }
    runner.execute(
        <string>process.env.E4628_URL,
        <string>process.env.E4628_ID,
        <string>process.env.E4628_PASSWORD);
}

main();