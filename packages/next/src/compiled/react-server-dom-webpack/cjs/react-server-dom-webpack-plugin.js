/**
 * @license React
 * react-server-dom-webpack-plugin.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

'use strict';var v=require("path"),x=require("url"),y=require("neo-async"),A=require("acorn-loose"),B=require("webpack/lib/dependencies/ModuleDependency"),C=require("webpack/lib/dependencies/NullDependency"),D=require("webpack/lib/Template"),E=require("webpack");const F=Array.isArray;class G extends B{constructor(b){super(b)}get type(){return"client-reference"}}const H=require.resolve("../client.browser.js");
class I{constructor(b){this.ssrManifestFilename=this.clientManifestFilename=this.chunkName=this.clientReferences=void 0;if(!b||"boolean"!==typeof b.isServer)throw Error("React Server Plugin: You must specify the isServer option as a boolean.");if(b.isServer)throw Error("TODO: Implement the server compiler.");b.clientReferences?"string"!==typeof b.clientReferences&&F(b.clientReferences)?this.clientReferences=b.clientReferences:this.clientReferences=[b.clientReferences]:this.clientReferences=[{directory:".",
recursive:!0,include:/\.(js|ts|jsx|tsx)$/}];"string"===typeof b.chunkName?(this.chunkName=b.chunkName,/\[(index|request)\]/.test(this.chunkName)||(this.chunkName+="[index]")):this.chunkName="client[index]";this.clientManifestFilename=b.clientManifestFilename||"react-client-manifest.json";this.ssrManifestFilename=b.ssrManifestFilename||"react-ssr-manifest.json"}apply(b){const r=this;let t,w=!1;b.hooks.beforeCompile.tapAsync("React Server Plugin",(e,f)=>{e=e.contextModuleFactory;const l=b.resolverFactory.get("context",
{}),a=b.resolverFactory.get("normal");r.resolveAllClientFiles(b.context,l,a,b.inputFileSystem,e,function(c,d){c?f(c):(t=d,f())})});b.hooks.thisCompilation.tap("React Server Plugin",(e,f)=>{f=f.normalModuleFactory;e.dependencyFactories.set(G,f);e.dependencyTemplates.set(G,new C.Template);e=l=>{l.hooks.program.tap("React Server Plugin",()=>{const a=l.state.module;if(a.resource===H&&(w=!0,t))for(let d=0;d<t.length;d++){const n=t[d];var c=r.chunkName.replace(/\[index\]/g,""+d).replace(/\[request\]/g,
D.toPath(n.userRequest));c=new E.AsyncDependenciesBlock({name:c},null,n.request);c.addDependency(n);a.addBlock(c)}})};f.hooks.parser.for("javascript/auto").tap("HarmonyModulesPlugin",e);f.hooks.parser.for("javascript/esm").tap("HarmonyModulesPlugin",e);f.hooks.parser.for("javascript/dynamic").tap("HarmonyModulesPlugin",e)});b.hooks.make.tap("React Server Plugin",e=>{e.hooks.processAssets.tap({name:"React Server Plugin",stage:E.Compilation.PROCESS_ASSETS_STAGE_REPORT},function(){if(!1===w)e.warnings.push(new E.WebpackError("Client runtime at react-server-dom-webpack/client was not found. React Server Components module map file "+
r.clientManifestFilename+" was not created."));else{var f=new Set((t||[]).map(d=>d.request)),l={},a={};e.chunkGroups.forEach(function(d){function n(k,h){if(f.has(h.resource)){var g=e.moduleGraph.getExportsInfo(h).getProvidedExports(),m=x.pathToFileURL(h.resource).href;if(void 0!==m){const u={};l[m]={id:k,chunks:p,name:"*"};u["*"]={specifier:m,name:"*"};l[m+"#"]={id:k,chunks:p,name:""};u[""]={specifier:m,name:""};Array.isArray(g)&&g.forEach(function(q){l[m+"#"+q]={id:k,chunks:p,name:q};u[q]={specifier:m,
name:q}});a[k]=u}}}const p=d.chunks.map(function(k){return k.id});d.chunks.forEach(function(k){k=e.chunkGraph.getChunkModulesIterable(k);Array.from(k).forEach(function(h){const g=e.chunkGraph.getModuleId(h);n(g,h);h.modules&&h.modules.forEach(m=>{n(g,m)})})})});var c=JSON.stringify(l,null,2);e.emitAsset(r.clientManifestFilename,new E.sources.RawSource(c,!1));c=JSON.stringify(a,null,2);e.emitAsset(r.ssrManifestFilename,new E.sources.RawSource(c,!1))}})})}resolveAllClientFiles(b,r,t,w,e,f){function l(a){if(-1===
a.indexOf("use client"))return!1;let c;try{c=A.parse(a,{ecmaVersion:"2024",sourceType:"module"}).body}catch(d){return!1}for(a=0;a<c.length;a++){const d=c[a];if("ExpressionStatement"!==d.type||!d.directive)break;if("use client"===d.directive)return!0}return!1}y.map(this.clientReferences,(a,c)=>{"string"===typeof a?c(null,[new G(a)]):r.resolve({},b,a.directory,{},(d,n)=>{if(d)return c(d);e.resolveDependencies(w,{resource:n,resourceQuery:"",recursive:void 0===a.recursive?!0:a.recursive,regExp:a.include,
include:void 0,exclude:a.exclude},(p,k)=>{if(p)return c(p);p=k.map(h=>{var g=v.join(n,h.userRequest);g=new G(g);g.userRequest=h.userRequest;return g});y.filter(p,(h,g)=>{t.resolve({},b,h.request,{},(m,u)=>{if(m||"string"!==typeof u)return g(null,!1);w.readFile(u,"utf-8",(q,z)=>{if(q||"string"!==typeof z)return g(null,!1);q=l(z);g(null,q)})})},c)})})},(a,c)=>{if(a)return f(a);a=[];for(let d=0;d<c.length;d++)a.push.apply(a,c[d]);f(null,a)})}}module.exports=I;