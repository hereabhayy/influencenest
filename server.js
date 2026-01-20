import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.post('/api/contact', async (req, res) => {
  const { name, email, company, budget, message } = req.body || {}

  if (!name || !email || !company || !budget || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `"InfluenceNest Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `New lead from ${name} (${company})`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company}
Budget: ${budget}

Goal:
${message}
      `.trim(),
    }

    await transporter.sendMail(mailOptions)
    return res.json({ ok: true })
  } catch (err) {
    console.error('Error sending email', err)
    return res.status(500).json({ ok: false, error: 'Failed to send email' })
  }
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`InfluenceNest email server listening on http://localhost:${PORT}`)
})

