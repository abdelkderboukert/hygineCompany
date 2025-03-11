"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

interface ProductType {
  id: string;
  typeName: string;
}

interface SubType {
  id: string;
  typeName: string;
}

interface Product {
  id: string;
  name: string;
  subtitle: string;
  ref: number;
  description: string;
  images: string[];
}

const Page: React.FC = () => {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [subTypes, setSubTypes] = useState<SubType[]>([]);
  const [selectedType, setSelectedType] = useState<ProductType | null>(null);
  const [selectedSubType, setSelectedSubType] = useState<SubType | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedSubtitle, setUpdatedSubtitle] = useState("");
  const [updatedRef, setUpdatedRef] = useState<number>(0);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedImageFiles, setUpdatedImageFiles] = useState<File[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const storage = getStorage();

  // Fetch product types
  const fetchProductTypes = async () => {
    try {
      const typesRef = collection(db, "products");
      const querySnapshot = await getDocs(typesRef);
      const typesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductType[];
      setProductTypes(typesData);
    } catch (error) {
      console.error("Error fetching product types:", error);
      setError("Error fetching product types.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch subtypes for selected type
  const fetchSubTypes = async (typeId: string) => {
    try {
      const subTypesRef = collection(
        db,
        "products",
        typeId,
        "products-subType"
      );
      const querySnapshot = await getDocs(subTypesRef);
      const subTypesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SubType[];
      setSubTypes(subTypesData);
    } catch (error) {
      console.error("Error fetching subtypes:", error);
      setError("Error fetching subtypes.");
    }
  };

  // Fetch products for selected subtype
  const fetchProducts = async (typeId: string, subtypeId: string) => {
    try {
      const productsRef = collection(
        db,
        "products",
        typeId,
        "products-subType",
        subtypeId,
        "products"
      );
      const querySnapshot = await getDocs(productsRef);
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name || "",
        subtitle: doc.data().subtitle || "",
        ref: doc.data().ref || 0,
        description: doc.data().description || "",
        images: doc.data().images || [],
      })) as Product[];
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products.");
    }
  };

  useEffect(() => {
    fetchProductTypes();
  }, []);

  useEffect(() => {
    if (selectedType) {
      fetchSubTypes(selectedType.id);
    } else {
      setSubTypes([]);
      setProducts([]);
    }
  }, [selectedType]);

  useEffect(() => {
    if (selectedType && selectedSubType) {
      fetchProducts(selectedType.id, selectedSubType.id);
    } else {
      setProducts([]);
    }
  }, [selectedType, selectedSubType]);

  // Handle product editing
  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setUpdatedName(product.name);
    setUpdatedSubtitle(product.subtitle);
    setUpdatedRef(product.ref);
    setUpdatedDescription(product.description);
    setUpdatedImageFiles([]);
    setImagesToDelete([]);
    setUploadProgress(0);
  };

  // Image upload handler
  const uploadImage = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => reject(error),
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  // Handle image deletion
  const handleDeleteImage = (imageUrl: string) => {
    setImagesToDelete((prev) => [...prev, imageUrl]);
  };

  // Handle image restoration
  const handleRestoreImage = (imageUrl: string) => {
    setImagesToDelete((prev) => prev.filter((url) => url !== imageUrl));
  };

  // Update product
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !selectedType || !selectedSubType) return;

    try {
      // Upload new images
      const newImageUrls = await Promise.all(
        updatedImageFiles.map(async (file) => {
          return await uploadImage(file);
        })
      );

      // Delete marked images from storage
      await Promise.all(
        imagesToDelete.map(async (imageUrl) => {
          try {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
          } catch (error) {
            console.error("Error deleting image:", error);
          }
        })
      );

      // Update Firestore document
      const productRef = doc(
        db,
        "products",
        selectedType.id,
        "products-subType",
        selectedSubType.id,
        "products",
        editingProduct.id
      );

      const updatedImages = [
        ...editingProduct.images.filter((img) => !imagesToDelete.includes(img)),
        ...newImageUrls,
      ];

      await updateDoc(productRef, {
        name: updatedName,
        subtitle: updatedSubtitle,
        ref: updatedRef,
        description: updatedDescription,
        images: updatedImages,
      });

      // Update local state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                name: updatedName,
                subtitle: updatedSubtitle,
                ref: updatedRef,
                description: updatedDescription,
                images: updatedImages,
              }
            : product
        )
      );

      // Reset state
      setEditingProduct(null);
      setUpdatedName("");
      setUpdatedSubtitle("");
      setUpdatedRef(0);
      setUpdatedDescription("");
      setUpdatedImageFiles([]);
      setImagesToDelete([]);
      setUploadProgress(0);
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Error updating product.");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!selectedType || !selectedSubType) return;

    try {
      const productRef = doc(
        db,
        "products",
        selectedType.id,
        "products-subType",
        selectedSubType.id,
        "products",
        productId
      );

      await deleteDoc(productRef);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Error deleting product.");
    }
  };

  if (loading) return <div className="p-4">Loading product types...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-6 mt-20">Product Manager</h1>

      {/* Type Selection */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Product Type</label>
        <select
          value={selectedType?.id || ""}
          onChange={(e) => {
            const type = productTypes.find((t) => t.id === e.target.value);
            setSelectedType(type || null);
            setSelectedSubType(null);
            setProducts([]);
          }}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Type</option>
          {productTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.typeName}
            </option>
          ))}
        </select>
      </div>

      {/* Subtype Selection */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Product Subtype</label>
        <select
          value={selectedSubType?.id || ""}
          onChange={(e) => {
            const subtype = subTypes.find((st) => st.id === e.target.value);
            setSelectedSubType(subtype || null);
          }}
          className="w-full p-2 border rounded"
          disabled={!selectedType}
        >
          <option value="">Select Subtype</option>
          {subTypes.map((subtype) => (
            <option key={subtype.id} value={subtype.id}>
              {subtype.typeName}
            </option>
          ))}
        </select>
      </div>

      {/* Products List */}
      {products.length > 0 ? (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="p-4 border rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.subtitle}</p>
                  <p className="text-sm text-gray-500">Ref: #{product.ref}</p>
                  <p className="mt-2 text-gray-600">{product.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {product.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found for selected subtype.</p>
      )}

      {/* Edit Form */}
      {editingProduct && (
        <div className="fixed overflow-scroll inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleUpdateProduct}
            className="bg-white p-6 rounded-lg w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-1">Product Name</label>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={updatedSubtitle}
                  onChange={(e) => setUpdatedSubtitle(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Reference Number</label>
                <input
                  type="number"
                  value={updatedRef}
                  onChange={(e) => setUpdatedRef(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className="w-full p-2 border rounded h-24"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Current Images</label>
                <div className="grid grid-cols-3 gap-2">
                  {editingProduct.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className={`w-full h-24 object-cover rounded ${
                          imagesToDelete.includes(image) ? "opacity-50" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          imagesToDelete.includes(image)
                            ? handleRestoreImage(image)
                            : handleDeleteImage(image)
                        }
                        className={`absolute top-1 right-1 p-1 rounded-full ${
                          imagesToDelete.includes(image)
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {imagesToDelete.includes(image) ? "↺" : "×"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-1">Add New Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setUpdatedImageFiles(
                      e.target.files ? Array.from(e.target.files) : []
                    )
                  }
                  className="w-full p-2 border rounded"
                />
                {uploadProgress > 0 && (
                  <div className="mt-2 h-2 bg-gray-200 rounded">
                    <div
                      className="h-full bg-blue-500 rounded"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
                {updatedImageFiles.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    {updatedImageFiles.map((file, index) => (
                      <div key={index}>{file.name}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                {uploadProgress > 0 ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Page;
