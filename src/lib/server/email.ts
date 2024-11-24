import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import {
    AWS_REGION,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_FROM_EMAIL
} from "$env/static/private";

if (
    !AWS_REGION ||
    !AWS_ACCESS_KEY_ID ||
    !AWS_SECRET_ACCESS_KEY ||
    !AWS_FROM_EMAIL
) {
    throw new Error("AWS environment variables not set");
}

const sesClient = new SESClient({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
});

export const sendEmail = async (to: string, subject: string, body: string) => {
    const params = {
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Html: { Data: body }
            },
            Subject: { Data: subject }
        },
        Source: AWS_FROM_EMAIL
    };

    try {
        const command = new SendEmailCommand(params);
        const res = await sesClient.send(command);
        console.log("Email sent", res.MessageId);
        return res;
    } catch (e) {
        console.error("Email error", e);
        throw e;
    }
};
