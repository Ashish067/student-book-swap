"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Book {
  id: string;
  title: string;
  description: string;
  image?: string;
  price?: number | string;
  condition?: string;
}

export default function EditBook({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [condition, setCondition] = useState("");

  useEffect(() => {
    async function fetchBook(id: string) {
      try {
        const res = await axios.get(`/api/books/${id}`);
        setBook(res.data);
        setCurrentImage(res.data.image || "");
        setLoading(false);
      } catch (err) {
        console.error("Failed to load book.", err);
      }
    }
    fetchBook(params.id);
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let image = currentImage;

    // Only upload new image if one was selected
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const uploadRes = await axios.post("/api/upload", formData);
        image = uploadRes.data.imageUrl;
      } catch (error) {
        console.error("Image upload failed.", error);
        return;
      }
    }

    try {
      await axios.put(`/api/books/${params.id}`, {
        title: book?.title,
        description: book?.description,
        image,
        price: Number(book?.price),
        condition: book?.condition,
      });

      router.push("/my-books");
    } catch (err) {
      console.error("Failed to update book.", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>

      <input
        type="text"
        value={book.title}
        onChange={(e) => setBook({ ...book, title: e.target.value })}
        placeholder="Title"
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        value={book.description}
        onChange={(e) => setBook({ ...book, description: e.target.value })}
        placeholder="Description"
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        step="0.01"
        value={book.price}
        onChange={(e) => setBook({ ...book, price: e.target.value })}
        placeholder="Price"
        className="w-full p-2 border rounded"
      />

      <select
        value={book.condition}
        onChange={(e) => setBook({ ...book, condition: e.target.value })}
        className="mb-3 p-2 border w-full rounded"
      >
        <option value="">Select condition</option>
        <option value="new">New</option>
        <option value="like_new">Like New</option>
        <option value="used">Used</option>
        <option value="good">Good</option>
        <option value="fair">Fair</option>
        <option value="excellent">Excellent</option>
      </select>

      {currentImage && (
        <div className="mt-4">
          <p className="text-sm font-semibold">Current Image</p>
          <img
            src={currentImage}
            alt="Current book cover"
            className="max-w-xs max-h-40 object-contain rounded"
          />
        </div>
      )}

      <div className="mt-4">
        <label className="block text-sm font-semibold">
          {currentImage ? "Change Image" : "Add Image"}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-gray-50 px-4 py-2 rounded font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Save Changes
      </button>
    </form>
  );
}
