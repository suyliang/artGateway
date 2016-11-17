module.exports = require("protobufjs").newBuilder({})["import"]({
    "package": null,
    "messages": [
        {
            "name": "AddressStruct",
            "fields": [
                {
                    "rule": "required",
                    "type": "AddressMode",
                    "name": "addrMode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "fixed64",
                    "name": "ieeeAddr",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "groupAddr",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "broadcaseAddr",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "endpointID",
                    "id": 5
                }
            ]
        },
        {
            "name": "OtaZigbeeGenericCnf",
            "fields": [
                {
                    "rule": "required",
                    "type": "otaMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "ZIGBEE_GENERIC_CNF"
                    }
                },
                {
                    "rule": "required",
                    "type": "genericStatus",
                    "name": "status",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "sequenceNumber",
                    "id": 3
                }
            ]
        },
        {
            "name": "OtaZigbeeGenericRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "otaMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "ZIGBEE_GENERIC_RSP_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "sequenceNumber",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "genericStatus",
                    "name": "status",
                    "id": 3
                }
            ]
        },
        {
            "name": "OtaUpdateImageRegisterationReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "otaMgrCmdId_t",
                    "name": "cmdID",
                    "id": 1,
                    "options": {
                        "default": "OTA_UPDATE_IMAGE_REGISTERATION_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "imagePath",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "bool",
                    "name": "registerUnregister",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "OtaExecuteType",
                    "name": "executeTiming",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "executionDelay",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "executionTime",
                    "id": 6
                },
                {
                    "rule": "required",
                    "type": "bool",
                    "name": "updateSupportedDeviceList",
                    "id": 7
                },
                {
                    "rule": "repeated",
                    "type": "fixed64",
                    "name": "supportedDeviceList",
                    "id": 8
                },
                {
                    "rule": "required",
                    "type": "OtaNotificationType",
                    "name": "notification",
                    "id": 9
                }
            ]
        },
        {
            "name": "OtaUpdateEnableReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "otaMgrCmdId_t",
                    "name": "cmdID",
                    "id": 1,
                    "options": {
                        "default": "OTA_UPDATE_ENABLE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "OtaEnableModes",
                    "name": "mode",
                    "id": 2
                }
            ]
        },
        {
            "name": "OtaUpdateEnableCnf",
            "fields": [
                {
                    "rule": "required",
                    "type": "otaMgrCmdId_t",
                    "name": "cmdID",
                    "id": 1,
                    "options": {
                        "default": "OTA_UPDATE_ENABLE_CNF"
                    }
                },
                {
                    "rule": "required",
                    "type": "bool",
                    "name": "status",
                    "id": 2
                }
            ]
        },
        {
            "name": "OtaUpdateDlFinishedInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "otaMgrCmdId_t",
                    "name": "cmdID",
                    "id": 1,
                    "options": {
                        "default": "OTA_UPDATE_DL_FINISHED_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "OtaStatus",
                    "name": "status",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "AddressStruct",
                    "name": "address",
                    "id": 3
                }
            ]
        },
        {
            "name": "OtaUpdateApplyImageReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "otaMgrCmdId_t",
                    "name": "cmdID",
                    "id": 1,
                    "options": {
                        "default": "OTA_UPDATE_ENABLE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "AddressStruct",
                    "name": "address",
                    "id": 2
                }
            ]
        }
    ],
    "enums": [
        {
            "name": "ZStackOTASysIDs",
            "values": [
                {
                    "name": "RPC_SYS_PB_OTA_MGR",
                    "id": 20
                }
            ]
        },
        {
            "name": "otaMgrCmdId_t",
            "values": [
                {
                    "name": "ZIGBEE_GENERIC_CNF",
                    "id": 0
                },
                {
                    "name": "ZIGBEE_GENERIC_RSP_IND",
                    "id": 1
                },
                {
                    "name": "OTA_UPDATE_IMAGE_REGISTERATION_REQ",
                    "id": 2
                },
                {
                    "name": "OTA_UPDATE_ENABLE_REQ",
                    "id": 3
                },
                {
                    "name": "OTA_UPDATE_ENABLE_CNF",
                    "id": 4
                },
                {
                    "name": "OTA_UPDATE_DL_FINISHED_IND",
                    "id": 5
                },
                {
                    "name": "OTA_UPDATE_APPLY_IMAGE_REQ",
                    "id": 6
                }
            ]
        },
        {
            "name": "AddressMode",
            "values": [
                {
                    "name": "UNICAST",
                    "id": 0
                },
                {
                    "name": "GROUPCAST",
                    "id": 1
                },
                {
                    "name": "BROADCAST",
                    "id": 2
                },
                {
                    "name": "SELF",
                    "id": 3
                }
            ]
        },
        {
            "name": "genericStatus",
            "values": [
                {
                    "name": "SUCCESS",
                    "id": 0
                },
                {
                    "name": "FAILURE",
                    "id": 1
                }
            ]
        },
        {
            "name": "OtaStatus",
            "values": [
                {
                    "name": "OTA_SUCCESS",
                    "id": 0
                },
                {
                    "name": "INVALID_IMAGE",
                    "id": 1
                },
                {
                    "name": "REQUIRE_MORE_IMAGE",
                    "id": 2
                },
                {
                    "name": "ABORT",
                    "id": 3
                }
            ]
        },
        {
            "name": "OtaExecuteType",
            "values": [
                {
                    "name": "IMMEDIATE",
                    "id": 0
                },
                {
                    "name": "DELAY",
                    "id": 1
                },
                {
                    "name": "TIME",
                    "id": 2
                },
                {
                    "name": "HOLD",
                    "id": 3
                },
                {
                    "name": "NO_CHANGE",
                    "id": 255
                }
            ]
        },
        {
            "name": "OtaNotificationType",
            "values": [
                {
                    "name": "DO_NOT_SEND",
                    "id": 0
                },
                {
                    "name": "BROADCAST_NOT",
                    "id": 1
                },
                {
                    "name": "UNICAST_NOT",
                    "id": 2
                }
            ]
        },
        {
            "name": "OtaUpdateCnfStatus",
            "values": [
                {
                    "name": "UPDATE_SUCCESS",
                    "id": 0
                },
                {
                    "name": "BAD_FILE_FORMAT",
                    "id": 1
                },
                {
                    "name": "CANT_UNREGISTER",
                    "id": 2
                },
                {
                    "name": "OUT_OF_RESOURCES",
                    "id": 3
                }
            ]
        },
        {
            "name": "OtaEnableModes",
            "values": [
                {
                    "name": "DOWNLOAD_ENABLE",
                    "id": 0
                },
                {
                    "name": "NEW_DOWNLOAD_DISABLE",
                    "id": 1
                },
                {
                    "name": "DOWNLOAD_DISABLE",
                    "id": 2
                }
            ]
        }
    ]
}).build();