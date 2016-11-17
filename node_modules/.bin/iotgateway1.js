module.exports = require("protobufjs").newBuilder({})["import"]({
    "package": null,
    "messages": [
        {
            "name": "HandshakeInfo_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "fixed64",
                    "name": "productID",
                    "id": 1
                },
                {
                    "rule": "required",
                    "type": "fixed64",
                    "name": "productKey",
                    "id": 2
                }
            ]
        },
        {
            "name": "GatewayInfo_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 1
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "versions",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "describe",
                    "id": 3
                }
            ]
        },
        {
            "name": "DeviceList_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "driverId",
                    "id": 1
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "deviceId",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "describe",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "DeviceStatus_t",
                    "name": "deviceStatus",
                    "id": 4
                },
                {
                    "rule": "repeated",
                    "type": "ObjectList_t",
                    "name": "objectList",
                    "id": 5
                }
            ]
        },
        {
            "name": "ObjectList_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "objectId",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "objectType",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "objectIndex",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "describe",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "ObjectStatus_t",
                    "name": "objectStatus",
                    "id": 5
                },
                {
                    "rule": "repeated",
                    "type": "AttributeList_t",
                    "name": "attributeList",
                    "id": 6
                }
            ]
        },
        {
            "name": "AttributeList_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "attributeType",
                    "id": 1
                },
                {
                    "rule": "required",
                    "type": "AttributeDataTypes_t",
                    "name": "attributeDataType",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "attributeValue",
                    "id": 3
                }
            ]
        },
        {
            "name": "DeviceObjectAttributeList_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "driverId",
                    "id": 1
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "deviceId",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "DeviceStatus_t",
                    "name": "deviceStatus",
                    "id": 3
                },
                {
                    "rule": "repeated",
                    "type": "ObjectAttributeList_t",
                    "name": "objectList",
                    "id": 4
                }
            ]
        },
        {
            "name": "ObjectAttributeList_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "objectId",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "objectType",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "objectIndex",
                    "id": 3
                },
                {
                    "rule": "repeated",
                    "type": "AttributeRecordList_t",
                    "name": "attributeList",
                    "id": 4
                }
            ]
        },
        {
            "name": "AttributeRecordList_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "attributeType",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "AttributeDataTypes_t",
                    "name": "attributeDataType",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "attributeValue",
                    "id": 3
                }
            ]
        },
        {
            "name": "DeviceStatusList_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "driverId",
                    "id": 1
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "deviceId",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "DeviceStatus_t",
                    "name": "deviceStatus",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "fixed64",
                    "name": "timestamp",
                    "id": 4
                }
            ]
        },
        {
            "name": "ScanDeviceInfo_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "string",
                    "name": "ieeeAddress",
                    "id": 1
                },
                {
                    "rule": "required",
                    "type": "fixed64",
                    "name": "ieeeAddress_long",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "deviceId",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "deviceVer",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "manufacturerId",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "DeviceStatus_t",
                    "name": "deviceStatus",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "deviceDes",
                    "id": 7
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "isUse",
                    "id": 8
                }
            ]
        },
        {
            "name": "nwkDeviceInfo_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "networkAddress",
                    "id": 1
                },
                {
                    "rule": "required",
                    "type": "fixed64",
                    "name": "ieeeAddress",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "fixed64",
                    "name": "parentIeeeAddress",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "profileId",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "deviceId",
                    "id": 5
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "deviceVer",
                    "id": 6
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "manufacturerId",
                    "id": 7
                },
                {
                    "rule": "repeated",
                    "type": "nwkSimpleDescriptor_t",
                    "name": "endpointList",
                    "id": 8
                },
                {
                    "rule": "required",
                    "type": "DeviceStatus_t",
                    "name": "deviceStatus",
                    "id": 9
                }
            ]
        },
        {
            "name": "nwkSimpleDescriptor_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "endpointId",
                    "id": 1
                },
                {
                    "rule": "repeated",
                    "type": "uint32",
                    "name": "inputClusters",
                    "id": 5
                },
                {
                    "rule": "repeated",
                    "type": "uint32",
                    "name": "outputClusters",
                    "id": 6
                }
            ]
        },
        {
            "name": "GwGenericRsp",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_GENERIC_RSP"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "sequenceNumber",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwGenericIndRsp",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_GENERIC_IND_RSP"
                    }
                },
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "rspCmdId",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "sequenceNumber",
                    "id": 5
                }
            ]
        },
        {
            "name": "GwHandshakeInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_HANDSHAKE_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "HandshakeInfo_t",
                    "name": "handshakeInfo",
                    "id": 3
                }
            ]
        },
        {
            "name": "GwBeatInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_BEAT_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                }
            ]
        },
        {
            "name": "GwGetGatewayInfoReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_GET_GATEWAY_INFO_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                }
            ]
        },
        {
            "name": "GwGetGatewayInfoRsp",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_GET_GATEWAY_INFO_RSP"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "repeated",
                    "type": "GatewayInfo_t",
                    "name": "gatewayInfo",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwGatewayInfoInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_GATEWAY_INFO_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "GatewayInfo_t",
                    "name": "gatewayInfo",
                    "id": 3
                }
            ]
        },
        {
            "name": "GwGetDeviceListReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_GET_DEVICE_LIST_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                }
            ]
        },
        {
            "name": "GwGetDeviceListRsp",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_GET_DEVICE_LIST_RSP"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "repeated",
                    "type": "DeviceList_t",
                    "name": "deviceList",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwDeviceListInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_DEVICE_LIST_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "repeated",
                    "type": "DeviceList_t",
                    "name": "deviceList",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "fixed64",
                    "name": "timestamp",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwReadObjectAttributeMultipleReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_READ_OBJECT_ATTRIBUTE_MULTIPLE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "repeated",
                    "type": "DeviceObjectAttributeList_t",
                    "name": "deviceObjectAttributeList",
                    "id": 3
                }
            ]
        },
        {
            "name": "GwReadObjectAttributeMultipleRsp",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_READ_OBJECT_ATTRIBUTE_MULTIPLE_RSP"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "repeated",
                    "type": "DeviceObjectAttributeList_t",
                    "name": "deviceObjectAttributeList",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwObjectAttributeMultipleInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_OBJECT_ATTRIBUTE_MULTIPLE_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "repeated",
                    "type": "DeviceObjectAttributeList_t",
                    "name": "deviceObjectAttributeList",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "fixed64",
                    "name": "timestamp",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwWriteObjectAttributeMultipleReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_WRITE_OBJECT_ATTRIBUTE_MULTIPLE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "repeated",
                    "type": "DeviceObjectAttributeList_t",
                    "name": "deviceObjectAttributeList",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "fixed64",
                    "name": "timestamp",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwWriteObjectAttributeMultipleRsp",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_WRITE_OBJECT_ATTRIBUTE_MULTIPLE_RSP"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "fixed64",
                    "name": "timestamp",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwUpdataDeviceStatusInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_UPDATA_DEVICE_STATUS_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "repeated",
                    "type": "DeviceStatusList_t",
                    "name": "deviceStatusList",
                    "id": 3
                }
            ]
        },
        {
            "name": "GwErrOrStatusInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_ERR_OR_STATUS_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "gwErrOrStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "fixed64",
                    "name": "timestamp",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwScanDeviceReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_SCAN_DEVICE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "scanType",
                    "id": 3
                }
            ]
        },
        {
            "name": "GwScanDeviceRsp",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_SCAN_DEVICE_RSP"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "driverId",
                    "id": 3
                },
                {
                    "rule": "repeated",
                    "type": "ScanDeviceInfo_t",
                    "name": "newDeviceList",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwDeleteDeviceReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_DELETE_DEVICE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "driverId",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "deviceId",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "deviceAddress",
                    "id": 5
                }
            ]
        },
        {
            "name": "GwDeleteDeviceRsp",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_DELETE_DEVICE_RSP"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "driverId",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "DeviceStatus_t",
                    "name": "status",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "deviceId",
                    "id": 5
                }
            ]
        },
        {
            "name": "GwUpLoadConfigReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_UP_LOAD_CONFIG_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "configUrl",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "configName",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "upLoadId",
                    "id": 5
                }
            ]
        },
        {
            "name": "GwUpLoadConfigRsp",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_UP_LOAD_CONFIG_RSP"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "gwStatus_t",
                    "name": "result",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "upLoadId",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwAllOnOffReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_ALL_ONOFF_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "controlType",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "objectType",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "objectIndex",
                    "id": 5
                }
            ]
        },
        {
            "name": "GwAllOnOffRsp",
            "fields": [
                {
                    "rule": "required",
                    "type": "CmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_ALL_ONOFF_RSP"
                    }
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "address",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "gwStatus_t",
                    "name": "result",
                    "id": 3
                }
            ]
        }
    ],
    "enums": [
        {
            "name": "gwFunctionId_t",
            "values": [
                {
                    "name": "RPC_SYS_PB_GW_MGR",
                    "id": 10
                }
            ]
        },
        {
            "name": "CmdId_t",
            "values": [
                {
                    "name": "GW_GENERIC_RSP",
                    "id": 0
                },
                {
                    "name": "GW_GENERIC_IND_RSP",
                    "id": 1
                },
                {
                    "name": "GW_HANDSHAKE_IND",
                    "id": 2
                },
                {
                    "name": "GW_BEAT_IND",
                    "id": 3
                },
                {
                    "name": "GW_GET_GATEWAY_INFO_REQ",
                    "id": 4
                },
                {
                    "name": "GW_GET_GATEWAY_INFO_RSP",
                    "id": 5
                },
                {
                    "name": "GW_GATEWAY_INFO_IND",
                    "id": 6
                },
                {
                    "name": "GW_GET_DEVICE_LIST_REQ",
                    "id": 7
                },
                {
                    "name": "GW_GET_DEVICE_LIST_RSP",
                    "id": 8
                },
                {
                    "name": "GW_DEVICE_LIST_IND",
                    "id": 9
                },
                {
                    "name": "GW_READ_OBJECT_ATTRIBUTE_MULTIPLE_REQ",
                    "id": 10
                },
                {
                    "name": "GW_READ_OBJECT_ATTRIBUTE_MULTIPLE_RSP",
                    "id": 11
                },
                {
                    "name": "GW_OBJECT_ATTRIBUTE_MULTIPLE_IND",
                    "id": 12
                },
                {
                    "name": "GW_WRITE_OBJECT_ATTRIBUTE_MULTIPLE_REQ",
                    "id": 13
                },
                {
                    "name": "GW_WRITE_OBJECT_ATTRIBUTE_MULTIPLE_RSP",
                    "id": 14
                },
                {
                    "name": "GW_UPDATA_DEVICE_STATUS_IND",
                    "id": 15
                },
                {
                    "name": "GW_ERR_OR_STATUS_IND",
                    "id": 16
                },
                {
                    "name": "GW_SCAN_DEVICE_REQ",
                    "id": 17
                },
                {
                    "name": "GW_SCAN_DEVICE_RSP",
                    "id": 18
                },
                {
                    "name": "GW_DELETE_DEVICE_REQ",
                    "id": 19
                },
                {
                    "name": "GW_DELETE_DEVICE_RSP",
                    "id": 20
                },
                {
                    "name": "GW_UP_LOAD_CONFIG_REQ",
                    "id": 21
                },
                {
                    "name": "GW_UP_LOAD_CONFIG_RSP",
                    "id": 22
                },
                {
                    "name": "GW_ALL_ONOFF_REQ",
                    "id": 23
                },
                {
                    "name": "GW_ALL_ONOFF_RSP",
                    "id": 24
                }
            ]
        },
        {
            "name": "DeviceStatus_t",
            "values": [
                {
                    "name": "DEVICE_OFF_LINE",
                    "id": 0
                },
                {
                    "name": "DEVICE_ON_LINE",
                    "id": 1
                },
                {
                    "name": "DEVICE_REMOVED",
                    "id": 2
                },
                {
                    "name": "DEVICE_CREATE",
                    "id": 3
                },
                {
                    "name": "DEVICE_CHANGE",
                    "id": 4
                },
                {
                    "name": "DEVICE_NA",
                    "id": 255
                }
            ]
        },
        {
            "name": "ObjectStatus_t",
            "values": [
                {
                    "name": "OBJECT_CREATE",
                    "id": 0
                },
                {
                    "name": "OBJECT_REMOVED",
                    "id": 1
                },
                {
                    "name": "OBJECT_CHANGE",
                    "id": 2
                },
                {
                    "name": "OBJECT_NA",
                    "id": 255
                }
            ]
        },
        {
            "name": "ObjectType_t",
            "values": [
                {
                    "name": "OBJECT_DEVICE",
                    "id": 0
                },
                {
                    "name": "OBJECT_AI",
                    "id": 1
                },
                {
                    "name": "OBJECT_AO",
                    "id": 2
                },
                {
                    "name": "OBJECT_AV",
                    "id": 3
                },
                {
                    "name": "OBJECT_BI",
                    "id": 4
                },
                {
                    "name": "OBJECT_BO",
                    "id": 5
                },
                {
                    "name": "OBJECT_BV",
                    "id": 6
                },
                {
                    "name": "OBJECT_FILE",
                    "id": 7
                },
                {
                    "name": "OBJECT_UNKNOWN",
                    "id": 255
                }
            ]
        },
        {
            "name": "AttributeType_t",
            "values": [
                {
                    "name": "ATTRIBUTE_PRESENT_VALUE",
                    "id": 0
                },
                {
                    "name": "ATTRIBUTE_MAX_VALUE",
                    "id": 1
                },
                {
                    "name": "ATTRIBUTE_MIN_VALUE",
                    "id": 2
                },
                {
                    "name": "ATTRIBUTE_UNITS",
                    "id": 3
                },
                {
                    "name": "ATTRIBUTE_FILE_NAME",
                    "id": 4
                },
                {
                    "name": "ATTRIBUTE_UNKNOWN",
                    "id": 255
                }
            ]
        },
        {
            "name": "AttributeDataTypes_t",
            "values": [
                {
                    "name": "DATATYPE_NO_DATA",
                    "id": 0
                },
                {
                    "name": "DATATYPE_DATA8",
                    "id": 8
                },
                {
                    "name": "DATATYPE_DATA16",
                    "id": 9
                },
                {
                    "name": "DATATYPE_DATA24",
                    "id": 10
                },
                {
                    "name": "DATATYPE_DATA32",
                    "id": 11
                },
                {
                    "name": "DATATYPE_DATA40",
                    "id": 12
                },
                {
                    "name": "DATATYPE_DATA48",
                    "id": 13
                },
                {
                    "name": "DATATYPE_DATA56",
                    "id": 14
                },
                {
                    "name": "DATATYPE_DATA64",
                    "id": 15
                },
                {
                    "name": "DATATYPE_BOOLEAN",
                    "id": 16
                },
                {
                    "name": "DATATYPE_BITMAP8",
                    "id": 24
                },
                {
                    "name": "DATATYPE_BITMAP16",
                    "id": 25
                },
                {
                    "name": "DATATYPE_BITMAP24",
                    "id": 26
                },
                {
                    "name": "DATATYPE_BITMAP32",
                    "id": 27
                },
                {
                    "name": "DATATYPE_BITMAP40",
                    "id": 28
                },
                {
                    "name": "DATATYPE_BITMAP48",
                    "id": 29
                },
                {
                    "name": "DATATYPE_BITMAP56",
                    "id": 30
                },
                {
                    "name": "DATATYPE_BITMAP64",
                    "id": 31
                },
                {
                    "name": "DATATYPE_UINT8",
                    "id": 32
                },
                {
                    "name": "DATATYPE_UINT16",
                    "id": 33
                },
                {
                    "name": "DATATYPE_UINT24",
                    "id": 34
                },
                {
                    "name": "DATATYPE_UINT32",
                    "id": 35
                },
                {
                    "name": "DATATYPE_UINT40",
                    "id": 36
                },
                {
                    "name": "DATATYPE_UINT48",
                    "id": 37
                },
                {
                    "name": "DATATYPE_UINT56",
                    "id": 38
                },
                {
                    "name": "DATATYPE_UINT64",
                    "id": 39
                },
                {
                    "name": "DATATYPE_INT8",
                    "id": 40
                },
                {
                    "name": "DATATYPE_INT16",
                    "id": 41
                },
                {
                    "name": "DATATYPE_INT24",
                    "id": 42
                },
                {
                    "name": "DATATYPE_INT32",
                    "id": 43
                },
                {
                    "name": "DATATYPE_INT40",
                    "id": 44
                },
                {
                    "name": "DATATYPE_INT48",
                    "id": 45
                },
                {
                    "name": "DATATYPE_INT56",
                    "id": 46
                },
                {
                    "name": "DATATYPE_INT64",
                    "id": 47
                },
                {
                    "name": "DATATYPE_ENUM8",
                    "id": 48
                },
                {
                    "name": "DATATYPE_ENUM16",
                    "id": 49
                },
                {
                    "name": "DATATYPE_SEMI_PREC",
                    "id": 56
                },
                {
                    "name": "DATATYPE_SINGLE_PREC",
                    "id": 57
                },
                {
                    "name": "DATATYPE_DOUBLE_PREC",
                    "id": 58
                },
                {
                    "name": "DATATYPE_OCTET_STR",
                    "id": 65
                },
                {
                    "name": "DATATYPE_CHAR_STR",
                    "id": 66
                },
                {
                    "name": "DATATYPE_LONG_OCTET_STR",
                    "id": 67
                },
                {
                    "name": "DATATYPE_LONG_CHAR_STR",
                    "id": 68
                },
                {
                    "name": "DATATYPE_ARRAY",
                    "id": 72
                },
                {
                    "name": "DATATYPE_STRUCT",
                    "id": 76
                },
                {
                    "name": "DATATYPE_SET",
                    "id": 80
                },
                {
                    "name": "DATATYPE_BAG",
                    "id": 81
                },
                {
                    "name": "DATATYPE_TOD",
                    "id": 224
                },
                {
                    "name": "DATATYPE_DATE",
                    "id": 225
                },
                {
                    "name": "DATATYPE_UTC",
                    "id": 226
                },
                {
                    "name": "DATATYPE_CLUSTER_ID",
                    "id": 232
                },
                {
                    "name": "DATATYPE_ATTR_ID",
                    "id": 233
                },
                {
                    "name": "DATATYPE_BAC_OID",
                    "id": 234
                },
                {
                    "name": "DATATYPE_IEEE_ADDR",
                    "id": 240
                },
                {
                    "name": "DATATYPE_128_BIT_SEC_KEY",
                    "id": 241
                },
                {
                    "name": "DATATYPE_UNKNOWN",
                    "id": 255
                }
            ]
        },
        {
            "name": "gwStatus_t",
            "values": [
                {
                    "name": "STATUS_SUCCESS",
                    "id": 0
                },
                {
                    "name": "STATUS_FAILURE",
                    "id": 1
                },
                {
                    "name": "STATUS_BUSY",
                    "id": 2
                },
                {
                    "name": "STATUS_INVALID_PARAMETER",
                    "id": 3
                },
                {
                    "name": "STATUS_TIMEOUT",
                    "id": 4
                }
            ]
        },
        {
            "name": "gwErrOrStatus_t",
            "values": [
                {
                    "name": "ERR_STATUS1",
                    "id": 0
                },
                {
                    "name": "ERR_STATUS2",
                    "id": 1
                },
                {
                    "name": "ERR_STATUS3",
                    "id": 2
                },
                {
                    "name": "ERR_STATUS4",
                    "id": 3
                },
                {
                    "name": "ERR_STATUS5",
                    "id": 4
                },
                {
                    "name": "ERR_STATUS6",
                    "id": 5
                },
                {
                    "name": "ERR_STATUS7",
                    "id": 6
                },
                {
                    "name": "ERR_STATUS8",
                    "id": 7
                },
                {
                    "name": "ERR_STATUS9",
                    "id": 8
                },
                {
                    "name": "ERR_STATUS10",
                    "id": 9
                }
            ]
        }
    ]
}).build();