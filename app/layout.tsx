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
  // console.log(user);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-7xl mx-auto navbar bg-base-100">
          <div className="justify-between items-center">
            <Link href="/">
              <img src="/images/favicon.ico" alt="logo" />
            </Link>
            <Link className="btn btn-ghost normal-case text-xl" href="/">
              cryEx
            </Link>
            <div className="btn-group flex-grow">
              <Link className="btn btn-ghost normal-case" href="/NewsBusiness">
                Business-News
              </Link>
              <Link className="btn btn-ghost normal-case" href="/NewsTech">
                Tech-News
              </Link>
              <Link className="btn btn-ghost normal-case" href="/trade">
                Trade
              </Link>
              <Link className="btn btn-ghost normal-case" href="/test">
                Test
              </Link>

              <div className="flex-none justify-between w-full">
                {user ? (
                  <div className="flex items-center space-x-2">
                    <Link className="btn btn-ghost normal-case" href="/notes">
                      Notes
                    </Link>
                    {user.isAdmin ? (
                      <Link className="btn btn-ghost normal-case" href="/admin">
                        Admin
                      </Link>
                    ) : (
                      <></>
                    )}

                    <div>Welcome {user.username}!</div>
                    <Link href={{ pathname: `/profile/${user.username}` }}>
                      <Image
                        className="btn-circle avatar"
                        src="https://res.cloudinary.com/dxuusrt3k/image/upload/v1700431344/hamsaProfile.png"
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
        </div>
        <div className="max-w-7xl mx-auto">{props.children}</div>
      </body>
    </html>
  );
}
