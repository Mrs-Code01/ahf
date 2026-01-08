"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import {
  Download,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Trash2,
  Loader
} from "lucide-react";

export default function AdminVolunteersPage() {
  const router = useRouter();
  const [allApplications, setAllApplications] = useState([]); // Store ALL applications
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    try {
      // Always load ALL applications from database
      const { data, error } = await supabase
        .from("volunteer_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Loaded ALL applications from database:", data);
      setAllApplications(data || []);
    } catch (error) {
      console.error("Error loading applications:", error);
      alert(`Error loading applications: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Filter applications based on current filter (client-side filtering)
  const applications =
    filter === "all"
      ? allApplications
      : allApplications.filter(app => app.status === filter);

  useEffect(() => {
    loadApplications();
  }, []); // Only load once when component mounts

  // No need to reload when filter changes - we filter client-side now

  const approveApplication = async id => {
    if (!window.confirm("✅ Approve this volunteer application?")) {
      return;
    }

    setUpdatingId(id);
    try {
      console.log(`Approving application ${id}`);

      // Update in database
      const { data, error } = await supabase
        .from("volunteer_applications")
        .update({ status: "approved" })
        .eq("id", id)
        .select();

      if (error) {
        console.error("❌ Approve error:", error);
        alert(
          `❌ Database Error: ${error.message}\n\nThis might be a permissions issue. Check Supabase policies.`
        );
        throw error;
      }

      console.log("✅ Application approved in database successfully:", data);

      // Update local state to reflect the change
      setAllApplications(prev =>
        prev.map(app => (app.id === id ? { ...app, status: "approved" } : app))
      );

      alert("✅ Application approved successfully!");
    } catch (error) {
      console.error("Error approving:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const rejectAndDelete = async (id, fileName) => {
    if (
      !window.confirm(
        "⚠️ DELETE this application permanently? This cannot be undone!"
      )
    ) {
      return;
    }

    setUpdatingId(id);
    try {
      console.log(`🗑️ Deleting application ${id} and file ${fileName}`);

      // 1. Delete file from storage
      console.log("Step 1: Deleting file from storage...");
      const { error: storageError } = await supabase.storage
        .from("volunteer-forms")
        .remove([fileName]);

      if (storageError) {
        console.warn("⚠️ Storage delete warning:", storageError);
      } else {
        console.log("✅ File deleted from storage");
      }

      // 2. Delete record from database
      console.log("Step 2: Deleting from database...");
      const { data, error: dbError } = await supabase
        .from("volunteer_applications")
        .delete()
        .eq("id", id)
        .select();

      if (dbError) {
        console.error("❌ Database delete error:", dbError);
        alert(
          `❌ Database Error: ${dbError.message}\n\nThis might be a permissions issue. Check Supabase policies.`
        );
        throw dbError;
      }

      console.log("✅ Application deleted from database:", data);

      // Remove from local state permanently
      setAllApplications(prev => prev.filter(app => app.id !== id));

      alert("🗑️ Application deleted permanently!");
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const downloadFile = async fileName => {
    setDownloadingId(fileName);
    try {
      console.log("Attempting to download:", fileName);

      const { data, error } = await supabase.storage
        .from("volunteer-forms")
        .createSignedUrl(fileName, 3600);

      if (error) {
        console.error("Supabase storage error:", error);
        throw new Error(`Failed to get download URL: ${error.message}`);
      }

      if (!data || !data.signedUrl) {
        throw new Error("No signed URL returned from Supabase");
      }

      console.log("Got signed URL, opening...");

      const link = document.createElement("a");
      link.href = data.signedUrl;
      link.download = fileName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert(`❌ Download failed: ${error.message}`);
    } finally {
      setDownloadingId(null);
    }
  };

  const getStatusBadge = status => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border border-yellow-300",
      approved: "bg-green-100 text-green-800 border border-green-300",
      rejected: "bg-red-100 text-red-800 border border-red-300"
    };
    return styles[status] || styles.pending;
  };

  // Calculate counts dynamically
  const pendingCount = applications.filter(a => a.status === "pending").length;
  const approvedCount = applications.filter(a => a.status === "approved")
    .length;
  const totalCount = applications.length;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-[5%] bg-gray-50 pt-[60px]">
      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-[30px]">
          <div className="flex flex-wrap justify-between items-center gap-y-[20px]">
            <div className="max-[450px]:w-[100%]">
              <h1 className="text-3xl font-bold text-gray-800">
                Volunteer Applications
              </h1>
              <p className="text-gray-600">Manage volunteer submissions</p>
            </div>
            <button
              onClick={() => router.push("/admin/courses")}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === "pending"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              ⏳ Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === "approved"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              ✅ Approved ({approvedCount})
            </button>
          </div>
        </div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">📭 No applications found</p>
            <p className="text-gray-400 text-sm mt-2">
              {filter !== "all"
                ? `No ${filter} applications`
                : "Waiting for volunteer submissions"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map(app => (
              <div
                key={app.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {app.full_name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Mail size={16} className="text-blue-600" />
                        <a
                          href={`mailto:${app.email}`}
                          className="hover:text-blue-600 hover:underline"
                        >
                          {app.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone size={16} className="text-green-600" />
                        <a
                          href={`tel:${app.phone}`}
                          className="hover:text-blue-600 hover:underline"
                        >
                          {app.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} className="text-purple-600" />
                        <span>
                          {new Date(app.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full font-bold text-sm ${getStatusBadge(
                      app.status
                    )}`}
                  >
                    {app.status.toUpperCase()}
                  </span>
                </div>

                <div className="mb-4 bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-bold text-gray-700 mb-2">
                    💭 Motivation:
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {app.motivation}
                  </p>
                </div>

                <div className="mb-4 text-xs text-gray-500 bg-blue-50 rounded px-3 py-2">
                  📎 File: <span className="font-mono">{app.file_name}</span>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => downloadFile(app.file_name)}
                    disabled={downloadingId === app.file_name}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {downloadingId === app.file_name ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        Download
                      </>
                    )}
                  </button>

                  {app.status === "pending" && (
                    <>
                      <button
                        onClick={() => approveApplication(app.id)}
                        disabled={updatingId === app.id}
                        className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updatingId === app.id ? (
                          <Loader size={16} className="animate-spin" />
                        ) : (
                          <CheckCircle size={16} />
                        )}
                        Approve
                      </button>
                      <button
                        onClick={() => rejectAndDelete(app.id, app.file_name)}
                        disabled={updatingId === app.id}
                        className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updatingId === app.id ? (
                          <Loader size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                        Delete
                      </button>
                    </>
                  )}

                  {app.status === "approved" && (
                    <button
                      onClick={() => rejectAndDelete(app.id, app.file_name)}
                      disabled={updatingId === app.id}
                      className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updatingId === app.id ? (
                        <Loader size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
