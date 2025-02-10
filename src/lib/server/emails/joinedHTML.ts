// joinedHTML.ts
// Send to all group members when a user joins a group.

export const joinedHTML = (course: string, groupLink: string) => `
<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta name="color-scheme" content="light dark">
   <title>New TigerStudy Group Member</title>
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

           .link {
               color: #4F46E5;
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

           .link {
               color: #818CF8;
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

       .button {
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
           margin-top: 2rem;
       }

       .link {
           text-decoration: none;
       }
   </style>
</head>
<body>
   <div class="container">
       <div class="card">
           <div class="header">
               <h1>🐯 New Study Group Member!</h1>
               <p>A new student has joined your study group for ${course}!</p>
           </div>

           <p>Reach out to coordinate study times and introduce yourself to your new group member. Working together helps everyone succeed!</p>

           <a href="${groupLink}" class="button">View Your Group</a>
       </div>

       <div class="footer">
           <p>Need help? Contact us at <a href="mailto:tiger-study@princeton.edu" class="link">tiger-study@princeton.edu</a></p>
           <p>TigerStudy is supported by the <a href="https://mcgraw.princeton.edu/" class="link">McGraw Center for Teaching and Learning</a></p>
       </div>
   </div>
</body>
</html>`;
