"use client";

import { useForm, useFieldArray, FieldArrayPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCarSchema,
  CreateCarFormData,
} from "@/common/validation/schemas/car";
import { Input } from "@/components/common/UI/Inputs/Input";
import { CustomButton } from "@/components/common/UI/Buttons/CustomButton";
import { useState } from "react";
import { FaPlus, FaTimes, FaUpload } from "react-icons/fa";
import Image from "next/image";

interface CreateCarFormProps {
  onSubmit: (data: CreateCarFormData) => void;
  isLoading: boolean;
}

export const CreateCarForm: React.FC<CreateCarFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateCarFormData>({
    resolver: zodResolver(createCarSchema),
    defaultValues: {
      name: "",
      brand: "",
      model: "",
      price: 0,
      rating: 5,
      carDetails: {
        fuelType: "",
        transmission: "",
        mileage: 0,
        engineSize: 0,
        enginePower: 0,
        topSpeed: 0,
        acceleration: 0,
      },
      features: [""],
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features" as FieldArrayPath<CreateCarFormData>,
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const newImageFiles = [...imageFiles, ...files];
    const newPreviews = [...imagePreviews];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string);
        setImagePreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });

    setImageFiles(newImageFiles);
    setValue("images", newImageFiles);
  };

  const removeImage = (index: number) => {
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setImageFiles(newImageFiles);
    setImagePreviews(newPreviews);
    setValue("images", newImageFiles);
  };

  const handleFormSubmit = (data: CreateCarFormData) => {
    const formDataWithImages = {
      ...data,
      images: imageFiles,
      features: data.features.filter((feature) => feature.trim() !== ""),
    };
    onSubmit(formDataWithImages);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Create new car
      </h1>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Main information
            </h2>

            <Input
              label="Name"
              placeholder="Rolls-Royce"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Brand"
              placeholder="Phantom"
              error={errors.brand?.message}
              {...register("brand")}
            />

            <Input
              label="Model"
              placeholder="Series II"
              error={errors.model?.message}
              {...register("model")}
            />

            <Input
              label="Price per day ($)"
              type="number"
              placeholder="2500"
              error={errors.price?.message}
              {...register("price", { valueAsNumber: true })}
            />

            <Input
              label="Rating (1-5)"
              type="number"
              min="1"
              max="5"
              placeholder="5"
              error={errors.rating?.message}
              {...register("rating", { valueAsNumber: true })}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Technical characteristics
            </h2>

            <Input
              label="Fuel type"
              placeholder="petrol"
              error={errors.carDetails?.fuelType?.message}
              {...register("carDetails.fuelType")}
            />

            <Input
              label="Transmission"
              placeholder="8-Speed Auto"
              error={errors.carDetails?.transmission?.message}
              {...register("carDetails.transmission")}
            />

            <Input
              label="Mileage"
              type="number"
              placeholder="12900"
              error={errors.carDetails?.mileage?.message}
              {...register("carDetails.mileage", { valueAsNumber: true })}
            />

            <Input
              label="Engine size (L)"
              type="number"
              step="0.1"
              placeholder="6.75"
              error={errors.carDetails?.engineSize?.message}
              {...register("carDetails.engineSize", { valueAsNumber: true })}
            />

            <Input
              label="Engine power (HP)"
              type="number"
              placeholder="571"
              error={errors.carDetails?.enginePower?.message}
              {...register("carDetails.enginePower", { valueAsNumber: true })}
            />

            <Input
              label="Max speed (km/h)"
              type="number"
              placeholder="250"
              error={errors.carDetails?.topSpeed?.message}
              {...register("carDetails.topSpeed", { valueAsNumber: true })}
            />

            <Input
              label="Acceleration 0-100 km/h (s)"
              type="number"
              step="0.1"
              placeholder="5.3"
              error={errors.carDetails?.acceleration?.message}
              {...register("carDetails.acceleration", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Images</h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <FaUpload className="text-4xl text-gray-400 mb-2" />
              <p className="text-gray-600">Click to upload images</p>
              <p className="text-sm text-gray-400 mt-1">Max 10 files</p>
            </label>
          </div>

          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images.message}</p>
          )}

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Features and characteristics
          </h2>

          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  placeholder={`Feature ${
                    index + 1
                  } (e.g. Starlight Headliner)`}
                  {...register(`features.${index}` as const)}
                  error={errors.features?.[index]?.message}
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => append("")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <FaPlus /> Add feature
          </button>

          {errors.features && (
            <p className="text-red-500 text-sm">{errors.features.message}</p>
          )}
        </div>

        <div className="flex justify-center pt-6">
          <CustomButton
            type="submit"
            variant="primary"
            size="large"
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full md:w-auto px-12"
          >
            {isLoading ? "Creating..." : "Create car"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
