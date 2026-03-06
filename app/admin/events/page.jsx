// "use client";
// // app/admin/events/page.jsx

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import CloudinaryImageUpload from "@/components/CloudinaryImageUpload";

// const EMPTY_FORM = {
//   title: "",
//   subtitle: "",
//   badge_label: "COMMUNITY INITIATIVE",
//   date_text: "",
//   location: "",
//   activities: "",
//   account_name: "",
//   account_number: "",
//   bank_name: "",
//   cta_text: "Join Us to Make This a Reality",
//   cta_subtext: "Your support transforms lives in our community",
//   image_url: "",
//   is_active: true,
//   display_order: 0,
// };

// export default function AdminEventsPage() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [deleting, setDeleting] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [editingEvent, setEditingEvent] = useState(null);
//   const [form, setForm] = useState(EMPTY_FORM);
//   const [toast, setToast] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const showToast = (msg, type = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const fetchEvents = async () => {
//     try {
//       const token = localStorage.getItem("adminToken");
//       const res = await fetch("/api/events", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const json = await res.json();
//       if (json.success) setEvents(json.data || []);
//     } catch {
//       showToast("Failed to fetch events", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openCreate = () => {
//     setEditingEvent(null);
//     setForm(EMPTY_FORM);
//     setShowForm(true);
//   };

//   const openEdit = (event) => {
//     setEditingEvent(event);
//     setForm({
//       title: event.title || "",
//       subtitle: event.subtitle || "",
//       badge_label: event.badge_label || "COMMUNITY INITIATIVE",
//       date_text: event.date_text || "",
//       location: event.location || "",
//       activities: Array.isArray(event.activities)
//         ? event.activities.join(", ")
//         : "",
//       account_name: event.account_name || "",
//       account_number: event.account_number || "",
//       bank_name: event.bank_name || "",
//       cta_text: event.cta_text || "Join Us to Make This a Reality",
//       cta_subtext:
//         event.cta_subtext || "Your support transforms lives in our community",
//       image_url: event.image_url || "",
//       is_active: event.is_active !== false,
//       display_order: event.display_order || 0,
//     });
//     setShowForm(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       const token = localStorage.getItem("adminToken");
//       const url = editingEvent
//         ? `/api/events/${editingEvent.id}`
//         : "/api/events";
//       const method = editingEvent ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form),
//       });
//       const json = await res.json();
//       if (json.success) {
//         showToast(editingEvent ? "Event updated!" : "Event created!");
//         setShowForm(false);
//         fetchEvents();
//       } else {
//         showToast(json.error || "Failed to save", "error");
//       }
//     } catch {
//       showToast("Error saving event", "error");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Delete this event? This cannot be undone.")) return;
//     setDeleting(id);
//     try {
//       const token = localStorage.getItem("adminToken");
//       const res = await fetch(`/api/events/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const json = await res.json();
//       if (json.success) {
//         showToast("Event deleted");
//         setEvents((prev) => prev.filter((e) => e.id !== id));
//       } else {
//         showToast(json.error || "Delete failed", "error");
//       }
//     } catch {
//       showToast("Error deleting event", "error");
//     } finally {
//       setDeleting(null);
//     }
//   };

//   const toggleActive = async (event) => {
//     const token = localStorage.getItem("adminToken");
//     await fetch(`/api/events/${event.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         ...event,
//         activities: event.activities || [],
//         is_active: !event.is_active,
//       }),
//     });
//     fetchEvents();
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');
//         * { box-sizing: border-box; }
//         .ae-page { min-height: 100vh; background: #f3f7f4; font-family: 'DM Sans', sans-serif; }
//         .ae-topbar { background: #fff; border-bottom: 1px solid #e5ede8; padding: 16px 28px; display: flex; align-items: center; justify-content: space-between; }
//         .ae-topbar-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #1a2a1a; }
//         .ae-topbar-back { font-size: 0.82rem; color: #52b788; cursor: pointer; text-decoration: none; font-weight: 500; }
//         .ae-content { max-width: 860px; margin: 0 auto; padding: 32px 20px; }
//         .ae-header-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
//         .ae-section-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #1a2a1a; }
//         .ae-section-sub { font-size: 0.8rem; color: #74c69d; margin-top: 2px; }
//         .ae-btn-primary { background: linear-gradient(135deg, #2d6a4f, #1b4332); color: #fff; border: none; border-radius: 10px; padding: 10px 20px; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 3px 12px rgba(45,106,79,0.25); }
//         .ae-btn-primary:hover { transform: translateY(-1px); }
//         .ae-card { background: #fff; border: 1px solid #e5ede8; border-radius: 14px; overflow: hidden; margin-bottom: 14px; transition: box-shadow 0.2s; }
//         .ae-card:hover { box-shadow: 0 4px 18px rgba(0,0,0,0.07); }
//         .ae-card-img { width: 100%; height: 140px; object-fit: cover; display: block; }
//         .ae-card-img-placeholder { width: 100%; height: 80px; background: linear-gradient(135deg, #1a3a2a, #2d6a4f, #52b788); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.5); font-size: 0.78rem; }
//         .ae-card-body { padding: 16px 20px 20px; }
//         .ae-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
//         .ae-card-badge { display: inline-block; background: #d8f3dc; color: #1b4332; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 3px 9px; border-radius: 20px; margin-bottom: 7px; }
//         .ae-card-title { font-family: 'Playfair Display', serif; font-size: 1rem; color: #1a2a1a; margin-bottom: 2px; }
//         .ae-card-subtitle { font-size: 0.78rem; color: #52b788; font-weight: 500; margin-bottom: 8px; }
//         .ae-card-meta { font-size: 0.78rem; color: #6b7280; line-height: 1.7; }
//         .ae-card-meta strong { color: #374151; font-weight: 500; }
//         .ae-card-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
//         .ae-toggle-switch { width: 36px; height: 20px; background: #e5ede8; border-radius: 10px; position: relative; transition: background 0.2s; cursor: pointer; border: none; padding: 0; }
//         .ae-toggle-switch.on { background: #52b788; }
//         .ae-toggle-switch::after { content: ''; position: absolute; width: 14px; height: 14px; background: white; border-radius: 50%; top: 3px; left: 3px; transition: left 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
//         .ae-toggle-switch.on::after { left: 19px; }
//         .ae-btn-edit { background: #f0f9f3; border: 1px solid #b7e4c7; color: #2d6a4f; border-radius: 8px; padding: 7px 14px; font-size: 0.78rem; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.15s; }
//         .ae-btn-edit:hover { background: #d8f3dc; }
//         .ae-btn-delete { background: #fff5f5; border: 1px solid #fecaca; color: #dc2626; border-radius: 8px; padding: 7px 14px; font-size: 0.78rem; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.15s; }
//         .ae-btn-delete:hover { background: #fee2e2; }
//         .ae-btn-delete:disabled { opacity: 0.5; cursor: default; }
//         .ae-status { display: inline-flex; align-items: center; font-size: 0.72rem; font-weight: 500; padding: 3px 10px; border-radius: 20px; margin-top: 8px; }
//         .ae-status.active { background: #d8f3dc; color: #1b4332; }
//         .ae-status.inactive { background: #f3f4f6; color: #9ca3af; }
//         .ae-empty { text-align: center; padding: 60px 20px; background: #fff; border: 2px dashed #d8f3dc; border-radius: 16px; }
//         .ae-empty-icon { font-size: 3rem; margin-bottom: 12px; }
//         .ae-empty-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #1a2a1a; margin-bottom: 6px; }
//         .ae-empty-text { font-size: 0.85rem; color: #9ca3af; margin-bottom: 20px; }

//         /* FORM MODAL */
//         .ae-form-overlay { position: fixed; inset: 0; background: rgba(10,20,15,0.6); backdrop-filter: blur(4px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; }
//         .ae-form-modal { background: #fff; border-radius: 18px; width: 100%; max-width: 560px; max-height: 92vh; overflow-y: auto; padding: 28px; box-shadow: 0 20px 60px rgba(0,0,0,0.25); }
//         .ae-form-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #1a2a1a; margin-bottom: 20px; }
//         .ae-form-group { margin-bottom: 16px; }
//         .ae-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
//         .ae-label { display: block; font-size: 0.78rem; font-weight: 600; color: #374151; margin-bottom: 5px; }
//         .ae-label span { color: #dc2626; }
//         .ae-label em { font-weight: 400; font-style: normal; color: #9ca3af; font-size: 0.72rem; }
//         .ae-input, .ae-textarea { width: 100%; border: 1px solid #e5ede8; border-radius: 10px; padding: 10px 13px; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: #1a2a1a; background: #fafcfb; transition: border 0.2s; }
//         .ae-input:focus, .ae-textarea:focus { outline: none; border-color: #52b788; background: #fff; box-shadow: 0 0 0 3px rgba(82,183,136,0.12); }
//         .ae-textarea { resize: vertical; min-height: 80px; }
//         .ae-section-divider { border: none; border-top: 1px solid #e5ede8; margin: 20px 0; }
//         .ae-section-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #74c69d; margin-bottom: 14px; }
//         .ae-checkbox-row { display: flex; align-items: center; gap: 10px; }
//         .ae-checkbox { width: 18px; height: 18px; accent-color: #2d6a4f; cursor: pointer; }
//         .ae-form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 24px; }
//         .ae-btn-cancel { background: #f3f7f4; border: 1px solid #e5ede8; border-radius: 10px; padding: 10px 20px; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: #6b7280; cursor: pointer; font-weight: 500; }
//         .ae-btn-save { background: linear-gradient(135deg, #2d6a4f, #1b4332); color: #fff; border: none; border-radius: 10px; padding: 10px 24px; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 600; cursor: pointer; min-width: 120px; }
//         .ae-btn-save:disabled { opacity: 0.6; cursor: default; }
//         .ae-toast { position: fixed; bottom: 24px; right: 24px; padding: 12px 20px; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 500; z-index: 99999; box-shadow: 0 4px 16px rgba(0,0,0,0.15); animation: toastIn 0.3s ease; }
//         @keyframes toastIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
//         .ae-toast.success { background: #1b4332; color: #fff; }
//         .ae-toast.error { background: #7f1d1d; color: #fff; }
//         @media (max-width: 600px) { .ae-form-row { grid-template-columns: 1fr; } .ae-card-top { flex-direction: column; } }
//       `}</style>

//       <div className="ae-page mt-[70px]">
//         <div className="ae-topbar">
//           <span className="ae-topbar-title text-[2rem]">AHF Admin</span>
//           <a href="/admin/courses" className="ae-topbar-back text-[1.7rem]">
//             ← Back to Dashboard
//           </a>
//         </div>

//         <div className="ae-content">
//           <div className="ae-header-row">
//             <div>
//               <div className="ae-section-title">Community Events</div>
//               <div className="ae-section-sub">
//                 {events.length} event{events.length !== 1 ? "s" : ""} — shown as
//                 homepage popup
//               </div>
//             </div>
//             <button className="ae-btn-primary" onClick={openCreate}>
//               + Add New Event
//             </button>
//           </div>

//           {loading ? (
//             <div
//               style={{ textAlign: "center", padding: "40px", color: "#74c69d" }}
//             >
//               Loading events...
//             </div>
//           ) : events.length === 0 ? (
//             <div className="ae-empty">
//               <div className="ae-empty-icon">📋</div>
//               <div className="ae-empty-title">No events yet</div>
//               <div className="ae-empty-text">
//                 Create your first event and it will appear as a popup on your
//                 homepage.
//               </div>
//               <button className="ae-btn-primary" onClick={openCreate}>
//                 + Create First Event
//               </button>
//             </div>
//           ) : (
//             events.map((event) => (
//               <div className="ae-card" key={event.id}>
//                 {/* Event photo or gradient placeholder */}
//                 {event.image_url ? (
//                   <img
//                     src={event.image_url}
//                     alt={event.title}
//                     className="ae-card-img"
//                   />
//                 ) : (
//                   <div className="ae-card-img-placeholder">
//                     No photo uploaded
//                   </div>
//                 )}

//                 <div className="ae-card-body">
//                   <div className="ae-card-top">
//                     <div style={{ flex: 1 }}>
//                       <div className="ae-card-badge">{event.badge_label}</div>
//                       <div className="ae-card-title">{event.title}</div>
//                       {event.subtitle && (
//                         <div className="ae-card-subtitle">{event.subtitle}</div>
//                       )}
//                       <div className="ae-card-meta">
//                         📅 {event.date_text}
//                         <br />
//                         📍 {event.location}
//                         {event.activities?.length > 0 && (
//                           <>
//                             <br />
//                             🤝 {event.activities.join(" · ")}
//                           </>
//                         )}
//                         {event.account_number && (
//                           <>
//                             <br />
//                             🏦 {event.bank_name} —{" "}
//                             <strong>{event.account_number}</strong>
//                           </>
//                         )}
//                       </div>
//                       <span
//                         className={`ae-status ${event.is_active ? "active" : "inactive"}`}
//                       >
//                         {event.is_active ? "● Visible on homepage" : "○ Hidden"}
//                       </span>
//                     </div>
//                     <div className="ae-card-actions">
//                       <button
//                         className={`ae-toggle-switch ${event.is_active ? "on" : ""}`}
//                         onClick={() => toggleActive(event)}
//                         title={event.is_active ? "Hide" : "Show"}
//                       />
//                       <button
//                         className="ae-btn-edit"
//                         onClick={() => openEdit(event)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="ae-btn-delete"
//                         onClick={() => handleDelete(event.id)}
//                         disabled={deleting === event.id}
//                       >
//                         {deleting === event.id ? "..." : "Delete"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* FORM MODAL */}
//       {showForm && (
//         <div
//           className="ae-form-overlay"
//           onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
//         >
//           <div className="ae-form-modal">
//             <div className="ae-form-title">
//               {editingEvent ? "✏️ Edit Event" : "✨ Create New Event"}
//             </div>

//             <form onSubmit={handleSubmit}>
//               {/* EVENT PHOTO */}
//               <div className="ae-section-label">Event Photo</div>
//               <div className="ae-form-group">
//                 <CloudinaryImageUpload
//                   label="Upload a photo for this event"
//                   value={form.image_url}
//                   onChange={(url) => setForm({ ...form, image_url: url })}
//                 />
//               </div>

//               <hr className="ae-section-divider" />
//               <div className="ae-section-label">Basic Information</div>

//               <div className="ae-form-group">
//                 <label className="ae-label">
//                   Organization / Event Title <span>*</span>
//                 </label>
//                 <input
//                   className="ae-input"
//                   value={form.title}
//                   onChange={(e) => setForm({ ...form, title: e.target.value })}
//                   placeholder="e.g. Apiri Hallowed Foundation (AHF)"
//                   required
//                 />
//               </div>

//               <div className="ae-form-row">
//                 <div>
//                   <label className="ae-label">
//                     Subtitle <em>(optional)</em>
//                   </label>
//                   <input
//                     className="ae-input"
//                     value={form.subtitle}
//                     onChange={(e) =>
//                       setForm({ ...form, subtitle: e.target.value })
//                     }
//                     placeholder="e.g. Community Medical Outreach"
//                   />
//                 </div>
//                 <div>
//                   <label className="ae-label">Badge Label</label>
//                   <input
//                     className="ae-input"
//                     value={form.badge_label}
//                     onChange={(e) =>
//                       setForm({ ...form, badge_label: e.target.value })
//                     }
//                     placeholder="COMMUNITY INITIATIVE"
//                   />
//                 </div>
//               </div>

//               <div className="ae-form-group">
//                 <label className="ae-label">
//                   Date <span>*</span>
//                 </label>
//                 <input
//                   className="ae-input"
//                   value={form.date_text}
//                   onChange={(e) =>
//                     setForm({ ...form, date_text: e.target.value })
//                   }
//                   placeholder="e.g. Thursday 26th – Saturday 28th March 2026"
//                   required
//                 />
//               </div>

//               <div className="ae-form-group">
//                 <label className="ae-label">
//                   Location <span>*</span>
//                 </label>
//                 <input
//                   className="ae-input"
//                   value={form.location}
//                   onChange={(e) =>
//                     setForm({ ...form, location: e.target.value })
//                   }
//                   placeholder="e.g. Igue-ogie Community, Benin City, Edo State"
//                   required
//                 />
//               </div>

//               <div className="ae-form-group">
//                 <label className="ae-label">
//                   Activities <em>— separate with commas</em>
//                 </label>
//                 <textarea
//                   className="ae-textarea"
//                   value={form.activities}
//                   onChange={(e) =>
//                     setForm({ ...form, activities: e.target.value })
//                   }
//                   placeholder="Medical Outreach, Relief Item Distribution, Food Stuffs for Vulnerable Women (Widows)"
//                   rows={3}
//                 />
//               </div>

//               <hr className="ae-section-divider" />
//               <div className="ae-section-label">
//                 Support Account Details{" "}
//                 <em
//                   style={{
//                     textTransform: "none",
//                     letterSpacing: 0,
//                     fontWeight: 400,
//                     color: "#9ca3af",
//                   }}
//                 >
//                   (optional)
//                 </em>
//               </div>

//               <div className="ae-form-group">
//                 <label className="ae-label">Account Name</label>
//                 <input
//                   className="ae-input"
//                   value={form.account_name}
//                   onChange={(e) =>
//                     setForm({ ...form, account_name: e.target.value })
//                   }
//                   placeholder="e.g. Apiri Hallowed Foundation"
//                 />
//               </div>

//               <div className="ae-form-row">
//                 <div>
//                   <label className="ae-label">Account Number</label>
//                   <input
//                     className="ae-input"
//                     value={form.account_number}
//                     onChange={(e) =>
//                       setForm({ ...form, account_number: e.target.value })
//                     }
//                     placeholder="1234567890"
//                   />
//                 </div>
//                 <div>
//                   <label className="ae-label">Bank Name</label>
//                   <input
//                     className="ae-input"
//                     value={form.bank_name}
//                     onChange={(e) =>
//                       setForm({ ...form, bank_name: e.target.value })
//                     }
//                     placeholder="e.g. First Bank"
//                   />
//                 </div>
//               </div>

//               <hr className="ae-section-divider" />
//               <div className="ae-section-label">Call to Action Button</div>

//               <div className="ae-form-group">
//                 <label className="ae-label">Button Text</label>
//                 <input
//                   className="ae-input"
//                   value={form.cta_text}
//                   onChange={(e) =>
//                     setForm({ ...form, cta_text: e.target.value })
//                   }
//                   placeholder="Join Us to Make This a Reality"
//                 />
//               </div>

//               <div className="ae-form-group">
//                 <label className="ae-label">Button Subtext</label>
//                 <input
//                   className="ae-input"
//                   value={form.cta_subtext}
//                   onChange={(e) =>
//                     setForm({ ...form, cta_subtext: e.target.value })
//                   }
//                   placeholder="Your support transforms lives in our community"
//                 />
//               </div>

//               <hr className="ae-section-divider" />

//               <div className="ae-form-row">
//                 <div>
//                   <label className="ae-label">
//                     Display Order <em>(lower = first)</em>
//                   </label>
//                   <input
//                     type="number"
//                     className="ae-input"
//                     value={form.display_order}
//                     onChange={(e) =>
//                       setForm({
//                         ...form,
//                         display_order: parseInt(e.target.value) || 0,
//                       })
//                     }
//                     min="0"
//                   />
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     paddingTop: "22px",
//                   }}
//                 >
//                   <label className="ae-checkbox-row">
//                     <input
//                       type="checkbox"
//                       className="ae-checkbox"
//                       checked={form.is_active}
//                       onChange={(e) =>
//                         setForm({ ...form, is_active: e.target.checked })
//                       }
//                     />
//                     <span style={{ fontSize: "0.85rem", color: "#374151" }}>
//                       Show on homepage
//                     </span>
//                   </label>
//                 </div>
//               </div>

//               <div className="ae-form-actions">
//                 <button
//                   type="button"
//                   className="ae-btn-cancel"
//                   onClick={() => setShowForm(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="ae-btn-save" disabled={saving}>
//                   {saving
//                     ? "Saving..."
//                     : editingEvent
//                       ? "Update Event"
//                       : "Create Event"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {toast && <div className={`ae-toast ${toast.type}`}>{toast.msg}</div>}
//     </>
//   );
// }

"use client";
// app/admin/events/page.jsx

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CloudinaryImageUpload from "@/components/CloudinaryImageUpload";

const EMPTY_FORM = {
  title: "",
  subtitle: "",
  badge_label: "COMMUNITY INITIATIVE",
  date_text: "",
  location: "",
  activities: "",
  account_name: "",
  account_number: "",
  bank_name: "",
  cta_text: "Join Us to Make This a Reality",
  cta_subtext: "Your support transforms lives in our community",
  image_url: "",
  is_active: true,
  display_order: 0,
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [toast, setToast] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      router.push("/admin/login");
      return;
    }
    fetchEvents();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("adminToken");
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.push("/admin/login");
  };

  //   useEffect(() => {
  //     fetchEvents();
  //   }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) setEvents(json.data || []);
    } catch {
      showToast("Failed to fetch events", "error");
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingEvent(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (event) => {
    setEditingEvent(event);
    setForm({
      title: event.title || "",
      subtitle: event.subtitle || "",
      badge_label: event.badge_label || "COMMUNITY INITIATIVE",
      date_text: event.date_text || "",
      location: event.location || "",
      activities: Array.isArray(event.activities)
        ? event.activities.join(", ")
        : "",
      account_name: event.account_name || "",
      account_number: event.account_number || "",
      bank_name: event.bank_name || "",
      cta_text: event.cta_text || "Join Us to Make This a Reality",
      cta_subtext:
        event.cta_subtext || "Your support transforms lives in our community",
      image_url: event.image_url || "",
      is_active: event.is_active !== false,
      display_order: event.display_order || 0,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem("adminToken");
      const url = editingEvent
        ? `/api/events/${editingEvent.id}`
        : "/api/events";
      const method = editingEvent ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        showToast(editingEvent ? "Event updated!" : "Event created!");
        setShowForm(false);
        fetchEvents();
      } else {
        showToast(json.error || "Failed to save", "error");
      }
    } catch {
      showToast("Error saving event", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this event? This cannot be undone.")) return;
    setDeleting(id);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        showToast("Event deleted");
        setEvents((prev) => prev.filter((e) => e.id !== id));
      } else {
        showToast(json.error || "Delete failed", "error");
      }
    } catch {
      showToast("Error deleting event", "error");
    } finally {
      setDeleting(null);
    }
  };

  const toggleActive = async (event) => {
    const token = localStorage.getItem("adminToken");
    await fetch(`/api/events/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...event,
        activities: event.activities || [],
        is_active: !event.is_active,
      }),
    });
    fetchEvents();
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 transition-all";
  const labelClass =
    "block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide";

  return (
    <div className="min-h-screen bg-gray-50 mt-[70px]">
      {/* TOP BAR */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Upcoming Events</h1>
        <a
          href="/admin/courses"
          className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
        >
          ← Back to Dashboard
        </a>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-8">
        {/* HEADER ROW */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-500 text-sm">
              {events.length} event{events.length !== 1 ? "s" : ""} — shown as
              homepage popup
            </p>
          </div>
          <button
            onClick={openCreate}
            className="bg-gradient-to-r from-green-700 to-green-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-transform shadow-md shadow-green-900/20"
          >
            + Add New Event
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-16 text-green-400 font-medium">
            Loading events...
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && events.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-green-100">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              No events yet
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Create your first event and it will appear as a popup on your
              homepage.
            </p>
            <button
              onClick={openCreate}
              className="bg-gradient-to-r from-green-700 to-green-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md"
            >
              + Create First Event
            </button>
          </div>
        )}

        {/* EVENTS LIST */}
        {!loading &&
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4 hover:shadow-md transition-shadow"
            >
              {/* Event photo */}
              {event.image_url ? (
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-[250px] object-cover object-top"
                />
              ) : (
                <div className="w-full h-16 bg-gradient-to-r from-green-950 via-green-800 to-green-500 flex items-center justify-center">
                  <span className="text-white/40 text-xs">
                    No photo uploaded
                  </span>
                </div>
              )}

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  {/* Info */}
                  <div className="flex-1">
                    <span className="inline-block bg-green-100 text-green-800 text-[0.6rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2">
                      {event.badge_label}
                    </span>
                    <h3 className="font-bold text-gray-800 text-base mb-0.5">
                      {event.title}
                    </h3>
                    {event.subtitle && (
                      <p className="text-sm text-green-500 font-medium mb-2">
                        {event.subtitle}
                      </p>
                    )}
                    <div className="text-sm text-gray-500 space-y-0.5 leading-relaxed">
                      <p>📅 {event.date_text}</p>
                      <p>📍 {event.location}</p>
                      {event.activities?.length > 0 && (
                        <p>🤝 {event.activities.join(" · ")}</p>
                      )}
                      {event.account_number && (
                        <p>
                          🏦 {event.bank_name} —{" "}
                          <strong className="text-gray-700">
                            {event.account_number}
                          </strong>
                        </p>
                      )}
                    </div>
                    <span
                      className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full mt-3 ${event.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-400"}`}
                    >
                      {event.is_active ? "● Visible on homepage" : "○ Hidden"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Toggle switch */}
                    <button
                      onClick={() => toggleActive(event)}
                      title={
                        event.is_active ? "Click to hide" : "Click to show"
                      }
                      className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${event.is_active ? "bg-green-400" : "bg-gray-200"}`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${event.is_active ? "left-5" : "left-1"}`}
                      />
                    </button>

                    <button
                      onClick={() => openEdit(event)}
                      className="text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 hover:bg-green-100 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      disabled={deleting === event.id}
                      className="text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      {deleting === event.id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* ── FORM MODAL ── */}
      {showForm && (
        <div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-5"
          onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-y-auto"
            style={{ maxHeight: "92vh" }}
          >
            <div className="px-7 pt-7 pb-2">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                {editingEvent ? "✏️ Edit Event" : "✨ Create New Event"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* PHOTO */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-green-400 mb-3">
                    Event Photo
                  </p>
                  <CloudinaryImageUpload
                    label="Upload a photo for this event"
                    value={form.image_url}
                    onChange={(url) => setForm({ ...form, image_url: url })}
                  />
                </div>

                <hr className="border-gray-100" />
                <p className="text-xs font-bold uppercase tracking-widest text-green-400">
                  Basic Information
                </p>

                {/* Title */}
                <div>
                  <label className={labelClass}>
                    Organization / Event Title{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="e.g. Apiri Hallowed Foundation (AHF)"
                    required
                  />
                </div>

                {/* Subtitle + Badge */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Subtitle{" "}
                      <span className="text-gray-400 normal-case font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      className={inputClass}
                      value={form.subtitle}
                      onChange={(e) =>
                        setForm({ ...form, subtitle: e.target.value })
                      }
                      placeholder="e.g. Community Medical Outreach"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Badge Label</label>
                    <input
                      className={inputClass}
                      value={form.badge_label}
                      onChange={(e) =>
                        setForm({ ...form, badge_label: e.target.value })
                      }
                      placeholder="COMMUNITY INITIATIVE"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className={labelClass}>
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    value={form.date_text}
                    onChange={(e) =>
                      setForm({ ...form, date_text: e.target.value })
                    }
                    placeholder="e.g. Thursday 26th – Saturday 28th March 2026"
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className={labelClass}>
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    placeholder="e.g. Igue-ogie Community, Benin City, Edo State"
                    required
                  />
                </div>

                {/* Activities */}
                <div>
                  <label className={labelClass}>
                    Activities{" "}
                    <span className="text-gray-400 normal-case font-normal">
                      — separate with commas
                    </span>
                  </label>
                  <textarea
                    className={inputClass}
                    value={form.activities}
                    onChange={(e) =>
                      setForm({ ...form, activities: e.target.value })
                    }
                    placeholder="Medical Outreach, Relief Item Distribution, Food Stuffs for Vulnerable Women"
                    rows={3}
                    style={{ resize: "vertical" }}
                  />
                </div>

                <hr className="border-gray-100" />
                <p className="text-xs font-bold uppercase tracking-widest text-green-400">
                  Support Account Details{" "}
                  <span className="text-gray-400 normal-case font-normal">
                    (optional)
                  </span>
                </p>

                {/* Account Name */}
                <div>
                  <label className={labelClass}>Account Name</label>
                  <input
                    className={inputClass}
                    value={form.account_name}
                    onChange={(e) =>
                      setForm({ ...form, account_name: e.target.value })
                    }
                    placeholder="e.g. Apiri Hallowed Foundation"
                  />
                </div>

                {/* Account Number + Bank */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Account Number</label>
                    <input
                      className={inputClass}
                      value={form.account_number}
                      onChange={(e) =>
                        setForm({ ...form, account_number: e.target.value })
                      }
                      placeholder="1234567890"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Bank Name</label>
                    <input
                      className={inputClass}
                      value={form.bank_name}
                      onChange={(e) =>
                        setForm({ ...form, bank_name: e.target.value })
                      }
                      placeholder="e.g. First Bank"
                    />
                  </div>
                </div>

                <hr className="border-gray-100" />
                <p className="text-xs font-bold uppercase tracking-widest text-green-400">
                  Call to Action Button
                </p>

                {/* CTA Text */}
                <div>
                  <label className={labelClass}>Button Text</label>
                  <input
                    className={inputClass}
                    value={form.cta_text}
                    onChange={(e) =>
                      setForm({ ...form, cta_text: e.target.value })
                    }
                    placeholder="Join Us to Make This a Reality"
                  />
                </div>

                {/* CTA Subtext */}
                <div>
                  <label className={labelClass}>Button Subtext</label>
                  <input
                    className={inputClass}
                    value={form.cta_subtext}
                    onChange={(e) =>
                      setForm({ ...form, cta_subtext: e.target.value })
                    }
                    placeholder="Your support transforms lives in our community"
                  />
                </div>

                <hr className="border-gray-100" />

                {/* Order + Visibility */}
                <div className="grid grid-cols-2 gap-4 items-center">
                  <div>
                    <label className={labelClass}>
                      Display Order{" "}
                      <span className="text-gray-400 normal-case font-normal">
                        (lower = first)
                      </span>
                    </label>
                    <input
                      type="number"
                      className={inputClass}
                      value={form.display_order}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          display_order: parseInt(e.target.value) || 0,
                        })
                      }
                      min="0"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-5">
                    <input
                      type="checkbox"
                      id="is_active"
                      className="w-4 h-4 accent-green-700 cursor-pointer"
                      checked={form.is_active}
                      onChange={(e) =>
                        setForm({ ...form, is_active: e.target.checked })
                      }
                    />
                    <label
                      htmlFor="is_active"
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      Show on homepage
                    </label>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex items-center justify-end gap-3 pt-2 pb-7">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl px-5 py-2.5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="text-sm font-semibold text-white bg-gradient-to-r from-green-700 to-green-900 rounded-xl px-6 py-2.5 hover:-translate-y-0.5 transition-transform shadow-md disabled:opacity-60 disabled:translate-y-0"
                  >
                    {saving
                      ? "Saving..."
                      : editingEvent
                        ? "Update Event"
                        : "Create Event"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[99999] px-5 py-3 rounded-xl text-sm font-medium text-white shadow-lg ${toast.type === "error" ? "bg-red-800" : "bg-green-900"}`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
