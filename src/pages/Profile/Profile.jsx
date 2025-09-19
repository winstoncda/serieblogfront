import { useRef, useState } from "react";
import defaultAvatar from "../../assets/images/default_avatar.jpg";
import { useAuth } from "../../context/AuthContext";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { uploadAvatar } from "../../lib/uploadService";
import { updateUserProfile } from "../../api/auth.api";

export default function Profile() {
  const { userConnected } = useAuth();
  const fileInputRef = useRef(null);

  console.log(userConnected);

  // gestion des images
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(userConnected.avatar || defaultAvatar);
  const [objectUrl, setObjectUrl] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // gestion des mots de passe
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const processFile = (file) => {
    // console.log(file.size);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image");
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Image trop lourde (max: 5 Mo)");
      return;
    }

    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    setObjectUrl(url);
    setAvatarFile(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isPasswordFormComplete =
    currentPassword.trim() !== "" &&
    newPassword.trim() !== "" &&
    confirmPassword.trim() !== "";

  const canSubmit = (avatarFile || isPasswordFormComplete) && !loading;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    processFile(file);
  };

  const submit = async () => {
    setError(null);
    setSuccess(null);

    if (!canSubmit) {
      setError("Aucune modification à sauvegarder");
      return;
    }

    if (isPasswordFormComplete && newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe sont différents");
      return;
    }

    setLoading(true);
    try {
      let avatarUrl;
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile);
      }

      const payload = {};
      if (avatarUrl) {
        payload.avatar = avatarUrl;
      }
      if (isPasswordFormComplete) {
        payload.newPassword = newPassword;
        payload.currentPassword = currentPassword;
      }

      const updatedUser = await updateUserProfile(payload);
      if (!updatedUser.message) {
        setSuccess("Profil mis à jour");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowPasswordForm(false);
      } else {
        setError(updatedUser.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">Mon profil</h1>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Avatar
        </label>
        <div className="flex justify-center mb-4">
          <img
            src={preview}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
        </div>
        <button
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50"
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <p className="text-gray-600">Glissez une image ou cliquez ici</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </button>
        <div className="my-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={userConnected.email}
            disabled
            className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
          />
        </div>
        {userConnected.provider !== "google" && (
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <span className="font-semibold text-gray-700">
                Modifier mon mot de passe
              </span>
              <span>{!showPasswordForm ? <FaArrowDown /> : <FaArrowUp />}</span>
            </button>
            {showPasswordForm && (
              <div className="mt-4 space-y-4 p-4 border rounded-lg bg-gray-50">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded-lg p-3"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded-lg p-3"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirmation du nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded-lg p-3"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {passwordError && (
                  <p className="text-red-600">{passwordError}</p>
                )}
              </div>
            )}
          </div>
        )}

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}
        <button
          type="button"
          disabled={!canSubmit}
          className={` text-white px-6 py-2 rounded-lg  ${
            canSubmit
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={submit}
        >
          {loading ? "En cours ..." : "Enregistrer les modifications"}
        </button>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Mes séries notées</h2>
          <p className="text-gray-500">Aucune série notée pour l’instant.</p>
        </div>
      </div>
    </div>
  );
}
