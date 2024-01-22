import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const isEditSession = Boolean(id);

  const hasImagePath = newCabin.image?.startwith?.(supabaseUrl);

  const imageName = hasImagePath
    ? newCabin.image
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://akwpdzgjnmawhfxnvwur.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  let query = supabase.from("cabins");
  const newImage = hasImagePath ? newCabin.image : imagePath;

  if (!id) query = query.insert([{ ...newCabin, image: newImage }]);

  if (id)
    query = query.update([{ ...newCabin, image: newImage }]).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Cabins could not be ${isEditSession
       ? "edited" : "created"}`);
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(error);
    throw new Error(
      "Cabins image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
