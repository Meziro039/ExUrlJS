/*
License: MIT License
Copyright: Meziro(https://github.com/Meziro039/UrlJS)

Version:0.0.1β
*/

class EXURL {

    Parse(Var_Url) {
        if (Var_Url.length > 8000) {
            console.error("ERROR: Input value size too large.");
            return null;
        };

        let Var_Protocol = "";
        let Var_FullHost = "";
        let Var_UserName = "";
        let Var_Password = "";
        let Var_HostPort = "";
        let Var_Host = "";
        let Var_Port = "";
        let Var_Path = "";
        let Var_Query = {};
        let Var_Hash = "";

        // To array.
        Var_Url = Var_Url.split("/");
        for (let i = 0;i < Var_Url.length;i++) {
            if (Var_Url[i] === "") {
                Var_Url.splice(i, 1);
            };
        };

        // Protocol or FullHost
        Var_Protocol = Var_Url[0].match(/^[^:\/@]+:$/);
        Var_FullHost = Var_Url[0].match(/^((([^\/@]+:|)[^\/:@]+@|[^\/:@]*)[^\/:@]+\.[^\/:@]+([^\/:@]*|:\d+)|localhost)$/); // /^[^\/]+\.([^:\/@\.]+|[^:\/@\.]+:\d)$/
        if (Var_Protocol) {
            Var_Protocol = Var_Protocol[0];
            Var_Url.shift();
        } else if (Var_FullHost) {
            Var_FullHost = Var_FullHost[0];
            Var_Url.shift();
        };

        // FullHost or Not url
        if (Var_FullHost === null) {
            Var_FullHost = Var_Url[0].match(/^((([^\/@]+:|)[^\/:@]+@|[^\/:@]*)[^\/:@]+\.[^\/:@]+([^\/:@]*|:\d+)|localhost)$/);
            if (Var_FullHost) {
                Var_FullHost = Var_FullHost[0];
                Var_Url.shift();
            } else {
                // ERROR
                console.error("ERROR: Input is not url.");
                return null;
            }
        };

        // FullHost split
        const BasicCheck = Var_FullHost.split("@");
        if (BasicCheck.length === 1) {
            // No Basic
        } else if (BasicCheck.length === 2) {
            // Yes Basic
            BasicCheck[0] = BasicCheck[0].split(":");
            if (BasicCheck[0].length === 2) {
                Var_UserName = BasicCheck[0][0];
                Var_Password = BasicCheck[0][1];
            } else {
                Var_Password = BasicCheck[0][0];
            }
            BasicCheck[0] = BasicCheck[1];
        } else {
            // Not Url
            // ERROR
            console.error("ERROR: Input is not url.");
            return null;
        };
        const HostSplit = BasicCheck[0].split(":");
        Var_HostPort = BasicCheck[0];
        if (HostSplit.length === 2) {
            Var_Host = HostSplit[0];
            Var_Port = HostSplit.slice(-1)[0];
        } else {
            Var_Host = HostSplit[0];
        };
        // IPv6入れたら壊れるなこれ

        // Path or Query or Hash
        let Var_PathCheck;
        let Var_QueryCheck;
        let Var_HashCheck;
        for (let i = 0;i < Var_Url.length;i++) {
            Var_PathCheck = Var_Url[i].match(/^[^\?#]+/);
            if (Var_PathCheck) {
                Var_Path += "/" + Var_PathCheck[0];
                Var_Url[i] = Var_Url[i].replace(Var_PathCheck[0], "");
            };
            if (Var_Url[i].length !== 0) {
                if (Var_Url[i].match(/^(\?|#)/)) {
                    Var_Url = Var_Url.join("");
                    Var_HashCheck = Var_Url.match(/#.+$/);
                    if (Var_HashCheck) {
                        Var_Hash = Var_HashCheck[0];
                        Var_Url = Var_Url.replace(/#.+$/, "");
                    };
                    Var_QueryCheck = Var_Url.match(/^\?.+$/);
                    if (Var_QueryCheck) {
                        Var_QueryCheck = Var_QueryCheck[0].replace(/^\?/, "").split("&");
                        for (let j = 0;j < Var_QueryCheck.length;j++) {
                            const Query = Var_QueryCheck[j].split("=")[0];
                            let Value = Var_QueryCheck[j].split("=")[1];
                            if (typeof Value === "undefined") {
                                Value = "";
                            };
                            Var_Query[Query] = Value;
                        };
                        break;
                    };
                };
            };
        };

        /* Debug
        console.log(
            "START:\n" +
            "Protocol: " + Var_Protocol + "\n" +
            "FullHost: " + Var_FullHost + "\n" +
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

        return {
            "Protocol" : Var_Protocol,
            "UserName" : Var_UserName,
            "Password" : Var_Password,
            "Host" : Var_Host,
            "Port" : Var_Port,
            "Path" : Var_Path,
            "Query" : Var_Query,
            "Hash" : Var_Hash,
            "HostPort" : Var_HostPort
        };
    }
}
const ExUrl = new EXURL;