import { MutableRefObject, useEffect, useRef } from "react";
import type { Map } from "leaflet";
import { useGameStore } from "../state/store";
import { gridCellToLatLngBounds, projectLatLngToContainerPoint } from "../utils/geo";
import type { TileId } from "../data/tiles";

const TILE_COLORS: Record<TileId, string> = {
  PowerLine: "rgba(96, 165, 250, 0.35)",
  Substation: "rgba(129, 140, 248, 0.35)",
  House: "rgba(74, 222, 128, 0.35)",
  Factory: "rgba(248, 113, 113, 0.35)",
  Park: "rgba(34, 197, 94, 0.35)",
  CoalPlant: "rgba(148, 163, 184, 0.45)",
  WindTurbine: "rgba(96, 165, 250, 0.45)",
  SolarFarm: "rgba(253, 224, 71, 0.4)",
  Battery: "rgba(248, 250, 252, 0.4)"
};

export interface OverlayCanvasProps {
  map: MutableRefObject<Map | null>;
}

export function OverlayCanvas({ map }: OverlayCanvasProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const leafletMap = map.current;
    const canvas = canvasRef.current;
    if (!leafletMap || !canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { clientWidth, clientHeight } = parent;
      const pixelRatio = window.devicePixelRatio;
      canvas.width = clientWidth * pixelRatio;
      canvas.height = clientHeight * pixelRatio;
      canvas.style.width = `${clientWidth}px`;
      canvas.style.height = `${clientHeight}px`;
      drawGrid();
    };

    const drawGrid = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const state = useGameStore.getState();
      const { overlayVisible, bbox, gridWidth, gridHeight, grid } = state;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!overlayVisible) {
        return;
      }

      if (gridWidth <= 0 || gridHeight <= 0) {
        return;
      }

      const pixelRatio = window.devicePixelRatio;
      ctx.save();
      ctx.scale(pixelRatio, pixelRatio);

      const latStep = (bbox.north - bbox.south) / gridHeight;
      const lngStep = (bbox.east - bbox.west) / gridWidth;

      for (let row = 0; row < gridHeight; row++) {
        for (let col = 0; col < gridWidth; col++) {
          const cell = grid[row * gridWidth + col];
          if (!cell?.tileId) continue;
          const bounds = gridCellToLatLngBounds(row, col, bbox, gridWidth, gridHeight);
          const nw = projectLatLngToContainerPoint(leafletMap, [bounds.north, bounds.west]);
          const ne = projectLatLngToContainerPoint(leafletMap, [bounds.north, bounds.east]);
          const se = projectLatLngToContainerPoint(leafletMap, [bounds.south, bounds.east]);
          const sw = projectLatLngToContainerPoint(leafletMap, [bounds.south, bounds.west]);

          ctx.beginPath();
          ctx.moveTo(nw.x, nw.y);
          ctx.lineTo(ne.x, ne.y);
          ctx.lineTo(se.x, se.y);
          ctx.lineTo(sw.x, sw.y);
          ctx.closePath();
          ctx.fillStyle = TILE_COLORS[cell.tileId] ?? "rgba(148, 163, 184, 0.25)";
          ctx.fill();
        }
      }

      ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
      ctx.lineWidth = 1;

      for (let col = 0; col <= gridWidth; col++) {
        const lng = bbox.west + lngStep * col;
        const start = projectLatLngToContainerPoint(leafletMap, [bbox.north, lng]);
        const end = projectLatLngToContainerPoint(leafletMap, [bbox.south, lng]);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }

      for (let row = 0; row <= gridHeight; row++) {
        const lat = bbox.north - latStep * row;
        const start = projectLatLngToContainerPoint(leafletMap, [lat, bbox.west]);
        const end = projectLatLngToContainerPoint(leafletMap, [lat, bbox.east]);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }

      ctx.restore();
    };

    const handleMove = () => drawGrid();

    resize();
    leafletMap.on("move", handleMove);
    leafletMap.on("zoom", handleMove);
    window.addEventListener("resize", resize);

    const unsubscribe = useGameStore.subscribe(
      (state) => ({
        grid: state.grid,
        overlayVisible: state.overlayVisible,
        bbox: state.bbox
      }),
      () => drawGrid()
    );

    return () => {
      leafletMap.off("move", handleMove);
      leafletMap.off("zoom", handleMove);
      window.removeEventListener("resize", resize);
      unsubscribe();
    };
  }, [map]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />;
}
