export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

const STORAGE_KEY = 'gallery_data';

const DEFAULT_CATEGORIES = [
  "Architecture",
  "Accommodation",
  "Wellness",
  "Experiences",
  "Destinations",
  "Interiors",
  "Dining",
];

// We store only admin-added images; built-in images are handled separately
export const getGalleryImages = (): GalleryImage[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
};

export const addGalleryImage = (image: Omit<GalleryImage, 'id'>): GalleryImage => {
  const images = getGalleryImages();
  const newImage: GalleryImage = { ...image, id: `gallery-${Date.now()}` };
  images.push(newImage);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  return newImage;
};

export const deleteGalleryImage = (id: string): void => {
  const images = getGalleryImages().filter(img => img.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
};

export const getCategories = (): string[] => DEFAULT_CATEGORIES;
