/**
 * Laduma GPS Telemetry Data Parser
 *
 * Assumptions:
 * - CSV columns: rowname (GPS fix ID), x (longitude), y (latitude)
 * - Delimiter: comma (with trailing ";;;" artifacts ignored)
 * - Coordinate system: WGS84 decimal degrees
 * - x ≈ 18.x (longitude, Cape Town region)
 * - y ≈ -33.x to -34.x (latitude, Cape Town region)
 * - "Laduma" is a Cape caracal tracked via GPS collar
 */

import rawCsv from "/Laduma rxy.csv?raw";

// ---------- Types ----------

export interface LadumaPoint {
    rowname: string;
    longitude: number;
    latitude: number;
    cluster: "cape-peninsula-south" | "fynbos-core" | "urban-suburban";
}

export interface SkippedRow {
    lineNumber: number;
    raw: string;
    reason: string;
}

export type ClusterKey = LadumaPoint["cluster"];

export const CLUSTER_META: Record<
    ClusterKey,
    { label: string; color: string; description: string }
> = {
    "cape-peninsula-south": {
        label: "Cape Peninsula South",
        color: "#ef4444", // red-500
        description: "Points south of −34.0° latitude (coastal / peninsula tip)",
    },
    "fynbos-core": {
        label: "Fynbos Core",
        color: "#f97316", // orange-500
        description:
            "Points between −34.0° and −33.96° latitude (Table Mountain fynbos belt)",
    },
    "urban-suburban": {
        label: "Urban / Suburban",
        color: "#14b8a6", // teal-500
        description:
            "Points north of −33.96° latitude (suburban Cape Town fringe)",
    },
};

// ---------- Parsing ----------

function classifyPoint(lat: number): LadumaPoint["cluster"] {
    if (lat < -34.0) return "cape-peninsula-south";
    if (lat < -33.96) return "fynbos-core";
    return "urban-suburban";
}

function parseCsv(raw: string): {
    points: LadumaPoint[];
    skipped: SkippedRow[];
} {
    const lines = raw
        .split(/\r?\n/)
        .map((l) => l.replace(/;+$/, "").trim())
        .filter((l) => l.length > 0);

    const points: LadumaPoint[] = [];
    const skipped: SkippedRow[] = [];

    // Skip header (line index 0)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        // Some lines have trailing data after ;;; (e.g. line 3 has a trailing ID)
        const parts = line.split(",");

        if (parts.length < 3) {
            skipped.push({
                lineNumber: i + 1,
                raw: line,
                reason: "Fewer than 3 comma-separated fields",
            });
            continue;
        }

        const rowname = parts[0].trim();
        const xStr = parts[1].trim();
        const yStr = parts[2].trim();

        const lon = parseFloat(xStr);
        const lat = parseFloat(yStr);

        if (isNaN(lon) || isNaN(lat)) {
            skipped.push({
                lineNumber: i + 1,
                raw: line,
                reason: `Non-numeric coordinate(s): x="${xStr}", y="${yStr}"`,
            });
            continue;
        }

        // Sanity bounds for Cape Town region
        if (lon < 17 || lon > 20 || lat < -35 || lat > -33) {
            skipped.push({
                lineNumber: i + 1,
                raw: line,
                reason: `Out of expected range: lon=${lon}, lat=${lat}`,
            });
            continue;
        }

        points.push({
            rowname,
            longitude: lon,
            latitude: lat,
            cluster: classifyPoint(lat),
        });
    }

    return { points, skipped };
}

// ---------- Exported data (parsed once at module load) ----------

const { points, skipped } = parseCsv(rawCsv);

export const ladumaPoints: LadumaPoint[] = points;
export const skippedRows: SkippedRow[] = skipped;

// Summary stats
export const summary = {
    totalCsvRows: rawCsv.split(/\r?\n/).filter((l) => l.trim().length > 0).length - 1,
    validPoints: points.length,
    skippedCount: skipped.length,
    lonRange: {
        min: Math.min(...points.map((p) => p.longitude)),
        max: Math.max(...points.map((p) => p.longitude)),
    },
    latRange: {
        min: Math.min(...points.map((p) => p.latitude)),
        max: Math.max(...points.map((p) => p.latitude)),
    },
    centroid: {
        lon:
            points.reduce((s, p) => s + p.longitude, 0) / (points.length || 1),
        lat:
            points.reduce((s, p) => s + p.latitude, 0) / (points.length || 1),
    },
    clusterCounts: {
        "cape-peninsula-south": points.filter(
            (p) => p.cluster === "cape-peninsula-south"
        ).length,
        "fynbos-core": points.filter((p) => p.cluster === "fynbos-core").length,
        "urban-suburban": points.filter((p) => p.cluster === "urban-suburban")
            .length,
    },
};
