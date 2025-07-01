import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  collectionGroup, // Import collectionGroup
  CollectionReference,
  DocumentReference,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./firebase";

// Types
export interface ProductType {
  id: string;
  name: string;
  description: string;
  image?: string;
  theme: {
    gradient: string;
    bgColor: string;
    iconColor: string;
    borderColor: string;
    hoverColor: string;
    overlayGradient: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSubtype {
  id?: string;
  // typeId: string; // This will no longer be a direct field as it's implied by the path
  name: string;
  description: string;
  image?: string;
  productCount: number;
  theme: {
    gradient: string;
    bgColor: string;
    iconColor: string;
    borderColor: string;
    hoverColor: string;
    overlayGradient: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id?: string;
  // typeId: string;    // Implied by path
  // subtypeId: string; // Implied by path
  name: string;
  brand: string;
  description: string;
  shortDescription: string;
  image?: string;
  additionalImages: string[];
  features: string[]; // Changed from Record<string, string> to string[]
  sizes: Array<{
    size: string;
    sku: string;
    caseQty: number;
    dimensions: string;
    weight: string;
    barcode: string;
  }>;
  certifications: Array<{
    name: string;
    description: string;
    issueDate: string;
    expiryDate: string;
  }>;
  specifications: Record<string, string>;
  usage: {
    application: string;
    frequency: string;
    precautions: string[];
    suitableFor: string[];
  };
  documents: {
    productDatasheet?: string;
    technicalData?: string;
    safetyDataSheet?: string;
    usageInstructions?: string;
    certificationDocuments?: string;
    qualityReport?: string;
    complianceDocuments?: string;
  };
  theme: {
    gradient: string;
    bgColor: string;
    iconColor: string;
    borderColor: string;
    hoverColor: string;
    overlayGradient: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to get subcollection reference (1 level deep)
const getSubcollectionRef = (
  parentCollection: string,
  parentId: string,
  subCollectionName: string
): CollectionReference => {
  return collection(db, parentCollection, parentId, subCollectionName);
};

// Helper for deeply nested subcollections (2 levels deep)
const getDeepSubcollectionRef = (
  grandparentCollection: string,
  grandparentId: string,
  parentSubcollectionName: string, // This is the name of the subcollection within the grandparent
  parentId: string,
  subCollectionName: string
): CollectionReference => {
  return collection(
    db,
    grandparentCollection,
    grandparentId,
    parentSubcollectionName,
    parentId,
    subCollectionName
  );
};

// Product Types CRUD
export const createProductType = async (
  data: Omit<ProductType, "id" | "createdAt" | "updatedAt">
) => {
  const docRef = await addDoc(collection(db, "productTypes"), {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
};

export const getProductTypes = async (): Promise<ProductType[]> => {
  const querySnapshot = await getDocs(
    query(collection(db, "productTypes"), orderBy("name"))
  );
  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as ProductType)
  );
};

export const getProductType = async (
  id: string
): Promise<ProductType | null> => {
  const docSnap = await getDoc(doc(db, "productTypes", id));
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as ProductType;
  }
  return null;
};

export const updateProductType = async (
  id: string,
  data: Partial<ProductType>
) => {
  await updateDoc(doc(db, "productTypes", id), {
    ...data,
    updatedAt: new Date(),
  });
};

export const deleteProductType = async (id: string) => {
  await deleteDoc(doc(db, "productTypes", id));
};

// Product Subtypes CRUD (Nested under Product Types)
export const createProductSubtype = async (
  typeId: string, // Now requires the parent typeId
  data: Omit<ProductSubtype, "id" | "createdAt" | "updatedAt">
) => {
  const docRef = await addDoc(
    getSubcollectionRef("productTypes", typeId, "productSubtypes"),
    {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  );
  return docRef.id;
};

export const getProductSubtypes = async (
  typeId: string // Now *always* requires typeId to query its subcollection
): Promise<ProductSubtype[]> => {
  const q = query(
    getSubcollectionRef("productTypes", typeId, "productSubtypes"),
    orderBy("name")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as ProductSubtype)
  );
};

export const getProductSubtype = async (
  typeId: string, // Requires parent typeId
  subtypeId: string
): Promise<ProductSubtype | null> => {
  const docSnap = await getDoc(
    doc(db, "productTypes", typeId, "productSubtypes", subtypeId)
  );
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as ProductSubtype;
  }
  return null;
};

export const updateProductSubtype = async (
  typeId: string, // Requires parent typeId
  subtypeId: string,
  data: Partial<ProductSubtype>
) => {
  await updateDoc(
    doc(db, "productTypes", typeId, "productSubtypes", subtypeId),
    {
      ...data,
      updatedAt: new Date(),
    }
  );
};

export const deleteProductSubtype = async (
  typeId: string, // Requires parent typeId
  subtypeId: string
) => {
  await deleteDoc(
    doc(db, "productTypes", typeId, "productSubtypes", subtypeId)
  );
};

// Products CRUD (Nested under Product Subtypes)
export const createProduct = async (
  typeId: string, // Requires parent typeId
  subtypeId: string, // Requires parent subtypeId
  data: Omit<Product, "id" | "createdAt" | "updatedAt">
) => {
  const docRef = await addDoc(
    getDeepSubcollectionRef(
      "productTypes",
      typeId,
      "productSubtypes", // The name of the subcollection within the grandparent document
      subtypeId,
      "products"
    ),
    {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  );
  await updateDoc(docRef, { id: docRef.id });
  return docRef.id;
};

export const getProducts = async (
  typeId: string, // Now required
  subtypeId: string // Now required
): Promise<Product[]> => {
  const q = query(
    getDeepSubcollectionRef(
      "productTypes",
      typeId,
      "productSubtypes",
      subtypeId,
      "products"
    ),
    orderBy("name")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Product)
  );
};

export const getProduct = async (
  typeId: string, // Requires parent typeId
  subtypeId: string, // Requires parent subtypeId
  productId: string
): Promise<Product | null> => {
  const docSnap = await getDoc(
    doc(
      db,
      "productTypes",
      typeId,
      "productSubtypes",
      subtypeId,
      "products",
      productId
    )
  );
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Product;
  }
  return null;
};

// New function to get a product by its ID using a collection group query
export const getProductById = async (
  productId: string
): Promise<Product | null> => {
  // Create a query against the collection group named "products"
  const productsRef = collectionGroup(db, "products");

  // Create a query to find the document with the matching ID
  // Note: Firestore does not directly support `where(documentId(), '==', productId)` for collection group queries.
  // Instead, you would typically query on a field within the document that holds the ID,
  // or if the ID is also a field within the document (which is a common practice when you need to query by ID).
  // Assuming 'id' is also a field within your Product documents:
  const q = query(productsRef, where("id", "==", productId));

  // If 'id' is NOT a field within your document and you only want to query by the document's actual ID,
  // then you'd have to get all documents and then filter by doc.id.
  // However, this is highly inefficient and not recommended for large datasets.
  // The most efficient way with collection groups to find by document ID is if the ID is duplicated as a field.
  // For this example, I'm assuming 'id' is also a field in your Product interface.

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // If there are multiple documents with the same 'id' field (which shouldn't happen for unique IDs),
    // this will return the first one found.
    const docSnap = querySnapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() } as Product;
  }

  return null;
};

export const updateProduct = async (
  typeId: string, // Requires parent typeId
  subtypeId: string, // Requires parent subtypeId
  productId: string,
  data: Partial<Product>
) => {
  await updateDoc(
    doc(
      db,
      "productTypes",
      typeId,
      "productSubtypes",
      subtypeId,
      "products",
      productId
    ),
    {
      ...data,
      updatedAt: new Date(),
    }
  );
};

export const deleteProduct = async (
  typeId: string, // Requires parent typeId
  subtypeId: string, // Requires parent subtypeId
  productId: string
) => {
  await deleteDoc(
    doc(
      db,
      "productTypes",
      typeId,
      "productSubtypes",
      subtypeId,
      "products",
      productId
    )
  );
};

// File Upload
export const uploadFile = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};

export const deleteFile = async (url: string) => {
  const fileRef = ref(storage, url);
  await deleteObject(fileRef);
};

// Image Upload
// This function uploads an image file to Firebase Storage and returns the download URL
// It creates a unique filename using the current timestamp and sanitizes the original filename

export const uploadImageToFirebase = async (
  file: File,
  path: string
): Promise<string> => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(
      /[^a-zA-Z0-9.-]/g,
      "_"
    )}`;
    const fullPath = `${path}/${fileName}`;

    // Create storage reference
    const storageRef = ref(storage, fullPath);

    // Upload file
    const snapshot = await uploadBytes(storageRef, file);

    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

export const uploadMultipleImages = async (
  files: File[],
  path: string
): Promise<string[]> => {
  try {
    const uploadPromises = files.map((file) =>
      uploadImageToFirebase(file, path)
    );
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error("Error uploading multiple images:", error);
    throw new Error("Failed to upload images");
  }
};
