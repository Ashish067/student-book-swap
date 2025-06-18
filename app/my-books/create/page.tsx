"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBookPage() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl = "";

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      imageUrl = data.imageUrl;
    }

    await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        description,
        image: imageUrl,
        price: parseFloat(price),
        condition,
      }),
    });

    router.push("/my-books");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4 font-bold">Add New Book</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-3 p-2 border w-full rounded"
        required
      />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="mb-3 p-2 border w-full rounded"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-3 p-2 border w-full rounded"
        required
      />

      <input
        type="number"
        step="0.01"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="mb-3 p-2 border w-full rounded"
      />

      <select
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        className="mb-3 p-2 border w-full rounded"
        required
      >
        <option value="">Select condition</option>
        <option value="new">New</option>
        <option value="like_new">Like New</option>
        <option value="used">Used</option>
        <option value="good">Good</option>
        <option value="fair">Fair</option>
        <option value="excellent">Excellent</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="mb-3"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-gray-50 px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
