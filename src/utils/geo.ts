import L from "leaflet";

export interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
}

export function createBoundingBox(center: L.LatLngTuple, sizeMeters: number): BoundingBox {
  const [lat, lng] = center;
  const halfSize = sizeMeters / 2;
  const earthRadius = 6_371_000;
  const latOffset = (halfSize / earthRadius) * (180 / Math.PI);
  const lngOffset = (halfSize / (earthRadius * Math.cos((Math.PI * lat) / 180))) * (180 / Math.PI);

  return {
    north: lat + latOffset,
    south: lat - latOffset,
    east: lng + lngOffset,
    west: lng - lngOffset
  };
}

export function metersToLatLngBounds(center: L.LatLngTuple, sizeMeters: number): L.LatLngBoundsExpression {
  const bbox = createBoundingBox(center, sizeMeters);
  return [
    [bbox.south, bbox.west],
    [bbox.north, bbox.east]
  ];
}

export function projectLatLngToContainerPoint(map: L.Map, coords: L.LatLngTuple): L.Point {
  return map.latLngToContainerPoint(coords);
}

export function latLngToGridIndex(
  latlng: L.LatLngExpression,
  bbox: BoundingBox,
  gridWidth: number,
  gridHeight: number
): number | null {
  if (gridWidth <= 0 || gridHeight <= 0) {
    return null;
  }

  const point = L.latLng(latlng);
  const { lat, lng } = point;

  if (lat > bbox.north || lat < bbox.south || lng > bbox.east || lng < bbox.west) {
    return null;
  }

  const latRange = bbox.north - bbox.south;
  const lngRange = bbox.east - bbox.west;

  if (latRange === 0 || lngRange === 0) {
    return null;
  }

  const rowFraction = (bbox.north - lat) / latRange;
  const colFraction = (lng - bbox.west) / lngRange;

  const row = Math.min(gridHeight - 1, Math.max(0, Math.floor(rowFraction * gridHeight)));
  const col = Math.min(gridWidth - 1, Math.max(0, Math.floor(colFraction * gridWidth)));

  return row * gridWidth + col;
}

export function gridCellToLatLngBounds(
  row: number,
  col: number,
  bbox: BoundingBox,
  gridWidth: number,
  gridHeight: number
): BoundingBox {
  const latRange = bbox.north - bbox.south;
  const lngRange = bbox.east - bbox.west;
  const latStep = latRange / gridHeight;
  const lngStep = lngRange / gridWidth;

  const north = bbox.north - row * latStep;
  const south = north - latStep;
  const west = bbox.west + col * lngStep;
  const east = west + lngStep;

  return { north, south, east, west };
}
