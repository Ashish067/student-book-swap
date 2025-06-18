import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import Link from "next/link";

export default async function MyBooksPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className="text-center p-10">
        You must be logged in to view this page.
      </div>
    );
  }

  const books = await prisma.book.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">My Books</h1>
      <Link
        href="/my-books/create"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add New Book
      </Link>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded shadow">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">by {book.author}</p>
            <p className="mt-2">{book.description}</p>
            <div className="mt-4 flex gap-2">
              <Link
                href={`/my-books/edit/${book.id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <Link
                href={`/my-books/delete/${book.id}`}
                className="text-red-600 hover:underline"
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
