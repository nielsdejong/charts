"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url = window.location.href;
var searchParams = new URL(url).searchParams;
exports.isDesktop = searchParams.has('relateApiToken');
exports.relateUrl = searchParams.get('relateUrl');
exports.relateApiToken = searchParams.get('relateApiToken');
exports.relateProjectId = searchParams.get('relateProjectId');
exports.neo4jDesktopGraphAppId = searchParams.get('neo4jDesktopGraphAppId');
// typePolicies allow apollo cache to use these fields as 'id'
// for automated cache updates when updating a single existing entity
// https://www.apollographql.com/docs/react/caching/cache-configuration/#customizing-identifier-generation-by-type
var apolloCache = null;
// https://www.apollographql.com/blog/file-uploads-with-apollo-server-2-0-5db2f3f60675/
var uploadLink = null;
exports.client = null;
