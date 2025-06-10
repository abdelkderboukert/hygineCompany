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
      to: ["commercial1@hygindust.com", "commercial2@hygindust.com"], // list of receivers
      subject: `Message from ${name}`, // Subject line
      // react: `Email from ${name} who works at ${company} about: ${message}. Product reference: ${ref}.  Email: ${email}. Phone: ${phoneNumber}`,
      // html: `
      //   <h1>Message from ${name}</h1>
      //   <p><strong>Company:</strong> ${company}</p>
      //   <p><strong>Email:</strong> ${email}</p>
      //   <p><strong>Phone:</strong> ${
      //     phoneNumber !== undefined ? phoneNumber : "N/A"
      //   }</p>
      //   ${
      //     ref !== undefined && ref !== 0
      //       ? `<p><strong>Product Reference:</strong> ${ref}</p>`
      //       : ""
      //   }
      //   <p><strong>Message:</strong></p>
      //   <p>${message}</p>
      // `,
      html: `
  <div style="font-family: Arial, sans-serif; background: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 30px;">
      <h2 style="text-align: center; color: #333;">New Contact Message</h2>
      
      <div style="margin-bottom: 15px;">
        <strong style="color: #555;">Full Name:</strong>
        <div style="background: #f1f1f1; padding: 10px; border-radius: 6px;">${name}</div>
      </div>

      <div style="margin-bottom: 15px;">
        <strong style="color: #555;">Company:</strong>
        <div style="background: #f1f1f1; padding: 10px; border-radius: 6px;">${company}</div>
      </div>

      <div style="margin-bottom: 15px;">
        <strong style="color: #555;">Email Address:</strong>
        <div style="background: #f1f1f1; padding: 10px; border-radius: 6px;">${email}</div>
      </div>

      <div style="margin-bottom: 15px;">
        <strong style="color: #555;">Telephone:</strong>
        <div style="background: #f1f1f1; padding: 10px; border-radius: 6px;">${
          phoneNumber !== undefined ? phoneNumber : "N/A"
        }</div>
      </div>

      ${
        ref !== undefined && ref !== 0
          ? `
            <div style="margin-bottom: 15px;">
        <strong style="color: #555;">Product Reference:</strong>
        <div style="background: #f1f1f1; padding: 10px; border-radius: 6px;">${ref}</div>
      </div>
            `
          : ""
      }
      <div style="margin-bottom: 15px;">
        <strong style="color: #555;">Message:</strong>
        <div style="background: #f9f9f9; border-left: 4px solid #007bff; padding: 15px; border-radius: 5px;">${message}</div>
      </div>
    </div>
  </div>
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
