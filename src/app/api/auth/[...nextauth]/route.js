import { User } from "@/app/models/User";
import bcrypt from "bcrypt";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { connectToDB } from "@/app/utils/connectto";
import clientPromise from "@/app/utils/Adpater";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        connectToDB();
        const user = await User.findOne({ email });
        console.log(user)
        const passwordOk = user && bcrypt.compareSync(password, user.password);
        console.log(passwordOk);
     
        if (passwordOk) {
          return user;
        }

        return null;
      },
    }),
  ],
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await User.findOne({email:userEmail});
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }