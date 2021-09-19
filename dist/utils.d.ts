import { QueryResult, Record as Neo4jRecord } from 'neo4j-driver';
import { Query } from "./store/actions";
interface CypherOutput {
    cypher: string;
    params: Record<string, any>;
}
export declare function queryToCypher(query: string | Query): CypherOutput;
export interface ReportProps {
    query: string;
    source: 'cypher' | 'query';
    database?: string;
    type: string;
    [key: string]: any;
}
export declare function useReportResults(props: ReportProps): {
    run: (params?: Record<string, any> | undefined, anotherDatabase?: string | undefined) => Promise<void | QueryResult>;
    cypher?: string | undefined;
    params: Record<string, any> | {};
    database?: string | undefined;
    loading: boolean;
    session?: import("neo4j-driver-core/types/session").default | undefined;
    error?: Error | undefined;
    result?: QueryResult | undefined;
    records?: Neo4jRecord<{
        [x: string]: any;
        [x: number]: any;
    }, string | number | symbol, {
        [x: string]: number;
    }>[] | undefined;
    first?: Neo4jRecord<{
        [x: string]: any;
        [x: number]: any;
    }, string | number | symbol, {
        [x: string]: number;
    }> | undefined;
};
export declare function recordToNative(input: any): any;
export declare function resultToNative(result: QueryResult): Record<string, any>;
export declare function checkResultKeys(first: Neo4jRecord, keys: string[]): false | Error;
export {};
