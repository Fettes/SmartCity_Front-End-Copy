# 车流

## 实时状态API p29

说明：根据设备号码获取车辆信息（速度、位置、车型、车道）


接口：

```
/api/radar/datacollect/byDevNo/
```
参数：
```
{"devNo":"radar123"}
```
数据源： 

表：vfm_roadstatusupload_active

ps: 每隔10秒，调用一次,获取该设备的最后一条数据

返回结果：

```
{
    "code": 200,
    "message": "操作成功！",
    "data": {   
        "devNo": "1",
        "Timestamp": "2017-11-10 12:21:39.404",
        "LaneNum": 4,
        "RoadStatus_List": [{
            "LaneNo": 1,
            "Vehicle_Num": 0,
            "Occupancy": 0,
            "AVSpeed": 0,
            "Pareto": 0,
            "Head_Pos": 0,
            "Head_Speed": 0,
            "Last_Pos": 0,
            "Last_Speed": 0
        }, {
            "LaneNo": 2,
            "Vehicle_Num": 0,
            "Occupancy": 0,
            "AVSpeed": 0,
            "Pareto": 0,
            "Head_Pos": 0,
            "Head_Speed": 0,
            "Last_Pos": 0,
            "Last_Speed": 0
        }, {
            "LaneNo ": 3,
            "Vehicle_Num": 1,
            "Occupancy": 0.035294,
            "AVSpeed": 30.600000,
            "Pareto": 0,
            "Head_Pos": 20,
            "Head_Speed": 30,
            "Last_Pos": 20,
            "Last_Speed": 30
        }, {
            "LaneNo ": 4,
            "Vehicle_Num": 0,
            "Occupancy": 0,
            "AVSpeed": 0,
            "Pareto": 0,
            "Head_Pos": 0,
            "Head_Speed": 0,
            "Last_Pos": 0,
            "Last_Speed: 0
        }]
    }
}


```
## 数据统计API

说明：

根据时间段，区域统计查询选中设备获取返回统计的车辆信息（车辆数、平均速度、车型）

数据源：

表：

接口：

```
/api/radar/statDataCollect/
```
参数：
```
{
	"devNo": "radar123",
	"starttime": "2018-01-12 12:30:12",
	"endtime": "2018-01-12 14:30:12"
}
```
返回结果：
```
{
	"code": 200,
	"message": "操作成功！",
	"data": {
		"totalVolume": 123,
		"totalVolume1": 123,
		"totalVolume2": 123,
		"totalVolume3": 123,
		"totalVolume4": 123,
		"totalVolume5": 123,
		"AVSpeed": 100.35
	}
}
```

## 资产信息

说明： 查看选中设备的资产信息

接口：
```
/api/radar/info
```
参数：
```
{"devNo":"radar123"}
```
数据来源：

表： device_vehicleflowmonitoring

返回结果：

```
{
	"code": 200,
	"message": "操作成功！",
	"data": {
		"vhfId": 1,
		"devNo": "radar123",
		"model": "xml120",
		"deviceTypeId": 7,
		"manufacturer": "ChinaMaker",
		"trackingTargetNumber": 128,
		"detectionDistance_portrait": 200,
		"laneNumber_transverse": "8",
		"installDate": "2019-1-23",
		"remark": "Demo",
		"centralControlUnitID": 23
	}
}
```


## 运行状态

说明： 查看选中设备的运行状态 

默认是正常
当发生故障，从数据表里面获取故障信息; 返回该设备最新一条记录

接口：

```
/api/radar/status
```

参数：
```
{"devNo":"radar123" }
```
数据来源：

表： 


返回结果：

```
{
	"code": 200,
	"message": "操作成功！",
	"data": {
		"devNo": "radar123",
		"timestamp": "2018-12-11",
		"FaultType": "Voltage_Error"
	}

}
```

说明： 修复设备的错误状态 

默认是正常
当修复故障之后，触发功能按键，更新状态status 为 0

接口：

```
/api/radar/updatestatus/
```

参数：
```
{
    "devNo":"radar123", 
    "status":0
}
```
数据来源：

表： 


返回结果：


```
{
	"code": 200,
	"message": "操作成功！",
	"data": {
		"devNo": "radar123",
		"timestamp": "2018-12-11",
		"status": 0
	}
}
```





