import './globals.css';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getUserBySessionToken } from '../database/users';
import LogoutButton from './(auth)/logout/LogoutButton';

/* import CookieBanner from './CookieBanner'; */

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: { default: 'Home page | cryEx', template: '%s | cryEx' },
  description: 'Generated by create next app',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout(props: Props) {
  // Task: Display the logged in user's username in the navigation bar and hide the login and register links depending on whether the user is logged in or not
  // 1. Checking if the sessionToken cookie exists
  // 2. Get the current logged in user from the database using the sessionToken value
  // 3. Make decision whether to show the login and register links or not

  // 1. Checking if the sessionToken cookie exists
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <CookieBanner /> */}
        <nav className="max-w-7xl mx-auto navbar bg-base-100">
          <div className="justify-between items-center">
            <Link href="/">
              <img src="/favicon.ico" alt="logo" />
            </Link>
            <Link className="btn btn-ghost normal-case text-xl" href="/">
              cryEx
            </Link>
            <div className="btn-group flex-grow">
              <Link className="btn btn-ghost normal-case" href="/admin">
                Admin
              </Link>
              <Link className="btn btn-ghost normal-case" href="/notes">
                Notes
              </Link>
              <Link className="btn btn-ghost normal-case" href="/NewsBusiness">
                Business-News
              </Link>
              <Link className="btn btn-ghost normal-case" href="/NewsTech">
                Tech-News
              </Link>
              <Link className="btn btn-ghost normal-case" href="/trade">
                Trade
              </Link>
              {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}

              <div className="flex-none justify-between w-full">
                {user ? (
                  <div className="flex items-center space-x-2">
                    <div>Welcome {user.username}!</div>
                    <Link href={{ pathname: `/profile/${user.username}` }}>
                      {/* <img src="/profile.png" alt="profile" /> */}
                      <Image
                        src="/images/profile.png"
                        alt="profile"
                        width={50}
                        height={50}
                      />
                    </Link>
                    <LogoutButton className="btn" />
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link className="btn" href="/login">
                      Login
                    </Link>
                    <Link className="btn" href="/register">
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto">{props.children}</div>
      </body>
    </html>
  );
}
