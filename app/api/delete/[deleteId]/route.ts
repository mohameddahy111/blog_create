import { deleteImage } from "@/app/actions";
import prisma from "@/app/utils/db";
import { requireUser } from "@/lib/requierdUser";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: { params: Params }) {
  const deleteId = context.params.deleteId;
  const user = await requireUser();
  
  const item = await prisma.post.delete({
    where: {
      id: deleteId,
      userId: user.id
    }
  });
  await deleteImage(item.KeyId);
  return NextResponse.json(
    { message: `${item.title} is delete` },
    { status: 200 }
  );
}
