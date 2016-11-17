module.exports = require("protobufjs").newBuilder({})["import"]({
    "package": null,
    "messages": [
        {
            "name": "Updata_gateway_req",
            "fields": [
                {
                    "rule": "required",
                    "type": "UpdataGateway_CmdIds",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "UPDATA_GATEWAY_REQ"
                    }
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "type",
                    "id": 2
                }
            ]
        },
        {
            "name": "Updata_gateway_ind",
            "fields": [
                {
                    "rule": "required",
                    "type": "UpdataGateway_CmdIds",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "UPDATA_GATEWAY_IND"
                    }
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "status",
                    "id": 2
                }
            ]
        }
    ],
    "enums": [
        {
            "name": "updataServiceSysId",
            "values": [
                {
                    "name": "RPC_SYS_PB_UPDATA",
                    "id": 60
                }
            ]
        },
        {
            "name": "UpdataGateway_CmdIds",
            "values": [
                {
                    "name": "UPDATA_GATEWAY_REQ",
                    "id": 0
                },
                {
                    "name": "UPDATA_GATEWAY_IND",
                    "id": 1
                }
            ]
        }
    ]
}).build();