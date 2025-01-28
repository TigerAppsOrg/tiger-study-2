export const welcomeHTML = (name: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to TigerStudy</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            background-color: #F8FAFC;
            margin: 0;
            padding: 0;
            color: #0F172A;
            line-height: 1.5;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 2rem;
        }

        .card {
            background: linear-gradient(to bottom right, #FFFFFF, #EFF3F7);
            border: 1px solid #E2E8F0;
            border-radius: 1rem;
            padding: 2rem;
            margin: 2rem 0;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .header {
            margin-bottom: 1.5rem;
        }

        h1 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #0F172A;
            margin-bottom: 1rem;
        }

        p {
            margin-bottom: 1rem;
            color: #0F172A;
        }

        .steps {
            margin: 1.5rem 0;
        }

        .step {
            margin-bottom: 1rem;
        }

        .step-title {
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #0F172A;
        }

        .button {
            display: inline-block;
            background-color: #4F46E5;
            color: #FFFFFF;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            text-decoration: none;
            margin: 1rem 0;
        }

        a.button {
            display: inline-block !important;
            background-color: #4F46E5 !important;
            color: #FFFFFF !important;
            padding: 0.75rem 1.5rem !important;
            border-radius: 0.5rem !important;
            text-decoration: none !important;
            margin: 1rem 0 !important;
        }

        .footer {
            text-align: center;
            font-size: 0.875rem;
            color: #64748B;
            margin-top: 2rem;
        }

        .link {
            color: #4F46E5;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="header">
                <h1>🐯 Welcome to TigerStudy, ${name}!</h1>
                <p>We're excited to help you connect with study partners and enhance your learning experience.</p>
            </div>

            <div class="steps">
                <div class="step">
                    <div class="step-title">Step 1</div>
                    <p>Search for course study groups or create your own. Note that some courses may be disabled due to instructor requests.</p>
                </div>
                <div class="step">
                    <div class="step-title">Step 2</div>
                    <p>View existing study groups and their members, then join one that fits your schedule or create a new group.</p>
                </div>
                <div class="step">
                    <div class="step-title">Step 3</div>
                    <p>Coordinate with your group members to find suitable study times and follow course collaboration policies.</p>
                </div>
            </div>

            <a href="https://tigerstudy.princeton.edu/dashboard" class="button">Get Started</a>
        </div>

        <div class="footer">
            <p>Need help? Contact us at <a href="mailto:tiger-study@princeton.edu" class="link">tiger-study@princeton.edu</a></p>
            <p>TigerStudy is supported by the <a href="https://mcgraw.princeton.edu/" class="link">McGraw Center for Teaching and Learning</a> and maintained by the <a href="https://tigerapps.org" class="link">TigerApps</a> Team.</p>
        </div>
    </div>
</body>
</html>`;
