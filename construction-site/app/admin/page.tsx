"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { compressImage, formatFileSize } from "@/lib/image-compress";

interface Project {
  id: string;
  title: string;
  slug: string;
  type: string;
  year: number;
  area: string;
  location: string;
  cover_image: string;
  description: string;
  gallery: string[];
  sort_order: number;
}

const EMPTY_PROJECT: Omit<Project, "id"> = {
  title: "",
  slug: "",
  type: "",
  year: new Date().getFullYear(),
  area: "",
  location: "",
  cover_image: "",
  description: "",
  gallery: [],
  sort_order: 0,
};

interface UploadProgress {
  fileName: string;
  status: "compressing" | "uploading" | "done" | "error";
  originalSize?: number;
  compressedSize?: number;
  error?: string;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(EMPTY_PROJECT);
  const [saving, setSaving] = useState(false);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      setProjects(data);
    } catch {
      showMessage("Грешка при зареждане", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchProjects();
  }, [authed, fetchProjects]);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((res) => {
        if (res.ok) setAuthed(true);
      })
      .catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      setPassword("");
    } else {
      setAuthError("Грешна парола");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthed(false);
    setProjects([]);
  };

  const startCreate = () => {
    setCreating(true);
    setEditing(null);
    setForm({ ...EMPTY_PROJECT, sort_order: projects.length });
  };

  const startEdit = (project: Project) => {
    setEditing(project);
    setCreating(false);
    setForm({
      title: project.title,
      slug: project.slug,
      type: project.type,
      year: project.year,
      area: project.area,
      location: project.location,
      cover_image: project.cover_image,
      description: project.description,
      gallery: [...project.gallery],
      sort_order: project.sort_order,
    });
  };

  const cancelForm = () => {
    setEditing(null);
    setCreating(false);
    setForm(EMPTY_PROJECT);
    setNewGalleryUrl("");
    setUploads([]);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.gallery.length === 0) {
      showMessage("Добавете поне една снимка в галерията", "error");
      return;
    }
    setSaving(true);
    try {
      // First gallery image = cover
      const payload = { ...form, cover_image: form.gallery[0] };
      const url = editing
        ? `/api/admin/projects/${editing.id}`
        : "/api/admin/projects";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Грешка при запазване");
      }
      showMessage(
        editing ? "Проектът е обновен!" : "Проектът е създаден!",
        "success"
      );
      cancelForm();
      fetchProjects();
    } catch (err) {
      showMessage(
        err instanceof Error ? err.message : "Грешка при запазване",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`Сигурни ли сте, че искате да изтриете "${project.title}"?`))
      return;
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Грешка при изтриване");
      showMessage("Проектът е изтрит!", "success");
      fetchProjects();
    } catch {
      showMessage("Грешка при изтриване", "error");
    }
  };

  // ─── IMAGE UPLOAD ───
  const uploadFile = async (
    file: File,
    slug: string
  ): Promise<string | null> => {
    const id = `${file.name}-${Date.now()}`;

    // Add to progress
    setUploads((prev) => [
      ...prev,
      { fileName: file.name, status: "compressing", originalSize: file.size },
    ]);

    try {
      // Compress
      const compressed = await compressImage(file);

      setUploads((prev) =>
        prev.map((u) =>
          u.fileName === file.name
            ? {
                ...u,
                status: "uploading" as const,
                compressedSize: compressed.size,
              }
            : u
        )
      );

      // Upload
      const formData = new FormData();
      formData.append("file", compressed);
      formData.append("projectSlug", slug || "new-project");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const data = await res.json();

      setUploads((prev) =>
        prev.map((u) =>
          u.fileName === file.name ? { ...u, status: "done" as const } : u
        )
      );

      // Clear completed uploads after 2s
      setTimeout(() => {
        setUploads((prev) => prev.filter((u) => u.fileName !== file.name));
      }, 2000);

      return data.url;
    } catch (err) {
      setUploads((prev) =>
        prev.map((u) =>
          u.fileName === file.name
            ? {
                ...u,
                status: "error" as const,
                error: err instanceof Error ? err.message : "Грешка",
              }
            : u
        )
      );
      void id;
      return null;
    }
  };

  const handleGalleryFileUpload = async (files: FileList) => {
    const slug = form.slug || editing?.slug || "new-project";
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const url = await uploadFile(file, slug);
      if (url) newUrls.push(url);
    }

    if (newUrls.length > 0) {
      setForm((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...newUrls],
      }));
    }
  };

  const setAsCover = (index: number) => {
    if (index === 0) return;
    const newGallery = [...form.gallery];
    const [item] = newGallery.splice(index, 1);
    newGallery.unshift(item);
    setForm({ ...form, gallery: newGallery });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleGalleryFileUpload(e.dataTransfer.files);
    }
  };

  const addGalleryUrl = () => {
    if (!newGalleryUrl.trim()) return;
    setForm({ ...form, gallery: [...form.gallery, newGalleryUrl.trim()] });
    setNewGalleryUrl("");
  };

  const removeGalleryImage = (index: number) => {
    setForm({
      ...form,
      gallery: form.gallery.filter((_, i) => i !== index),
    });
  };

  const moveGalleryImage = (index: number, direction: -1 | 1) => {
    const newGallery = [...form.gallery];
    const target = index + direction;
    if (target < 0 || target >= newGallery.length) return;
    [newGallery[index], newGallery[target]] = [
      newGallery[target],
      newGallery[index],
    ];
    setForm({ ...form, gallery: newGallery });
  };

  const updateField = (field: string, value: string | number | string[]) => {
    setForm({ ...form, [field]: value });
  };

  // ─── LOGIN SCREEN ───
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <Image
              src="/logo-icon-light.webp"
              alt="StroiPro BG"
              width={140}
              height={73}
              className="h-8 w-auto"
            />
            <h1 className="text-xl font-bold text-white font-montserrat">
              Admin Panel
            </h1>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Парола..."
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors mb-4"
            autoFocus
          />
          {authError && (
            <p className="text-red-400 text-sm mb-4">{authError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-amber-500 text-slate-900 font-bold py-3 rounded-xl hover:bg-amber-400 transition-colors"
          >
            Вход
          </button>
        </form>
      </div>
    );
  }

  // ─── FORM (CREATE / EDIT) ───
  if (creating || editing) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-white font-montserrat">
              {editing ? `Редактиране: ${editing.title}` : "Нов проект"}
            </h1>
            <button
              onClick={cancelForm}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {message.text && (
            <div
              className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                  : "bg-red-500/20 text-red-300 border border-red-500/30"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            {/* Basic fields */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-2">
                Основна информация
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Заглавие *
                  </label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Slug (URL)
                  </label>
                  <input
                    value={form.slug}
                    onChange={(e) => updateField("slug", e.target.value)}
                    placeholder="Автоматично от заглавието"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Тип *
                  </label>
                  <input
                    required
                    value={form.type}
                    onChange={(e) => updateField("type", e.target.value)}
                    placeholder="Жилищно строителство"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Година *
                  </label>
                  <input
                    required
                    type="number"
                    value={form.year}
                    onChange={(e) =>
                      updateField("year", parseInt(e.target.value) || 0)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Подредба
                  </label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) =>
                      updateField("sort_order", parseInt(e.target.value) || 0)
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Площ *
                  </label>
                  <input
                    required
                    value={form.area}
                    onChange={(e) => updateField("area", e.target.value)}
                    placeholder="520 м²"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Локация *
                  </label>
                  <input
                    required
                    value={form.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    placeholder="Варна"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1">
                  Описание *
                </label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                />
              </div>
            </div>

            {/* ─── GALLERY & COVER ─── */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-amber-500 font-bold text-xs uppercase tracking-widest">
                  Снимки ({form.gallery.length})
                </h2>
                <p className="text-slate-500 text-xs">
                  Първата снимка = корица на проекта
                </p>
              </div>

              {/* Upload zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                  dragOver
                    ? "border-amber-500 bg-amber-500/10"
                    : "border-slate-700 hover:border-slate-500"
                }`}
                onClick={() => galleryInputRef.current?.click()}
              >
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) handleGalleryFileUpload(e.target.files);
                    e.target.value = "";
                  }}
                />
                <span className="material-symbols-outlined text-4xl text-slate-500 mb-2 block">
                  cloud_upload
                </span>
                <p className="text-slate-400 text-sm mb-1">
                  Провлачи снимки тук или натисни за избор
                </p>
                <p className="text-slate-600 text-xs">
                  Автоматично се компресират в WebP (макс. 1600px, ~150KB)
                </p>
              </div>

              {/* Upload progress */}
              {uploads.length > 0 && (
                <div className="space-y-2">
                  {uploads.map((u, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800 text-sm"
                    >
                      {u.status === "compressing" && (
                        <span className="material-symbols-outlined text-amber-500 animate-spin text-sm">
                          progress_activity
                        </span>
                      )}
                      {u.status === "uploading" && (
                        <span className="material-symbols-outlined text-blue-400 animate-pulse text-sm">
                          cloud_upload
                        </span>
                      )}
                      {u.status === "done" && (
                        <span className="material-symbols-outlined text-green-400 text-sm">
                          check_circle
                        </span>
                      )}
                      {u.status === "error" && (
                        <span className="material-symbols-outlined text-red-400 text-sm">
                          error
                        </span>
                      )}

                      <span className="text-slate-300 flex-1 truncate">
                        {u.fileName}
                      </span>

                      {u.status === "compressing" && (
                        <span className="text-slate-500 text-xs">
                          Компресиране... ({formatFileSize(u.originalSize || 0)})
                        </span>
                      )}
                      {u.status === "uploading" && u.compressedSize && (
                        <span className="text-slate-500 text-xs">
                          Качване... ({formatFileSize(u.compressedSize)})
                        </span>
                      )}
                      {u.status === "done" &&
                        u.originalSize &&
                        u.compressedSize && (
                          <span className="text-green-400 text-xs">
                            {formatFileSize(u.originalSize)} →{" "}
                            {formatFileSize(u.compressedSize)}
                          </span>
                        )}
                      {u.status === "error" && (
                        <span className="text-red-400 text-xs">{u.error}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Add URL manually */}
              <div className="flex gap-2">
                <input
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  placeholder="Или добави URL на снимка..."
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addGalleryUrl();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addGalleryUrl}
                  className="px-4 py-3 bg-slate-700 text-slate-300 font-bold rounded-xl hover:bg-slate-600 transition-colors"
                >
                  <span className="material-symbols-outlined">link</span>
                </button>
              </div>

              {/* Gallery images grid */}
              {form.gallery.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {form.gallery.map((url, i) => (
                    <div
                      key={i}
                      className={`relative group rounded-xl overflow-hidden bg-slate-800 aspect-video ${
                        i === 0
                          ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-slate-900"
                          : ""
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={`Gallery ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        {i !== 0 && (
                          <button
                            type="button"
                            onClick={() => setAsCover(i)}
                            className="w-8 h-8 bg-amber-500/80 rounded-full flex items-center justify-center text-slate-900 hover:bg-amber-500 transition-colors"
                            title="Направи корица"
                          >
                            <span className="material-symbols-outlined text-sm">
                              photo_camera
                            </span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => moveGalleryImage(i, -1)}
                          className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors disabled:opacity-30"
                          disabled={i === 0}
                        >
                          <span className="material-symbols-outlined text-sm">
                            arrow_back
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(i)}
                          className="w-8 h-8 bg-red-500/80 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">
                            delete
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => moveGalleryImage(i, 1)}
                          className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors disabled:opacity-30"
                          disabled={i === form.gallery.length - 1}
                        >
                          <span className="material-symbols-outlined text-sm">
                            arrow_forward
                          </span>
                        </button>
                      </div>
                      {i === 0 ? (
                        <span className="absolute top-2 left-2 bg-amber-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">
                            photo_camera
                          </span>
                          Корица
                        </span>
                      ) : (
                        <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                          {i + 1}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-amber-500 text-slate-900 font-bold py-4 rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50"
              >
                {saving
                  ? "Запазване..."
                  : editing
                  ? "Обнови проекта"
                  : "Създай проект"}
              </button>
              <button
                type="button"
                onClick={cancelForm}
                className="px-8 py-4 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-colors"
              >
                Отказ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ─── PROJECTS LIST ───
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-icon-light.webp"
              alt="StroiPro BG"
              width={140}
              height={73}
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-white font-montserrat">
                Админ Панел
              </h1>
              <p className="text-slate-400 text-sm">
                {projects.length} обекта
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={startCreate}
              className="flex items-center gap-2 bg-amber-500 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Нов проект
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-slate-800 text-slate-300 px-4 py-3 rounded-xl hover:bg-slate-700 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
            </button>
          </div>
        </div>

        {message.text && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
              message.type === "success"
                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                : "bg-red-500/20 text-red-300 border border-red-500/30"
            }`}
          >
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-slate-400">Зареждане...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-slate-700 mb-4 block">
              construction
            </span>
            <p className="text-slate-400 text-lg mb-6">Няма обекти</p>
            <button
              onClick={startCreate}
              className="bg-amber-500 text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-amber-400 transition-colors"
            >
              Добави първия проект
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-colors group"
              >
                <div className="relative h-40 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      {project.gallery.length} снимки
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold font-montserrat mb-1">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-1">
                    {project.type} · {project.year}
                  </p>
                  <p className="text-slate-500 text-xs mb-4">
                    {project.location} · {project.area}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(project)}
                      className="flex-1 flex items-center justify-center gap-1 bg-slate-800 text-slate-300 py-2 rounded-xl hover:bg-slate-700 hover:text-white transition-colors text-sm font-medium"
                    >
                      <span className="material-symbols-outlined text-sm">
                        edit
                      </span>
                      Редактирай
                    </button>
                    <button
                      onClick={() => handleDelete(project)}
                      className="flex items-center justify-center gap-1 bg-slate-800 text-red-400 px-4 py-2 rounded-xl hover:bg-red-500/20 transition-colors text-sm"
                    >
                      <span className="material-symbols-outlined text-sm">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
