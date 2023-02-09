import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import MinService from "@src/services/MinService";
import {tick} from "@src/util/misc";
async function main(_: IReq, res: IRes) {
    return res.status(HttpStatusCodes.OK).json({"title": "OK"} );
}

/**
 Used for getting current Mindustry version
 */
async function version(_: IReq, res: IRes) {

    MinService.sendMessage("version");
    // wait 1 sec before getting results :_)
    await tick(1000)

    let result: string[]
    result = MinService.strings;

    let v :string = "error";
    for (let i = 0; i < result.length; i++) {
        console.info(result[i]);
        if (result[i].includes("Version: ") && !result[i].includes("Java"))
            v = result[i].replace("Version: ", "").replace(" / ", ",")
    }
    console.info("version" + MinService.version.toString())
    res.status(HttpStatusCodes.OK).contentType("text/plain").write(v);
    res.end()

}



export default {
    main, version
} as const;
