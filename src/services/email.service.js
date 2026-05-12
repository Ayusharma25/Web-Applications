import nodemailer from 'nodemailer';

const defaultMailUser = 'iamfolivora@gmail.com';

const requiredEmailConfig = [
    'SMTP_PASS',
];

const isEmailConfigured = () => requiredEmailConfig.every(key => process.env[key]);

const createTransporter = () => nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER || defaultMailUser,
        pass: process.env.SMTP_PASS,
    },
});

const formatPrice = (price) => Number(price).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
});

const productDetails = (product) => [
    `Name: ${product.name}`,
    `Description: ${product.desc}`,
    `Price: ${formatPrice(product.price)}`,
].join('\n');

export const sendProductChangeEmail = async ({ to, action, product }) => {
    if (!to) {
        return;
    }

    if (!isEmailConfigured()) {
        console.warn(`Email not sent. Missing SMTP configuration for ${action} notification.`);
        return;
    }

    const transporter = createTransporter();
    const appName = process.env.MAIL_FROM_NAME || 'Inventory App';
    const fromAddress = process.env.MAIL_FROM || process.env.SMTP_USER || defaultMailUser;
    const subject = `${appName}: Product ${action}`;

    try {
        await transporter.sendMail({
            from: `"${appName}" <${fromAddress}>`,
            to,
            subject,
            text: [
                `Hello,`,
                ``,
                `A product was ${action.toLowerCase()} in your inventory.`,
                ``,
                productDetails(product),
                ``,
                `This notification was sent automatically by ${appName}.`,
            ].join('\n'),
        });
    } catch (err) {
        console.error(`Failed to send ${action} email:`, err.message);
    }
};
