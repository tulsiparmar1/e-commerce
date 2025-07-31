import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import User from "../../../../models/User.ts";
import { Provider } from "react-redux";
import NextAuth from "next-auth";
import connectionToDatabase from "../../../../utils/mongodb.ts";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await connectionToDatabase();

//         const user = await User.findOne({ email: credentials.email });
//         if (!user) throw new Error("No user found");

//         const isValid = await compare(credentials.password, user.password);
//         if (!isValid) throw new Error("Invalid password");

//         return { id: user._id, email: user.email, name: user.name };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.id = user.id;
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectionToDatabase();
        const { email, password } = credentials;
        console.log("email", "password", email, password);
        const user = await User.findOne({ email });

        if (!user) {
          return null;
        }
        const isValid = await compare(password, user.password);
        if (isValid) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          }; //returns if user is found and password is matched
        } else {
          console.log("password doesn't match");
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login", //user enter their id and password here..
    // error: "/auth/error",
  },
  //custom session expires
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, //the first one is number of hours second one is number of minutes and
    //  then the third one is number of seconds
  },
  //when user authorized then jwt token is generated and stored in cookies.
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; //this user.id is returned from authorized function
      }
      return token;
    },
    //when client request session data using useSession than this runs..
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
});
