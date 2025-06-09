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

interface EquipementType {
  id: string;
  typeName: string;
}

interface SubType {
  id: string;
  typeName: string;
}

interface Equipement {
  id: string;
  name: string;
  subtitle: string;
  ref: number;
  description: string;
  images: string[];
}

const Page: React.FC = () => {
  const [EquipementTypes, setEquipementTypes] = useState<EquipementType[]>([]);
  const [subTypes, setSubTypes] = useState<SubType[]>([]);
  const [selectedType, setSelectedType] = useState<EquipementType | null>(null);
  const [selectedSubType, setSelectedSubType] = useState<SubType | null>(null);
  const [Equipements, setEquipements] = useState<Equipement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingEquipement, setEditingEquipement] = useState<Equipement | null>(
    null
  );
  const [updatedName, setUpdatedName] = useState("");
  const [updatedSubtitle, setUpdatedSubtitle] = useState("");
  const [updatedRef, setUpdatedRef] = useState<number>(0);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedImageFiles, setUpdatedImageFiles] = useState<File[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const storage = getStorage();

  // Fetch Equipement types
  const fetchEquipementTypes = async () => {
    try {
      const typesRef = collection(db, "Equipements");
      const querySnapshot = await getDocs(typesRef);
      const typesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as EquipementType[];
      setEquipementTypes(typesData);
    } catch (error) {
      console.error("Error fetching Equipement types:", error);
      setError("Error fetching Equipement types.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch subtypes for selected type
  const fetchSubTypes = async (typeId: string) => {
    try {
      const subTypesRef = collection(
        db,
        "Equipements",
        typeId,
        "Equipements-subType"
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

  // Fetch Equipements for selected subtype
  const fetchEquipements = async (typeId: string, subtypeId: string) => {
    console.log(typeId, subtypeId);
    try {
      const EquipementsRef = collection(
        db,
        "Equipements",
        typeId,
        "Equipements-subType",
        subtypeId,
        "products"
      );
      const querySnapshot = await getDocs(EquipementsRef);
      console.log(querySnapshot);
      const EquipementsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name || "",
        subtitle: doc.data().subtitle || "",
        ref: doc.data().ref || 0,
        description: doc.data().description || "",
        images: doc.data().images || [],
      })) as Equipement[];
      setEquipements(EquipementsData);
    } catch (error) {
      console.error("Error fetching Equipements:", error);
      setError("Error fetching Equipements.");
    }
    console.log(Equipements);
  };

  useEffect(() => {
    fetchEquipementTypes();
  }, []);

  useEffect(() => {
    if (selectedType) {
      fetchSubTypes(selectedType.id);
    } else {
      setSubTypes([]);
      setEquipements([]);
    }
  }, [selectedType]);

  useEffect(() => {
    if (selectedType && selectedSubType) {
      console.log(selectedSubType, selectedType);
      fetchEquipements(selectedType.id, selectedSubType.id);
    } else {
      setEquipements([]);
    }
  }, [selectedType, selectedSubType]);

  // Handle Equipement editing
  const handleEditClick = (Equipement: Equipement) => {
    setEditingEquipement(Equipement);
    setUpdatedName(Equipement.name);
    setUpdatedSubtitle(Equipement.subtitle);
    setUpdatedRef(Equipement.ref);
    setUpdatedDescription(Equipement.description);
    setUpdatedImageFiles([]);
    setImagesToDelete([]);
    setUploadProgress(0);
  };

  // Image upload handler
  const uploadImage = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `Equipements/${Date.now()}_${file.name}`);
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

  // Update Equipement
  const handleUpdateEquipement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEquipement || !selectedType || !selectedSubType) return;

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
      const EquipementRef = doc(
        db,
        "Equipements",
        selectedType.id,
        "Equipements-subType",
        selectedSubType.id,
        "Equipements",
        editingEquipement.id
      );

      const updatedImages = [
        ...editingEquipement.images.filter(
          (img) => !imagesToDelete.includes(img)
        ),
        ...newImageUrls,
      ];

      await updateDoc(EquipementRef, {
        name: updatedName,
        subtitle: updatedSubtitle,
        ref: updatedRef,
        description: updatedDescription,
        images: updatedImages,
      });

      // Update local state
      setEquipements((prevEquipements) =>
        prevEquipements.map((Equipement) =>
          Equipement.id === editingEquipement.id
            ? {
                ...Equipement,
                name: updatedName,
                subtitle: updatedSubtitle,
                ref: updatedRef,
                description: updatedDescription,
                images: updatedImages,
              }
            : Equipement
        )
      );

      // Reset state
      setEditingEquipement(null);
      setUpdatedName("");
      setUpdatedSubtitle("");
      setUpdatedRef(0);
      setUpdatedDescription("");
      setUpdatedImageFiles([]);
      setImagesToDelete([]);
      setUploadProgress(0);
    } catch (error) {
      console.error("Error updating Equipement:", error);
      setError("Error updating Equipement.");
    }
  };

  const handleDeleteEquipement = async (EquipementId: string) => {
    if (!selectedType || !selectedSubType) return;

    try {
      const EquipementRef = doc(
        db,
        "Equipements",
        selectedType.id,
        "Equipements-subType",
        selectedSubType.id,
        "Equipements",
        EquipementId
      );

      await deleteDoc(EquipementRef);
      setEquipements((prevEquipements) =>
        prevEquipements.filter((Equipement) => Equipement.id !== EquipementId)
      );
    } catch (error) {
      console.error("Error deleting Equipement:", error);
      setError("Error deleting Equipement.");
    }
  };

  if (loading) return <div className="p-4">Loading Equipement types...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-6 mt-20">Equipement Manager</h1>

      {/* Type Selection */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Equipement Type</label>
        <select
          value={selectedType?.id || ""}
          onChange={(e) => {
            const type = EquipementTypes.find((t) => t.id === e.target.value);
            setSelectedType(type || null);
            setSelectedSubType(null);
            setEquipements([]);
          }}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Type</option>
          {EquipementTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.typeName}
            </option>
          ))}
        </select>
      </div>

      {/* Subtype Selection */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Equipement Subtype</label>
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

      {/* Equipements List */}
      {Equipements.length > 0 ? (
        <div className="space-y-4">
          {Equipements.map((Equipement) => (
            <div key={Equipement.id} className="p-4 border rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{Equipement.name}</h3>
                  <p className="text-gray-600">{Equipement.subtitle}</p>
                  <p className="text-sm text-gray-500">
                    Ref: #{Equipement.ref}
                  </p>
                  <p className="mt-2 text-gray-600">{Equipement.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(Equipement)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEquipement(Equipement.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {Equipement.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {Equipement.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Equipement ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No Equipements found for selected subtype.
        </p>
      )}

      {/* Edit Form */}
      {editingEquipement && (
        <div className="fixed overflow-scroll inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleUpdateEquipement}
            className="bg-white p-6 rounded-lg w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Edit Equipement</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-1">Equipement Name</label>
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
                  {editingEquipement.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Equipement image ${index + 1}`}
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
                onClick={() => setEditingEquipement(null)}
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
