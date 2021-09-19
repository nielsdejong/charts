import { Direction, Operator, AggregationFunction } from "@neode/querybuilder";
import BarReport from "./components/reports/bar";
import FunnelReport from "./components/reports/funnel";
import LineReport from "./components/reports/line";
export declare type ApocDirection = 'in' | 'out' | 'both';
export declare type Condition = 'equals' | 'contains' | 'starts with' | 'ends with' | 'greater than' | 'less than' | 'greater than or equal' | 'less than or equal';
export declare const operators: {
    'equals': Operator;
    'contains': Operator;
    'starts with': Operator;
    'ends with': Operator;
    'greater than': Operator;
    'greater than or equal': Operator;
    'less than': Operator;
    'less than or equal': Operator;
};
export declare const conditions: Condition[];
export declare const directions: {
    in: Direction;
    out: Direction;
    both: Direction;
};
export declare const reportSources: {
    key: string;
    value: string;
    text: string;
}[];
export declare const TYPE_METRIC = "metric";
export declare const TYPE_TABLE = "table";
export declare const TYPE_BAR = "bar";
export declare const TYPE_STACKED_BAR = "stackedbar";
export declare const TYPE_HORIZONTAL_BAR = "horizontalbar";
export declare const TYPE_HORIZONTAL_STACKED_BAR = "horizontalstackedbar";
export declare const TYPE_LINE = "line";
export declare const TYPE_RADAR = "radar";
export declare const TYPE_FUNNEL = "funnel";
export declare const TYPE_HORIZONTAL_FUNNEL = "horizontalfunnel";
export declare const TYPE_BUMP = "bump";
export declare const TYPE_AREA_BUMP = "areabump";
export declare const TYPE_CHORD = "chord";
export declare const TYPE_BUBBLE = "bubble";
export declare const TYPE_CALENDAR = "calendar";
export declare const TYPE_HEAT_MAP = "heatmap";
export declare const TYPE_NETWORK = "network";
export declare const TYPE_SANKEY = "sankey";
export declare const TYPE_VERTICAL_SANKEY = "verticalsankey";
export declare const TYPE_SCATTER_PLOT = "scatterplot";
export declare const TYPE_STREAM = "stream";
export declare const reportTypes: ({
    key: string;
    value: string;
    text: string;
    hint: string;
    component: typeof BarReport;
    exampleQuery: string;
    previewQuery: string;
    props?: undefined;
} | {
    key: string;
    value: string;
    text: string;
    hint: string;
    component: typeof BarReport;
    props: {
        stacked: boolean;
        layout?: undefined;
    };
    exampleQuery: string;
    previewQuery: string;
} | {
    key: string;
    value: string;
    text: string;
    hint: string;
    component: typeof BarReport;
    props: {
        layout: string;
        stacked?: undefined;
    };
    exampleQuery: string;
    previewQuery: string;
} | {
    key: string;
    value: string;
    text: string;
    hint: string;
    component: typeof BarReport;
    props: {
        stacked: boolean;
        layout: string;
    };
    exampleQuery: string;
    previewQuery: string;
} | {
    key: string;
    value: string;
    text: string;
    hint: string;
    component: typeof LineReport;
    previewQuery: string;
    exampleQuery?: undefined;
    props?: undefined;
} | {
    key: string;
    value: string;
    text: string;
    hint: string;
    component: typeof FunnelReport;
    props: {
        layout: string;
        stacked?: undefined;
    };
    previewQuery: string;
    exampleQuery?: undefined;
})[];
export declare function getHint(type: string): string;
interface AggregationFunctionOption {
    key: string;
    text: string;
    value: AggregationFunction;
}
export declare const aggregateFunctions: AggregationFunctionOption[];
export {};
