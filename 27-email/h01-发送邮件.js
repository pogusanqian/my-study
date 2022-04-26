require('dotenv').config({ path: './27-email/.env' });
const nodemailer = require("nodemailer");

/**
 * 1. 邮件的发送使用的服务器仍然是QQ邮箱的服务器
 * 2. 发送邮件前, 首先需要将邮箱账户的SMTP服务开启
 *    当开启了SMTP服务后, 该账户就可以使用客户端向QQ邮箱服务器发送消息, 然后QQ邮箱服务器在将客户端传递的消息转发给第三方
 * 3. 使用SMTP服务发送邮件时, 邮件地址必须和授权账户相同
 */
(async () => {
  // 创建传输器transporter, 传输器是能够发送电子邮件的对象, 它包含有关连接的对象
  const transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.user,
      pass: process.env.pwd,
    },
  });

  // 发送邮件
  const info = await transporter.sendMail({
    from: process.env.user,
    to: 'pogusanqian@163.com',
    subject: "第一封邮件",
    // text和html都存在时, html属性起作用
    text: "你好, 我是来自QQ的邮箱",
    html: "<button>按钮</button>",
  });
  console.log("Message sent: %s", info);
})();