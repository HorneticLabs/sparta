import { Router } from 'express';
import axios from 'axios';
const router = Router();

// In-memory store for rate-limiting by IP address
const ipSubmissions: { [ip: string]: number } = {};

router.get('/', (req, res) => {
  res.render('application', { title: 'Application Form' });
});

router.post('/', async (req, res) => {
  const { minecraftUsername, discordUsername, age, bestAt, netWorth, readCodeOfHonor } = req.body;
  
  // Only perform rate-limiting if Cloudflare's cf-connecting-ip header is present.
  if (req.headers['cf-connecting-ip']) {
    let clientIp: string;
    if (Array.isArray(req.headers['cf-connecting-ip'])) {
      clientIp = req.headers['cf-connecting-ip'][0];
    } else {
      clientIp = req.headers['cf-connecting-ip'] as string;
    }
    const now = Date.now();
    if (ipSubmissions[clientIp] && now - ipSubmissions[clientIp] < 86400000) {
      return res.render('application', { 
        title: 'Application Form', 
        error: 'You have already applied in the last 24 hours. Please try again later.',
        minecraftUsername, discordUsername, age, bestAt, netWorth
      });
    }
    ipSubmissions[clientIp] = now;
  }

  // Deny if age is under 16
  if (parseInt(age, 10) < 16) {
    return res.render('application', {
      title: 'Application Form',
      error: "Sorry, based on your application you've been automatically denied. If you feel like this is a mistake, please reapply in 24 hours.",
      minecraftUsername, discordUsername, age, bestAt, netWorth
    });
  }

  // Ensure the applicant confirmed reading the Code of Honor
  if (!readCodeOfHonor) {
    return res.render('application', {
      title: 'Application Form',
      error: "You must confirm that you have read the Code of Honor.",
      minecraftUsername, discordUsername, age, bestAt, netWorth
    });
  }

  // Send application details to Discord webhook
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL || 'If you want a static webhook, place it here';
  const payload = {
    content: `**New Application Submission**\n
**Minecraft Username:** ${minecraftUsername}\n
**Discord Username:** ${discordUsername}\n
**Age:** ${age}\n
**Best At:** ${bestAt}\n
**Estimated Net Worth:** ${netWorth}`
  };

  try {
    await axios.post(webhookUrl, payload);
  } catch (error) {
    console.error('Error sending webhook:', error);
  }

  // Render the success view
  res.render('success', { title: 'Application Submitted' });
});

export default router;
