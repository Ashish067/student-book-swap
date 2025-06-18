import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const book = await prisma.book.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(book);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  const currentBook = await prisma.book.findUnique({
    where: { id: Number(params.id) },
  });

  if (!currentBook) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  const updated = await prisma.book.update({
    where: {
      id: Number(params.id),
      userId: Number(session.user.id),
    },
    data: {
      title: body.title,
      description: body.description,

      image: body.image !== undefined ? body.image : currentBook.image,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.book.delete({
    where: {
      id: Number(params.id),
      userId: Number(session.user.id),
    },
  });

  return NextResponse.json({ success: true });
}
