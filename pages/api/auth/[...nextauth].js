//we use catch all dynamic route so all the requests to auto-created nextauth routes are automatically handled 

import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from '../../../lib/auth';
import connectToDatabase from '../../../lib/db';
import { config } from '../../../config';

//we execute a function and it creates a handler function which we export, we also configure it here
export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db('prod').collection('users');
        const user = await usersCollection.findOne({ email: credentials.email, verifiedAt: 1 });

        if (!user) {
          client.close();
          throw new Error('No user found!'); //it redirects on error on default so we redirect it 
        }

        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          client.close();
          throw new Error('Wrong Password!');
        }

        client.close();

        return { email: user.email }; //what we return here will be encoded into jwt
      }
    })
  ],
  secret: config.secret
}); 