const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function GoogleMap({
  type,
  address,
  lat,
  lng,
}: {
  type: string;
  address: string;
  lat: string;
  lng: string;
}) {
  let googleMapsUrl = "";
  console.log(lat, lng);
  if (type === "streetview" && lat && lng) {
    googleMapsUrl = `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${lat},${lng}`;
  }
  if (type === "map") {
    googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
      address
    )}`;
  }

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <iframe
        title="Google Maps"
        src={googleMapsUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

export default GoogleMap;
