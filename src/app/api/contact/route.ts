import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message, category } = body || {};

    if (!name || !phone || !email || !message) {
      return new Response(JSON.stringify({ error: "Zorunlu alanlar eksik" }), { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const fromEnv = process.env.MAIL_FROM || undefined;
    const to = process.env.MAIL_TO || "contact@ardesa.info";

    if (!host || !user || !pass) {
      return new Response(JSON.stringify({ error: "SMTP ayarları eksik: SMTP_HOST, SMTP_USER, SMTP_PASS" }), { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = `Yeni İletişim Formu: ${name}`;
    const text = `Kategori: ${category || "-"}\nAd Soyad: ${name}\nTelefon: ${phone}\nE-posta: ${email}\n\nMesaj:\n${message}`;
    const html = `<div style="font-family:Inter,Arial,sans-serif;line-height:1.6">
      <h2>Yeni İletişim Formu</h2>
      <p><strong>Kategori:</strong> ${category || "-"}</p>
      <p><strong>Ad Soyad:</strong> ${name}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>E-posta:</strong> ${email}</p>
      <p><strong>Mesaj:</strong><br/>${(message || "").replace(/\n/g, '<br/>')}</p>
    </div>`;

    // Gmail/Workspace notu: 'from' adresi genelde SMTP_USER ile aynı olmalı.
    // Eğer farklı bir alias kullanacaksanız, önce Gmail 'Send mail as' ayarlarında doğrulanmış olmalı.
    const from = fromEnv ?? user;

    await transporter.sendMail({ from, to, subject, text, html, replyTo: email });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "Sunucu hatası" }), { status: 500 });
  }
}
