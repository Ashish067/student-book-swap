import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("Error retrieving books.", error);
    return NextResponse.json(
      { error: "Failed to retrieve books" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const { title, author, description, image, price, condition } = data;

    const courseCode = `COURSE-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        description,
        image,
        price,
        condition,
        courseCode,
        userId: Number(session.user.id),
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error("Error creating book.", error);
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}
