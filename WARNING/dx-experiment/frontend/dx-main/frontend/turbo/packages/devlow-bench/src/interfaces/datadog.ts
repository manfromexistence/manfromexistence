import type {
  DistributionPointsSeries,
  MetricMetadata,
} from "@datadog/datadog-api-client/dist/packages/datadog-api-client-v1/index.js";
import type { Interface } from "../index.js";
import datadogApiClient from "@datadog/datadog-api-client";
import os from "os";

function toIdentifier(str: string) {
  return str.replace(/\//g, ".").replace(/ /g, "_");
}

const UNIT_MAPPING: Record<string, string> = {
  ms: "millisecond",
  requests: "request",
  bytes: "byte",
};

export default function createInterface({
  apiKey = process.env.DATADOG_API_KEY,
  appKey = process.env.DATADOG_APP_KEY,
  host = process.env.DATADOG_HOST || os.hostname(),
}: { apiKey?: string; appKey?: string; host?: string } = {}): Interface {
  if (!apiKey)
    throw new Error("Datadog API key is required (set DATADOG_API_KEY)");
  const commonTags = [
    `ci:${!!process.env.CI || "false"}`,
    `os:${process.platform}`,
    `os_release:${os.release()}`,
    `cpus:${os.cpus().length}`,
    `cpu_model:${os.cpus()[0].model}`,
    `user:${os.userInfo().username}`,
    `arch:${os.arch()}`,
    `total_memory:${Math.round(os.totalmem() / 1024 / 1024 / 1024)}`,
    `node_version:${process.version}`,
  ];
  const configuration = datadogApiClient.client.createConfiguration({
    authMethods: {
      apiKeyAuth: apiKey,
      appKeyAuth: appKey,
    },
  });
  const api = new datadogApiClient.v1.MetricsApi(configuration);
  const dataPoints: DistributionPointsSeries[] = [];
  const metricMetadata: Record<string, MetricMetadata> = {};
  const iface: Interface = {
    measurement: async (scenario, props, name, value, unit, relativeTo) => {
      const ts = Math.round(Date.now() / 1000);
      const metric = toIdentifier(`devlow_bench/${scenario}/${name}`);
      if (UNIT_MAPPING[unit]) {
        metricMetadata[metric] = {
          unit: UNIT_MAPPING[unit],
        };
      }
      dataPoints.push({
        metric,
        type: "distribution",
        host,
        tags: Object.entries(props)
          .filter(([, value]) => value !== null)
          .map(
            ([key, value]) =>
              `${toIdentifier(key)}:${toIdentifier(value!.toString())}`
          )
          .concat(commonTags),
        points: [[ts, [value]]],
      });
    },
    end: async (scenario, props) => {
      await api.submitDistributionPoints({
        body: {
          series: dataPoints,
        },
      });
      dataPoints.length = 0;
    },
    finish: async () => {
      if (appKey) {
        for (const [metric, metadata] of Object.entries(metricMetadata)) {
          await api.updateMetricMetadata({
            metricName: metric,
            body: metadata,
          });
        }
      }
    },
  };
  return iface;
}
