import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body>
        <div className="navbar bg-base-100">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            cryptoBank
          </Link>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              {/* <li>
                <Link href="/sign-in">Sign in</Link>
              </li>
              <li>
                <Link href="/sign-up">Sign up</Link>
              </li> */}
              <li>
                <Link href="/trade">Trade</Link>
              </li>
              <li>
                <Link href="/login">login</Link>
              </li>
              <li>
                <Link href="/register">register</Link>
              </li>
            </ul>
          </div>
        </div>

        <main className="flex min-h-screen justify-center	">{children}</main>

        <footer className="footer p-10 bg-neutral text-neutral-content">
          <nav>
            <header className="footer-title">Services</header>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <header className="footer-title">Company</header>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <header className="footer-title">Legal</header>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
