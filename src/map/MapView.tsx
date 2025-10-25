import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { OverlayCanvas } from "./OverlayCanvas";
import { useGameStore } from "../state/store";
import { latLngToGridIndex } from "../utils/geo";

const TORONTO_COORDS: L.LatLngTuple = [43.6532, -79.3832];

export function MapView(): JSX.Element {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const bbox = useGameStore((state) => state.bbox);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return;
    }

    const map = L.map(mapContainerRef.current, {
      center: TORONTO_COORDS,
      zoom: 14,
      minZoom: 12,
      maxZoom: 18,
      zoomControl: false
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const bounds = L.latLngBounds([
      [bbox.south, bbox.west],
      [bbox.north, bbox.east]
    ]);
    map.fitBounds(bounds, { animate: false });
    map.setMaxBounds(bounds.pad(0.25));

    const handleClick = (event: L.LeafletMouseEvent) => {
      const state = useGameStore.getState();
      const index = latLngToGridIndex(event.latlng, state.bbox, state.gridWidth, state.gridHeight);
      if (index === null) {
        return;
      }

      const cell = state.grid[index];
      if (!cell) {
        return;
      }

      if (cell.tileId && (!state.selectedTile || cell.tileId === state.selectedTile)) {
        state.removeTile(index);
        return;
      }

      if (state.selectedTile) {
        state.placeTile(index, state.selectedTile);
      }
    };

    map.on("click", handleClick);

    mapRef.current = map;

    return () => {
      map.off("click", handleClick);
      map.remove();
      mapRef.current = null;
    };
  }, [bbox]);

  useEffect(() => {
    if (!mapRef.current) return;
    const bounds = L.latLngBounds([
      [bbox.south, bbox.west],
      [bbox.north, bbox.east]
    ]);
    mapRef.current.fitBounds(bounds, { animate: false });
    mapRef.current.setMaxBounds(bounds.pad(0.25));
  }, [bbox]);

  return (
    <div className="relative flex-1">
      <div ref={mapContainerRef} className="h-full w-full" />
      <OverlayCanvas map={mapRef} />
    </div>
  );
}
