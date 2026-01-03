import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables!');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper functions to make database operations easier
export const db = {
  // Get all courses
  getCourses: async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get one course by ID
  getCourse: async (id) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create a new course (admin only)
  createCourse: async (courseData) => {
    const { data, error } = await supabase
      .from('courses')
      .insert([courseData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update a course (admin only)
  updateCourse: async (id, courseData) => {
    const { data, error } = await supabase
      .from('courses')
      .update({ ...courseData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete a course (admin only)
  deleteCourse: async (id) => {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Enrollment functions
  createEnrollment: async (enrollmentData) => {
    const { data, error } = await supabase
      .from('enrollments')
      .insert([enrollmentData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Check if user already enrolled
  checkEnrollment: async (userEmail, courseId) => {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_email', userEmail.toLowerCase())
      .eq('course_id', courseId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
    return data;
  },

  // Get user's enrollments
  getUserEnrollments: async (userEmail) => {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        courses (*)
      `)
      .eq('user_email', userEmail.toLowerCase())
      .order('enrolled_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get all enrollments (admin)
  getAllEnrollments: async () => {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        courses (*)
      `)
      .order('enrolled_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Update enrollment (admin - approve payment)
  updateEnrollment: async (id, updates) => {
    const { data, error } = await supabase
      .from('enrollments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Increment student count
  incrementStudents: async (courseId) => {
    const course = await db.getCourse(courseId);
    const { error } = await supabase
      .from('courses')
      .update({ students: (course.students || 0) + 1 })
      .eq('id', courseId);
    
    if (error) throw error;
    return true;
  }
};