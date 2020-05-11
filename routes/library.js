const router = require("koa-router")();
const query = require("../module/query");
const sd = require('silly-datetime');

router.get("/", function (ctx) {
    ctx.body = "图书馆首页"
});

//借阅表增加
router.get("/l_borrowadd", async (ctx) => {
    await ctx.render("../views/library/l_borrowadd");
})
router.get("/l_borrowadd1", async (ctx) => {
    let obj = ctx.request.query; //接收表单传来的数据
    if (!obj.student_id) {
        ctx.body = {
            code: 401,
            msg: "student_id required"
        };
        return;
    };
    if (!obj.book_id) {
        ctx.body = {
            code: 402,
            msg: "book_id required"
        };
        return;
    };
    let time = sd.format(new Date(), 'YYYY-MM-DD') //借书时间
    let year = Number(time[0] + time[1] + time[2] + time[3]); //还书年
    let month = ""; //还书月
    let day = time[8] + time[9] //还书日
    if (Number(time[5] + time[6]) >= 9) { //如果还书月份大于等于9则年份加一，月份重置
        year++;
        for (var i = 9; i <= 12; i++) {
            if (Number(time[5] + time[6]) == i) { //如果还书月份刚好等于9,10,11,12其中一天
                month = time[5] + (i + 4 - 12) //还书月份重置
                break;
            }
        }
    } else { //如果还书月份小于9则不需要重置直接加上4
        month = "0" + (Number(time[5] + time[6]) + 4)
    }
    let time1 = year + "-" + month + "-" + day;
    let sql = `insert into borrow (student_id,book_id,borrow_date,expect_return_date) values (?,?,?,?)`;
    let values = [obj.student_id, obj.book_id, time, time1];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "borrow registration successful",
                data: {
                    student_id: obj.student_id,
                    book_id: obj.book_id
                }
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "borrow registration error"
            };
        }
    }, (err) => {
        console.log(err)
        ctx.body = {
            code: 201,
            msg: "borrow registration error",
            reason: err
        };
    });

})

//借阅表删除
router.get("/l_borrowdelete", async (ctx) => {
    await ctx.render("../views/library/l_borrowdelete");
})
router.get("/l_borrowdelete1", async (ctx) => {
    let obj = ctx.request.query; //接收表单传来的数据
    if (!obj.student_id) {
        ctx.body = {
            code: 401,
            msg: "student_id required"
        };
        return;
    };
    let sql = `delete from borrow where student_id=? and book_id=?`;
    let values = [obj.student_id, obj.book_id];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "borrow delete successful",
                data: {
                    student_id: obj.student_id,
                    book_id: obj.book_id
                }
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "borrow delete error"
            };
        }
    }, (err) => {
        console.log(err)
        ctx.body = {
            code: 201,
            msg: "borrow delete error",
            reason: err
        };
    });

})

//还书表增加
router.get("/l_returntable_add", async (ctx) => {
    await ctx.render("../views/library/l_returntable_add");

    function convertDateFromString(dateString) {
        if (dateString) {
            var date = new Date(dateString.replace(/-/, "/"))
            return date;
        }
    }
    console.log(typeof sd.format(new Date(), 'YYYY-MM-DD'))
    console.log(convertDateFromString("2020-12-12") - convertDateFromString("2020-11-10"))
})
router.get("/l_returntable_add1", async (ctx) => {
    let obj = ctx.request.query; //接收表单传来的数据
    if (!obj.student_id) {
        ctx.body = {
            code: 401,
            msg: "student_id required"
        };
        return;
    };
    if (!obj.book_id) {
        ctx.body = {
            code: 402,
            msg: "book_id required"
        };
        return;
    };
    if (!obj.borrow_id) {
        ctx.body = {
            code: 403,
            msg: "borrow_id required"
        };
        return;
    };
    let sql = `insert into return_table (student_id,book_id,borrow_id,return_date) values (?,?,?,?)`;
    let values = [obj.student_id, obj.book_id, obj.borrow_id, sd.format(new Date(), 'YYYY-MM-DD'), obj.borrow_id];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "return_table add successful",
                data: {
                    student_id: obj.student_id,
                    book_id: obj.book_id
                }
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "return_table add error"
            };
        }
    }, (err) => {
        console.log(err)
        ctx.body = {
            code: 201,
            msg: "return_table add error",
            reason: err
        };
    });

})

//触处罚表增加
router.get("/l_ticketadd", async (ctx) => {
    await ctx.render("../views/library/l_ticketadd");
})
router.get("/l_ticketadd1", async (ctx) => {
    let obj = ctx.request.query; //接收表单传来的数据
    if (!obj.student_id) {
        ctx.body = {
            code: 401,
            msg: "student_id required"
        };
        return;
    };
    if (!obj.book_id) {
        ctx.body = {
            code: 402,
            msg: "book_id required"
        };
        return;
    };
    let sql = `select expect_return_date FROM borrow WHERE student_id=? and book_id=?`;
    let values = [obj.student_id, obj.book_id];
    await query(sql, values).then(async (results) => {
        if (results.length > 0) {
            function convertDateFromString(dateString) { //该函数用于字符串转换成date格式
                if (dateString) {
                    var date = new Date(dateString.replace(/-/, "/"))
                    return date;
                }
            }
            let over_date;
            if (convertDateFromString(sd.format(new Date(), 'YYYY-MM-DD')) - results[0].expect_return_date > 0) {
                over_date = (convertDateFromString(sd.format(new Date(), 'YYYY-MM-DD')) - results[0].expect_return_date) / 1000 / 60 / 60 / 24;
            }
            if (over_date > 0) {
                await query("insert into ticket (student_id,book_id,over_date,ticket_price) values (?,?,?,?)", [obj.student_id, obj.book_id, over_date, over_date * 2]).then((results) => {
                    ctx.body = {
                        code: 200,
                        msg: "return_table add succeed",
                        data: results
                    }
                })
            }else{
                ctx.body = {
                    code: 201,
                    msg: "return_table add error 未超出时间，添加失败",
                    data: results
                }
            }
        }else{
            ctx.body={
                code:201,
                msg:"return_table add error 未查到对应学号"
            }
        }
    }, (err) => {
        console.log(err)
        ctx.body = {
            code: 201,
            msg: "return_table add error",
            reason: err
        };
    });

})

//处罚表信息删除
router.get("/l_borrowdel", async (ctx) => {
    await ctx.render("../views/library/l_borrowdel");
})
router.get("/l_borrowdel1", async (ctx) => {
    let obj = ctx.request.query; //接收表单传来的数据
    if (!obj.student_id) {
        ctx.body = {
            code: 401,
            msg: "student_id required"
        };
        return;
    };
    if (!obj.book_id) {
        ctx.body = {
            code: 402,
            msg: "book_id required"
        };
        return;
    };
    let sql = `delete from ticket where student_id=? and book_id=?`;
    let values = [obj.student_id, obj.book_id];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "ticket delete successful",
                data: {
                    student_id: obj.student_id,
                    book_id: obj.book_id
                }
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "ticket delete error"
            };
        }
    }, (err) => {
        console.log(err)
        ctx.body = {
            code: 201,
            msg: "ticket delete error",
            reason: err
        };
    });

})
module.exports = router;