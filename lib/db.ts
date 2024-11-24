import 'server-only';

import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db('logs');
const productsCollection = db.collection('detection_results');

export type SelectProduct = {
  model: string;
  endpoint: string;
  authorization: boolean;
  predict: number;
  severity: string;
  response: string; // Ensure response is a string
};

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: any[];
  newOffset: number | null;
  totalProducts: number;
}> {
  if (search) {
    const products = await productsCollection
      .find({ name: { $regex: search, $options: 'i' } })
      .limit(1000)
      .toArray();
    return {
      products: products.map(product => ({
        endpoint: product.endpoint,
        severity: product.severity,
        response: JSON.stringify(product.response) // Convert response to string
      })),
      newOffset: null,
      totalProducts: 0
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  const totalProducts = await productsCollection.countDocuments();
  const moreProducts = await productsCollection
    .find()
    .skip(offset)
    .limit(5)
    .toArray();
  const newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts.map(product => ({
      endpoint: product.endpoint,
        severity: product.severity,
      response: JSON.stringify(product.response) // Convert response to string
    })),
    newOffset,
    totalProducts
  };
}

export async function deleteProductById(id: string) {
  await productsCollection.deleteOne({ _id: new ObjectId(id) });
}
