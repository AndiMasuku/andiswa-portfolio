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

export type ClusterKey = "cape-peninsula-south" | "fynbos-core" | "urban-suburban";

export const CLUSTER_META: Record<
    ClusterKey,
    { label: string; color: string; description: string }
> = {
    "cape-peninsula-south": {
        label: "Cape Peninsula South",
        color: "#ef4444",
        description: "Points south of −34.0° latitude (coastal / peninsula tip)",
    },
    "fynbos-core": {
        label: "Fynbos Core",
        color: "#f97316",
        description:
            "Points between −34.0° and −33.96° latitude (Table Mountain fynbos belt)",
    },
    "urban-suburban": {
        label: "Urban / Suburban",
        color: "#14b8a6",
        description:
            "Points north of −33.96° latitude (suburban Cape Town fringe)",
    },
};

export const summary = {
    totalCsvRows: 2160,
    validPoints: 2160,
    skippedCount: 0,
    lonRange: {
        min: 18.351587,
        max: 18.469457,
    },
    latRange: {
        min: -34.098462,
        max: -33.916255,
    },
    centroid: {
        lon: 18.42970189490745,
        lat: -33.975989687499975,
    },
    clusterCounts: {
        "cape-peninsula-south": 596,
        "fynbos-core": 380,
        "urban-suburban": 1184,
    },
};

// ---------- Types ----------

export interface LadumaPoint {
    rowname: string;
    longitude: number;
    latitude: number;
    cluster: ClusterKey;
}

export interface SkippedRow {
    lineNumber: number;
    raw: string;
    reason: string;
}

// ---------- Parsing ----------

function classifyPoint(lat: number): ClusterKey {
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

// ---------- Exported data (parsed once when map chunk loads) ----------

const { points, skipped } = parseCsv(rawCsv);

export const ladumaPoints: LadumaPoint[] = points;
export const skippedRows: SkippedRow[] = skipped;
