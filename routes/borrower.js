const router = require("koa-router")();
const query = require("../module/query");
const multer = require('koa-multer')

router.get("/", function (ctx) {
    ctx.body = "借阅者首页"
});

//学生表增加
router.get("/s_add", async (ctx) => {
    await ctx.render("../views/borrower/s_add");
})
router.post("/s_add", async (ctx) => {
    let obj = ctx.request.body; //接收表单传来的数据
    if (!obj.stu_id) { //如果输入的用户名为空
        ctx.body = {
            code: 401,
            msg: "stu_id required"
        };
        return;
    };
    if (!obj.stu_ma) { //如果输入的密码为空
        ctx.body = {
            code: 402,
            msg: "stu_ma required"
        };
        return;
    };
    let sql = `insert into students (stu_id,stu_ma) values (?,?)`;
    let values = [obj.stu_id, obj.stu_ma];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "students registration successful",
                data: {
                    stu_id: obj.stu_id,
                    stu_ma: obj.stu_ma
                }
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "students registration error"
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "students registration error",
            reason: err
        };
    });

})

//学生表删除
router.get("/s_delete", async (ctx) => {
    await ctx.render("../views/borrower/s_delete");
})
router.post("/s_delete", async (ctx) => {
    let obj = ctx.request.body; //接收表单传来的数据
    if (!obj.stu_id) { //如果输入的用户名为空
        ctx.body = {
            code: 401,
            msg: "stu_id required"
        };
        return;
    };
    if (!obj.stu_ma) { //如果输入的密码为空
        ctx.body = {
            code: 402,
            msg: "stu_ma required"
        };
        return;
    };
    let sql = `delete from students where stu_id=? and stu_ma=?`;
    let values = [obj.stu_id, obj.stu_ma];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "students StudentsDelete successful",
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "students StudentsDelete error"
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "students StudentsDelete error",
            reason: err
        };
    });

})

//学生信息修改
router.get("/s_update", async (ctx) => {
    await ctx.render("../views/borrower/s_update");
})
router.post("/s_update", async (ctx) => {
    let obj = ctx.request.body; //接收表单传来的数据
    await query("select * from students where stu_id=?", obj.stu_id).then((results) => {
        for (let key in obj) {
            if (obj[key] == "") {
                obj[key] = results[0][key]
            }
        }
    })
    let sql = `update students set stu_sex=?,stu_age=?,stu_pro=?,stu_grade=?,stu_ma=? WHERE stu_id=?`;
    let values = [obj.stu_sex, obj.stu_age, obj.stu_pro, obj.stu_grade, obj.stu_ma, obj.stu_id];
    await query(sql, values).then((results) => {
        if (results.affectedRows > 0) {
            ctx.body = {
                code: 200,
                msg: "Administrator s_update successful",
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "Administrator s_update error",
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "Administrator s_update error",
            reason: err
        };
    });
})

//学生借阅查询
router.get("/s_borrowinfo", async (ctx) => {
    await ctx.render("../views/borrower/s_borrowinfo");
})
router.get("/s_borrowinfo1", async (ctx) => {
    let obj = ctx.request.query; //接收表单传来的数据
    let sql = `SELECT students.stu_id,students.stu_name,book.book_name,book.book_author,book.book_pub,borrow.borrow_date,borrow.expect_return_date FROM borrow INNER JOIN students ON borrow.student_id=students.stu_id INNER JOIN book ON borrow.book_id=book.book_id WHERE borrow.student_id=?`;
    let values = [obj.stu_id];
    await query(sql, values).then((results) => {
        if (results.length > 0) {
            ctx.body = {
                code: 200,
                msg: "students s_borrowinfo successful",
                data: results
            };
        } else {
            ctx.body = {
                code: 201,
                msg: "students s_borrowinfo error"
            };
        }
    }, (err) => {
        ctx.body = {
            code: 201,
            msg: "students StudentsDelete error",
            reason: err
        };
    });

})

//学生头像上传
router.get("/s_upload", async (ctx) => {
    let sql = `select students.stu_img from students WHERE students.stu_id=?`;
    let values = ["2018080371"];
    await query(sql, values).then(async (results) => {
        var s_img = "";
        if (results[0].stu_img.indexOf("upload_") == -1) {
            s_img = results[0].stu_img;
        } else {
            s_img = "/uploads/" + results[0].stu_img;
        }
        await ctx.render("../views/borrower/s_upload", {
            s_img
        });
    });
})
router.post("/s_upload", async (ctx) => {
    let filename = ctx.request.files.file.path.slice(ctx.request.files.file.path.indexOf("upload_"));
    let obj = ctx.request.body; //接收表单传来的数据
    let sql = `update students set stu_img=? where stu_id=?`;
    let values = [filename, obj.stu_id];
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