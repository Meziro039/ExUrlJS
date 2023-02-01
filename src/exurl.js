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

        // Protocol or FullHost
        let Var_Protocol = Var_Url.match(/^[^\/:@\[\]]+:\/{2,3}/);
        let Var_FullHost = Var_Url.match(/^([^\/:@\[\]]+:|)([^\/:@\[\]]+@|)([^\/@\[\]]+\.[^\/:@\[\]]+|\[[^\.\/@\[\]]+\]|localhost)(:\d+|)/); // ^([^\/:@\[\]]+:|)([^\/:@\[\]]+@|)([^\/@]+\.[^\/:@]+|localhost)(:\d+|)
        if (Var_Protocol) {
            Var_Protocol = Var_Protocol[0];
            Var_Url = Var_Url.replace(/^[^\/:@\[\]]+:\/{2,3}/, "");
        } else if (Var_FullHost) {
            Var_Protocol = "";
            Var_FullHost = Var_FullHost[0];
            Var_Url = Var_Url.replace(/^([^\/:@\[\]]+:|)([^\/:@\[\]]+@|)([^\/@\[\]]+\.[^\/:@\[\]]+|\[[^\.\/@\[\]]+\]|localhost)(:\d+|)/, "");
        } else {
            // ERROR
            return null;
        };

        // FullHost or Path
        if (Var_FullHost == null) {
            Var_FullHost = Var_Url.match(/^([^\/:@\[\]]+:|)([^\/:@\[\]]+@|)([^\/@\[\]]+\.[^\/:@\[\]]+|\[[^\.\/@\[\]]+\]|localhost)(:\d+|)/);
            console.log(Var_FullHost[0]);
            if (Var_FullHost) {
                Var_FullHost = Var_FullHost[0];
                Var_Url = Var_Url.replace(/^([^\/:@\[\]]+:|)([^\/:@\[\]]+@|)([^\/@\[\]]+\.[^\/:@\[\]]+|\[[^\.\/@\[\]]+\]|localhost)(:\d+|)/, "");
            } else {
                // ERROR
                return null;
            };
        };

        // FullHost split.
        let Var_UserName = Var_FullHost.match(/^[^\/:@\[\]]+:/);
        let Var_Password = Var_FullHost.match(/(:|^)[^\/:@\[\]]+@/);
        let Var_Host = Var_FullHost.match(/(\/|@|^)([^\/@\[\]]+\.[^\/:@\[\]]+|\[[^\.\/@\[\]]+\]|localhost)(:|$)/);
        let Var_Port = Var_FullHost.match(/:\d+$/);
        if (Var_UserName) {
            Var_UserName = Var_UserName[0];
        } else {
            Var_UserName = "";
        }
        if (Var_Password) {
            Var_Password = Var_Password[0];
        } else {
            Var_Password = "";
        }
        if (Var_Host) {
            Var_Host = Var_Host[0];
        } else {
            Var_Host = "";
        }
        if (Var_Port) {
            Var_Port = Var_Port[0];
        } else {
            Var_Port = "";
        }

        let Var_Path = Var_Url.match(/^\/[^\?#]*/);
        let Var_Query = Var_Url.match(/\?[^#]*/);
        let Var_Hash = Var_Url.match(/#.*$/);
        if (Var_Path) {
            Var_Path = Var_Path[0];
            if (Var_Query) {
                const QuerySplit = Var_Query[0].replace(/^\?/, "").split("&");
                Var_Query = {};
                for (let i = 0;i < QuerySplit.length;i++) {
                    let QueryValue = QuerySplit[i].split("=");
                    const Query = QueryValue[0];
                    QueryValue.splice(0, 1);
                    let Value = QueryValue.join("");
                    if (typeof Value === "undefined") {
                        Value = "";
                    };
                    Var_Query[Query] = Value;
                };
            } else {
                Var_Query = "";
            }
            if (Var_Hash) {
                Var_Hash = Var_Hash[0];
            } else {
                Var_Hash = "";
            }
        } else {
            // Skip
            Var_Path = "";
        };

        //*Debug
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
            //"HostPort: " + Var_HostPort + "\n" +
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
            //"HostPort" : Var_HostPort
        };
    };
}
const ExUrl = new EXURL;