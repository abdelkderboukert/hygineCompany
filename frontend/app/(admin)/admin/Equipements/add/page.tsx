"use client";

import { useRouter } from "next/navigation";
import * as motion from "motion/react-client";

import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, doc, setDoc, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface EquipementType {
  id: string;
  typeName: string;
  image?: string; // Added imageUrl field
}

interface SubType {
  id: string;
  typeName: string;
  image?: string; // Added imageUrl field
}

interface Equipement {
  name: string;
  subtitle: string;
  ref: number;
  description: string;
  images: string[];
  imageFiles?: File[];
  file?: string; // Store URL as string
  fileFile?: File; // Temporary file object for upload
}

const EquipementsManager: React.FC = () => {
  const [EquipementTypes, setEquipementTypes] = useState<EquipementType[]>([]);
  const [EquipementSubTypes, setEquipementSubTypes] = useState<SubType[]>([]);
  const [newTypeName, setNewTypeName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [newSubTypeName, setNewSubTypeName] = useState("");
  const [Equipements, setEquipements] = useState<Equipement[]>([
    { name: "", subtitle: "", ref: 0, description: "", images: [] },
  ]);
  const [selectedSubType, setSelectedSubType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [typeImageFile, setTypeImageFile] = useState<File | null>(null); // State for type image
  const [subTypeImageFile, setSubTypeImageFile] = useState<File | null>(null); // State for subtype image

  const storage = getStorage();
  const router = useRouter();

  // Fetch Equipement types
  const fetchEquipementTypes = async () => {
    const querySnapshot = await getDocs(collection(db, "Equipements"));
    const types = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as EquipementType[];
    setEquipementTypes(types);
  };

  const fetchEquipementSubTypes = async (typeId: string) => {
    try {
      const subtypesRef = collection(
        db,
        "Equipements",
        typeId,
        "Equipements-subType"
      );
      const querySnapshot = await getDocs(subtypesRef);
      const subtypes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SubType[];
      setEquipementSubTypes(subtypes);
    } catch (error) {
      console.error("Error fetching subtypes:", error);
      setEquipementSubTypes([]);
    }
  };

  useEffect(() => {
    fetchEquipementTypes();
  }, []);

  useEffect(() => {
    if (selectedType) fetchEquipementSubTypes(selectedType);
  }, [selectedType]);

  // Upload handlers
  const uploadImage = async (file: File): Promise<string> => {
    const storageRef = ref(
      storage,
      `Equipements/images/${Date.now()}_${file.name}`
    );
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const uploadFile = async (file: File): Promise<string> => {
    const storageRef = ref(
      storage,
      `Equipements/files/${Date.now()}_${file.name}`
    );
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  // Form handlers
  const handleAddType = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (EquipementTypes.some((type) => type.typeName === newTypeName)) {
      alert("Type already exists!");
      return;
    }

    try {
      const image = typeImageFile ? await uploadImage(typeImageFile) : "";
      const typeRef = doc(collection(db, "Equipements"), newTypeName);
      await setDoc(typeRef, { typeName: newTypeName, image });
      setNewTypeName("");
      setTypeImageFile(null);
      await fetchEquipementTypes();
      setSuccessMessage("Type added successfully!");
    } catch (error) {
      console.error("Error adding type:", error);
      setSuccessMessage("Error adding type!");
    }
  };

  const handleAddSubType = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (EquipementSubTypes.some((st) => st.typeName === newSubTypeName)) {
      alert("Subtype already exists!");
      return;
    }

    try {
      const image = subTypeImageFile ? await uploadImage(subTypeImageFile) : "";
      const subtypesRef = collection(
        db,
        "Equipements",
        selectedType,
        "Equipements-subType"
      );
      await addDoc(subtypesRef, { typeName: newSubTypeName, image });
      setNewSubTypeName("");
      setSubTypeImageFile(null);
      await fetchEquipementSubTypes(selectedType);
      setSuccessMessage("Subtype added successfully!");
    } catch (error) {
      console.error("Error adding subtype:", error);
      setSuccessMessage("Error adding subtype!");
    }
  };

  const handleAddEquipement = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (
        Equipements.some(
          (p) =>
            !p.name ||
            !p.subtitle ||
            p.ref <= 0 ||
            !p.description ||
            !p.imageFiles?.length
        )
      ) {
        alert("Please fill all required fields and upload images!");
        return;
      }

      // Process all Equipements
      const processedEquipements = await Promise.all(
        Equipements.map(async (equip) => {
          if (!equip.imageFiles) throw new Error("Missing images");

          // Upload images
          const imageUrls = await Promise.all(
            equip.imageFiles.map(uploadImage)
          );

          // Upload file if exists
          let fileUrl = "";
          if (equip.fileFile) {
            fileUrl = await uploadFile(equip.fileFile);
          }

          return {
            ...equip,
            images: imageUrls,
            file: fileUrl,
            imageFiles: undefined,
            fileFile: undefined,
          };
        })
      );

      // Save to Firestore
      const EquipementsRef = collection(
        db,
        "Equipements",
        selectedType,
        "Equipements-subType",
        selectedSubType,
        "products"
      );

      await Promise.all(
        processedEquipements.map((equip) =>
          addDoc(EquipementsRef, {
            name: equip.name,
            subtitle: equip.subtitle,
            ref: equip.ref,
            description: equip.description,
            images: equip.images,
            file: equip.file,
          })
        )
      );

      // Reset form
      setEquipements([
        { name: "", subtitle: "", ref: 0, description: "", images: [] },
      ]);
      setSuccessMessage("Equipements added successfully!");
    } catch (error) {
      console.error("Error adding Equipements:", error);
      setSuccessMessage("Error adding Equipements!");
    } finally {
      setLoading(false);
    }
  };

  const handleEquipementChange = (
    index: number,
    field: keyof Equipement,
    value: string | number
  ) => {
    const newEquipements = [...Equipements];
    if (field === "ref") {
      newEquipements[index][field] = Number(value);
    } else {
      (newEquipements[index][field] as string) = value.toString();
    }
    setEquipements(newEquipements);
  };

  const handleImageChange = (index: number, files: FileList | null) => {
    if (!files) return;
    const newEquipements = [...Equipements];
    newEquipements[index].imageFiles = Array.from(files);
    setEquipements(newEquipements);
  };

  const handleLogout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if ((await res.json()).success) router.push("/login");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Equipement Manager</h1>

      {/* Type Management */}
      <section className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Equipement Types</h2>
        <form onSubmit={handleAddType} className="flex gap-4">
          <input
            type="text"
            value={newTypeName}
            onChange={(e) => setNewTypeName(e.target.value)}
            placeholder="New Type Name"
            className="flex-1 p-2 border rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setTypeImageFile(e.target.files?.[0] || null)}
            className="p-2 border rounded"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 py-2 bg-black shadow-lg text-white rounded"
          >
            Add Type
          </motion.button>
        </form>
      </section>

      {/* Subtype Management */}
      <section className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Equipement Subtypes</h2>
        <form onSubmit={handleAddSubType} className="flex flex-col gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Type</option>
            {EquipementTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.typeName}
              </option>
            ))}
          </select>
          <div className="flex gap-4">
            <input
              type="text"
              value={newSubTypeName}
              onChange={(e) => setNewSubTypeName(e.target.value)}
              placeholder="New Subtype Name"
              className="flex-1 p-2 border rounded"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSubTypeImageFile(e.target.files?.[0] || null)}
              className="p-2 border rounded"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-black shadow-lg text-white rounded"
            >
              Add Subtype
            </motion.button>
          </div>
        </form>
      </section>

      {/* Equipement Management */}
      <section className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add Equipements</h2>
        <form onSubmit={handleAddEquipement} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-2 border rounded"
              required
            >
              <option value="">Select Type</option>
              {EquipementTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.typeName}
                </option>
              ))}
            </select>
            <select
              value={selectedSubType}
              onChange={(e) => setSelectedSubType(e.target.value)}
              className="p-2 border rounded"
              required
              disabled={!selectedType}
            >
              <option value="">Select Subtype</option>
              {EquipementSubTypes.map((subtype) => (
                <option key={subtype.id} value={subtype.id}>
                  {subtype.typeName}
                </option>
              ))}
            </select>
          </div>

          {Equipements.map((Equipement, index) => (
            <div key={index} className="space-y-4 p-4 border rounded">
              <h3 className="font-medium">Equipement #{index + 1}</h3>

              <input
                type="text"
                value={Equipement.name}
                onChange={(e) =>
                  handleEquipementChange(index, "name", e.target.value)
                }
                placeholder="Equipement Name"
                className="w-full p-2 border rounded"
                required
              />

              <input
                type="text"
                value={Equipement.subtitle}
                onChange={(e) =>
                  handleEquipementChange(index, "subtitle", e.target.value)
                }
                placeholder="Equipement Subtitle"
                className="w-full p-2 border rounded"
                required
              />

              <input
                type="number"
                value={Equipement.ref}
                onChange={(e) =>
                  handleEquipementChange(index, "ref", e.target.value)
                }
                placeholder="Reference Number"
                className="w-full p-2 border rounded"
                min="1"
                required
              />

              <textarea
                value={Equipement.description}
                onChange={(e) =>
                  handleEquipementChange(index, "description", e.target.value)
                }
                placeholder="Equipement Description"
                className="w-full p-2 border rounded h-24"
                required
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Equipement Images (Multiple)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageChange(index, e.target.files)}
                  className="w-full p-2 border rounded"
                  required
                />
                {Equipement.imageFiles && (
                  <div className="text-sm text-gray-600">
                    {Equipement.imageFiles.map((file, i) => (
                      <div key={i} className="truncate">
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Equipement File
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const newEquipements = [...Equipements];
                      newEquipements[index].fileFile = file; // Assign to fileFile
                      setEquipements(newEquipements);
                    }
                  }}
                />
              </div>
            </div>
          ))}

          <div className="flex gap-4 justify-end">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setEquipements([
                  ...Equipements,
                  {
                    name: "",
                    subtitle: "",
                    ref: 0,
                    description: "",
                    images: [],
                  },
                ])
              }
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Add Equipement Row
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="px-4 py-2 bg-black shadow-lg text-white rounded disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Save All Equipements"}
            </motion.button>
          </div>
        </form>

        {successMessage && (
          <div className="mt-4 p-3 text-green-700 bg-green-100 rounded">
            {successMessage}
          </div>
        )}
      </section>

      <button
        onClick={handleLogout}
        className="w-40 h-14 bg-red-600 rounded-lg mt-5 text-white font-bold"
      >
        Logout
      </button>
    </div>
  );
};

export default EquipementsManager;
