export const locationImages = [
  "/images/locations/location-1.png",
  "/images/locations/location-2.png",
  "/images/locations/location-3.png",
  "/images/locations/location-4.png",
  "/images/locations/location-5.png",
  "/images/locations/location-6.png",
  "/images/locations/location-7.png",
  "/images/locations/location-8.png",
  "/images/locations/location-9.png",
  "/images/locations/location-10.png",
  "/images/locations/location-11.png",
  "/images/locations/location-12.png",
];

export function getLocationImage(slug: string) {
  const hash = Array.from(slug).reduce((total, char) => total + char.charCodeAt(0), 0);
  return locationImages[hash % locationImages.length];
}
