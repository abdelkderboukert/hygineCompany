// app/api/sendEmail/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface EmailRequestBody {
  name: string;
  company: string;
  message: string;
  email: string;
  phoneNumber: number | undefined;
  ref: number | undefined;
}

export async function POST(req: Request) {
  try {
    const {
      name,
      company,
      message,
      email,
      ref,
      phoneNumber,
    }: EmailRequestBody = await req.json();

    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      logger: true, // Enable logging
      debug: true, // Enable debug output
    });

    // Set up email data
    const mailOptions = {
      from: process.env.EMAIL_USER, // sender address
      to: "abdelkaderboukart@gmail.com", // list of receivers
      subject: `Message from ${name}`, // Subject line
      // react: `Email from ${name} who works at ${company} about: ${message}. Product reference: ${ref}.  Email: ${email}. Phone: ${phoneNumber}`,
      html: `
        <h1>Message from ${name}</h1>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${
          phoneNumber !== undefined ? phoneNumber : "N/A"
        }</p>
        ${
          ref !== undefined && ref !== 0
            ? `<p><strong>Product Reference:</strong> ${ref}</p>`
            : ""
        }
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Error sending email",
        //@ts-expect-error error of type
        details: error.message,
      },
      { status: 500 }
    );
  }
}
