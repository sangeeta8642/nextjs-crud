import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../utils/mongodb';

export async function PUT(req, { params }) {
  const { id } = params;
  const { db } = await connectToDatabase();
  const body = await req.json();

  // Exclude _id from the update data to prevent the error
  const { _id, ...updateData } = body;

  const result = await db.collection('items').updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );

  return NextResponse.json({ data: result });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const { db } = await connectToDatabase();
  const result = await db.collection('items').deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ data: result });
}
