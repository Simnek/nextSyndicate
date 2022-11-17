import { getSession } from 'next-auth/react';

import { connectToDatabase } from '../../../lib/db';
import { hashPassword, verifyPassword } from '../../../lib/auth';

const handler = async (req, res) => {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const newPassword2 = req.body.newPassword2;

  if (oldPassword === newPassword) {
    res.status(422).json({ message: 'New password cannot be the same as the old password!' })
    return;
  }

  if (newPassword !== newPassword2) {
    res.status(422).json({ message: 'Confirmed password must be the same!' })
    return;
  }

  const client = await connectToDatabase();

  const usersCollection = client.db('prod').collection('users');
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found!' });
    return;
  }

  const currentPassword = user.password;

  const passIsEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passIsEqual) {
    res.status(403).json({ message: "Invalid password" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne({ email: userEmail }, { $set: { password: hashedPassword } });

  client.close();
  res.status(200).json({ message: 'Password updated' })
};

export default handler;