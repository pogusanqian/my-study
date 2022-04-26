require('dotenv').config({ path: './27-email/.env' });
const nodemailer = require("nodemailer");
const XLSX = require('xlsx');

function getHtmlStr() {
  // 获取数据源
  const students = [
    { f_age: '年龄', f_name: '姓名', f_sex: '性别' },
  ];
  for (let index = 0; index < 1000; index++) {
    students.push({ f_name: '张三', f_age: 23, f_sex: '男' });
  }

  // 转换成TableHTML
  const sheet = XLSX.utils.json_to_sheet(students, { skipHeader: true });
  const tableStr = XLSX.utils.sheet_to_html(sheet);

  // 设置样式
  const styleStr = `<style>
                      p {
                        width: 30%;
                        margin: 0 auto;
                        font-size: 40px;
                      }

                      table {
                          width: 80%;
                          border: 1px solid black;
                          margin: 0 auto;
                          max-height: 200px;
                          border-collapse: collapse;
                      }

                      td {
                          border: 1px solid black;
                          vertical-align:top;
                          text-align: center; 
                      }

                      tr:nth-child(2n+1) {
                        background-color: #ceeaf9;
                      }
            
                     tr:first-child {
                        background-color: #94d0f1;
                        font-weight: bold;
                        font-size: 15px;
                      }
                  </style>`;

  // 返回HTML, 注意邮件中的HTML会忽略script标签, 这样是为了防止JS脚本攻击                
  return `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            ${styleStr}
          </head>
          <body>
            <p>高三一班学生信息表</p>
            ${tableStr}
          </body>
          </html>`;

}

(async () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.user,
      pass: process.env.pwd,
    },
  });

  await transporter.sendMail({
    from: process.env.user,
    to: 'pogusanqian@163.com',
    subject: "学生信息",
    html: getHtmlStr(),
  });
})();