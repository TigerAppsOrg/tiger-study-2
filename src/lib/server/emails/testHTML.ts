// testHTML.ts
// Sent via the admin dashboard to test the email sending functionality

export const testHTML = () => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 10px;
        }
        
        .header {
            text-align: center;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }
        
        h1 {
            color: #2c3e50;
            margin: 0;
            font-size: 28px;
        }
        
        .content {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #3498db;
            color: #ffffff;
            text-decoration: none;
            border-radius: 25px;
            margin-top: 20px;
            transition: background-color 0.3s ease;
        }
        
        .button:hover {
            background-color: #2980b9;
        }
        
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #7f8c8d;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🐯 Welcome to TigerStudy!</h1>
        </div>
        
        <div class="content">
            <p>Hey there! 👋</p>
            <p>This is a test email from TigerStudy with some cool HTML and CSS styling.</p>
            <p>We're excited to have you here and can't wait to help you achieve your learning goals!</p>
            
            <center>
                <a href="#" class="button">Get Started</a>
            </center>
        </div>
        
        <div class="footer">
            <p>© 2025 TigerStudy. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
