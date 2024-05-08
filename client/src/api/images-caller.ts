export const uploadImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('images', imageFile);

  const response = await fetch('/api/images', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    console.log('Cannot upload image.');
  }

  return await response.json();
};
