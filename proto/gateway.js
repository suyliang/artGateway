module.exports = require("protobufjs").newBuilder({})["import"]({
    "package": null,
    "messages": [
        {
            "name": "gwAddressStruct_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwAddressType_t",
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
            "name": "gwAttributeRecord_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "attributeId",
                    "id": 1
                },
                {
                    "rule": "required",
                    "type": "gwZclAttributeDataTypes_t",
                    "name": "attributeType",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "bytes",
                    "name": "attributeValue",
                    "id": 3
                }
            ]
        },
        {
            "name": "gwAttributeReport_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "attributeId",
                    "id": 1
                },
                {
                    "rule": "required",
                    "type": "gwZclAttributeDataTypes_t",
                    "name": "attributeType",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "minReportInterval",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "maxReportInterval",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "reportableChange",
                    "id": 5
                }
            ]
        },
        {
            "name": "gwAttributeReportConfig_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 1
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "attributeId",
                    "id": 2
                }
            ]
        },
        {
            "name": "gwAttributeWriteStatus_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "status",
                    "id": 1
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "attributeId",
                    "id": 2
                }
            ]
        },
        {
            "name": "gwClusterList_t",
            "fields": [
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 1
                },
                {
                    "rule": "repeated",
                    "type": "uint32",
                    "name": "attributeList",
                    "id": 2
                }
            ]
        },
        {
            "name": "GwZigbeeGenericCnf",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "ZIGBEE_GENERIC_CNF"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwStatus_t",
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
            "name": "GwZigbeeGenericRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
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
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                }
            ]
        },
        {
            "name": "GwAddGroupReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_ADD_GROUP_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "groupId",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "string",
                    "name": "groupName",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwGetGroupMembershipReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_GET_GROUP_MEMBERSHIP_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                }
            ]
        },
        {
            "name": "GwGetGroupMembershipRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_GET_GROUP_MEMBERSHIP_RSP_IND"
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
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "capacity",
                    "id": 5
                },
                {
                    "rule": "repeated",
                    "type": "uint32",
                    "name": "groupList",
                    "id": 6
                }
            ]
        },
        {
            "name": "GwRemoveFromGroupReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_REMOVE_FROM_GROUP_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "groupId",
                    "id": 3
                }
            ]
        },
        {
            "name": "GwStoreSceneReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_STORE_SCENE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "groupId",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "sceneId",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwRemoveSceneReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_REMOVE_SCENE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "groupId",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "sceneId",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwRecallSceneReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_RECALL_SCENE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "groupId",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "sceneId",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwGetSceneMembershipReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_GET_SCENE_MEMBERSHIP_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "groupId",
                    "id": 3
                }
            ]
        },
        {
            "name": "GwGetSceneMembershipRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_GET_SCENE_MEMBERSHIP_RSP_IND"
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
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "capacity",
                    "id": 5
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "groupId",
                    "id": 6
                },
                {
                    "rule": "required",
                    "type": "bytes",
                    "name": "sceneList",
                    "id": 7
                }
            ]
        },
        {
            "name": "GwSleepyDevicePacketPendingReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_SLEEPY_DEVICE_PACKET_PENDING_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                }
            ]
        },
        {
            "name": "GwSleepyDeviceCheckInInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_SLEEPY_DEVICE_CHECK_IN_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 2
                }
            ]
        },
        {
            "name": "GwAttributeChangeInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_ATTRIBUTE_CHANGE_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "endpointId",
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
                    "type": "uint32",
                    "name": "attributeId",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "gwZclAttributeDataTypes_t",
                    "name": "attributeType",
                    "id": 5
                },
                {
                    "rule": "required",
                    "type": "bytes",
                    "name": "attributeValue",
                    "id": 6
                }
            ]
        },
        {
            "name": "GwGetDeviceAttributeListReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_GET_DEVICE_ATTRIBUTE_LIST_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                }
            ]
        },
        {
            "name": "GwGetDeviceAttributeListRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_GET_DEVICE_ATTRIBUTE_LIST_RSP_IND"
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
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 4
                },
                {
                    "rule": "repeated",
                    "type": "gwClusterList_t",
                    "name": "clusterList",
                    "id": 5
                }
            ]
        },
        {
            "name": "GwReadDeviceAttributeReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_READ_DEVICE_ATTRIBUTE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 3
                },
                {
                    "rule": "repeated",
                    "type": "uint32",
                    "name": "attributeList",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwReadDeviceAttributeRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_READ_DEVICE_ATTRIBUTE_RSP_IND"
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
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 5
                },
                {
                    "rule": "repeated",
                    "type": "gwAttributeRecord_t",
                    "name": "attributeRecordList",
                    "id": 6
                }
            ]
        },
        {
            "name": "GwWriteDeviceAttributeReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_WRITE_DEVICE_ATTRIBUTE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 3
                },
                {
                    "rule": "repeated",
                    "type": "gwAttributeRecord_t",
                    "name": "attributeRecordList",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwWriteDeviceAttributeRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_WRITE_DEVICE_ATTRIBUTE_RSP_IND"
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
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 5
                },
                {
                    "rule": "repeated",
                    "type": "gwAttributeWriteStatus_t",
                    "name": "attributeWriteErrorList",
                    "id": 6
                }
            ]
        },
        {
            "name": "GwSetAttributeReportingReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_SET_ATTRIBUTE_REPORTING_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 3
                },
                {
                    "rule": "repeated",
                    "type": "gwAttributeReport_t",
                    "name": "attributeReportList",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwSetAttributeReportingRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_SET_ATTRIBUTE_REPORTING_RSP_IND"
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
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 5
                },
                {
                    "rule": "repeated",
                    "type": "gwAttributeReportConfig_t",
                    "name": "attributeReportConfigList",
                    "id": 6
                }
            ]
        },
        {
            "name": "GwAttributeReportingInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_ATTRIBUTE_REPORTING_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 4
                },
                {
                    "rule": "repeated",
                    "type": "gwAttributeRecord_t",
                    "name": "attributeRecordList",
                    "id": 5
                }
            ]
        },
        {
            "name": "GwSendZclFrameReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_SEND_ZCL_FRAME_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "endpointIdSource",
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
                    "type": "gwQualityOfService_t",
                    "name": "qualityOfService",
                    "id": 5
                },
                {
                    "rule": "required",
                    "type": "gwSecurityOptions_t",
                    "name": "securityOptions",
                    "id": 6
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 7
                },
                {
                    "rule": "required",
                    "type": "gwFrameType_t",
                    "name": "frameType",
                    "id": 8
                },
                {
                    "rule": "required",
                    "type": "gwMfrSpecificFlag_t",
                    "name": "manufacturerSpecificFlag",
                    "id": 9
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "manufacturerCode",
                    "id": 10
                },
                {
                    "rule": "required",
                    "type": "gwClientServerDir_t",
                    "name": "clientServerDirection",
                    "id": 11
                },
                {
                    "rule": "required",
                    "type": "gwDisableDefaultRsp_t",
                    "name": "disableDefaultRsp",
                    "id": 12
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "sequenceNumber",
                    "id": 13
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "commandId",
                    "id": 14
                },
                {
                    "rule": "required",
                    "type": "bytes",
                    "name": "payload",
                    "id": 15
                }
            ]
        },
        {
            "name": "GwZclFrameReceiveInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_ZCL_FRAME_RECEIVE_IND"
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
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
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
                    "name": "endpointIdDest",
                    "id": 5
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 6
                },
                {
                    "rule": "required",
                    "type": "gwFrameType_t",
                    "name": "frameType",
                    "id": 7
                },
                {
                    "rule": "required",
                    "type": "gwMfrSpecificFlag_t",
                    "name": "manufacturerSpecificFlag",
                    "id": 8
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "manufacturerCode",
                    "id": 9
                },
                {
                    "rule": "required",
                    "type": "gwClientServerDir_t",
                    "name": "clientServerDirection",
                    "id": 10
                },
                {
                    "rule": "required",
                    "type": "gwDisableDefaultRsp_t",
                    "name": "disableDefaultRsp",
                    "id": 11
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "commandId",
                    "id": 12
                },
                {
                    "rule": "required",
                    "type": "bytes",
                    "name": "payload",
                    "id": 13
                }
            ]
        },
        {
            "name": "GwAlarmInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_ALARM_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "alarmCode",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 4
                }
            ]
        },
        {
            "name": "GwAlarmResetReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "GW_ALARM_RESET_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "alarmCode",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "clusterId",
                    "id": 4
                }
            ]
        },
        {
            "name": "DevZoneEnrollmentReqInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_ZONE_ENROLLMENT_REQ_IND"
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
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "manufacturerCode",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "gwZoneType_t",
                    "name": "zoneType",
                    "id": 5
                }
            ]
        },
        {
            "name": "DevZoneEnrollmentRsp",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_ZONE_ENROLLMENT_RSP"
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
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwEnrollRspCode_t",
                    "name": "enrollmentResponseCode",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "zoneId",
                    "id": 5
                }
            ]
        },
        {
            "name": "DevZoneStatusChangeInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_ZONE_STATUS_CHANGE_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "zoneStatus",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "extendedStatus",
                    "id": 4
                }
            ]
        },
        {
            "name": "DevAceArmReqInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_ACE_ARM_REQ_IND"
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
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwArmMode_t",
                    "name": "armMode",
                    "id": 4
                }
            ]
        },
        {
            "name": "DevAceArmRsp",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_ACE_ARM_RSP"
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
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwArmModeRsp_t",
                    "name": "armResponse",
                    "id": 4
                }
            ]
        },
        {
            "name": "DevAceBypassInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_ACE_BYPASS_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "bytes",
                    "name": "zoneIdList",
                    "id": 3
                }
            ]
        },
        {
            "name": "DevAceEmergencyConditionInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_ACE_EMERGENCY_CONDITION_IND"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "gwEmergencyCondType_t",
                    "name": "emergencyConditionType",
                    "id": 3
                }
            ]
        },
        {
            "name": "DevAceGetZoneIdMapReqInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_ACE_GET_ZONE_ID_MAP_REQ_IND"
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
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 3
                }
            ]
        },
        {
            "name": "DevAceGetZoneIdMapRsp",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_ACE_GET_ZONE_ID_MAP_RSP"
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
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 3
                },
                {
                    "rule": "repeated",
                    "type": "uint32",
                    "name": "zoneIdMapSection",
                    "id": 4
                }
            ]
        },
        {
            "name": "DevAceGetZoneInformationReqInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_ACE_GET_ZONE_INFORMATION_REQ_IND"
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
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "zoneId",
                    "id": 4
                }
            ]
        },
        {
            "name": "DevAceGetZoneInformationRsp",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_ACE_GET_ZONE_INFORMATION_RSP"
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
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "zoneId",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "gwZoneType_t",
                    "name": "zoneType",
                    "id": 5
                },
                {
                    "rule": "required",
                    "type": "fixed64",
                    "name": "ieeeAddress",
                    "id": 6
                }
            ]
        },
        {
            "name": "DevSetIdentifyModeReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_SET_IDENTIFY_MODE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "identifyTime",
                    "id": 3
                }
            ]
        },
        {
            "name": "DevSetOnOffStateReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_SET_ONOFF_STATE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "gwOnOffState_t",
                    "name": "state",
                    "id": 3
                }
            ]
        },
        {
            "name": "DevSetLevelReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_SET_LEVEL_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "transitionTime",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "levelValue",
                    "id": 4
                }
            ]
        },
        {
            "name": "DevGetLevelReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_GET_LEVEL_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                }
            ]
        },
        {
            "name": "DevGetLevelRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_GET_LEVEL_RSP_IND"
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
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "levelValue",
                    "id": 5
                }
            ]
        },
        {
            "name": "DevGetOnOffStateReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_GET_ONOFF_STATE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                }
            ]
        },
        {
            "name": "DevGetOnOffStateRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_GET_ONOFF_STATE_RSP_IND"
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
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "gwOnOffStateValue_t",
                    "name": "stateValue",
                    "id": 5
                }
            ]
        },
        {
            "name": "DevSetColorReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_SET_COLOR_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "hueValue",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "saturationValue",
                    "id": 4
                }
            ]
        },
        {
            "name": "DevGetColorReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_GET_COLOR_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                }
            ]
        },
        {
            "name": "DevGetColorRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_GET_COLOR_RSP_IND"
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
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "hueValue",
                    "id": 5
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "satValue",
                    "id": 6
                }
            ]
        },
        {
            "name": "DevGetTempReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_GET_TEMP_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                }
            ]
        },
        {
            "name": "DevGetTempRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_GET_TEMP_RSP_IND"
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
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "temperatureValue",
                    "id": 5
                }
            ]
        },
        {
            "name": "DevGetPowerReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_GET_POWER_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                }
            ]
        },
        {
            "name": "DevGetPowerRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_GET_POWER_RSP_IND"
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
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "powerValue",
                    "id": 5
                }
            ]
        },
        {
            "name": "DevGetHumidityReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_GET_HUMIDITY_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                }
            ]
        },
        {
            "name": "DevGetHumidityRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_GET_HUMIDITY_RSP_IND"
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
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "uint32",
                    "name": "humidityValue",
                    "id": 5
                }
            ]
        },
        {
            "name": "DevSetDoorLockReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_SET_DOOR_LOCK_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "gwLockMode_t",
                    "name": "lockMode",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "bytes",
                    "name": "pinCodeValue",
                    "id": 4
                }
            ]
        },
        {
            "name": "DevSetDoorLockRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_SET_DOOR_LOCK_RSP_IND"
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
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "gwLockMode_t",
                    "name": "lockMode",
                    "id": 5
                }
            ]
        },
        {
            "name": "DevGetDoorLockStateReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_GET_DOOR_LOCK_STATE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                }
            ]
        },
        {
            "name": "DevGetDoorLockStateRspInd",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_GET_DOOR_LOCK_STATE_RSP_IND"
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
                    "type": "gwStatus_t",
                    "name": "status",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "srcAddress",
                    "id": 4
                },
                {
                    "rule": "required",
                    "type": "gwLockState_t",
                    "name": "lockState",
                    "id": 5
                },
                {
                    "rule": "required",
                    "type": "gwDoorState_t",
                    "name": "doorState",
                    "id": 6
                }
            ]
        },
        {
            "name": "DevThermostatSetpointChangeReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_THERMOSTAT_SETPOINT_CHANGE_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "gwThermostatSetpointMode_t",
                    "name": "mode",
                    "id": 3
                },
                {
                    "rule": "required",
                    "type": "int32",
                    "name": "amount",
                    "id": 4
                }
            ]
        },
        {
            "name": "DevWindowCoveringActionReq",
            "fields": [
                {
                    "rule": "required",
                    "type": "gwCmdId_t",
                    "name": "cmdId",
                    "id": 1,
                    "options": {
                        "default": "DEV_WINDOW_COVERING_ACTION_REQ"
                    }
                },
                {
                    "rule": "required",
                    "type": "gwAddressStruct_t",
                    "name": "dstAddress",
                    "id": 2
                },
                {
                    "rule": "required",
                    "type": "gwWindowCoveringAction_t",
                    "name": "action",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "value",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "percentage",
                    "id": 5
                }
            ]
        }
    ],
    "enums": [
        {
            "name": "zStackGwSysId_t",
            "values": [
                {
                    "name": "RPC_SYS_PB_GW",
                    "id": 19
                }
            ]
        },
        {
            "name": "gwCmdId_t",
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
                    "name": "GW_ADD_GROUP_REQ",
                    "id": 2
                },
                {
                    "name": "GW_GET_GROUP_MEMBERSHIP_REQ",
                    "id": 3
                },
                {
                    "name": "GW_GET_GROUP_MEMBERSHIP_RSP_IND",
                    "id": 4
                },
                {
                    "name": "GW_REMOVE_FROM_GROUP_REQ",
                    "id": 5
                },
                {
                    "name": "GW_STORE_SCENE_REQ",
                    "id": 6
                },
                {
                    "name": "GW_REMOVE_SCENE_REQ",
                    "id": 7
                },
                {
                    "name": "GW_RECALL_SCENE_REQ",
                    "id": 8
                },
                {
                    "name": "GW_GET_SCENE_MEMBERSHIP_REQ",
                    "id": 9
                },
                {
                    "name": "GW_GET_SCENE_MEMBERSHIP_RSP_IND",
                    "id": 10
                },
                {
                    "name": "GW_SLEEPY_DEVICE_PACKET_PENDING_REQ",
                    "id": 11
                },
                {
                    "name": "GW_SLEEPY_DEVICE_CHECK_IN_IND",
                    "id": 12
                },
                {
                    "name": "GW_ATTRIBUTE_CHANGE_IND",
                    "id": 13
                },
                {
                    "name": "GW_GET_DEVICE_ATTRIBUTE_LIST_REQ",
                    "id": 14
                },
                {
                    "name": "GW_GET_DEVICE_ATTRIBUTE_LIST_RSP_IND",
                    "id": 15
                },
                {
                    "name": "GW_READ_DEVICE_ATTRIBUTE_REQ",
                    "id": 16
                },
                {
                    "name": "GW_READ_DEVICE_ATTRIBUTE_RSP_IND",
                    "id": 17
                },
                {
                    "name": "GW_WRITE_DEVICE_ATTRIBUTE_REQ",
                    "id": 18
                },
                {
                    "name": "GW_WRITE_DEVICE_ATTRIBUTE_RSP_IND",
                    "id": 19
                },
                {
                    "name": "GW_SET_ATTRIBUTE_REPORTING_REQ",
                    "id": 20
                },
                {
                    "name": "GW_SET_ATTRIBUTE_REPORTING_RSP_IND",
                    "id": 21
                },
                {
                    "name": "GW_ATTRIBUTE_REPORTING_IND",
                    "id": 22
                },
                {
                    "name": "GW_SEND_ZCL_FRAME_REQ",
                    "id": 23
                },
                {
                    "name": "GW_ZCL_FRAME_RECEIVE_IND",
                    "id": 24
                },
                {
                    "name": "GW_ALARM_IND",
                    "id": 25
                },
                {
                    "name": "GW_ALARM_RESET_REQ",
                    "id": 26
                },
                {
                    "name": "DEV_ZONE_ENROLLMENT_REQ_IND",
                    "id": 27
                },
                {
                    "name": "DEV_ZONE_ENROLLMENT_RSP",
                    "id": 28
                },
                {
                    "name": "DEV_ZONE_STATUS_CHANGE_IND",
                    "id": 29
                },
                {
                    "name": "DEV_ACE_ARM_REQ_IND",
                    "id": 30
                },
                {
                    "name": "DEV_ACE_ARM_RSP",
                    "id": 31
                },
                {
                    "name": "DEV_ACE_BYPASS_IND",
                    "id": 32
                },
                {
                    "name": "DEV_ACE_EMERGENCY_CONDITION_IND",
                    "id": 33
                },
                {
                    "name": "DEV_ACE_GET_ZONE_ID_MAP_REQ_IND",
                    "id": 34
                },
                {
                    "name": "DEV_ACE_GET_ZONE_ID_MAP_RSP",
                    "id": 35
                },
                {
                    "name": "DEV_ACE_GET_ZONE_INFORMATION_REQ_IND",
                    "id": 36
                },
                {
                    "name": "DEV_ACE_GET_ZONE_INFORMATION_RSP",
                    "id": 37
                },
                {
                    "name": "DEV_SET_IDENTIFY_MODE_REQ",
                    "id": 38
                },
                {
                    "name": "DEV_SET_ONOFF_STATE_REQ",
                    "id": 39
                },
                {
                    "name": "DEV_SET_LEVEL_REQ",
                    "id": 40
                },
                {
                    "name": "DEV_GET_LEVEL_REQ",
                    "id": 41
                },
                {
                    "name": "DEV_GET_LEVEL_RSP_IND",
                    "id": 42
                },
                {
                    "name": "DEV_GET_ONOFF_STATE_REQ",
                    "id": 43
                },
                {
                    "name": "DEV_GET_ONOFF_STATE_RSP_IND",
                    "id": 44
                },
                {
                    "name": "DEV_SET_COLOR_REQ",
                    "id": 45
                },
                {
                    "name": "DEV_GET_COLOR_REQ",
                    "id": 46
                },
                {
                    "name": "DEV_GET_COLOR_RSP_IND",
                    "id": 47
                },
                {
                    "name": "DEV_GET_TEMP_REQ",
                    "id": 48
                },
                {
                    "name": "DEV_GET_TEMP_RSP_IND",
                    "id": 49
                },
                {
                    "name": "DEV_GET_POWER_REQ",
                    "id": 50
                },
                {
                    "name": "DEV_GET_POWER_RSP_IND",
                    "id": 51
                },
                {
                    "name": "DEV_GET_HUMIDITY_REQ",
                    "id": 52
                },
                {
                    "name": "DEV_GET_HUMIDITY_RSP_IND",
                    "id": 53
                },
                {
                    "name": "DEV_SET_DOOR_LOCK_REQ",
                    "id": 54
                },
                {
                    "name": "DEV_SET_DOOR_LOCK_RSP_IND",
                    "id": 55
                },
                {
                    "name": "DEV_GET_DOOR_LOCK_STATE_REQ",
                    "id": 56
                },
                {
                    "name": "DEV_GET_DOOR_LOCK_STATE_RSP_IND",
                    "id": 57
                },
                {
                    "name": "DEV_THERMOSTAT_SETPOINT_CHANGE_REQ",
                    "id": 58
                },
                {
                    "name": "DEV_WINDOW_COVERING_ACTION_REQ",
                    "id": 59
                }
            ]
        },
        {
            "name": "gwAddressType_t",
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
                    "name": "NONE",
                    "id": 3
                }
            ]
        },
        {
            "name": "gwDeviceStatus_t",
            "values": [
                {
                    "name": "DEVICE_OFFLINE",
                    "id": 0
                },
                {
                    "name": "DEVICE_ONLINE",
                    "id": 1
                },
                {
                    "name": "DEVICE_REMOVED",
                    "id": 2
                },
                {
                    "name": "NOT_APPLICABLE",
                    "id": 255
                }
            ]
        },
        {
            "name": "gwZclAttributeDataTypes_t",
            "values": [
                {
                    "name": "ZCL_DATATYPE_NO_DATA",
                    "id": 0
                },
                {
                    "name": "ZCL_DATATYPE_DATA8",
                    "id": 8
                },
                {
                    "name": "ZCL_DATATYPE_DATA16",
                    "id": 9
                },
                {
                    "name": "ZCL_DATATYPE_DATA24",
                    "id": 10
                },
                {
                    "name": "ZCL_DATATYPE_DATA32",
                    "id": 11
                },
                {
                    "name": "ZCL_DATATYPE_DATA40",
                    "id": 12
                },
                {
                    "name": "ZCL_DATATYPE_DATA48",
                    "id": 13
                },
                {
                    "name": "ZCL_DATATYPE_DATA56",
                    "id": 14
                },
                {
                    "name": "ZCL_DATATYPE_DATA64",
                    "id": 15
                },
                {
                    "name": "ZCL_DATATYPE_BOOLEAN",
                    "id": 16
                },
                {
                    "name": "ZCL_DATATYPE_BITMAP8",
                    "id": 24
                },
                {
                    "name": "ZCL_DATATYPE_BITMAP16",
                    "id": 25
                },
                {
                    "name": "ZCL_DATATYPE_BITMAP24",
                    "id": 26
                },
                {
                    "name": "ZCL_DATATYPE_BITMAP32",
                    "id": 27
                },
                {
                    "name": "ZCL_DATATYPE_BITMAP40",
                    "id": 28
                },
                {
                    "name": "ZCL_DATATYPE_BITMAP48",
                    "id": 29
                },
                {
                    "name": "ZCL_DATATYPE_BITMAP56",
                    "id": 30
                },
                {
                    "name": "ZCL_DATATYPE_BITMAP64",
                    "id": 31
                },
                {
                    "name": "ZCL_DATATYPE_UINT8",
                    "id": 32
                },
                {
                    "name": "ZCL_DATATYPE_UINT16",
                    "id": 33
                },
                {
                    "name": "ZCL_DATATYPE_UINT24",
                    "id": 34
                },
                {
                    "name": "ZCL_DATATYPE_UINT32",
                    "id": 35
                },
                {
                    "name": "ZCL_DATATYPE_UINT40",
                    "id": 36
                },
                {
                    "name": "ZCL_DATATYPE_UINT48",
                    "id": 37
                },
                {
                    "name": "ZCL_DATATYPE_UINT56",
                    "id": 38
                },
                {
                    "name": "ZCL_DATATYPE_UINT64",
                    "id": 39
                },
                {
                    "name": "ZCL_DATATYPE_INT8",
                    "id": 40
                },
                {
                    "name": "ZCL_DATATYPE_INT16",
                    "id": 41
                },
                {
                    "name": "ZCL_DATATYPE_INT24",
                    "id": 42
                },
                {
                    "name": "ZCL_DATATYPE_INT32",
                    "id": 43
                },
                {
                    "name": "ZCL_DATATYPE_INT40",
                    "id": 44
                },
                {
                    "name": "ZCL_DATATYPE_INT48",
                    "id": 45
                },
                {
                    "name": "ZCL_DATATYPE_INT56",
                    "id": 46
                },
                {
                    "name": "ZCL_DATATYPE_INT64",
                    "id": 47
                },
                {
                    "name": "ZCL_DATATYPE_ENUM8",
                    "id": 48
                },
                {
                    "name": "ZCL_DATATYPE_ENUM16",
                    "id": 49
                },
                {
                    "name": "ZCL_DATATYPE_SEMI_PREC",
                    "id": 56
                },
                {
                    "name": "ZCL_DATATYPE_SINGLE_PREC",
                    "id": 57
                },
                {
                    "name": "ZCL_DATATYPE_DOUBLE_PREC",
                    "id": 58
                },
                {
                    "name": "ZCL_DATATYPE_OCTET_STR",
                    "id": 65
                },
                {
                    "name": "ZCL_DATATYPE_CHAR_STR",
                    "id": 66
                },
                {
                    "name": "ZCL_DATATYPE_LONG_OCTET_STR",
                    "id": 67
                },
                {
                    "name": "ZCL_DATATYPE_LONG_CHAR_STR",
                    "id": 68
                },
                {
                    "name": "ZCL_DATATYPE_ARRAY",
                    "id": 72
                },
                {
                    "name": "ZCL_DATATYPE_STRUCT",
                    "id": 76
                },
                {
                    "name": "ZCL_DATATYPE_SET",
                    "id": 80
                },
                {
                    "name": "ZCL_DATATYPE_BAG",
                    "id": 81
                },
                {
                    "name": "ZCL_DATATYPE_TOD",
                    "id": 224
                },
                {
                    "name": "ZCL_DATATYPE_DATE",
                    "id": 225
                },
                {
                    "name": "ZCL_DATATYPE_UTC",
                    "id": 226
                },
                {
                    "name": "ZCL_DATATYPE_CLUSTER_ID",
                    "id": 232
                },
                {
                    "name": "ZCL_DATATYPE_ATTR_ID",
                    "id": 233
                },
                {
                    "name": "ZCL_DATATYPE_BAC_OID",
                    "id": 234
                },
                {
                    "name": "ZCL_DATATYPE_IEEE_ADDR",
                    "id": 240
                },
                {
                    "name": "ZCL_DATATYPE_128_BIT_SEC_KEY",
                    "id": 241
                },
                {
                    "name": "ZCL_DATATYPE_UNKNOWN",
                    "id": 255
                }
            ]
        },
        {
            "name": "gwQualityOfService_t",
            "values": [
                {
                    "name": "APS_NOT_ACK",
                    "id": 0
                },
                {
                    "name": "APS_ACK",
                    "id": 1
                }
            ]
        },
        {
            "name": "gwSecurityOptions_t",
            "values": [
                {
                    "name": "APS_SECURITY_DISABLED",
                    "id": 0
                },
                {
                    "name": "APS_SECURITY_ENABLED",
                    "id": 1
                }
            ]
        },
        {
            "name": "gwFrameType_t",
            "values": [
                {
                    "name": "FRAME_VALID_ACCROSS_PROFILE",
                    "id": 0
                },
                {
                    "name": "FRAME_CLUSTER_SPECIFIC",
                    "id": 1
                }
            ]
        },
        {
            "name": "gwMfrSpecificFlag_t",
            "values": [
                {
                    "name": "NON_MFR_SPECIFIC",
                    "id": 0
                },
                {
                    "name": "MFR_SPECIFIC",
                    "id": 1
                }
            ]
        },
        {
            "name": "gwClientServerDir_t",
            "values": [
                {
                    "name": "CLIENT_TO_SERVER",
                    "id": 0
                },
                {
                    "name": "SERVER_TO_CLIENT",
                    "id": 1
                }
            ]
        },
        {
            "name": "gwDisableDefaultRsp_t",
            "values": [
                {
                    "name": "DEFAULT_RSP_ENABLED",
                    "id": 0
                },
                {
                    "name": "DEFAULT_RSP_DISABLED",
                    "id": 1
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
            "name": "gwOnOffState_t",
            "values": [
                {
                    "name": "OFF_STATE",
                    "id": 0
                },
                {
                    "name": "ON_STATE",
                    "id": 1
                },
                {
                    "name": "TOGGLE_STATE",
                    "id": 2
                }
            ]
        },
        {
            "name": "gwOnOffStateValue_t",
            "values": [
                {
                    "name": "OFF",
                    "id": 0
                },
                {
                    "name": "ON",
                    "id": 1
                }
            ]
        },
        {
            "name": "gwLockMode_t",
            "values": [
                {
                    "name": "LOCK_MODE_LOCK",
                    "id": 0
                },
                {
                    "name": "LOCK_MODE_UNLOCK",
                    "id": 1
                }
            ]
        },
        {
            "name": "gwLockState_t",
            "values": [
                {
                    "name": "LOCK_NOT_FULLY_LOCKED",
                    "id": 0
                },
                {
                    "name": "LOCK_LOCKED",
                    "id": 1
                },
                {
                    "name": "LOCK_UNLOCKED",
                    "id": 2
                }
            ]
        },
        {
            "name": "gwDoorState_t",
            "values": [
                {
                    "name": "DOOR_OPEN",
                    "id": 0
                },
                {
                    "name": "DOOR_CLOSED",
                    "id": 1
                },
                {
                    "name": "DOOR_JAMMED",
                    "id": 2
                },
                {
                    "name": "DOOR_FORCED_OPEN",
                    "id": 3
                }
            ]
        },
        {
            "name": "gwZoneType_t",
            "values": [
                {
                    "name": "STANDARD_CIE",
                    "id": 0
                },
                {
                    "name": "MOTION_SENSOR",
                    "id": 13
                },
                {
                    "name": "CONTACT_SW",
                    "id": 21
                },
                {
                    "name": "FIRE_SENSOR",
                    "id": 40
                },
                {
                    "name": "WATER_SENSOR",
                    "id": 42
                },
                {
                    "name": "GAS_SENSOR",
                    "id": 43
                },
                {
                    "name": "PERSONAL_EMERGENCY_DEVICE",
                    "id": 44
                },
                {
                    "name": "VIBRATION_MOVEMENT_SENSOR",
                    "id": 45
                },
                {
                    "name": "REMOTE_CONTROL",
                    "id": 271
                },
                {
                    "name": "KEY_FOB",
                    "id": 277
                },
                {
                    "name": "KEY_PAD",
                    "id": 541
                },
                {
                    "name": "STANDARD_WARNING_DEVICE",
                    "id": 549
                },
                {
                    "name": "ZONE_UNALLOCATED",
                    "id": 65535
                }
            ]
        },
        {
            "name": "gwEnrollRspCode_t",
            "values": [
                {
                    "name": "ZONE_ENROLL_SUCCESS",
                    "id": 0
                },
                {
                    "name": "ZONE_NOT_SUPPORTED",
                    "id": 1
                },
                {
                    "name": "ZONE_NOT_PERMITTED",
                    "id": 2
                },
                {
                    "name": "ZONE_ENROLLMENT_FULL",
                    "id": 3
                }
            ]
        },
        {
            "name": "gwArmMode_t",
            "values": [
                {
                    "name": "DISARM",
                    "id": 0
                },
                {
                    "name": "ARM_DAY_HOME_ZONES_ONLY",
                    "id": 1
                },
                {
                    "name": "ARM_NIGHT_SLEEP_ZONES_ONLY",
                    "id": 2
                },
                {
                    "name": "ARM_ALL_ZONES",
                    "id": 3
                }
            ]
        },
        {
            "name": "gwArmModeRsp_t",
            "values": [
                {
                    "name": "ALL_ZONES_DISARMED",
                    "id": 0
                },
                {
                    "name": "ONLY_DAY_HOME_ZONES_ARMED",
                    "id": 1
                },
                {
                    "name": "ONLY_NIGHT_SLEEP_ZONES_ARMED",
                    "id": 2
                },
                {
                    "name": "ALL_ZONES_ARMED",
                    "id": 3
                }
            ]
        },
        {
            "name": "gwEmergencyCondType_t",
            "values": [
                {
                    "name": "EMERGENCY",
                    "id": 2
                },
                {
                    "name": "FIRE",
                    "id": 3
                },
                {
                    "name": "PANIC",
                    "id": 4
                }
            ]
        },
        {
            "name": "gwThermostatSetpointMode_t",
            "values": [
                {
                    "name": "HEAT_SETPOINT",
                    "id": 0
                },
                {
                    "name": "COOL_SETPOINT",
                    "id": 1
                },
                {
                    "name": "BOTH_SETPOINTS",
                    "id": 2
                }
            ]
        },
        {
            "name": "gwWindowCoveringAction_t",
            "values": [
                {
                    "name": "WC_UP_OPEN",
                    "id": 0
                },
                {
                    "name": "WC_DOWN_CLOSE",
                    "id": 1
                },
                {
                    "name": "WC_STOP",
                    "id": 2
                },
                {
                    "name": "WC_GO_TO_LIFT_VALUE",
                    "id": 4
                },
                {
                    "name": "WC_GO_TO_LIFT_PERCENT",
                    "id": 5
                },
                {
                    "name": "WC_GO_TO_TILT_VALUE",
                    "id": 7
                },
                {
                    "name": "WC_GO_TO_TILT_PERCENT",
                    "id": 8
                }
            ]
        },
        {
            "name": "gwRegisterUnregister_t",
            "values": [
                {
                    "name": "UNREGISTER_EXISTING_IMAGE",
                    "id": 0
                },
                {
                    "name": "REGISTER_NEW_IMAGE",
                    "id": 1
                }
            ]
        },
        {
            "name": "gwExecutionTimingType_t",
            "values": [
                {
                    "name": "EXECUTE_IMMEDIATELY",
                    "id": 0
                },
                {
                    "name": "EXECUTE_DELAY_IS_SPECIFIED",
                    "id": 1
                },
                {
                    "name": "EXECUTE_TIME_IS_SPECIFIED",
                    "id": 2
                },
                {
                    "name": "HOLD_EXECUTION",
                    "id": 3
                },
                {
                    "name": "NO_CHANGE",
                    "id": 255
                }
            ]
        },
        {
            "name": "gwImageNotification_t",
            "values": [
                {
                    "name": "DONT_SEND_NOTIFICATION",
                    "id": 0
                },
                {
                    "name": "BROADCAST_NOTIFICATION",
                    "id": 1
                },
                {
                    "name": "UNICAST_NOTIFICATION",
                    "id": 2
                }
            ]
        },
        {
            "name": "gwImageUpdateMode_t",
            "values": [
                {
                    "name": "OTA_DOWNLOAD_ENABLED",
                    "id": 0
                },
                {
                    "name": "NEW_OTA_DOWNLOADS_DISABLE",
                    "id": 1
                },
                {
                    "name": "OTA_DOWNLOAD_DISABLE",
                    "id": 2
                }
            ]
        }
    ]
}).build();