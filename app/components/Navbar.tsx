"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="w-full bg-white shadow">
      <nav className="m-auto px-8 md:px-20 py-6 flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          STUDENTBOOK<span className="text-red-800">SWAP</span>
        </h1>

        <ul className="flex items-center gap-4 text-gray-600 font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <span className="text-2xl text-gray-300">|</span>
          </li>

          {user ? (
            <>
              <li className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded">
                <FaUserCircle className="text-2xl text-gray-700" />
                <span>{user.name}</span>
              </li>
              <li>
                <Link href="/my-books">
                  <button className="bg-green-700 text-white px-4 py-2 rounded">
                    My Books
                  </button>
                </Link>
              </li>
              <li>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">
                  <button className="bg-gray-400 px-4 py-2 rounded text-white">
                    Login
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <button className="bg-gray-800 px-4 py-2 rounded text-white">
                    Register
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
