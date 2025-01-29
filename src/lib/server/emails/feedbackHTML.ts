// feedbackHTML.ts
// Sent to admins on the feedback emailing list when a user submits feedback.

export const feedbackHTML = (content: string) => `
<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>TigerStudy Feedback</title>
   <style>
       body, p, h1, div {
           font-family: Georgia, Times, 'Times New Roman', serif;
       }

       body {
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
           display: flex;
           align-items: center;
           gap: 1rem;
       }

       .logo {
           font-size: 2rem;
       }

       h1 {
           font-size: 1.5rem;
           font-weight: 600;
           color: #0F172A;
           margin-bottom: 1rem;
       }

       .content {
           background: #FFFFFF;
           border: 1px solid #E2E8F0;
           border-radius: 0.5rem;
           padding: 1rem;
           margin: 1rem 0;
           white-space: pre-wrap;
       }

       .footer {
           text-align: center;
           font-size: 0.875rem;
           color: #64748B;
           margin-top: 2rem;
       }
   </style>
</head>
<body>
   <div class="container">
       <div class="card">
           <div class="header">
               <span class="logo">🐯</span>
               <h1>New TigerStudy Feedback</h1>
           </div>

           <div class="content">
               ${content}
           </div>
       </div>

       <div class="footer">
           <p>This feedback was submitted through TigerStudy</p>
           <p>Please review and take appropriate action if needed</p>
       </div>
   </div>
</body>
</html>`;
