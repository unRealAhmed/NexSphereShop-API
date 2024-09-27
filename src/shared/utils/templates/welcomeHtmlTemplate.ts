export const welcomeHtmlTemplate = (fullname: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to NexSphereShop</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #4CAF50;
        }
        .content p {
            line-height: 1.6;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            color: #888;
            font-size: 12px;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
        .cta-button {
            display: inline-block;
            background-color: #4CAF50;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
        }
        .cta-button:hover {
            background-color: #45a049;
        }
        .image-container {
            text-align: center;
            margin-bottom: 20px;
        }
        .image-container img {
            max-width: 75%;
            height: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="image-container">
            <img src="https://drive.google.com/uc?export=view&id=1tW8lRKfDvVypYn23rPNcyMcSzM8w9sq0" alt="Welcome Image">
        </div>
        <div class="header">
            <h1>Welcome to NexSphereShop!</h1>
        </div>
        <div class="content">
            <h2>Hello ${fullname}! 🎉</h2>
            <p>
                Welcome to <strong>NexSphereShop</strong>! We're excited to have you as a valued member of our E-Commerce community. 
                Get ready to explore a wide range of products, enjoy exclusive offers, and immerse yourself in a delightful shopping experience. 
                Together, let's make your shopping journey with NexSphereShop a resounding success! 🌟
            </p>
            <a href="https://www.nexsphereshop.com" class="cta-button">Start Shopping</a>
            <p>Happy shopping!<br>The NexSphereShop Team 🌐</p>
        </div>
        <div class="footer">
            <p>
                If you have any questions, feel free to <a href="mailto:support@nexsphereshop.com">contact us</a>.<br>
                &copy; 2024 NexSphereShop. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
`
