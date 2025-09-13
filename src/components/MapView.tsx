"use client";

// reference:
// https://www.airbnb.co.in/s/homes?refinement_paths%5B%5D=%2Fhomes&location_search=NEARBY&source=structured_search_input_header&search_type=user_map_move&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2025-10-01&monthly_length=3&monthly_end_date=2026-01-01&search_mode=regular_search&price_filter_input_type=2&channel=EXPLORE&ne_lat=23.413511530208332&ne_lng=72.80899809558258&sw_lat=23.115363453984454&sw_lng=72.57390669368388&zoom=11.455252656386657&zoom_level=11.455252656386657&search_by_map=true&price_filter_num_nights=5

import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import Image from "next/image";
import { useState } from "react";

type Property = {
  id: number;
  lat: number;
  lng: number;
  price: number;
  title: string;
  nights: number;
  startDate: string;
  endDate: string;
  image: string;
};

const properties: Property[] = [
  {
    id: 1,
    lat: 23.043,
    lng: 72.565,
    price: 16205,
    title: "Vision Fortune",
    nights: 5,
    startDate: "8 Sept",
    endDate: "13 Sept",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // Unsplash, royalty free
  },
  {
    id: 2,
    lat: 23.056,
    lng: 72.588,
    price: 23109,
    title: "Luxury Villa",
    nights: 3,
    startDate: "10 Sept",
    endDate: "13 Sept",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80", // Unsplash, royalty free
  },
  {
    id: 3,
    lat: 23.069,
    lng: 72.59,
    price: 12553,
    title: "Cozy Apartment",
    nights: 4,
    startDate: "9 Sept",
    endDate: "13 Sept",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80", // Unsplash, royalty free
  },
];

const center = {
  lat: 23.0225,
  lng: 72.5714,
};

export default function RealEstateMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  if (!isLoaded) {
    return <div className="animate-pulse w-screen h-screen bg-slate-700" />;
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100dvw",
        height: "100dvh",
      }}
      center={center}
      zoom={13}
    >
      {properties?.map((property) => (
        <Marker
          key={property?.id}
          position={{ lat: property?.lat, lng: property?.lng }}
          onClick={() => setSelectedProperty(property)}
          cursor="pointer"
          icon="/null.svg"
          label={{
            text: `₹${property?.price}`,
            className:
              "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 !text-white rounded-full px-2 py-1 font-extrabold shadow-xl border-2 border-white drop-shadow-lg shadow-2xl",
          }}
        />
      ))}

      {selectedProperty && (
        <InfoWindow
          position={{ lat: selectedProperty?.lat, lng: selectedProperty?.lng }}
          onCloseClick={() => setSelectedProperty(null)}
        >
          <div
            className="max-w-xs bg-white rounded-lg shadow-lg p-4"
            style={{ minWidth: "220px" }}
          >
            {selectedProperty?.image && (
              <Image
                src={selectedProperty?.image ?? ""}
                alt={selectedProperty?.title ?? "Property Image"}
                width={320}
                height={128}
                className="w-full h-32 object-cover rounded mb-3"
              />
            )}
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {selectedProperty?.title}
            </h3>
            <p className="text-green-600 font-bold text-base mb-1">
              ₹{selectedProperty?.price?.toLocaleString?.()}{" "}
              <span className="text-gray-500 font-normal">
                for {selectedProperty?.nights} night
                {(selectedProperty?.nights ?? 0) > 1 ? "s" : ""}
              </span>
            </p>
            <p className="text-sm text-gray-600 mb-2">
              {selectedProperty?.startDate} - {selectedProperty?.endDate}
            </p>
            <button
              type="button"
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded transition"
            >
              View Details
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
