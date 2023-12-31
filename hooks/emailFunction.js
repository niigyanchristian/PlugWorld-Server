const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const sendMail =(orderItem,productItem)=>{


    const html= `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Notification - Plugworld</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                text-align: center;
            }
    
            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                margin: 20px auto;
            }
    
            h2 {
                color: #333;
            }
    
            p {
                color: #555;
            }
    
            ul {
                list-style: none;
                padding: 0;
            }
    
            li {
                margin-bottom: 10px;
                color: #666;
            }
    
            img {
                max-width: 100%;
                height: auto;
                margin-top: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <p>Hello Prince,</p>
            <p>A customer has placed an order for a product on Plugworld. Here are the details:</p>
    
            <h3 style="color: #acbcf7;">Order Details:</h3>
            <ul>
                <li><strong>Product Name:</strong> ${productItem.title}</li>
                <li><strong>Price:</strong> GH₵${productItem.price}</li>
                <li><strong>Order ID:</strong> ${productItem._id}</li>
            </ul>
            <h3 style="color: #acbcf7;">Customer Details:</h3>
            <ul>
                <li><strong>Name:</strong> ${orderItem.customerName}</li>
                <li><strong>Contact:</strong> ${orderItem.customerNumber}</li>
            </ul>
    
        
    
            <img src="${productItem.images[0]}" alt="${productItem.title}">
        </div>
    </body>
    </html>
    
    `
 const main =async()=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure:true,
        auth: {
            user: 'cniigyan@gmail.com', // replace with your email
            pass: 'ihoa nqmr vyle eqev', // replace with your application-specific password
          },
    });


    // Define the email content
const mailOptions = {
    from: '"Plugworld" <cniigyan@gmail.com>',
    to: 'niigyanchristian@gmail.com', // replace with the recipient's email
    subject: 'Order Notification - Plugworld',
    html: html,
    // attachments: [
    //     {
    //       filename: 'example.txt', // the name you want the file to have in the email
    //       path: 'path/to/your/file/example.txt', // replace with the path to your file
    //     },
    //     // You can add more attachments if needed
    //   ],
  };
  
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
 }

 main()
}

module.exports={
    sendMail
}