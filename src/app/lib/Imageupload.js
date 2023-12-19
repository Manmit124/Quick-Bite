// ImageUploader.js
import React, { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import Image from "next/image";
import { app } from "../config/firebase";
import { Input } from "../component/ui/input";
import { Label } from "../component/ui/label";
import { useToast } from "../component/ui/use-toast";
import { useSession } from "next-auth/react";

const ImageUploader = ({ image, setImageUrl, setimage }) => {
  const [imagePercentage, setImagePercentage] = useState(0);
  const [formData, setformData] = useState({});
  const { toast } = useToast();
  const session = useSession();
  const userData = session.data?.user;

  let userImage = userData?.image;

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setformData((prevFormData) => ({
              ...prevFormData,
              profilePicture: downloadURL,
            }));
            setImageUrl(downloadURL);
            // setimage(URL.createObjectURL(new Blob([downloadURL], { type: 'image/jpeg' })))
            setimage(image);
          })
          .catch((error) => {
            console.error(error);
            toast({
              title: "Error getting download URL",
              variant: "destructive",
            });
          });
      }
    );

    toast({
      title: "Image upload successfully",
      variant: "outline",
    });
  };

  return (
    <div className="flex-col p-2 mb-0 rounded-lg">
      <Image
        // image ? URL.createObjectURL(image) : userImage
        src={formData.profilePicture || userImage}
        height={100}
        width={100}
        alt="image of special"
        className="object-cover bg-gray-500 border-gray-500 mb-2"
      />
      {!image && (
        <div className="mb-1 bg-gray-200 p-4 text-gray-500 rounded-lg">
          No image{" "}
        </div>
      )}
      <Label className="cursor-pointer" variant="outline">
        <Input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => setimage(e.target.files[0])}
        />
        <span className="block border rounded-lg p-1 text-center">
          Change photo
        </span>
      </Label>
    </div>
  );
};

export default ImageUploader;
