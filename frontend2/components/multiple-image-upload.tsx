"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X, Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { uploadMultipleImages } from "@/lib/firebase-admin"

interface MultipleImageUploadProps {
  label: string
  value: string[]
  onChange: (urls: string[]) => void
  maxImages?: number
  className?: string
}

export default function MultipleImageUpload({
  label,
  value,
  onChange,
  maxImages = 5,
  className = "",
}: MultipleImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFilesSelect = async (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    if (imageFiles.length === 0) {
      alert("Please select image files")
      return
    }

    const oversizedFiles = imageFiles.filter((file) => file.size > 5 * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      alert("Some files are larger than 5MB and will be skipped")
    }

    const validFiles = imageFiles.filter((file) => file.size <= 5 * 1024 * 1024)

    if (value.length + validFiles.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images total`)
      return
    }

    setIsUploading(true)
    try {
      const urls = await uploadMultipleImages(validFiles, "products/additional-images")
      onChange([...value, ...urls])
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload some images. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFilesSelect(files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFilesSelect(Array.from(files))
    }
  }

  const removeImage = (index: number) => {
    const newUrls = value.filter((_, i) => i !== index)
    onChange(newUrls)
  }

  const canAddMore = value.length < maxImages

  return (
    <div className={`space-y-4 ${className}`}>
      <Label>{label}</Label>

      {/* Existing Images */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                <Image
                  src={url || "/placeholder.svg"}
                  alt={`Additional image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={isUploading}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {canAddMore && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          } ${isUploading ? "pointer-events-none opacity-50" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />

          <div className="text-center">
            {isUploading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
                <p className="text-sm text-gray-600">Uploading images...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Plus className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-1">
                  Add more images ({value.length}/{maxImages})
                </p>
                <p className="text-xs text-gray-500">Drag and drop images here, or click to select</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each</p>
              </div>
            )}
          </div>
        </div>
      )}

      {!canAddMore && <p className="text-sm text-gray-500 text-center">Maximum of {maxImages} images reached</p>}
    </div>
  )
}
