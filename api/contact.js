import { supabase } from '../lib/db.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const validateForm = (body) => {
  const { name, email, message, nickname, timestamp } = body;
  const timeElapsed = Date.now() - new Date(timestamp).getTime(); 

  if (!name || !email || !message) return "Missing required fields";
  if (nickname && nickname.trim() !== "") return "Bot detected";
  if (timeElapsed < 3000) return "Form submitted too quickly";

  return null;
}; 

export default async function handler(req, res) {  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const error = validateForm(req.body);
    if (error) {
      return res.status(403).json({ error });
    }

    const { name, email, message } = req.body;
    
    // Get request info
    const ip = req.headers['x-forwarded-for'] || 
               req.headers['x-real-ip'] || 
               'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    const referer = req.headers['referer'] || 'N/A';

    // Save to database
    const { error: dbError } = await supabase
      .from('contacts')
      .insert({
        contact_name: name,
        user_email: email,
        contact_message: message,
        contact_ip: ip,
        user_agent: userAgent,
        contact_referer: referer
      });

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    // Send admin notification
    await resend.emails.send({
      from: 'MetaMemeVault <mmv@relay.metamemevault.com>', 
      to: process.env.ADMIN_EMAIL,
      replyTo: 'mmv@metamemevault.com',
      subject: `MMV Contact Form - ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    // Send auto-reply
    await resend.emails.send({
      from: 'MetaMemeVault <mmv@relay.metamemevault.com>',
      to: email,
      replyTo: 'mmv@metamemevault.com',
      subject: 'We received your message at MetaMemeVault 🚀',
      text: `Hi ${name},
         
Thanks for reaching out to the MetaMemeVault team! 💬  
We've received your message and will get back to you as soon as possible.

📣 If your inquiry is urgent, feel free to contact us directly via our official support channel:
🔗 Telegram: https://t.me/mmv_support

In the meantime, you can explore our platform and community resources here:
🌐 https://metamemevault.com

— The MMV Team`
    });

    return res.json({ message: 'Message sent successfully' });

  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error.message 
    });
  }
}