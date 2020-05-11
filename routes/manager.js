const router = require("koa-router")();
const query = require("../module/query");
const sd = require('silly-datetime');

router.get("/", function (ctx) {
    ctx.body = "管理员首页"
});

//管理员注册
router.get("/m_register", async (ctx) => {
    await ctx.render("../views/monager/m_register");
})
router.post("/m_register", async (ctx) => {
    let obj = ctx.request.body; //接收表单传来的数据
    if (!obj.manager_zh) { //如果输入的用户名为空
        ctx.body = {
            code: 401,
            msg: "manager_zh required"
        };
        return;
    };
    if (!obj.manager_ma) { //如果输入的密码为空
        ctx.body = {
            code: 402,
            msg: "manager_ma required"
        };
        return;
    };
    let sql = `insert into manager (manager_zh,manager_ma,manager_time) values (?,?,?)`;
    let values = [obj.manager_zh, obj.manager_ma, sd.format(new Date(), 'YYYY-MM-DD')];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "Administrator registration successful",
                data: {
                    manager_zh: obj.manager_zh,
                    manager_ma: obj.manager_ma
                }
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Administrator registration error"
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Administrator registration error",
            reason: err
        };
    });

})

//管理员登录
router.get("/m_login", async (ctx) => {
    await ctx.render("../views/monager/m_login");
});
router.post("/m_login", async (ctx) => {
    let obj = ctx.request.body; //接收表单传来的数据
    if (!obj.manager_zh) { //如果输入的用户名为空
        ctx.body = {
            code: 401,
            msg: "manager_zh required"
        };
        return;
    };
    if (!obj.manager_ma) {
        ctx.body = {
            code: 402,
            msg: "manager_ma required"
        };
        return;
    };
    let sql = `SELECT * from manager WHERE manager_zh=? AND manager_ma=?`;
    let values = [obj.manager_zh, obj.manager_ma];
    await query(sql, values).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "Administrator login successful",
                data: results[0]
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Administrator login error",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Administrator login error",
            reason: err
        };
    });

})

//管理员注销
router.get("/m_logout", async (ctx) => {
    await ctx.render("../views/monager/m_logout");
})
router.post("/m_logout", async (ctx) => {
    let obj = ctx.request.body; //接收表单传来的数据
    if (!obj.manager_zh) { //如果输入的用户名为空
        ctx.body = {
            code: 401,
            msg: "manager_zh required"
        };
        return;
    };
    if (!obj.manager_ma) {
        ctx.body = {
            code: 402,
            msg: "manager_ma required"
        };
        return;
    };
    let sql = `delete from manager WHERE manager_zh=? AND manager_ma=?`;
    let values = [obj.manager_zh, obj.manager_ma];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "Administrator m_logout successful",
                data: results[0]
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Administrator m_logout error",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Administrator m_logout error",
            reason: err
        };
    });
});

//管理员信息修改
router.get("/m_update", async (ctx) => {
    await ctx.render("../views/monager/m_update");
})
router.post("/m_update", async (ctx) => {
    let obj = ctx.request.body; //接收表单传来的数据
    await query("select * from manager where manager_zh=?", obj.manager_zh).then((results) => {
        for (let key in obj) {
            if (obj[key] == "") {
                obj[key] = results[0][key]
            }
        }
    })
    let sql = `update manager set manager_age=?,manager_phone=?,manager_book_id=?,manager_ma=? WHERE manager_zh=?`;
    let values = [obj.manager_age, obj.manager_phone, obj.manager_book_id, obj.manager_ma, obj.manager_zh];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "Administrator m_update successful",
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Administrator m_update error",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Administrator m_update error",
            reason: err
        };
    });
})

//检测账号
router.get("/m_checkzh", async (ctx) => {
    await ctx.render("../views/monager/m_checkzh");
})
router.get("/m_checkzh1", async (ctx) => {
    let obj = ctx.request.body; //接收表单传来的数据
    if (!obj.manager_zh) {
        ctx.body = {
            code: 401,
            msg: "账号为空！！！"
        }
    }
    let sql = `select * from manager where manager_zh=?`;
    let values = [obj.manager_zh];
    await query(sql, values).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 201,
                msg: "This account exists, cannot register",
            };
        } else {
            ctx.body = {
                code: 200,
                msg: "This account does not exist, you can register",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Administrator m_checkzh1 error",
            reason: err
        };
    });
})

//检测手机号
router.get("/m_checkphone", async (ctx) => {
    await ctx.render("../views/monager/m_checkphone");
})
router.get("/m_checkphone1", async (ctx) => {
    let obj = ctx.request.query; //接收表单传来的数据
    if (!obj.manager_phone) {
        ctx.body = {
            code: 401,
            msg: "手机号为空！！！"
        }
        return;
    }
    let sql = `select * from manager where manager_phone=?`;
    let values = [obj.manager_phone];
    await query(sql, values).then((results) => {

        if (results.length > 0) {
            ctx.body = {
                code: 201,
                msg: "This mobile phone number exists and cannot be used",
            };
        } else {
            ctx.body = {
                code: 200,
                msg: "The phone number does not exist and can be used",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Administrator m_checkzh1 error",
            reason: err
        };
    });
})

//获取当前用户信息
router.get("/m_getinfo", async (ctx) => {
    await ctx.render("../views/monager/m_getinfo");
})
router.get("/m_getinfo1", async (ctx) => {
    let obj = ctx.request.query; //接收表单传来的数据
    let sql = `select * from manager where manager_zh=?`;
    let values = [obj.manager_zh];
    await query(sql, values).then((results) => {
        ctx.body = {
            code: 200,
            msg: "Successful acquisition",
            data:results[0]
        };
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Administrator m_checkzh1 error",
            reason: err
        };
    });
})

//退出登录
router.get("/m_logoff", async (ctx) => {
    await ctx.render("../views/monager/m_logoff");
})
router.get("/m_logoff1", async (ctx) => {
    let obj = ctx.request.query; //接收表单传来的数据
    let sql = `select * from manager where manager_zh=?`;
    let values = [obj.manager_zh];
    await query(sql, values).then((results) => {
        ctx.body = {
            code: 200,
            msg: "Exit the success",
        };
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Administrator m_checkzh1 error",
            reason: err
        };
    });
});

//管理员头像上传
router.get("/m_upload", async (ctx) => {
    let sql = `select manager.manager_img from manager WHERE manager_zh=?`;
    let values = ["123456"];
    await query(sql, values).then(async (results) => {
        var m_img = "";
        if (results[0].manager_img.indexOf("upload_") == -1) {
            m_img = results[0].manager_img;
        } else {
            m_img = "/uploads/" + results[0].manager_img;
        }
        await ctx.render("../views/monager/m_upload", {
            m_img
        });
    });
})
router.post("/m_upload", async (ctx) => {
    let filename = ctx.request.files.file.path.slice(ctx.request.files.file.path.indexOf("upload_"));
    let obj = ctx.request.body; //接收表单传来的数据
    let sql = `update manager set manager_img=? where manager_zh=?`;
    let values = [filename, obj.manager_zh];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "Picture long pass successful",
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Picture long pass error",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 301,
            msg: "Picture long pass error",
            reason: err
        };
    });
})
module.exports = router;