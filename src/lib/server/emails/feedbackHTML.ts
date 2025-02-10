export const feedbackHTML = (content: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <title>TigerStudy Feedback Received</title>
    <style>
        :root {
            color-scheme: light dark;
        }

        body {
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.5;
        }

        @media (prefers-color-scheme: light) {
            body {
                background-color: #F8FAFC;
                color: #0F172A;
            }

            .card {
                background: linear-gradient(to bottom right, #FFFFFF, #EFF3F7);
                border: 1px solid #E2E8F0;
            }

            .footer {
                color: #64748B;
            }

            .feedback-content {
                background-color: #F1F5F9;
                border: 1px solid #E2E8F0;
            }
        }

        @media (prefers-color-scheme: dark) {
            body {
                background-color: #0F172A;
                color: #F8FAFC;
            }

            .card {
                background: linear-gradient(to bottom right, #1E293B, #0F172A);
                border: 1px solid #334155;
            }

            .footer {
                color: #94A3B8;
            }

            .feedback-content {
                background-color: #1E293B;
                border: 1px solid #334155;
            }

            h1, p {
                color: #F8FAFC;
            }
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 2rem;
        }

        .card {
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
            margin-bottom: 1rem;
        }

        p {
            margin-bottom: 1rem;
        }

        .feedback-content {
            padding: 1rem;
            border-radius: 0.5rem;
            margin: 1rem 0;
            white-space: pre-wrap;
        }

        .footer {
            text-align: center;
            font-size: 0.875rem;
            margin-top: 2rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="header">
                <h1>🐯 New TigerStudy Feedback Received</h1>
                <p>A user has submitted feedback through TigerStudy. Here's what they had to say:</p>
            </div>

            <div class="feedback-content">
                ${content}
            </div>

            <p>Please review this feedback and take appropriate action if needed.</p>
        </div>

        <div class="footer">
            <p>This is an automated message from TigerStudy. The feedback system is maintained by the <a href="https://tigerapps.org">TigerApps</a> Team.</p>
        </div>
    </div>
</body>
</html>`;
