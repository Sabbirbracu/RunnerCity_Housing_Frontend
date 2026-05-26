import { Camera, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useUpdateUserMutation } from "../../../features/api/userApi";
import { useUploadAvatarMutation, useDeleteAvatarMutation } from "../../../features/api/settingsApi";
import { setCredentials } from "../../../features/auth/authSlice";

const ProfileTab = ({ user }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadAvatarMutation();
  const [deleteAvatar] = useDeleteAvatarMutation();
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const avatarSrc = previewUrl || user?.avatar_url || null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    // Show preview
    setPreviewUrl(URL.createObjectURL(file));

    // Upload
    try {
      const result = await uploadAvatar({ userId: user.user_id, file }).unwrap();
      // Update Redux with new avatar_url
      const token = localStorage.getItem("token");
      dispatch(setCredentials({ token, user: { ...user, avatar_url: result.avatar_url } }));
      toast.success(t("settings.profile.avatarSuccess"), { duration: 30000 });
    } catch (err) {
      toast.error(err?.data?.message || t("settings.profile.avatarFailed"), { duration: 30000 });
      setPreviewUrl(null);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await deleteAvatar(user.user_id).unwrap();
      setPreviewUrl(null);
      // Update Redux to remove avatar_url
      const token = localStorage.getItem("token");
      dispatch(setCredentials({ token, user: { ...user, avatar_url: null } }));
      toast.success(t("settings.profile.avatarRemoved"), { duration: 30000 });
    } catch (err) {
      toast.error(err?.data?.message || t("settings.profile.avatarFailed"), { duration: 30000 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ id: user.user_id, ...form }).unwrap();
      toast.success(t("settings.profile.success"));
    } catch (err) {
      toast.error(err?.data?.message || t("settings.profile.failed"));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{t("settings.profile.title")}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{t("settings.profile.subtitle")}</p>
      </div>

      {/* Avatar Section */}
      <div className="flex items-center gap-4">
        <div className="relative group">
          {/* Avatar Circle */}
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            {avatarSrc ? (
              <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-2xl font-bold">{initials}</span>
            )}
          </div>

          {/* Camera Overlay */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          >
            <Camera className="w-5 h-5 text-white" />
          </button>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500 capitalize">{user?.role?.replace("_", " ")} • Plot {user?.plot_no || "N/A"}</p>
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="text-xs text-emerald-600 font-medium hover:underline disabled:opacity-50"
            >
              {isUploading ? "Uploading..." : "Change photo"}
            </button>
            {avatarSrc && (
              <>
                <span className="text-gray-300">•</span>
                <button
                  type="button"
                  onClick={handleDeleteAvatar}
                  className="text-xs text-red-500 font-medium hover:underline flex items-center gap-0.5"
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("settings.profile.nameLabel")}</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("settings.profile.phoneLabel")}</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("settings.profile.emailLabel")}</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
              focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold
            hover:bg-emerald-700 transition-all shadow-sm disabled:opacity-60"
        >
          {isLoading ? t("settings.profile.saving") : t("settings.profile.save")}
        </button>
      </form>
    </div>
  );
};

export default ProfileTab;
