"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import psychology from "../assets/Images/psychlogy.png";
import economics from "../assets/Images/economics.png";
import chemistry from "../assets/Images/organicchemistry.png";
import calculus from "../assets/Images/calculus.png";

const fallbackImages = [chemistry, psychology, economics, calculus];

interface Book {
  id: number;
  title: string;
  author: string;
  courseCode: string;
  price: number;
  condition: string;
  image?: string | null;
  description?: string;
}

const Cards = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-center">Available Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="w-full h-60 bg-gray-200 animate-pulse"></div>
              <div className="p-4 space-y-2">
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="flex justify-between">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-1/4"></div>
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded animate-pulse mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Available Books</h2>
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Available Books</h2>
        <p className="text-gray-500">No books available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Books</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <div
            key={book.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <div className="w-full h-60 relative">
              <Image
                src={
                  book.image || fallbackImages[index % fallbackImages.length]
                }
                alt={`${book.title} Cover`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">
                {book.title}
              </h2>
              <p className="text-gray-600 mb-1 line-clamp-1">
                by {book.author}
              </p>
              <p className="text-gray-500 text-sm mb-2 line-clamp-1">
                Course Code: {book.courseCode}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-blue-600">
                  ${book.price}
                </span>
                <span className="text-sm text-green-700 font-medium">
                  Condition: {book.condition}
                </span>
              </div>
              <Link href={`/details/${book.id}`}>
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
