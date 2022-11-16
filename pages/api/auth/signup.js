import { connectToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';
import jwt from 'jsonwebtoken';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;

  const { email, password, passwordConfirm } = data;

  if (!email || !email.includes('@') || !password || password.trim().length < 7 || password !== passwordConfirm) {
    res.status(422).json({ message: 'Invalid input' });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db('prod');

  const existingUser = await db.collection('users').findOne({ email: email })

  if (existingUser) {
    res.status(422).json({ message: 'User with the same email already exists!' });
    return;
  }

  const token = jwt.sign({ email }, process.env.NEXTAUTH_SECRET, {
    expiresIn: "1d"
  })

  const hashedPassword = await hashPassword(password);

  const result = await db.collection('users').insertOne({
    email: email,
    password: hashedPassword,
    token: token,
    verifiedAt: " "
  });

  let dejta = {
    email,
    message: token
  }
  const rispons = await fetch('http://localhost:3000/api/auth/contact', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dejta)
  }).then((res) => {
    console.log('Response received')
    if (res.status === 200) {
      console.log('Response succeeded!')
    }
  })
  client.close();
  res.status(200).json({ message: "Email Sent" });
  return;
};

export default handler;