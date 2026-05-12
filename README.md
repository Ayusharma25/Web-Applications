This is an inventory project where I am learning to use different apps and modules.
## Email notifications

Product add, update, and delete actions send an email to the logged-in user's email address when SMTP is configured.

The app is configured to send from `iamfolivora@gmail.com` through Gmail SMTP by default.

Create a local `.env` file:

```bash
SMTP_PASS=your-gmail-app-password
```

You can copy `.env.example` as a starting point. The real `.env` file is ignored by Git so your app password is not committed.

Optional overrides:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=iamfolivora@gmail.com
SMTP_SECURE=false
MAIL_FROM=iamfolivora@gmail.com
MAIL_FROM_NAME=Inventory App
```

Use a Gmail App Password, not the normal Gmail password. If `SMTP_PASS` is not configured, the product action still succeeds and the app logs that the email was skipped.
