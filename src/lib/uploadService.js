import supabase from "./supabaseClient";

export async function uploadImage(file) {
  // création du nom de l'image (unique)
  const filePath = `blogs/${Date.now()}_${file.name}`;

  const { error } = await supabase.storage
    .from("blog-images")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath);

  return data.publicUrl;
}

export async function uploadAvatar(file) {
  console.log(file);

  const filePath = `blogs/${Date.now()}_${file.name}`;

  const { error } = await supabase.storage
    .from("blog-images")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath);

  return data.publicUrl;
}
