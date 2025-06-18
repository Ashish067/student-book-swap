import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";
import Image from "next/image";
import psychology from "@/app/assets/Images/psychlogy.png";
import economics from "@/app/assets/Images/economics.png";
import chemistry from "@/app/assets/Images/organicchemistry.png";
import calculus from "@/app/assets/Images/calculus.png";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  courseCode: string;
  price: number;
  condition: string;
  image?: string | null;
  createdAt: Date;
  sellerName: string;
  sellerEmail?: string | null;
}

const fallbackImages = [chemistry, psychology, economics, calculus];

export default async function BookDetails({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const bookId = parseInt(params.id);
  if (isNaN(bookId)) {
    return (
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-md shadow-md mt-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Invalid Book ID
        </h1>
        <p className="text-gray-600">The requested book ID is not valid.</p>
      </div>
    );
  }

  let book: Book | null = null;
  try {
    const bookData = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        user: {
          select: {
            fullname: true,
            email: true,
          },
        },
      },
    });

    if (!bookData) {
      return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-md shadow-md mt-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Book Not Found
          </h1>
          <p className="text-gray-600">
            The book you're looking for doesn't exist or may have been removed.
          </p>
        </div>
      );
    }

    book = {
      id: bookData.id,
      title: bookData.title,
      author: bookData.author,
      description: bookData.description,
      courseCode: bookData.courseCode,
      price: bookData.price || 0,
      condition: bookData.condition || "Not specified",
      image: bookData.image,
      createdAt: bookData.createdAt,
      sellerName: bookData.user?.fullname || "Unknown Seller",
      sellerEmail: bookData.user?.email || null,
    };
  } catch (error) {
    console.error("Error fetching book details:", error);
    return (
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-md shadow-md mt-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Error Loading Book
        </h1>
        <p className="text-gray-600">
          Failed to load book details. Please try again later.
        </p>
      </div>
    );
  }

  const listedDate = new Date(book.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const bookImage =
    book.image || fallbackImages[book.id % fallbackImages.length];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-md shadow-md mt-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 h-96 relative">
          <Image
            src={bookImage}
            alt={book.title}
            fill
            className="rounded-md object-contain"
            priority
          />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            {book.title}
          </h1>
          <p className="text-gray-600 mb-2">by {book.author}</p>
          <p className="text-lg font-semibold text-blue-600 mb-2">
            ${book.price}{" "}
            <span className="text-sm text-gray-600">({book.condition})</span>
          </p>
          <p className="mb-4">
            <span className="font-semibold">Course:</span> {book.courseCode}
          </p>

          <h2 className="font-semibold text-gray-700 mb-1">Description</h2>
          <p className="text-gray-600 mb-4">{book.description}</p>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-sm text-gray-500 mb-2">
              <span className="font-medium">Seller:</span> {book.sellerName}
            </p>
            {book.sellerEmail && (
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-medium">Contact:</span> {book.sellerEmail}
              </p>
            )}
            <p className="text-sm text-gray-500 mb-4">
              <span className="font-medium">Listed on:</span> {listedDate}
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
              Contact Seller
            </button>
            <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors">
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
