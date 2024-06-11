const menu = {
    list() {
        return [
            { 
                "backMenu": [
                    { 
                        "child": [
                            { 
                                "appFrontIcon": "cuIcon-attentionfavor", 
                                "buttons": ["新增", "查看", "修改", "删除"],
                                 "menu": "用户",
                                  "menuJump": "列表", 
                                  "tableName": "yonghu" 
                            }
                        ],
                        "menu": "用户管理" 
                    },        
                         { 
                            "child": [
                                
                                {
                                     "appFrontIcon": "cuIcon-goodsnew", 
                                     "buttons": ["新增", "查看", "修改", "删除"], 
                                     "menu": "天气预报", 
                                     "menuJump": "列表", 
                                     "tableName": "tianqiyubao" 
                                    }
                                ], 
                                "menu": "天气预报管理" 
                            },
                                                
                            
                            { 
                                "child": [
                                    { "appFrontIcon": "cuIcon-camera",
                                     "buttons": ["新增", "查看", "修改", "删除", "查看评论"], 
                                     "menu": "交通路线", 
                                     "menuJump": "列表", 
                                     "tableName": "jiaotongluxian" 
                                    }
                                ], 
                                "menu": "交通路线管理" 
                            }, 
                            {
                                "child": [
                                    { "appFrontIcon": "cuIcon-phone", 
                                    "buttons": ["查看", "删除", "查看评论"],
                                     "menu": "旅行日记", "menuJump": 
                                     "列表", "tableName": "lvxingriji"
                                     }
                                    ], 
                                    "menu": "旅行日记管理" 
                                },
                                 { 
                                    "child": [
                                        { "appFrontIcon": "cuIcon-addressbook", 
                                        "buttons": ["查看", "删除"],
                                         "menu": "旅游规划", 
                                         "menuJump": "列表", 
                                         "tableName": "lvyouguihua"
                                         }
                                        ], 
                                        "menu": "旅游规划管理"
                                     }, 
                                     { 
                                        "child": [
                                            { "appFrontIcon": "cuIcon-time",
                                             "buttons": ["查看", "修改", "删除"],
                                              "menu": "轮播图管理",
                                               "tableName": "config" 
                                            },
                                             { "appFrontIcon": "cuIcon-news", 
                                             "buttons": ["新增", "查看", "修改", "删除"], 
                                             "menu": "公告信息", "tableName": "news" }], 
                                             "menu": "系统管理" 
                                            }
                                        ], 
                                        "frontMenu": [
                                            { "child": [
                                                { "appFrontIcon": "cuIcon-shop", 
                                                "buttons": ["查看", "订门票"], 
                                                "menu": "景点信息列表", 
                                                "menuJump": "列表",
                                                "tableName": "jingdianxinxi" }
                                            ], 
                                            "menu": "景点信息模块" 
                                        }, 
                                        { 
                                            "child": [
                                                { "appFrontIcon": "cuIcon-phone", 
                                                "buttons": ["查看", "订酒店"], 
                                                "menu": "酒店信息列表",
                                                "menuJump": "列表",
                                                 "tableName": "jiudianxinxi" 
                                                }
                                            ],
                                             "menu": "酒店信息模块"
                                             }, 
                                             {
                                                 "child": [
                                                    { "appFrontIcon": "cuIcon-full",
                                                     "buttons": ["查看", "租车"],
                                                      "menu": "车辆信息列表",
                                                       "menuJump": "列表",
                                                        "tableName": "cantingxinxi" 
                                                    }
                                                ], 
                                                "menu": "车辆信息模块"
                                             },
                                              { 
                                                "child": [
                                                    { "appFrontIcon": "cuIcon-addressbook", 
                                                    "buttons": ["查看"], 
                                                    "menu": "交通路线列表", 
                                                    "menuJump": "列表", 
                                                    "tableName": "jiaotongluxian" 
                                                }
                                            ], 
                                            "menu": "交通路线模块" 
                                        }, 
                                        { 
                                            "child": [
                                                { "appFrontIcon": "cuIcon-newshot", 
                                                "buttons": ["查看"],
                                                 "menu": "旅行日记列表",
                                                  "menuJump": "列表",
                                                   "tableName": "lvxingriji"
                                                 }
                                                ], "menu": "旅行日记模块" 
                    }
                ], 
                "hasBackLogin": "是", 
                "hasBackRegister": "否", 
                "hasFrontLogin": "否", 
                "hasFrontRegister": "否", 
                "roleName": "平台", 
                "tableName": "users" 
            }, 
            { 
                "backMenu": [
                    { 
                        "child": [
                            { "appFrontIcon": "cuIcon-newshot",
                            "buttons": ["查看", "支付"], 
                            "menu": "门票预订", 
                            "menuJump": "列表", 
                            "tableName": "menpiaoyuding" 
                        }
                    ], 
                    "menu": "门票预订管理"
                 },
                 {
                     "child": [
                        { "appFrontIcon": "cuIcon-keyboard", 
                        "buttons": ["查看", "支付"],
                         "menu": "酒店预订",
                          "menuJump": "列表",
                           "tableName": "jiudianyuding"
                         }
                        ], 
                        "menu": "酒店预订管理"
                    }, 
                    { 
                        "child": [
                            { "appFrontIcon": "cuIcon-taxi", 
                            "buttons": ["查看", "支付"], 
                            "menu": "车辆租赁", 
                            "menuJump": "列表",
                             "tableName": "cantingyuding" 
                            }
                        ], 
                        "menu": "车辆租赁管理"
                    }, 
                    { 
                        "child": [
                            { "appFrontIcon": "cuIcon-phone",
                             "buttons": ["新增", "查看", "修改", "删除", "查看评论"],
                             "menu": "旅行日记",
                              "menuJump": "列表", 
                              "tableName": "lvxingriji"
                            }
                        ], 
                        "menu": "旅行日记管理" 
                    }, { "child": 
                    [
                        { "appFrontIcon": "cuIcon-addressbook", 
                        "buttons": ["新增", "查看", "修改", "删除"], 
                        "menu": "旅游规划", 
                        "menuJump": "列表", 
                        "tableName": "lvyouguihua" 
                    }
                ], 
                "menu": "旅游规划管理" 
            }
        ], 
        "frontMenu": [
            {
                 "child": [
                    { "appFrontIcon": "cuIcon-shop", 
                    "buttons": ["查看", "订门票"],
                    "menu": "景点信息列表", 
                    "menuJump": "列表",
                    "tableName": "jingdianxinxi"
                 }
                ], 
                "menu": "景点信息模块" 
            }, {
                 "child": [
                    { "appFrontIcon": "cuIcon-phone",
                    "buttons": ["查看", "订酒店"], 
                    "menu": "酒店信息列表", 
                    "menuJump": "列表", 
                    "tableName": "jiudianxinxi"
                }
            ], 
            "menu": "酒店信息模块" 
        },
        { 
            "child": [
                { "appFrontIcon": "cuIcon-full", 
                "buttons": ["查看", "租车"], 
                "menu": "车辆信息列表",
                "menuJump": "列表",
                 "tableName": "cantingxinxi"
                 }
                ], "menu": "车辆信息模块" 
            },
             { 
                "child": [
                    { "appFrontIcon": "cuIcon-addressbook", 
                    "buttons": ["查看"], 
                    "menu": "交通路线列表", 
                    "menuJump": "列表", 
                    "tableName": "jiaotongluxian"
                 }
                ],
                "menu": "交通路线模块" 
            }, 
            { 
                "child": [
                    { "appFrontIcon": "cuIcon-newshot",
                     "buttons": ["查看"],
                      "menu": "旅行日记列表",
                      "menuJump": "列表",
                       "tableName": "lvxingriji"
                     }
                    ], "menu": "旅行日记模块" 
                }
                ], 
                "hasBackLogin": 
                "是", "hasBackRegister": 
                "否", "hasFrontLogin": "是", 
                "hasFrontRegister": "是", 
                "roleName": "用户", 
                "tableName": "yonghu" 
            },{
                "hasBackLogin": 
                "是", "hasBackRegister": 
                "否", "hasFrontLogin": "是", 
                "hasFrontRegister": "是", 
                "roleName": "企业", 
                "tableName": "users" ,
                "backMenu": [
                    
                    { 
                        "child": [
                            { "appFrontIcon": "cuIcon-time", 
                            "buttons": ["新增", "查看", "修改", "删除", "查看评论"], 
                            "menu": "景点信息", 
                            "menuJump": "列表", 
                            "tableName": "jingdianxinxi" 
                        }
                    ], 
                    "menu": "景点信息管理" 
                }, 
                { 
                    "child": [
                        { "appFrontIcon": "cuIcon-newshot", 
                        "buttons": ["查看", "删除"],
                         "menu": "门票预订", 
                         "menuJump": "列表",
                         "tableName": "menpiaoyuding" 
                        }
                    ], 
                    "menu": "门票预订管理" 
                },
                { 
                    "child": [
                        { "appFrontIcon": "cuIcon-attentionfavor",
                         "buttons": ["新增", "查看", "修改", "删除", "查看评论"],
                          "menu": "酒店信息", 
                          "menuJump": "列表", 
                          "tableName": "jiudianxinxi" 
                        }
                    ], 
                    "menu": "酒店信息管理" 
                }, { 
                    "child": [
                        { "appFrontIcon": "cuIcon-keyboard",
                         "buttons": ["查看", "删除"],
                          "menu": "酒店预订",
                           "menuJump": "列表", 
                           "tableName": "jiudianyuding"
                         }
                        ], 
                        "menu": "酒店预订管理" 
                    }, 
                    { 
                        "child": [
                            { "appFrontIcon": "cuIcon-wenzi",
                             "buttons": ["新增", "查看", "修改", "删除", "查看评论"],
                              "menu": "车辆信息", 
                              "menuJump": "列表",
                               "tableName": "cantingxinxi" 
                            }
                        ], 
                        "menu": "车辆信息管理" 
                    },
                     {
                        "child": [
                            { "appFrontIcon": "cuIcon-taxi", 
                            "buttons": ["查看", "删除"], 
                            "menu": "车辆租赁",
                             "menuJump": "列表",
                              "tableName": "cantingyuding" 
                            }
                        ], 
                        "menu": "车辆租赁管理" 
                    }, 
                ], 
            }
            
        ]
    }
}
export default menu;
