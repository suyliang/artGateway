module.exports = require("protobufjs").newBuilder({})["import"]({
    "package": null,
    "messages": [
        {
            "name": "nwkAddressStruct_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkAddressType_t",
                    "name": "addressType",
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
                    "name": "broadcastAddr",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "endpointId",
                    "id": 5
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
                    "rule": "required",
                    "type": "uint32",
                    "name": "profileId",
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
            "name": "nwkBindRec_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkAddressStruct_t",
                    "name": "srcAddr",
                    "id": 1
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "nwkAddressStruct_t",
                    "name": "dstAddr",
                    "id": 3
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
                    "name": "manufacturerId",
                    "id": 4
                },
                {
                    "rule": "repeated",
                    "type": "nwkSimpleDescriptor_t",
                    "name": "simpleDescList",
                    "id": 5
                },
                {
                    "rule": "required",
                    "type": "nwkDeviceStatus_t",
                    "name": "deviceStatus",
                    "id": 6
                }
            ]
        },
        {
            "name": "nwkNeighborInfo_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "fixed64",
                    "name": "extendedPanId",
                    "id": 1
                },
                {
                    "rule": "required",
                    "type": "fixed64",
                    "name": "extendedAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "networkAddress",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "nwkDeviceType_t",
                    "name": "deviceType",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "nwkRxOnWhenIdle_t",
                    "name": "idle",
                    "id": 5
                },
                {
                    "rule": "required",
                    "type": "nwkRelationship_t",
                    "name": "relation",
                    "id": 6
                },
                {
                    "rule": "required",
                    "type": "nwkPermitJoiningStatus_t",
                    "name": "permitJoining",
                    "id": 7
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "depth",
                    "id": 8
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "lqi",
                    "id": 9
                }
            ]
        },
        {
            "name": "nwkRoutingInfo_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "dstAddr",
                    "id": 1
                },
                {
                    "rule": "required",
                    "type": "nwkRouteStatus_t",
                    "name": "status",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "nextHop",
                    "id": 3
                }
            ]
        },
        {
            "name": "NwkZigbeeGenericCnf",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "ZIGBEE_GENERIC_CNF"
                    }
                },
                {
                    "rule": "required",
                    "type": "nwkStatus_t",
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
            "name": "NwkZigbeeGenericRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
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
                    "type": "nwkStatus_t",
                    "name": "status",
                    "id": 3
                }
            ]
        },
        {
            "name": "NwkZigbeeSystemResetReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_ZIGBEE_SYSTEM_RESET_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "nwkResetMode_t",
                    "name": "mode",
                    "id": 2
                }
            ]
        },
        {
            "name": "NwkZigbeeSystemResetCnf",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_ZIGBEE_SYSTEM_RESET_CNF"
                    }
                },
                {
                    "rule": "required",
                    "type": "nwkStatus_t",
                    "name": "status",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "nwkResetMode_t",
                    "name": "resetMode",
                    "id": 3
                }
            ]
        },
        {
            "name": "NwkZigbeeSystemSelfShutdownReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_ZIGBEE_SYSTEM_SELF_SHUTDOWN_REQ"
                    }
                }
            ]
        },
        {
            "name": "NwkSetZigbeePowerModeReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_SET_ZIGBEE_POWER_MODE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "nwkPowerMode_t",
                    "name": "powerMode",
                    "id": 2
                }
            ]
        },
        {
            "name": "NwkSetZigbeePowerModeCnf",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_SET_ZIGBEE_POWER_MODE_CNF"
                    }
                },
                {
                    "rule": "required",
                    "type": "nwkStatus_t",
                    "name": "status",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "nwkPowerMode_t",
                    "name": "powerMode",
                    "id": 3
                }
            ]
        },
        {
            "name": "NwkGetLocalDeviceInfoReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_GET_LOCAL_DEVICE_INFO_REQ"
                    }
                }
            ]
        },
        {
            "name": "NwkGetLocalDeviceInfoCnf",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_GET_LOCAL_DEVICE_INFO_CNF"
                    }
                },
                {
                    "rule": "required",
                    "type": "nwkDeviceInfo_t",
                    "name": "deviceInfoList",
                    "id": 2
                }
            ]
        },
        {
            "name": "NwkZigbeeNwkReadyInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_ZIGBEE_NWK_READY_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "nwkChannel",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "panId",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "fixed64",
                    "name": "extPanId",
                    "id": 4
                }
            ]
        },
        {
            "name": "NwkZigbeeNwkInfoReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_ZIGBEE_NWK_INFO_REQ"
                    }
                }
            ]
        },
        {
            "name": "NwkZigbeeNwkInfoCnf",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_ZIGBEE_NWK_INFO_CNF"
                    }
                },
                {
                    "rule": "required",
                    "type": "nwkNetworkStatus_t",
                    "name": "status",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "nwkChannel",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "panId",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "fixed64",
                    "name": "extPanId",
                    "id": 5
                }
            ]
        },
        {
            "name": "NwkSetPermitJoinReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_SET_PERMIT_JOIN_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "nwkPermitJoinType_t",
                    "name": "permitJoin",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "permitJoinTime",
                    "id": 3
                }
            ]
        },
        {
            "name": "NwkManagePeriodicMtoRouteReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_MANAGE_PERIODIC_MTO_ROUTE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "nwkMtoRouteMode_t",
                    "name": "mode",
                    "id": 2
                }
            ]
        },
        {
            "name": "NwkGetNeighborTableReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_GET_NEIGHBOR_TABLE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "nwkAddressStruct_t",
                    "name": "dstAddr",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "startIndex",
                    "id": 3
                }
            ]
        },
        {
            "name": "NwkGetNeighborTableRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_GET_NEIGHBOR_TABLE_RSP_IND"
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
                    "type": "nwkStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "nwkAddressStruct_t",
                    "name": "srcAddr",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "neighborTableEntries",
                    "id": 5
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "startIndex",
                    "id": 6
                },
                {
                    "rule": "repeated",
                    "type": "nwkNeighborInfo_t",
                    "name": "neighborList",
                    "id": 7
                }
            ]
        },
        {
            "name": "NwkGetRoutingTableReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_GET_ROUTING_TABLE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "nwkAddressStruct_t",
                    "name": "dstAddr",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "startIndex",
                    "id": 3
                }
            ]
        },
        {
            "name": "NwkGetRoutingTableRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_GET_ROUTING_TABLE_RSP_IND"
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
                    "type": "nwkStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "nwkAddressStruct_t",
                    "name": "srcAddr",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "routingTableEntries",
                    "id": 5
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "startIndex",
                    "id": 6
                },
                {
                    "rule": "repeated",
                    "type": "nwkRoutingInfo_t",
                    "name": "routingList",
                    "id": 7
                }
            ]
        },
        {
            "name": "NwkChangeNwkKeyReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_CHANGE_NWK_KEY_REQ"
                    }
                },
                {
                    "rule": "optional",
                    "type": "bytes",
                    "name": "newKey",
                    "id": 2
                }
            ]
        },
        {
            "name": "NwkGetNwkKeyReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_GET_NWK_KEY_REQ"
                    }
                }
            ]
        },
        {
            "name": "NwkGetNwkKeyCnf",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_GET_NWK_KEY_CNF"
                    }
                },
                {
                    "rule": "required",
                    "type": "nwkStatus_t",
                    "name": "status",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "bytes",
                    "name": "newKey",
                    "id": 3
                }
            ]
        },
        {
            "name": "NwkZigbeeDeviceInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_ZIGBEE_DEVICE_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "nwkDeviceInfo_t",
                    "name": "deviceInfo",
                    "id": 2
                }
            ]
        },
        {
            "name": "NwkGetDeviceListReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_GET_DEVICE_LIST_REQ"
                    }
                },
                {
                    "rule": "optional",
                    "type": "nwkAddressStruct_t",
                    "name": "dstAddr",
                    "id": 2
                }
            ]
        },
        {
            "name": "NwkGetDeviceListCnf",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_GET_DEVICE_LIST_CNF"
                    }
                },
                {
                    "rule": "required",
                    "type": "nwkStatus_t",
                    "name": "status",
                    "id": 2
                },
                {
                    "rule": "repeated",
                    "type": "nwkDeviceInfo_t",
                    "name": "deviceList",
                    "id": 3
                }
            ]
        },
        {
            "name": "NwkDeviceListMaintenanceReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_DEVICE_LIST_MAINTENANCE_REQ"
                    }
                },
                {
                    "rule": "optional",
                    "type": "nwkAddressStruct_t",
                    "name": "dstAddr",
                    "id": 2
                }
            ]
        },
        {
            "name": "NwkRemoveDeviceReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_REMOVE_DEVICE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "nwkAddressStruct_t",
                    "name": "dstAddr",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "nwkLeaveMode_t",
                    "name": "leaveMode",
                    "id": 3
                }
            ]
        },
        {
            "name": "NwkSetBindingEntryReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_SET_BINDING_ENTRY_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "nwkAddressStruct_t",
                    "name": "srcAddr",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "nwkAddressStruct_t",
                    "name": "dstAddr",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "nwkBindingMode_t",
                    "name": "bindingMode",
                    "id": 5
                }
            ]
        },
        {
            "name": "NwkSetBindingEntryRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "nwkMgrCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "NWK_SET_BINDING_ENTRY_RSP_IND"
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
                    "type": "nwkStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "nwkAddressStruct_t",
                    "name": "srcAddr",
                    "id": 4
                }
            ]
        }
    ],
    "enums": [
        {
            "name": "zStackNwkMgrSysId_t",
            "values": [
                {
                    "name": "RPC_SYS_PB_NWK_MGR",
                    "id": 18
                }
            ]
        },
        {
            "name": "nwkMgrCmdId_t",
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
                    "name": "NWK_ZIGBEE_SYSTEM_RESET_REQ",
                    "id": 2
                },
                {
                    "name": "NWK_ZIGBEE_SYSTEM_RESET_CNF",
                    "id": 3
                },
                {
                    "name": "NWK_ZIGBEE_SYSTEM_SELF_SHUTDOWN_REQ",
                    "id": 4
                },
                {
                    "name": "NWK_SET_ZIGBEE_POWER_MODE_REQ",
                    "id": 5
                },
                {
                    "name": "NWK_SET_ZIGBEE_POWER_MODE_CNF",
                    "id": 6
                },
                {
                    "name": "NWK_GET_LOCAL_DEVICE_INFO_REQ",
                    "id": 7
                },
                {
                    "name": "NWK_GET_LOCAL_DEVICE_INFO_CNF",
                    "id": 8
                },
                {
                    "name": "NWK_ZIGBEE_NWK_READY_IND",
                    "id": 9
                },
                {
                    "name": "NWK_ZIGBEE_NWK_INFO_REQ",
                    "id": 10
                },
                {
                    "name": "NWK_ZIGBEE_NWK_INFO_CNF",
                    "id": 11
                },
                {
                    "name": "NWK_SET_PERMIT_JOIN_REQ",
                    "id": 12
                },
                {
                    "name": "NWK_MANAGE_PERIODIC_MTO_ROUTE_REQ",
                    "id": 13
                },
                {
                    "name": "NWK_GET_NEIGHBOR_TABLE_REQ",
                    "id": 14
                },
                {
                    "name": "NWK_GET_NEIGHBOR_TABLE_RSP_IND",
                    "id": 15
                },
                {
                    "name": "NWK_GET_ROUTING_TABLE_REQ",
                    "id": 16
                },
                {
                    "name": "NWK_GET_ROUTING_TABLE_RSP_IND",
                    "id": 17
                },
                {
                    "name": "NWK_CHANGE_NWK_KEY_REQ",
                    "id": 18
                },
                {
                    "name": "NWK_GET_NWK_KEY_REQ",
                    "id": 19
                },
                {
                    "name": "NWK_GET_NWK_KEY_CNF",
                    "id": 20
                },
                {
                    "name": "NWK_ZIGBEE_DEVICE_IND",
                    "id": 21
                },
                {
                    "name": "NWK_GET_DEVICE_LIST_REQ",
                    "id": 22
                },
                {
                    "name": "NWK_GET_DEVICE_LIST_CNF",
                    "id": 23
                },
                {
                    "name": "NWK_DEVICE_LIST_MAINTENANCE_REQ",
                    "id": 24
                },
                {
                    "name": "NWK_REMOVE_DEVICE_REQ",
                    "id": 25
                },
                {
                    "name": "NWK_SET_BINDING_ENTRY_REQ",
                    "id": 26
                },
                {
                    "name": "NWK_SET_BINDING_ENTRY_RSP_IND",
                    "id": 27
                }
            ]
        },
        {
            "name": "nwkResetMode_t",
            "values": [
                {
                    "name": "SOFT_RESET",
                    "id": 0
                },
                {
                    "name": "HARD_RESET",
                    "id": 1
                }
            ]
        },
        {
            "name": "nwkPowerMode_t",
            "values": [
                {
                    "name": "SLEEP",
                    "id": 0
                },
                {
                    "name": "WAKEUP",
                    "id": 1
                }
            ]
        },
        {
            "name": "nwkNetworkStatus_t",
            "values": [
                {
                    "name": "NWK_DOWN",
                    "id": 0
                },
                {
                    "name": "NWK_UP",
                    "id": 1
                }
            ]
        },
        {
            "name": "nwkPermitJoinType_t",
            "values": [
                {
                    "name": "PERMIT_LOCAL",
                    "id": 0
                },
                {
                    "name": "PERMIT_NETWORK",
                    "id": 1
                },
                {
                    "name": "PERMIT_ALL",
                    "id": 2
                }
            ]
        },
        {
            "name": "nwkMtoRouteMode_t",
            "values": [
                {
                    "name": "MTO_ROUTE_START",
                    "id": 0
                },
                {
                    "name": "MTO_ROUTE_STOP",
                    "id": 1
                }
            ]
        },
        {
            "name": "nwkDeviceStatus_t",
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
                    "name": "DEVICE_NA",
                    "id": 255
                }
            ]
        },
        {
            "name": "nwkAddressType_t",
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
            "name": "nwkStatus_t",
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
            "name": "nwkLeaveMode_t",
            "values": [
                {
                    "name": "LEAVE",
                    "id": 0
                },
                {
                    "name": "LEAVE_REJOIN",
                    "id": 1
                }
            ]
        },
        {
            "name": "nwkBindingMode_t",
            "values": [
                {
                    "name": "BIND",
                    "id": 0
                },
                {
                    "name": "UNBIND",
                    "id": 1
                }
            ]
        },
        {
            "name": "nwkDeviceType_t",
            "values": [
                {
                    "name": "ZIGBEE_COORDINATOR",
                    "id": 0
                },
                {
                    "name": "ZIGBEE_ROUTER",
                    "id": 1
                },
                {
                    "name": "ZIGBEE_END_DEVICE",
                    "id": 2
                },
                {
                    "name": "UNKNOWN_DEVICE_TYPE",
                    "id": 3
                }
            ]
        },
        {
            "name": "nwkRxOnWhenIdle_t",
            "values": [
                {
                    "name": "RX_IS_OFF",
                    "id": 0
                },
                {
                    "name": "RX_IS_ON",
                    "id": 1
                },
                {
                    "name": "UNKNOWN_RX_STATE",
                    "id": 2
                }
            ]
        },
        {
            "name": "nwkRelationship_t",
            "values": [
                {
                    "name": "PARENT",
                    "id": 0
                },
                {
                    "name": "CHILD",
                    "id": 1
                },
                {
                    "name": "SIBLING",
                    "id": 2
                },
                {
                    "name": "NONE_OF_THE_ABOVE",
                    "id": 3
                },
                {
                    "name": "PREVIOUS_CHILD",
                    "id": 4
                }
            ]
        },
        {
            "name": "nwkPermitJoiningStatus_t",
            "values": [
                {
                    "name": "NOT_ACCEPTING",
                    "id": 0
                },
                {
                    "name": "ACCEPTS",
                    "id": 1
                },
                {
                    "name": "UNKNOWN_STATUS",
                    "id": 2
                }
            ]
        },
        {
            "name": "nwkRouteStatus_t",
            "values": [
                {
                    "name": "ROUTE_ACTIVE",
                    "id": 0
                },
                {
                    "name": "ROUTE_DISCOVERY_UNDERWAY",
                    "id": 1
                },
                {
                    "name": "ROUTE_DISCOVERY_FAILED",
                    "id": 2
                },
                {
                    "name": "REOUT_INACTIVE",
                    "id": 3
                }
            ]
        }
    ]
}).build();