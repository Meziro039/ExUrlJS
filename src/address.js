/*
License: MIT License
Copyright: Meziro(https://github.com/Meziro039/UrlJS)

Version:0.0.0β
*/

class url {
    Parse(Url) {
        let Var_Protocol = "";
        let Var_UserName = "";
        let Var_Password = "";
        let Var_HostPort = "";
        let Var_Host = "";
        let Var_Port = "";
        let Var_Path = "";
        let Var_Query = {};
        let Var_Hash = "";

        try {
            Var_Protocol = Url.match(/^[^\/]+\/{2,3}/)[0].replace(/\/{2,3}$/, "");
        } catch (e) {

        }

        try {
            Var_UserName = Url.match(/\/[^\/@]+?:[^\/:]+?@/)[0].slice(1,-1).split(":")[0];
            // Url.match(/\/[^\/@]+?:/)[0].slice(1,-1);
        } catch (e) {

        }

        try {
            Var_Password = Url.match(/(:|\/)[^\/:]+?@/)[0].slice(1,-1);
        } catch (e) {

        }

        try {
            Var_HostPort = Url.match(/(\/\/|@)[^\/@]+?(\/)/)[0].slice(1,-1).replace(/^\//, "");
        } catch (e) {

        }

        try {
            Var_Host = Var_HostPort.split(/:/)[0];
        } catch (e) {

        }

        try {
            Var_Port = Var_HostPort.split(/:/)[1];

            if (typeof Var_Port === "undefined") {
                Var_Port = "";
            };
        } catch (e) {

        }

        try {
            Var_Path = Url.replace(Var_HostPort, "")
            Var_Path = Var_Path.match(/\/[^:\?]+(\/|\?|$)/)[0].replace(/(\?|#)$/, "");
            Var_Path = Var_Path.slice(Var_Path.replace(/\/[^\/].+$/, "").length);
        } catch (e) {

        }

        try {
            const Var_PreQuery = Url.match(/\?[^#]+/)[0].replace(/^\?/, "");

            // Query split.
            let Var_QuerySplitArray = Var_PreQuery.split("&");
            for (let i = 0;i < Var_QuerySplitArray.length;i++) {
                const Key = Var_QuerySplitArray[i].split("=")[0];
                let Value = Var_QuerySplitArray[i].split("=")[1];

                if (typeof Value === "undefined") {
                    Value = "";
                };

                Var_Query[Key] = Value;
            };
        } catch (e) {

        }

        try {
            Var_Hash = Url.match(/#.+$/)[0];
        } catch (e) {

        }
        // 65535

        const Result = {
            "Protocol" : Var_Protocol, // http:// file:///
            "UserName" : Var_UserName, // BASIC
            "Password" : Var_Password,
            "Host" : Var_Host, // a.b.c
            "Port" : Var_Port, // :80
            "Path" : Var_Path, // /a/b
            "Query" : Var_Query, //?a=b&c=d
            "Hash" : Var_Hash, // #a
            "HostPort" : Var_HostPort // a.b.c:80
        };
        
        /* Debug
        console.log(
            "START:\n" +
            "Protocol: " + Var_Protocol + "\n" +
            "UserName: " + Var_UserName + "\n" +
            "Password: " + Var_Password + "\n" +
            "Host: " + Var_Host + "\n" +
            "Port: " + Var_Port + "\n" +
            "Path: " + Var_Path + "\n" +
            "Query: " + JSON.stringify(Var_Query) + "\n" +
            "Hash: " + Var_Hash + "\n" +
            "HostPort: " + Var_HostPort + "\n" +
            "END:"
        );
        //*/
        console.log(new URL(Url));

        return Result;
    }
}
const Url = new url;