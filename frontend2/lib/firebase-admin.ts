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
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from "./firebase"

// Types
export interface ProductType {
  id?: string
  name: string
  description: string
  image?: string
  theme: {
    gradient: string
    bgColor: string
    iconColor: string
    borderColor: string
    hoverColor: string
    overlayGradient: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface ProductSubtype {
  id?: string
  typeId: string
  name: string
  description: string
  image?: string
  productCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id?: string
  typeId: string
  subtypeId: string
  name: string
  brand: string
  description: string
  shortDescription: string
  image?: string
  additionalImages: string[]
  features: string[]
  sizes: Array<{
    size: string
    sku: string
    caseQty: number
    dimensions: string
    weight: string
    barcode: string
  }>
  certifications: Array<{
    name: string
    description: string
    issueDate: string
    expiryDate: string
  }>
  specifications: Record<string, string>
  usage: {
    application: string
    frequency: string
    precautions: string[]
    suitableFor: string[]
  }
  documents: {
    productDatasheet?: string
    technicalData?: string
    safetyDataSheet?: string
    usageInstructions?: string
    certificationDocuments?: string
    qualityReport?: string
    complianceDocuments?: string
  }
  createdAt: Date
  updatedAt: Date
}

// Product Types CRUD
export const createProductType = async (data: Omit<ProductType, "id" | "createdAt" | "updatedAt">) => {
  const docRef = await addDoc(collection(db, "productTypes"), {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return docRef.id
}

export const getProductTypes = async (): Promise<ProductType[]> => {
  const querySnapshot = await getDocs(query(collection(db, "Equipements"), orderBy("name")))
  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as ProductType,
  )
}

export const getProductType = async (id: string): Promise<ProductType | null> => {
  const docSnap = await getDoc(doc(db, "productTypes", id))
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as ProductType
  }
  return null
}

export const updateProductType = async (id: string, data: Partial<ProductType>) => {
  await updateDoc(doc(db, "productTypes", id), {
    ...data,
    updatedAt: new Date(),
  })
}

export const deleteProductType = async (id: string) => {
  await deleteDoc(doc(db, "productTypes", id))
}

// Product Subtypes CRUD
export const createProductSubtype = async (data: Omit<ProductSubtype, "id" | "createdAt" | "updatedAt">) => {
  const docRef = await addDoc(collection(db, "productSubtypes"), {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return docRef.id
}

export const getProductSubtypes = async (typeId?: string): Promise<ProductSubtype[]> => {
  let q = query(collection(db, "productSubtypes"), orderBy("name"))
  if (typeId) {
    q = query(collection(db, "productSubtypes"), where("typeId", "==", typeId), orderBy("name"))
  }
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as ProductSubtype,
  )
}

export const getProductSubtype = async (id: string): Promise<ProductSubtype | null> => {
  const docSnap = await getDoc(doc(db, "productSubtypes", id))
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as ProductSubtype
  }
  return null
}

export const updateProductSubtype = async (id: string, data: Partial<ProductSubtype>) => {
  await updateDoc(doc(db, "productSubtypes", id), {
    ...data,
    updatedAt: new Date(),
  })
}

export const deleteProductSubtype = async (id: string) => {
  await deleteDoc(doc(db, "productSubtypes", id))
}

// Products CRUD
export const createProduct = async (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
  const docRef = await addDoc(collection(db, "products"), {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return docRef.id
}

export const getProducts = async (typeId?: string, subtypeId?: string): Promise<Product[]> => {
  let q = query(collection(db, "products"), orderBy("name"))

  if (typeId && subtypeId) {
    q = query(
      collection(db, "products"),
      where("typeId", "==", typeId),
      where("subtypeId", "==", subtypeId),
      orderBy("name"),
    )
  } else if (typeId) {
    q = query(collection(db, "products"), where("typeId", "==", typeId), orderBy("name"))
  }

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Product,
  )
}

export const getProduct = async (id: string): Promise<Product | null> => {
  const docSnap = await getDoc(doc(db, "products", id))
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Product
  }
  return null
}

export const updateProduct = async (id: string, data: Partial<Product>) => {
  await updateDoc(doc(db, "products", id), {
    ...data,
    updatedAt: new Date(),
  })
}

export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, "products", id))
}

// File Upload
export const uploadFile = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  return await getDownloadURL(snapshot.ref)
}

export const deleteFile = async (url: string) => {
  const fileRef = ref(storage, url)
  await deleteObject(fileRef)
}
