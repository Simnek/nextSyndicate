import connectToDatabase from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';
import jwt from 'jsonwebtoken';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;

  const { email, password, passwordConfirm } = data;

  if (!email || !email.includes('@') || !password || password.trim().length < 7 || password !== passwordConfirm) {
    return res.status(422).send({ message: 'Invalid input!' });
  }

  const client = await connectToDatabase();

  const db = client.db('prod');

  const existingUser = await db.collection('users').findOne({ email: email })

  if (existingUser) {
    return res.status(422).send({ message: 'User with the same email already exists!' });
  }

  const token = jwt.sign({ email }, process.env.NEXT_PUBLIC_NEXTAUTH_SECRET, {
    expiresIn: "1d"
  })

  const hashedPassword = await hashPassword(password);

  await db.collection('users').insertOne({
    email: email,
    password: hashedPassword,
    token: token,
    verifiedAt: " "
  });

  let dejta = {
    email,
    message: token
  }

  const response = await fetch('http://10.21.57.43:3000/api/auth/contact', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dejta)
  })

  const jsonResponse = await response.json();

  client.close();
  return res.status(201).send({ message: jsonResponse.message + " to " + dejta.email });
};

export default handler;