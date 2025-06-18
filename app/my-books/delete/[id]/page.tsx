"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

export default function DeleteBook({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/books/${params.id}`);
      router.push("/my-books");
    } catch (err) {
      console.error("Error deleting book", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4 text-center">
      <h2 className="text-2xl font-bold text-red-700">Are you sure?</h2>
      <p>This will permanently delete the book.</p>
      <div className="space-x-4 mt-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
        <button
          onClick={() => router.push("/my-books")}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
