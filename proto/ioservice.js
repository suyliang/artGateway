module.exports = require("protobufjs").newBuilder({})["import"]({
    "package": null,
    "messages": [
        {
            "name": "DO_onoff_req",
            "fields": [
                {
                    "rule": "required",
                    "type": "IO_CmdIds",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DO_ONOFF_REQ"
                    }
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "ioAddr",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "onOffStatus",
                    "id": 3
                }
            ]
        },
        {
            "name": "DO_onoff_ind",
            "fields": [
                {
                    "rule": "required",
                    "type": "IO_CmdIds",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DO_ONOFF_IND"
                    }
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "onoffStatus",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "ioAddr",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "status",
                    "id": 4
                },
                {
                    "rule": "repeated",
                    "type": "uint32",
                    "name": "onoffStatusList",
                    "id": 5
                }
            ]
        },
        {
            "name": "DO_read_onoff_req",
            "fields": [
                {
                    "rule": "required",
                    "type": "IO_CmdIds",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DO_READ_ONOFF_REQ"
                    }
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "ioAddr",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 3
                }
            ]
        },
        {
            "name": "DO_read_onoff_ind",
            "fields": [
                {
                    "rule": "required",
                    "type": "IO_CmdIds",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DO_READ_ONOFF_IND"
                    }
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "onoffStatus",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "ioAddr",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "status",
                    "id": 5
                },
                {
                    "rule": "repeated",
                    "type": "uint32",
                    "name": "onoffStatusList",
                    "id": 6
                }
            ]
        },
        {
            "name": "DI_read_onoff_req",
            "fields": [
                {
                    "rule": "required",
                    "type": "IO_CmdIds",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DI_READ_ONOFF_REQ"
                    }
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "ioAddr",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 3
                }
            ]
        },
        {
            "name": "DI_read_onoff_ind",
            "fields": [
                {
                    "rule": "required",
                    "type": "IO_CmdIds",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DI_READ_ONOFF_IND"
                    }
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "onoffStatus",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "ioAddr",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "status",
                    "id": 5
                },
                {
                    "rule": "repeated",
                    "type": "uint32",
                    "name": "onoffStatusList",
                    "id": 6
                }
            ]
        },
        {
            "name": "DI_status_broadcast_ind",
            "fields": [
                {
                    "rule": "required",
                    "type": "IO_CmdIds",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DI_STATUS_BROADCAST_IND"
                    }
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "onoffStatus",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "ioAddr",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "status",
                    "id": 5
                },
                {
                    "rule": "repeated",
                    "type": "uint32",
                    "name": "onoffStatusList",
                    "id": 6
                }
            ]
        }
    ],
    "enums": [
        {
            "name": "IOServiceSysId",
            "values": [
                {
                    "name": "RPC_SYS_PB_IO",
                    "id": 50
                }
            ]
        },
        {
            "name": "IO_CmdIds",
            "values": [
                {
                    "name": "DO_ONOFF_REQ",
                    "id": 0
                },
                {
                    "name": "DO_ONOFF_IND",
                    "id": 1
                },
                {
                    "name": "DO_READ_ONOFF_REQ",
                    "id": 2
                },
                {
                    "name": "DO_READ_ONOFF_IND",
                    "id": 3
                },
                {
                    "name": "DI_READ_ONOFF_REQ",
                    "id": 4
                },
                {
                    "name": "DI_READ_ONOFF_IND",
                    "id": 5
                },
                {
                    "name": "DI_STATUS_BROADCAST_IND",
                    "id": 6
                }
            ]
        },
        {
            "name": "RespondStatus",
            "values": [
                {
                    "name": "FAILURE",
                    "id": 0
                },
                {
                    "name": "SUCCESS",
                    "id": 1
                }
            ]
        },
        {
            "name": "IOOnOffStatus",
            "values": [
                {
                    "name": "ON_STATUS",
                    "id": 0
                },
                {
                    "name": "OFF_STATUS",
                    "id": 1
                }
            ]
        },
        {
            "name": "IOClusterIds",
            "values": [
                {
                    "name": "CLUSTER_ONOFF",
                    "id": 0
                }
            ]
        },
        {
            "name": "IOnOffStatus",
            "values": [
                {
                    "name": "ON_STATUS",
                    "id": 0
                },
                {
                    "name": "OFF_STATUS",
                    "id": 1
                }
            ]
        }
    ]
}).build();