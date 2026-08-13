var e=Object.create,
t=Object.defineProperty,
n=Object.getOwnPropertyDescriptor,
r=Object.getOwnPropertyNames,
i=Object.getPrototypeOf,
a=Object.prototype.hasOwnProperty,
o=(e,
t)=>()=>(t||(e((t={
exports:{

}
}).exports,
t),
e=null),
t.exports),
s=(e,
n)=>{
let r={

};
for(var i in e)t(r,
i,
{
get:e[
i
],
enumerable:!0
});
return n||t(r,
Symbol.toStringTag,
{
value:`Module`
}),
r
},
c=(e,
i,
o,
s)=>{
if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),
l=0,
u=c.length,
d;
l<u;
l++)d=c[
l
],
!a.call(e,
d)&&d!==o&&t(e,
d,
{
get:(e=>i[
e
]).bind(null,
d),
enumerable:!(s=n(i,
d))||s.enumerable
});
return e
},
l=(n,
r,
a)=>(a=n==null?{

}:e(i(n)),
c(r||!n||!n.__esModule?t(a,
`default`,
{
value:n,
enumerable:!0
}):a,
n));
(function(){
let e=document.createElement(`link`).relList;
if(e&&e.supports&&e.supports(`modulepreload`))return;
for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);
new MutationObserver(e=>{
for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)
}).observe(document,
{
childList:!0,
subtree:!0
});
function t(e){
let t={

};
return e.integrity&&(t.integrity=e.integrity),
e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),
e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,
t
}function n(e){
if(e.ep)return;
e.ep=!0;
let n=t(e);
fetch(e.href,
n)
}
})();
var u=o((e=>{
var t=Symbol.for(`react.transitional.element`),
n=Symbol.for(`react.portal`),
r=Symbol.for(`react.fragment`),
i=Symbol.for(`react.strict_mode`),
a=Symbol.for(`react.profiler`),
o=Symbol.for(`react.consumer`),
s=Symbol.for(`react.context`),
c=Symbol.for(`react.forward_ref`),
l=Symbol.for(`react.suspense`),
u=Symbol.for(`react.memo`),
d=Symbol.for(`react.lazy`),
f=Symbol.for(`react.activity`),
p=Symbol.iterator;
function m(e){
return typeof e!=`object`||!e?null:(e=p&&e[
p
]||e[
`@@iterator`
],
typeof e==`function`?e:null)
}var h={
isMounted:function(){
return!1
},
enqueueForceUpdate:function(){

},
enqueueReplaceState:function(){

},
enqueueSetState:function(){

}
},
g=Object.assign,
_={

};
function v(e,
t,
n){
this.props=e,
this.context=t,
this.refs=_,
this.updater=n||h
}v.prototype.isReactComponent={

},
v.prototype.setState=function(e,
t){
if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);
this.updater.enqueueSetState(this,
e,
t,
`setState`)
},
v.prototype.forceUpdate=function(e){
this.updater.enqueueForceUpdate(this,
e,
`forceUpdate`)
};
function y(){

}y.prototype=v.prototype;
function b(e,
t,
n){
this.props=e,
this.context=t,
this.refs=_,
this.updater=n||h
}var x=b.prototype=new y;
x.constructor=b,
g(x,
v.prototype),
x.isPureReactComponent=!0;
var S=Array.isArray;
function C(){

}var w={
H:null,
A:null,
T:null,
S:null
},
T=Object.prototype.hasOwnProperty;
function E(e,
n,
r){
var i=r.ref;
return{
$$typeof:t,
type:e,
key:n,
ref:i===void 0?null:i,
props:r
}
}function ee(e,
t){
return E(e.type,
t,
e.props)
}function D(e){
return typeof e==`object`&&!!e&&e.$$typeof===t
}function te(e){
var t={
"=":`=0`,
":":`=2`
};
return`$`+e.replace(/[
=:
]/g,
function(e){
return t[
e
]
})
}var ne=/\/+/g;
function re(e,
t){
return typeof e==`object`&&e&&e.key!=null?te(``+e.key):t.toString(36)
}function ie(e){
switch(e.status){
case`fulfilled`:return e.value;
case`rejected`:throw e.reason;
default:switch(typeof e.status==`string`?e.then(C,
C):(e.status=`pending`,
e.then(function(t){
e.status===`pending`&&(e.status=`fulfilled`,
e.value=t)
},
function(t){
e.status===`pending`&&(e.status=`rejected`,
e.reason=t)
})),
e.status){
case`fulfilled`:return e.value;
case`rejected`:throw e.reason
}
}throw e
}function ae(e,
r,
i,
a,
o){
var s=typeof e;
(s===`undefined`||s===`boolean`)&&(e=null);
var c=!1;
if(e===null)c=!0;
else switch(s){
case`bigint`:case`string`:case`number`:c=!0;
break;
case`object`:switch(e.$$typeof){
case t:case n:c=!0;
break;
case d:return c=e._init,
ae(c(e._payload),
r,
i,
a,
o)
}
}if(c)return o=o(e),
c=a===``?`.`+re(e,
0):a,
S(o)?(i=``,
c!=null&&(i=c.replace(ne,
`$&/`)+`/`),
ae(o,
r,
i,
``,
function(e){
return e
})):o!=null&&(D(o)&&(o=ee(o,
i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ne,
`$&/`)+`/`)+c)),
r.push(o)),
1;
c=0;
var l=a===``?`.`:a+`:`;
if(S(e))for(var u=0;
u<e.length;
u++)a=e[
u
],
s=l+re(a,
u),
c+=ae(a,
r,
i,
s,
o);
else if(u=m(e),
typeof u==`function`)for(e=u.call(e),
u=0;
!(a=e.next()).done;
)a=a.value,
s=l+re(a,
u++),
c+=ae(a,
r,
i,
s,
o);
else if(s===`object`){
if(typeof e.then==`function`)return ae(ie(e),
r,
i,
a,
o);
throw r=String(e),
Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)
}return c
}function O(e,
t,
n){
if(e==null)return e;
var r=[

],
i=0;
return ae(e,
r,
``,
``,
function(e){
return t.call(n,
e,
i++)
}),
r
}function k(e){
if(e._status===-1){
var t=e._result;
t=t(),
t.then(function(t){
(e._status===0||e._status===-1)&&(e._status=1,
e._result=t)
},
function(t){
(e._status===0||e._status===-1)&&(e._status=2,
e._result=t)
}),
e._status===-1&&(e._status=0,
e._result=t)
}if(e._status===1)return e._result.default;
throw e._result
}var oe=typeof reportError==`function`?reportError:function(e){
if(typeof window==`object`&&typeof window.ErrorEvent==`function`){
var t=new window.ErrorEvent(`error`,
{
bubbles:!0,
cancelable:!0,
message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),
error:e
});
if(!window.dispatchEvent(t))return
}else if(typeof process==`object`&&typeof process.emit==`function`){
process.emit(`uncaughtException`,
e);
return
}console.error(e)
},
se={
map:O,
forEach:function(e,
t,
n){
O(e,
function(){
t.apply(this,
arguments)
},
n)
},
count:function(e){
var t=0;
return O(e,
function(){
t++
}),
t
},
toArray:function(e){
return O(e,
function(e){
return e
})||[

]
},
only:function(e){
if(!D(e))throw Error(`React.Children.only expected to receive a single React element child.`);
return e
}
};
e.Activity=f,
e.Children=se,
e.Component=v,
e.Fragment=r,
e.Profiler=a,
e.PureComponent=b,
e.StrictMode=i,
e.Suspense=l,
e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,
e.__COMPILER_RUNTIME={
__proto__:null,
c:function(e){
return w.H.useMemoCache(e)
}
},
e.cache=function(e){
return function(){
return e.apply(null,
arguments)
}
},
e.cacheSignal=function(){
return null
},
e.cloneElement=function(e,
t,
n){
if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);
var r=g({

},
e.props),
i=e.key;
if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),
t)!T.call(t,
a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[
a
]=t[
a
]);
var a=arguments.length-2;
if(a===1)r.children=n;
else if(1<a){
for(var o=Array(a),
s=0;
s<a;
s++)o[
s
]=arguments[
s+2
];
r.children=o
}return E(e.type,
i,
r)
},
e.createContext=function(e){
return e={
$$typeof:s,
_currentValue:e,
_currentValue2:e,
_threadCount:0,
Provider:null,
Consumer:null
},
e.Provider=e,
e.Consumer={
$$typeof:o,
_context:e
},
e
},
e.createElement=function(e,
t,
n){
var r,
i={

},
a=null;
if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),
t)T.call(t,
r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[
r
]=t[
r
]);
var o=arguments.length-2;
if(o===1)i.children=n;
else if(1<o){
for(var s=Array(o),
c=0;
c<o;
c++)s[
c
]=arguments[
c+2
];
i.children=s
}if(e&&e.defaultProps)for(r in o=e.defaultProps,
o)i[
r
]===void 0&&(i[
r
]=o[
r
]);
return E(e,
a,
i)
},
e.createRef=function(){
return{
current:null
}
},
e.forwardRef=function(e){
return{
$$typeof:c,
render:e
}
},
e.isValidElement=D,
e.lazy=function(e){
return{
$$typeof:d,
_payload:{
_status:-1,
_result:e
},
_init:k
}
},
e.memo=function(e,
t){
return{
$$typeof:u,
type:e,
compare:t===void 0?null:t
}
},
e.startTransition=function(e){
var t=w.T,
n={

};
w.T=n;
try{
var r=e(),
i=w.S;
i!==null&&i(n,
r),
typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,
oe)
}catch(e){
oe(e)
}finally{
t!==null&&n.types!==null&&(t.types=n.types),
w.T=t
}
},
e.unstable_useCacheRefresh=function(){
return w.H.useCacheRefresh()
},
e.use=function(e){
return w.H.use(e)
},
e.useActionState=function(e,
t,
n){
return w.H.useActionState(e,
t,
n)
},
e.useCallback=function(e,
t){
return w.H.useCallback(e,
t)
},
e.useContext=function(e){
return w.H.useContext(e)
},
e.useDebugValue=function(){

},
e.useDeferredValue=function(e,
t){
return w.H.useDeferredValue(e,
t)
},
e.useEffect=function(e,
t){
return w.H.useEffect(e,
t)
},
e.useEffectEvent=function(e){
return w.H.useEffectEvent(e)
},
e.useId=function(){
return w.H.useId()
},
e.useImperativeHandle=function(e,
t,
n){
return w.H.useImperativeHandle(e,
t,
n)
},
e.useInsertionEffect=function(e,
t){
return w.H.useInsertionEffect(e,
t)
},
e.useLayoutEffect=function(e,
t){
return w.H.useLayoutEffect(e,
t)
},
e.useMemo=function(e,
t){
return w.H.useMemo(e,
t)
},
e.useOptimistic=function(e,
t){
return w.H.useOptimistic(e,
t)
},
e.useReducer=function(e,
t,
n){
return w.H.useReducer(e,
t,
n)
},
e.useRef=function(e){
return w.H.useRef(e)
},
e.useState=function(e){
return w.H.useState(e)
},
e.useSyncExternalStore=function(e,
t,
n){
return w.H.useSyncExternalStore(e,
t,
n)
},
e.useTransition=function(){
return w.H.useTransition()
},
e.version=`19.2.7`
})),
d=o(((e,
t)=>{
t.exports=u()
})),
f=o((e=>{
var t=d();
function n(e,
t){
return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t
}var r=typeof Object.is==`function`?Object.is:n,
i=t.useSyncExternalStore,
a=t.useRef,
o=t.useEffect,
s=t.useMemo,
c=t.useDebugValue;
e.useSyncExternalStoreWithSelector=function(e,
t,
n,
l,
u){
var d=a(null);
if(d.current===null){
var f={
hasValue:!1,
value:null
};
d.current=f
}else f=d.current;
d=s(function(){
function e(e){
if(!i){
if(i=!0,
a=e,
e=l(e),
u!==void 0&&f.hasValue){
var t=f.value;
if(u(t,
e))return o=t
}return o=e
}if(t=o,
r(a,
e))return t;
var n=l(e);
return u!==void 0&&u(t,
n)?(a=e,
t):(a=e,
o=n)
}var i=!1,
a,
o,
s=n===void 0?null:n;
return[
function(){
return e(t())
},
s===null?void 0:function(){
return e(s())
}
]
},
[
t,
n,
l,
u
]);
var p=i(e,
d[
0
],
d[
1
]);
return o(function(){
f.hasValue=!0,
f.value=p
},
[
p
]),
c(p),
p
}
})),
p=o(((e,
t)=>{
t.exports=f()
})),
m=l(d(),
1),
h=p();
function g(e){
e()
}function _(){
let e=null,
t=null;
return{
clear(){
e=null,
t=null
},
notify(){
g(()=>{
let t=e;
for(;
t;
)t.callback(),
t=t.next
})
},
get(){
let t=[

],
n=e;
for(;
n;
)t.push(n),
n=n.next;
return t
},
subscribe(n){
let r=!0,
i=t={
callback:n,
next:null,
prev:t
};
return i.prev?i.prev.next=i:e=i,
function(){
!r||e===null||(r=!1,
i.next?i.next.prev=i.prev:t=i.prev,
i.prev?i.prev.next=i.next:e=i.next)
}
}
}
}var v={
notify(){

},
get:()=>[

]
};
function y(e,
t){
let n,
r=v,
i=0,
a=!1;
function o(e){
u();
let t=r.subscribe(e),
n=!1;
return()=>{
n||(n=!0,
t(),
d())
}
}function s(){
r.notify()
}function c(){
m.onStateChange&&m.onStateChange()
}function l(){
return a
}function u(){
i++,
n||(n=t?t.addNestedSub(c):e.subscribe(c),
r=_())
}function d(){
i--,
n&&i===0&&(n(),
n=void 0,
r.clear(),
r=v)
}function f(){
a||(a=!0,
u())
}function p(){
a&&(a=!1,
d())
}let m={
addNestedSub:o,
notifyNestedSubs:s,
handleChangeWrapper:c,
isSubscribed:l,
trySubscribe:f,
tryUnsubscribe:p,
getListeners:()=>r
};
return m
}var b=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,
x=typeof navigator<`u`&&navigator.product===`ReactNative`,
S=b||x?m.useLayoutEffect:m.useEffect,
C=Symbol.for(`react-redux-context`),
w=typeof globalThis<`u`?globalThis:{

};
function T(){
if(!m.createContext)return{

};
let e=w[
C
]??=new Map,
t=e.get(m.createContext);
return t||(t=m.createContext(null),
e.set(m.createContext,
t)),
t
}var E=T();
function ee(e){
let{
children:t,
context:n,
serverState:r,
store:i
}=e,
a=m.useMemo(()=>{
let e=y(i);
return{
store:i,
subscription:e,
getServerState:r?()=>r:void 0
}
},
[
i,
r
]),
o=m.useMemo(()=>i.getState(),
[
i
]);
S(()=>{
let{
subscription:e
}=a;
return e.onStateChange=e.notifyNestedSubs,
e.trySubscribe(),
o!==i.getState()&&e.notifyNestedSubs(),
()=>{
e.tryUnsubscribe(),
e.onStateChange=void 0
}
},
[
a,
o
]);
let s=n||E;
return m.createElement(s.Provider,
{
value:a
},
t)
}var D=ee;
function te(e=E){
return function(){
return m.useContext(e)
}
}var ne=te();
function re(e=E){
let t=e===E?ne:te(e),
n=()=>{
let{
store:e
}=t();
return e
};
return Object.assign(n,
{
withTypes:()=>n
}),
n
}var ie=re();
function ae(e=E){
let t=e===E?ie:re(e),
n=()=>t().dispatch;
return Object.assign(n,
{
withTypes:()=>n
}),
n
}var O=ae(),
k=(e,
t)=>e===t;
function oe(e=E){
let t=e===E?ne:te(e),
n=(e,
n={

})=>{
let{
equalityFn:r=k
}=typeof n==`function`?{
equalityFn:n
}:n,
{
store:i,
subscription:a,
getServerState:o
}=t();
m.useRef(!0);
let s=m.useCallback({
[
e.name
](t){
return e(t)
}
}[
e.name
],
[
e
]),
c=(0,
h.useSyncExternalStoreWithSelector)(a.addNestedSub,
i.getState,
o||i.getState,
s,
r);
return m.useDebugValue(c),
c
};
return Object.assign(n,
{
withTypes:()=>n
}),
n
}var se=oe();
function A(e){
return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `
}var ce=typeof Symbol==`function`&&Symbol.observable||`@@observable`,
le=()=>Math.random().toString(36).substring(7).split(``).join(`.`),
j={
INIT:`@@redux/INIT${le()}`,
REPLACE:`@@redux/REPLACE${le()}`,
PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${le()}`
};
function ue(e){
if(typeof e!=`object`||!e)return!1;
let t=e;
for(;
Object.getPrototypeOf(t)!==null;
)t=Object.getPrototypeOf(t);
return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null
}function M(e,
t,
n){
if(typeof e!=`function`)throw Error(A(2));
if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[
3
]==`function`)throw Error(A(0));
if(typeof t==`function`&&n===void 0&&(n=t,
t=void 0),
n!==void 0){
if(typeof n!=`function`)throw Error(A(1));
return n(M)(e,
t)
}let r=e,
i=t,
a=new Map,
o=a,
s=0,
c=!1;
function l(){
o===a&&(o=new Map,
a.forEach((e,
t)=>{
o.set(t,
e)
}))
}function u(){
if(c)throw Error(A(3));
return i
}function d(e){
if(typeof e!=`function`)throw Error(A(4));
if(c)throw Error(A(5));
let t=!0;
l();
let n=s++;
return o.set(n,
e),
function(){
if(t){
if(c)throw Error(A(6));
t=!1,
l(),
o.delete(n),
a=null
}
}
}function f(e){
if(!ue(e))throw Error(A(7));
if(e.type===void 0)throw Error(A(8));
if(typeof e.type!=`string`)throw Error(A(17));
if(c)throw Error(A(9));
try{
c=!0,
i=r(i,
e)
}finally{
c=!1
}return(a=o).forEach(e=>{
e()
}),
e
}function p(e){
if(typeof e!=`function`)throw Error(A(10));
r=e,
f({
type:j.REPLACE
})
}function m(){
let e=d;
return{
subscribe(t){
if(typeof t!=`object`||!t)throw Error(A(11));
function n(){
let e=t;
e.next&&e.next(u())
}return n(),
{
unsubscribe:e(n)
}
},
[
ce
](){
return this
}
}
}return f({
type:j.INIT
}),
{
dispatch:f,
subscribe:d,
getState:u,
replaceReducer:p,
[
ce
]:m
}
}function de(e){
Object.keys(e).forEach(t=>{
let n=e[
t
];
if(n(void 0,
{
type:j.INIT
})===void 0)throw Error(A(12));
if(n(void 0,
{
type:j.PROBE_UNKNOWN_ACTION()
})===void 0)throw Error(A(13))
})
}function fe(e){
let t=Object.keys(e),
n={

};
for(let r=0;
r<t.length;
r++){
let i=t[
r
];
typeof e[
i
]==`function`&&(n[
i
]=e[
i
])
}let r=Object.keys(n),
i;
try{
de(n)
}catch(e){
i=e
}return function(e={

},
t){
if(i)throw i;
let a=!1,
o={

};
for(let i=0;
i<r.length;
i++){
let s=r[
i
],
c=n[
s
],
l=e[
s
],
u=c(l,
t);
if(u===void 0)throw t&&t.type,
Error(A(14));
o[
s
]=u,
a||=u!==l
}return a||=r.length!==Object.keys(e).length,
a?o:e
}
}function pe(...e){
return e.length===0?e=>e:e.length===1?e[
0
]:e.reduce((e,
t)=>(...n)=>e(t(...n)))
}function me(...e){
return t=>(n,
r)=>{
let i=t(n,
r),
a=()=>{
throw Error(A(15))
},
o={
getState:i.getState,
dispatch:(e,
...t)=>a(e,
...t)
};
return a=pe(...e.map(e=>e(o)))(i.dispatch),
{
...i,
dispatch:a
}
}
}function he(e){
return ue(e)&&`type`in e&&typeof e.type==`string`
}var ge=Symbol.for(`immer-nothing`),
_e=Symbol.for(`immer-draftable`),
ve=Symbol.for(`immer-state`);
function ye(e,
...t){
throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)
}var be=Object,
xe=be.getPrototypeOf,
Se=`constructor`,
Ce=`prototype`,
we=`configurable`,
Te=`enumerable`,
Ee=`writable`,
De=`value`,
Oe=e=>!!e&&!!e[
ve
];
function N(e){
return e?je(e)||Re(e)||!!e[
_e
]||!!e[
Se
]?.[
_e
]||ze(e)||Be(e):!1
}var ke=be[
Ce
][
Se
].toString(),
Ae=new WeakMap;
function je(e){
if(!e||!Ve(e))return!1;
let t=xe(e);
if(t===null||t===be[
Ce
])return!0;
let n=be.hasOwnProperty.call(t,
Se)&&t[
Se
];
if(n===Object)return!0;
if(!He(n))return!1;
let r=Ae.get(n);
return r===void 0&&(r=Function.toString.call(n),
Ae.set(n,
r)),
r===ke
}function Me(e,
t,
n=!0){
Ne(e)===0?(n?Reflect.ownKeys(e):be.keys(e)).forEach(n=>{
t(n,
e[
n
],
e)
}):e.forEach((n,
r)=>t(r,
n,
e))
}function Ne(e){
let t=e[
ve
];
return t?t.type_:Re(e)?1:ze(e)?2:Be(e)?3:0
}var Pe=(e,
t,
n=Ne(e))=>n===2?e.has(t):be[
Ce
].hasOwnProperty.call(e,
t),
Fe=(e,
t,
n=Ne(e))=>n===2?e.get(t):e[
t
],
Ie=(e,
t,
n,
r=Ne(e))=>{
r===2?e.set(t,
n):r===3?e.add(n):e[
t
]=n
};
function Le(e,
t){
return e===t?e!==0||1/e==1/t:e!==e&&t!==t
}var Re=Array.isArray,
ze=e=>e instanceof Map,
Be=e=>e instanceof Set,
Ve=e=>typeof e==`object`,
He=e=>typeof e==`function`,
Ue=e=>typeof e==`boolean`;
function We(e){
let t=+e;
return Number.isInteger(t)&&String(t)===e
}var Ge=e=>e.copy_||e.base_,
Ke=e=>e.modified_?e.copy_:e.base_;
function qe(e,
t){
if(ze(e))return new Map(e);
if(Be(e))return new Set(e);
if(Re(e))return Array[
Ce
].slice.call(e);
let n=je(e);
if(t===!0||t===`class_only`&&!n){
let t=be.getOwnPropertyDescriptors(e);
delete t[
ve
];
let n=Reflect.ownKeys(t);
for(let r=0;
r<n.length;
r++){
let i=n[
r
],
a=t[
i
];
a[
Ee
]===!1&&(a[
Ee
]=!0,
a[
we
]=!0),
(a.get||a.set)&&(t[
i
]={
[
we
]:!0,
[
Ee
]:!0,
[
Te
]:a[
Te
],
[
De
]:e[
i
]
})
}return be.create(xe(e),
t)
}else{
let t=xe(e);
if(t!==null&&n)return{
...e
};
let r=be.create(t);
return be.assign(r,
e)
}
}function Je(e,
t=!1){
return Ze(e)||Oe(e)||!N(e)?e:(Ne(e)>1&&be.defineProperties(e,
{
set:Xe,
add:Xe,
clear:Xe,
delete:Xe
}),
be.freeze(e),
t&&Me(e,
(e,
t)=>{
Je(t,
!0)
},
!1),
e)
}function Ye(){
ye(2)
}var Xe={
[
De
]:Ye
};
function Ze(e){
return e===null||!Ve(e)||be.isFrozen(e)
}var Qe=`MapSet`,
$e=`Patches`,
et=`ArrayMethods`,
tt={

};
function nt(e){
let t=tt[
e
];
return t||ye(0,
e),
t
}var rt=e=>!!tt[
e
],
it,
at=()=>it,
ot=(e,
t)=>({
drafts_:[

],
parent_:e,
immer_:t,
canAutoFreeze_:!0,
unfinalizedDrafts_:0,
handledSet_:new Set,
processedForPatches_:new Set,
mapSetPlugin_:rt(Qe)?nt(Qe):void 0,
arrayMethodsPlugin_:rt(et)?nt(et):void 0
});
function st(e,
t){
t&&(e.patchPlugin_=nt($e),
e.patches_=[

],
e.inversePatches_=[

],
e.patchListener_=t)
}function ct(e){
lt(e),
e.drafts_.forEach(dt),
e.drafts_=null
}function lt(e){
e===it&&(it=e.parent_)
}var ut=e=>it=ot(it,
e);
function dt(e){
let t=e[
ve
];
t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0
}function ft(e,
t){
t.unfinalizedDrafts_=t.drafts_.length;
let n=t.drafts_[
0
];
if(e!==void 0&&e!==n){
n[
ve
].modified_&&(ct(t),
ye(4)),
N(e)&&(e=pt(t,
e));
let{
patchPlugin_:r
}=t;
r&&r.generateReplacementPatches_(n[
ve
].base_,
e,
t)
}else e=pt(t,
n);
return mt(t,
e,
!0),
ct(t),
t.patches_&&t.patchListener_(t.patches_,
t.inversePatches_),
e===ge?void 0:e
}function pt(e,
t){
if(Ze(t))return t;
let n=t[
ve
];
if(!n)return St(t,
e.handledSet_,
e);
if(!gt(n,
e))return t;
if(!n.modified_)return n.base_;
if(!n.finalized_){
let{
callbacks_:t
}=n;
if(t)for(;
t.length>0;
)t.pop()(e);
bt(n,
e)
}return n.copy_
}function mt(e,
t,
n=!1){
!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Je(t,
n)
}function ht(e){
e.finalized_=!0,
e.scope_.unfinalizedDrafts_--
}var gt=(e,
t)=>e.scope_===t,
_t=[

];
function vt(e,
t,
n,
r){
let i=Ge(e),
a=e.type_;
if(r!==void 0&&Fe(i,
r,
a)===t){
Ie(i,
r,
n,
a);
return
}if(!e.draftLocations_){
let t=e.draftLocations_=new Map;
Me(i,
(e,
n)=>{
if(Oe(n)){
let r=t.get(n)||[

];
r.push(e),
t.set(n,
r)
}
})
}let o=e.draftLocations_.get(t)??_t;
for(let e of o)Ie(i,
e,
n,
a)
}function yt(e,
t,
n){
e.callbacks_.push(function(r){
let i=t;
if(!i||!gt(i,
r))return;
r.mapSetPlugin_?.fixSetContents(i);
let a=Ke(i);
vt(e,
i.draft_??i,
a,
n),
bt(i,
r)
})
}function bt(e,
t){
if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){
let{
patchPlugin_:n
}=t;
if(n){
let r=n.getPath(e);
r&&n.generatePatches_(e,
r,
t)
}ht(e)
}
}function xt(e,
t,
n){
let{
scope_:r
}=e;
if(Oe(n)){
let i=n[
ve
];
gt(i,
r)&&i.callbacks_.push(function(){
At(e),
vt(e,
n,
Ke(i),
t)
})
}else N(n)&&e.callbacks_.push(function(){
let i=Ge(e);
e.type_===3?i.has(n)&&St(n,
r.handledSet_,
r):Fe(i,
t,
e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&St(Fe(e.copy_,
t,
e.type_),
r.handledSet_,
r)
})
}function St(e,
t,
n){
return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||Oe(e)||t.has(e)||!N(e)||Ze(e)?e:(t.add(e),
Me(e,
(r,
i)=>{
if(Oe(i)){
let t=i[
ve
];
gt(t,
n)&&(Ie(e,
r,
Ke(t),
e.type_),
ht(t))
}else N(i)&&St(i,
t,
n)
}),
e)
}function Ct(e,
t){
let n=Re(e),
r={
type_:+!!n,
scope_:t?t.scope_:at(),
modified_:!1,
finalized_:!1,
assigned_:void 0,
parent_:t,
base_:e,
draft_:null,
copy_:null,
revoke_:null,
isManual_:!1,
callbacks_:void 0
},
i=r,
a=wt;
n&&(i=[
r
],
a=Tt);
let{
revoke:o,
proxy:s
}=Proxy.revocable(i,
a);
return r.draft_=s,
r.revoke_=o,
[
s,
r
]
}var wt={
get(e,
t){
if(t===ve)return e;
if(t===`constructor`||t===`__proto__`){
let n=Ge(e)[
t
];
return new Proxy(n||{

},
{
get:(e,
t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,
t),
set:()=>!0,
apply:(e,
t,
n)=>Reflect.apply(e,
t,
n)
})
}let n=e.scope_.arrayMethodsPlugin_,
r=e.type_===1&&typeof t==`string`;
if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,
t);
let i=Ge(e);
if(!Pe(i,
t,
e.type_))return Dt(e,
i,
t);
let a=i[
t
];
if(e.finalized_||!N(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&We(t))return a;
if(a===Et(e.base_,
t)){
At(e);
let n=e.type_===1?+t:t,
r=Mt(e.scope_,
a,
e,
n);
return e.copy_[
n
]=r
}return a
},
has(e,
t){
return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in Ge(e)
},
ownKeys(e){
return Reflect.ownKeys(Ge(e))
},
set(e,
t,
n){
if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;
let r=Ot(Ge(e),
t);
if(r?.set)return r.set.call(e.draft_,
n),
!0;
if(!e.modified_){
let r=Et(Ge(e),
t),
i=r?.[
ve
];
if(i&&i.base_===n)return e.copy_[
t
]=n,
e.assigned_.set(t,
!1),
!0;
if(Le(n,
r)&&(n!==void 0||Pe(e.base_,
t,
e.type_)))return!0;
At(e),
kt(e)
}return e.copy_[
t
]===n&&(n!==void 0||Pe(e.copy_,
t,
e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[
t
])?!0:(e.copy_[
t
]=n,
e.assigned_.set(t,
!0),
xt(e,
t,
n),
!0)
},
deleteProperty(e,
t){
return At(e),
Et(e.base_,
t)!==void 0||t in e.base_?(e.assigned_.set(t,
!1),
kt(e)):e.assigned_.delete(t),
e.copy_&&delete e.copy_[
t
],
!0
},
getOwnPropertyDescriptor(e,
t){
let n=Ge(e),
r=Reflect.getOwnPropertyDescriptor(n,
t);
return r&&{
[
Ee
]:!0,
[
we
]:e.type_!==1||t!==`length`,
[
Te
]:r[
Te
],
[
De
]:n[
t
]
}
},
defineProperty(){
ye(11)
},
getPrototypeOf(e){
return xe(e.base_)
},
setPrototypeOf(){
ye(12)
}
},
Tt={

};
for(let e in wt){
let t=wt[
e
];
Tt[
e
]=function(){
let e=arguments;
return e[
0
]=e[
0
][
0
],
t.apply(this,
e)
}
}Tt.deleteProperty=function(e,
t){
return Tt.set.call(this,
e,
t,
void 0)
},
Tt.set=function(e,
t,
n){
return wt.set.call(this,
e[
0
],
t,
n,
e[
0
])
};
function Et(e,
t){
let n=e[
ve
];
return(n?Ge(n):e)[
t
]
}function Dt(e,
t,
n){
let r=Ot(t,
n);
return r?De in r?r[
De
]:r.get?.call(e.draft_):void 0
}function Ot(e,
t){
if(!(t in e))return;
let n=xe(e);
for(;
n;
){
let e=Object.getOwnPropertyDescriptor(n,
t);
if(e)return e;
n=xe(n)
}
}function kt(e){
e.modified_||(e.modified_=!0,
e.parent_&&kt(e.parent_))
}function At(e){
e.copy_||=(e.assigned_=new Map,
qe(e.base_,
e.scope_.immer_.useStrictShallowCopy_))
}var jt=class{
constructor(e){
this.autoFreeze_=!0,
this.useStrictShallowCopy_=!1,
this.useStrictIteration_=!1,
this.produce=(e,
t,
n)=>{
if(He(e)&&!He(t)){
let n=t;
t=e;
let r=this;
return function(e=n,
...i){
return r.produce(e,
e=>t.call(this,
e,
...i))
}
}He(t)||ye(6),
n!==void 0&&!He(n)&&ye(7);
let r;
if(N(e)){
let i=ut(this),
a=Mt(i,
e,
void 0),
o=!0;
try{
r=t(a),
o=!1
}finally{
o?ct(i):lt(i)
}return st(i,
n),
ft(r,
i)
}else if(!e||!Ve(e)){
if(r=t(e),
r===void 0&&(r=e),
r===ge&&(r=void 0),
this.autoFreeze_&&Je(r,
!0),
n){
let t=[

],
i=[

];
nt($e).generateReplacementPatches_(e,
r,
{
patches_:t,
inversePatches_:i
}),
n(t,
i)
}return r
}else ye(1,
e)
},
this.produceWithPatches=(e,
t)=>{
if(He(e))return(t,
...n)=>this.produceWithPatches(t,
t=>e(t,
...n));
let n,
r;
return[
this.produce(e,
t,
(e,
t)=>{
n=e,
r=t
}),
n,
r
]
},
Ue(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),
Ue(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),
Ue(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)
}createDraft(e){
N(e)||ye(8),
Oe(e)&&(e=Nt(e));
let t=ut(this),
n=Mt(t,
e,
void 0);
return n[
ve
].isManual_=!0,
lt(t),
n
}finishDraft(e,
t){
let n=e&&e[
ve
];
(!n||!n.isManual_)&&ye(9);
let{
scope_:r
}=n;
return st(r,
t),
ft(void 0,
r)
}setAutoFreeze(e){
this.autoFreeze_=e
}setUseStrictShallowCopy(e){
this.useStrictShallowCopy_=e
}setUseStrictIteration(e){
this.useStrictIteration_=e
}shouldUseStrictIteration(){
return this.useStrictIteration_
}applyPatches(e,
t){
let n;
for(n=t.length-1;
n>=0;
n--){
let r=t[
n
];
if(r.path.length===0&&r.op===`replace`){
e=r.value;
break
}
}n>-1&&(t=t.slice(n+1));
let r=nt($e).applyPatches_;
return Oe(e)?r(e,
t):this.produce(e,
e=>r(e,
t))
}
};
function Mt(e,
t,
n,
r){
let[
i,
a
]=ze(t)?nt(Qe).proxyMap_(t,
n):Be(t)?nt(Qe).proxySet_(t,
n):Ct(t,
n);
return(n?.scope_??at()).drafts_.push(i),
a.callbacks_=n?.callbacks_??[

],
a.key_=r,
n&&r!==void 0?yt(n,
a,
r):a.callbacks_.push(function(e){
e.mapSetPlugin_?.fixSetContents(a);
let{
patchPlugin_:t
}=e;
a.modified_&&t&&t.generatePatches_(a,
[

],
e)
}),
i
}function Nt(e){
return Oe(e)||ye(10,
e),
Pt(e)
}function Pt(e){
if(!N(e)||Ze(e))return e;
let t=e[
ve
],
n,
r=!0;
if(t){
if(!t.modified_)return t.base_;
t.finalized_=!0,
n=qe(e,
t.scope_.immer_.useStrictShallowCopy_),
r=t.scope_.immer_.shouldUseStrictIteration()
}else n=qe(e,
!0);
return Me(n,
(e,
t)=>{
Ie(n,
e,
Pt(t))
},
r),
t&&(t.finalized_=!1),
n
}var Ft=new jt().produce;
function It(e,
t=`expected a function, instead received ${typeof e}`){
if(typeof e!=`function`)throw TypeError(t)
}function Lt(e,
t=`expected all items to be functions, instead received the following types: `){
if(!e.every(e=>typeof e==`function`)){
let n=e.map(e=>typeof e==`function`?`function ${e.name||`unnamed`}()`:typeof e).join(`, `);
throw TypeError(`${t}[${n}]`)
}
}var Rt=e=>Array.isArray(e)?e:[
e
];
function zt(e){
let t=Array.isArray(e[
0
])?e[
0
]:e;
return Lt(t,
`createSelector expects all input-selectors to be functions, but received the following types: `),
t
}function Bt(e,
t){
let n=[

],
{
length:r
}=e;
for(let i=0;
i<r;
i++)n.push(e[
i
].apply(null,
t));
return n
}var Vt=class{
constructor(e){
this.value=e
}deref(){
return this.value
}
},
Ht=typeof WeakRef>`u`?Vt:WeakRef,
Ut=0,
Wt=1;
function Gt(){
return{
s:Ut,
v:void 0,
o:null,
p:null
}
}function Kt(e){
return e instanceof Ht?e.deref():e
}function qt(e,
t={

}){
let n=Gt(),
{
resultEqualityCheck:r
}=t,
i,
a=0;
function o(){
let t=n,
{
length:o
}=arguments;
for(let e=0,
n=o;
e<n;
e++){
let n=arguments[
e
];
if(typeof n==`function`||typeof n==`object`&&n){
let e=t.o;
e===null&&(t.o=e=new WeakMap);
let r=e.get(n);
r===void 0?(t=Gt(),
e.set(n,
t)):t=r
}else{
let e=t.p;
e===null&&(t.p=e=new Map);
let r=e.get(n);
r===void 0?(t=Gt(),
e.set(n,
t)):t=r
}
}let s=t,
c;
if(t.s===Wt)c=t.v;
else if(c=e.apply(null,
arguments),
a++,
r){
let e=Kt(i);
e!=null&&r(e,
c)&&(c=e,
a!==0&&a--),
i=typeof c==`object`&&c||typeof c==`function`?new Ht(c):c
}return s.s=Wt,
s.v=c,
c
}return o.clearCache=()=>{
n=Gt(),
o.resetResultsCount()
},
o.resultsCount=()=>a,
o.resetResultsCount=()=>{
a=0
},
o
}function Jt(e,
...t){
let n=typeof e==`function`?{
memoize:e,
memoizeOptions:t
}:e,
r=(...e)=>{
let t=0,
r=0,
i,
a={

},
o=e.pop();
typeof o==`object`&&(a=o,
o=e.pop()),
It(o,
`createSelector expects an output function after the inputs, but received: [${typeof o}]`);
let{
memoize:s,
memoizeOptions:c=[

],
argsMemoize:l=qt,
argsMemoizeOptions:u=[

]
}={
...n,
...a
},
d=Rt(c),
f=Rt(u),
p=zt(e),
m=s(function(){
return t++,
o.apply(null,
arguments)
},
...d),
h=l(function(){
r++;
let e=Bt(p,
arguments);
return i=m.apply(null,
e),
i
},
...f);
return Object.assign(h,
{
resultFunc:o,
memoizedResultFunc:m,
dependencies:p,
dependencyRecomputations:()=>r,
resetDependencyRecomputations:()=>{
r=0
},
lastResult:()=>i,
recomputations:()=>t,
resetRecomputations:()=>{
t=0
},
memoize:s,
argsMemoize:l
})
};
return Object.assign(r,
{
withTypes:()=>r
}),
r
}var P=Jt(qt);
function Yt(e){
return({
dispatch:t,
getState:n
})=>r=>i=>typeof i==`function`?i(t,
n,
e):r(i)
}var Xt=Yt(),
Zt=Yt,
Qt=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){
if(arguments.length!==0)return typeof arguments[
0
]==`object`?pe:pe.apply(null,
arguments)
};
typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;
function $t(e,
t){
function n(...n){
if(t){
let r=t(...n);
if(!r)throw Error(Pn(0));
return{
type:e,
payload:r.payload,
...`meta`in r&&{
meta:r.meta
},
...`error`in r&&{
error:r.error
}
}
}return{
type:e,
payload:n[
0
]
}
}return n.toString=()=>`${e}`,
n.type=e,
n.match=t=>he(t)&&t.type===e,
n
}var en=class e extends Array{
constructor(...t){
super(...t),
Object.setPrototypeOf(this,
e.prototype)
}static get[
Symbol.species
](){
return e
}concat(...e){
return super.concat.apply(this,
e)
}prepend(...t){
return t.length===1&&Array.isArray(t[
0
])?new e(...t[
0
].concat(this)):new e(...t.concat(this))
}
};
function tn(e){
return N(e)?Ft(e,
()=>{

}):e
}function nn(e,
t,
n){
return e.has(t)?e.get(t):e.set(t,
n(t)).get(t)
}function rn(e){
return typeof e==`boolean`
}var an=()=>function(e){
let{
thunk:t=!0,
immutableCheck:n=!0,
serializableCheck:r=!0,
actionCreatorCheck:i=!0
}=e??{

},
a=new en;
return t&&(rn(t)?a.push(Xt):a.push(Zt(t.extraArgument))),
a
},
on=`RTK_autoBatch`,
sn=e=>t=>{
setTimeout(t,
e)
},
cn=(e,
t)=>n=>{
let r=!1,
i=()=>{
r||(r=!0,
cancelAnimationFrame(a),
clearTimeout(o),
n())
},
a=e(i),
o=setTimeout(i,
t)
},
ln=(e={
type:`raf`
})=>t=>(...n)=>{
let r=t(...n),
i=!0,
a=!1,
o=!1,
s=new Set,
c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?cn(window.requestAnimationFrame,
100):sn(10):e.type===`callback`?e.queueNotification:sn(e.timeout),
l=()=>{
o=!1,
a&&(a=!1,
s.forEach(e=>e()))
};
return Object.assign({

},
r,
{
subscribe(e){
let t=r.subscribe(()=>i&&e());
return s.add(e),
()=>{
t(),
s.delete(e)
}
},
dispatch(e){
try{
return i=!e?.meta?.[
on
],
a=!i,
a&&(o||(o=!0,
c(l))),
r.dispatch(e)
}finally{
i=!0
}
}
})
},
un=e=>function(t){
let{
autoBatch:n=!0
}=t??{

},
r=new en(e);
return n&&r.push(ln(typeof n==`object`?n:void 0)),
r
};
function dn(e){
let t=an(),
{
reducer:n=void 0,
middleware:r,
devTools:i=!0,
duplicateMiddlewareCheck:a=!0,
preloadedState:o=void 0,
enhancers:s=void 0
}=e||{

},
c;
if(typeof n==`function`)c=n;
else if(ue(n))c=fe(n);
else throw Error(Pn(1));
let l;
l=typeof r==`function`?r(t):t();
let u=pe;
i&&(u=Qt({
trace:!1,
...typeof i==`object`&&i
}));
let d=un(me(...l)),
f=typeof s==`function`?s(d):d(),
p=u(...f);
return M(c,
o,
p)
}function fn(e){
let t={

},
n=[

],
r,
i={
addCase(e,
n){
let r=typeof e==`string`?e:e.type;
if(!r)throw Error(Pn(28));
if(r in t)throw Error(Pn(29));
return t[
r
]=n,
i
},
addAsyncThunk(e,
r){
return r.pending&&(t[
e.pending.type
]=r.pending),
r.rejected&&(t[
e.rejected.type
]=r.rejected),
r.fulfilled&&(t[
e.fulfilled.type
]=r.fulfilled),
r.settled&&n.push({
matcher:e.settled,
reducer:r.settled
}),
i
},
addMatcher(e,
t){
return n.push({
matcher:e,
reducer:t
}),
i
},
addDefaultCase(e){
return r=e,
i
}
};
return e(i),
[
t,
n,
r
]
}function pn(e){
return typeof e==`function`
}function mn(e,
t){
let[
n,
r,
i
]=fn(t),
a;
if(pn(e))a=()=>tn(e());
else{
let t=tn(e);
a=()=>t
}function o(e=a(),
t){
let o=[
n[
t.type
],
...r.filter(({
matcher:e
})=>e(t)).map(({
reducer:e
})=>e)
];
return o.filter(e=>!!e).length===0&&(o=[
i
]),
o.reduce((e,
n)=>{
if(n)if(Oe(e)){
let r=n(e,
t);
return r===void 0?e:r
}else if(N(e))return Ft(e,
e=>n(e,
t));
else{
let r=n(e,
t);
if(r===void 0){
if(e===null)return e;
throw Error(`A case reducer on a non-draftable value must not return undefined`)
}return r
}return e
},
e)
}return o.getInitialState=a,
o
}var hn=`ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW`,
gn=(e=21)=>{
let t=``,
n=e;
for(;
n--;
)t+=hn[
Math.random()*64|0
];
return t
},
_n=Symbol.for(`rtk-slice-createasyncthunk`);
function vn(e,
t){
return`${e}/${t}`
}function yn({
creators:e
}={

}){
let t=e?.asyncThunk?.[
_n
];
return function(e){
let{
name:n,
reducerPath:r=n
}=e;
if(!n)throw Error(Pn(11));
let i=(typeof e.reducers==`function`?e.reducers(xn()):e.reducers)||{

},
a=Object.keys(i),
o={
sliceCaseReducersByName:{

},
sliceCaseReducersByType:{

},
actionCreators:{

},
sliceMatchers:[

]
},
s={
addCase(e,
t){
let n=typeof e==`string`?e:e.type;
if(!n)throw Error(Pn(12));
if(n in o.sliceCaseReducersByType)throw Error(Pn(13));
return o.sliceCaseReducersByType[
n
]=t,
s
},
addMatcher(e,
t){
return o.sliceMatchers.push({
matcher:e,
reducer:t
}),
s
},
exposeAction(e,
t){
return o.actionCreators[
e
]=t,
s
},
exposeCaseReducer(e,
t){
return o.sliceCaseReducersByName[
e
]=t,
s
}
};
a.forEach(r=>{
let a=i[
r
],
o={
reducerName:r,
type:vn(n,
r),
createNotation:typeof e.reducers==`function`
};
Cn(a)?Tn(o,
a,
s,
t):Sn(o,
a,
s)
});
function c(){
let[
t={

},
n=[

],
r=void 0
]=typeof e.extraReducers==`function`?fn(e.extraReducers):[
e.extraReducers
],
i={
...t,
...o.sliceCaseReducersByType
};
return mn(e.initialState,
e=>{
for(let t in i)e.addCase(t,
i[
t
]);
for(let t of o.sliceMatchers)e.addMatcher(t.matcher,
t.reducer);
for(let t of n)e.addMatcher(t.matcher,
t.reducer);
r&&e.addDefaultCase(r)
})
}let l=e=>e,
u=new Map,
d=new WeakMap,
f;
function p(e,
t){
return f||=c(),
f(e,
t)
}function m(){
return f||=c(),
f.getInitialState()
}function h(t,
n=!1){
function r(e){
let i=e[
t
];
return i===void 0&&n&&(i=nn(d,
r,
m)),
i
}function i(t=l){
return nn(nn(u,
n,
()=>new WeakMap),
t,
()=>{
let r={

};
for(let[
i,
a
]of Object.entries(e.selectors??{

}))r[
i
]=bn(a,
t,
()=>nn(d,
t,
m),
n);
return r
})
}return{
reducerPath:t,
getSelectors:i,
get selectors(){
return i(r)
},
selectSlice:r
}
}let g={
name:n,
reducer:p,
actions:o.actionCreators,
caseReducers:o.sliceCaseReducersByName,
getInitialState:m,
...h(r),
injectInto(e,
{
reducerPath:t,
...n
}={

}){
let i=t??r;
return e.inject({
reducerPath:i,
reducer:p
},
n),
{
...g,
...h(i,
!0)
}
}
};
return g
}
}function bn(e,
t,
n,
r){
function i(i,
...a){
let o=t(i);
return o===void 0&&r&&(o=n()),
e(o,
...a)
}return i.unwrapped=e,
i
}var F=yn();
function xn(){
function e(e,
t){
return{
_reducerDefinitionType:`asyncThunk`,
payloadCreator:e,
...t
}
}return e.withTypes=()=>e,
{
reducer(e){
return Object.assign({
[
e.name
](...t){
return e(...t)
}
}[
e.name
],
{
_reducerDefinitionType:`reducer`
})
},
preparedReducer(e,
t){
return{
_reducerDefinitionType:`reducerWithPrepare`,
prepare:e,
reducer:t
}
},
asyncThunk:e
}
}function Sn({
type:e,
reducerName:t,
createNotation:n
},
r,
i){
let a,
o;
if(`reducer`in r){
if(n&&!wn(r))throw Error(Pn(17));
a=r.reducer,
o=r.prepare
}else a=r;
i.addCase(e,
a).exposeCaseReducer(t,
a).exposeAction(t,
o?$t(e,
o):$t(e))
}function Cn(e){
return e._reducerDefinitionType===`asyncThunk`
}function wn(e){
return e._reducerDefinitionType===`reducerWithPrepare`
}function Tn({
type:e,
reducerName:t
},
n,
r,
i){
if(!i)throw Error(Pn(18));
let{
payloadCreator:a,
fulfilled:o,
pending:s,
rejected:c,
settled:l,
options:u
}=n,
d=i(e,
a,
u);
r.exposeAction(t,
d),
o&&r.addCase(d.fulfilled,
o),
s&&r.addCase(d.pending,
s),
c&&r.addCase(d.rejected,
c),
l&&r.addMatcher(d.settled,
l),
r.exposeCaseReducer(t,
{
fulfilled:o||En,
pending:s||En,
rejected:c||En,
settled:l||En
})
}function En(){

}var Dn=`listener`,
On=`completed`,
kn=`cancelled`;
`${kn}`,
`${On}`,
`${Dn}${kn}`,
`${Dn}${On}`;
var{
assign:An
}=Object,
jn=`listenerMiddleware`,
Mn=An($t(`${jn}/add`),
{
withTypes:()=>Mn
});
`${jn}`;
var Nn=An($t(`${jn}/remove`),
{
withTypes:()=>Nn
});
function Pn(e){
return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `
}var Fn={
Unknown:``,
AdventureNames:`Adventure Names`,
SiteNames:`Site Names`
},
In=F({
name:`adventureIdeasV2`,
initialState:{
ideas:[

],
ideasType:Fn.Unknown
},
reducers:{
setAdventureIdeasV2(e,
t){
e.ideas=t.payload
},
setAdventureIdeasTypeV2(e,
t){
e.ideasType=t.payload
}
}
}),
{
setAdventureIdeasV2:Ln,
setAdventureIdeasTypeV2:Rn
}=In.actions,
zn=In.reducer,
Bn=e=>e.adventureIdeasV2,
Vn=P([
Bn
],
e=>e.ideas),
Hn=P([
Bn
],
e=>e.ideasType);
P([
Bn
],
e=>({
ideas:e.ideas,
ideasType:e.ideasType
}));
function Un(e){
return e.map(e=>({
label:e,
value:e
}))
}var Wn=[
`Dwarf`,
`Elf`,
`Goblin`,
`Half-Orc`,
`Halfling`,
`Human`
],
Gn=[
{
label:`Dwarf`,
value:`Dwarf`
},
{
label:`Elf`,
value:`Elf`
},
{
label:`Goblin`,
value:`Goblin`
},
{
label:`Half-Orc`,
value:`HalfOrc`
},
{
label:`Halfling`,
value:`Halfling`
},
{
label:`Human`,
value:`Human`
}
],
Kn=[
`Core Rules`
];
Un(Kn),
Un([
`Fighter`,
`Thief`,
`Priest`,
`Wizard`
]);
var qn=Un([
`Priest`,
`Wizard`
]),
Jn=Un([
`0`,
`1`,
`2`,
`3`,
`4`,
`5`,
`6`,
`7`,
`8`,
`9`,
`10`
]),
Yn=[
`1`,
`2`,
`3`,
`4`,
`5`
],
Xn=Un(Yn),
Zn=[
`Poor`,
`Standard`,
`Wealthy`
],
Qn=[
`-4`,
`-3`,
`-2`,
`-1`,
`0`,
`+1`,
`+2`,
`+3`,
`+4`
],
$n=[
`Armor`,
`Potion`,
`Scroll`,
`Utility`,
`Wand`,
`Weapon`
],
er=[
{
label:`ignore`,
value:`-1`
},
{
label:`0`,
value:`0`
},
{
label:`1`,
value:`1`
},
{
label:`2`,
value:`2`
},
{
label:`3`,
value:`3`
},
{
label:`4`,
value:`4`
},
{
label:`5`,
value:`5`
},
{
label:`6`,
value:`6`
},
{
label:`7`,
value:`7`
},
{
label:`8`,
value:`8`
},
{
label:`9`,
value:`9`
},
{
label:`10`,
value:`10`
},
{
label:`11`,
value:`11`
},
{
label:`12`,
value:`12`
},
{
label:`13`,
value:`13`
},
{
label:`14`,
value:`14`
},
{
label:`15`,
value:`15`
},
{
label:`16`,
value:`16`
},
{
label:`17`,
value:`17`
},
{
label:`18`,
value:`18`
},
{
label:`19`,
value:`19`
},
{
label:`30`,
value:`30`
}
],
tr={
Core:`Core Rules`,
CursedScroll1:`Cursed Scroll 1`,
CursedScroll2:`Cursed Scroll 2`,
CursedScroll3:`Cursed Scroll 3`
},
nr=[
`1`,
`2`,
`3`,
`5`,
`8`,
`13`
],
rr=[
`1`,
`2`,
`3`,
`5`,
`8`
],
ir=[
`d4`,
`d6`,
`d8`,
`d10`,
`d12`,
`d20`,
`d100`
],
ar=[
`none`,
`d4`,
`d6`,
`d8`,
`d10`,
`d12`,
`d20`,
`d100`
],
or=[
{
label:`Random size`,
value:`0`
},
{
label:`2 crawlers`,
value:`2`
},
{
label:`3 crawlers`,
value:`3`
},
{
label:`4 crawlers`,
value:`4`
},
{
label:`5 crawlers`,
value:`5`
}
],
I={
RandomEncounter:`tool-random-encounter`,
NpcNames:`tool-npc-names`,
NpcGenerator:`tool-npc-generator`,
RivalCrawlers:`tool-rival-crawlers`,
ShopGenerator:`tool-shop-generator`,
TavernGenerator:`tool-tavern-generator`,
MagicItemGenerator:`tool-magic-item-generator`,
KnownSpellsGenerator:`tool-known-spells-generator`,
AdventureNames:`tool-adventure-names`,
AdventureSiteMap:`tool-adventure-site-map`,
MonsterReference:`tool-monster-reference`,
SpellReference:`tool-spell-reference`,
KnownSpellGenerator:`tool-known-spell-generator`
},
sr={
Monster:I.MonsterReference,
Spell:I.SpellReference
},
cr={
ByName:`by Name`,
ByLevel:`by Level`
},
lr={
ByName:`by Name`,
ByTier:`by Tier`
},
ur=[
`No Theme`,
`Random Theme`,
`Defense Full`,
`Defense Majority`,
`Offense Full`,
`Offense Majority`,
`Support Full`,
`Support Majority`,
`Selfish Support`
],
dr=Un(ur),
fr=ur.filter(e=>e.includes(`Full`)||e.includes(`Selfish`)||e.includes(`No Theme`));
Un(fr);
var pr=class e{
id=``;
casterClass=null;
level=null;
theme=`No Theme`;
spells={

};
constructor(t){
this.id=t,
this.spells=e.createEmptySpellTierMap()
}static createEmptySpellTierMap(){
let e={

};
for(let t of Yn)e[
t
]={
tier:t,
quantity:0,
spells:[

]
};
return e
}getCleanType(){
return{
sources:{

},
id:this.id,
casterClass:this.casterClass,
level:this.level,
theme:this.theme,
spells:this.spells
}
}static getEmptyType(){
return{
id:``,
sources:{

},
casterClass:null,
level:null,
theme:`No Theme`,
spells:e.createEmptySpellTierMap()
}
}
},
mr=F({
name:`knownSpells`,
initialState:{
generatedKnownSpells:pr.getEmptyType(),
selectedCasterClass:`Priest`,
selectedCasterLevel:`1`,
selectedTheme:`No Theme`
},
reducers:{
setSelectedCasterClass(e,
t){
e.selectedCasterClass=t.payload
},
setSelectedCasterLevel(e,
t){
e.selectedCasterLevel=t.payload
},
setSelectedTheme(e,
t){
e.selectedTheme=t.payload
},
setGeneratedKnownSpells(e,
t){
e.generatedKnownSpells=t.payload
}
}
}),
{
setSelectedCasterClass:hr,
setSelectedCasterLevel:gr,
setSelectedTheme:_r,
setGeneratedKnownSpells:vr
}=mr.actions,
yr=mr.reducer,
br=e=>e.knownSpells,
xr=P([
br
],
e=>e.generatedKnownSpells),
Sr=P([
br
],
e=>e.selectedCasterClass),
Cr=P([
br
],
e=>e.selectedCasterLevel),
wr=P([
br
],
e=>e.selectedTheme);
P([
br
],
e=>({
generatedKnownSpells:e.generatedKnownSpells,
selectedCasterClass:e.selectedCasterClass,
selectedCasterLevel:e.selectedCasterLevel,
selectedTheme:e.selectedTheme
}));
var Tr=function(e){
return e.Empty=`Empty`,
e.Armor=`Armor`,
e.Potion=`Potion`,
e.Scroll=`Scroll`,
e.Wand=`Wand`,
e.Utility=`Utility`,
e.Weapon=`Weapon`,
e
}(Tr||{

}),
L=class{
id=``;
name=``;
itemType=`Empty`;
nBenefits=0;
nCurses=0;
nVirtues=0;
nFlaws=0;
personalityVirtues=[

];
personalityFlaws=[

];
personalityTrait=``;
personalityAlignment=``;
type=``;
bonus=``;
feature=``;
benefits=[

];
curses=[

];
container=``;
liquid=``;
tasteSmell=``;
spellTier=``;
spell=``;
getCleanType(){
return{
id:this.id,
name:this.name,
itemType:this.itemType,
nBenefits:this.nBenefits,
nCurses:this.nCurses,
nVirtues:this.nVirtues,
nFlaws:this.nFlaws,
personalityVirtues:this.personalityVirtues,
personalityFlaws:this.personalityFlaws,
personalityTrait:this.personalityTrait,
personalityAlignment:this.personalityAlignment,
type:this.type,
bonus:this.bonus,
feature:this.feature,
benefits:this.benefits,
curses:this.curses,
container:this.container,
liquid:this.liquid,
tasteSmell:this.tasteSmell,
spellTier:this.spellTier,
spell:this.spell
}
}static getEmptyType(){
return{
id:``,
name:``,
itemType:`Empty`,
nBenefits:0,
nCurses:0,
nVirtues:0,
nFlaws:0,
personalityVirtues:[

],
personalityFlaws:[

],
personalityTrait:``,
personalityAlignment:``,
type:``,
bonus:``,
feature:``,
benefits:[

],
curses:[

],
container:``,
liquid:``,
tasteSmell:``,
spellTier:``,
spell:``
}
}static getNamedEffect(e,
t){
return{
name:e,
description:t
}
}
},
Er=class e{
magicItem=L.getEmptyType();
id;
name;
constructor(e){
this.magicItem=e,
this.id=e.id,
this.name=e.name
}description(){
let e=``;
switch(this.magicItem.itemType){
case`Armor`:case`Weapon`:e=`${this.magicItem.bonus} ${this.magicItem.type}`;
break;
case`Potion`:e=`Potion`;
break;
case`Utility`:e=`${this.magicItem.type}`;
break;
case`Scroll`:case`Wand`:e=`${this.magicItem.itemType} of ${this.magicItem.spell}`;
break;
default:return this.magicItem.id
}return e
}feature(){
let e=``;
switch(this.magicItem.itemType){
case`Armor`:case`Weapon`:case`Utility`:case`Scroll`:case`Wand`:e=this.magicItem.feature;
break;
case`Potion`:e=`${this.magicItem.container}`;
break;
default:return`this isn't right`
}return e
}subheading(){
let e=``;
switch(this.magicItem.itemType){
case`Armor`:case`Weapon`:e=this.magicItem.feature;
break;
case`Potion`:e=`${this.magicItem.itemType} - ${this.magicItem.container}`;
break;
case`Utility`:case`Scroll`:case`Wand`:e=`${this.magicItem.feature}`;
break;
default:return`this isn't right`
}return e
}benefitNames(){
return this.magicItem.benefits.map(e=>e.name).join(`; `)
}curseNames(){
return this.magicItem.curses.map(e=>e.name).join(`; `)
}personalitySummary(){
let e=`-`;
return this.magicItem.personalityAlignment.length>0&&(e=this.magicItem.personalityAlignment.charAt(0)),
`${this.magicItem.nVirtues}/${this.magicItem.nFlaws}/${e}`
}benefitsCursesList(){
return this.magicItem.benefits.concat(this.magicItem.curses)
}personalityList(){
let e=[

];
if(this.magicItem.nVirtues+this.magicItem.nFlaws>0){
let t=L.getNamedEffect(`Alignment`,
this.magicItem.personalityAlignment),
n=L.getNamedEffect(`Trait`,
this.magicItem.personalityTrait);
e.push(t),
e.push(n),
e=e.concat(this.magicItem.personalityVirtues),
e=e.concat(this.magicItem.personalityFlaws)
}return e
}featureList(){
let e=[

];
if(this.magicItem.itemType===`Potion`){
let t=L.getNamedEffect(`Container`,
this.magicItem.container),
n=L.getNamedEffect(`Liquid`,
this.magicItem.liquid),
r=L.getNamedEffect(`Smell/Taste`,
this.magicItem.tasteSmell);
e.push(t),
e.push(n),
e.push(r)
}return e
}static getEmptyDisplayData(){
return{
id:``,
name:``,
description:``,
feature:``,
subheading:``,
benefitNames:``,
curseNames:``,
personalitySummary:``,
benefitsCursesList:[

],
personalityList:[

],
featureList:[

]
}
}getDisplayType(){
let t=e.getEmptyDisplayData();
return t.id=this.id,
t.name=this.name,
t.description=this.description(),
t.feature=this.feature(),
t.subheading=this.subheading(),
t.benefitNames=this.benefitNames(),
t.curseNames=this.curseNames(),
t.personalitySummary=this.personalitySummary(),
t.benefitsCursesList=this.benefitsCursesList(),
t.personalityList=this.personalityList(),
t.featureList=this.featureList(),
t
}
},
Dr=L.getEmptyType(),
Or=F({
name:`magicItemGeneratorV2`,
initialState:{
savedMagicItemList:[

],
tempMagicItemList:[

],
selectedMagicItem:Dr,
selectedMagicItemId:``
},
reducers:{
setMagicItemSavedListV2(e,
t){
e.savedMagicItemList=t.payload
},
clearMagicItemSavedListV2(e,
t){
e.savedMagicItemList=[

]
},
setMagicItemTempListV2(e,
t){
e.tempMagicItemList=t.payload
},
clearMagicItemTempListV2(e,
t){
e.tempMagicItemList=[

]
},
addMagicItemToTempListV2(e,
t){
let n={
...t.payload
};
e.tempMagicItemList.push(n)
},
removeMagicItemFromTempListV2(e,
t){
e.tempMagicItemList=e.tempMagicItemList.filter(e=>e.id!==t.payload.id)
},
addMagicItemToSavedListV2(e,
t){
let n={
...t.payload
};
e.savedMagicItemList.push(n)
},
removeMagicItemFromSavedListV2(e,
t){
e.savedMagicItemList=e.savedMagicItemList.filter(e=>e.id!==t.payload.id)
},
setMagicItemSelectedV2(e,
t){
e.selectedMagicItem=t.payload
},
clearMagicItemSelectedV2(e,
t){
e.selectedMagicItem=Dr
},
setMagicItemSelectedIdV2(e,
t){
e.selectedMagicItemId=t.payload
},
clearMagicItemSelectedIdV2(e,
t){
e.selectedMagicItemId=``
}
}
}),
{
setMagicItemSavedListV2:kr,
clearMagicItemSavedListV2:Ar,
addMagicItemToSavedListV2:jr,
removeMagicItemFromSavedListV2:Mr,
setMagicItemTempListV2:Nr,
clearMagicItemTempListV2:Pr,
addMagicItemToTempListV2:Fr,
removeMagicItemFromTempListV2:Ir,
setMagicItemSelectedV2:Lr,
clearMagicItemSelectedV2:Rr,
setMagicItemSelectedIdV2:zr,
clearMagicItemSelectedIdV2:Br
}=Or.actions,
Vr=Or.reducer,
Hr=e=>e.magicItemGeneratorV2,
Ur=P([
Hr
],
e=>e.savedMagicItemList),
Wr=P([
Hr
],
e=>e.tempMagicItemList);
P([
Hr
],
e=>e.selectedMagicItem);
var Gr=P([
Hr
],
e=>e.selectedMagicItemId);
P([
Hr
],
e=>({
savedMagicItemList:e.savedMagicItemList,
tempMagicItemList:e.tempMagicItemList,
selectedMagicItem:e.selectedMagicItem,
selectedMagicItemId:e.selectedMagicItemId
}));
var Kr=class{
id=``;
monsters=[

];
constructor(e=[

]){
this.monsters=e,
this.id=gn()
}static getEmptyType(){
return{
id:``,
monsters:[

]
}
}getCleanType(){
return{
id:this.id,
monsters:this.monsters
}
}
},
R=class{
static log(e,
...t){

}static info(e,
...t){
console.log(`[INFO] ${e}`,
...t)
}static warn(e,
...t){
console.warn(`[WARN] ${e}`,
...t)
}static error(e,
...t){
console.error(`[ERROR] ${e}`,
...t)
}
},
z={
Attack:`attack`,
Biome:`biome`,
Effect:`effect`,
Movement:`movement`,
Trait:`trait`,
Type:`type`
},
qr={
[
tr.Core
]:!0,
[
tr.CursedScroll1
]:!1,
[
tr.CursedScroll2
]:!1,
[
tr.CursedScroll3
]:!1
},
Jr=F({
name:`monsterReferenceV2`,
initialState:{
sources:qr,
foundMonsters:Kr.getEmptyType(),
filterOptions:{
levelRange:{
lower:-1,
upper:-1
},
attackTags:[

],
biomeTags:[

],
effectTags:[

],
keywords:[

],
movementTags:[

],
traitTags:[

],
typeTags:[

]
},
sortOptions:{
sortAscending:!0,
sortPropertyA:cr.ByName
}
},
reducers:{
mrefToggleSource(e,
t){
let n={
...e.sources
};
n[
t.payload
]=!n[
t.payload
],
Object.values(n).some(e=>e)||(n[
tr.Core
]=!0),
e.sources=n
},
mrefResetSources(e,
t){
e.sources={
...qr
}
},
mrefSetFoundMonsters(e,
t){
e.foundMonsters=t.payload
},
mrefSetFilterLowerLevel(e,
t){
e.filterOptions.levelRange.lower=t.payload
},
mrefSetFilterUpperLevel(e,
t){
e.filterOptions.levelRange.upper=t.payload
},
mrefAddFilterTag(e,
t){
let n={
...e.filterOptions
};
switch(t.payload.type){
case z.Attack:n.attackTags.push(t.payload.tag),
n.attackTags=[
...new Set(n.attackTags)
];
break;
case z.Biome:n.biomeTags.push(t.payload.tag),
n.biomeTags=[
...new Set(n.biomeTags)
];
break;
case z.Effect:n.effectTags.push(t.payload.tag),
n.effectTags=[
...new Set(n.effectTags)
];
break;
case z.Movement:n.movementTags.push(t.payload.tag),
n.movementTags=[
...new Set(n.movementTags)
];
break;
case z.Trait:n.traitTags.push(t.payload.tag),
n.traitTags=[
...new Set(n.traitTags)
];
break;
case z.Type:n.typeTags.push(t.payload.tag),
n.typeTags=[
...new Set(n.typeTags)
];
break;
default:n.keywords.push(t.payload.tag),
n.keywords=[
...new Set(n.keywords)
];
break
}e.filterOptions=n
},
mrefRemoveFilterTag(e,
t){
R.log(`**** mrefRemoveFilterTag ****`,
t.payload);
let n={
...e.filterOptions
};
switch(R.log(`**** mrefRemoveFilterTag **** updatedFilterOptions`,
n),
t.payload.type){
case z.Attack:n.attackTags=[
...n.attackTags
].filter(e=>e!==t.payload.tag);
break;
case z.Biome:n.biomeTags=[
...n.biomeTags
].filter(e=>e!==t.payload.tag);
break;
case z.Effect:n.effectTags=[
...n.effectTags
].filter(e=>e!==t.payload.tag);
break;
case z.Movement:n.movementTags=[
...n.movementTags
].filter(e=>e!==t.payload.tag);
break;
case z.Trait:n.traitTags=[
...n.traitTags
].filter(e=>e!==t.payload.tag);
break;
case z.Type:n.typeTags=[
...n.typeTags
].filter(e=>e!==t.payload.tag);
break;
default:n.keywords=[
...n.keywords
].filter(e=>e!==t.payload.tag);
break
}e.filterOptions=n
},
mrefClearFilterTags(e,
t){
let n={
...e.filterOptions
};
switch(t.payload.type){
case z.Attack:n.attackTags=[

];
break;
case z.Biome:n.biomeTags=[

];
break;
case z.Effect:n.effectTags=[

];
break;
case z.Movement:n.movementTags=[

];
break;
case z.Trait:n.traitTags=[

];
break;
case z.Type:n.typeTags=[

];
break;
default:n.keywords=[

];
break
}e.filterOptions=n
},
mrefClearAllFilterTags(e,
t){
let n={
...e.filterOptions
};
n.attackTags=[

],
n.biomeTags=[

],
n.effectTags=[

],
n.movementTags=[

],
n.traitTags=[

],
n.typeTags=[

],
e.filterOptions=n
},
mrefSetFilterKeywords(e,
t){
let n={
...e.filterOptions
};
n.keywords=t.payload,
e.filterOptions=n
},
mrefClearFilterKeywords(e,
t){
let n={
...e.filterOptions
};
n.keywords=t.payload,
e.filterOptions=n
},
mrefSetSortProperty(e,
t){
let n={
...e.sortOptions
};
n.sortPropertyA=t.payload,
e.sortOptions=n
},
mrefSortToggleAscending(e,
t){
let n={
...e.sortOptions
};
n.sortAscending=!n.sortAscending,
e.sortOptions=n,
console.log(`mrefSortToggleAscending updatedSortOptions`,
n)
},
mrefTouchList(e,
t){
let n={
...e.foundMonsters
};
n.id=gn(),
e.foundMonsters=n
}
}
}),
{
mrefToggleSource:Yr,
mrefResetSources:Xr,
mrefSetFoundMonsters:Zr,
mrefSetFilterLowerLevel:Qr,
mrefSetFilterUpperLevel:$r,
mrefAddFilterTag:ei,
mrefRemoveFilterTag:ti,
mrefClearAllFilterTags:ni,
mrefSetFilterKeywords:ri,
mrefClearFilterKeywords:ii,
mrefSetSortProperty:ai,
mrefSortToggleAscending:oi,
mrefTouchList:si
}=Jr.actions,
ci=Jr.reducer,
li=e=>e.monsterReferenceV2,
ui=P([
li
],
e=>e.sources),
di=P([
li
],
e=>e.foundMonsters),
fi=P([
li
],
e=>e.filterOptions),
pi=P([
li
],
e=>e.sortOptions);
P([
li
],
e=>({
sources:e.sources,
foundMonsters:e.foundMonsters,
filterOptions:e.filterOptions
}));
var mi=class{
id=``;
name=``;
ancestry=``;
ancestryName=``;
age=``;
alignment=``;
wealth=``;
job=``;
appearance=``;
behavior=``;
secret=``;
hasDescription=!1;
description=null;
hasStoryHooks=!1;
storyHooks=null;
getCleanType(){
return{
id:this.id,
name:this.name,
ancestry:this.ancestry,
ancestryName:this.ancestryName,
age:this.age,
alignment:this.alignment,
wealth:this.wealth,
job:this.job,
appearance:this.appearance,
behavior:this.behavior,
secret:this.secret,
hasDescription:this.hasDescription,
description:this.description,
hasStoryHooks:this.hasStoryHooks,
storyHooks:this.storyHooks
}
}static getEmptyNpcDataType(){
return{
id:``,
name:``,
ancestry:``,
ancestryName:``,
age:``,
alignment:``,
wealth:``,
job:``,
appearance:``,
behavior:``,
secret:``,
hasDescription:!1,
description:null,
hasStoryHooks:!1,
storyHooks:null
}
}
},
hi=F({
name:`npcDetailsV2`,
initialState:{
npcSavedList:[

],
npcTempList:[

],
selectedNpc:mi.getEmptyNpcDataType(),
selectedNpcAncestry:``,
selectedNpcQuantity:5,
selectedNpcWealth:``
},
reducers:{
setNpcSelectedAncestryV2(e,
t){
e.selectedNpcAncestry=t.payload
},
setSelectedNpcQuantityV2(e,
t){
e.selectedNpcQuantity=t.payload
},
setSelectedNpcWealthV2(e,
t){
e.selectedNpcWealth=t.payload
},
setSelectedNpcV2(e,
t){
e.selectedNpc=t.payload
},
setNpcSavedListV2(e,
t){
e.npcSavedList=t.payload
},
setNpcTempListV2(e,
t){
e.npcTempList=t.payload
},
addNpcToSavedListV2(e,
t){
let n={
...t.payload
};
e.npcSavedList.push(n)
},
removeNpcFromSavedListV2(e,
t){
e.npcSavedList=e.npcSavedList.filter(e=>e.id!==t.payload.id)
},
addNpcToTempListV2(e,
t){
let n={
...t.payload
};
e.npcTempList.push(n)
},
removeNpcFromTempListV2(e,
t){
e.npcTempList=e.npcTempList.filter(e=>e.id!==t.payload.id)
}
}
}),
{
setNpcSelectedAncestryV2:gi,
setSelectedNpcQuantityV2:_i,
setSelectedNpcWealthV2:vi,
setNpcSavedListV2:yi,
setNpcTempListV2:bi,
addNpcToSavedListV2:xi,
addNpcToTempListV2:Si,
removeNpcFromSavedListV2:Ci,
removeNpcFromTempListV2:wi,
setSelectedNpcV2:Ti
}=hi.actions,
Ei=hi.reducer,
Di=e=>e.npcDetailsV2,
Oi=P([
Di
],
e=>e.npcSavedList),
ki=P([
Di
],
e=>e.npcTempList),
Ai=P([
Di
],
e=>e.selectedNpc),
ji=P([
Di
],
e=>e.selectedNpcAncestry),
B=P([
Di
],
e=>e.selectedNpcQuantity),
Mi=P([
Di
],
e=>e.selectedNpcWealth);
P([
Di
],
e=>({
npcSavedList:e.npcSavedList,
npcTempList:e.npcTempList,
selectedNpc:e.selectedNpc,
selectedNpcAncestry:e.selectedNpcAncestry,
selectedNpcQuantity:e.selectedNpcQuantity,
selectedNpcWealth:e.selectedNpcWealth
}));
var Ni={
ancestry:``,
names:[

]
},
Pi=F({
name:`npcNamesV2`,
initialState:{
namesList:Ni
},
reducers:{
setNpcNamesListV2(e,
t){
e.namesList=t.payload
},
clearNpcNamesListV2(e,
t){
e.namesList=Ni
},
setNpcNamesListAncestryV2(e,
t){
let n={
...e.namesList
};
n.ancestry=t.payload,
e.namesList=n
},
setNpcNamesListNamesV2(e,
t){
let n={
...e.namesList
};
n.names=t.payload,
e.namesList=n
}
}
}),
{
setNpcNamesListV2:Fi,
clearNpcNamesListV2:Ii,
setNpcNamesListAncestryV2:Li,
setNpcNamesListNamesV2:Ri
}=Pi.actions,
zi=Pi.reducer,
Bi=e=>e.npcNamesV2,
Vi=P([
Bi
],
e=>e.namesList);
P([
Bi
],
e=>e.namesList.ancestry),
P([
Bi
],
e=>e.namesList.names),
P([
Bi
],
e=>({
namesList:e.namesList
}));
var Hi=class{
id=``;
when=0;
encounterRoll=0;
charismaMod=0;
charismaModText=`0`;
distance=``;
activity=``;
reactionRoll=0;
reaction=``;
treasure=``;
encounterTableRoll=0;
getCleanType(){
return{
id:this.id,
when:this.when,
encounterRoll:this.encounterRoll,
charismaMod:this.charismaMod,
charismaModText:this.charismaModText,
distance:this.distance,
activity:this.activity,
reactionRoll:this.reactionRoll,
reaction:this.reaction,
treasure:this.treasure,
encounterTableRoll:this.encounterTableRoll
}
}static getEmptyEncounterDataType(){
return{
id:``,
when:0,
encounterRoll:0,
charismaMod:0,
charismaModText:`0`,
distance:``,
activity:``,
reactionRoll:0,
reaction:``,
treasure:``,
encounterTableRoll:0
}
}
},
Ui=F({
name:`randomEncounter`,
initialState:{
data:Hi.getEmptyEncounterDataType(),
log:[

],
doEncounterTableRoll:!1,
encounterTableDieType:``
},
reducers:{
setRandomEncounterV2(e,
t){
let n={
...t.payload
};
n.id=gn(),
e.data=n,
e.log.push(n)
},
updateRandomEncounterV2(e,
t){
let n={
...t.payload
};
e.data=n;
let r=e.log.map(e=>e.id).indexOf(t.payload.id);
e.log[
r
]=n
},
addReLogEntryV2(e,
t){
let n={
...t.payload
};
n.id=gn(),
e.log.push(n)
},
removeReLogEntryV2(e,
t){
e.log=e.log.filter(e=>e.id!==t.payload.id)
},
clearReLogV2(e){
e.log=[

]
},
toggleReDoEncounterTableRollV2(e,
t){
e.doEncounterTableRoll=!t.payload
},
setReEncounterTableDieTypeV2(e,
t){
e.encounterTableDieType=t.payload
}
}
}),
{
setRandomEncounterV2:Wi,
updateRandomEncounterV2:Gi,
addReLogEntryV2:Ki,
removeReLogEntryV2:qi,
clearReLogV2:Ji,
toggleReDoEncounterTableRollV2:Yi,
setReEncounterTableDieTypeV2:Xi
}=Ui.actions,
Zi=Ui.reducer,
Qi=e=>e.randomEncounter,
$i=P([
Qi
],
e=>e.data),
ea=P([
Qi
],
e=>e.log);
P([
Qi
],
e=>e.doEncounterTableRoll);
var ta=P([
Qi
],
e=>e.encounterTableDieType);
P([
Qi
],
e=>({
data:e.data,
log:e.log,
rollEncounterTableDie:e.doEncounterTableRoll,
encounterTableDie:e.encounterTableDieType
}));
var na=F({
name:`referenceSelector`,
initialState:{
selectedReferenceTool:sr.Monster
},
reducers:{
setSelectedReferenceTool(e,
t){
e.selectedReferenceTool=t.payload
}
}
}),
{
setSelectedReferenceTool:ra
}=na.actions,
ia=na.reducer,
aa=e=>e.referenceSelector;
P([
aa
],
e=>e.selectedReferenceTool),
P([
aa
],
e=>({
selectedReferenceTool:e.selectedReferenceTool
}));
var oa=class{
id=``;
name=``;
ancestry=``;
class=``;
level=0;
alignment=``;
getCleanType(){
return{
id:this.id,
name:this.name,
ancestry:this.ancestry,
class:this.class,
level:this.level,
alignment:this.alignment
}
}static getEmptyType(){
return{
id:``,
name:``,
ancestry:``,
class:``,
level:0,
alignment:``
}
}
},
sa=class{
id=``;
name=``;
knownFor=``;
alignment=``;
renown=``;
secret=``;
wealth=``;
tactic=``;
size=0;
members=[

];
getCleanType(){
return{
id:this.id,
name:this.name,
knownFor:this.knownFor,
alignment:this.alignment,
renown:this.renown,
secret:this.secret,
wealth:this.wealth,
tactic:this.tactic,
size:this.size,
members:this.members.map(e=>e.getCleanType())
}
}static getEmptyType(){
return{
id:``,
name:``,
knownFor:``,
alignment:``,
renown:``,
secret:``,
wealth:``,
tactic:``,
size:0,
members:[

]
}
}
},
ca=F({
name:`rivalCrawlersV2`,
initialState:{
rivalParty:sa.getEmptyType(),
rivalPartySize:0
},
reducers:{
setRivalPartySizeV2(e,
t){
e.rivalPartySize=t.payload
},
setRivalPartyV2(e,
t){
e.rivalParty=t.payload
},
clearRivalPartyV2(e,
t){
console.error(t),
e.rivalParty=sa.getEmptyType()
}
}
}),
{
setRivalPartySizeV2:la,
setRivalPartyV2:ua,
clearRivalPartyV2:da
}=ca.actions,
fa=ca.reducer,
pa=e=>e.rivalCrawlersV2,
ma=P([
pa
],
e=>e.rivalParty),
ha=P([
pa
],
e=>e.rivalPartySize);
P([
pa
],
e=>({
rivalParty:e.rivalParty,
rivalPartySize:e.rivalPartySize
}));
var ga=class{
id=``;
tier=``;
name=``;
type=``;
knownFor=``;
customer=``;
getCleanType(){
return{
id:this.id,
tier:this.tier,
name:this.name,
type:this.type,
knownFor:this.knownFor,
customer:this.customer
}
}static getEmptyType(){
return{
id:``,
tier:``,
name:``,
type:``,
knownFor:``,
customer:``
}
}
},
_a=ga.getEmptyType(),
va=F({
name:`shopGeneratorV2`,
initialState:{
savedShopList:[

],
tempShopList:[

],
selectedShop:_a,
selectedShopId:``
},
reducers:{
setShopSavedListV2(e,
t){
e.savedShopList=t.payload
},
clearShopSavedListV2(e,
t){
e.savedShopList=[

]
},
setShopTempListV2(e,
t){
e.tempShopList=t.payload
},
clearShopTempListV2(e,
t){
e.tempShopList=[

]
},
addShopToTempListV2(e,
t){
let n={
...t.payload
};
e.tempShopList.push(n)
},
removeShopFromTempListV2(e,
t){
e.tempShopList=e.tempShopList.filter(e=>e.id!==t.payload.id)
},
addShopToSavedListV2(e,
t){
let n={
...t.payload
};
e.savedShopList.push(n)
},
removeShopFromSavedListV2(e,
t){
e.savedShopList=e.savedShopList.filter(e=>e.id!==t.payload.id)
},
setShopSelectedV2(e,
t){
e.selectedShop=t.payload
},
clearShopSelectedV2(e,
t){
e.selectedShop=_a
},
setShopSelectedIdV2(e,
t){
e.selectedShopId=t.payload
},
clearShopSelectedIdV2(e,
t){
e.selectedShopId=``
}
}
}),
{
setShopSavedListV2:ya,
clearShopSavedListV2:ba,
addShopToSavedListV2:xa,
removeShopFromSavedListV2:Sa,
setShopTempListV2:Ca,
clearShopTempListV2:wa,
addShopToTempListV2:Ta,
removeShopFromTempListV2:Ea,
setShopSelectedV2:Da,
clearShopSelectedV2:Oa,
setShopSelectedIdV2:ka,
clearShopSelectedIdV2:Aa
}=va.actions,
ja=va.reducer,
Ma=e=>e.shopGeneratorV2,
Na=P([
Ma
],
e=>e.savedShopList),
Pa=P([
Ma
],
e=>e.tempShopList);
P([
Ma
],
e=>e.selectedShop);
var Fa=P([
Ma
],
e=>e.selectedShopId);
P([
Ma
],
e=>({
savedShopList:e.savedShopList,
tempShopList:e.tempShopList,
selectedShop:e.selectedShop,
selectedShopId:e.selectedShopId
}));
var Ia=class{
id=``;
row=-1;
column=-1;
present=!1;
type=``;
description=``;
getCleanType(){
return{
id:this.id,
row:this.row,
column:this.column,
present:this.present,
type:this.type,
description:this.description
}
}static getEmptyType(){
return{
id:``,
row:-1,
column:-1,
present:!1,
type:``,
description:``
}
}
},
La=class e{
id=``;
mapArea=[

];
nRows=0;
nColumns=0;
nLocations=0;
dangerLevel=``;
constructor(e,
t){
this.nRows=e,
this.nColumns=t;
for(let e=0;
e<this.nRows;
e++){
let e=[

];
for(let t=0;
t<this.nColumns;
t++)e.push(Ia.getEmptyType());
this.mapArea.push(e)
}
}setLocation(e,
t,
n){
let r=this.mapArea[
e
][
t
].present;
n.row=e,
n.column=t,
this.mapArea[
e
][
t
]=n,
r&&!n.present?this.nLocations--:!r&&n.present&&this.nLocations++
}duplicate(){
let t=new e(this.nRows,
this.nColumns);
return t.mapArea=JSON.parse(JSON.stringify(this.mapArea)),
t.nLocations=this.nLocations,
t.dangerLevel=this.dangerLevel,
t
}getCleanType(){
return{
id:this.id,
mapArea:JSON.parse(JSON.stringify(this.mapArea)),
nRows:this.nRows,
nColumns:this.nColumns,
nLocations:this.nLocations,
dangerLevel:this.dangerLevel
}
}static getEmptyType(){
return{
id:``,
mapArea:[

],
nRows:0,
nColumns:0,
nLocations:0,
dangerLevel:``
}
}static duplicateType(t){
let n=new e(t.nRows,
t.nColumns);
return n.id=t.id,
n.mapArea=JSON.parse(JSON.stringify(t.mapArea)),
n.nLocations=t.nLocations,
n.dangerLevel=t.dangerLevel,
n.getCleanType()
}static setLocationOnType(e,
t){
let n=e.mapArea[
t.row
][
t.column
].present;
e.mapArea[
t.row
][
t.column
]=t,
n&&!t.present?e.nLocations--:!n&&t.present&&e.nLocations++
}
},
Ra=F({
name:`siteMapV2`,
initialState:{
id:``,
dimensions:{
rowDim:12,
colDim:9
},
workingMap:La.getEmptyType(),
selectedLocation:Ia.getEmptyType(),
selectedLocationId:``,
options:{
allowEmptyLocations:!1,
locationCountDieRoll:``,
nLocations:9,
suggestedDangerLevel:`Unsafe`
}
},
reducers:{
setSiteWorkingMapV2(e,
t){
e.workingMap=t.payload
},
setSiteWorkingMapLocationV2(e,
t){
let n=La.duplicateType(e.workingMap);
La.setLocationOnType(n,
t.payload),
e.workingMap=n
},
setSiteSelectedLocationV2(e,
t){
e.selectedLocation=t.payload
},
setSiteAllowEmptyLocationV2(e,
t){
e.options.allowEmptyLocations=t.payload
},
setSiteOptionsLocationDieRollV2(e,
t){
e.options.locationCountDieRoll=t.payload
},
setSiteSuggestedDangerLevelV2(e,
t){
e.options.suggestedDangerLevel=t.payload
},
setSiteOptionsNLocationsV2(e,
t){
e.options.nLocations=t.payload
}
}
}),
{
setSiteWorkingMapV2:za,
setSiteWorkingMapLocationV2:Ba,
setSiteSelectedLocationV2:Va,
setSiteAllowEmptyLocationV2:Ha,
setSiteOptionsLocationDieRollV2:Ua,
setSiteSuggestedDangerLevelV2:Wa,
setSiteOptionsNLocationsV2:Ga
}=Ra.actions,
Ka=Ra.reducer,
qa=e=>e.siteMapV2,
Ja=P([
qa
],
e=>e.workingMap),
Ya=P([
qa
],
e=>e.dimensions);
P([
qa
],
e=>e.selectedLocationId);
var Xa=P([
qa
],
e=>e.selectedLocation),
Za=P([
qa
],
e=>e.options);
P([
qa
],
e=>({
id:e.id,
dimensions:e.dimensions,
workingMap:e.workingMap,
selectedLocation:e.selectedLocation,
selectedLocationId:e.selectedLocationId,
options:e.options
}));
var Qa=class{
id=``;
spells=[

];
constructor(e=[

]){
this.spells=e,
this.id=gn()
}static getEmptyType(){
return{
id:``,
spells:[

]
}
}getCleanType(){
return{
id:this.id,
spells:this.spells
}
}
},
$a={
Class:`class`,
Archetype:`archetype`,
Tier:`tier`,
Duration:`duration`,
Range:`range`,
Keyword:`keyword`,
SearchTerms:`searchTerms`
},
eo={
"Core Rules":!0
},
to=F({
name:`spellReferenceV2`,
initialState:{
sources:eo,
foundSpells:Qa.getEmptyType(),
filterOptions:{
classTags:[

],
archetypeTags:[

],
tierRange:{
lower:-1,
upper:-1
},
durationTags:[

],
rangeTags:[

],
keywordTags:[

],
searchTerms:[

]
},
sortOptions:{
sortAscending:!0,
sortPropertyA:lr.ByName
}
},
reducers:{
toggleSource(e,
t){
let n={
...e.sources
};
n[
t.payload
]=!n[
t.payload
],
Object.values(n).some(e=>e)||(n[
`Core Rules`
]=!0),
e.sources=n
},
resetSources(e,
t){
e.sources={
...eo
}
},
setFoundSpells(e,
t){
e.foundSpells=t.payload
},
setFilterLowerTier(e,
t){
e.filterOptions.tierRange.lower=t.payload
},
setFilterUpperTier(e,
t){
e.filterOptions.tierRange.upper=t.payload
},
addFilterTag(e,
t){
let n={
...e.filterOptions
};
switch(t.payload.type){
case $a.Class:n.classTags.push(t.payload.tag),
n.classTags=[
...new Set(n.classTags)
];
break;
case $a.Archetype:n.archetypeTags.push(t.payload.tag),
n.archetypeTags=[
...new Set(n.archetypeTags)
];
break;
case $a.Duration:n.durationTags.push(t.payload.tag),
n.durationTags=[
...new Set(n.durationTags)
];
break;
case $a.Range:n.rangeTags.push(t.payload.tag),
n.rangeTags=[
...new Set(n.rangeTags)
];
break;
case $a.Keyword:n.keywordTags.push(t.payload.tag),
n.keywordTags=[
...new Set(n.keywordTags)
];
break;
case $a.SearchTerms:n.searchTerms.push(t.payload.tag),
n.searchTerms=[
...new Set(n.searchTerms)
];
break;
default:n.searchTerms.push(t.payload.tag),
n.searchTerms=[
...new Set(n.searchTerms)
];
break
}e.filterOptions=n
},
removeFilterTag(e,
t){
R.log(`**** spell reference slice removeFilterTag ****`,
t.payload);
let n={
...e.filterOptions
};
switch(t.payload.type){
case $a.Class:n.classTags=n.classTags.filter(e=>e!==t.payload.tag);
break;
case $a.Archetype:n.archetypeTags=n.archetypeTags.filter(e=>e!==t.payload.tag);
break;
case $a.Duration:n.durationTags=n.durationTags.filter(e=>e!==t.payload.tag);
break;
case $a.Range:n.rangeTags=n.rangeTags.filter(e=>e!==t.payload.tag);
break;
case $a.Keyword:n.keywordTags=n.keywordTags.filter(e=>e!==t.payload.tag);
break;
case $a.SearchTerms:n.searchTerms=n.searchTerms.filter(e=>e!==t.payload.tag);
break;
default:n.searchTerms=n.searchTerms.filter(e=>e!==t.payload.tag);
break
}R.log(`**** spell reference slice removeFilterTag **** updatedFilterOptions`,
n),
e.filterOptions=n
},
clearFilterTags(e,
t){
let n={
...e.filterOptions
};
switch(t.payload.type){
case $a.Class:n.classTags=[

];
break;
case $a.Archetype:n.archetypeTags=[

];
break;
case $a.Duration:n.durationTags=[

];
break;
case $a.Range:n.rangeTags=[

];
break;
case $a.Keyword:n.keywordTags=[

];
break;
case $a.SearchTerms:n.searchTerms=[

];
break;
default:n.searchTerms=[

];
break
}
},
clearAllFilterTags(e,
t){
let n={
...e.filterOptions
};
n.classTags=[

],
n.archetypeTags=[

],
n.durationTags=[

],
n.rangeTags=[

],
n.keywordTags=[

],
e.filterOptions=n
},
setFilterSearchTerms(e,
t){
let n={
...e.filterOptions
};
n.searchTerms=t.payload,
e.filterOptions=n
},
clearFilterSearchTerms(e,
t){
let n={
...e.filterOptions
};
n.searchTerms=[

],
e.filterOptions=n
},
setSortProperty(e,
t){
let n={
...e.sortOptions
};
n.sortPropertyA=t.payload,
e.sortOptions=n
},
toggleSortAscending(e,
t){
let n={
...e.sortOptions
};
n.sortAscending=!n.sortAscending,
e.sortOptions=n,
console.log(`spellReferenceSortToggleAscending updatedSortOptions`,
n)
},
touchList(e,
t){
let n={
...e.foundSpells
};
n.id=gn(),
e.foundSpells=n
}
}
}),
{
toggleSource:no,
resetSources:ro,
setFoundSpells:io,
setFilterLowerTier:ao,
setFilterUpperTier:oo,
addFilterTag:so,
removeFilterTag:co,
clearFilterTags:lo,
clearAllFilterTags:V,
setFilterSearchTerms:H,
setSortProperty:uo,
toggleSortAscending:fo,
touchList:po
}=to.actions,
mo=to.reducer,
ho=e=>e.spellReferenceV2,
go=P(ho,
e=>e.sources),
_o=P(ho,
e=>e.foundSpells),
vo=P(ho,
e=>e.filterOptions),
yo=P(ho,
e=>e.sortOptions);
P([
ho
],
e=>({
sources:e.sources,
foundSpells:e.foundSpells,
filterOptions:e.filterOptions
}));
var bo=class{
name=``;
cost=``;
effect=``;
getCleanType(){
return{
name:this.name,
cost:this.cost,
effect:this.effect
}
}static getEmptyType(){
return{
name:``,
cost:``,
effect:``
}
}static getCleanTypeFromEntry(e){
return{
name:e.name,
cost:e.cost,
effect:e.effect
}
}static getDrinkAsString(e){
return!e||!e.name?``:`${e.name} (${e.cost}), ${e.effect}`
}
},
xo=class{
id=``;
tier=``;
name=``;
knownFor=``;
menu=[

];
drinks=[

];
getCleanType(){
return{
id:this.id,
tier:this.tier,
name:this.name,
knownFor:this.knownFor,
menu:this.menu.slice(),
drinks:this.drinks.slice()
}
}static getEmptyType(){
return{
id:``,
tier:``,
name:``,
knownFor:``,
menu:[

],
drinks:[

]
}
}static getDrinkMenuAsString(e){
return e.menu.length===0?`No menu items available.`:e.drinks.map(e=>bo.getDrinkAsString(e)).join(`; `)
}
},
So=xo.getEmptyType(),
Co=F({
name:`tavernGeneratorV2`,
initialState:{
savedTavernList:[

],
tempTavernList:[

],
selectedTavern:So,
selectedTavernId:``
},
reducers:{
setTavernSavedListV2(e,
t){
e.savedTavernList=t.payload
},
clearTavernSavedListV2(e,
t){
e.savedTavernList=[

]
},
setTavernTempListV2(e,
t){
e.tempTavernList=t.payload
},
clearTavernTempListV2(e,
t){
e.tempTavernList=[

]
},
addTavernToTempListV2(e,
t){
let n={
...t.payload
};
e.tempTavernList.push(n)
},
removeTavernFromTempListV2(e,
t){
e.tempTavernList=e.tempTavernList.filter(e=>e.id!==t.payload.id)
},
addTavernToSavedListV2(e,
t){
let n={
...t.payload
};
e.savedTavernList.push(n)
},
removeTavernFromSavedListV2(e,
t){
e.savedTavernList=e.savedTavernList.filter(e=>e.id!==t.payload.id)
},
setTavernSelectedV2(e,
t){
e.selectedTavern=t.payload
},
clearTavernSelectedV2(e,
t){
e.selectedTavern=So
},
setTavernSelectedIdV2(e,
t){
e.selectedTavernId=t.payload
},
clearTavernSelectedIdV2(e,
t){
e.selectedTavernId=``
}
}
}),
{
setTavernSavedListV2:wo,
clearTavernSavedListV2:To,
addTavernToSavedListV2:Eo,
removeTavernFromSavedListV2:Do,
setTavernTempListV2:Oo,
clearTavernTempListV2:ko,
addTavernToTempListV2:Ao,
removeTavernFromTempListV2:jo,
setTavernSelectedV2:Mo,
clearTavernSelectedV2:No,
setTavernSelectedIdV2:Po,
clearTavernSelectedIdV2:Fo
}=Co.actions,
Io=Co.reducer,
Lo=e=>e.tavernGeneratorV2,
Ro=P([
Lo
],
e=>e.savedTavernList),
zo=P([
Lo
],
e=>e.tempTavernList);
P([
Lo
],
e=>e.selectedTavern);
var Bo=P([
Lo
],
e=>e.selectedTavernId);
P([
Lo
],
e=>({
savedTavernList:e.savedTavernList,
tempTavernList:e.tempTavernList,
selectedTavern:e.selectedTavern,
selectedTavernId:e.selectedTavernId
}));
var Vo=F({
name:`trapsHazards`,
initialState:{
traps:[

],
trapQuantity:3,
hazards:[

],
hazardQuantity:3
},
reducers:{
setTraps(e,
t){
e.traps=t.payload
},
setTrapQuantity(e,
t){
e.trapQuantity=t.payload
},
setHazards(e,
t){
e.hazards=t.payload
},
setHazardQuantity(e,
t){
e.hazardQuantity=t.payload
}
}
}),
{
setTraps:Ho,
setTrapQuantity:Uo,
setHazards:Wo,
setHazardQuantity:Go
}=Vo.actions,
Ko=Vo.reducer,
qo=F({
name:`npcsAdvanced`,
initialState:{
advancedNpcSavedList:[

],
advancedNpcTempList:[

],
selectedAdvancedNpc:mi.getEmptyNpcDataType(),
selectedAdvancedNpcId:``,
selectedAdvancedNpcAncestry:``,
selectedAdvancedNpcQuantity:5,
selectedAdvancedNpcWealth:``
},
reducers:{
setAdvancedNpcSelectedQuantity(e,
t){
e.selectedAdvancedNpcQuantity=t.payload
},
setAdvancedNpcSelectedAncestry(e,
t){
e.selectedAdvancedNpcAncestry=t.payload
},
setAdvancedNpcSelectedWealth(e,
t){
e.selectedAdvancedNpcWealth=t.payload
},
setSelectedAdvancedNpc(e,
t){
e.selectedAdvancedNpc=t.payload
},
setSelectedAdvancedNpcId(e,
t){
e.selectedAdvancedNpcId=t.payload
},
addDetailsToSelectedAdvancedNpcId(e,
t){
if(R.log(`=== npcAdvancedSlice: adding details to selected Id = ${e.selectedAdvancedNpcId}`),
e.advancedNpcTempList.findIndex(t=>t.id===e.selectedAdvancedNpcId)>0){
R.log(`=== npcAdvancedSlice: adding details to selected: found in temp list`),
e.advancedNpcTempList=e.advancedNpcTempList.map(n=>{
let r={
...n
};
return n.id===e.selectedAdvancedNpcId&&(r.description={
...t.payload
},
r.hasDescription=!0),
r
});
return
}if(e.advancedNpcSavedList.findIndex(t=>t.id===e.selectedAdvancedNpcId)>0){
R.log(`=== npcAdvancedSlice: adding details to selected: found in saved list`),
e.advancedNpcSavedList=e.advancedNpcSavedList.map(n=>{
let r={
...n
};
return n.id===e.selectedAdvancedNpcId&&(r.description={
...t.payload
},
r.hasDescription=!0),
r
});
return
}
},
addHooksToSelectedAdvancedNpcId(e,
t){
if(R.log(`=== npcAdvancedSlice: adding details to selected Id = ${e.selectedAdvancedNpcId}`),
e.advancedNpcTempList.findIndex(t=>t.id===e.selectedAdvancedNpcId)>0){
R.log(`=== npcAdvancedSlice: adding details to selected: found in temp list`),
e.advancedNpcTempList=e.advancedNpcTempList.map(n=>{
let r={
...n
};
return n.id===e.selectedAdvancedNpcId&&(r.storyHooks={
...t.payload
},
r.hasStoryHooks=!0),
r
});
return
}if(e.advancedNpcSavedList.findIndex(t=>t.id===e.selectedAdvancedNpcId)>0){
R.log(`=== npcAdvancedSlice: adding details to selected: found in saved list`),
e.advancedNpcSavedList=e.advancedNpcSavedList.map(n=>{
let r={
...n
};
return n.id===e.selectedAdvancedNpcId&&(r.storyHooks={
...t.payload
},
r.hasStoryHooks=!0),
r
});
return
}
},
addDetailsToAdvancedNpc(e,
t){
R.log(`=== npcAdvancedSlice: state.selectedAdvancedNpc BEFORE MODIFICATION: `,
e.selectedAdvancedNpc),
R.log(`=== npcAdvancedSlice: payload: `,
t.payload);
let n={
...e.selectedAdvancedNpc
};
R.log(`=== npcAdvancedSlice: newData: `,
n),
n.description={
...t.payload
},
n.hasDescription=!0,
R.log(`=== npcAdvancedSlice: newData after spread: `,
n),
e.selectedAdvancedNpc=n,
R.log(`=== npcAdvancedSlice: state.selectedAdvancedNpc: `,
e.selectedAdvancedNpc)
},
addHooksToAdvancedNpc(e,
t){
let n={
...e.selectedAdvancedNpc
};
n.storyHooks={
...t.payload
},
n.hasStoryHooks=!0,
e.selectedAdvancedNpc=n
},
setAdvancedNpcTempList(e,
t){
e.advancedNpcTempList=t.payload
},
addAdvancedNpcToTempList(e,
t){
let n={
...t.payload
};
e.advancedNpcTempList.push(n)
},
removeAdvancedNpcFromTempList(e,
t){
e.advancedNpcTempList=e.advancedNpcTempList.filter(e=>e.id!==t.payload.id)
},
addAdvancedNpcToSavedList(e,
t){
let n={
...t.payload
};
e.advancedNpcSavedList.push(n)
},
removeAdvancedNpcFromSavedList(e,
t){
e.advancedNpcSavedList=e.advancedNpcSavedList.filter(e=>e.id!==t.payload.id)
}
}
}),
{
setAdvancedNpcSelectedQuantity:Jo,
setAdvancedNpcSelectedAncestry:Yo,
setAdvancedNpcSelectedWealth:Xo,
setSelectedAdvancedNpc:Zo,
addDetailsToAdvancedNpc:Qo,
addHooksToAdvancedNpc:$o,
setSelectedAdvancedNpcId:es,
addDetailsToSelectedAdvancedNpcId:ts,
addHooksToSelectedAdvancedNpcId:ns,
setAdvancedNpcTempList:rs,
addAdvancedNpcToTempList:is,
removeAdvancedNpcFromTempList:as,
addAdvancedNpcToSavedList:os,
removeAdvancedNpcFromSavedList:ss
}=qo.actions,
cs=qo.reducer,
ls=e=>e.npcAdvanced;
P([
ls
],
e=>e.advancedNpcSavedList),
P([
ls
],
e=>e.advancedNpcTempList),
P([
ls
],
e=>e.selectedAdvancedNpc),
P([
ls
],
e=>e.selectedAdvancedNpcId),
P([
ls
],
e=>e.selectedAdvancedNpcAncestry),
P([
ls
],
e=>e.selectedAdvancedNpcQuantity),
P([
ls
],
e=>e.selectedAdvancedNpcWealth),
P([
ls
],
e=>({
advancedNpcSavedList:e.advancedNpcSavedList,
advancedNpcTempList:e.advancedNpcTempList,
selectedAdvancedNpc:e.selectedAdvancedNpc,
selectedAdvancedNpcId:e.selectedAdvancedNpcId,
selectedAdvancedNpcAncestry:e.selectedAdvancedNpcAncestry,
selectedAdvancedNpcQuantity:e.selectedAdvancedNpcQuantity,
selectedAdvancedNpcWealth:e.selectedAdvancedNpcWealth
}));
var us=dn({
reducer:{
adventureIdeasV2:zn,
knownSpells:yr,
magicItemGeneratorV2:Vr,
monsterReferenceV2:ci,
npcDetailsV2:Ei,
npcNamesV2:zi,
randomEncounter:Zi,
referenceSelector:ia,
rivalCrawlersV2:fa,
shopGeneratorV2:ja,
siteMapV2:Ka,
spellReferenceV2:mo,
tavernGeneratorV2:Io,
trapsHazards:Ko,
npcAdvanced:cs
}
}),
ds=o(((e,
t)=>{
(function(){
var e={

}.hasOwnProperty;
function n(){
for(var e=``,
t=0;
t<arguments.length;
t++){
var n=arguments[
t
];
n&&(e=i(e,
r(n)))
}return e
}function r(t){
if(typeof t==`string`||typeof t==`number`)return t;
if(typeof t!=`object`)return``;
if(Array.isArray(t))return n.apply(null,
t);
if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes(`[native code]`))return t.toString();
var r=``;
for(var a in t)e.call(t,
a)&&t[
a
]&&(r=i(r,
a));
return r
}function i(e,
t){
return t?e?e+` `+t:e+t:e
}t!==void 0&&t.exports?(n.default=n,
t.exports=n):typeof define==`function`&&typeof define.amd==`object`&&define.amd?define(`classnames`,
[

],
function(){
return n
}):window.classNames=n
})()
})),
fs=o((e=>{
var t=Symbol.for(`react.transitional.element`),
n=Symbol.for(`react.fragment`);
function r(e,
n,
r){
var i=null;
if(r!==void 0&&(i=``+r),
n.key!==void 0&&(i=``+n.key),
`key`in n)for(var a in r={

},
n)a!==`key`&&(r[
a
]=n[
a
]);
else r=n;
return n=r.ref,
{
$$typeof:t,
type:e,
key:i,
ref:n===void 0?null:n,
props:r
}
}e.Fragment=n,
e.jsx=r,
e.jsxs=r
})),
ps=o(((e,
t)=>{
t.exports=fs()
})),
ms=l(ds(),
1),
U=ps();
function hs(e){
let{
toggleValue:t,
primary:n,
secondary:r,
subtle:i,
solo:a,
left:o,
center:s,
right:c,
lefttoright:l,
toggleOffIcon:u,
toggleOnIcon:d,
iconOnly:f,
noFade:p,
functionButtonSet:m,
toggleOffText:h,
toggleOnText:g,
..._
}=e,
v=(0,
ms.default)(_.className,
`font-face-montserrat-medium flex items-center px-3 cursor-pointer`,
{
"border border-black bg-black text-white":n,
"border-2 border-black bg-white text-black":r,
"border hover:text-black hover:border-black":i,
"border-gray-500 text-black":p||t,
"border-gray-400 text-gray-400":!p&&!t,
"rounded-lg py-1.5":a,
"rounded-l-lg":o,
"":s,
"rounded-r-lg":c,
"rounded-lg":l,
"hover:text-black":f,
"flex-1":m
}),
y=t?g?(0,
U.jsxs)(U.Fragment,
{
children:[
d,
`\xA0`,
g
]
}):d:h?(0,
U.jsxs)(U.Fragment,
{
children:[
u,
`\xA0`,
h
]
}):u;
return(0,
U.jsx)(`button`,
{
..._,
className:v,
children:y
})
}var gs={
color:void 0,
size:void 0,
className:void 0,
style:void 0,
attr:void 0
},
_s=m.createContext&&m.createContext(gs),
vs=[
`attr`,
`size`,
`title`
];
function ys(e,
t){
if(e==null)return{

};
var n,
r,
i=bs(e,
t);
if(Object.getOwnPropertySymbols){
var a=Object.getOwnPropertySymbols(e);
for(r=0;
r<a.length;
r++)n=a[
r
],
t.indexOf(n)===-1&&{

}.propertyIsEnumerable.call(e,
n)&&(i[
n
]=e[
n
])
}return i
}function bs(e,
t){
if(e==null)return{

};
var n={

};
for(var r in e)if({

}.hasOwnProperty.call(e,
r)){
if(t.indexOf(r)!==-1)continue;
n[
r
]=e[
r
]
}return n
}function xs(){
return xs=Object.assign?Object.assign.bind():function(e){
for(var t=1;
t<arguments.length;
t++){
var n=arguments[
t
];
for(var r in n)({

}).hasOwnProperty.call(n,
r)&&(e[
r
]=n[
r
])
}return e
},
xs.apply(null,
arguments)
}function Ss(e,
t){
var n=Object.keys(e);
if(Object.getOwnPropertySymbols){
var r=Object.getOwnPropertySymbols(e);
t&&(r=r.filter(function(t){
return Object.getOwnPropertyDescriptor(e,
t).enumerable
})),
n.push.apply(n,
r)
}return n
}function Cs(e){
for(var t=1;
t<arguments.length;
t++){
var n=arguments[
t
]==null?{

}:arguments[
t
];
t%2?Ss(Object(n),
!0).forEach(function(t){
ws(e,
t,
n[
t
])
}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,
Object.getOwnPropertyDescriptors(n)):Ss(Object(n)).forEach(function(t){
Object.defineProperty(e,
t,
Object.getOwnPropertyDescriptor(n,
t))
})
}return e
}function ws(e,
t,
n){
return(t=Ts(t))in e?Object.defineProperty(e,
t,
{
value:n,
enumerable:!0,
configurable:!0,
writable:!0
}):e[
t
]=n,
e
}function Ts(e){
var t=Es(e,
`string`);
return typeof t==`symbol`?t:t+``
}function Es(e,
t){
if(typeof e!=`object`||!e)return e;
var n=e[
Symbol.toPrimitive
];
if(n!==void 0){
var r=n.call(e,
t||`default`);
if(typeof r!=`object`)return r;
throw TypeError(`@@toPrimitive must return a primitive value.`)
}return(t===`string`?String:Number)(e)
}function Ds(e){
return e&&e.map((e,
t)=>m.createElement(e.tag,
Cs({
key:t
},
e.attr),
Ds(e.child)))
}function W(e){
return t=>m.createElement(Os,
xs({
attr:Cs({

},
e.attr)
},
t),
Ds(e.child))
}function Os(e){
var t=t=>{
var n=e.attr,
r=e.size,
i=e.title,
a=ys(e,
vs),
o=r||t.size||`1em`,
s;
return t.className&&(s=t.className),
e.className&&(s=(s?s+` `:``)+e.className),
m.createElement(`svg`,
xs({
stroke:`currentColor`,
fill:`currentColor`,
strokeWidth:`0`
},
t.attr,
n,
a,
{
className:s,
style:Cs(Cs({
color:e.color||t.color
},
t.style),
e.style),
height:o,
width:o,
xmlns:`http://www.w3.org/2000/svg`
}),
i&&m.createElement(`title`,
null,
i),
e.children)
};
return _s===void 0?t(gs):m.createElement(_s.Consumer,
null,
e=>t(e))
}function ks(e){
return W({
tag:`svg`,
attr:{
fill:`currentColor`,
viewBox:`0 0 16 16`
},
child:[
{
tag:`path`,
attr:{
d:`M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2`
},
child:[

]
}
]
})(e)
}function As(e){
return W({
tag:`svg`,
attr:{
fill:`currentColor`,
viewBox:`0 0 16 16`
},
child:[
{
tag:`path`,
attr:{
d:`M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2`
},
child:[

]
}
]
})(e)
}function js(e){
return W({
tag:`svg`,
attr:{
fill:`currentColor`,
viewBox:`0 0 16 16`
},
child:[
{
tag:`path`,
attr:{
fillRule:`evenodd`,
d:`M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2`
},
child:[

]
}
]
})(e)
}function Ms(e){
return W({
tag:`svg`,
attr:{
fill:`currentColor`,
viewBox:`0 0 16 16`
},
child:[
{
tag:`path`,
attr:{
d:`M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354m1.58 1.408-.002-.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a5 5 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a5 5 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.8 1.8 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14q.091.15.214.271a1.8 1.8 0 0 0 .37.282`
},
child:[

]
}
]
})(e)
}function Ns(e){
return W({
tag:`svg`,
attr:{
fill:`currentColor`,
viewBox:`0 0 16 16`
},
child:[
{
tag:`path`,
attr:{
d:`M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146`
},
child:[

]
}
]
})(e)
}function Ps(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`M106 113.773l-32.963 74.375c-1.058.223-2.103.455-3.12.704-5.293 1.296-9.95 2.918-14.044 4.79l-8.266-53.435-25.037 87.277c-1.296 3.723-2.424 7.607-3.338 11.635l-.26.905.07-.04c-3.632 16.665-3.56 35.726 3.597 55.818 3.306 14.022 15.515 30.355 40.24 48.135 29.193 20.992 75.05 42.954 138.495 63.86-.253-1.795-.393-3.625-.393-5.486 0-12.21 5.637-23.185 14.432-30.447l-4.07-42.73-31.54 37.69c-9.764-3.686-19.047-7.46-27.896-11.3l-2.95-78.177-33.57 60.615c-9.068-4.85-17.496-9.773-25.294-14.75l-4.627-90.04-28.932 65.057c-7.485-6.607-13.957-13.243-19.45-19.86-4.244-20.016-.412-38.063 6.145-52.42l4.483-2.602c15.852-5.496 35.514-7.645 58.504-6.182 32.732 2.084 72.51 11.748 118.152 30.803.098-13.092 7.704-24.51 18.692-30.142l-5.597-52.59-30.14 42.78c-9.68-3.6-19.025-6.73-28.012-9.41l-4.26-68.73-32.567 59.774c-11.784-2.163-22.712-3.436-32.716-3.91l-3.77-71.97zm323.08 29.936l-15.973 70.28c-9.928-1.244-20.884-1.876-32.837-1.777l-19.58-66.443-18.075 68.964c-9.342 1.12-19.127 2.635-29.316 4.55l-19.015-44.84-16.422 45.742c8.9 6.183 14.768 16.47 14.768 28.04 0 2.407-.257 4.758-.74 7.03 47.224-10.57 87.28-13.166 119.37-9.7 22.9 2.47 41.908 7.938 56.592 16.05l3.978 3.332c4.016 15.265 4.72 33.704-2.873 52.707-6.54 5.582-14.047 11.016-22.547 16.25l-17.43-69.034-19.89 87.94c-8.51 3.565-17.626 6.972-27.356 10.198l-19.724-61.576-19.274 72.674c-9.347 2.27-19.107 4.404-29.326 6.37l-22.605-45.43-14.87 49.995c2.57 5.23 4.02 11.097 4.02 17.283 0 5.728-1.25 11.18-3.476 16.107 70.416-9.85 122.176-24.18 155.893-40.565 27.394-13.31 42.205-27.326 47.852-40.582 10.472-18.58 13.79-37.348 13.048-54.388l.063.053-.102-.942c-.214-4.126-.664-8.146-1.308-12.035l-9.81-90.26-17.243 51.245c-3.714-2.54-8.03-4.93-13.023-7.11-.96-.417-1.95-.822-2.954-1.222L429.08 143.71zm-170.584 89.07c-8.642 0-15.443 6.802-15.443 15.445 0 3.53 1.15 6.74 3.084 9.318 3.42.025 6.915.164 10.468.422 4.313.313 8.527.796 12.633 1.422 2.91-2.793 4.705-6.733 4.705-11.162 0-8.64-6.806-15.446-15.447-15.446zm-12.652 43.468c-1.02-.003-2.032.005-3.033.025-12.016.244-22.59 2.134-30.23 4.98-5.094 1.9-8.82 4.23-10.85 6.22-2.03 1.99-2.375 3.155-2.375 4.37 0 2.426 3.81 8.437 14.258 13.844 10.448 5.408 25.905 9.714 42.992 10.954 17.088 1.24 32.486-.854 42.674-4.65 5.093-1.898 8.82-4.23 10.85-6.22 2.03-1.987 2.374-3.154 2.374-4.368 0-2.43-3.81-8.44-14.258-13.847-10.447-5.408-25.904-9.712-42.992-10.95-3.204-.234-6.348-.348-9.41-.357zm-5.688 57.215l-2.96 29.51c1.08-.09 2.17-.15 3.273-.15 5.382 0 10.524 1.1 15.214 3.077l3.05-30.406c-1.153-.06-2.313-.13-3.48-.215-5.18-.376-10.223-.992-15.098-1.817zm.313 48.05c-11.6 0-20.798 9.2-20.798 20.8 0 11.595 9.2 20.796 20.797 20.796 11.594 0 20.798-9.203 20.798-20.798 0-11.595-9.202-20.798-20.8-20.798z`
},
child:[

]
}
]
})(e)
}function Fs(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`M224 16c9.31 18.785 17.753 36.16 18.432 55.023-17.87-28.13-36.732-40.03-55.45-39.83-75.257.8-148.13 196.844-144.375 316.977-.807.27-1.604.627-2.388 1.096-6.073 3.63-2.683 14.002-5.454 20.51-3.34 7.847-12.15 13.42-13.27 21.874-.638 4.813-.54 10.275.604 15.35h170.205c-3.752-14.69-16.34-30.192-27.96-38.275-4.04-2.81-10.637 2.004-14.747-.704-8.482-5.586-3.99-23.436-13.346-27.39-6.09-2.573-12.2-1.383-18.375 1.337-5.05-123.26 30.544-300.777 110.29-265.57-26.42 6.366-38.066 15.83-44.36 51.603C192 112 198.89 99.364 224 103.225l70.207-.102s36.39 41.937 41.793 51.42c5.7 10-16.088-70.203-35.4-80.29 67.713 2.167 97.32 184.88 92.64 299.102-6.174-2.72-24.083-33.364-30.174-30.79-9.355 3.952-14.435 9.435-17.205 15.976-1.918 4.533-.837 22.65-4.878 25.46-10.016 6.968-18.6 14.533-21.918 23h172.534c-1.792-9.308-8.48-27.793-11.598-35.115-2.772-6.51 31.833-42.637 0-24.8-.797.446-9.8 1.354-10.607 1.085 3.756-120.133-69.118-316.177-144.375-316.977-19.003-.202-38.155 12.056-56.264 41.118 2.08-11.74 12.37-29.412 27.695-46.828-24.735 6.185-34.4 3.85-40.45 28.95-9.23-14.43-14.098-32.17-32-38.432zm6.486 105l-12.77 38.31L229.563 183h52.875l11.846-23.69-12.77-38.31h-51.027zm-69.67 80l20 30h150.368l20-30H160.816zm69.278 48l-28.803 72.004L215.624 407h80.752l14.334-85.996L281.905 249h-51.812zm-85.408 58.854c-.462-.02-.933.02-1.41.12-9.907 2.074-11.824 24.963-3.16 30.198 5.056 3.056 13.384-4.083 14.747-9.832 1.69-7.126-3.253-20.2-10.177-20.486zm235.43 11.05c-6.925.287-6.22 6.283-4.532 13.41 1.363 5.748 3.36 15.12 8.416 12.065 6.282-4.456 7.55-21.835-3.885-25.476zm-356.022 6.262c-18.387.412 2.35 38.416 7.906 35.984-6.418-22.52 12.297-34.22-7.002-35.976a14.282 14.282 0 0 0-.904-.008zm144.142 14.375a3.42 3.42 0 0 0-.73.038c-1.732 7.747-12.483 11.202-9.13 15.803 3.74 4.41 14.555-.765 16.153-6.32 1.02-3.545-2.633-9.32-6.294-9.52zM336 342.7c-3.66.2-3.898 8.917-2.88 12.46 1.6 5.557 5.835 9.134 9.575 4.725 2.026-3.16-5.553-8.373-6.695-17.184zM25 425v14h462v-14H25zm23.816 32l20 30h374.368l20-30H48.816z`
},
child:[

]
}
]
})(e)
}function Is(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`M250.882 22.802c-23.366 3.035-44.553 30.444-44.553 65.935 0 19.558 6.771 36.856 16.695 48.815l11.84 14.263-18.217 3.424c-12.9 2.425-22.358 9.24-30.443 20.336-8.085 11.097-14.266 26.558-18.598 44.375-7.843 32.28-9.568 71.693-9.842 106.436h42.868l11.771 157.836c29.894 6.748 61.811 6.51 90.602.025l10.414-157.86h40.816c-.027-35.169-.477-75.126-7.584-107.65-3.918-17.934-9.858-33.372-18.04-44.343-8.185-10.97-18.08-17.745-32.563-19.989l-18.592-2.88 11.736-14.704c9.495-11.897 15.932-28.997 15.932-48.082 0-37.838-23.655-65.844-49.399-65.844z`
},
child:[

]
}
]
})(e)
}function Ls(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`M410.365 101.005c8.21-22.26 16.21-31.12 20.33-34.45 3.06-2.48 5.73-3.42 7.92-2.81 4 1.13 8.49 7.45 11.88 16.89 10.89 30.34 10 84.28-.93 129.51zm-286 72.92c7.52-31 10.28-66.13 7.77-94.92l-43.6-4.86zm289.46-113l-301.2-33.53c-2.5-.28-5.24 1.46-7.11 3-3.67 3-10.42 10.32-17.66 27.64l308.68 34.34c5.16-13.25 11.02-23.89 17.31-31.43zm-228.78 298.71v-70.72l10.76 1.19 42.24 5.18v70.51zm16-40.34a13 13 0 0 0 5.34 10.29l-2.34 24.42 17 1.74-4-25a9.54 9.54 0 0 0 5-9.15 13.64 13.64 0 0 0-11.06-12.59s.17.1.13.1c-5.95-.68-11.07 3.9-10.07 10.1zm53 64.45l-85-9.84v-86.72l-1.05-.09a8.14 8.14 0 0 1-7.27 6.71 8 8 0 0 1 5.23 8.9 8 8 0 0 1-8 6.66c8.453 4.004 4.341 16.778-4.86 15.1a8 8 0 0 1-8 13.8 8.01 8.01 0 0 1-12.28 10.29v.09a8 8 0 0 1-3.86 8.37l9.13 5.35v14.25l-12 7.13-12-7.12v-14.26l8.15-4.82a8.21 8.21 0 0 1-5.07-5.92.418.418 0 0 1 0-.1 8 8 0 0 1-15.18-5c-6.851 7.214-18.094-2.065-12.31-10.16-8.346 4.519-16.217-6.676-9.14-13-9.17 2.661-14.453-10.083-6.09-14.69a8 8 0 0 1-3.21-15.67c-9.294-1.047-9.548-14.463-.3-15.86-.669-.164-1.264-.473-1.83-.76l-17.24-1.86.6 167.11 309.18 34.49-.6-165.83-107-13.05zm140.06-164l4.72 1.91.91.58 38.72 4.31-23.26-64.77-12.82 37c-.16.46-3.41 9.8-8.27 20.99zm-208.54-39.74l5 5.49 12.75-11.15 21.45-2.28 16.61 15.35 10.51 8.73 18.54-9.29 3.44.5c.12-.67.25-1.34.38-2 3.08-16.1 7.35-30.16 7.53-30.75l13.39-43.91 16.88 42.71 8.42 21.42 10.66-12.39 22.14-25.73 5.78 33.45 3.29 19.1 17.1-9.64 35.09-19.79-18.48-51.4-247.86-27.61c2.51 34.94-1.85 77.32-12.39 112h2.32l7-12.86h40.46zm-111.29 97.39c7.6 2.1 7.9 12.766.43 15.29 7.737.867 9.802 11.153 3 14.94 7.653-.548 11.614 8.947 5.84 14 7.313-2.115 13.168 6.216 8.7 12.38 6.288-3.518 13.657 2.417 11.56 9.31 4.53-4.723 12.506-2.304 13.65 4.14 2.057-5.713 9.48-7.141 13.51-2.6-1.285-6.404 5.23-11.566 11.17-8.85-4.564-5.77.425-14.123 7.67-12.84-6.419-4.541-3.122-14.648 4.74-14.53-7.316-3.503-5.375-14.415 2.7-15.18a8 8 0 0 1-5.38-8l-76.43-8.26c-.41.19-.746.15-1.16.2zm367.54 139.08l-.59-163.86-8.67 7-55.51 46.79.58 162zm-26.23-165.2l-24.11-15.27-4.18-1.69c-5.91 11.52-13.39 23-22.66 27.88-5.44 2.88-12.22 4.34-20.16 4.34-11.13 0-24.75-2.91-37.35-8-10-4-23.3-11-30.26-21.34-4.9-7.29-6.64-17.77-5.31-32.92l-21.78 10.93-19-15.8-11.42-10.53-9.16 1-20.45 17.83-11-11.7h-24.21l-17.61 32-5.7-7.2-4.42 4.85-10.76 16.35-12.29 4.91L97.611 256h-12.2l-2.776 6.005 76.9 8.21a8.15 8.15 0 0 1 2-2.9 8 8 0 0 1 10.31-.46 1.657 1.657 0 0 1-.14-.24c-4.955-8.368 6.459-16.62 12.87-9.375 6.412 7.245-3.167 17.571-10.87 11.635a8 8 0 0 1 1.12 2.89l22.62 2.44 168.54 20.57 51.49-43.38zm-28.34-57.73l-36.88 20.79-7.14-41.47-28 32.51-18.13-46.11s-16.65 54.58-7 69c7.69 11.45 35.42 22.25 54.33 22.25 5 0 9.43-.76 12.67-2.48 13.8-7.31 30.15-54.49 30.15-54.49zm-317.08 270.8v-.2c0-3.77-8.21-6.83-18.33-6.83-10.12 0-18.33 3.06-18.33 6.83 0 3.21 6 5.9 14 6.63v.2c0 3.77 8.21 6.83 18.33 6.83 10.12 0 18.33-3.06 18.33-6.83-.01-3.21-5.98-5.9-14-6.63zm350 6.63c-10.13 0-18.33 3.06-18.33 6.83s8.21 6.83 18.33 6.83c10.12 0 18.33-3.06 18.33-6.83s-8.25-6.8-18.38-6.8zm40-16.28c-10.13 0-18.33 3.06-18.33 6.83s8.21 6.83 18.33 6.83c10.12 0 18.33-3.06 18.33-6.83s-8.22-6.83-18.34-6.83z`
},
child:[

]
}
]
})(e)
}function Rs(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`M108.777 256.058c.286 56.565 13.983 101.827 24.942 133.585C85.56 317.753 30.9 187.787 120.5 112.147c-42.56-4.31-92.374 25.796-95.78 71.213h-.19c-1.068 14.052 2.58 29.756 11.746 46.133C16.312 284.78 15.33 345.708 49.6 433.393c19.18 49.048 70.854 62.702 120.752 53.94 36.346-6.4 70.19-22.667 93.294-59.754 40.158-64.48 59.99-105.418 101.79-135.42 46.526-19.777 97.54-3.25 123.88 22.454-7.476-57.55-70.396-111.51-120.465-56.763-41.325 7.66-69.025 17.52-115.722 51.235 19.65-38.758 56.327-84.913 79.13-112.415 33.693-41.608 102.853-56.82 138.524-48.106-31.99-45.34-127.917-59.59-149.615 12.53-42.008 19.263-94.897 60.85-129.908 102.997 11.58-52.748 33.18-117.786 54.347-155.208 33.825-36.553 83.77-35.932 114.623-26.564-28.904-46.596-121.244-70.12-138.495 12.993-43.11 33.08-87.248 100.11-112.956 160.748z`
},
child:[

]
}
]
})(e)
}function zs(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`M92.406 13.02l-.164 156.353c3.064.507 6.208 1.38 9.39 2.627 36.496 14.306 74.214 22.435 111.864 25.473l43.402-60.416 42.317 58.906c36.808-4.127 72.566-12.502 105.967-24.09 3.754-1.302 7.368-2.18 10.818-2.6l1.523-156.252-75.82 95.552-34.084-95.55-53.724 103.74-53.722-103.74-35.442 95.55-72.32-95.55h-.006zm164.492 156.07l-28.636 39.86 28.634 39.86 28.637-39.86-28.635-39.86zM86.762 187.55c-2.173-.08-3.84.274-5.012.762-2.345.977-3.173 2.19-3.496 4.196-.645 4.01 2.825 14.35 23.03 21.36 41.7 14.468 84.262 23.748 126.778 26.833l-17.75-24.704c-38.773-3.285-77.69-11.775-115.5-26.596-3.197-1.253-5.877-1.77-8.05-1.85zm333.275.19c-2.156.052-5.048.512-8.728 1.79-33.582 11.65-69.487 20.215-106.523 24.646l-19.264 26.818c40.427-2.602 80.433-11.287 119.22-26.96 15.913-6.43 21.46-17.81 21.36-22.362-.052-2.276-.278-2.566-1.753-3.274-.738-.353-2.157-.71-4.313-.658zm-18.117 47.438c-42.5 15.87-86.26 23.856-130.262 25.117l-14.76 20.547-14.878-20.71c-44.985-1.745-89.98-10.23-133.905-24.306-12.78 28.51-18.94 61.14-19.603 93.44 37.52 17.497 62.135 39.817 75.556 64.63C177 417.8 179.282 443.62 174.184 467.98c7.72 5.007 16.126 9.144 24.98 12.432l5.557-47.89 18.563 2.154-5.935 51.156c9.57 2.21 19.443 3.53 29.377 3.982v-54.67h18.69v54.49c9.903-.638 19.705-2.128 29.155-4.484l-5.857-50.474 18.564-2.155 5.436 46.852c8.747-3.422 17.004-7.643 24.506-12.69-5.758-24.413-3.77-49.666 9.01-72.988 13.28-24.234 37.718-46 74.803-64.29-.62-33.526-6.687-66.122-19.113-94.23zm-266.733 47.006c34.602.23 68.407 12.236 101.358 36.867-46.604 33.147-129.794 34.372-108.29-36.755 2.315-.09 4.626-.127 6.933-.11zm242.825 0c2.307-.016 4.617.022 6.93.11 21.506 71.128-61.684 69.903-108.288 36.757 32.95-24.63 66.756-36.637 101.358-36.866zM255.164 332.14c11.77 21.725 19.193 43.452 25.367 65.178h-50.737c4.57-21.726 13.77-43.45 25.37-65.18z`
},
child:[

]
}
]
})(e)
}function Bs(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 24 24`
},
child:[
{
tag:`path`,
attr:{
fill:`none`,
strokeWidth:`2`,
d:`M2,3.99079514 C2,2.89130934 2.89821238,2 3.99079514,2 L20.0092049,2 C21.1086907,2 22,2.89821238 22,3.99079514 L22,20.0092049 C22,21.1086907 21.1017876,22 20.0092049,22 L3.99079514,22 C2.89130934,22 2,21.1017876 2,20.0092049 L2,3.99079514 Z M12,15 L12,14 C12,13 12,12.5 13,12 C14,11.5 15,11 15,9.5 C15,8.5 14,7 12,7 C10,7 9,8.26413718 9,10 M12,16 L12,18`
},
child:[

]
}
]
})(e)
}function Vs(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 20 20`,
fill:`currentColor`,
"aria-hidden":`true`
},
child:[
{
tag:`path`,
attr:{
d:`M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z`
},
child:[

]
}
]
})(e)
}function Hs(e){
return W({
tag:`svg`,
attr:{
fill:`none`,
viewBox:`0 0 24 24`,
strokeWidth:`2`,
stroke:`currentColor`,
"aria-hidden":`true`
},
child:[
{
tag:`path`,
attr:{
strokeLinecap:`round`,
strokeLinejoin:`round`,
d:`M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14`
},
child:[

]
}
]
})(e)
}function Us(e){
return W({
tag:`svg`,
attr:{
version:`1.1`,
viewBox:`0 0 16 16`
},
child:[
{
tag:`path`,
attr:{
d:`M14 0h-12c-1.1 0-2 0.9-2 2v12c0 1.1 0.9 2 2 2h12c1.1 0 2-0.9 2-2v-12c0-1.1-0.9-2-2-2zM14 14h-12v-12h12v12z`
},
child:[

]
}
]
})(e)
}function Ws(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 56 256 56m0 82a26 26 0 1 1-26 26 26 26 0 0 1 26-26m48 226h-88a16 16 0 0 1 0-32h28v-88h-16a16 16 0 0 1 0-32h32a16 16 0 0 1 16 16v104h28a16 16 0 0 1 0 32`
},
child:[

]
}
]
})(e)
}function Gs(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
fill:`none`,
strokeMiterlimit:`10`,
strokeWidth:`32`,
d:`M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z`
},
child:[

]
},
{
tag:`path`,
attr:{
fill:`none`,
strokeLinecap:`round`,
strokeLinejoin:`round`,
strokeWidth:`32`,
d:`M220 220h32v116`
},
child:[

]
},
{
tag:`path`,
attr:{
fill:`none`,
strokeLinecap:`round`,
strokeMiterlimit:`10`,
strokeWidth:`32`,
d:`M208 340h88`
},
child:[

]
},
{
tag:`path`,
attr:{
d:`M248 130a26 26 0 1 0 26 26 26 26 0 0 0-26-26`
},
child:[

]
}
]
})(e)
}function Ks(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
fill:`none`,
strokeLinecap:`round`,
strokeLinejoin:`round`,
strokeWidth:`32`,
d:`M145.61 464h220.78c19.8 0 35.55-16.29 33.42-35.06C386.06 308 304 310 304 256s83.11-51 95.8-172.94c2-18.78-13.61-35.06-33.41-35.06H145.61c-19.8 0-35.37 16.28-33.41 35.06C124.89 205 208 201 208 256s-82.06 52-95.8 172.94c-2.14 18.77 13.61 35.06 33.41 35.06`
},
child:[

]
},
{
tag:`path`,
attr:{
d:`M343.3 432H169.13c-15.6 0-20-18-9.06-29.16C186.55 376 240 356.78 240 326V224c0-19.85-38-35-61.51-67.2-3.88-5.31-3.49-12.8 6.37-12.8h142.73c8.41 0 10.23 7.43 6.4 12.75C310.82 189 272 204.05 272 224v102c0 30.53 55.71 47 80.4 76.87 9.95 12.04 6.47 29.13-9.1 29.13`
},
child:[

]
}
]
})(e)
}function qs(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64m-6 304a20 20 0 1 1 20-20 20 20 0 0 1-20 20m33.44-102C267.23 276.88 265 286.85 265 296a14 14 0 0 1-28 0c0-21.91 10.08-39.33 30.82-53.26C287.1 229.8 298 221.6 298 203.57c0-12.26-7-21.57-21.49-28.46-3.41-1.62-11-3.2-20.34-3.09-11.72.15-20.82 2.95-27.83 8.59C215.12 191.25 214 202.83 214 203a14 14 0 1 1-28-1.35c.11-2.43 1.8-24.32 24.77-42.8 11.91-9.58 27.06-14.56 45-14.78 12.7-.15 24.63 2 32.72 5.82C312.7 161.34 326 180.43 326 203.57c0 33.83-22.61 49.02-42.56 62.43`
},
child:[

]
}
]
})(e)
}function Js(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`M459.94 53.25a16.06 16.06 0 0 0-23.22-.56L424.35 65a8 8 0 0 0 0 11.31l11.34 11.32a8 8 0 0 0 11.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38M399.34 90 218.82 270.2a9 9 0 0 0-2.31 3.93L208.16 299a3.91 3.91 0 0 0 4.86 4.86l24.85-8.35a9 9 0 0 0 3.93-2.31L422 112.66a9 9 0 0 0 0-12.66l-9.95-10a9 9 0 0 0-12.71 0`
},
child:[

]
},
{
tag:`path`,
attr:{
d:`M386.34 193.66 264.45 315.79A41.1 41.1 0 0 1 247.58 326l-25.9 8.67a35.92 35.92 0 0 1-44.33-44.33l8.67-25.9a41.1 41.1 0 0 1 10.19-16.87l122.13-121.91a8 8 0 0 0-5.65-13.66H104a56 56 0 0 0-56 56v240a56 56 0 0 0 56 56h240a56 56 0 0 0 56-56V199.31a8 8 0 0 0-13.66-5.65`
},
child:[

]
}
]
})(e)
}function Ys(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`M408 480H184a72 72 0 0 1-72-72V184a72 72 0 0 1 72-72h224a72 72 0 0 1 72 72v224a72 72 0 0 1-72 72`
},
child:[

]
},
{
tag:`path`,
attr:{
d:`M160 80h235.88A72.12 72.12 0 0 0 328 32H104a72 72 0 0 0-72 72v224a72.12 72.12 0 0 0 48 67.88V160a80 80 0 0 1 80-80`
},
child:[

]
}
]
})(e)
}function Xs(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`M96 208H48c-8.8 0-16-7.2-16-16s7.2-16 16-16h48c8.8 0 16 7.2 16 16s-7.2 16-16 16m28.1-67.9c-4.2 0-8.3-1.7-11.3-4.7l-33.9-33.9c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l33.9 33.9c6.3 6.2 6.3 16.4 0 22.6-3 3-7 4.7-11.3 4.7M192 112c-8.8 0-16-7.2-16-16V48c0-8.8 7.2-16 16-16s16 7.2 16 16v48c0 8.8-7.2 16-16 16m67.9 28.1c-8.8 0-16-7.2-16-16 0-4.2 1.7-8.3 4.7-11.3l33.9-33.9c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-33.9 33.9c-3 3-7.1 4.7-11.3 4.7M90.2 309.8c-8.8 0-16-7.2-16-16 0-4.2 1.7-8.3 4.7-11.3l33.9-33.9c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-33.9 33.9c-3 3-7.1 4.7-11.3 4.7m144-142.8c-18.4-18.7-48.5-19-67.2-.7s-19 48.5-.7 67.2l.7.7 39.5 39.5c3.1 3.1 8.2 3.1 11.3 0l55.9-55.9c3.1-3.1 3.1-8.2 0-11.3zM457 389.8 307.6 240.4c-3.1-3.1-8.2-3.1-11.3 0l-55.9 55.9c-3.1 3.1-3.1 8.2 0 11.3L389.8 457c18.4 18.7 48.5 19 67.2.7 18.7-18.4 19-48.5.7-67.2-.2-.2-.4-.5-.7-.7`
},
child:[

]
}
]
})(e)
}function Zs(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48m75.31 260.69a16 16 0 1 1-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 0 1-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0 1 22.62-22.62L256 233.37l52.69-52.68a16 16 0 0 1 22.62 22.62L278.63 256z`
},
child:[

]
}
]
})(e)
}function Qs(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`M414 321.94 274.22 158.82a24 24 0 0 0-36.44 0L98 321.94c-13.34 15.57-2.28 39.62 18.22 39.62h279.6c20.5 0 31.56-24.05 18.18-39.62`
},
child:[

]
}
]
})(e)
}function $s(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`m98 190.06 139.78 163.12a24 24 0 0 0 36.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62`
},
child:[

]
}
]
})(e)
}function ec(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`M168.531 215.469l-29.864 29.864 96 96L448 128l-29.864-29.864-183.469 182.395-66.136-65.062zm236.802 189.864H106.667V106.667H320V64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V234.667h-42.667v170.666z`
},
child:[

]
}
]
})(e)
}function tc(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`M447.659 96H64.341C46.504 96 32 110.484 32 128.308v255.349C32 401.493 46.504 416 64.341 416h383.318C465.496 416 480 401.493 480 383.656V128.308C480 110.484 465.496 96 447.659 96zM284.023 352h-56.048v-96l-42.04 53.878L143.913 256v96H87.869V160h56.044l42.022 67.98 42.04-67.98h56.048v192zm83.657 0l-69.635-96h42v-96h56.043v96h42.027l-70.453 96h.018z`
},
child:[

]
}
]
})(e)
}function nc(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 24 24`
},
child:[
{
tag:`path`,
attr:{
fill:`none`,
d:`M0 0h24v24H0z`
},
child:[

]
},
{
tag:`path`,
attr:{
d:`M19 5v14H5V5zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2`
},
child:[

]
}
]
})(e)
}function rc(e){
return W({
tag:`svg`,
attr:{
role:`img`,
viewBox:`0 0 24 24`
},
child:[
{
tag:`path`,
attr:{
d:`M11.351 2.715c-2.7 0-4.986.025-6.83.26C2.078 3.285 0 5.154 0 8.61c0 3.506.182 6.13 1.585 8.493 1.584 2.701 4.233 4.182 7.662 4.182h.83c4.209 0 6.494-2.234 7.637-4a9.5 9.5 0 0 0 1.091-2.338C21.792 14.688 24 12.22 24 9.208v-.415c0-3.247-2.13-5.507-5.792-5.87-1.558-.156-2.65-.208-6.857-.208m0 1.947c4.208 0 5.09.052 6.571.182 2.624.311 4.13 1.584 4.13 4v.39c0 2.156-1.792 3.844-3.87 3.844h-.935l-.156.649c-.208 1.013-.597 1.818-1.039 2.546-.909 1.428-2.545 3.064-5.922 3.064h-.805c-2.571 0-4.831-.883-6.078-3.195-1.09-2-1.298-4.155-1.298-7.506 0-2.181.857-3.402 3.012-3.714 1.533-.233 3.559-.26 6.39-.26m6.547 2.287c-.416 0-.65.234-.65.546v2.935c0 .311.234.545.65.545 1.324 0 2.051-.754 2.051-2s-.727-2.026-2.052-2.026m-10.39.182c-1.818 0-3.013 1.48-3.013 3.142 0 1.533.858 2.857 1.949 3.897.727.701 1.87 1.429 2.649 1.896a1.47 1.47 0 0 0 1.507 0c.78-.467 1.922-1.195 2.623-1.896 1.117-1.039 1.974-2.364 1.974-3.897 0-1.662-1.247-3.142-3.039-3.142-1.065 0-1.792.545-2.338 1.298-.493-.753-1.246-1.298-2.312-1.298`
},
child:[

]
}
]
})(e)
}function ic(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 24 24`,
fill:`none`,
stroke:`currentColor`,
strokeWidth:`2`,
strokeLinecap:`round`,
strokeLinejoin:`round`
},
child:[
{
tag:`path`,
attr:{
d:`M2 9a10 10 0 1 0 20 0`
},
child:[

]
},
{
tag:`path`,
attr:{
d:`M12 19a10 10 0 0 1 10 -10`
},
child:[

]
},
{
tag:`path`,
attr:{
d:`M2 9a10 10 0 0 1 10 10`
},
child:[

]
},
{
tag:`path`,
attr:{
d:`M12 4a9.7 9.7 0 0 1 2.99 7.5`
},
child:[

]
},
{
tag:`path`,
attr:{
d:`M9.01 11.5a9.7 9.7 0 0 1 2.99 -7.5`
},
child:[

]
}
]
})(e)
}var G=class{
static iconMap={
caretDown:(0,
U.jsx)($s,
{

}),
caretDownInline:(0,
U.jsx)($s,
{
className:`inline-block align-middle`
}),
caretUp:(0,
U.jsx)(Qs,
{

}),
caretUpInline:(0,
U.jsx)(Qs,
{
className:`inline-block align-middle`
}),
checkboxChecked:(0,
U.jsx)(nc,
{

}),
checkboxEmpty:(0,
U.jsx)(ec,
{

}),
close:(0,
U.jsx)(Zs,
{

}),
closeLarge:(0,
U.jsx)(Zs,
{
className:`text-2xl`
}),
copy:(0,
U.jsx)(Ys,
{

}),
donate:(0,
U.jsx)(rc,
{

}),
edit:(0,
U.jsx)(Js,
{

}),
externalLink:(0,
U.jsx)(Hs,
{

}),
externalLinkInline:(0,
U.jsx)(Hs,
{
className:`inline-block align-middle`
}),
generateText:(0,
U.jsx)(Xs,
{

}),
help:(0,
U.jsx)(qs,
{

}),
helpLarge:(0,
U.jsx)(qs,
{
className:`text-2xl`
}),
information:(0,
U.jsx)(Ws,
{

}),
informationLarge:(0,
U.jsx)(Ws,
{
className:`text-2xl`
}),
informationOld:(0,
U.jsx)(Gs,
{

}),
loading:(0,
U.jsx)(Ks,
{

}),
markdown:(0,
U.jsx)(tc,
{

}),
pin:(0,
U.jsx)(Ns,
{

}),
pinPinned:(0,
U.jsx)(Ns,
{

}),
pinUnpinned:(0,
U.jsx)(Ms,
{

}),
pinUnpinnedInline:(0,
U.jsx)(Ms,
{
className:`inline-block align-middle`
})
};
static mapIconsMap={
emptyCell:(0,
U.jsx)(Us,
{

}),
trap:(0,
U.jsx)(Ps,
{

}),
trickTrap:(0,
U.jsx)(Ps,
{

}),
minorHazard:(0,
U.jsx)(ks,
{

}),
soloMonster:(0,
U.jsx)(Rs,
{

}),
monster:(0,
U.jsx)(Rs,
{

}),
floraFauna:(0,
U.jsx)(ic,
{

}),
feature:(0,
U.jsx)(Fs,
{

}),
npc:(0,
U.jsx)(Is,
{

}),
npcs:(0,
U.jsx)(Is,
{

}),
monsterMob:(0,
U.jsx)(Vs,
{

}),
faction:(0,
U.jsx)(Vs,
{

}),
majorHazard:(0,
U.jsx)(As,
{

}),
treasure:(0,
U.jsx)(Ls,
{

}),
bossMonster:(0,
U.jsx)(zs,
{

}),
objective:(0,
U.jsx)(zs,
{

}),
default:(0,
U.jsx)(js,
{

})
};
static unknownIcon=(0,
U.jsx)(Bs,
{

});
static getIcon(e){
return this.iconMap[
e
]||this.unknownIcon
}static getCaretDown(){
return this.iconMap.caretDown
}static getCaretUp(){
return this.iconMap.caretUp
}static getCaretDownInline(){
return this.iconMap.caretDownInline
}static getCaretUpInline(){
return this.iconMap.caretUpInline
}static getCheckboxUnchecked(){
return this.iconMap.checkboxEmpty
}static getCheckboxChecked(){
return this.iconMap.checkboxChecked
}static getCloseIcon(){
return this.iconMap.close
}static getCloseIconLarge(){
return this.iconMap.closeLarge
}static getCopyIcon(){
return this.iconMap.copy
}static getDonateIcon(){
return this.iconMap.donate
}static getEditIcon(){
return this.iconMap.edit
}static getExternalLinkIcon(){
return this.iconMap.externalLink
}static getExternalLinkIconInline(){
return this.iconMap.externalLinkInline
}static getHelpIcon(){
return this.iconMap.help
}static getHelpIconLarge(){
return this.iconMap.helpLarge
}static getGenerateTextIcon(){
return this.iconMap.generateText
}static getInformationIcon(){
return this.iconMap.information
}static getInformationIconLarge(){
return this.iconMap.informationLarge
}static getLoadingIcon(){
return this.iconMap.loading
}static getMarkdownIcon(){
return this.iconMap.markdown
}static getPinIcon(){
return this.iconMap.pin
}static getPinPinnedIcon(){
return this.iconMap.pinPinned
}static getPinUnpinnedIcon(){
return this.iconMap.pinUnpinned
}static getPinUnpinnedIconInline(){
return this.iconMap.pinUnpinnedInline
}static mapEmptyCell(){
return this.mapIconsMap.emptyCell
}static mapTrap(){
return this.mapIconsMap.trap
}static mapTrickTrap(){
return this.mapIconsMap.trickTrap
}static mapMinorHazard(){
return this.mapIconsMap.minorHazard
}static mapSoloMonster(){
return this.mapIconsMap.soloMonster
}static mapMonster(){
return this.mapIconsMap.monster
}static mapFloraFauna(){
return this.mapIconsMap.floraFauna
}static mapFeature(){
return this.mapIconsMap.feature
}static mapNpc(){
return this.mapIconsMap.npc
}static mapNpcs(){
return this.mapIconsMap.npcs
}static mapMonsterMob(){
return this.mapIconsMap.monsterMob
}static mapFaction(){
return this.mapIconsMap.faction
}static mapMajorHazard(){
return this.mapIconsMap.majorHazard
}static mapTreasure(){
return this.mapIconsMap.treasure
}static mapBossMonster(){
return this.mapIconsMap.bossMonster
}static mapObjective(){
return this.mapIconsMap.objective
}static mapDefault(){
return this.mapIconsMap.default
}static getUnknownIcon(){
return this.unknownIcon
}
};
function ac(){
let[
e,
t
]=(0,
m.useState)(!1),
n=n=>{
t(!e)
},
r=(0,
U.jsx)(hs,
{
toggleValue:e,
iconOnly:!0,
solo:!0,
subtle:!0,
toggleOnIcon:G.getCaretUp(),
toggleOffIcon:G.getCaretDown(),
onClick:(e=>n(e)),
children:(0,
U.jsx)(U.Fragment,
{

})
}),
i=e?(0,
U.jsxs)(`div`,
{
id:`copyright-details`,
children:[
(0,
U.jsx)(`p`,
{
children:`The original content within this app, including designs, tools, tables, and features, is the intellectual property of Cesidio#1697. It is provided solely for personal and non-commercial use. Users may not redistribute, modify, or rebrand any content for commercial purposes without explicit permission. Any unauthorized reproduction, distribution, or use for profit is strictly prohibited.`
}),
(0,
U.jsx)(`span`,
{
className:`font-semibold`,
children:`Additionally:`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`span`,
{
className:`font-semibold`,
children:`No commercial exploitation:`
}),
` This app and its content may not be resold, licensed, or incorporated into any monetized platform without prior authorization.`
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`span`,
{
className:`font-semibold`,
children:`Respect for third-party assets:`
}),
` Any trademarks, third-party materials (such as Shadowdark RPG licensing) remain the property of their original owners and are used under their respective licenses.`
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`span`,
{
className:`font-semibold`,
children:`Personal use only:`
}),
` Users are welcome to reference and utilize the tools for personal enjoyment, but they cannot claim ownership or seek commercial gain from them.`
]
})
]
})
]
}):(0,
U.jsx)(U.Fragment,
{

});
return(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsxs)(`div`,
{
id:`contact-info`,
className:`pb-4`,
children:[
(0,
U.jsx)(`h2`,
{
className:`pt-3`,
children:`Contact Info`
}),
(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`div`,
{
children:`Hi, I'm Jesse, creator of the Shadowdark Tools site. Please feel free to reach out with feature requests or bug reports.`
}),
(0,
U.jsx)(`div`,
{
className:`pt-2`,
children:(0,
U.jsxs)(`span`,
{
className:`flex items-center gap-2`,
children:[
`I can be reached on the `,
(0,
U.jsxs)(`a`,
{
className:`underline hover:text-gray-400`,
target:`_blank`,
href:`https://discord.com/channels/558029475837902851/1082831426216534026`,
rel:`noreferrer`,
children:[
`\xA0Shadowdark Discord\xA0`,
G.getExternalLinkIconInline()
]
}),
` @ Cesidio#1697.`
]
})
})
]
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
id:`latest-update`,
className:`pb-4`,
children:[
(0,
U.jsx)(`h2`,
{
className:`pt-3`,
children:`Recent Updates`
}),
(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`span`,
{
children:`15-JUL-2026`
}),
(0,
U.jsxs)(`span`,
{
children:[
`- New features and layout changes, including:,`,
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`Feature: Spell Reference. Similar functionality to the existing Monster Reference.`
}),
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`Feature: Known Spells Generator. Given a class and level, generates a list of known spells. Can optionally provide a theme for chosen spells.`
}),
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`Navigation changes: Sub-menus on some pages. Deep navigation to sub-menus. Existing bookmarks will reroute to the correct sub-menu.`
}),
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`Session Page: Added a Session page for tools suited for use during gameplay, as the Tools page is getting quite long.`
}),
(0,
U.jsxs)(`li`,
{
className:`nested1`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Note:`
}),
` I do not have permission to add spell content from Cursed Scroll publications. Therefore, they are not selectable as Sources in the Spell Reference and are not included in the Known Spell Generator.`
]
})
]
})
]
})
]
}),
(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`span`,
{
children:`23-APR-2026 `
}),
(0,
U.jsxs)(`span`,
{
children:[
`- Framework updates and minor changes to static text. Also,`,
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`Fixed an issue where copying a Magic Item to the clipboard would yield only partial data or result in an error page.`
}),
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`Removed dead links to external resources.`
})
]
})
]
})
]
}),
(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`span`,
{
children:`17-OCT-2025 `
}),
(0,
U.jsx)(`span`,
{
children:`- Privacy Policy added. Compliance with EU-U.S. Data Privacy Framework (DPF).`
})
]
}),
(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`span`,
{
children:`23-JUNE-2025 `
}),
(0,
U.jsxs)(`span`,
{
children:[
`- Added the option to sort Monster Filter results, by Name/Level, ascending/descending. Also,`,
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`Fixed a bug where selecting "Cursed Scroll 1" source in the Monster Filter caused all Cursed Scroll monsters to be included.`
}),
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`Corrected UI typos.`
})
]
})
]
})
]
}),
(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`span`,
{
children:`31-MAY-2025 `
}),
(0,
U.jsxs)(`span`,
{
children:[
`- UI and layout overhaul; improved support for mobile devices. Also,`,
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`Help/tips for tools.`
}),
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`QoL options for Magic Item Generation.`
})
]
})
]
})
]
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:``,
children:[
(0,
U.jsx)(`h2`,
{
id:`arcane-library-3rd-party-license`,
className:`pt-3`,
children:`Shadowdark RPG Third-Pary License Agreement`
}),
(0,
U.jsxs)(`div`,
{
className:`pb-4`,
children:[
(0,
U.jsx)(`p`,
{
children:`Shadowdark Tools is an independent product published under the Shadowdark RPG Third-Party License and is not affiliated with The Arcane Library, LLC. Shadowdark RPG © 2023 The Arcane Library, LLC.`
}),
(0,
U.jsxs)(`p`,
{
className:`pt-2`,
children:[
`Core information about `,
(0,
U.jsx)(`u`,
{
children:`Cursed Scroll`
}),
` monsters used with permission from The Arcane Library.`
]
})
]
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
id:`copyright`,
className:`!mt-4`,
children:[
(0,
U.jsx)(`h2`,
{
className:`pt-3`,
children:`Copyright Notice`
}),
(0,
U.jsxs)(`div`,
{
id:`copyright-collapsable-selection`,
className:`button-wrapper`,
children:[
r,
(0,
U.jsx)(`span`,
{
className:`text-lg`,
children:(0,
U.jsx)(`i`,
{
children:`Shadowdark Tools © 2023-2026. All rights reserved.`
})
}),
i
]
})
]
})
]
})
}var oc=`modulepreload`,
sc=function(e){
return`/`+e
},
cc={

},
lc=function(e,
t,
n){
let r=Promise.resolve();
if(t&&t.length>0){
let e=document.getElementsByTagName(`link`),
i=document.querySelector(`meta[property=csp-nonce]`),
a=i?.nonce||i?.getAttribute(`nonce`);
function o(e){
return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({
status:`fulfilled`,
value:e
}),
e=>({
status:`rejected`,
reason:e
}))))
}function s(e){
return import.meta.resolve?import.meta.resolve(e):new URL(e,
import.meta.url).href
}r=o(t.map(t=>{
if(t=sc(t,
n),
t=s(t),
t in cc)return;
cc[
t
]=!0;
let r=t.endsWith(`.css`);
for(let n=e.length-1;
n>=0;
n--){
let i=e[
n
];
if(i.href===t&&(!r||i.rel===`stylesheet`))return
}let i=document.createElement(`link`);
if(i.rel=r?`stylesheet`:oc,
r||(i.as=`script`),
i.crossOrigin=``,
i.href=t,
a&&i.setAttribute(`nonce`,
a),
document.head.appendChild(i),
r)return new Promise((e,
n)=>{
i.addEventListener(`load`,
e),
i.addEventListener(`error`,
()=>n(Error(`Unable to preload CSS for ${t}`)))
})
}))
}function i(e){
let t=new Event(`vite:preloadError`,
{
cancelable:!0
});
if(t.payload=e,
window.dispatchEvent(t),
!t.defaultPrevented)throw e
}return r.then(t=>{
for(let e of t||[

])e.status===`rejected`&&i(e.reason);
return e().catch(i)
})
},
uc=e=>{
throw TypeError(e)
},
dc=(e,
t,
n)=>t.has(e)||uc(`Cannot `+n),
fc=(e,
t,
n)=>(dc(e,
t,
`read from private field`),
n?n.call(e):t.get(e)),
pc=(e,
t,
n)=>t.has(e)?uc(`Cannot add the same private member more than once`):t instanceof WeakSet?t.add(e):t.set(e,
n),
mc=(e,
t,
n,
r)=>(dc(e,
t,
`write to private field`),
r?r.call(e,
n):t.set(e,
n),
n),
hc=/^(?:[
a-z
][
a-z0-9+.-
]*:|[
\\/
]{
2
})/i,
gc=/^[
\\/
]{
2
}/;
function _c(e,
t){
return t+e.replace(/\\/g,
`/`)
}var vc=`popstate`;
function yc(e){
return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e
}function bc(e={

}){
function t(e,
t){
let n=t.state?.masked,
{
pathname:r,
search:i,
hash:a
}=n||e.location;
return wc(``,
{
pathname:r,
search:i,
hash:a
},
t.state&&t.state.usr||null,
t.state&&t.state.key||`default`,
n?{
pathname:e.location.pathname,
search:e.location.search,
hash:e.location.hash
}:void 0)
}function n(e,
t){
return typeof t==`string`?t:Tc(t)
}return Dc(t,
n,
null,
e)
}function K(e,
t){
if(e===!1||e==null)throw Error(t)
}function xc(e,
t){
if(!e){
typeof console<`u`&&console.warn(t);
try{
throw Error(t)
}catch{

}
}
}function Sc(){
return Math.random().toString(36).substring(2,
10)
}function Cc(e,
t){
return{
usr:e.state,
key:e.key,
idx:t,
masked:e.mask?{
pathname:e.pathname,
search:e.search,
hash:e.hash
}:void 0
}
}function wc(e,
t,
n=null,
r,
i){
return{
pathname:typeof e==`string`?e:e.pathname,
search:``,
hash:``,
...typeof t==`string`?Ec(t):t,
state:n,
key:t&&t.key||r||Sc(),
mask:i
}
}function Tc({
pathname:e=`/`,
search:t=``,
hash:n=``
}){
return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),
n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),
e
}function Ec(e){
let t={

};
if(e){
let n=e.indexOf(`#`);
n>=0&&(t.hash=e.substring(n),
e=e.substring(0,
n));
let r=e.indexOf(`?`);
r>=0&&(t.search=e.substring(r),
e=e.substring(0,
r)),
e&&(t.pathname=e)
}return t
}function Dc(e,
t,
n,
r={

}){
let{
window:i=document.defaultView,
v5Compat:a=!1
}=r,
o=i.history,
s=`POP`,
c=null,
l=u();
l??(l=0,
o.replaceState({
...o.state,
idx:l
},
``));
function u(){
return(o.state||{
idx:null
}).idx
}function d(){
s=`POP`;
let e=u(),
t=e==null?null:e-l;
l=e,
c&&c({
action:s,
location:h.location,
delta:t
})
}function f(e,
t){
s=`PUSH`;
let r=yc(e)?e:wc(h.location,
e,
t);
n&&n(r,
e),
l=u()+1;
let d=Cc(r,
l),
f=h.createHref(r.mask||r);
try{
o.pushState(d,
``,
f)
}catch(e){
if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;
i.location.assign(f)
}a&&c&&c({
action:s,
location:h.location,
delta:1
})
}function p(e,
t){
s=`REPLACE`;
let r=yc(e)?e:wc(h.location,
e,
t);
n&&n(r,
e),
l=u();
let i=Cc(r,
l),
d=h.createHref(r.mask||r);
o.replaceState(i,
``,
d),
a&&c&&c({
action:s,
location:h.location,
delta:0
})
}function m(e){
return Oc(i,
e)
}let h={
get action(){
return s
},
get location(){
return e(i,
o)
},
listen(e){
if(c)throw Error(`A history only accepts one active listener`);
return i.addEventListener(vc,
d),
c=e,
()=>{
i.removeEventListener(vc,
d),
c=null
}
},
createHref(e){
return t(i,
e)
},
createURL:m,
encodeLocation(e){
let t=m(e);
return{
pathname:t.pathname,
search:t.search,
hash:t.hash
}
},
push:f,
replace:p,
go(e){
return o.go(e)
}
};
return h
}function Oc(e,
t,
n=!1){
let r=`http://localhost`;
e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),
K(r,
`No window.location.(origin|href) available to create URL`);
let i=typeof t==`string`?t:Tc(t);
return i=i.replace(/ $/,
`%20`),
!n&&gc.test(i)&&(i=r+i),
new URL(i,
r)
}var kc,
Ac=class{
constructor(e){
if(pc(this,
kc,
new Map),
e)for(let[
t,
n
]of e)this.set(t,
n)
}get(e){
if(fc(this,
kc).has(e))return fc(this,
kc).get(e);
if(e.defaultValue!==void 0)return e.defaultValue;
throw Error(`No value found for context`)
}set(e,
t){
fc(this,
kc).set(e,
t)
}
};
kc=new WeakMap;
var jc=new Set([
`lazy`,
`caseSensitive`,
`path`,
`id`,
`index`,
`children`
]);
function Mc(e){
return jc.has(e)
}var Nc=new Set([
`lazy`,
`caseSensitive`,
`path`,
`id`,
`index`,
`middleware`,
`children`
]);
function Pc(e){
return Nc.has(e)
}function Fc(e){
return e.index===!0
}function Ic(e,
t,
n=[

],
r={

},
i=!1){
return e.map((e,
a)=>{
let o=[
...n,
String(a)
],
s=typeof e.id==`string`?e.id:o.join(`-`);
if(K(e.index!==!0||!e.children,
`Cannot specify children on an index route`),
K(i||!r[
s
],
`Found a route id collision on id "${s}".  Route id's must be globally unique within Data Router usages`),
Fc(e)){
let n={
...e,
id:s
};
return r[
s
]=Lc(n,
t(n)),
n
}else{
let n={
...e,
id:s,
children:void 0
};
return r[
s
]=Lc(n,
t(n)),
e.children&&(n.children=Ic(e.children,
t,
o,
r,
i)),
n
}
})
}function Lc(e,
t){
return Object.assign(e,
{
...t,
...typeof t.lazy==`object`&&t.lazy!=null?{
lazy:{
...e.lazy,
...t.lazy
}
}:{

}
})
}function Rc(e,
t,
n=`/`){
return zc(e,
t,
n,
!1)
}function zc(e,
t,
n,
r,
i){
let a=al((typeof t==`string`?Ec(t):t).pathname||`/`,
n);
if(a==null)return null;
let o=i??Vc(e),
s=null,
c=il(a);
for(let e=0;
s==null&&e<o.length;
++e)s=el(o[
e
],
c,
r);
return s
}function Bc(e,
t){
let{
route:n,
pathname:r,
params:i
}=e;
return{
id:n.id,
pathname:r,
params:i,
data:t[
n.id
],
loaderData:t[
n.id
],
handle:n.handle
}
}function Vc(e){
let t=Hc(e);
return Wc(t),
t
}function Hc(e,
t=[

],
n=[

],
r=``,
i=!1){
let a=(e,
a,
o=i,
s)=>{
let c={
relativePath:s===void 0?e.path||``:s,
caseSensitive:e.caseSensitive===!0,
childrenIndex:a,
route:e
};
if(c.relativePath.startsWith(`/`)){
if(!c.relativePath.startsWith(r)&&o)return;
K(c.relativePath.startsWith(r),
`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),
c.relativePath=c.relativePath.slice(r.length)
}let l=hl([
r,
c.relativePath
]),
u=n.concat(c);
e.children&&e.children.length>0&&(K(e.index!==!0,
`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),
Hc(e.children,
t,
u,
l,
o)),
!(e.path==null&&!e.index)&&t.push({
path:l,
score:Qc(l,
e.index),
routesMeta:u.map((e,
t)=>{
let[
n,
r
]=rl(e.relativePath,
e.caseSensitive,
t===u.length-1);
return{
...e,
matcher:n,
compiledParams:r
}
})
})
};
return e.forEach((e,
t)=>{
if(e.path===``||!e.path?.includes(`?`))a(e,
t);
else for(let n of Uc(e.path))a(e,
t,
!0,
n)
}),
t
}function Uc(e){
let t=e.split(`/`);
if(t.length===0)return[

];
let[
n,
...r
]=t,
i=n.endsWith(`?`),
a=n.replace(/\?$/,
``);
if(r.length===0)return i?[
a,
``
]:[
a
];
let o=Uc(r.join(`/`)),
s=[

];
return s.push(...o.map(e=>e===``?a:[
a,
e
].join(`/`))),
i&&s.push(...o),
s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)
}function Wc(e){
e.sort((e,
t)=>e.score===t.score?$c(e.routesMeta.map(e=>e.childrenIndex),
t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)
}var Gc=/^:[
\w-
]+$/,
Kc=3,
qc=2,
Jc=1,
Yc=10,
Xc=-2,
Zc=e=>e===`*`;
function Qc(e,
t){
let n=e.split(`/`),
r=n.length;
return n.some(Zc)&&(r+=Xc),
t&&(r+=qc),
n.filter(e=>!Zc(e)).reduce((e,
t)=>e+(Gc.test(t)?Kc:t===``?Jc:Yc),
r)
}function $c(e,
t){
return e.length===t.length&&e.slice(0,
-1).every((e,
n)=>e===t[
n
])?e[
e.length-1
]-t[
t.length-1
]:0
}function el(e,
t,
n=!1){
let{
routesMeta:r
}=e,
i={

},
a=`/`,
o=[

];
for(let e=0;
e<r.length;
++e){
let s=r[
e
],
c=e===r.length-1,
l=a===`/`?t:t.slice(a.length)||`/`,
u={
path:s.relativePath,
caseSensitive:s.caseSensitive,
end:c
},
d=s.matcher&&s.compiledParams?nl(u,
l,
s.matcher,
s.compiledParams):tl(u,
l),
f=s.route;
if(!d&&c&&n&&!r[
r.length-1
].route.index&&(d=tl({
path:s.relativePath,
caseSensitive:s.caseSensitive,
end:!1
},
l)),
!d)return null;
Object.assign(i,
d.params),
o.push({
params:i,
pathname:hl([
a,
d.pathname
]),
pathnameBase:_l(hl([
a,
d.pathnameBase
])),
route:f
}),
d.pathnameBase!==`/`&&(a=hl([
a,
d.pathnameBase
]))
}return o
}function tl(e,
t){
typeof e==`string`&&(e={
path:e,
caseSensitive:!1,
end:!0
});
let[
n,
r
]=rl(e.path,
e.caseSensitive,
e.end);
return nl(e,
t,
n,
r)
}function nl(e,
t,
n,
r){
let i=t.match(n);
if(!i)return null;
let a=i[
0
],
o=a.replace(/(.)\/+$/,
`$1`),
s=i.slice(1);
return{
params:r.reduce((e,
{
paramName:t,
isOptional:n
},
r)=>{
if(t===`*`){
let e=s[
r
]||``;
o=a.slice(0,
a.length-e.length).replace(/(.)\/+$/,
`$1`)
}let i=s[
r
];
return n&&!i?e[
t
]=void 0:e[
t
]=(i||``).replace(/%2F/g,
`/`),
e
},
{

}),
pathname:a,
pathnameBase:o,
pattern:e
}
}function rl(e,
t=!1,
n=!0){
xc(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),
`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);
let r=[

],
i=`^`+e.replace(/\/*\*?$/,
``).replace(/^\/*/,
`/`).replace(/[
\\.*+^${

}|()[
\
]
]/g,
`\\$&`).replace(/\/:([
\w-
]+)(\?)?/g,
(e,
t,
n,
i,
a)=>{
if(r.push({
paramName:t,
isOptional:n!=null
}),
n){
let t=a.charAt(i+e.length);
return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`
}return`/([^\\/]+)`
}).replace(/\/([
\w-
]+)\?(\/|$)/g,
`(/$1)?$2`);
return e.endsWith(`*`)?(r.push({
paramName:`*`
}),
i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),
[
new RegExp(i,
t?void 0:`i`),
r
]
}function il(e){
try{
return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,
`%2F`)).join(`/`)
}catch(t){
return xc(!1,
`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),
e
}
}function al(e,
t){
if(t===`/`)return e;
if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;
let n=t.endsWith(`/`)?t.length-1:t.length,
r=e.charAt(n);
return r&&r!==`/`?null:e.slice(n)||`/`
}function ol({
basename:e,
pathname:t
}){
return t===`/`?e:hl([
e,
t
])
}var sl=e=>hc.test(e);
function cl(e,
t=`/`){
let{
pathname:n,
search:r=``,
hash:i=``
}=typeof e==`string`?Ec(e):e,
a;
return n?(n=ml(n),
a=n.startsWith(`/`)?ll(n.substring(1),
`/`):ll(n,
t)):a=t,
{
pathname:a,
search:vl(r),
hash:yl(i)
}
}function ll(e,
t){
let n=gl(t).split(`/`);
return e.split(`/`).forEach(e=>{
e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)
}),
n.length>1?n.join(`/`):`/`
}function ul(e,
t,
n,
r){
return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`
}function dl(e){
return e.filter((e,
t)=>t===0||e.route.path&&e.route.path.length>0)
}function fl(e){
let t=dl(e);
return t.map((e,
n)=>n===t.length-1?e.pathname:e.pathnameBase)
}function pl(e,
t,
n,
r=!1){
let i;
typeof e==`string`?i=Ec(e):(i={
...e
},
K(!i.pathname||!i.pathname.includes(`?`),
ul(`?`,
`pathname`,
`search`,
i)),
K(!i.pathname||!i.pathname.includes(`#`),
ul(`#`,
`pathname`,
`hash`,
i)),
K(!i.search||!i.search.includes(`#`),
ul(`#`,
`search`,
`hash`,
i)));
let a=e===``||i.pathname===``,
o=a?`/`:i.pathname,
s;
if(o==null)s=n;
else{
let e=t.length-1;
if(!r&&o.startsWith(`..`)){
let t=o.split(`/`);
for(;
t[
0
]===`..`;
)t.shift(),
--e;
i.pathname=t.join(`/`)
}s=e>=0?t[
e
]:`/`
}let c=cl(i,
s),
l=o&&o!==`/`&&o.endsWith(`/`),
u=(a||o===`.`)&&n.endsWith(`/`);
return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),
c
}var ml=e=>e.replace(/[
\\/
]{
2,

}/g,
`/`),
hl=e=>ml(e.join(`/`)),
gl=e=>e.replace(/\/+$/,
``),
_l=e=>gl(e).replace(/^\/*/,
`/`),
vl=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,
yl=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,
bl=[
`EvalError`,
`RangeError`,
`ReferenceError`,
`SyntaxError`,
`TypeError`,
`URIError`
],
xl=class{
constructor(e,
t,
n,
r=!1){
this.status=e,
this.statusText=t||``,
this.internal=r,
n instanceof Error?(this.data=n.toString(),
this.error=n):this.data=n
}
};
function Sl(e){
return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e
}function Cl(e){
return hl(e.map(e=>e.route.path).filter(Boolean))||`/`
}var wl=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;
function Tl(e,
t){
let n=e;
if(typeof n!=`string`||!hc.test(n))return{
absoluteURL:void 0,
isExternal:!1,
to:n
};
let r=n,
i=!1;
if(wl)try{
let e=new URL(window.location.href),
r=gc.test(n)?new URL(_c(n,
e.protocol)):new URL(n),
a=al(r.pathname,
t);
r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0
}catch{
xc(!1,
`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)
}return{
absoluteURL:r,
isExternal:i,
to:n
}
}var El=Symbol(`Uninstrumented`);
function Dl(e,
t){
let n={
lazy:[

],
"lazy.loader":[

],
"lazy.action":[

],
"lazy.middleware":[

],
middleware:[

],
loader:[

],
action:[

]
};
e.forEach(e=>e({
id:t.id,
index:t.index,
path:t.path,
instrument(e){
let t=Object.keys(n);
for(let r of t)e[
r
]&&n[
r
].push(e[
r
])
}
}));
let r={

};
if(typeof t.lazy==`function`&&n.lazy.length>0){
let e=kl(n.lazy,
t.lazy,
()=>void 0);
e&&(r.lazy=e)
}if(typeof t.lazy==`object`){
let e=t.lazy;
[
`middleware`,
`loader`,
`action`
].forEach(t=>{
let i=e[
t
],
a=n[
`lazy.${t}`
];
if(typeof i==`function`&&a.length>0){
let e=kl(a,
i,
()=>void 0);
e&&(r.lazy=Object.assign(r.lazy||{

},
{
[
t
]:e
}))
}
})
}return[
`loader`,
`action`
].forEach(e=>{
let i=t[
e
];
if(typeof i==`function`&&n[
e
].length>0){
let t=i[
El
]??i,
a=kl(n[
e
],
t,
(...e)=>jl(e[
0
]));
a&&(e===`loader`&&t.hydrate===!0&&(a.hydrate=!0),
a[
El
]=t,
r[
e
]=a)
}
}),
t.middleware&&t.middleware.length>0&&n.middleware.length>0&&(r.middleware=t.middleware.map(e=>{
let t=e[
El
]??e,
r=kl(n.middleware,
t,
(...e)=>jl(e[
0
]));
return r?(r[
El
]=t,
r):e
})),
r
}function Ol(e,
t){
let n={
navigate:[

],
fetch:[

]
};
if(t.forEach(e=>e({
instrument(e){
let t=Object.keys(e);
for(let r of t)e[
r
]&&n[
r
].push(e[
r
])
}
})),
n.navigate.length>0){
let t=e.navigate[
El
]??e.navigate,
r=kl(n.navigate,
t,
(...t)=>{
let[
n,
r
]=t;
return{
to:typeof n==`number`||typeof n==`string`?n:n?Tc(n):`.`,
...Ml(e,
r??{

})
}
});
r&&(r[
El
]=t,
e.navigate=r)
}if(n.fetch.length>0){
let t=e.fetch[
El
]??e.fetch,
r=kl(n.fetch,
t,
(...t)=>{
let[
n,
,
r,
i
]=t;
return{
href:r??`.`,
fetcherKey:n,
...Ml(e,
i??{

})
}
});
r&&(r[
El
]=t,
e.fetch=r)
}return e
}function kl(e,
t,
n){
return e.length===0?null:async(...r)=>{
let i=await Al(e,
n(...r),
()=>t(...r),
e.length-1);
if(i.type===`error`)throw i.value;
return i.value
}
}async function Al(e,
t,
n,
r){
let i=e[
r
],
a;
if(i){
let o,
s=async()=>(o?console.error(`You cannot call instrumented handlers more than once`):o=Al(e,
t,
n,
r-1),
a=await o,
K(a,
`Expected a result`),
a.type===`error`&&a.value instanceof Error?{
status:`error`,
error:a.value
}:{
status:`success`,
error:void 0
});
try{
await i(s,
t)
}catch(e){
console.error(`An instrumentation function threw an error:`,
e)
}o||await s(),
await o
}else try{
a={
type:`success`,
value:await n()
}
}catch(e){
a={
type:`error`,
value:e
}
}return a||{
type:`error`,
value:Error(`No result assigned in instrumentation chain.`)
}
}function jl(e){
let{
request:t,
context:n,
params:r,
pattern:i
}=e;
return{
request:Nl(t),
params:{
...r
},
pattern:i,
context:Pl(n)
}
}function Ml(e,
t){
return{
currentUrl:Tc(e.state.location),
...`formMethod`in t?{
formMethod:t.formMethod
}:{

},
...`formEncType`in t?{
formEncType:t.formEncType
}:{

},
...`formData`in t?{
formData:t.formData
}:{

},
...`body`in t?{
body:t.body
}:{

}
}
}function Nl(e){
return{
method:e.method,
url:e.url,
headers:{
get:(...t)=>e.headers.get(...t)
}
}
}function Pl(e){
if(q(e)){
let t={
...e
};
return Object.freeze(t),
t
}else return{
get:t=>e.get(t)
}
}var Fl=Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);
function q(e){
if(typeof e!=`object`||!e)return!1;
let t=Object.getPrototypeOf(e);
return t===Object.prototype||t===null||Object.getOwnPropertyNames(t).sort().join(`\0`)===Fl
}var Il=[
`POST`,
`PUT`,
`PATCH`,
`DELETE`
],
J=new Set(Il),
Y=[
`GET`,
...Il
],
X=new Set(Y),
Ll=new Set([
301,
302,
303,
307,
308
]),
Rl=new Set([
307,
308
]),
zl={
state:`idle`,
location:void 0,
matches:void 0,
historyAction:void 0,
formMethod:void 0,
formAction:void 0,
formEncType:void 0,
formData:void 0,
json:void 0,
text:void 0
},
Bl={
state:`idle`,
data:void 0,
formMethod:void 0,
formAction:void 0,
formEncType:void 0,
formData:void 0,
json:void 0,
text:void 0
},
Vl={
state:`unblocked`,
proceed:void 0,
reset:void 0,
location:void 0
},
Hl=e=>({
hasErrorBoundary:!!e.hasErrorBoundary
}),
Ul=`remix-router-transitions`,
Wl=Symbol(`ResetLoaderData`),
Gl,
Kl,
ql,
Jl,
Yl=class{
constructor(e){
pc(this,
Gl),
pc(this,
Kl),
pc(this,
ql),
pc(this,
Jl),
mc(this,
Gl,
e),
mc(this,
Kl,
Vc(e))
}get stableRoutes(){
return fc(this,
Gl)
}get activeRoutes(){
return fc(this,
ql)??fc(this,
Gl)
}get branches(){
return fc(this,
Jl)??fc(this,
Kl)
}get hasHMRRoutes(){
return fc(this,
ql)!=null
}setRoutes(e){
mc(this,
Gl,
e),
mc(this,
Kl,
Vc(e))
}setHmrRoutes(e){
mc(this,
ql,
e),
mc(this,
Jl,
Vc(e))
}commitHmrRoutes(){
fc(this,
ql)&&(mc(this,
Gl,
fc(this,
ql)),
mc(this,
Kl,
fc(this,
Jl)),
mc(this,
ql,
void 0),
mc(this,
Jl,
void 0))
}
};
Gl=new WeakMap,
Kl=new WeakMap,
ql=new WeakMap,
Jl=new WeakMap;
function Xl(e){
let t=e.window?e.window:typeof window<`u`?window:void 0,
n=t!==void 0&&t.document!==void 0&&t.document.createElement!==void 0;
K(e.routes.length>0,
`You must provide a non-empty routes array to createRouter`);
let r=e.hydrationRouteProperties||[

],
i=e.mapRouteProperties||Hl,
a=i;
if(e.instrumentations){
let t=e.instrumentations;
a=e=>({
...i(e),
...Dl(t.map(e=>e.route).filter(Boolean),
e)
})
}let o={

},
s=new Yl(Ic(e.routes,
a,
void 0,
o)),
c=e.basename||`/`;
c.startsWith(`/`)||(c=`/${c}`);
let l=e.dataStrategy||pu,
u={
...e.future
},
d=null,
f=new Set,
p=null,
m=null,
h=null,
g=null,
_=e.hydrationData!=null,
v=zc(s.activeRoutes,
e.history.location,
c,
!1,
s.branches),
y=!1,
b=null,
x,
S;
if(v==null&&!e.patchRoutesOnNavigation){
let t=Ru(404,
{
pathname:e.history.location.pathname
}),
{
matches:n,
route:r
}=Lu(s.activeRoutes);
x=!0,
S=!x,
v=n,
b={
[
r.id
]:t
}
}else if(v&&!e.hydrationData&&Xe(v,
s.activeRoutes,
e.history.location.pathname).active&&(v=null),
!v){
x=!1,
S=!x,
v=[

];
let t=Xe(null,
s.activeRoutes,
e.history.location.pathname);
t.active&&t.matches&&(y=!0,
v=t.matches)
}else if(v.some(e=>e.route.lazy))x=!1,
S=!x;
else if(!v.some(e=>tu(e.route)))x=!0,
S=!x;
else{
let t=e.hydrationData?e.hydrationData.loaderData:null,
n=e.hydrationData?e.hydrationData.errors:null,
r=v;
if(n){
let e=v.findIndex(e=>n[
e.route.id
]!==void 0);
r=r.slice(0,
e+1)
}S=!1,
x=!0,
r.forEach(e=>{
let r=nu(e.route,
t,
n);
S||=r.renderFallback,
x&&=!r.shouldLoad
})
}let C,
w={
historyAction:e.history.action,
location:e.history.location,
matches:v,
initialized:x,
renderFallback:S,
navigation:zl,
restoreScrollPosition:e.hydrationData==null&&null,
preventScrollReset:!1,
revalidation:`idle`,
loaderData:e.hydrationData&&e.hydrationData.loaderData||{

},
actionData:e.hydrationData&&e.hydrationData.actionData||null,
errors:e.hydrationData&&e.hydrationData.errors||b,
fetchers:new Map,
blockers:new Map
},
T=`POP`,
E=null,
ee=!1,
D,
te=!1,
ne=new Map,
re=null,
ie=!1,
ae=!1,
O=new Set,
k=new Map,
oe=0,
se=-1,
A=new Map,
ce=new Set,
le=new Map,
j=new Map,
ue=new Set,
M=new Map,
de,
fe=null;
function pe(){
if(d=e.history.listen(({
action:t,
location:n,
delta:r
})=>{
if(de){
de(),
de=void 0;
return
}xc(M.size===0||r!=null,
"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
let i=We({
currentLocation:w.location,
nextLocation:n,
historyAction:t
});
if(i&&r!=null){
let t=new Promise(e=>{
de=e
});
e.history.go(r*-1),
Ue(i,
{
state:`blocked`,
location:n,
proceed(){
Ue(i,
{
state:`proceeding`,
proceed:void 0,
reset:void 0,
location:n
}),
t.then(()=>e.history.go(r))
},
reset(){
let e=new Map(w.blockers);
e.set(i,
Vl),
ge({
blockers:e
})
}
}),
E?.resolve(),
E=null;
return
}return be(t,
n)
}),
n){
sd(t,
ne);
let e=()=>cd(t,
ne);
t.addEventListener(`pagehide`,
e),
re=()=>t.removeEventListener(`pagehide`,
e)
}return w.initialized||be(`POP`,
w.location,
{
initialHydration:!0
}),
C
}function me(){
d&&d(),
re&&re(),
f.clear(),
D&&D.abort(),
w.fetchers.forEach((e,
t)=>Fe(w.fetchers,
t)),
w.blockers.forEach((e,
t)=>He(t))
}function he(e){
if(f.add(e),
p){
let{
newErrors:t
}=p;
p=null,
e(w,
{
deletedFetchers:[

],
newErrors:t,
viewTransitionOpts:void 0,
flushSync:!1
})
}return()=>f.delete(e)
}function ge(e,
t={

}){
e.matches&&=e.matches.map(e=>{
let t=o[
e.route.id
],
n=e.route;
return n.element!==t.element||n.errorElement!==t.errorElement||n.hydrateFallbackElement!==t.hydrateFallbackElement?{
...e,
route:t
}:e
}),
w={
...w,
...e
};
let n=[

],
r=[

];
w.fetchers.forEach((e,
t)=>{
e.state===`idle`&&(ue.has(t)?n.push(t):r.push(t))
}),
ue.forEach(e=>{
!w.fetchers.has(e)&&!k.has(e)&&n.push(e)
}),
f.size===0&&(p={
newErrors:e.errors??null
}),
[
...f
].forEach(r=>r(w,
{
deletedFetchers:n,
newErrors:e.errors??null,
viewTransitionOpts:t.viewTransitionOpts,
flushSync:t.flushSync===!0
})),
n.forEach(e=>Fe(w.fetchers,
e)),
r.forEach(e=>w.fetchers.delete(e))
}function _e(t,
n,
{
flushSync:r
}={

}){
let i=w.actionData!=null&&w.navigation.formMethod!=null&&Qu(w.navigation.formMethod)&&w.navigation.state===`loading`&&t.state?._isRedirect!==!0,
a;
a=n.actionData?Object.keys(n.actionData).length>0?n.actionData:null:i?w.actionData:null;
let o=n.loaderData?Pu(w.loaderData,
n.loaderData,
n.matches||[

],
n.errors):w.loaderData,
c=w.blockers;
c.size>0&&(c=new Map(c),
c.forEach((e,
t)=>c.set(t,
Vl)));
let l=!ie&&Ye(t,
n.matches||w.matches),
u=ee===!0||w.navigation.formMethod!=null&&Qu(w.navigation.formMethod)&&t.state?._isRedirect!==!0;
s.commitHmrRoutes(),
ie||T===`POP`||(T===`PUSH`?e.history.push(t,
t.state):T===`REPLACE`&&e.history.replace(t,
t.state));
let d;
if(T===`POP`){
let e=ne.get(w.location.pathname);
e&&e.has(t.pathname)?d={
currentLocation:w.location,
nextLocation:t
}:ne.has(t.pathname)&&(d={
currentLocation:t,
nextLocation:w.location
})
}else if(te){
let e=ne.get(w.location.pathname);
e?e.add(t.pathname):(e=new Set([
t.pathname
]),
ne.set(w.location.pathname,
e)),
d={
currentLocation:w.location,
nextLocation:t
}
}ge({
...n,
actionData:a,
loaderData:o,
historyAction:T,
location:t,
initialized:!0,
renderFallback:!1,
navigation:zl,
revalidation:`idle`,
restoreScrollPosition:l,
preventScrollReset:u,
blockers:c
},
{
viewTransitionOpts:d,
flushSync:r===!0
}),
T=`POP`,
ee=!1,
te=!1,
ie=!1,
ae=!1,
E?.resolve(),
E=null,
fe?.resolve(),
fe=null
}async function ve(t,
n){
if(E?.resolve(),
E=null,
typeof t==`number`){
E||=ld();
let n=E.promise;
return e.history.go(t),
n
}let{
path:r,
submission:i,
error:a
}=$l(!1,
Ql(w.location,
w.matches,
c,
t,
n?.fromRouteId,
n?.relative),
n),
o;
n?.mask&&(o={
pathname:``,
search:``,
hash:``,
...typeof n.mask==`string`?Ec(n.mask):{
...w.location.mask,
...n.mask
}
});
let s=w.location,
l=wc(s,
r,
n&&n.state,
void 0,
o);
l={
...l,
...e.history.encodeLocation(l)
};
let u=n&&n.replace!=null?n.replace:void 0,
d=`PUSH`;
u===!0?d=`REPLACE`:u===!1||i!=null&&Qu(i.formMethod)&&i.formAction===w.location.pathname+w.location.search&&(d=`REPLACE`);
let f=n&&`preventScrollReset`in n?n.preventScrollReset===!0:void 0,
p=(n&&n.flushSync)===!0,
m=We({
currentLocation:s,
nextLocation:l,
historyAction:d
});
if(m){
Ue(m,
{
state:`blocked`,
location:l,
proceed(){
Ue(m,
{
state:`proceeding`,
proceed:void 0,
reset:void 0,
location:l
}),
ve(t,
n)
},
reset(){
let e=new Map(w.blockers);
e.set(m,
Vl),
ge({
blockers:e
})
}
});
return
}await be(d,
l,
{
submission:i,
pendingError:a,
preventScrollReset:f,
replace:n&&n.replace,
enableViewTransition:n&&n.viewTransition,
flushSync:p,
callSiteDefaultShouldRevalidate:n&&n.defaultShouldRevalidate
})
}function ye(){
fe||=ld(),
Ae(),
ge({
revalidation:`loading`
});
let e=fe.promise;
return w.navigation.state===`submitting`?e:w.navigation.state===`idle`?(be(w.historyAction,
w.location,
{
startUninterruptedRevalidation:!0
}),
e):(be(T||w.historyAction,
w.navigation.location,
{
overrideNavigation:w.navigation,
enableViewTransition:te===!0
}),
e)
}async function be(t,
n,
r){
D&&D.abort(),
D=null,
T=t,
ie=(r&&r.startUninterruptedRevalidation)===!0,
Je(w.location,
w.matches),
ee=(r&&r.preventScrollReset)===!0,
te=(r&&r.enableViewTransition)===!0;
let i=s.activeRoutes,
a=r?.initialHydration&&w.matches&&w.matches.length>0&&!y?w.matches:zc(i,
n,
c,
!1,
s.branches),
o=(r&&r.flushSync)===!0;
if(a&&w.initialized&&!ae&&Vu(w.location,
n)&&!(r&&r.submission&&Qu(r.submission.formMethod))){
_e(n,
{
matches:a
},
{
flushSync:o
});
return
}let l=Xe(a,
i,
n.pathname);
if(l.active&&l.matches&&(a=l.matches),
!a){
let{
error:e,
notFoundMatches:t,
route:r
}=Ge(n.pathname);
_e(n,
{
matches:t,
loaderData:{

},
errors:{
[
r.id
]:e
}
},
{
flushSync:o
});
return
}let u=r&&r.overrideNavigation?{
...r.overrideNavigation,
matches:a,
historyAction:t
}:void 0;
D=new AbortController;
let d=Ou(e.history,
n,
D.signal,
r&&r.submission),
f=e.getContext?await e.getContext():new Ac,
p;
if(r&&r.pendingError)p=[
Iu(a).route.id,
{
type:`error`,
error:r.pendingError
}
];
else if(r&&r.submission&&Qu(r.submission.formMethod)){
let i=await xe(d,
n,
r.submission,
a,
t,
f,
l.active,
r&&r.initialHydration===!0,
{
replace:r.replace,
flushSync:o
});
if(i.shortCircuited)return;
if(i.pendingActionResult){
let[
e,
t
]=i.pendingActionResult;
if(Gu(t)&&Sl(t.error)&&t.error.status===404){
D=null,
_e(n,
{
matches:i.matches,
loaderData:{

},
errors:{
[
e
]:t.error
}
});
return
}
}a=i.matches||a,
p=i.pendingActionResult,
u=nd(n,
a,
t,
r.submission),
o=!1,
l.active=!1,
d=Ou(e.history,
d.url,
d.signal)
}let{
shortCircuited:m,
matches:h,
loaderData:g,
errors:_,
workingFetchers:v
}=await Se(d,
n,
a,
t,
f,
l.active,
u,
r&&r.submission,
r&&r.fetcherSubmission,
r&&r.replace,
r&&r.initialHydration===!0,
o,
p,
r&&r.callSiteDefaultShouldRevalidate);
m||(D=null,
_e(n,
{
matches:h||a,
...Fu(p),
loaderData:g,
errors:_,
...v?{
fetchers:v
}:{

}
}))
}async function xe(t,
n,
i,
l,
u,
d,
f,
p,
m={

}){
if(Ae(),
ge({
navigation:rd(n,
l,
u,
i)
},
{
flushSync:m.flushSync===!0
}),
f){
let e=await Ze(l,
n.pathname,
t.signal);
if(e.type===`aborted`)return{
shortCircuited:!0
};
if(e.type===`error`){
if(e.partialMatches.length===0){
let{
matches:t,
route:n
}=Lu(s.activeRoutes);
return{
matches:t,
pendingActionResult:[
n.id,
{
type:`error`,
error:e.error
}
]
}
}let t=Iu(e.partialMatches).route.id;
return{
matches:e.partialMatches,
pendingActionResult:[
t,
{
type:`error`,
error:e.error
}
]
}
}else if(e.matches)l=e.matches;
else{
let{
notFoundMatches:e,
error:t,
route:r
}=Ge(n.pathname);
return{
matches:e,
pendingActionResult:[
r.id,
{
type:`error`,
error:t
}
]
}
}
}let h,
g=ed(l,
n);
if(!g.route.action&&!g.route.lazy)h={
type:`error`,
error:Ru(405,
{
method:t.method,
pathname:n.pathname,
routeId:g.route.id
})
};
else{
let e=await N(t,
n,
yu(a,
o,
t,
n,
l,
g,
p?[

]:r,
d),
d,
null);
if(h=e[
g.route.id
],
!h){
for(let t of l)if(e[
t.route.id
]){
h=e[
t.route.id
];
break
}
}if(t.signal.aborted)return{
shortCircuited:!0
}
}if(Ku(h)){
let n;
return n=m&&m.replace!=null?m.replace:Du(h.response.headers.get(`Location`),
new URL(t.url),
c,
e.history)===w.location.pathname+w.location.search,
await Oe(t,
h,
!0,
{
submission:i,
replace:n
}),
{
shortCircuited:!0
}
}if(Gu(h)){
let e=Iu(l,
g.route.id);
return(m&&m.replace)!==!0&&(T=`PUSH`),
{
matches:l,
pendingActionResult:[
e.route.id,
h,
g.route.id
]
}
}return{
matches:l,
pendingActionResult:[
g.route.id,
h
]
}
}async function Se(t,
n,
i,
l,
u,
d,
f,
p,
m,
h,
g,
_,
v,
y){
let b=f||nd(n,
i,
l,
p),
x=p||m||td(b),
S=!ie&&!g;
if(d){
if(S){
let e=Ce(v);
ge({
navigation:b,
...e===void 0?{

}:{
actionData:e
}
},
{
flushSync:_
})
}let e=await Ze(i,
n.pathname,
t.signal);
if(e.type===`aborted`)return{
shortCircuited:!0
};
if(e.type===`error`){
if(e.partialMatches.length===0){
let{
matches:t,
route:n
}=Lu(s.activeRoutes);
return{
matches:t,
loaderData:{

},
errors:{
[
n.id
]:e.error
}
}
}let t=Iu(e.partialMatches).route.id;
return{
matches:e.partialMatches,
loaderData:{

},
errors:{
[
t
]:e.error
}
}
}else if(e.matches)i=e.matches;
else{
let{
error:e,
notFoundMatches:t,
route:r
}=Ge(n.pathname);
return{
matches:t,
loaderData:{

},
errors:{
[
r.id
]:e
}
}
}
}let C=s.activeRoutes,
{
dsMatches:T,
revalidatingFetchers:E
}=eu(t,
u,
a,
o,
e.history,
w,
i,
x,
n,
g?[

]:r,
g===!0,
ae,
O,
ue,
le,
ce,
C,
c,
e.patchRoutesOnNavigation!=null,
s.branches,
v,
y);
if(se=++oe,
!e.dataStrategy&&!T.some(e=>e.shouldLoad)&&!T.some(e=>e.route.middleware&&e.route.middleware.length>0)&&E.length===0){
let e=new Map(w.fetchers),
t=ze(e);
return _e(n,
{
matches:i,
loaderData:{

},
errors:v&&Gu(v[
1
])?{
[
v[
0
]
]:v[
1
].error
}:null,
...Fu(v),
...t?{
fetchers:e
}:{

}
},
{
flushSync:_
}),
{
shortCircuited:!0
}
}if(S){
let e={

};
if(!d){
e.navigation=b;
let t=Ce(v);
t!==void 0&&(e.actionData=t)
}E.length>0&&(e.fetchers=we(E)),
ge(e,
{
flushSync:_
})
}E.forEach(e=>{
Le(e.key),
e.controller&&k.set(e.key,
e.controller)
});
let ee=()=>E.forEach(e=>Le(e.key));
D&&D.signal.addEventListener(`abort`,
ee);
let{
loaderResults:te,
fetcherResults:ne
}=await ke(T,
E,
t,
n,
u);
if(t.signal.aborted)return{
shortCircuited:!0
};
D&&D.signal.removeEventListener(`abort`,
ee),
E.forEach(e=>k.delete(e.key));
let re=zu(te);
if(re)return await Oe(t,
re.result,
!0,
{
replace:h
}),
{
shortCircuited:!0
};
if(re=zu(ne),
re)return ce.add(re.key),
await Oe(t,
re.result,
!0,
{
replace:h
}),
{
shortCircuited:!0
};
let A=new Map(w.fetchers),
{
loaderData:j,
errors:M
}=Nu(w,
i,
te,
v,
E,
ne,
A);
g&&w.errors&&(M={
...w.errors,
...M
});
let de=ze(A),
fe=Be(se,
A),
pe=de||fe||E.length>0;
return{
matches:i,
loaderData:j,
errors:M,
...pe?{
workingFetchers:A
}:{

}
}
}function Ce(e){
if(e&&!Gu(e[
1
]))return{
[
e[
0
]
]:e[
1
].data
};
if(w.actionData)return Object.keys(w.actionData).length===0?null:w.actionData
}function we(e){
let t=new Map(w.fetchers);
return e.forEach(e=>{
let n=t.get(e.key),
r=id(void 0,
n?n.data:void 0);
t.set(e.key,
r)
}),
t
}async function Te(t,
n,
r,
i){
Le(t);
let a=(i&&i.flushSync)===!0,
o=s.activeRoutes,
l=Ql(w.location,
w.matches,
c,
r,
n,
i?.relative),
u=zc(o,
l,
c,
!1,
s.branches),
d=Xe(u,
o,
l);
if(d.active&&d.matches&&(u=d.matches),
!u){
Me(t,
n,
Ru(404,
{
pathname:l
}),
{
flushSync:a
});
return
}let{
path:f,
submission:p,
error:m
}=$l(!0,
l,
i);
if(m){
Me(t,
n,
m,
{
flushSync:a
});
return
}let h=e.getContext?await e.getContext():new Ac,
g=(i&&i.preventScrollReset)===!0;
if(p&&Qu(p.formMethod)){
await Ee(t,
n,
f,
u,
h,
d.active,
a,
g,
p,
i&&i.defaultShouldRevalidate);
return
}le.set(t,
{
routeId:n,
path:f
}),
await De(t,
n,
f,
u,
h,
d.active,
a,
g,
p)
}async function Ee(t,
n,
i,
l,
u,
d,
f,
p,
m,
h){
Ae(),
le.delete(t),
je(t,
ad(m,
w.fetchers.get(t)),
{
flushSync:f
});
let g=new AbortController,
_=Ou(e.history,
i,
g.signal,
m);
if(d){
let e=await Ze(l,
new URL(_.url).pathname,
_.signal,
t);
if(e.type===`aborted`)return;
if(e.type===`error`){
Me(t,
n,
e.error,
{
flushSync:f
});
return
}else if(e.matches)l=e.matches;
else{
Me(t,
n,
Ru(404,
{
pathname:i
}),
{
flushSync:f
});
return
}
}let v=ed(l,
i);
if(!v.route.action&&!v.route.lazy){
Me(t,
n,
Ru(405,
{
method:m.formMethod,
pathname:i,
routeId:n
}),
{
flushSync:f
});
return
}k.set(t,
g);
let y=oe,
b=yu(a,
o,
_,
i,
l,
v,
r,
u),
x=await N(_,
i,
b,
u,
t),
S=x[
v.route.id
];
if(!S){
for(let e of b)if(x[
e.route.id
]){
S=x[
e.route.id
];
break
}
}if(_.signal.aborted){
k.get(t)===g&&k.delete(t);
return
}if(ue.has(t)){
if(Ku(S)||Gu(S)){
je(t,
od(void 0));
return
}
}else{
if(Ku(S))if(k.delete(t),
se>y){
je(t,
od(void 0));
return
}else return ce.add(t),
je(t,
id(m)),
Oe(_,
S,
!1,
{
fetcherSubmission:m,
preventScrollReset:p
});
if(Gu(S)){
Me(t,
n,
S.error);
return
}
}let C=w.navigation.location||w.location,
E=Ou(e.history,
C,
g.signal),
ee=s.activeRoutes,
te=w.navigation.state===`idle`?w.matches:zc(ee,
w.navigation.location,
c,
!1,
s.branches);
K(te,
`Didn't find any matches after fetcher action`);
let ne=++oe;
A.set(t,
ne);
let{
dsMatches:re,
revalidatingFetchers:ie
}=eu(E,
u,
a,
o,
e.history,
w,
te,
m,
C,
r,
!1,
ae,
O,
ue,
le,
ce,
ee,
c,
e.patchRoutesOnNavigation!=null,
s.branches,
[
v.route.id,
S
],
h),
j=id(m,
S.data),
M=new Map(w.fetchers);
M.set(t,
j),
ie.filter(e=>e.key!==t).forEach(e=>{
let t=e.key,
n=M.get(t),
r=id(void 0,
n?n.data:void 0);
M.set(t,
r),
Le(t),
e.controller&&k.set(t,
e.controller)
}),
ge({
fetchers:M
});
let de=()=>ie.forEach(e=>Le(e.key));
g.signal.addEventListener(`abort`,
de);
let{
loaderResults:fe,
fetcherResults:pe
}=await ke(re,
ie,
E,
C,
u);
if(g.signal.aborted)return;
g.signal.removeEventListener(`abort`,
de),
A.delete(t),
k.delete(t),
ie.forEach(e=>k.delete(e.key));
let me=w.fetchers.has(t),
he=e=>{
if(!me)return e;
let n=new Map(e.fetchers);
return n.set(t,
od(S.data)),
{
...e,
fetchers:n
}
},
ve=zu(fe);
if(ve)return w=he(w),
Oe(E,
ve.result,
!1,
{
preventScrollReset:p
});
if(ve=zu(pe),
ve)return ce.add(ve.key),
w=he(w),
Oe(E,
ve.result,
!1,
{
preventScrollReset:p
});
let ye=new Map(w.fetchers);
me&&ye.set(t,
od(S.data));
let{
loaderData:be,
errors:xe
}=Nu(w,
te,
fe,
void 0,
ie,
pe,
ye);
Be(ne,
ye),
w.navigation.state===`loading`&&ne>se?(K(T,
`Expected pending action`),
D&&D.abort(),
_e(w.navigation.location,
{
matches:te,
loaderData:be,
errors:xe,
fetchers:ye
})):(ge({
errors:xe,
loaderData:Pu(w.loaderData,
be,
te,
xe),
fetchers:ye
}),
ae=!1)
}async function De(t,
n,
i,
s,
c,
l,
u,
d,
f){
let p=w.fetchers.get(t);
je(t,
id(f,
p?p.data:void 0),
{
flushSync:u
});
let m=new AbortController,
h=Ou(e.history,
i,
m.signal);
if(l){
let e=await Ze(s,
new URL(h.url).pathname,
h.signal,
t);
if(e.type===`aborted`)return;
if(e.type===`error`){
Me(t,
n,
e.error,
{
flushSync:u
});
return
}else if(e.matches)s=e.matches;
else{
Me(t,
n,
Ru(404,
{
pathname:i
}),
{
flushSync:u
});
return
}
}let g=ed(s,
i);
k.set(t,
m);
let _=oe,
v=await N(h,
i,
yu(a,
o,
h,
i,
s,
g,
r,
c),
c,
t),
y=v[
g.route.id
];
if(!y){
for(let e of s)if(v[
e.route.id
]){
y=v[
e.route.id
];
break
}
}if(k.get(t)===m&&k.delete(t),
!h.signal.aborted){
if(ue.has(t)){
je(t,
od(void 0));
return
}if(Ku(y))if(se>_){
je(t,
od(void 0));
return
}else{
ce.add(t),
await Oe(h,
y,
!1,
{
preventScrollReset:d
});
return
}if(Gu(y)){
Me(t,
n,
y.error);
return
}je(t,
od(y.data))
}
}async function Oe(r,
i,
a,
{
submission:o,
fetcherSubmission:s,
preventScrollReset:l,
replace:u
}={

}){
a||(E?.resolve(),
E=null),
i.response.headers.has(`X-Remix-Revalidate`)&&(ae=!0);
let d=i.response.headers.get(`Location`);
K(d,
`Expected a Location header on the redirect Response`),
d=Du(d,
new URL(r.url),
c,
e.history);
let f=wc(w.location,
d,
{
_isRedirect:!0
});
if(n){
let e=!1;
if(i.response.headers.has(`X-Remix-Reload-Document`))e=!0;
else if(sl(d)){
let n=Oc(t,
d,
!0);
e=n.origin!==t.location.origin||al(n.pathname,
c)==null
}if(e){
u?t.location.replace(d):t.location.assign(d);
return
}
}D=null;
let p=u===!0||i.response.headers.has(`X-Remix-Replace`)?`REPLACE`:`PUSH`,
{
formMethod:m,
formAction:h,
formEncType:g
}=w.navigation;
!o&&!s&&m&&h&&g&&(o=td(w.navigation));
let _=o||s;
Rl.has(i.response.status)&&_&&Qu(_.formMethod)?await be(p,
f,
{
submission:{
..._,
formAction:d
},
preventScrollReset:l||ee,
enableViewTransition:a?te:void 0
}):await be(p,
f,
{
overrideNavigation:nd(f,
[

],
p,
o),
fetcherSubmission:s,
preventScrollReset:l||ee,
enableViewTransition:a?te:void 0
})
}async function N(e,
t,
n,
r,
i){
let a,
o={

};
try{
a=await bu(l,
e,
t,
n,
i,
r,
!1)
}catch(e){
return n.filter(e=>e.shouldLoad).forEach(t=>{
o[
t.route.id
]={
type:`error`,
error:e
}
}),
o
}if(e.signal.aborted)return o;
if(!Qu(e.method))for(let e of n){
if(a[
e.route.id
]?.type===`error`)break;
!a.hasOwnProperty(e.route.id)&&!w.loaderData.hasOwnProperty(e.route.id)&&(!w.errors||!w.errors.hasOwnProperty(e.route.id))&&e.shouldCallHandler()&&(a[
e.route.id
]={
type:`error`,
result:Error(`No result returned from dataStrategy for route ${e.route.id}`)
})
}for(let[
t,
r
]of Object.entries(a))if(Wu(r)){
let i=r.result;
o[
t
]={
type:`redirect`,
response:wu(i,
e,
t,
n,
c)
}
}else o[
t
]=await Cu(r);
return o
}async function ke(e,
t,
n,
r,
i){
let a=N(n,
r,
e,
i,
null),
o=Promise.all(t.map(async e=>{
if(e.matches&&e.match&&e.request&&e.controller){
let t=(await N(e.request,
e.path,
e.matches,
i,
e.key))[
e.match.route.id
];
return{
[
e.key
]:t
}
}else return Promise.resolve({
[
e.key
]:{
type:`error`,
error:Ru(404,
{
pathname:e.path
})
}
})
}));
return{
loaderResults:await a,
fetcherResults:(await o).reduce((e,
t)=>Object.assign(e,
t),
{

})
}
}function Ae(){
ae=!0,
le.forEach((e,
t)=>{
k.has(t)&&O.add(t),
Le(t)
})
}function je(e,
t,
n={

}){
let r=new Map(w.fetchers);
r.set(e,
t),
ge({
fetchers:r
},
{
flushSync:(n&&n.flushSync)===!0
})
}function Me(e,
t,
n,
r={

}){
let i=Iu(w.matches,
t),
a=new Map(w.fetchers);
Fe(a,
e),
ge({
errors:{
[
i.route.id
]:n
},
fetchers:a
},
{
flushSync:(r&&r.flushSync)===!0
})
}function Ne(e){
return j.set(e,
(j.get(e)||0)+1),
ue.has(e)&&ue.delete(e),
w.fetchers.get(e)||Bl
}function Pe(e,
t){
Le(e,
t?.reason),
je(e,
od(null))
}function Fe(e,
t){
let n=w.fetchers.get(t);
k.has(t)&&!(n&&n.state===`loading`&&A.has(t))&&Le(t),
le.delete(t),
A.delete(t),
ce.delete(t),
ue.delete(t),
O.delete(t),
e.delete(t)
}function Ie(e){
let t=(j.get(e)||0)-1;
t<=0?(j.delete(e),
ue.add(e)):j.set(e,
t),
ge({
fetchers:new Map(w.fetchers)
})
}function Le(e,
t){
let n=k.get(e);
n&&(n.abort(t),
k.delete(e))
}function Re(e,
t){
for(let n of e){
let e=t.get(n);
K(e,
`Expected fetcher: ${n}`);
let r=od(e.data);
t.set(n,
r)
}
}function ze(e){
let t=[

],
n=!1;
for(let r of ce){
let i=e.get(r);
K(i,
`Expected fetcher: ${r}`),
i.state===`loading`&&(ce.delete(r),
t.push(r),
n=!0)
}return Re(t,
e),
n
}function Be(e,
t){
let n=[

];
for(let[
r,
i
]of A)if(i<e){
let e=t.get(r);
K(e,
`Expected fetcher: ${r}`),
e.state===`loading`&&(Le(r),
A.delete(r),
n.push(r))
}return Re(n,
t),
n.length>0
}function Ve(e,
t){
let n=w.blockers.get(e)||Vl;
return M.get(e)!==t&&M.set(e,
t),
n
}function He(e){
w.blockers.delete(e),
M.delete(e)
}function Ue(e,
t){
let n=w.blockers.get(e)||Vl;
K(n.state===`unblocked`&&t.state===`blocked`||n.state===`blocked`&&t.state===`blocked`||n.state===`blocked`&&t.state===`proceeding`||n.state===`blocked`&&t.state===`unblocked`||n.state===`proceeding`&&t.state===`unblocked`,
`Invalid blocker state transition: ${n.state} -> ${t.state}`);
let r=new Map(w.blockers);
r.set(e,
t),
ge({
blockers:r
})
}function We({
currentLocation:e,
nextLocation:t,
historyAction:n
}){
if(M.size===0)return;
M.size>1&&xc(!1,
`A router only supports one blocker at a time`);
let r=Array.from(M.entries()),
[
i,
a
]=r[
r.length-1
],
o=w.blockers.get(i);
if(!(o&&o.state===`proceeding`)&&a({
currentLocation:e,
nextLocation:t,
historyAction:n
}))return i
}function Ge(e){
let t=Ru(404,
{
pathname:e
}),
n=s.activeRoutes,
{
matches:r,
route:i
}=Lu(n);
return{
notFoundMatches:r,
route:i,
error:t
}
}function Ke(e,
t,
n){
if(m=e,
g=t,
h=n||null,
!_&&w.navigation===zl){
_=!0;
let e=Ye(w.location,
w.matches);
e!=null&&ge({
restoreScrollPosition:e
})
}return()=>{
m=null,
g=null,
h=null
}
}function qe(e,
t){
return h&&h(e,
t.map(e=>Bc(e,
w.loaderData)))||e.key
}function Je(e,
t){
if(m&&g){
let n=qe(e,
t);
m[
n
]=g()
}
}function Ye(e,
t){
if(m){
let n=qe(e,
t),
r=m[
n
];
if(typeof r==`number`)return r
}return null
}function Xe(t,
n,
r){
if(e.patchRoutesOnNavigation){
let e=s.branches;
if(!t)return{
active:!0,
matches:zc(n,
r,
c,
!0,
e)||[

]
};
if(Object.keys(t[
0
].params).length>0)return{
active:!0,
matches:zc(n,
r,
c,
!0,
e)
}
}return{
active:!1,
matches:null
}
}async function Ze(t,
n,
r,
i){
if(!e.patchRoutesOnNavigation)return{
type:`success`,
matches:t
};
let l=t;
for(;
;
){
let t=o;
try{
await e.patchRoutesOnNavigation({
signal:r,
path:n,
matches:l,
fetcherKey:i,
patch:(e,
n)=>{
r.aborted||ou(e,
n,
s,
t,
a,
!1)
}
})
}catch(e){
return{
type:`error`,
error:e,
partialMatches:l
}
}if(r.aborted)return{
type:`aborted`
};
let u=s.branches,
d=zc(s.activeRoutes,
n,
c,
!1,
u),
f=null;
if(d&&(Object.keys(d[
0
].params).length===0||(f=zc(s.activeRoutes,
n,
c,
!0,
u),
!(f&&l.length<f.length&&Qe(l,
f.slice(0,
l.length))))))return{
type:`success`,
matches:d
};
if(f||=zc(s.activeRoutes,
n,
c,
!0,
u),
!f||Qe(l,
f))return{
type:`success`,
matches:null
};
l=f
}
}function Qe(e,
t){
return e.length===t.length&&e.every((e,
n)=>e.route.id===t[
n
].route.id)
}function $e(e){
o={

},
s.setHmrRoutes(Ic(e,
a,
void 0,
o))
}function et(e,
t,
n=!1){
ou(e,
t,
s,
o,
a,
n),
s.hasHMRRoutes||ge({

})
}return C={
get basename(){
return c
},
get future(){
return u
},
get state(){
return w
},
get routes(){
return s.stableRoutes
},
get branches(){
return s.branches
},
get manifest(){
return o
},
get window(){
return t
},
initialize:pe,
subscribe:he,
enableScrollRestoration:Ke,
navigate:ve,
fetch:Te,
revalidate:ye,
createHref:t=>e.history.createHref(t),
encodeLocation:t=>e.history.encodeLocation(t),
getFetcher:Ne,
resetFetcher:Pe,
deleteFetcher:Ie,
dispose:me,
getBlocker:Ve,
deleteBlocker:He,
patchRoutes:et,
_internalFetchControllers:k,
_internalSetRoutes:$e,
_internalSetStateDoNotUseOrYouWillBreakYourApp(e){
ge(e)
}
},
e.instrumentations&&(C=Ol(C,
e.instrumentations.map(e=>e.router).filter(Boolean))),
C
}function Zl(e){
return e!=null&&(`formData`in e&&e.formData!=null||`body`in e&&e.body!==void 0)
}function Ql(e,
t,
n,
r,
i,
a){
let o,
s;
if(i){
o=[

];
for(let e of t)if(o.push(e),
e.route.id===i){
s=e;
break
}
}else o=t,
s=t[
t.length-1
];
let c=pl(r||`.`,
fl(o),
al(e.pathname,
n)||e.pathname,
a===`path`);
if(r??(c.search=e.search,
c.hash=e.hash),
(r==null||r===``||r===`.`)&&s){
let e=$u(c.search);
if(s.route.index&&!e)c.search=c.search?c.search.replace(/^\?/,
`?index&`):`?index`;
else if(!s.route.index&&e){
let e=new URLSearchParams(c.search),
t=e.getAll(`index`);
e.delete(`index`),
t.filter(e=>e).forEach(t=>e.append(`index`,
t));
let n=e.toString();
c.search=n?`?${n}`:``
}
}return n!==`/`&&(c.pathname=ol({
basename:n,
pathname:c.pathname
})),
Tc(c)
}function $l(e,
t,
n){
if(!n||!Zl(n))return{
path:t
};
if(n.formMethod&&!Zu(n.formMethod))return{
path:t,
error:Ru(405,
{
method:n.formMethod
})
};
let r=()=>({
path:t,
error:Ru(400,
{
type:`invalid-body`
})
}),
i=(n.formMethod||`get`).toUpperCase(),
a=Bu(t);
if(n.body!==void 0){
if(n.formEncType===`text/plain`){
if(!Qu(i))return r();
let e=typeof n.body==`string`?n.body:n.body instanceof FormData||n.body instanceof URLSearchParams?Array.from(n.body.entries()).reduce((e,
[
t,
n
])=>`${e}${t}=${n}
`,
``):String(n.body);
return{
path:t,
submission:{
formMethod:i,
formAction:a,
formEncType:n.formEncType,
formData:void 0,
json:void 0,
text:e
}
}
}else if(n.formEncType===`application/json`){
if(!Qu(i))return r();
try{
let e=typeof n.body==`string`?JSON.parse(n.body):n.body;
return{
path:t,
submission:{
formMethod:i,
formAction:a,
formEncType:n.formEncType,
formData:void 0,
json:e,
text:void 0
}
}
}catch{
return r()
}
}
}K(typeof FormData==`function`,
`FormData is not available in this environment`);
let o,
s;
if(n.formData)o=Au(n.formData),
s=n.formData;
else if(n.body instanceof FormData)o=Au(n.body),
s=n.body;
else if(n.body instanceof URLSearchParams)o=n.body,
s=ju(o);
else if(n.body==null)o=new URLSearchParams,
s=new FormData;
else try{
o=new URLSearchParams(n.body),
s=ju(o)
}catch{
return r()
}let c={
formMethod:i,
formAction:a,
formEncType:n&&n.formEncType||`application/x-www-form-urlencoded`,
formData:s,
json:void 0,
text:void 0
};
if(Qu(c.formMethod))return{
path:t,
submission:c
};
let l=Ec(t);
return e&&l.search&&$u(l.search)&&o.append(`index`,
``),
l.search=`?${o}`,
{
path:Tc(l),
submission:c
}
}function eu(e,
t,
n,
r,
i,
a,
o,
s,
c,
l,
u,
d,
f,
p,
m,
h,
g,
_,
v,
y,
b,
x){
let S=b?Gu(b[
1
])?b[
1
].error:b[
1
].data:void 0,
C=i.createURL(a.location),
w=i.createURL(c),
T;
if(u&&a.errors){
let e=Object.keys(a.errors)[
0
];
T=o.findIndex(t=>t.route.id===e)
}else if(b&&Gu(b[
1
])){
let e=b[
0
];
T=o.findIndex(t=>t.route.id===e)-1
}let E=b?b[
1
].statusCode:void 0,
ee=E&&E>=400,
D={
currentUrl:C,
currentParams:a.matches[
0
]?.params||{

},
nextUrl:w,
nextParams:o[
0
].params,
...s,
actionResult:S,
actionStatus:E
},
te=Cl(o),
ne=o.map((i,
o)=>{
let{
route:s
}=i,
f=null;
if(T!=null&&o>T)f=!1;
else if(s.lazy)f=!0;
else if(!tu(s))f=!1;
else if(u){
let{
shouldLoad:e
}=nu(s,
a.loaderData,
a.errors);
f=e
}else ru(a.loaderData,
a.matches[
o
],
i)&&(f=!0);
if(f!==null)return vu(n,
r,
e,
c,
te,
i,
l,
t,
f);
let p=!1;
typeof x==`boolean`?p=x:ee?p=!1:d||C.pathname+C.search===w.pathname+w.search?p=!0:C.search===w.search?iu(a.matches[
o
],
i)&&(p=!0):p=!0;
let m={
...D,
defaultShouldRevalidate:p
},
h=au(i,
m);
return vu(n,
r,
e,
c,
te,
i,
l,
t,
h,
m,
x)
}),
re=[

];
return m.forEach((e,
s)=>{
if(u||!o.some(t=>t.route.id===e.routeId)||p.has(s))return;
let c=a.fetchers.get(s),
m=c&&c.state!==`idle`&&c.data===void 0,
b=zc(g,
e.path,
_??`/`,
!1,
y);
if(!b){
if(v&&m)return;
re.push({
key:s,
routeId:e.routeId,
path:e.path,
matches:null,
match:null,
request:null,
controller:null
});
return
}if(h.has(s))return;
let S=ed(b,
e.path),
C=new AbortController,
w=Ou(i,
e.path,
C.signal),
T=null;
if(f.has(s))f.delete(s),
T=yu(n,
r,
w,
e.path,
b,
S,
l,
t);
else if(m)d&&(T=yu(n,
r,
w,
e.path,
b,
S,
l,
t));
else{
let i;
i=typeof x==`boolean`?x:!ee&&d;
let a={
...D,
defaultShouldRevalidate:i
};
au(S,
a)&&(T=yu(n,
r,
w,
e.path,
b,
S,
l,
t,
a))
}T&&re.push({
key:s,
routeId:e.routeId,
path:e.path,
matches:T,
match:S,
request:w,
controller:C
})
}),
{
dsMatches:ne,
revalidatingFetchers:re
}
}function tu(e){
return e.loader!=null||e.middleware!=null&&e.middleware.length>0
}function nu(e,
t,
n){
if(e.lazy)return{
shouldLoad:!0,
renderFallback:!0
};
if(!tu(e))return{
shouldLoad:!1,
renderFallback:!1
};
let r=t!=null&&e.id in t,
i=n!=null&&n[
e.id
]!==void 0;
if(!r&&i)return{
shouldLoad:!1,
renderFallback:!1
};
if(typeof e.loader==`function`&&e.loader.hydrate===!0)return{
shouldLoad:!0,
renderFallback:!r
};
let a=!r&&!i;
return{
shouldLoad:a,
renderFallback:a
}
}function ru(e,
t,
n){
let r=!t||n.route.id!==t.route.id,
i=!e.hasOwnProperty(n.route.id);
return r||i
}function iu(e,
t){
let n=e.route.path;
return e.pathname!==t.pathname||n!=null&&n.endsWith(`*`)&&e.params[
`*`
]!==t.params[
`*`
]
}function au(e,
t){
if(e.route.shouldRevalidate){
let n=e.route.shouldRevalidate(t);
if(typeof n==`boolean`)return n
}return t.defaultShouldRevalidate
}function ou(e,
t,
n,
r,
i,
a){
let o;
if(e){
let t=r[
e
];
K(t,
`No route found to patch children into: routeId = ${e}`),
t.children||=[

],
o=t.children
}else o=n.activeRoutes;
let s=[

],
c=[

];
if(t.forEach(e=>{
let t=o.find(t=>su(e,
t));
t?c.push({
existingRoute:t,
newRoute:e
}):s.push(e)
}),
s.length>0){
let t=Ic(s,
i,
[
e||`_`,
`patch`,
String(o?.length||`0`)
],
r);
o.push(...t)
}if(a&&c.length>0)for(let e=0;
e<c.length;
e++){
let{
existingRoute:t,
newRoute:n
}=c[
e
],
r=t,
[
a
]=Ic([
n
],
i,
[

],
{

},
!0);
Object.assign(r,
{
element:a.element?a.element:r.element,
errorElement:a.errorElement?a.errorElement:r.errorElement,
hydrateFallbackElement:a.hydrateFallbackElement?a.hydrateFallbackElement:r.hydrateFallbackElement
})
}n.hasHMRRoutes||n.setRoutes([
...n.activeRoutes
])
}function su(e,
t){
return`id`in e&&`id`in t&&e.id===t.id?!0:e.index===t.index&&e.path===t.path&&e.caseSensitive===t.caseSensitive?(!e.children||e.children.length===0)&&(!t.children||t.children.length===0)?!0:e.children?.every((e,
n)=>t.children?.some(t=>su(e,
t)))??!1:!1
}var cu=new WeakMap,
lu=({
key:e,
route:t,
manifest:n,
mapRouteProperties:r
})=>{
let i=n[
t.id
];
if(K(i,
`No route found in manifest`),
!i.lazy||typeof i.lazy!=`object`)return;
let a=i.lazy[
e
];
if(!a)return;
let o=cu.get(i);
o||(o={

},
cu.set(i,
o));
let s=o[
e
];
if(s)return s;
let c=(async()=>{
let t=Mc(e),
n=i[
e
]!==void 0&&e!==`hasErrorBoundary`;
if(t)xc(!t,
`Route property `+e+` is not a supported lazy route property. This property will be ignored.`),
o[
e
]=Promise.resolve();
else if(n)xc(!1,
`Route "${i.id}" has a static property "${e}" defined. The lazy property will be ignored.`);
else{
let t=await a();
t!=null&&(Object.assign(i,
{
[
e
]:t
}),
Object.assign(i,
r(i)))
}typeof i.lazy==`object`&&(i.lazy[
e
]=void 0,
Object.values(i.lazy).every(e=>e===void 0)&&(i.lazy=void 0))
})();
return o[
e
]=c,
c
},
uu=new WeakMap;
function du(e,
t,
n,
r,
i){
let a=n[
e.id
];
if(K(a,
`No route found in manifest`),
!e.lazy)return{
lazyRoutePromise:void 0,
lazyHandlerPromise:void 0
};
if(typeof e.lazy==`function`){
let t=uu.get(a);
if(t)return{
lazyRoutePromise:t,
lazyHandlerPromise:t
};
let n=(async()=>{
K(typeof e.lazy==`function`,
`No lazy route function found`);
let t=await e.lazy(),
n={

};
for(let e in t){
let r=t[
e
];
if(r===void 0)continue;
let i=Pc(e),
o=a[
e
]!==void 0&&e!==`hasErrorBoundary`;
i?xc(!i,
`Route property `+e+` is not a supported property to be returned from a lazy route function. This property will be ignored.`):o?xc(!o,
`Route "${a.id}" has a static property "${e}" defined but its lazy function is also returning a value for this property. The lazy route property "${e}" will be ignored.`):n[
e
]=r
}Object.assign(a,
n),
Object.assign(a,
{
...r(a),
lazy:void 0
})
})();
return uu.set(a,
n),
n.catch(()=>{

}),
{
lazyRoutePromise:n,
lazyHandlerPromise:n
}
}let o=Object.keys(e.lazy),
s=[

],
c;
for(let a of o){
if(i&&i.includes(a))continue;
let o=lu({
key:a,
route:e,
manifest:n,
mapRouteProperties:r
});
o&&(s.push(o),
a===t&&(c=o))
}let l=s.length>0?Promise.all(s).then(()=>{

}):void 0;
return l?.catch(()=>{

}),
c?.catch(()=>{

}),
{
lazyRoutePromise:l,
lazyHandlerPromise:c
}
}async function fu(e){
let t=e.matches.filter(e=>e.shouldLoad),
n={

};
return(await Promise.all(t.map(e=>e.resolve()))).forEach((e,
r)=>{
n[
t[
r
].route.id
]=e
}),
n
}async function pu(e){
return e.matches.some(e=>e.route.middleware)?mu(e,
()=>fu(e)):fu(e)
}function mu(e,
t){
return hu(e,
t,
e=>{
if(Xu(e))throw e;
return e
},
Z,
n);
function n(t,
n,
r){
if(r)return Promise.resolve(Object.assign(r.value,
{
[
n
]:{
type:`error`,
result:t
}
}));
{
let{
matches:r
}=e,
i=Iu(r,
r[
Math.min(Math.max(r.findIndex(e=>e.route.id===n),
0),
Math.max(r.findIndex(e=>e.shouldCallHandler()),
0))
].route.id).route.id;
return Promise.resolve({
[
i
]:{
type:`error`,
result:t
}
})
}
}
}async function hu(e,
t,
n,
r,
i){
let{
matches:a,
...o
}=e;
return await gu(o,
a.flatMap(e=>e.route.middleware?e.route.middleware.map(t=>[
e.route.id,
t
]):[

]),
t,
n,
r,
i)
}async function gu(e,
t,
n,
r,
i,
a,
o=0){
let{
request:s
}=e;
if(s.signal.aborted)throw s.signal.reason??Error(`Request aborted: ${s.method} ${s.url}`);
let c=t[
o
];
if(!c)return await n();
let[
l,
u
]=c,
d,
f=async()=>{
if(d)throw Error("You may only call `next()` once per middleware");
try{
return d={
value:await gu(e,
t,
n,
r,
i,
a,
o+1)
},
d.value
}catch(e){
return d={
value:await a(e,
l,
d)
},
d.value
}
};
try{
let t=await u(e,
f),
n=t==null?void 0:r(t);
return i(n)?n:d?n??d.value:(d={
value:await f()
},
d.value)
}catch(e){
return await a(e,
l,
d)
}
}function _u(e,
t,
n,
r,
i){
let a=lu({
key:`middleware`,
route:r.route,
manifest:t,
mapRouteProperties:e
}),
o=du(r.route,
Qu(n.method)?`action`:`loader`,
t,
e,
i);
return{
middleware:a,
route:o.lazyRoutePromise,
handler:o.lazyHandlerPromise
}
}function vu(e,
t,
n,
r,
i,
a,
o,
s,
c,
l=null,
u){
let d=!1,
f=_u(e,
t,
n,
a,
o);
return{
...a,
_lazyPromises:f,
shouldLoad:c,
shouldRevalidateArgs:l,
shouldCallHandler(e){
return d=!0,
l?typeof u==`boolean`?au(a,
{
...l,
defaultShouldRevalidate:u
}):typeof e==`boolean`?au(a,
{
...l,
defaultShouldRevalidate:e
}):au(a,
l):c
},
resolve(e){
let{
lazy:t,
loader:o,
middleware:l
}=a.route,
u=d||c||e&&!Qu(n.method)&&(t||o),
p=l&&l.length>0&&!o&&!t;
return u&&(Qu(n.method)||!p)?xu({
request:n,
path:r,
pattern:i,
match:a,
lazyHandlerPromise:f?.handler,
lazyRoutePromise:f?.route,
handlerOverride:e,
scopedContext:s
}):Promise.resolve({
type:`data`,
result:void 0
})
}
}
}function yu(e,
t,
n,
r,
i,
a,
o,
s,
c=null){
return i.map(l=>l.route.id===a.route.id?vu(e,
t,
n,
r,
Cl(i),
l,
o,
s,
!0,
c):{
...l,
shouldLoad:!1,
shouldRevalidateArgs:c,
shouldCallHandler:()=>!1,
_lazyPromises:_u(e,
t,
n,
l,
o),
resolve:()=>Promise.resolve({
type:`data`,
result:void 0
})
})
}async function bu(e,
t,
n,
r,
i,
a,
o){
r.some(e=>e._lazyPromises?.middleware)&&await Promise.all(r.map(e=>e._lazyPromises?.middleware));
let s={
request:t,
url:ku(t,
n),
pattern:Cl(r),
params:r[
0
].params,
context:a,
matches:r
},
c=o?()=>{
throw Error("You cannot call `runClientMiddleware()` from a static handler `dataStrategy`. Middleware is run outside of `dataStrategy` during SSR in order to bubble up the Response.  You can enable middleware via the `respond` API in `query`/`queryRoute`")
}:e=>{
let t=s;
return mu(t,
()=>e({
...t,
fetcherKey:i,
runClientMiddleware:()=>{
throw Error("Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler")
}
}))
},
l=await e({
...s,
fetcherKey:i,
runClientMiddleware:c
});
try{
await Promise.all(r.flatMap(e=>[
e._lazyPromises?.handler,
e._lazyPromises?.route
]))
}catch{

}return l
}async function xu({
request:e,
path:t,
pattern:n,
match:r,
lazyHandlerPromise:i,
lazyRoutePromise:a,
handlerOverride:o,
scopedContext:s
}){
let c,
l,
u=Qu(e.method),
d=u?`action`:`loader`,
f=i=>{
let a,
c=new Promise((e,
t)=>a=t);
l=()=>a(),
e.signal.addEventListener(`abort`,
l);
let u=a=>typeof i==`function`?i({
request:e,
url:ku(e,
t),
pattern:n,
params:r.params,
context:s
},
...a===void 0?[

]:[
a
]):Promise.reject(Error(`You cannot call the handler for a route which defines a boolean "${d}" [routeId: ${r.route.id}]`)),
f=(async()=>{
try{
return{
type:`data`,
result:await(o?o(e=>u(e)):u())
}
}catch(e){
return{
type:`error`,
result:e
}
}
})();
return Promise.race([
f,
c
])
};
try{
let t=u?r.route.action:r.route.loader;
if(i||a)if(t){
let e,
[
n
]=await Promise.all([
f(t).catch(t=>{
e=t
}),
i,
a
]);
if(e!==void 0)throw e;
c=n
}else{
await i;
let t=u?r.route.action:r.route.loader;
if(t)[
c
]=await Promise.all([
f(t),
a
]);
else if(d===`action`){
let t=new URL(e.url),
n=t.pathname+t.search;
throw Ru(405,
{
method:e.method,
pathname:n,
routeId:r.route.id
})
}else return{
type:`data`,
result:void 0
}
}else if(t)c=await f(t);
else{
let t=new URL(e.url);
throw Ru(404,
{
pathname:t.pathname+t.search
})
}
}catch(e){
return{
type:`error`,
result:e
}
}finally{
l&&e.signal.removeEventListener(`abort`,
l)
}return c
}async function Su(e){
let t=e.headers.get(`Content-Type`);
return t&&/\bapplication\/json\b/.test(t)?e.body==null?null:e.json():e.text()
}async function Cu(e){
let{
result:t,
type:n
}=e;
if(Ju(t)){
let e;
try{
e=await Su(t)
}catch(e){
return{
type:`error`,
error:e
}
}return n===`error`?{
type:`error`,
error:new xl(t.status,
t.statusText,
e),
statusCode:t.status,
headers:t.headers
}:{
type:`data`,
data:e,
statusCode:t.status,
headers:t.headers
}
}return n===`error`?qu(t)?t.data instanceof Error?{
type:`error`,
error:t.data,
statusCode:t.init?.status,
headers:t.init?.headers?new Headers(t.init.headers):void 0
}:{
type:`error`,
error:Hu(t),
statusCode:Sl(t)?t.status:void 0,
headers:t.init?.headers?new Headers(t.init.headers):void 0
}:{
type:`error`,
error:t,
statusCode:Sl(t)?t.status:void 0
}:qu(t)?{
type:`data`,
data:t.data,
statusCode:t.init?.status,
headers:t.init?.headers?new Headers(t.init.headers):void 0
}:{
type:`data`,
data:t
}
}function wu(e,
t,
n,
r,
i){
let a=e.headers.get(`Location`);
if(K(a,
`Redirects returned/thrown from loaders/actions must have a Location header`),
!sl(a)){
let o=r.slice(0,
r.findIndex(e=>e.route.id===n)+1);
a=Ql(new URL(t.url),
o,
i,
a),
e.headers.set(`Location`,
a)
}return e
}var Tu=[
`about:`,
`blob:`,
`chrome:`,
`chrome-untrusted:`,
`content:`,
`data:`,
`devtools:`,
`file:`,
`filesystem:`,
`javascript:`
];
function Eu(e){
try{
return Tu.includes(new URL(e).protocol)
}catch{
return!1
}
}function Du(e,
t,
n,
r){
if(sl(e)){
let r=e,
i=gc.test(r)?new URL(_c(r,
t.protocol)):new URL(r);
if(Eu(i.toString()))throw Error(`Invalid redirect location`);
let a=al(i.pathname,
n)!=null;
if(i.origin===t.origin&&a)return ml(i.pathname)+i.search+i.hash
}try{
if(Eu(r.createURL(e).toString()))throw Error(`Invalid redirect location`)
}catch{

}return e
}function Ou(e,
t,
n,
r){
let i=e.createURL(Bu(t)).toString(),
a={
signal:n
};
if(r&&Qu(r.formMethod)){
let{
formMethod:e,
formEncType:t
}=r;
a.method=e.toUpperCase(),
t===`application/json`?(a.headers=new Headers({
"Content-Type":t
}),
a.body=JSON.stringify(r.json)):t===`text/plain`?a.body=r.text:t===`application/x-www-form-urlencoded`&&r.formData?a.body=Au(r.formData):a.body=r.formData
}return new Request(i,
a)
}function ku(e,
t){
let n=new URL(e.url),
r=typeof t==`string`?Ec(t):t;
if(n.pathname=r.pathname||`/`,
r.search){
let e=new URLSearchParams(r.search),
t=e.getAll(`index`);
e.delete(`index`);
for(let n of t.filter(Boolean))e.append(`index`,
n);
n.search=e.size?`?${e.toString()}`:``
}else n.search=``;
return n.hash=r.hash||``,
n
}function Au(e){
let t=new URLSearchParams;
for(let[
n,
r
]of e.entries())t.append(n,
typeof r==`string`?r:r.name);
return t
}function ju(e){
let t=new FormData;
for(let[
n,
r
]of e.entries())t.append(n,
r);
return t
}function Mu(e,
t,
n,
r=!1,
i=!1){
let a={

},
o=null,
s,
c=!1,
l={

},
u=n&&Gu(n[
1
])?n[
1
].error:void 0;
return e.forEach(n=>{
if(!(n.route.id in t))return;
let d=n.route.id,
f=t[
d
];
if(K(!Ku(f),
`Cannot handle redirect results in processLoaderData`),
Gu(f)){
let t=f.error;
if(u!==void 0&&(t=u,
u=void 0),
o||={

},
i)o[
d
]=t;
else{
let n=Iu(e,
d);
o[
n.route.id
]??(o[
n.route.id
]=t)
}r||(a[
d
]=Wl),
c||(c=!0,
s=Sl(f.error)?f.error.status:500),
f.headers&&(l[
d
]=f.headers)
}else a[
d
]=f.data,
f.statusCode&&f.statusCode!==200&&!c&&(s=f.statusCode),
f.headers&&(l[
d
]=f.headers)
}),
u!==void 0&&n&&(o={
[
n[
0
]
]:u
},
n[
2
]&&(a[
n[
2
]
]=void 0)),
{
loaderData:a,
errors:o,
statusCode:s||200,
loaderHeaders:l
}
}function Nu(e,
t,
n,
r,
i,
a,
o){
let{
loaderData:s,
errors:c
}=Mu(t,
n,
r);
return i.filter(e=>!e.matches||e.matches.some(e=>e.shouldLoad)).forEach(t=>{
let{
key:n,
match:r,
controller:i
}=t;
if(i&&i.signal.aborted)return;
let s=a[
n
];
if(K(s,
`Did not find corresponding fetcher result`),
Gu(s)){
let t=Iu(e.matches,
r?.route.id);
c&&c[
t.route.id
]||(c={
...c,
[
t.route.id
]:s.error
}),
o.delete(n)
}else if(Ku(s))K(!1,
`Unhandled fetcher revalidation redirect`);
else{
let e=od(s.data);
o.set(n,
e)
}
}),
{
loaderData:s,
errors:c
}
}function Pu(e,
t,
n,
r){
let i=Object.entries(t).filter(([
,
e
])=>e!==Wl).reduce((e,
[
t,
n
])=>(e[
t
]=n,
e),
{

});
for(let a of n){
let n=a.route.id;
if(!t.hasOwnProperty(n)&&e.hasOwnProperty(n)&&a.route.loader&&(i[
n
]=e[
n
]),
r&&r.hasOwnProperty(n))break
}return i
}function Fu(e){
return e?Gu(e[
1
])?{
actionData:{

}
}:{
actionData:{
[
e[
0
]
]:e[
1
].data
}
}:{

}
}function Iu(e,
t){
return(t?e.slice(0,
e.findIndex(e=>e.route.id===t)+1):[
...e
]).reverse().find(e=>e.route.hasErrorBoundary===!0)||e[
0
]
}function Lu(e){
let t=e.length===1?e[
0
]:e.find(e=>e.index||!e.path||e.path===`/`)||{
id:`__shim-error-route__`
};
return{
matches:[
{
params:{

},
pathname:``,
pathnameBase:``,
route:t
}
],
route:t
}
}function Ru(e,
{
pathname:t,
routeId:n,
method:r,
type:i,
message:a
}={

}){
let o=`Unknown Server Error`,
s=`Unknown @remix-run/router error`;
return e===400?(o=`Bad Request`,
r&&t&&n?s=`You made a ${r} request to "${t}" but did not provide a \`loader\` for route "${n}", so there is no way to handle the request.`:i===`invalid-body`&&(s=`Unable to encode submission body`)):e===403?(o=`Forbidden`,
s=`Route "${n}" does not match URL "${t}"`):e===404?(o=`Not Found`,
s=`No route matches URL "${t}"`):e===405&&(o=`Method Not Allowed`,
r&&t&&n?s=`You made a ${r.toUpperCase()} request to "${t}" but did not provide an \`action\` for route "${n}", so there is no way to handle the request.`:r&&(s=`Invalid request method "${r.toUpperCase()}"`)),
new xl(e||500,
o,
Error(s),
!0)
}function zu(e){
let t=Object.entries(e);
for(let e=t.length-1;
e>=0;
e--){
let[
n,
r
]=t[
e
];
if(Ku(r))return{
key:n,
result:r
}
}
}function Bu(e){
return Tc({
...typeof e==`string`?Ec(e):e,
hash:``
})
}function Vu(e,
t){
return e.pathname!==t.pathname||e.search!==t.search?!1:e.hash===``?t.hash!==``:e.hash===t.hash||t.hash!==``
}function Hu(e){
return new xl(e.init?.status??500,
e.init?.statusText??`Internal Server Error`,
e.data)
}function Z(e){
return typeof e==`object`&&!!e&&Object.entries(e).every(([
e,
t
])=>typeof e==`string`&&Uu(t))
}function Uu(e){
return typeof e==`object`&&!!e&&`type`in e&&`result`in e&&(e.type===`data`||e.type===`error`)
}function Wu(e){
return Ju(e.result)&&Ll.has(e.result.status)
}function Gu(e){
return e.type===`error`
}function Ku(e){
return(e&&e.type)===`redirect`
}function qu(e){
return typeof e==`object`&&!!e&&`type`in e&&`data`in e&&`init`in e&&e.type===`DataWithResponseInit`
}function Ju(e){
return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.headers==`object`&&e.body!==void 0
}function Yu(e){
return Ll.has(e)
}function Xu(e){
return Ju(e)&&Yu(e.status)&&e.headers.has(`Location`)
}function Zu(e){
return X.has(e.toUpperCase())
}function Qu(e){
return J.has(e.toUpperCase())
}function $u(e){
return new URLSearchParams(e).getAll(`index`).some(e=>e===``)
}function ed(e,
t){
let n=typeof t==`string`?Ec(t).search:t.search;
if(e[
e.length-1
].route.index&&$u(n||``))return e[
e.length-1
];
let r=dl(e);
return r[
r.length-1
]
}function td(e){
let{
formMethod:t,
formAction:n,
formEncType:r,
text:i,
formData:a,
json:o
}=e;
if(!(!t||!n||!r)){
if(i!=null)return{
formMethod:t,
formAction:n,
formEncType:r,
formData:void 0,
json:void 0,
text:i
};
if(a!=null)return{
formMethod:t,
formAction:n,
formEncType:r,
formData:a,
json:void 0,
text:void 0
};
if(o!==void 0)return{
formMethod:t,
formAction:n,
formEncType:r,
formData:void 0,
json:o,
text:void 0
}
}
}function nd(e,
t,
n,
r){
return r?{
state:`loading`,
location:e,
matches:t,
historyAction:n,
formMethod:r.formMethod,
formAction:r.formAction,
formEncType:r.formEncType,
formData:r.formData,
json:r.json,
text:r.text
}:{
state:`loading`,
location:e,
matches:t,
historyAction:n,
formMethod:void 0,
formAction:void 0,
formEncType:void 0,
formData:void 0,
json:void 0,
text:void 0
}
}function rd(e,
t,
n,
r){
return{
state:`submitting`,
location:e,
matches:t,
historyAction:n,
formMethod:r.formMethod,
formAction:r.formAction,
formEncType:r.formEncType,
formData:r.formData,
json:r.json,
text:r.text
}
}function id(e,
t){
return e?{
state:`loading`,
formMethod:e.formMethod,
formAction:e.formAction,
formEncType:e.formEncType,
formData:e.formData,
json:e.json,
text:e.text,
data:t
}:{
state:`loading`,
formMethod:void 0,
formAction:void 0,
formEncType:void 0,
formData:void 0,
json:void 0,
text:void 0,
data:t
}
}function ad(e,
t){
return{
state:`submitting`,
formMethod:e.formMethod,
formAction:e.formAction,
formEncType:e.formEncType,
formData:e.formData,
json:e.json,
text:e.text,
data:t?t.data:void 0
}
}function od(e){
return{
state:`idle`,
formMethod:void 0,
formAction:void 0,
formEncType:void 0,
formData:void 0,
json:void 0,
text:void 0,
data:e
}
}function sd(e,
t){
try{
let n=e.sessionStorage.getItem(Ul);
if(n){
let e=JSON.parse(n);
for(let[
n,
r
]of Object.entries(e||{

}))r&&Array.isArray(r)&&t.set(n,
new Set(r||[

]))
}
}catch{

}
}function cd(e,
t){
if(t.size>0){
let n={

};
for(let[
e,
r
]of t)n[
e
]=[
...r
];
try{
e.sessionStorage.setItem(Ul,
JSON.stringify(n))
}catch(e){
xc(!1,
`Failed to save applied view transitions in sessionStorage (${e}).`)
}
}
}function ld(){
let e,
t,
n=new Promise((r,
i)=>{
e=async e=>{
r(e);
try{
await n
}catch{

}
},
t=async e=>{
i(e);
try{
await n
}catch{

}
}
});
return{
promise:n,
resolve:e,
reject:t
}
}var ud=m.createContext(null);
ud.displayName=`DataRouter`;
var dd=m.createContext(null);
dd.displayName=`DataRouterState`;
var fd=m.createContext(!1);
function pd(){
return m.useContext(fd)
}var md=m.createContext({
isTransitioning:!1
});
md.displayName=`ViewTransition`;
var hd=m.createContext(new Map);
hd.displayName=`Fetchers`;
var gd=m.createContext(null);
gd.displayName=`Await`;
var _d=m.createContext(null);
_d.displayName=`Navigation`;
var Q=m.createContext(null);
Q.displayName=`Location`;
var vd=m.createContext({
outlet:null,
matches:[

],
isDataRoute:!1
});
vd.displayName=`Route`;
var yd=m.createContext(null);
yd.displayName=`RouteError`;
var bd=`REACT_ROUTER_ERROR`,
xd=`REDIRECT`,
Sd=`ROUTE_ERROR_RESPONSE`;
function Cd(e){
if(e.startsWith(`${bd}:${xd}:{`))try{
let t=JSON.parse(e.slice(28));
if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t
}catch{

}
}function wd(e){
if(e.startsWith(`${bd}:${Sd}:{`))try{
let t=JSON.parse(e.slice(40));
if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new xl(t.status,
t.statusText,
t.data)
}catch{

}
}function Td(e,
{
relative:t
}={

}){
K(Ed(),
`useHref() may be used only in the context of a <Router> component.`);
let{
basename:n,
navigator:r
}=m.useContext(_d),
{
hash:i,
pathname:a,
search:o
}=Pd(e,
{
relative:t
}),
s=a;
return n!==`/`&&(s=a===`/`?n:hl([
n,
a
])),
r.createHref({
pathname:s,
search:o,
hash:i
})
}function Ed(){
return m.useContext(Q)!=null
}function Dd(){
return K(Ed(),
`useLocation() may be used only in the context of a <Router> component.`),
m.useContext(Q).location
}var Od=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function kd(e){
m.useContext(_d).static||m.useLayoutEffect(e)
}function Ad(){
let{
isDataRoute:e
}=m.useContext(vd);
return e?Qd():jd()
}function jd(){
K(Ed(),
`useNavigate() may be used only in the context of a <Router> component.`);
let e=m.useContext(ud),
{
basename:t,
navigator:n
}=m.useContext(_d),
{
matches:r
}=m.useContext(vd),
{
pathname:i
}=Dd(),
a=JSON.stringify(fl(r)),
o=m.useRef(!1);
return kd(()=>{
o.current=!0
}),
m.useCallback((r,
s={

})=>{
if(xc(o.current,
Od),
!o.current)return;
if(typeof r==`number`){
n.go(r);
return
}let c=pl(r,
JSON.parse(a),
i,
s.relative===`path`);
e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:hl([
t,
c.pathname
])),
(s.replace?n.replace:n.push)(c,
s.state,
s)
},
[
t,
n,
a,
i,
e
])
}var Md=m.createContext(null);
function Nd(e){
let t=m.useContext(vd).outlet;
return m.useMemo(()=>t&&m.createElement(Md.Provider,
{
value:e
},
t),
[
t,
e
])
}function Pd(e,
{
relative:t
}={

}){
let{
matches:n
}=m.useContext(vd),
{
pathname:r
}=Dd(),
i=JSON.stringify(fl(n));
return m.useMemo(()=>pl(e,
JSON.parse(i),
r,
t===`path`),
[
e,
i,
r,
t
])
}function Fd(e,
t,
n){
K(Ed(),
`useRoutes() may be used only in the context of a <Router> component.`);
let{
navigator:r
}=m.useContext(_d),
{
matches:i
}=m.useContext(vd),
a=i[
i.length-1
],
o=a?a.params:{

},
s=a?a.pathname:`/`,
c=a?a.pathnameBase:`/`,
l=a&&a.route;
{
let e=l&&l.path||``;
ef(s,
!l||e.endsWith(`*`)||e.endsWith(`*?`),
`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${
e
}/*`}">.`)
}let u=Dd(),
d;
if(t){
let e=typeof t==`string`?Ec(t):t;
K(c===`/`||e.pathname?.startsWith(c),
`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),
d=e
}else d=u;
let f=d.pathname||`/`,
p=f;
if(c!==`/`){
let e=c.replace(/^\//,
``).split(`/`);
p=`/`+f.replace(/^\//,
``).split(`/`).slice(e.length).join(`/`)
}let h=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,
{
route:n.manifest[
e.route.id
]||e.route
})):Rc(e,
{
pathname:p
});
xc(l||h!=null,
`No routes matched location "${d.pathname}${d.search}${d.hash}" `),
xc(h==null||h[
h.length-1
].route.element!==void 0||h[
h.length-1
].route.Component!==void 0||h[
h.length-1
].route.lazy!==void 0,
`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);
let g=Hd(h&&h.map(e=>Object.assign({

},
e,
{
params:Object.assign({

},
o,
e.params),
pathname:hl([
c,
r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,
`%25`).replace(/\?/g,
`%3F`).replace(/#/g,
`%23`)).pathname:e.pathname
]),
pathnameBase:e.pathnameBase===`/`?c:hl([
c,
r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,
`%25`).replace(/\?/g,
`%3F`).replace(/#/g,
`%23`)).pathname:e.pathnameBase
])
})),
i,
n);
return t&&g?m.createElement(Q.Provider,
{
value:{
location:{
pathname:`/`,
search:``,
hash:``,
state:null,
key:`default`,
mask:void 0,
...d
},
navigationType:`POP`
}
},
g):g
}function Id(){
let e=Zd(),
t=Sl(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),
n=e instanceof Error?e.stack:null,
r=`rgba(200,200,200, 0.5)`,
i={
padding:`0.5rem`,
backgroundColor:r
},
a={
padding:`2px 4px`,
backgroundColor:r
},
o=null;
return console.error(`Error handled by React Router default ErrorBoundary:`,
e),
o=m.createElement(m.Fragment,
null,
m.createElement(`p`,
null,
`💿 Hey developer 👋`),
m.createElement(`p`,
null,
`You can provide a way better UX than this when your app throws errors by providing your own `,
m.createElement(`code`,
{
style:a
},
`ErrorBoundary`),
` or`,
` `,
m.createElement(`code`,
{
style:a
},
`errorElement`),
` prop on your route.`)),
m.createElement(m.Fragment,
null,
m.createElement(`h2`,
null,
`Unexpected Application Error!`),
m.createElement(`h3`,
{
style:{
fontStyle:`italic`
}
},
t),
n?m.createElement(`pre`,
{
style:i
},
n):null,
o)
}var Ld=m.createElement(Id,
null),
Rd=class extends m.Component{
constructor(e){
super(e),
this.state={
location:e.location,
revalidation:e.revalidation,
error:e.error
}
}static getDerivedStateFromError(e){
return{
error:e
}
}static getDerivedStateFromProps(e,
t){
return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{
error:e.error,
location:e.location,
revalidation:e.revalidation
}:{
error:e.error===void 0?t.error:e.error,
location:t.location,
revalidation:e.revalidation||t.revalidation
}
}componentDidCatch(e,
t){
this.props.onError?this.props.onError(e,
t):console.error(`React Router caught the following error during render`,
e)
}render(){
let e=this.state.error;
if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){
let t=wd(e.digest);
t&&(e=t)
}let t=e===void 0?this.props.children:m.createElement(vd.Provider,
{
value:this.props.routeContext
},
m.createElement(yd.Provider,
{
value:e,
children:this.props.component
}));
return this.context?m.createElement(Bd,
{
error:e
},
t):t
}
};
Rd.contextType=fd;
var zd=new WeakMap;
function Bd({
children:e,
error:t
}){
let{
basename:n
}=m.useContext(_d);
if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){
let e=Cd(t.digest);
if(e){
let r=zd.get(t);
if(r)throw r;
let i=Tl(e.location,
n),
a=i.absoluteURL||i.to;
if(Eu(a))throw Error(`Invalid redirect location`);
if(wl&&!zd.get(t))if(i.isExternal||e.reloadDocument)window.location.href=a;
else{
let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,
{
replace:e.replace
}));
throw zd.set(t,
n),
n
}return m.createElement(`meta`,
{
httpEquiv:`refresh`,
content:`0;url=${a}`
})
}
}return e
}function Vd({
routeContext:e,
match:t,
children:n
}){
let r=m.useContext(ud);
return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),
m.createElement(vd.Provider,
{
value:e
},
n)
}function Hd(e,
t=[

],
n){
let r=n?.state;
if(e==null){
if(!r)return null;
if(r.errors)e=r.matches;
else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;
else return null
}let i=e,
a=r?.errors;
if(a!=null){
let e=i.findIndex(e=>e.route.id&&a?.[
e.route.id
]!==void 0);
K(e>=0,
`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,
`)}`),
i=i.slice(0,
Math.min(i.length,
e+1))
}let o=!1,
s=-1;
if(n&&r){
o=r.renderFallback;
for(let e=0;
e<i.length;
e++){
let t=i[
e
];
if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),
t.route.id){
let{
loaderData:e,
errors:a
}=r,
c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[
t.route.id
]===void 0);
if(t.route.lazy||c){
n.isStatic&&(o=!0),
i=s>=0?i.slice(0,
s+1):[
i[
0
]
];
break
}
}
}
}let c=n?.onError,
l=r&&c?(e,
t)=>{
c(e,
{
location:r.location,
params:r.matches?.[
0
]?.params??{

},
pattern:Cl(r.matches),
errorInfo:t
})
}:void 0;
return i.reduceRight((e,
n,
c)=>{
let u,
d=!1,
f=null,
p=null;
r&&(u=a&&n.route.id?a[
n.route.id
]:void 0,
f=n.route.errorElement||Ld,
o&&(s<0&&c===0?(ef(`route-fallback`,
!1,
"No `HydrateFallback` element provided to render during initial hydration"),
d=!0,
p=null):s===c&&(d=!0,
p=n.route.hydrateFallbackElement||null)));
let h=t.concat(i.slice(0,
c+1)),
g=()=>{
let t;
return t=u?f:d?p:n.route.Component?m.createElement(n.route.Component,
null):n.route.element?n.route.element:e,
m.createElement(Vd,
{
match:n,
routeContext:{
outlet:e,
matches:h,
isDataRoute:r!=null
},
children:t
})
};
return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?m.createElement(Rd,
{
location:r.location,
revalidation:r.revalidation,
component:f,
error:u,
children:g(),
routeContext:{
outlet:null,
matches:h,
isDataRoute:!0
},
onError:l
}):g()
},
null)
}function Ud(e){
return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}function Wd(e){
let t=m.useContext(ud);
return K(t,
Ud(e)),
t
}function Gd(e){
let t=m.useContext(dd);
return K(t,
Ud(e)),
t
}function Kd(e){
let t=m.useContext(vd);
return K(t,
Ud(e)),
t
}function qd(e){
let t=Kd(e),
n=t.matches[
t.matches.length-1
];
return K(n.route.id,
`${e} can only be used on routes that contain a unique "id"`),
n.route.id
}function Jd(){
return qd(`useRouteId`)
}function Yd(){
let e=Gd(`useNavigation`);
return m.useMemo(()=>{
let{
matches:t,
historyAction:n,
...r
}=e.navigation;
return r
},
[
e.navigation
])
}function Xd(){
let{
matches:e,
loaderData:t
}=Gd(`useMatches`);
return m.useMemo(()=>e.map(e=>Bc(e,
t)),
[
e,
t
])
}function Zd(){
let e=m.useContext(yd),
t=Gd(`useRouteError`),
n=qd(`useRouteError`);
return e===void 0?t.errors?.[
n
]:e
}function Qd(){
let{
router:e
}=Wd(`useNavigate`),
t=qd(`useNavigate`),
n=m.useRef(!1);
return kd(()=>{
n.current=!0
}),
m.useCallback(async(r,
i={

})=>{
xc(n.current,
Od),
n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,
{
fromRouteId:t,
...i
}))
},
[
e,
t
])
}var $d={

};
function ef(e,
t,
n){
!t&&!$d[
e
]&&($d[
e
]=!0,
xc(!1,
n))
}var tf={

};
function nf(e,
t){
!e&&!tf[
t
]&&(tf[
t
]=!0,
console.warn(t))
}var rf=m.useOptimistic,
af=()=>void 0;
function of(e){
return rf?rf(e):[
e,
af
]
}function sf(e){
let t={
hasErrorBoundary:e.hasErrorBoundary||e.ErrorBoundary!=null||e.errorElement!=null
};
return e.Component&&(e.element&&xc(!1,
"You should not include both `Component` and `element` on your route - `Component` will be used."),
Object.assign(t,
{
element:m.createElement(e.Component),
Component:void 0
})),
e.HydrateFallback&&(e.hydrateFallbackElement&&xc(!1,
"You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."),
Object.assign(t,
{
hydrateFallbackElement:m.createElement(e.HydrateFallback),
HydrateFallback:void 0
})),
e.ErrorBoundary&&(e.errorElement&&xc(!1,
"You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."),
Object.assign(t,
{
errorElement:m.createElement(e.ErrorBoundary),
ErrorBoundary:void 0
})),
t
}var cf=[
`HydrateFallback`,
`hydrateFallbackElement`
],
lf=class{
constructor(){
this.status=`pending`,
this.promise=new Promise((e,
t)=>{
this.resolve=t=>{
this.status===`pending`&&(this.status=`resolved`,
e(t))
},
this.reject=e=>{
this.status===`pending`&&(this.status=`rejected`,
t(e))
}
})
}
};
function uf({
router:e,
flushSync:t,
onError:n,
useTransitions:r
}){
r=pd()||r;
let[
i,
a
]=m.useState(e.state),
[
o,
s
]=of(i),
[
c,
l
]=m.useState(),
[
u,
d
]=m.useState({
isTransitioning:!1
}),
[
f,
p
]=m.useState(),
[
h,
g
]=m.useState(),
[
_,
v
]=m.useState(),
y=m.useRef(new Map),
b=m.useCallback((i,
{
deletedFetchers:o,
newErrors:c,
flushSync:u,
viewTransitionOpts:_
})=>{
c&&n&&Object.values(c).forEach(e=>n(e,
{
location:i.location,
params:i.matches[
0
]?.params??{

},
pattern:Cl(i.matches)
})),
i.fetchers.forEach((e,
t)=>{
e.data!==void 0&&y.current.set(t,
e.data)
}),
o.forEach(e=>y.current.delete(e)),
nf(u===!1||t!=null,
'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.');
let b=e.window!=null&&e.window.document!=null&&typeof e.window.document.startViewTransition==`function`;
if(nf(_==null||b,
"You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."),
!_||!b){
t&&u?t(()=>a(i)):r===!1?a(i):m.startTransition(()=>{
r===!0&&s(e=>df(e,
i)),
a(i)
});
return
}if(t&&u){
t(()=>{
h&&(f?.resolve(),
h.skipTransition()),
d({
isTransitioning:!0,
flushSync:!0,
currentLocation:_.currentLocation,
nextLocation:_.nextLocation
})
});
let n=e.window.document.startViewTransition(()=>{
t(()=>a(i))
});
n.finished.finally(()=>{
t(()=>{
p(void 0),
g(void 0),
l(void 0),
d({
isTransitioning:!1
})
})
}),
t(()=>g(n));
return
}h?(f?.resolve(),
h.skipTransition(),
v({
state:i,
currentLocation:_.currentLocation,
nextLocation:_.nextLocation
})):(l(i),
d({
isTransitioning:!0,
flushSync:!1,
currentLocation:_.currentLocation,
nextLocation:_.nextLocation
}))
},
[
e.window,
t,
h,
f,
r,
s,
n
]);
m.useLayoutEffect(()=>e.subscribe(b),
[
e,
b
]),
m.useEffect(()=>{
u.isTransitioning&&!u.flushSync&&p(new lf)
},
[
u
]),
m.useEffect(()=>{
if(f&&c&&e.window){
let t=c,
n=f.promise,
i=e.window.document.startViewTransition(async()=>{
r===!1?a(t):m.startTransition(()=>{
r===!0&&s(e=>df(e,
t)),
a(t)
}),
await n
});
i.finished.finally(()=>{
p(void 0),
g(void 0),
l(void 0),
d({
isTransitioning:!1
})
}),
g(i)
}
},
[
c,
f,
e.window,
r,
s
]),
m.useEffect(()=>{
f&&c&&o.location.key===c.location.key&&f.resolve()
},
[
f,
h,
o.location,
c
]),
m.useEffect(()=>{
!u.isTransitioning&&_&&(l(_.state),
d({
isTransitioning:!0,
flushSync:!1,
currentLocation:_.currentLocation,
nextLocation:_.nextLocation
}),
v(void 0))
},
[
u.isTransitioning,
_
]);
let x=m.useMemo(()=>({
createHref:e.createHref,
encodeLocation:e.encodeLocation,
go:t=>e.navigate(t),
push:(t,
n,
r)=>e.navigate(t,
{
state:n,
preventScrollReset:r?.preventScrollReset
}),
replace:(t,
n,
r)=>e.navigate(t,
{
replace:!0,
state:n,
preventScrollReset:r?.preventScrollReset
})
}),
[
e
]),
S=e.basename||`/`,
C=m.useMemo(()=>({
router:e,
navigator:x,
static:!1,
basename:S,
onError:n
}),
[
e,
x,
S,
n
]);
return m.createElement(m.Fragment,
null,
m.createElement(ud.Provider,
{
value:C
},
m.createElement(dd.Provider,
{
value:o
},
m.createElement(hd.Provider,
{
value:y.current
},
m.createElement(md.Provider,
{
value:u
},
m.createElement(_f,
{
basename:S,
location:o.location,
navigationType:o.historyAction,
navigator:x,
useTransitions:r
},
m.createElement(ff,
{
routes:e.routes,
manifest:e.manifest,
future:e.future,
state:o,
isStatic:!1,
onError:n
})))))),
null)
}function df(e,
t){
return{
...e,
navigation:t.navigation.state===`idle`?e.navigation:t.navigation,
revalidation:t.revalidation===`idle`?e.revalidation:t.revalidation,
actionData:t.navigation.state===`submitting`?e.actionData:t.actionData,
fetchers:t.fetchers
}
}var ff=m.memo(pf);
function pf({
routes:e,
manifest:t,
future:n,
state:r,
isStatic:i,
onError:a
}){
return Fd(e,
void 0,
{
manifest:t,
state:r,
isStatic:i,
onError:a,
future:n
})
}function mf({
to:e,
replace:t,
state:n,
relative:r
}){
K(Ed(),
`<Navigate> may be used only in the context of a <Router> component.`);
let{
static:i
}=m.useContext(_d);
xc(!i,
`<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`);
let{
matches:a
}=m.useContext(vd),
{
pathname:o
}=Dd(),
s=Ad(),
c=pl(e,
fl(a),
o,
r===`path`),
l=JSON.stringify(c);
return m.useEffect(()=>{
s(JSON.parse(l),
{
replace:t,
state:n,
relative:r
})
},
[
s,
l,
r,
t,
n
]),
null
}function hf(e){
return Nd(e.context)
}function gf(e){
K(!1,
`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)
}function _f({
basename:e=`/`,
children:t=null,
location:n,
navigationType:r=`POP`,
navigator:i,
static:a=!1,
useTransitions:o
}){
K(!Ed(),
`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);
let s=e.replace(/^\/*/,
`/`),
c=m.useMemo(()=>({
basename:s,
navigator:i,
static:a,
useTransitions:o,
future:{

}
}),
[
s,
i,
a,
o
]);
typeof n==`string`&&(n=Ec(n));
let{
pathname:l=`/`,
search:u=``,
hash:d=``,
state:f=null,
key:p=`default`,
mask:h
}=n,
g=m.useMemo(()=>{
let e=al(l,
s);
return e==null?null:{
location:{
pathname:e,
search:u,
hash:d,
state:f,
key:p,
mask:h
},
navigationType:r
}
},
[
s,
l,
u,
d,
f,
p,
r,
h
]);
return xc(g!=null,
`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),
g==null?null:m.createElement(_d.Provider,
{
value:c
},
m.createElement(Q.Provider,
{
children:t,
value:g
}))
}m.Component;
function vf(e,
t=[

]){
let n=[

];
return m.Children.forEach(e,
(e,
r)=>{
if(!m.isValidElement(e))return;
let i=[
...t,
r
];
if(e.type===m.Fragment){
n.push.apply(n,
vf(e.props.children,
i));
return
}K(e.type===gf,
`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),
K(!e.props.index||!e.props.children,
`An index route cannot have child routes.`);
let a={
id:e.props.id||i.join(`-`),
caseSensitive:e.props.caseSensitive,
element:e.props.element,
Component:e.props.Component,
index:e.props.index,
path:e.props.path,
middleware:e.props.middleware,
loader:e.props.loader,
action:e.props.action,
hydrateFallbackElement:e.props.hydrateFallbackElement,
HydrateFallback:e.props.HydrateFallback,
errorElement:e.props.errorElement,
ErrorBoundary:e.props.ErrorBoundary,
hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,
shouldRevalidate:e.props.shouldRevalidate,
handle:e.props.handle,
lazy:e.props.lazy
};
e.props.children&&(a.children=vf(e.props.children,
i)),
n.push(a)
}),
n
}var yf=vf,
bf=`get`,
xf=`application/x-www-form-urlencoded`;
function Sf(e){
return typeof HTMLElement<`u`&&e instanceof HTMLElement
}function Cf(e){
return Sf(e)&&e.tagName.toLowerCase()===`button`
}function wf(e){
return Sf(e)&&e.tagName.toLowerCase()===`form`
}function Tf(e){
return Sf(e)&&e.tagName.toLowerCase()===`input`
}function Ef(e){
return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)
}function Df(e,
t){
return e.button===0&&(!t||t===`_self`)&&!Ef(e)
}var Of=null;
function kf(){
if(Of===null)try{
new FormData(document.createElement(`form`),
0),
Of=!1
}catch{
Of=!0
}return Of
}var Af=new Set([
`application/x-www-form-urlencoded`,
`multipart/form-data`,
`text/plain`
]);
function jf(e){
return e!=null&&!Af.has(e)?(xc(!1,
`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${xf}"`),
null):e
}function Mf(e,
t){
let n,
r,
i,
a,
o;
if(wf(e)){
let o=e.getAttribute(`action`);
r=o?al(o,
t):null,
n=e.getAttribute(`method`)||bf,
i=jf(e.getAttribute(`enctype`))||xf,
a=new FormData(e)
}else if(Cf(e)||Tf(e)&&(e.type===`submit`||e.type===`image`)){
let o=e.form;
if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);
let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);
if(r=s?al(s,
t):null,
n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||bf,
i=jf(e.getAttribute(`formenctype`))||jf(o.getAttribute(`enctype`))||xf,
a=new FormData(o,
e),
!kf()){
let{
name:t,
type:n,
value:r
}=e;
if(n===`image`){
let e=t?`${t}.`:``;
a.append(`${e}x`,
`0`),
a.append(`${e}y`,
`0`)
}else t&&a.append(t,
r)
}
}else if(Sf(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);
else n=bf,
r=null,
i=xf,
o=e;
return a&&i===`text/plain`&&(o=a,
a=void 0),
{
action:r,
method:n.toLowerCase(),
encType:i,
formData:a,
body:o
}
}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);
var Nf={
"&":`\\u0026`,
">":`\\u003e`,
"<":`\\u003c`,
"\u2028":`\\u2028`,
"\u2029":`\\u2029`
},
Pf=/[
&><\u2028\u2029
]/g;
function Ff(e){
return e.replace(Pf,
e=>Nf[
e
])
}function If(e,
t){
if(e===!1||e==null)throw Error(t)
}function Lf(e,
t,
n,
r){
let i=typeof e==`string`?new URL(e,
typeof window>`u`?`server://singlefetch/`:window.location.origin):e;
return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&al(i.pathname,
t)===`/`?i.pathname=`${gl(t)}/_root.${r}`:i.pathname=`${gl(i.pathname)}.${r}`,
i
}async function Rf(e,
t){
if(e.id in t)return t[
e.id
];
try{
let n=await lc(()=>import(e.module),
[

]);
return t[
e.id
]=n,
n
}catch(t){
return console.error(`Error loading route module \`${e.module}\`, reloading page...`),
console.error(t),
window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,
window.location.reload(),
new Promise(()=>{

})
}
}function zf(e){
return e!=null&&typeof e.page==`string`
}function Bf(e){
return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`
}async function Vf(e,
t,
n){
return Kf((await Promise.all(e.map(async e=>{
let r=t.routes[
e.route.id
];
if(r){
let e=await Rf(r,
n);
return e.links?e.links():[

]
}return[

]
}))).flat(1).filter(Bf).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{
...e,
rel:`prefetch`,
as:`style`
}:{
...e,
rel:`prefetch`
}))
}function Hf(e,
t,
n,
r,
i,
a){
let o=(e,
t)=>!n[
t
]||e.route.id!==n[
t
].route.id,
s=(e,
t)=>n[
t
].pathname!==e.pathname||n[
t
].route.path?.endsWith(`*`)&&n[
t
].params[
`*`
]!==e.params[
`*`
];
return a===`assets`?t.filter((e,
t)=>o(e,
t)||s(e,
t)):a===`data`?t.filter((t,
a)=>{
let c=r.routes[
t.route.id
];
if(!c||!c.hasLoader)return!1;
if(o(t,
a)||s(t,
a))return!0;
if(t.route.shouldRevalidate){
let r=t.route.shouldRevalidate({
currentUrl:new URL(i.pathname+i.search+i.hash,
window.origin),
currentParams:n[
0
]?.params||{

},
nextUrl:new URL(e,
window.origin),
nextParams:t.params,
defaultShouldRevalidate:!0
});
if(typeof r==`boolean`)return r
}return!0
}):[

]
}function Uf(e,
t,
{
includeHydrateFallback:n
}={

}){
return Wf(e.map(e=>{
let r=t.routes[
e.route.id
];
if(!r)return[

];
let i=[
r.module
];
return r.clientActionModule&&(i=i.concat(r.clientActionModule)),
r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),
n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),
r.imports&&(i=i.concat(r.imports)),
i
}).flat(1))
}function Wf(e){
return[
...new Set(e)
]
}function Gf(e){
let t={

},
n=Object.keys(e).sort();
for(let r of n)t[
r
]=e[
r
];
return t
}function Kf(e,
t){
let n=new Set,
r=new Set(t);
return e.reduce((e,
i)=>{
if(t&&!zf(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;
let a=JSON.stringify(Gf(i));
return n.has(a)||(n.add(a),
e.push({
key:a,
link:i
})),
e
},
[

])
}function qf(){
let e=m.useContext(ud);
return If(e,
`You must render this element inside a <DataRouterContext.Provider> element`),
e
}function Jf(){
let e=m.useContext(dd);
return If(e,
`You must render this element inside a <DataRouterStateContext.Provider> element`),
e
}var Yf=m.createContext(void 0);
Yf.displayName=`FrameworkContext`;
function Xf(){
let e=m.useContext(Yf);
return If(e,
`You must render this element inside a <HydratedRouter> element`),
e
}function Zf(e,
t){
let n=m.useContext(Yf),
[
r,
i
]=m.useState(!1),
[
a,
o
]=m.useState(!1),
{
onFocus:s,
onBlur:c,
onMouseEnter:l,
onMouseLeave:u,
onTouchStart:d
}=t,
f=m.useRef(null);
m.useEffect(()=>{
if(e===`render`&&o(!0),
e===`viewport`){
let e=new IntersectionObserver(e=>{
e.forEach(e=>{
o(e.isIntersecting)
})
},
{
threshold:.5
});
return f.current&&e.observe(f.current),
()=>{
e.disconnect()
}
}
},
[
e
]),
m.useEffect(()=>{
if(r){
let e=setTimeout(()=>{
o(!0)
},
100);
return()=>{
clearTimeout(e)
}
}
},
[
r
]);
let p=()=>{
i(!0)
},
h=()=>{
i(!1),
o(!1)
};
return n?e===`intent`?[
a,
f,
{
onFocus:Qf(s,
p),
onBlur:Qf(c,
h),
onMouseEnter:Qf(l,
p),
onMouseLeave:Qf(u,
h),
onTouchStart:Qf(d,
p)
}
]:[
a,
f,
{

}
]:[
!1,
f,
{

}
]
}function Qf(e,
t){
return n=>{
e&&e(n),
n.defaultPrevented||t(n)
}
}function $f({
page:e,
...t
}){
let n=pd(),
{
nonce:r
}=Xf(),
{
router:i
}=qf(),
a=m.useMemo(()=>Rc(i.routes,
e,
i.basename),
[
i.routes,
e,
i.basename
]);
return a?(t.nonce==null&&r&&(t={
...t,
nonce:r
}),
n?m.createElement(tp,
{
page:e,
matches:a,
...t
}):m.createElement(np,
{
page:e,
matches:a,
...t
})):null
}function ep(e){
let{
manifest:t,
routeModules:n
}=Xf(),
[
r,
i
]=m.useState([

]);
return m.useEffect(()=>{
let r=!1;
return Vf(e,
t,
n).then(e=>{
r||i(e)
}),
()=>{
r=!0
}
},
[
e,
t,
n
]),
r
}function tp({
page:e,
matches:t,
...n
}){
let r=Dd(),
{
future:i
}=Xf(),
{
basename:a
}=qf(),
o=m.useMemo(()=>{
if(e===r.pathname+r.search+r.hash)return[

];
let n=Lf(e,
a,
i.v8_trailingSlashAwareDataRequests,
`rsc`),
o=!1,
s=[

];
for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);
return o&&s.length>0&&n.searchParams.set(`_routes`,
s.join(`,`)),
[
n.pathname+n.search
]
},
[
a,
i.v8_trailingSlashAwareDataRequests,
e,
r,
t
]);
return m.createElement(m.Fragment,
null,
o.map(e=>m.createElement(`link`,
{
key:e,
rel:`prefetch`,
as:`fetch`,
href:e,
...n
})))
}function np({
page:e,
matches:t,
...n
}){
let r=Dd(),
{
future:i,
manifest:a,
routeModules:o
}=Xf(),
{
basename:s
}=qf(),
{
loaderData:c,
matches:l
}=Jf(),
u=m.useMemo(()=>Hf(e,
t,
l,
a,
r,
`data`),
[
e,
t,
l,
a,
r
]),
d=m.useMemo(()=>Hf(e,
t,
l,
a,
r,
`assets`),
[
e,
t,
l,
a,
r
]),
f=m.useMemo(()=>{
if(e===r.pathname+r.search+r.hash)return[

];
let n=new Set,
l=!1;
if(t.forEach(e=>{
let t=a.routes[
e.route.id
];
!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[
e.route.id
]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))
}),
n.size===0)return[

];
let d=Lf(e,
s,
i.v8_trailingSlashAwareDataRequests,
`data`);
return l&&n.size>0&&d.searchParams.set(`_routes`,
t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),
[
d.pathname+d.search
]
},
[
s,
i.v8_trailingSlashAwareDataRequests,
c,
r,
a,
u,
t,
e,
o
]),
p=m.useMemo(()=>Uf(d,
a),
[
d,
a
]),
h=ep(d);
return m.createElement(m.Fragment,
null,
f.map(e=>m.createElement(`link`,
{
key:e,
rel:`prefetch`,
as:`fetch`,
href:e,
...n
})),
p.map(e=>m.createElement(`link`,
{
key:e,
rel:`modulepreload`,
href:e,
...n
})),
h.map(({
key:e,
link:t
})=>m.createElement(`link`,
{
key:e,
nonce:n.nonce,
...t,
crossOrigin:t.crossOrigin??n.crossOrigin
})))
}function rp(...e){
return t=>{
e.forEach(e=>{
typeof e==`function`?e(t):e!=null&&(e.current=t)
})
}
}m.Component;
var ip=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;
try{
ip&&(window.__reactRouterVersion=`7.18.1`)
}catch{

}function ap(e,
t){
return Xl({
basename:t?.basename,
getContext:t?.getContext,
future:t?.future,
history:bc({
window:t?.window
}),
hydrationData:t?.hydrationData||op(),
routes:e,
mapRouteProperties:sf,
hydrationRouteProperties:cf,
dataStrategy:t?.dataStrategy,
patchRoutesOnNavigation:t?.patchRoutesOnNavigation,
window:t?.window,
instrumentations:t?.instrumentations
}).initialize()
}function op(){
let e=window?.__staticRouterHydrationData;
return e&&e.errors&&(e={
...e,
errors:sp(e.errors)
}),
e
}function sp(e){
if(!e)return null;
let t=Object.entries(e),
n={

};
for(let[
e,
r
]of t)if(r&&r.__type===`RouteErrorResponse`)n[
e
]=new xl(r.status,
r.statusText,
r.data,
r.internal===!0);
else if(r&&r.__type===`Error`){
if(typeof r.__subType==`string`&&bl.includes(r.__subType)){
let t=window[
r.__subType
];
if(typeof t==`function`)try{
let i=new t(r.message);
i.stack=``,
n[
e
]=i
}catch{

}
}if(n[
e
]==null){
let t=Error(r.message);
t.stack=``,
n[
e
]=t
}
}else n[
e
]=r;
return n
}function cp({
basename:e,
children:t,
history:n,
useTransitions:r
}){
let[
i,
a
]=m.useState({
action:n.action,
location:n.location
}),
o=m.useCallback(e=>{
r===!1?a(e):m.startTransition(()=>a(e))
},
[
r
]);
return m.useLayoutEffect(()=>n.listen(o),
[
n,
o
]),
m.createElement(_f,
{
basename:e,
children:t,
location:i.location,
navigationType:i.action,
navigator:n,
useTransitions:r
})
}cp.displayName=`unstable_HistoryRouter`;
var lp=m.forwardRef(function({
onClick:e,
discover:t=`render`,
prefetch:n=`none`,
relative:r,
reloadDocument:i,
replace:a,
mask:o,
state:s,
target:c,
to:l,
preventScrollReset:u,
viewTransition:d,
defaultShouldRevalidate:f,
...p
},
h){
let{
basename:g,
navigator:_,
useTransitions:v
}=m.useContext(_d),
y=typeof l==`string`&&hc.test(l),
b=Tl(l,
g);
l=b.to;
let x=Td(l,
{
relative:r
}),
S=Dd(),
C=null;
if(o){
let e=pl(o,
[

],
S.mask?S.mask.pathname:`/`,
!0);
g!==`/`&&(e.pathname=e.pathname===`/`?g:hl([
g,
e.pathname
])),
C=_.createHref(e)
}let[
w,
T,
E
]=Zf(n,
p),
ee=gp(l,
{
replace:a,
mask:o,
state:s,
target:c,
preventScrollReset:u,
relative:r,
viewTransition:d,
defaultShouldRevalidate:f,
useTransitions:v
});
function D(t){
e&&e(t),
t.defaultPrevented||ee(t)
}let te=!(b.isExternal||i),
ne=m.createElement(`a`,
{
...p,
...E,
href:(te?C:void 0)||b.absoluteURL||x,
onClick:te?D:e,
ref:rp(h,
T),
target:c,
"data-discover":!y&&t===`render`?`true`:void 0
});
return w&&!y?m.createElement(m.Fragment,
null,
ne,
m.createElement($f,
{
page:x
})):ne
});
lp.displayName=`Link`;
var up=m.forwardRef(function({
"aria-current":e=`page`,
caseSensitive:t=!1,
className:n=``,
end:r=!1,
style:i,
to:a,
viewTransition:o,
children:s,
...c
},
l){
let u=Pd(a,
{
relative:c.relative
}),
d=Dd(),
f=m.useContext(dd),
{
navigator:p,
basename:h
}=m.useContext(_d),
g=f!=null&&Ep(u)&&o===!0,
_=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,
v=d.pathname,
y=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;
t||(v=v.toLowerCase(),
y=y?y.toLowerCase():null,
_=_.toLowerCase()),
y&&h&&(y=al(y,
h)||y);
let b=_!==`/`&&_.endsWith(`/`)?_.length-1:_.length,
x=v===_||!r&&v.startsWith(_)&&v.charAt(b)===`/`,
S=y!=null&&(y===_||!r&&y.startsWith(_)&&y.charAt(_.length)===`/`),
C={
isActive:x,
isPending:S,
isTransitioning:g
},
w=x?e:void 0,
T;
T=typeof n==`function`?n(C):[
n,
x?`active`:null,
S?`pending`:null,
g?`transitioning`:null
].filter(Boolean).join(` `);
let E=typeof i==`function`?i(C):i;
return m.createElement(lp,
{
...c,
"aria-current":w,
className:T,
ref:l,
style:E,
to:a,
viewTransition:o
},
typeof s==`function`?s(C):s)
});
up.displayName=`NavLink`;
var dp=m.forwardRef(({
discover:e=`render`,
fetcherKey:t,
navigate:n,
reloadDocument:r,
replace:i,
state:a,
method:o=bf,
action:s,
onSubmit:c,
relative:l,
preventScrollReset:u,
viewTransition:d,
defaultShouldRevalidate:f,
...p
},
h)=>{
let{
useTransitions:g
}=m.useContext(_d),
_=yp(),
v=bp(s,
{
relative:l
}),
y=o.toLowerCase()===`get`?`get`:`post`,
b=typeof s==`string`&&hc.test(s);
return m.createElement(`form`,
{
ref:h,
method:y,
action:v,
onSubmit:r?c:e=>{
if(c&&c(e),
e.defaultPrevented)return;
e.preventDefault();
let r=e.nativeEvent.submitter,
s=r?.getAttribute(`formmethod`)||o,
p=()=>_(r||e.currentTarget,
{
fetcherKey:t,
method:s,
navigate:n,
replace:i,
state:a,
relative:l,
preventScrollReset:u,
viewTransition:d,
defaultShouldRevalidate:f
});
g&&n!==!1?m.startTransition(()=>p()):p()
},
...p,
"data-discover":!b&&e===`render`?`true`:void 0
})
});
dp.displayName=`Form`;
function fp({
getKey:e,
storageKey:t,
...n
}){
let r=m.useContext(Yf),
{
basename:i
}=m.useContext(_d),
a=Dd(),
o=Xd();
wp({
getKey:e,
storageKey:t
});
let s=m.useMemo(()=>{
if(!r||!e)return null;
let t=Cp(a,
o,
i,
e);
return t===a.key?null:t
},
[

]);
if(!r||r.isSpaMode)return null;
let c=((e,
t)=>{
if(!window.history.state||!window.history.state.key){
let e=Math.random().toString(32).slice(2);
window.history.replaceState({
key:e
},
``)
}try{
let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[
t||window.history.state.key
];
typeof n==`number`&&window.scrollTo(0,
n)
}catch(t){
console.error(t),
sessionStorage.removeItem(e)
}
}).toString();
return n.nonce==null&&r?.nonce&&(n.nonce=r.nonce),
m.createElement(`script`,
{
...n,
suppressHydrationWarning:!0,
dangerouslySetInnerHTML:{
__html:`(${c})(${Ff(JSON.stringify(t||xp))}, ${Ff(JSON.stringify(s))})`
}
})
}fp.displayName=`ScrollRestoration`;
function pp(e){
return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}function mp(e){
let t=m.useContext(ud);
return K(t,
pp(e)),
t
}function hp(e){
let t=m.useContext(dd);
return K(t,
pp(e)),
t
}function gp(e,
{
target:t,
replace:n,
mask:r,
state:i,
preventScrollReset:a,
relative:o,
viewTransition:s,
defaultShouldRevalidate:c,
useTransitions:l
}={

}){
let u=Ad(),
d=Dd(),
f=Pd(e,
{
relative:o
});
return m.useCallback(p=>{
if(Df(p,
t)){
p.preventDefault();
let t=n===void 0?Tc(d)===Tc(f):n,
h=()=>u(e,
{
replace:t,
mask:r,
state:i,
preventScrollReset:a,
relative:o,
viewTransition:s,
defaultShouldRevalidate:c
});
l?m.startTransition(()=>h()):h()
}
},
[
d,
u,
f,
n,
r,
i,
t,
e,
a,
o,
s,
c,
l
])
}var _p=0,
vp=()=>`__${String(++_p)}__`;
function yp(){
let{
router:e
}=mp(`useSubmit`),
{
basename:t
}=m.useContext(_d),
n=Jd(),
r=e.fetch,
i=e.navigate;
return m.useCallback(async(e,
a={

})=>{
let{
action:o,
method:s,
encType:c,
formData:l,
body:u
}=Mf(e,
t);
if(a.navigate===!1){
let e=a.fetcherKey||vp();
await r(e,
n,
a.action||o,
{
defaultShouldRevalidate:a.defaultShouldRevalidate,
preventScrollReset:a.preventScrollReset,
formData:l,
body:u,
formMethod:a.method||s,
formEncType:a.encType||c,
flushSync:a.flushSync
})
}else await i(a.action||o,
{
defaultShouldRevalidate:a.defaultShouldRevalidate,
preventScrollReset:a.preventScrollReset,
formData:l,
body:u,
formMethod:a.method||s,
formEncType:a.encType||c,
replace:a.replace,
state:a.state,
fromRouteId:n,
flushSync:a.flushSync,
viewTransition:a.viewTransition
})
},
[
r,
i,
t,
n
])
}function bp(e,
{
relative:t
}={

}){
let{
basename:n
}=m.useContext(_d),
r=m.useContext(vd);
K(r,
`useFormAction must be used inside a RouteContext`);
let[
i
]=r.matches.slice(-1),
a={
...Pd(e||`.`,
{
relative:t
})
},
o=Dd();
if(e==null){
a.search=o.search;
let e=new URLSearchParams(a.search),
t=e.getAll(`index`);
if(t.some(e=>e===``)){
e.delete(`index`),
t.filter(e=>e).forEach(t=>e.append(`index`,
t));
let n=e.toString();
a.search=n?`?${n}`:``
}
}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,
`?index&`):`?index`),
n!==`/`&&(a.pathname=a.pathname===`/`?n:hl([
n,
a.pathname
])),
Tc(a)
}var xp=`react-router-scroll-positions`,
Sp={

};
function Cp(e,
t,
n,
r){
let i=null;
return r&&(i=r(n===`/`?e:{
...e,
pathname:al(e.pathname,
n)||e.pathname
},
t)),
i??=e.key,
i
}function wp({
getKey:e,
storageKey:t
}={

}){
let{
router:n
}=mp(`useScrollRestoration`),
{
restoreScrollPosition:r,
preventScrollReset:i
}=hp(`useScrollRestoration`),
{
basename:a
}=m.useContext(_d),
o=Dd(),
s=Xd(),
c=Yd();
m.useEffect(()=>(window.history.scrollRestoration=`manual`,
()=>{
window.history.scrollRestoration=`auto`
}),
[

]),
Tp(m.useCallback(()=>{
if(c.state===`idle`){
let t=Cp(o,
s,
a,
e);
Sp[
t
]=window.scrollY
}try{
sessionStorage.setItem(t||xp,
JSON.stringify(Sp))
}catch(e){
xc(!1,
`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)
}window.history.scrollRestoration=`auto`
},
[
c.state,
e,
a,
o,
s,
t
])),
typeof document<`u`&&(m.useLayoutEffect(()=>{
try{
let e=sessionStorage.getItem(t||xp);
e&&(Sp=JSON.parse(e))
}catch{

}
},
[
t
]),
m.useLayoutEffect(()=>{
let t=n?.enableScrollRestoration(Sp,
()=>window.scrollY,
e?(t,
n)=>Cp(t,
n,
a,
e):void 0);
return()=>t&&t()
},
[
n,
a,
e
]),
m.useLayoutEffect(()=>{
if(r!==!1){
if(typeof r==`number`){
window.scrollTo(0,
r);
return
}try{
if(o.hash){
let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));
if(e){
e.scrollIntoView();
return
}
}
}catch{
xc(!1,
`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)
}i!==!0&&window.scrollTo(0,
0)
}
},
[
o,
r,
i
]))
}function Tp(e,
t){
let{
capture:n
}=t||{

};
m.useEffect(()=>{
let t=n==null?void 0:{
capture:n
};
return window.addEventListener(`pagehide`,
e,
t),
()=>{
window.removeEventListener(`pagehide`,
e,
t)
}
},
[
e,
n
])
}function Ep(e,
{
relative:t
}={

}){
let n=m.useContext(md);
K(n!=null,
"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
let{
basename:r
}=mp(`useViewTransitionState`),
i=Pd(e,
{
relative:t
});
if(!n.isTransitioning)return!1;
let a=al(n.currentLocation.pathname,
r)||n.currentLocation.pathname,
o=al(n.nextLocation.pathname,
r)||n.nextLocation.pathname;
return tl(i.pathname,
o)!=null||tl(i.pathname,
a)!=null
}var Dp=o((e=>{
var t=d();
function n(e){
var t=`https://react.dev/errors/`+e;
if(1<arguments.length){
t+=`?args[]=`+encodeURIComponent(arguments[
1
]);
for(var n=2;
n<arguments.length;
n++)t+=`&args[]=`+encodeURIComponent(arguments[
n
])
}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
}function r(){

}var i={
d:{
f:r,
r:function(){
throw Error(n(522))
},
D:r,
C:r,
L:r,
m:r,
X:r,
S:r,
M:r
},
p:0,
findDOMNode:null
},
a=Symbol.for(`react.portal`);
function o(e,
t,
n){
var r=3<arguments.length&&arguments[
3
]!==void 0?arguments[
3
]:null;
return{
$$typeof:a,
key:r==null?null:``+r,
children:e,
containerInfo:t,
implementation:n
}
}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function c(e,
t){
if(e===`font`)return``;
if(typeof t==`string`)return t===`use-credentials`?t:``
}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,
e.createPortal=function(e,
t){
var r=2<arguments.length&&arguments[
2
]!==void 0?arguments[
2
]:null;
if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));
return o(e,
t,
null,
r)
},
e.flushSync=function(e){
var t=s.T,
n=i.p;
try{
if(s.T=null,
i.p=2,
e)return e()
}finally{
s.T=t,
i.p=n,
i.d.f()
}
},
e.preconnect=function(e,
t){
typeof e==`string`&&(t?(t=t.crossOrigin,
t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,
i.d.C(e,
t))
},
e.prefetchDNS=function(e){
typeof e==`string`&&i.d.D(e)
},
e.preinit=function(e,
t){
if(typeof e==`string`&&t&&typeof t.as==`string`){
var n=t.as,
r=c(n,
t.crossOrigin),
a=typeof t.integrity==`string`?t.integrity:void 0,
o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;
n===`style`?i.d.S(e,
typeof t.precedence==`string`?t.precedence:void 0,
{
crossOrigin:r,
integrity:a,
fetchPriority:o
}):n===`script`&&i.d.X(e,
{
crossOrigin:r,
integrity:a,
fetchPriority:o,
nonce:typeof t.nonce==`string`?t.nonce:void 0
})
}
},
e.preinitModule=function(e,
t){
if(typeof e==`string`)if(typeof t==`object`&&t){
if(t.as==null||t.as===`script`){
var n=c(t.as,
t.crossOrigin);
i.d.M(e,
{
crossOrigin:n,
integrity:typeof t.integrity==`string`?t.integrity:void 0,
nonce:typeof t.nonce==`string`?t.nonce:void 0
})
}
}else t??i.d.M(e)
},
e.preload=function(e,
t){
if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){
var n=t.as,
r=c(n,
t.crossOrigin);
i.d.L(e,
n,
{
crossOrigin:r,
integrity:typeof t.integrity==`string`?t.integrity:void 0,
nonce:typeof t.nonce==`string`?t.nonce:void 0,
type:typeof t.type==`string`?t.type:void 0,
fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,
referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,
imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,
imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,
media:typeof t.media==`string`?t.media:void 0
})
}
},
e.preloadModule=function(e,
t){
if(typeof e==`string`)if(t){
var n=c(t.as,
t.crossOrigin);
i.d.m(e,
{
as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,
crossOrigin:n,
integrity:typeof t.integrity==`string`?t.integrity:void 0
})
}else i.d.m(e)
},
e.requestFormReset=function(e){
i.d.r(e)
},
e.unstable_batchedUpdates=function(e,
t){
return e(t)
},
e.useFormState=function(e,
t,
n){
return s.H.useFormState(e,
t,
n)
},
e.useFormStatus=function(){
return s.H.useHostTransitionStatus()
},
e.version=`19.2.7`
})),
Op=o(((e,
t)=>{
function n(){
if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{
__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)
}catch(e){
console.error(e)
}
}n(),
t.exports=Dp()
})),
kp=l(Op(),
1);
function Ap(e){
return m.createElement(uf,
{
flushSync:kp.flushSync,
...e
})
}function jp(){
let e=(0,
U.jsxs)(`a`,
{
href:`https://ko-fi.com/shadowdarktools`,
target:`_blank`,
rel:`noopener`,
className:`flex items-center px-3 rounded-lg border border-black bg-black text-white`,
children:[
G.getDonateIcon(),
`\xA0Support\xA0`,
(0,
U.jsx)(`span`,
{
className:`text-sm align-top`,
children:G.getExternalLinkIcon()
})
]
});
return(0,
U.jsx)(`nav`,
{
className:`flex flex-wrap items-center justify-between border-t border-b border-gray-500`,
children:(0,
U.jsxs)(`ul`,
{
className:`nav flex flex-col sm:flex-row sm:gap-3 gap-1 py-2 flex-wrap`,
children:[
[
{
label:`Home`,
path:`/`
},
{
label:`Session`,
path:`/session`
},
{
label:`Tools`,
path:`/tools`
},
{
label:`Planning`,
path:`/planning`
},
{
label:`Reference`,
path:`/reference`
},
{
label:`Resources`,
path:`/resources`
},
{
label:`About`,
path:`/about`
}
].map(e=>(0,
U.jsx)(`li`,
{
children:(0,
U.jsx)(up,
{
to:e.path,
className:({
isActive:e,
isPending:t
})=>t?`whitespace-nowrap min-w-min border-b-2 mr-3`:e?`whitespace-nowrap min-w-min border-b-2 border-black mr-3 font-bold`:`whitespace-nowrap min-w-min border-b-2 border-gray-400 mr-3 font-normal`,
children:e.label
},
e.label)
},
e.label)),
(0,
U.jsx)(`li`,
{
children:e
},
`donate`)
]
})
})
}var Mp=function(){
return Mp=Object.assign||function(e){
for(var t,
n=1,
r=arguments.length;
n<r;
n++)for(var i in t=arguments[
n
],
t)Object.prototype.hasOwnProperty.call(t,
i)&&(e[
i
]=t[
i
]);
return e
},
Mp.apply(this,
arguments)
};
function Np(e,
t){
var n={

};
for(var r in e)Object.prototype.hasOwnProperty.call(e,
r)&&t.indexOf(r)<0&&(n[
r
]=e[
r
]);
if(e!=null&&typeof Object.getOwnPropertySymbols==`function`)for(var i=0,
r=Object.getOwnPropertySymbols(e);
i<r.length;
i++)t.indexOf(r[
i
])<0&&Object.prototype.propertyIsEnumerable.call(e,
r[
i
])&&(n[
r[
i
]
]=e[
r[
i
]
]);
return n
}var Pp=``,
Fp=null,
Ip=null,
Lp=null;
function Rp(){
Pp=``,
Fp!==null&&Fp.disconnect(),
Ip!==null&&(window.clearTimeout(Ip),
Ip=null)
}function zp(e){
return[
`BUTTON`,
`INPUT`,
`SELECT`,
`TEXTAREA`
].includes(e.tagName)&&!e.hasAttribute(`disabled`)||[
`A`,
`AREA`
].includes(e.tagName)&&e.hasAttribute(`href`)
}function Bp(){
var e=null;
if(Pp===`#`)e=document.body;
else{
var t=Pp.replace(`#`,
``);
e=document.getElementById(t),
e===null&&Pp===`#top`&&(e=document.body)
}if(e!==null){
Lp(e);
var n=e.getAttribute(`tabindex`);
return n===null&&!zp(e)&&e.setAttribute(`tabindex`,
-1),
e.focus({
preventScroll:!0
}),
n===null&&!zp(e)&&(e.blur(),
e.removeAttribute(`tabindex`)),
Rp(),
!0
}return!1
}function Vp(e){
window.setTimeout(function(){
Bp()===!1&&(Fp===null&&(Fp=new MutationObserver(Bp)),
Fp.observe(document,
{
attributes:!0,
childList:!0,
subtree:!0
}),
Ip=window.setTimeout(function(){
Rp()
},
e||1e4))
},
0)
}function Hp(e){
return m.forwardRef(function(t,
n){
var r=``;
typeof t.to==`string`&&t.to.includes(`#`)?r=`#`+t.to.split(`#`).slice(1).join(`#`):typeof t.to==`object`&&typeof t.to.hash==`string`&&(r=t.to.hash);
var i={

};
e===up&&(i.isActive=function(e,
t){
return e&&e.isExact&&t.hash===r
});
function a(e){
Rp(),
Pp=t.elementId?`#`+t.elementId:r,
t.onClick&&t.onClick(e),
Pp!==``&&!e.defaultPrevented&&e.button===0&&(!t.target||t.target===`_self`)&&!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&(Lp=t.scroll||(function(e){
return t.smooth?e.scrollIntoView({
behavior:`smooth`
}):e.scrollIntoView()
}),
Vp(t.timeout))
}var o=Np(t,
[
`scroll`,
`smooth`,
`timeout`,
`elementId`
]);
return m.createElement(e,
Mp({

},
i,
o,
{
onClick:a,
ref:n
}),
t.children)
})
}var Up=Hp(lp);
Hp(up);
function Wp(){
return(0,
U.jsx)(`div`,
{
className:`fixed left-0 bottom-0 right-0 bg-black p-2 flex flex-col space-y-2`,
children:(0,
U.jsxs)(`div`,
{
className:`flex flex-row items-center space-x-2 max-h-14`,
children:[
(0,
U.jsxs)(`span`,
{
className:`whitespace-nowrap text-sm font-light text-white flex-grow`,
children:[
`Shadowdark Tools`,
(0,
U.jsx)(`br`,
{

}),
(0,
U.jsx)(`span`,
{
className:`whitespace-nowrap text-xs`,
children:(0,
U.jsx)(Up,
{
to:`/about#copyright`,
className:`underline hover:text-gray-400`,
children:`Copyright © 2023-2026.`
})
})
]
}),
(0,
U.jsxs)(`span`,
{
className:`grow block align-middle`,
children:[
(0,
U.jsx)(`div`,
{
className:`no-margin text-right text-white text-xs`,
children:(0,
U.jsx)(Up,
{
to:`/about#arcane-library-3rd-party-license`,
className:`underline hover:text-gray-400`,
children:`Shadowdark RPG Third-Party License Agreement`
})
}),
(0,
U.jsx)(`div`,
{
className:`no-margin text-right text-white text-xs`,
children:(0,
U.jsx)(Up,
{
to:`/privacy`,
className:`underline hover:text-gray-400`,
children:`Privacy Policy`
})
})
]
})
]
})
})
}function Gp(){
R.log(`=>> ErrorPage`);
let e=Zd();
console.error(`error`,
e);
let t={
...e
};
return R.log(`errorResponse: `,
t),
(0,
U.jsxs)(U.Fragment,
{
children:[
(0,
U.jsxs)(`div`,
{
className:`container mx-auto px-4 sm:px-6 md:px-8 lg:px-10`,
children:[
(0,
U.jsx)(`h1`,
{
className:`appTitleV2`,
children:`Shadowdark Tools`
}),
(0,
U.jsx)(`div`,
{
className:`font-face-montserrat-medium`,
children:(0,
U.jsx)(jp,
{

})
}),
(0,
U.jsxs)(`div`,
{
id:`error-page`,
children:[
(0,
U.jsx)(`h2`,
{
children:`Yep. That's a Natural 1. Sorry.`
}),
(0,
U.jsx)(`p`,
{
className:`mb-3 mt-6 body-text`,
children:`But seriously, an unexpected error has occurred. My apologies.`
}),
(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`h3`,
{
children:`Error Info`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Status:`
}),
` `,
t.status
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`StatusText:`
}),
` `,
t.statusText
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Data:`
}),
` `,
t.data
]
})
]
})
]
}),
(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`h3`,
{
children:`Please Let Me Know`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsx)(`li`,
{
children:`It would be super helpful if you could let me know this happened.`
}),
(0,
U.jsxs)(`li`,
{
children:[
`I can be reached on the `,
(0,
U.jsx)(`a`,
{
className:`underline hover:text-gray-400`,
target:`_blank`,
href:`https://discord.com/channels/558029475837902851/1082831426216534026`,
rel:`noreferrer`,
children:`Shadowdark Discord`
}),
`, where I am Cesidio.`
]
})
]
})
]
})
]
})
]
}),
(0,
U.jsx)(Wp,
{

}),
(0,
U.jsx)(`br`,
{

}),
(0,
U.jsx)(`br`,
{

}),
(0,
U.jsx)(`br`,
{

})
]
})
}function Kp(){
return(0,
U.jsxs)(`div`,
{
className:`tool-container border-gray-200 rounded-lg`,
children:[
(0,
U.jsx)(`h2`,
{
children:`In the future`
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`p`,
{
children:[
` `,
`Thoughts or ideas you'd like to share?`,
` `,
(0,
U.jsx)(Up,
{
to:`/about#contact-info`,
className:`underline hover:text-gray-400`,
children:`Contact Info`
})
]
}),
(0,
U.jsx)(`div`,
{
className:`flex`,
children:(0,
U.jsxs)(`div`,
{
className:`w-11/12 mr-2`,
children:[
(0,
U.jsx)(`p`,
{
children:(0,
U.jsx)(`b`,
{
children:`Planned Features`
})
}),
(0,
U.jsxs)(`ul`,
{
className:`body-text list-inside list-disc`,
children:[
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`NPC Generator: option to allow playable class NPCs, larger variety of backgrounds, jobs, etc.`
}),
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`Torch timer.`
})
]
}),
(0,
U.jsx)(`p`,
{
children:(0,
U.jsx)(`b`,
{
children:`Tinkering/Experimentation`
})
}),
(0,
U.jsx)(`ul`,
{
className:`body-text list-inside list-disc`,
children:(0,
U.jsx)(`li`,
{
children:`Monster Generator`
})
}),
(0,
U.jsx)(`p`,
{
children:(0,
U.jsx)(`b`,
{
children:`Ideas and Aspirations`
})
}),
(0,
U.jsxs)(`ul`,
{
className:`body-text list-inside list-disc`,
children:[
(0,
U.jsx)(`li`,
{
children:`Treasure Tables, Generator`
}),
(0,
U.jsx)(`li`,
{
children:`Overland and Settlement map planning tools`
})
]
})
]
})
})
]
})
}var qp=O,
$=se,
Jp=function(e){
return e.Index=`Index`,
e.Range=`Range`,
e
}(Jp||{

}),
Yp=JSON.parse(JSON.stringify({
name:`Tooltip Data`,
rulesSection:``,
description:``,
entries:[
{
name:`aura`,
category:`trait`,
tip:`Passive area of effect.`
},
{
name:`corrosive`,
category:`trait`,
tip:`Damages or destroys certain materials on contact.`
},
{
name:`dodge`,
category:`trait`,
tip:`An attack that would hit misses instead.`
},
{
name:`fearless`,
category:`trait`,
tip:`Immune to morale checks.`
},
{
name:`keen senses`,
category:`trait`,
tip:`Can't be surprised.`
},
{
name:`melt`,
category:`trait`,
tip:`Chance to melt touched metal objects.`
},
{
name:`pack hunter`,
category:`trait`,
tip:`Bonus damage when next to an ally.`
},
{
name:`rage`,
category:`trait`,
tip:`Immune to morale checks and bonus damage.`
},
{
name:`spell resistance`,
category:`trait`,
tip:`Increased DC when targeted by hostile spells.`
},
{
name:`stealthy`,
category:`trait`,
tip:`Advantage on checks to sneak and hide.`
},
{
name:`sunblind`,
category:`trait`,
tip:`Blinded in bright light.`
},
{
name:`surprise bonus`,
category:`trait`,
tip:`Increased damage against surprised targets.`
},
{
name:`telepathic`,
category:`trait`,
tip:`Can hear thoughts of nearby creatures and/or communicate telepathically.`
},
{
name:`poison`,
category:`attack`,
tip:`Dealing damage via poison/venom.`
},
{
name:`toxin`,
category:`attack`,
tip:`Generally make a DC to avoid an effect.`
},
{
name:`venom`,
category:`attack`,
tip:`Causing an effect via poison/venom.`
},
{
name:`priest spells`,
category:`magic-item-generator`,
tip:`Chance for items to be enchanted with priest spells.`
},
{
name:`item personality`,
category:`magic-item-generator`,
tip:`Chance for items to generate with personality traits.`
},
{
name:`funky scrolls`,
category:`magic-item-generator`,
tip:`Chance for scrolls to generate with benefits/curses in addition to their spell.`
},
{
name:`control`,
category:`spell-archetype`,
tip:`Compel, impede, or negatively impact an entity.`
},
{
name:`divination`,
category:`spell-archetype`,
tip:`Receive or discover information.`
},
{
name:`protection`,
category:`spell-archetype`,
tip:`Reduce or eliminate negative effects.`
},
{
name:`summoning`,
category:`spell-archetype`,
tip:`Create an object or entity.`
},
{
name:`support`,
category:`spell-archetype`,
tip:`Aid, augment, or increase effectiveness of self or an ally.`
},
{
name:`utility`,
category:`spell-archetype`,
tip:`Help accomplishing a task or activity.`
},
{
name:`aoe`,
category:`spell-tag`,
tip:`Area of effect.`
},
{
name:`buff`,
category:`spell-tag`,
tip:`Numerical increase or alteration of an attribute.`
},
{
name:`critical failure`,
category:`spell-tag`,
tip:`Increased chance of a critical failure.`
},
{
name:`death/dead/undead`,
category:`spell-tag`,
tip:`Creation, control, or protection from the undead.`
},
{
name:`penance`,
category:`spell-tag`,
tip:`Requires penance before reuse.`
},
{
name:`buff`,
category:`spell-tag`,
tip:`Numerical increase or alteration of an attribute.`
}
]
}),
(e,
t)=>e===`rollType`&&typeof t==`string`?Jp[
t
]:t),
Xp=class e{
static getTooltipByName(e){
return Yp.entries.find(t=>t.name===e.toLowerCase())||null
}static getTipByName(t){
let n=``,
r=e.getTooltipByName(t);
return r&&(n=r.tip),
n
}
};
function Zp(e){
let{
tipSearchTerm:t,
children:n,
toggleValue:r,
primary:i,
secondary:a,
subtle:o,
solo:s,
left:c,
center:l,
right:u,
lefttoright:d,
...f
}=e,
p=(0,
m.useRef)(null),
[
h,
g
]=(0,
m.useState)({

}),
_=(0,
ms.default)(f.className,
`font-face-montserrat-medium text-sm flex items-center px-3 relative group cursor-pointer`,
{
"mb-3 border border-black bg-black text-white":i,
"mb-3 border-2 border-black bg-white text-black":a,
"border hover:text-black hover:border-black":o,
"border-gray-500 text-black":r,
"border-gray-400 text-gray-400":!r,
"rounded-lg py-1.5":s,
"rounded-l-lg":c,
"":l,
"rounded-r-lg":u,
"rounded-lg":d
}),
v=r?(0,
U.jsx)(ec,
{

}):(0,
U.jsx)(nc,
{

}),
y=t,
b=Xp.getTipByName(y);
return(0,
m.useEffect)(()=>{
let e=()=>{
let e=p.current;
if(e){
e.style.visibility=`hidden`,
e.style.display=`block`;
let t=e.getBoundingClientRect(),
n=window.innerWidth,
r=`50%`,
i=`translateX(-50%)`;
t.left<0&&(r=`0`,
i=`translateX(0)`),
t.right>n&&(r=`100%`,
i=`translateX(-100%)`),
g({
left:r,
transform:i
}),
e.style.visibility=``,
e.style.display=``
}
};
e();
let t=()=>{
e()
};
return window.addEventListener(`resize`,
t),
()=>{
window.removeEventListener(`resize`,
t)
}
},
[

]),
(0,
m.useEffect)(()=>{
(()=>{
let e=p.current;
if(e){
e.style.visibility=`hidden`,
e.style.display=`block`;
let t=e.getBoundingClientRect(),
n=window.innerWidth,
r=`50%`,
i=`translateX(-50%)`,
a=`100px`;
switch(!0){
case b.length<=50:a=`150px`;
break;
case b.length>51&&b.length<=150:a=`200px`;
break;
case b.length>151&&b.length<=300:a=`250px`;
break;
default:break
}t.left<0&&(R.log(`rect.left [${t.left}] < 0`),
r=`0`,
i=`translateX(0)`),
t.right>n&&(R.log(`rect.right [${t.right}] > viewportWidth [${n}]`),
r=`100%`,
i=`translateX(-100%)`),
g({
left:r,
transform:i,
minWidth:a
}),
e.style.visibility=``,
e.style.display=``
}
})()
},
[
b
]),
(0,
U.jsxs)(`button`,
{
...f,
className:_,
children:[
v,
`\xA0`,
n,
b&&(0,
U.jsx)(`span`,
{
ref:p,
className:`break-words bottom-full mb-2 hidden group-hover:flex bg-gray-800 text-white text-xs rounded px-2 py-1`,
style:{
...h,
position:`absolute`
},
children:b
})
]
})
}function Qp(e){
return e.map(e=>(0,
U.jsx)(`option`,
{
value:e.value,
children:e.label
},
e.label))
}function $p(e,
t){
return(0,
ms.default)(t.className,
`flex items-center whitespace-nowrap px-3 rounded-l-lg cursor-pointer`,
{
"border border-black bg-black text-white":e.primary,
"border border-black bg-white text-black":e.secondary,
"border border-gray-400 text-gray-400 hover:text-black hover:border-black":e.subtle,
"py-1.5":e.taller
})
}function em(e,
t){
return(0,
ms.default)(t.className,
`text-lg flex items-center px-2 cursor-pointer`,
{
"w-14":e.centerSelectorSmall,
"w-28":e.centerSelectorMedium,
"w-40":e.centerSelectorLarge,
"w-60":e.centerSelectorXLarge,
border:e.primary,
"border border-black":e.secondary,
"border border-gray-400 text-gray-400 hover:text-black hover:border-black":e.subtle,
"py-1.5":e.taller
})
}function tm(e,
t){
return(0,
ms.default)(t.className,
`text-lg flex items-center rounded-r-lg px-2 cursor-pointer`,
{
"w-14":e.rightSelectorSmall,
"w-32":e.rightSelectorMedium,
"w-40":e.rightSelectorLarge,
"w-60":e.rightSelectorXLarge,
border:e.primary,
"border border-black":e.secondary,
"border border-gray-400 text-gray-400 hover:text-black":e.subtle,
"py-1.5":e.taller
})
}function nm(e){
let{
primaryButtonOptions:t,
subButtonOptions:n,
children:r,
...i
}=e,
a={
renderedOptions:null,
selectorClasses:$p(t.styleOptions,
i)
},
o=n.map((e,
t)=>{
let r=t===n.length-1?tm(e.styleOptions,
i):em(e.styleOptions,
i);
return{
renderedOptions:Qp(e.options),
selectorClasses:r
}
}).map((e,
t)=>(0,
U.jsx)(`select`,
{
value:n[
t
].selectedValue,
className:e.selectorClasses,
onChange:n[
t
].onSelectChange,
children:e.renderedOptions
},
t));
return(0,
U.jsxs)(`div`,
{
className:`flex flex-row flex-wrap`,
children:[
(0,
U.jsxs)(`button`,
{
...i,
className:a.selectorClasses,
children:[
t.buttonText,
r
]
}),
o
]
})
}var rm=class{
static async copyTextToClipboard(e){
try{
await navigator.clipboard.writeText(e),
R.log(`Copy successful!`)
}catch(e){
console.error(`Failed to copy text:`,
e)
}
}
},
im=function(e){
return e.Text=`text`,
e.Markdown=`markdown`,
e
}(im||{

}),
am=[
{
style:`text`,
template:`Name: \${name}
Ancestry: \${ancestry}
Job: \${job}
Age: \${age}
Alignment: \${alignment}
Wealth: \${wealth}
Appearance: \${appearance}
Behavior: \${behavior}
Secret: \${secret}
`
},
{
style:`markdown`,
template:`Name: \${name}
Ancestry: \${ancestry}
Job: \${job}
Age: \${age}
Alignment: \${alignment}
Wealth: \${wealth}
Appearance: \${appearance}
Behavior: \${behavior}
Secret: \${secret}
`
}
],
om=[
{
style:`text`,
template:`Name: \${name}
Ancestry: \${ancestry}
Job: \${job}
Age: \${age}
Alignment: \${alignment}
Wealth: \${wealth}
Appearance: \${appearance}
Behavior: \${behavior}
Secret: \${secret}
`
},
{
style:`markdown`,
template:`Name: \${name}
Ancestry: \${ancestry}
Job: \${job}
Age: \${age}
Alignment: \${alignment}
Wealth: \${wealth}
Appearance: \${appearance}
Behavior: \${behavior}
Secret: \${secret}
`
}
],
sm=[
{
style:`text`,
template:`Description:
- Appearance: \${appearance}
- Personality: \${personality}
`
},
{
style:`markdown`,
template:`Description:
- Appearance: \${appearance}
- Personality: \${personality}
`
}
],
cm=[
{
style:`text`,
template:"Sample Dialogue:\n${sampleDialogue.reduce((acc, sd) => acc + `- ${sd.tone}: ${sd.text}\n`, '')}"
},
{
style:`markdown`,
template:"Sample Dialogue:\n${sampleDialogue.reduce((acc, sd) => acc + `- ${sd.tone}: ${sd.text}\n`, '')}"
}
],
lm=[
{
style:`text`,
template:"Story Hooks:\n${npc.storyHooks?.storyHooks.map((sh) => `- Genre: ${sh.genre}\n- Hook: ${sh.hook}\n`)}"
},
{
style:`markdown`,
template:"Story Hooks:\n${npc.storyHooks?.storyHooks.map((sh) => `- Genre: ${sh.genre}\n- Hook: ${sh.hook}\n`)}"
}
],
um=[
{
style:`text`,
template:`Party Name: \${name}
Alignment: \${alignment}
Known For: \${knownFor}
Renown: \${renown}
Secret: \${secret}
Wealth: \${wealth}
Tactic: \${tactic}
Size: \${size}
`
},
{
style:`markdown`,
template:`Party Name: \${name}
Alignment: \${alignment}
Known For: \${knownFor}
Renown: \${renown}
Secret: \${secret}
Wealth: \${wealth}
Tactic: \${tactic}
Size: \${size}
`
}
],
dm=[
{
style:`text`,
template:"Members:\n${members.reduce((acc, m) => acc + `- ${m.name}: Lv.${m.level.toString()} ${m.ancestry} ${m.class}\n`, '')}"
},
{
style:`markdown`,
template:"Members:\n${members.reduce((acc, m) => acc + `- ${m.name}: Lv.${m.level} ${m.ancestry} ${m.class}\n`, '')}"
}
],
fm=[
{
style:`text`,
template:`Name: \${name}
Type: \${type}
Tier: \${tier}
Known for: \${knownFor}
Notable customer: \${customer}
`
},
{
style:`markdown`,
template:`Name: \${name}
Type: \${type}
Tier: \${tier}
Known for: \${knownFor}
Notable customer: \${customer}
`
}
],
pm=[
{
style:`text`,
template:`Name: \${name}
Tier: \${tier}
Known for: \${knownFor}
`
},
{
style:`markdown`,
template:`Name: \${name}
Tier: \${tier}
Known for: \${knownFor}
`
}
],
mm=[
{
style:`text`,
template:"Menu:\n${menu.reduce((acc, m) => acc + `- ${m}\n`, '')}"
},
{
style:`markdown`,
template:"Menu:\n${menu.reduce((acc, m) => acc + `- ${m}\n`, '')}"
}
],
hm=[
{
style:`text`,
template:"Drinks:\n${drinks.reduce((acc, d) => acc + `- ${d.name} (${d.cost}): ${d.effect}\n`, '')}"
},
{
style:`markdown`,
template:"Drinks:\n${drinks.reduce((acc, d) => acc + `- ${d.name} (${d.cost}): ${d.effect}\n`, '')}"
}
],
gm=[
{
style:`text`,
template:`Item: \${description}
`
},
{
style:`markdown`,
template:`Name: \${name}
Feature: \${feature}
`
}
],
_m=[
{
style:`text`,
template:"Benefits/Curses:\n${benefitsCursesList.reduce((acc, e) => acc + `- ${e.name}: ${e.description}\n`, '')}"
},
{
style:`markdown`,
template:"Menu:\n${menu.reduce((acc, m) => acc + `- ${m}\n`, '')}"
}
],
vm=[
{
style:`text`,
template:"Features:\n${featureList.reduce((acc, f) => acc + `- ${f.name}: ${f.description}\n`, '')}"
},
{
style:`markdown`,
template:"Menu:\n${menu.reduce((acc, m) => acc + `- ${m}\n`, '')}"
}
],
ym=[
{
style:`text`,
template:"Personality:\n${personalityList.reduce((acc, p) => acc + `- ${p.name}: ${p.description}\n`, '')}"
},
{
style:`markdown`,
template:"Menu:\n${menu.reduce((acc, m) => acc + `- ${m}\n`, '')}"
}
],
bm=class e{
static formatNpcBasic(e,
t=`text`){
let n=am.find(e=>e.style===t);
return n?(R.log(`template`,
n.template),
Function(...Object.keys(e),
`return \`${n.template}\`;`)(...Object.values(e))):(console.error(`EntityFormatter: failed to locate template for Npc`,
t),
``)
}static formatNpcAdvanced(t,
n=`text`){
let r=om.find(e=>e.style===n);
if(!r)return console.error(`EntityFormatter: failed to locate template for Npc Advanced`,
n),
``;
R.log(`template`,
r.template);
let i=Function(...Object.keys(t),
`return \`${r.template}\`;`)(...Object.values(t)),
a=``;
t.hasDescription&&t.description&&(a=e.formatNpcDescription(t.description,
n));
let o=``;
return t.hasStoryHooks&&t.storyHooks&&(o=e.formatNpcHooks(t.storyHooks,
n)),
`${i}${a}${o}`
}static formatNpcDescription(e,
t=`text`){
let n=sm.find(e=>e.style===t);
if(!n)return console.error(`EntityFormatter: failed to locate template for Npc Advanced Description`,
t),
``;
R.log(`template`,
n.template);
let r=Function(...Object.keys(e),
`return \`${n.template}\`;`)(...Object.values(e)),
i=cm.find(e=>e.style===t);
return i?(R.log(`template`,
i.template),
R.log(`description`,
e),
`${r}${Function(...Object.keys(e),`return \`${i.template}\`;`)(...Object.values(e))
}`):(console.error(`EntityFormatter: failed to locate template for Npc Advanced Dialogue`,t),``)}static formatNpcHooks(e,t=`text`){let n=lm.find(e=>e.style===t);if(!n)return console.error(`EntityFormatter: failed to locate template for Npc Advanced Description`,t),``;R.log(`template`,n.template);let r=Function(...Object.keys(e),`return \`${n.template}\`;`)(...Object.values(e)),
i=cm.find(e=>e.style===t);
return i?(R.log(`template`,
i.template),
R.log(`description`,
e),
`${r}${Function(...Object.keys(e),`return \`${i.template}\`;`)(...Object.values(e))
}`):(console.error(`EntityFormatter: failed to locate template for Npc Advanced Dialogue`,t),``)}static formatRivalCrawlers(e,t=`text`){let n=um.find(e=>e.style===t);if(!n)return console.error(`EntityFormatter: failed to locate template for Rival Crawlers Party`,t),``;R.log(`template`,n.template);let r=Function(...Object.keys(e),`return \`${n.template}\`;`)(...Object.values(e)),
i=dm.find(e=>e.style===t);
return i?(R.log(`template`,
i.template),
R.log(`rivals.members`,
e.members),
`${r}${Function(...Object.keys(e),`return \`${i.template}\`;`)(...Object.values(e))
}`):(console.error(`EntityFormatter: failed to locate template for Npc Advanced Dialogue`,t),``)}static formatShop(e,t=`text`){let n=fm.find(e=>e.style===t);return n?(R.log(`template`,n.template),Function(...Object.keys(e),`return \`${n.template}\`;`)(...Object.values(e))):(console.error(`EntityFormatter: failed to locate template for Shop`,
t),
``)
}static formatTavern(e,
t=`text`){
let n=pm.find(e=>e.style===t);
if(!n)return console.error(`EntityFormatter: failed to locate template for Npc Advanced`,
t),
``;
R.log(`template`,
n.template);
let r=Function(...Object.keys(e),
`return \`${n.template}\`;`)(...Object.values(e)),
i=mm.find(e=>e.style===t);
if(!i)return console.error(`EntityFormatter: failed to locate template for Npc Advanced`,
t),
``;
R.log(`template`,
i.template);
let a=Function(...Object.keys(e),
`return \`${i.template}\`;`)(...Object.values(e)),
o=hm.find(e=>e.style===t);
return o?(R.log(`template`,
o.template),
`${r}${a}${Function(...Object.keys(e),`return \`${o.template}\`;`)(...Object.values(e))
}`):(console.error(`EntityFormatter: failed to locate template for Npc Advanced`,t),``)}static formatMagicItem(e,t=`text`){let n=new Er(e).getDisplayType(),r=gm.find(e=>e.style===t);if(!r)return console.error(`EntityFormatter: failed to locate template for Magic Item Base`,t),``;R.log(`template`,r.template);let i=Function(...Object.keys(n),`return \`${r.template}\`;`)(...Object.values(n));
if(n.benefitsCursesList.length>0){
let e=_m.find(e=>e.style===t);
if(!e)return console.error(`EntityFormatter: failed to locate template for Magic Item Benefits/Curses`,
t),
``;
R.log(`template`,
e.template);
let r=Function(...Object.keys(n),
`return \`${e.template}\`;`)(...Object.values(n));
i+=r
}if(n.feature&&n.featureList.length===0&&(n.featureList=[
{
name:`Appearance`,
description:n.feature
},
...n.featureList
]),
n.featureList.length>0){
let e=vm.find(e=>e.style===t);
if(!e)return console.error(`EntityFormatter: failed to locate template for Magic Item Features`,
t),
``;
R.log(`template`,
e.template);
let r=Function(...Object.keys(n),
`return \`${e.template}\`;`)(...Object.values(n));
i+=r
}if(n.personalityList.length>0){
let e=ym.find(e=>e.style===t);
if(!e)return console.error(`EntityFormatter: failed to locate template for Magic Item Personality`,
t),
``;
R.log(`template`,
e.template);
let r=Function(...Object.keys(n),
`return \`${e.template}\`;`)(...Object.values(n));
i+=r
}return i
}
};
function xm(e,
t,
n,
r,
i,
a,
o){
R.log(`renderSelectorButton: name: ${n.name}; isSelected: ${i}`);
let s=(0,
ms.default)(o.className,
`font-face-montserrat-medium justify-center items-center px-4 py-1.5 border rounded-tl-lg rounded-tr-lg`,
{
"border-black bg-black text-white":i,
"border-gray bg-white text-black hover:text-black":!i,
"rounded-tl-lg":!1,
"":a===`CENTER`,
"rounded-tr-lg":!1,
"rounded-tl-lg rounded-tr-lg":a===`ONLY`
});
return(0,
U.jsx)(hs,
{
id:`${e}-${t}`,
toggleValue:i,
className:s,
toggleOffIcon:G.getCheckboxChecked(),
toggleOffText:n.name,
toggleOnIcon:G.getCheckboxUnchecked(),
toggleOnText:n.name,
onClick:(e=>r(e,
n.index,
n.id)),
...o,
children:(0,
U.jsx)(U.Fragment,
{

})
})
}function Sm(e){
let{
itemName:t,
itemId:n,
functionButtonOptions:r,
selectedButtonIndex:i,
onSelectorClick:a,
...o
}=e;
return R.log(`ENTERING ButtonSelectorSet`),
(0,
U.jsx)(`div`,
{
className:`flex flex-row justify-left items-center`,
children:r.map((e,
s)=>{
let c=`ONLY`;
if(r.length>1)switch(s){
case 0:c=`LEFT`;
break;
case r.length-1:c=`RIGHT`;
break;
default:c=`CENTER`;
break
}return xm(t,
n,
e,
a,
i===s,
c,
o)
})
})
}function Cm(e){
return e.map((e,
t)=>({
id:e.id,
index:t,
name:e.name,
accessibility:e.accessibility
}))
}function wm(e){
let{
id:t,
key:n,
name:r,
heading:i,
subheading:a,
tabs:o,
selectedTabIndex:s
}=e,
c=Cm(o),
[
l,
u
]=(0,
m.useState)(s);
return(0,
m.useEffect)(()=>{
u(()=>0)
},
[
o
]),
(0,
m.useEffect)(()=>{
l>=o.length&&u(0)
},
[
l,
o
]),
(0,
U.jsxs)(`div`,
{
id:t,
className:`grow text-center bg-white rounded-lg border border-gray-400 p-2`,
children:[
(0,
U.jsx)(`h3`,
{
children:i
}),
(0,
U.jsx)(`h4`,
{
children:a
}),
(0,
U.jsx)(Sm,
{
itemId:t,
itemName:r,
functionButtonOptions:c,
selectedButtonIndex:l,
onSelectorClick:(e,
t,
n)=>{
R.log(`selectorClick: selectorIndex = [${t}]; selectorId = [${n}]`),
u(t)
}
}),
(0,
U.jsx)(`div`,
{
className:`p-4 border rounded-bl-lg rounded-br-lg border-black`,
children:o[
l
].content
})
]
},
n)
}var Tm=0,
Em={
name:`_setpin`,
propertyName:``,
isFixed:!0,
isSetPin:!0
};
function Dm(e,
t){
let n=[
...e
];
return t>=0?n.splice(t,
0,
Em):t===-1&&n.push(Em),
n
}function Om(e,
t){
function n(e){
return(0,
ms.default)(`font-semibold! px-2`,
{
"table-cell border-b-2 border-black":e.isFixed,
"hidden md:table-cell md:border-b-2 md:border-black":!e.isFixed
})
}function r(e){
return e.isSetPin||e.isRemovePin?(0,
U.jsx)(U.Fragment,
{
children:`\xA0`
}):(0,
U.jsx)(U.Fragment,
{
children:e.name
})
}let i=t.map((t,
i)=>{
let a=`${e}-header-cell-${t.name}-${i}`;
return(0,
U.jsx)(`div`,
{
className:n(t),
children:r(t)
},
a)
});
return(0,
U.jsx)(`div`,
{
id:`${e}-table-header-group`,
className:`table-header-group`,
children:(0,
U.jsx)(`div`,
{
id:`${e}-table-header-group-table-row`,
className:`table-row`,
children:i
})
})
}function km(e,
t,
n,
r,
i,
a){
R.log(`GmPinnableTable: getRenderedRows: tableId = ${e}`);
function o(e){
return(0,
ms.default)(`table-row cursor-pointer h-4`,
{
"bg-gray-300":e,
"hover:bg-gray-100":!e
})
}function s(e){
return(0,
ms.default)(`border-b-2 border-black py-2 pr-2`,
{
"table-cell":e.isFixed,
"hidden md:table-cell":!e.isFixed,
"text-sm":e.smallerText
})
}function c(e,
t,
n,
r){
return(0,
U.jsx)(`div`,
{
id:e,
className:s(t),
children:(0,
U.jsx)(hs,
{
toggleValue:n.isPinned,
center:!0,
iconOnly:!0,
toggleOnIcon:G.getPinPinnedIcon(),
toggleOffIcon:G.getPinUnpinnedIcon(),
onClick:(e=>a(e,
r,
!n.isPinned,
n.data.id)),
children:(0,
U.jsx)(U.Fragment,
{

})
})
},
e)
}function l(e,
t,
n){
return(0,
U.jsx)(`div`,
{
id:e,
className:s(t),
children:n.data[
t.propertyName
]
},
e)
}return(0,
U.jsx)(U.Fragment,
{
children:n.map((n,
a)=>{
let s=`${e}-table-row-${a}`;
return(0,
U.jsx)(`div`,
{
id:s,
className:o(r==a),
onClick:e=>i(e,
a,
n.data.id),
children:t.map((e,
t)=>{
let r=`${s}-table-cell-${t}`;
return e.isSetPin?c(r,
e,
n,
a):l(r,
e,
n)
})
},
s)
})
})
}function Am(e){
let{
id:t,
title:n,
columns:r,
rowData:i,
pinnedRowData:a,
selectedItemId:o
}=e,
[
s,
c
]=(0,
m.useState)(o||null);
R.log(`GmPinnableTable: selectedRowItemId = ${s}`),
e.setPinColumn===void 0&&(e.setPinColumn=Tm);
let l=(t,
n,
r)=>{
e.handleRowClick(t,
n,
r),
c(r)
},
u=Dm(r,
e.setPinColumn),
d=i.map(e=>({
isPinned:!1,
data:e
})).sort((e,
t)=>e.data.name.localeCompare(t.data.name));
a&&(d=[
...a.map(e=>({
isPinned:!0,
data:e
})).sort((e,
t)=>e.data.name.localeCompare(t.data.name)),
...d
]);
let f=d.findIndex(e=>e.data.id===s);
R.log(`combinedRows: `,
d),
R.log(`GmPinnableTable: selectedRowItemId = ${s}`),
R.log(`GmPinnableTable: dynamicSelectedRow = ${f}`);
let p=Om(t,
u),
h=km(t,
u,
d,
f,
l,
e.handlePinClick);
return(0,
U.jsxs)(`div`,
{
id:t,
className:`flex-col w-full pt-4`,
children:[
(0,
U.jsx)(`div`,
{
className:`w-full bg-gray-300 p-1 text-center`,
children:n
}),
(0,
U.jsxs)(`div`,
{
id:`${t}-table`,
className:`table table-auto w-full overflow-x-auto`,
children:[
p,
h
]
})
]
})
}var jm=JSON.parse(JSON.stringify({
adventuregeneratora:{
name:`Adventure Generator A`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d29`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Acquire the`
},
{
minRange:0,
maxRange:0,
name:`Banish the`
},
{
minRange:0,
maxRange:0,
name:`Cleanse the`
},
{
minRange:0,
maxRange:0,
name:`Deliver the`
},
{
minRange:0,
maxRange:0,
name:`Destroy the`
},
{
minRange:0,
maxRange:0,
name:`Discover the`
},
{
minRange:0,
maxRange:0,
name:`Eliminate the`
},
{
minRange:0,
maxRange:0,
name:`Escape the`
},
{
minRange:0,
maxRange:0,
name:`Escort the`
},
{
minRange:0,
maxRange:0,
name:`Explore the`
},
{
minRange:0,
maxRange:0,
name:`Find the`
},
{
minRange:0,
maxRange:0,
name:`Free the`
},
{
minRange:0,
maxRange:0,
name:`Hunt down the`
},
{
minRange:0,
maxRange:0,
name:`Investigate the`
},
{
minRange:0,
maxRange:0,
name:`Locate the`
},
{
minRange:0,
maxRange:0,
name:`Overcome the`
},
{
minRange:0,
maxRange:0,
name:`Protect the`
},
{
minRange:0,
maxRange:0,
name:`Raid the`
},
{
minRange:0,
maxRange:0,
name:`Recover the`
},
{
minRange:0,
maxRange:0,
name:`Rescue the`
},
{
minRange:0,
maxRange:0,
name:`Restore the`
},
{
minRange:0,
maxRange:0,
name:`Retrieve the`
},
{
minRange:0,
maxRange:0,
name:`Solve the`
},
{
minRange:0,
maxRange:0,
name:`Steal the`
},
{
minRange:0,
maxRange:0,
name:`Survive the`
},
{
minRange:0,
maxRange:0,
name:`Uncover the`
},
{
minRange:0,
maxRange:0,
name:`Unearth the`
},
{
minRange:0,
maxRange:0,
name:`Unravel the`
},
{
minRange:0,
maxRange:0,
name:`Vanquish the`
}
]
},
adventuregeneratorb:{
name:`Adventure Generator B`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d40`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Artifact`
},
{
minRange:0,
maxRange:0,
name:`Secret`
},
{
minRange:0,
maxRange:0,
name:`Demon`
},
{
minRange:0,
maxRange:0,
name:`Relic`
},
{
minRange:0,
maxRange:0,
name:`Murders`
},
{
minRange:0,
maxRange:0,
name:`Spellbook`
},
{
minRange:0,
maxRange:0,
name:`Heir`
},
{
minRange:0,
maxRange:0,
name:`Tainted Well`
},
{
minRange:0,
maxRange:0,
name:`Scroll`
},
{
minRange:0,
maxRange:0,
name:`Beast`
},
{
minRange:0,
maxRange:0,
name:`Deadly Maze`
},
{
minRange:0,
maxRange:0,
name:`Puzzle`
},
{
minRange:0,
maxRange:0,
name:`Balance`
},
{
minRange:0,
maxRange:0,
name:`curse`
},
{
minRange:0,
maxRange:0,
name:`Sacred Relic`
},
{
minRange:0,
maxRange:0,
name:`Disappearance`
},
{
minRange:0,
maxRange:0,
name:`Sorcerer`
},
{
minRange:0,
maxRange:0,
name:`Stolen Amulet`
},
{
minRange:0,
maxRange:0,
name:`Lost Tomb`
},
{
minRange:0,
maxRange:0,
name:`Trial`
},
{
minRange:0,
maxRange:0,
name:`Chalice`
},
{
minRange:0,
maxRange:0,
name:`Damsel`
},
{
minRange:0,
maxRange:0,
name:`Orb`
},
{
minRange:0,
maxRange:0,
name:`Treasure`
},
{
minRange:0,
maxRange:0,
name:`Specter`
},
{
minRange:0,
maxRange:0,
name:`Idol`
},
{
minRange:0,
maxRange:0,
name:`Mysterious Plague`
},
{
minRange:0,
maxRange:0,
name:`Sacred Grove`
},
{
minRange:0,
maxRange:0,
name:`Cursed Relic`
},
{
minRange:0,
maxRange:0,
name:`Elixir`
},
{
minRange:0,
maxRange:0,
name:`Werewolf`
},
{
minRange:0,
maxRange:0,
name:`Deadly Ritual`
},
{
minRange:0,
maxRange:0,
name:`Mystery`
},
{
minRange:0,
maxRange:0,
name:`Broken Seal`
},
{
minRange:0,
maxRange:0,
name:`Essence`
},
{
minRange:0,
maxRange:0,
name:`Obsidian Tower`
},
{
minRange:0,
maxRange:0,
name:`Shadow Lord`
},
{
minRange:0,
maxRange:0,
name:`Cursed Dagger`
},
{
minRange:0,
maxRange:0,
name:`Forgotten Grimoire`
},
{
minRange:0,
maxRange:0,
name:`Trial`
}
]
},
adventuregeneratorc:{
name:`Adventure Generator C`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d40`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`from the Forbidden Temple`
},
{
minRange:0,
maxRange:0,
name:`within the Ancient Ruins`
},
{
minRange:0,
maxRange:0,
name:`Lurking in the Haunted Forest`
},
{
minRange:0,
maxRange:0,
name:`from the Treacherous Noble's Mansion`
},
{
minRange:0,
maxRange:0,
name:`in the Cursed Village`
},
{
minRange:0,
maxRange:0,
name:`Hidden in the Cursed Graveyard`
},
{
minRange:0,
maxRange:0,
name:`from the Vengeful Spirits`
},
{
minRange:0,
maxRange:0,
name:`in the Desolate Swamps`
},
{
minRange:0,
maxRange:0,
name:`to the Mysterious Sorcerer`
},
{
minRange:0,
maxRange:0,
name:`Roaming the Dark Mountains`
},
{
minRange:0,
maxRange:0,
name:`of the Enchanted Labyrinth`
},
{
minRange:0,
maxRange:0,
name:`of the Ancient Obelisk`
},
{
minRange:0,
maxRange:0,
name:`Between Rival Vampire Clans`
},
{
minRange:0,
maxRange:0,
name:`Binding a Cursed Family Bloodline`
},
{
minRange:0,
maxRange:0,
name:`from the Forbidden Monastery`
},
{
minRange:0,
maxRange:0,
name:`of a Prominent Figure in the City`
},
{
minRange:0,
maxRange:0,
name:`Ruling over a Cursed Village`
},
{
minRange:0,
maxRange:0,
name:`from the Treacherous Thieves' Guild`
},
{
minRange:0,
maxRange:0,
name:`of an Ancient Necromancer`
},
{
minRange:0,
maxRange:0,
name:`of the Mystical Enchanted Forest`
},
{
minRange:0,
maxRange:0,
name:`in the Forbidden Catacombs`
},
{
minRange:0,
maxRange:0,
name:`from the Clutches of a Powerful Warlock`
},
{
minRange:0,
maxRange:0,
name:`Hidden in the Cursed Castle's Tower`
},
{
minRange:0,
maxRange:0,
name:`Within the Sunken Shipwreck`
},
{
minRange:0,
maxRange:0,
name:`Haunting the Ancient Manor`
},
{
minRange:0,
maxRange:0,
name:`from the Heavily Guarded Temple`
},
{
minRange:0,
maxRange:0,
name:`Sweeping Across the Land`
},
{
minRange:0,
maxRange:0,
name:`from a Dark Druid's Corruption`
},
{
minRange:0,
maxRange:0,
name:`Infesting a Cursed Village`
},
{
minRange:0,
maxRange:0,
name:`to Save a Dying Monarch`
},
{
minRange:0,
maxRange:0,
name:`Terrorizing a Small Village`
},
{
minRange:0,
maxRange:0,
name:`of a Powerful Coven of Witches`
},
{
minRange:0,
maxRange:0,
name:`of the Vanishing Children`
},
{
minRange:0,
maxRange:0,
name:`to Prevent an Ancient Evil's Return`
},
{
minRange:0,
maxRange:0,
name:`from a Mythical Creature Deep in the Enchanted Forest`
},
{
minRange:0,
maxRange:0,
name:`that Appeared Overnight`
},
{
minRange:0,
maxRange:0,
name:`Ruling over a Realm of Darkness`
},
{
minRange:0,
maxRange:0,
name:`from the Heart of a Cursed Maze`
},
{
minRange:0,
maxRange:0,
name:`of a Long-lost Sorcerer`
},
{
minRange:0,
maxRange:0,
name:`of the Treacherous Volcano's Summit`
}
]
}
}),
(e,
t)=>e===`rollType`&&typeof t==`string`?Jp[
t
]:t),
Mm=JSON.parse(JSON.stringify({
adventuresitenamea:{
name:`Adventure Site Name A`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d41`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Abbey of the`
},
{
minRange:0,
maxRange:0,
name:`Abyss of the`
},
{
minRange:0,
maxRange:0,
name:`Bastion of the`
},
{
minRange:0,
maxRange:0,
name:`Castle of the`
},
{
minRange:0,
maxRange:0,
name:`Catacombs of the`
},
{
minRange:0,
maxRange:0,
name:`Cathedral of the`
},
{
minRange:0,
maxRange:0,
name:`Caverns of the`
},
{
minRange:0,
maxRange:0,
name:`Caves of the`
},
{
minRange:0,
maxRange:0,
name:`Chapel of the`
},
{
minRange:0,
maxRange:0,
name:`Chasm of the`
},
{
minRange:0,
maxRange:0,
name:`Citadel of the`
},
{
minRange:0,
maxRange:0,
name:`City of the`
},
{
minRange:0,
maxRange:0,
name:`Cove of the`
},
{
minRange:0,
maxRange:0,
name:`Crypts of the`
},
{
minRange:0,
maxRange:0,
name:`Dunes of the`
},
{
minRange:0,
maxRange:0,
name:`Dungeon of the`
},
{
minRange:0,
maxRange:0,
name:`Enclave of the`
},
{
minRange:0,
maxRange:0,
name:`Forest of the`
},
{
minRange:0,
maxRange:0,
name:`Grove of the`
},
{
minRange:0,
maxRange:0,
name:`Hills of the`
},
{
minRange:0,
maxRange:0,
name:`Hollows of the`
},
{
minRange:0,
maxRange:0,
name:`Hut of the`
},
{
minRange:0,
maxRange:0,
name:`Island of the`
},
{
minRange:0,
maxRange:0,
name:`Isles of the`
},
{
minRange:0,
maxRange:0,
name:`Labyrinth of the`
},
{
minRange:0,
maxRange:0,
name:`Manor of the`
},
{
minRange:0,
maxRange:0,
name:`Marsh of the`
},
{
minRange:0,
maxRange:0,
name:`Mines of the`
},
{
minRange:0,
maxRange:0,
name:`Mountain of the`
},
{
minRange:0,
maxRange:0,
name:`Oasis of the`
},
{
minRange:0,
maxRange:0,
name:`Prison of the`
},
{
minRange:0,
maxRange:0,
name:`Ruins of the`
},
{
minRange:0,
maxRange:0,
name:`Sanctuary of the`
},
{
minRange:0,
maxRange:0,
name:`Swamp of the`
},
{
minRange:0,
maxRange:0,
name:`Temple of the`
},
{
minRange:0,
maxRange:0,
name:`Tower of the`
},
{
minRange:0,
maxRange:0,
name:`Town of the`
},
{
minRange:0,
maxRange:0,
name:`Vale of the`
},
{
minRange:0,
maxRange:0,
name:`Valley of the`
},
{
minRange:0,
maxRange:0,
name:`Village of the`
},
{
minRange:0,
maxRange:0,
name:`Wastes of the`
}
]
},
adventuresitenameb:{
name:`Adventure Site Name B`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d41`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Bent`
},
{
minRange:0,
maxRange:0,
name:`Blackened`
},
{
minRange:0,
maxRange:0,
name:`Blind`
},
{
minRange:0,
maxRange:0,
name:`Broken`
},
{
minRange:0,
maxRange:0,
name:`Crazed`
},
{
minRange:0,
maxRange:0,
name:`Crooked`
},
{
minRange:0,
maxRange:0,
name:`Cursed`
},
{
minRange:0,
maxRange:0,
name:`Damned`
},
{
minRange:0,
maxRange:0,
name:`Dark`
},
{
minRange:0,
maxRange:0,
name:`Darkened`
},
{
minRange:0,
maxRange:0,
name:`Desolate`
},
{
minRange:0,
maxRange:0,
name:`Devouring`
},
{
minRange:0,
maxRange:0,
name:`Dread`
},
{
minRange:0,
maxRange:0,
name:`Dreaded`
},
{
minRange:0,
maxRange:0,
name:`Echoing`
},
{
minRange:0,
maxRange:0,
name:`Eerie`
},
{
minRange:0,
maxRange:0,
name:`Enchanted`
},
{
minRange:0,
maxRange:0,
name:`Enigmatic`
},
{
minRange:0,
maxRange:0,
name:`Enlightened`
},
{
minRange:0,
maxRange:0,
name:`Eternal`
},
{
minRange:0,
maxRange:0,
name:`Fallen`
},
{
minRange:0,
maxRange:0,
name:`Forgotten`
},
{
minRange:0,
maxRange:0,
name:`Forlorn`
},
{
minRange:0,
maxRange:0,
name:`Grasping`
},
{
minRange:0,
maxRange:0,
name:`Haunted`
},
{
minRange:0,
maxRange:0,
name:`Hidden`
},
{
minRange:0,
maxRange:0,
name:`Isolated`
},
{
minRange:0,
maxRange:0,
name:`Obsidian`
},
{
minRange:0,
maxRange:0,
name:`Shadow`
},
{
minRange:0,
maxRange:0,
name:`Shadowed`
},
{
minRange:0,
maxRange:0,
name:`Shattered`
},
{
minRange:0,
maxRange:0,
name:`Shrouded`
},
{
minRange:0,
maxRange:0,
name:`Silent`
},
{
minRange:0,
maxRange:0,
name:`Sinister`
},
{
minRange:0,
maxRange:0,
name:`Spectral`
},
{
minRange:0,
maxRange:0,
name:`Suffocating`
},
{
minRange:0,
maxRange:0,
name:`Thirsting`
},
{
minRange:0,
maxRange:0,
name:`Veiled`
},
{
minRange:0,
maxRange:0,
name:`Wailing`
},
{
minRange:0,
maxRange:0,
name:`Weeping`
},
{
minRange:0,
maxRange:0,
name:`Whispering`
}
]
},
adventuresitenamec:{
name:`Adventure Site Name C`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d41`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Abyss`
},
{
minRange:0,
maxRange:0,
name:`Arcana`
},
{
minRange:0,
maxRange:0,
name:`Beasts`
},
{
minRange:0,
maxRange:0,
name:`Bloodmoon`
},
{
minRange:0,
maxRange:0,
name:`Chains`
},
{
minRange:0,
maxRange:0,
name:`Cult`
},
{
minRange:0,
maxRange:0,
name:`Darkness`
},
{
minRange:0,
maxRange:0,
name:`Death`
},
{
minRange:0,
maxRange:0,
name:`Desolation`
},
{
minRange:0,
maxRange:0,
name:`Destiny`
},
{
minRange:0,
maxRange:0,
name:`Doom`
},
{
minRange:0,
maxRange:0,
name:`Empire`
},
{
minRange:0,
maxRange:0,
name:`Gods`
},
{
minRange:0,
maxRange:0,
name:`Hope`
},
{
minRange:0,
maxRange:0,
name:`Illusions`
},
{
minRange:0,
maxRange:0,
name:`Inquisition`
},
{
minRange:0,
maxRange:0,
name:`Kings`
},
{
minRange:0,
maxRange:0,
name:`Labyrinth`
},
{
minRange:0,
maxRange:0,
name:`Madness`
},
{
minRange:0,
maxRange:0,
name:`Magus`
},
{
minRange:0,
maxRange:0,
name:`Mist`
},
{
minRange:0,
maxRange:0,
name:`Mists`
},
{
minRange:0,
maxRange:0,
name:`Nightmares`
},
{
minRange:0,
maxRange:0,
name:`Priest`
},
{
minRange:0,
maxRange:0,
name:`Sands`
},
{
minRange:0,
maxRange:0,
name:`Shadows`
},
{
minRange:0,
maxRange:0,
name:`Sorcery`
},
{
minRange:0,
maxRange:0,
name:`Sorrow`
},
{
minRange:0,
maxRange:0,
name:`Sorrows`
},
{
minRange:0,
maxRange:0,
name:`Soul`
},
{
minRange:0,
maxRange:0,
name:`Souls`
},
{
minRange:0,
maxRange:0,
name:`Specters`
},
{
minRange:0,
maxRange:0,
name:`Spirits`
},
{
minRange:0,
maxRange:0,
name:`Tomb`
},
{
minRange:0,
maxRange:0,
name:`Torment`
},
{
minRange:0,
maxRange:0,
name:`Veil`
},
{
minRange:0,
maxRange:0,
name:`Wail`
},
{
minRange:0,
maxRange:0,
name:`Whispers`
},
{
minRange:0,
maxRange:0,
name:`Witch`
},
{
minRange:0,
maxRange:0,
name:`Wizard`
},
{
minRange:0,
maxRange:0,
name:`Wraiths`
}
]
}
}),
(e,
t)=>e===`rollType`&&typeof t==`string`?Jp[
t
]:t),
Nm=s({
default:()=>Bm,
dwarf:()=>Pm,
elf:()=>Fm,
goblin:()=>Im,
halfling:()=>Lm,
halforc:()=>Rm,
human:()=>zm
}),
Pm={
name:`NPC Names By Ancestry - Dwarf`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d40`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Agran`
},
{
minRange:0,
maxRange:0,
name:`Alkina`
},
{
minRange:0,
maxRange:0,
name:`Alrik`
},
{
minRange:0,
maxRange:0,
name:`Astrid`
},
{
minRange:0,
maxRange:0,
name:`Bagan`
},
{
minRange:0,
maxRange:0,
name:`Berfina`
},
{
minRange:0,
maxRange:0,
name:`Borin`
},
{
minRange:0,
maxRange:0,
name:`Bothor`
},
{
minRange:0,
maxRange:0,
name:`Dalir`
},
{
minRange:0,
maxRange:0,
name:`Dorgin`
},
{
minRange:0,
maxRange:0,
name:`Dudda`
},
{
minRange:0,
maxRange:0,
name:`Durak`
},
{
minRange:0,
maxRange:0,
name:`Dvalin`
},
{
minRange:0,
maxRange:0,
name:`Elrig`
},
{
minRange:0,
maxRange:0,
name:`Erika`
},
{
minRange:0,
maxRange:0,
name:`Famir`
},
{
minRange:0,
maxRange:0,
name:`Fimlun`
},
{
minRange:0,
maxRange:0,
name:`Garton`
},
{
minRange:0,
maxRange:0,
name:`Gilda`
},
{
minRange:0,
maxRange:0,
name:`Glaran`
},
{
minRange:0,
maxRange:0,
name:`Grommir`
},
{
minRange:0,
maxRange:0,
name:`Gundar`
},
{
minRange:0,
maxRange:0,
name:`Habur`
},
{
minRange:0,
maxRange:0,
name:`Hakkrag`
},
{
minRange:0,
maxRange:0,
name:`Hardin`
},
{
minRange:0,
maxRange:0,
name:`Helga`
},
{
minRange:0,
maxRange:0,
name:`Ingrid`
},
{
minRange:0,
maxRange:0,
name:`Malvon`
},
{
minRange:0,
maxRange:0,
name:`Margon`
},
{
minRange:0,
maxRange:0,
name:`Nokri`
},
{
minRange:0,
maxRange:0,
name:`Olftar`
},
{
minRange:0,
maxRange:0,
name:`Orik`
},
{
minRange:0,
maxRange:0,
name:`Orin`
},
{
minRange:0,
maxRange:0,
name:`Rengwen`
},
{
minRange:0,
maxRange:0,
name:`Sigrid`
},
{
minRange:0,
maxRange:0,
name:`Sissa`
},
{
minRange:0,
maxRange:0,
name:`Skorin`
},
{
minRange:0,
maxRange:0,
name:`Thovir`
},
{
minRange:0,
maxRange:0,
name:`Ulfar`
},
{
minRange:0,
maxRange:0,
name:`Zarnin`
}
]
},
Fm={
name:`NPC Names By Ancestry - Elf`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d40`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Aeris`
},
{
minRange:0,
maxRange:0,
name:`Aesinladril`
},
{
minRange:0,
maxRange:0,
name:`Ailmon`
},
{
minRange:0,
maxRange:0,
name:`Amendil`
},
{
minRange:0,
maxRange:0,
name:`Aralyn`
},
{
minRange:0,
maxRange:0,
name:`Avanya`
},
{
minRange:0,
maxRange:0,
name:`Caethbaire`
},
{
minRange:0,
maxRange:0,
name:`Caladwen`
},
{
minRange:0,
maxRange:0,
name:`Celtaen`
},
{
minRange:0,
maxRange:0,
name:`Elara`
},
{
minRange:0,
maxRange:0,
name:`Elowen`
},
{
minRange:0,
maxRange:0,
name:`Elysia`
},
{
minRange:0,
maxRange:0,
name:`Emnil`
},
{
minRange:0,
maxRange:0,
name:`Evelanor`
},
{
minRange:0,
maxRange:0,
name:`Farleth`
},
{
minRange:0,
maxRange:0,
name:`Farnan`
},
{
minRange:0,
maxRange:0,
name:`Galanor`
},
{
minRange:0,
maxRange:0,
name:`Galfindir`
},
{
minRange:0,
maxRange:0,
name:`Gloringwe`
},
{
minRange:0,
maxRange:0,
name:`Idsebrin`
},
{
minRange:0,
maxRange:0,
name:`Lalmor`
},
{
minRange:0,
maxRange:0,
name:`Lessa`
},
{
minRange:0,
maxRange:0,
name:`Limdrel`
},
{
minRange:0,
maxRange:0,
name:`Lothfornal`
},
{
minRange:0,
maxRange:0,
name:`Lyra`
},
{
minRange:0,
maxRange:0,
name:`Merabet`
},
{
minRange:0,
maxRange:0,
name:`Mesmor`
},
{
minRange:0,
maxRange:0,
name:`Morthil`
},
{
minRange:0,
maxRange:0,
name:`Narielle`
},
{
minRange:0,
maxRange:0,
name:`Narien`
},
{
minRange:0,
maxRange:0,
name:`Nenlaer`
},
{
minRange:0,
maxRange:0,
name:`Sidelwyn`
},
{
minRange:0,
maxRange:0,
name:`Thalara`
},
{
minRange:0,
maxRange:0,
name:`Thalorin`
},
{
minRange:0,
maxRange:0,
name:`Thelian`
},
{
minRange:0,
maxRange:0,
name:`Valkana`
},
{
minRange:0,
maxRange:0,
name:`Vladi`
},
{
minRange:0,
maxRange:0,
name:`Yalanna`
},
{
minRange:0,
maxRange:0,
name:`Ystranel`
},
{
minRange:0,
maxRange:0,
name:`Yvsoanel`
}
]
},
Im={
name:`NPC Names By Ancestry - Goblin`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d40`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Aggy`
},
{
minRange:0,
maxRange:0,
name:`Bilik`
},
{
minRange:0,
maxRange:0,
name:`Bodger`
},
{
minRange:0,
maxRange:0,
name:`Bolck`
},
{
minRange:0,
maxRange:0,
name:`Dorg`
},
{
minRange:0,
maxRange:0,
name:`Garbo`
},
{
minRange:0,
maxRange:0,
name:`Gobslag`
},
{
minRange:0,
maxRange:0,
name:`Grabbul`
},
{
minRange:0,
maxRange:0,
name:`Gred`
},
{
minRange:0,
maxRange:0,
name:`Grimgob`
},
{
minRange:0,
maxRange:0,
name:`Gript`
},
{
minRange:0,
maxRange:0,
name:`Hobb`
},
{
minRange:0,
maxRange:0,
name:`Janda`
},
{
minRange:0,
maxRange:0,
name:`Kada`
},
{
minRange:0,
maxRange:0,
name:`Kanju`
},
{
minRange:0,
maxRange:0,
name:`Klog`
},
{
minRange:0,
maxRange:0,
name:`Koruk`
},
{
minRange:0,
maxRange:0,
name:`Kruna`
},
{
minRange:0,
maxRange:0,
name:`Lotho`
},
{
minRange:0,
maxRange:0,
name:`Marik`
},
{
minRange:0,
maxRange:0,
name:`Milx`
},
{
minRange:0,
maxRange:0,
name:`Mizner`
},
{
minRange:0,
maxRange:0,
name:`Nagg`
},
{
minRange:0,
maxRange:0,
name:`Nath`
},
{
minRange:0,
maxRange:0,
name:`Nool`
},
{
minRange:0,
maxRange:0,
name:`Nurdle`
},
{
minRange:0,
maxRange:0,
name:`Petra`
},
{
minRange:0,
maxRange:0,
name:`Quarsh`
},
{
minRange:0,
maxRange:0,
name:`Ragnot`
},
{
minRange:0,
maxRange:0,
name:`Ragnuk`
},
{
minRange:0,
maxRange:0,
name:`Rikkle`
},
{
minRange:0,
maxRange:0,
name:`Rork`
},
{
minRange:0,
maxRange:0,
name:`Sardik`
},
{
minRange:0,
maxRange:0,
name:`Skabbug`
},
{
minRange:0,
maxRange:0,
name:`Sniggle`
},
{
minRange:0,
maxRange:0,
name:`Snik`
},
{
minRange:0,
maxRange:0,
name:`Snitz`
},
{
minRange:0,
maxRange:0,
name:`Tankur`
},
{
minRange:0,
maxRange:0,
name:`Yurz`
},
{
minRange:0,
maxRange:0,
name:`Zogrot`
}
]
},
Lm={
name:`NPC Names By Ancestry - Halfling`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d40`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Adelard`
},
{
minRange:0,
maxRange:0,
name:`Aldo`
},
{
minRange:0,
maxRange:0,
name:`Alice`
},
{
minRange:0,
maxRange:0,
name:`Bogo`
},
{
minRange:0,
maxRange:0,
name:`Bramble`
},
{
minRange:0,
maxRange:0,
name:`Brand`
},
{
minRange:0,
maxRange:0,
name:`Brogin`
},
{
minRange:0,
maxRange:0,
name:`Croop`
},
{
minRange:0,
maxRange:0,
name:`Daisy`
},
{
minRange:0,
maxRange:0,
name:`Erling`
},
{
minRange:0,
maxRange:0,
name:`Eustis`
},
{
minRange:0,
maxRange:0,
name:`Falceena`
},
{
minRange:0,
maxRange:0,
name:`Flicker`
},
{
minRange:0,
maxRange:0,
name:`Flicker`
},
{
minRange:0,
maxRange:0,
name:`Fula`
},
{
minRange:0,
maxRange:0,
name:`Goldi`
},
{
minRange:0,
maxRange:0,
name:`Gonin`
},
{
minRange:0,
maxRange:0,
name:`Grizelda`
},
{
minRange:0,
maxRange:0,
name:`Hamfast`
},
{
minRange:0,
maxRange:0,
name:`Jac`
},
{
minRange:0,
maxRange:0,
name:`Jasper`
},
{
minRange:0,
maxRange:0,
name:`Klara`
},
{
minRange:0,
maxRange:0,
name:`Lilera`
},
{
minRange:0,
maxRange:0,
name:`Lindo`
},
{
minRange:0,
maxRange:0,
name:`Linus`
},
{
minRange:0,
maxRange:0,
name:`Lobbel`
},
{
minRange:0,
maxRange:0,
name:`Lucia`
},
{
minRange:0,
maxRange:0,
name:`Lundin`
},
{
minRange:0,
maxRange:0,
name:`Mayera`
},
{
minRange:0,
maxRange:0,
name:`Milo`
},
{
minRange:0,
maxRange:0,
name:`Neddly`
},
{
minRange:0,
maxRange:0,
name:`Nob`
},
{
minRange:0,
maxRange:0,
name:`Nudge`
},
{
minRange:0,
maxRange:0,
name:`Petal`
},
{
minRange:0,
maxRange:0,
name:`Poppy`
},
{
minRange:0,
maxRange:0,
name:`Ripwick`
},
{
minRange:0,
maxRange:0,
name:`Tilly`
},
{
minRange:0,
maxRange:0,
name:`Wilbur`
},
{
minRange:0,
maxRange:0,
name:`Wisp`
},
{
minRange:0,
maxRange:0,
name:`Wold`
}
]
},
Rm={
name:`NPC Names By Ancestry - Half-Orc`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d40`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Abneg`
},
{
minRange:0,
maxRange:0,
name:`Adorg`
},
{
minRange:0,
maxRange:0,
name:`Bagnath`
},
{
minRange:0,
maxRange:0,
name:`Borgak`
},
{
minRange:0,
maxRange:0,
name:`Brugak`
},
{
minRange:0,
maxRange:0,
name:`Draga`
},
{
minRange:0,
maxRange:0,
name:`Drakt`
},
{
minRange:0,
maxRange:0,
name:`Drok`
},
{
minRange:0,
maxRange:0,
name:`Ganorth`
},
{
minRange:0,
maxRange:0,
name:`Gorath`
},
{
minRange:0,
maxRange:0,
name:`Grolg`
},
{
minRange:0,
maxRange:0,
name:`Gruknak`
},
{
minRange:0,
maxRange:0,
name:`Grulk`
},
{
minRange:0,
maxRange:0,
name:`Grusk`
},
{
minRange:0,
maxRange:0,
name:`Gruul`
},
{
minRange:0,
maxRange:0,
name:`Hask`
},
{
minRange:0,
maxRange:0,
name:`Hugruk`
},
{
minRange:0,
maxRange:0,
name:`Kagar`
},
{
minRange:0,
maxRange:0,
name:`Korduk`
},
{
minRange:0,
maxRange:0,
name:`Kraggar`
},
{
minRange:0,
maxRange:0,
name:`Maktir`
},
{
minRange:0,
maxRange:0,
name:`Migrath`
},
{
minRange:0,
maxRange:0,
name:`Mogat`
},
{
minRange:0,
maxRange:0,
name:`Noki`
},
{
minRange:0,
maxRange:0,
name:`Ogreth`
},
{
minRange:0,
maxRange:0,
name:`Oppuk`
},
{
minRange:0,
maxRange:0,
name:`Rawuti`
},
{
minRange:0,
maxRange:0,
name:`Sagnah`
},
{
minRange:0,
maxRange:0,
name:`Shurz`
},
{
minRange:0,
maxRange:0,
name:`Sugark`
},
{
minRange:0,
maxRange:0,
name:`Thraug`
},
{
minRange:0,
maxRange:0,
name:`Thrax`
},
{
minRange:0,
maxRange:0,
name:`Throk`
},
{
minRange:0,
maxRange:0,
name:`Thuzor`
},
{
minRange:0,
maxRange:0,
name:`Tokash`
},
{
minRange:0,
maxRange:0,
name:`Uraz`
},
{
minRange:0,
maxRange:0,
name:`Urdish`
},
{
minRange:0,
maxRange:0,
name:`Ushgal`
},
{
minRange:0,
maxRange:0,
name:`Zagrum`
},
{
minRange:0,
maxRange:0,
name:`Zoren`
}
]
},
zm={
name:`NPC Names By Ancestry - Human`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d40`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Aldric`
},
{
minRange:0,
maxRange:0,
name:`Amata`
},
{
minRange:0,
maxRange:0,
name:`Anton`
},
{
minRange:0,
maxRange:0,
name:`Artur`
},
{
minRange:0,
maxRange:0,
name:`Barros`
},
{
minRange:0,
maxRange:0,
name:`Belgni`
},
{
minRange:0,
maxRange:0,
name:`Caelan`
},
{
minRange:0,
maxRange:0,
name:`Cedric`
},
{
minRange:0,
maxRange:0,
name:`Erika`
},
{
minRange:0,
maxRange:0,
name:`Ermina`
},
{
minRange:0,
maxRange:0,
name:`Ernst`
},
{
minRange:0,
maxRange:0,
name:`Fador`
},
{
minRange:0,
maxRange:0,
name:`Fosten`
},
{
minRange:0,
maxRange:0,
name:`Gregor`
},
{
minRange:0,
maxRange:0,
name:`Grim`
},
{
minRange:0,
maxRange:0,
name:`Hadwin`
},
{
minRange:0,
maxRange:0,
name:`Helena`
},
{
minRange:0,
maxRange:0,
name:`Isabella`
},
{
minRange:0,
maxRange:0,
name:`Isolde`
},
{
minRange:0,
maxRange:0,
name:`Jodokus`
},
{
minRange:0,
maxRange:0,
name:`Jorg`
},
{
minRange:0,
maxRange:0,
name:`Lanwin`
},
{
minRange:0,
maxRange:0,
name:`Larue`
},
{
minRange:0,
maxRange:0,
name:`Leona`
},
{
minRange:0,
maxRange:0,
name:`Leopold`
},
{
minRange:0,
maxRange:0,
name:`Lex`
},
{
minRange:0,
maxRange:0,
name:`Linora`
},
{
minRange:0,
maxRange:0,
name:`Lorelay`
},
{
minRange:0,
maxRange:0,
name:`Magnus`
},
{
minRange:0,
maxRange:0,
name:`Marget`
},
{
minRange:0,
maxRange:0,
name:`Mathias`
},
{
minRange:0,
maxRange:0,
name:`Maximus`
},
{
minRange:0,
maxRange:0,
name:`Percival`
},
{
minRange:0,
maxRange:0,
name:`Ralf`
},
{
minRange:0,
maxRange:0,
name:`Rosalind`
},
{
minRange:0,
maxRange:0,
name:`Rowan`
},
{
minRange:0,
maxRange:0,
name:`Seraphina`
},
{
minRange:0,
maxRange:0,
name:`Tilea`
},
{
minRange:0,
maxRange:0,
name:`Ulfred`
},
{
minRange:0,
maxRange:0,
name:`Valerian`
}
]
},
Bm={
dwarf:Pm,
elf:Fm,
goblin:Im,
halfling:Lm,
halforc:Rm,
human:zm
},
Vm=Nm,
Hm=s({
default:()=>qm,
prefix:()=>Um,
suffix:()=>Km,
syllable2:()=>Wm,
syllable3:()=>Gm
}),
Um={
name:`Names By Syllable`,
rulesSection:`Original Content`,
description:``,
dieType:`d21`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:-1,
maxRange:-1,
name:`Me`
},
{
minRange:-1,
maxRange:-1,
name:`Olf`
},
{
minRange:-1,
maxRange:-1,
name:`Crum`
},
{
minRange:-1,
maxRange:-1,
name:`Hal`
},
{
minRange:-1,
maxRange:-1,
name:`An`
},
{
minRange:-1,
maxRange:-1,
name:`Cas`
},
{
minRange:-1,
maxRange:-1,
name:`And`
},
{
minRange:-1,
maxRange:-1,
name:`Mar`
},
{
minRange:-1,
maxRange:-1,
name:`The`
},
{
minRange:-1,
maxRange:-1,
name:`Od`
},
{
minRange:-1,
maxRange:-1,
name:`Bel`
},
{
minRange:-1,
maxRange:-1,
name:`Lith`
},
{
minRange:-1,
maxRange:-1,
name:`Ro`
},
{
minRange:-1,
maxRange:-1,
name:`Far`
},
{
minRange:-1,
maxRange:-1,
name:`Heth`
},
{
minRange:-1,
maxRange:-1,
name:`To`
},
{
minRange:-1,
maxRange:-1,
name:`Me`
},
{
minRange:-1,
maxRange:-1,
name:`Krag`
},
{
minRange:-1,
maxRange:-1,
name:`Fa`
},
{
minRange:-1,
maxRange:-1,
name:`Meth`
},
{
minRange:-1,
maxRange:-1,
name:`Er`
}
]
},
Wm={
name:`Names By Syllable`,
rulesSection:`Original Content`,
description:``,
dieType:`d21`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:-1,
maxRange:-1,
name:`tha`
},
{
minRange:-1,
maxRange:-1,
name:`bor`
},
{
minRange:-1,
maxRange:-1,
name:`pel`
},
{
minRange:-1,
maxRange:-1,
name:`e`
},
{
minRange:-1,
maxRange:-1,
name:`the`
},
{
minRange:-1,
maxRange:-1,
name:`i`
},
{
minRange:-1,
maxRange:-1,
name:`na`
},
{
minRange:-1,
maxRange:-1,
name:`gre`
},
{
minRange:-1,
maxRange:-1,
name:`o`
},
{
minRange:-1,
maxRange:-1,
name:`ri`
},
{
minRange:-1,
maxRange:-1,
name:`a`
},
{
minRange:-1,
maxRange:-1,
name:`as`
},
{
minRange:-1,
maxRange:-1,
name:`sa`
},
{
minRange:-1,
maxRange:-1,
name:`lor`
},
{
minRange:-1,
maxRange:-1,
name:`an`
},
{
minRange:-1,
maxRange:-1,
name:`rell`
},
{
minRange:-1,
maxRange:-1,
name:`tha`
},
{
minRange:-1,
maxRange:-1,
name:`drin`
},
{
minRange:-1,
maxRange:-1,
name:`ra`
},
{
minRange:-1,
maxRange:-1,
name:`so`
},
{
minRange:-1,
maxRange:-1,
name:`kin`
}
]
},
Gm={
name:`Names By Syllable`,
rulesSection:`Original Content`,
description:``,
dieType:`d21`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:-1,
maxRange:-1,
name:`m`
},
{
minRange:-1,
maxRange:-1,
name:`d`
},
{
minRange:-1,
maxRange:-1,
name:`la`
},
{
minRange:-1,
maxRange:-1,
name:`tha`
},
{
minRange:-1,
maxRange:-1,
name:`a`
},
{
minRange:-1,
maxRange:-1,
name:`s`
},
{
minRange:-1,
maxRange:-1,
name:`il`
},
{
minRange:-1,
maxRange:-1,
name:`ta`
},
{
minRange:-1,
maxRange:-1,
name:`der`
},
{
minRange:-1,
maxRange:-1,
name:`ell`
},
{
minRange:-1,
maxRange:-1,
name:`dor`
},
{
minRange:-1,
maxRange:-1,
name:`iv`
},
{
minRange:-1,
maxRange:-1,
name:`lin`
},
{
minRange:-1,
maxRange:-1,
name:`k`
},
{
minRange:-1,
maxRange:-1,
name:`r`
},
{
minRange:-1,
maxRange:-1,
name:`i`
},
{
minRange:-1,
maxRange:-1,
name:`dot`
},
{
minRange:-1,
maxRange:-1,
name:`ell`
},
{
minRange:-1,
maxRange:-1,
name:`gel`
},
{
minRange:-1,
maxRange:-1,
name:`le`
},
{
minRange:-1,
maxRange:-1,
name:`bran`
}
]
},
Km={
name:`Names By Syllable`,
rulesSection:`Original Content`,
description:``,
dieType:`d21`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:-1,
maxRange:-1,
name:`nel`
},
{
minRange:-1,
maxRange:-1,
name:`zil`
},
{
minRange:-1,
maxRange:-1,
name:`son`
},
{
minRange:-1,
maxRange:-1,
name:`styn`
},
{
minRange:-1,
maxRange:-1,
name:`mar`
},
{
minRange:-1,
maxRange:-1,
name:`tir`
},
{
minRange:-1,
maxRange:-1,
name:`mir`
},
{
minRange:-1,
maxRange:-1,
name:`te`
},
{
minRange:-1,
maxRange:-1,
name:`ic`
},
{
minRange:-1,
maxRange:-1,
name:`a`
},
{
minRange:-1,
maxRange:-1,
name:`in`
},
{
minRange:-1,
maxRange:-1,
name:`thwe`
},
{
minRange:-1,
maxRange:-1,
name:`da`
},
{
minRange:-1,
maxRange:-1,
name:`wyth`
},
{
minRange:-1,
maxRange:-1,
name:`dril`
},
{
minRange:-1,
maxRange:-1,
name:`on`
},
{
minRange:-1,
maxRange:-1,
name:`nel`
},
{
minRange:-1,
maxRange:-1,
name:`dt`
},
{
minRange:-1,
maxRange:-1,
name:`la`
},
{
minRange:-1,
maxRange:-1,
name:`ann`
},
{
minRange:-1,
maxRange:-1,
name:`dt`
}
]
},
qm={
prefix:Um,
syllable2:Wm,
syllable3:Gm,
suffix:Km
},
Jm=Hm,
Ym=s({
damage:()=>Zm,
default:()=>$m,
movement:()=>Xm,
weaken:()=>Qm
}),
Xm={
name:`Hazards - Movement`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d13`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Chasm`
},
{
minRange:0,
maxRange:0,
name:`Collapsing Floor`
},
{
minRange:0,
maxRange:0,
name:`Dimensional Portals`
},
{
minRange:0,
maxRange:0,
name:`Frozen Ground`
},
{
minRange:0,
maxRange:0,
name:`Grasping Thorns`
},
{
minRange:0,
maxRange:0,
name:`Illusory Bridges`
},
{
minRange:0,
maxRange:0,
name:`Maze-like Corridors`
},
{
minRange:0,
maxRange:0,
name:`Paralyzing Field`
},
{
minRange:0,
maxRange:0,
name:`Shifting Sands`
},
{
minRange:0,
maxRange:0,
name:`Sinking Platforms`
},
{
minRange:0,
maxRange:0,
name:`Slippery Moss`
},
{
minRange:0,
maxRange:0,
name:`Swirling Winds`
},
{
minRange:0,
maxRange:0,
name:`Tangled Roots`
}
]
},
Zm={
name:`Hazards - Damage`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d13`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Corrosive Mist`
},
{
minRange:0,
maxRange:0,
name:`Crushing Rocks`
},
{
minRange:0,
maxRange:0,
name:`Electric Arcs`
},
{
minRange:0,
maxRange:0,
name:`Explosive Charges`
},
{
minRange:0,
maxRange:0,
name:`Falling Boulders`
},
{
minRange:0,
maxRange:0,
name:`Fire Traps`
},
{
minRange:0,
maxRange:0,
name:`Flaming Arrows`
},
{
minRange:0,
maxRange:0,
name:`Necrotic Energies`
},
{
minRange:0,
maxRange:0,
name:`Poisonous Miasma`
},
{
minRange:0,
maxRange:0,
name:`Scorching Ground`
},
{
minRange:0,
maxRange:0,
name:`Spiked Walls`
},
{
minRange:0,
maxRange:0,
name:`Toxic Fumes`
},
{
minRange:0,
maxRange:0,
name:`Whirling Blades`
}
]
},
Qm={
name:`Hazards - Weaken`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d13`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Choking Fumes`
},
{
minRange:0,
maxRange:0,
name:`Crushing Rocks`
},
{
minRange:0,
maxRange:0,
name:`Cursed Fog`
},
{
minRange:0,
maxRange:0,
name:`Disorienting Lights`
},
{
minRange:0,
maxRange:0,
name:`Enfeebling Mist`
},
{
minRange:0,
maxRange:0,
name:`Explosive Charges`
},
{
minRange:0,
maxRange:0,
name:`Falling Boulders`
},
{
minRange:0,
maxRange:0,
name:`Hallucinogenic Spores`
},
{
minRange:0,
maxRange:0,
name:`Necrotic Energies`
},
{
minRange:0,
maxRange:0,
name:`Sandstorm`
},
{
minRange:0,
maxRange:0,
name:`Sensory Distortion`
},
{
minRange:0,
maxRange:0,
name:`Silence Zone`
},
{
minRange:0,
maxRange:0,
name:`Suffocating Dust`
}
]
},
$m={
movement:Xm,
damage:Zm,
weaken:Qm
},
eh=Ym,
th={
magicitemtype:{
name:`Magic Item Type`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d6`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Armor`
},
{
minRange:0,
maxRange:0,
name:`Weapon`
},
{
minRange:0,
maxRange:0,
name:`Potion`
},
{
minRange:0,
maxRange:0,
name:`Scroll`
},
{
minRange:0,
maxRange:0,
name:`Wand`
},
{
minRange:0,
maxRange:0,
name:`Utility`
}
]
},
benefitquantity:{
name:`Magic Item Benefits`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`2d6`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:2,
maxRange:3,
name:`0`
},
{
minRange:4,
maxRange:7,
name:`1`
},
{
minRange:8,
maxRange:11,
name:`1`
},
{
minRange:12,
maxRange:12,
name:`2`
}
]
},
cursequantity:{
name:`Magic Item Curses`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`2d6`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:2,
maxRange:7,
name:`1`
},
{
minRange:8,
maxRange:12,
name:`0`
}
]
},
virtuequantity:{
name:`Magic Item Virtues`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`2d6`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:2,
maxRange:9,
name:`0`
},
{
minRange:10,
maxRange:12,
name:`1`
}
]
},
flawquantity:{
name:`Magic Item Flaws`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`2d6`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:2,
maxRange:3,
name:`1`
},
{
minRange:4,
maxRange:9,
name:`0`
},
{
minRange:10,
maxRange:11,
name:`1`
},
{
minRange:12,
maxRange:12,
name:`0`
}
]
},
alignment:{
name:`Personality Alignment`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d3`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Lawful`
},
{
minRange:0,
maxRange:0,
name:`Neutral`
},
{
minRange:0,
maxRange:0,
name:`Chaotic`
}
]
},
armortype:{
name:`Armor Type`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d10`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Leather`
},
{
minRange:0,
maxRange:0,
name:`Leather`
},
{
minRange:0,
maxRange:0,
name:`Leather`
},
{
minRange:0,
maxRange:0,
name:`Leather`
},
{
minRange:0,
maxRange:0,
name:`Chainmail`
},
{
minRange:0,
maxRange:0,
name:`Chainmail`
},
{
minRange:0,
maxRange:0,
name:`Shield`
},
{
minRange:0,
maxRange:0,
name:`Shield`
},
{
minRange:0,
maxRange:0,
name:`Plate mail`
},
{
minRange:0,
maxRange:0,
name:`Plate mail`
}
]
},
armorbonus:{
name:`Armor Bonus`,
rulesSection:``,
description:``,
dieType:`2d6`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:2,
maxRange:5,
name:`+0`
},
{
minRange:6,
maxRange:8,
name:`+1`
},
{
minRange:9,
maxRange:11,
name:`+2`
},
{
minRange:12,
maxRange:12,
name:`+3`
}
]
},
armorfeature:{
name:`Armor Feature`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d25`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Rune-covered`
},
{
minRange:0,
maxRange:0,
name:`Gilded Edges`
},
{
minRange:0,
maxRange:0,
name:`Bone Spikes`
},
{
minRange:0,
maxRange:0,
name:`Living Vines`
},
{
minRange:0,
maxRange:0,
name:`Elven Filigree`
},
{
minRange:0,
maxRange:0,
name:`Hallowed Symbols`
},
{
minRange:0,
maxRange:0,
name:`Chain-wrapped`
},
{
minRange:0,
maxRange:0,
name:`Smokey`
},
{
minRange:0,
maxRange:0,
name:`Fiery Embers`
},
{
minRange:0,
maxRange:0,
name:`Moonlit Reflections`
},
{
minRange:0,
maxRange:0,
name:`Insect Carapace`
},
{
minRange:0,
maxRange:0,
name:`Embeded with Ruined Relics`
},
{
minRange:0,
maxRange:0,
name:`Rusty Iron`
},
{
minRange:0,
maxRange:0,
name:`Stormforged`
},
{
minRange:0,
maxRange:0,
name:`Shadowy Aura`
},
{
minRange:0,
maxRange:0,
name:`Serpent Scales`
},
{
minRange:0,
maxRange:0,
name:`Hides of many beasts`
},
{
minRange:0,
maxRange:0,
name:`Covered in Feywild Blossoms`
},
{
minRange:0,
maxRange:0,
name:`Crystaline Facets`
},
{
minRange:0,
maxRange:0,
name:`Beastial Face`
},
{
minRange:0,
maxRange:0,
name:`Ebon Plating`
},
{
minRange:0,
maxRange:0,
name:`Flameborn`
},
{
minRange:0,
maxRange:0,
name:`Bloodstone Inlays`
},
{
minRange:0,
maxRange:0,
name:`Whirlwind Engravings`
},
{
minRange:0,
maxRange:0,
name:`Moving Carvings`
}
]
},
potioncontainer:{
name:`Potion Container`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d14`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Sturdy glass bottle`
},
{
minRange:0,
maxRange:0,
name:`Gleaming metalic flask`
},
{
minRange:0,
maxRange:0,
name:`Etched glass vial`
},
{
minRange:0,
maxRange:0,
name:`Leather-wrapped flask`
},
{
minRange:0,
maxRange:0,
name:`Iridescent glass tube`
},
{
minRange:0,
maxRange:0,
name:`Crystal-clear flask`
},
{
minRange:0,
maxRange:0,
name:`Reinforced glass bottle`
},
{
minRange:0,
maxRange:0,
name:`Slender elongated vial`
},
{
minRange:0,
maxRange:0,
name:`Clear glass orb`
},
{
minRange:0,
maxRange:0,
name:`Darkened glass`
},
{
minRange:0,
maxRange:0,
name:`Etched obsidian flask`
},
{
minRange:0,
maxRange:0,
name:`Engraved silver vial`
},
{
minRange:0,
maxRange:0,
name:`Small stone vial`
},
{
minRange:0,
maxRange:0,
name:`Sleek obsidian vial`
}
]
},
potionliquid:{
name:`Potion Liquid`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d14`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Translucent green hues`
},
{
minRange:0,
maxRange:0,
name:`Shimmering silver`
},
{
minRange:0,
maxRange:0,
name:`Mist-like w/ glowing energy`
},
{
minRange:0,
maxRange:0,
name:`Rich crimson w/ gold flakes`
},
{
minRange:0,
maxRange:0,
name:`Sparkles gold`
},
{
minRange:0,
maxRange:0,
name:`Ripples/distorts light`
},
{
minRange:0,
maxRange:0,
name:`Soft blue glow`
},
{
minRange:0,
maxRange:0,
name:`Vigorously flowing liquid`
},
{
minRange:0,
maxRange:0,
name:`Glowing silver particles`
},
{
minRange:0,
maxRange:0,
name:`Starry night sky`
},
{
minRange:0,
maxRange:0,
name:`Dark storm cloud`
},
{
minRange:0,
maxRange:0,
name:`Glistens like crushed gems`
},
{
minRange:0,
maxRange:0,
name:`Cascading colors`
},
{
minRange:0,
maxRange:0,
name:`Unnaturally still`
}
]
},
potiontastesmell:{
name:`Potion Smells/Tastes`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d14`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Charred wood`
},
{
minRange:0,
maxRange:0,
name:`Metallic tang`
},
{
minRange:0,
maxRange:0,
name:`Ancient books`
},
{
minRange:0,
maxRange:0,
name:`Tangy citrus-like`
},
{
minRange:0,
maxRange:0,
name:`Fresh rain/flowers`
},
{
minRange:0,
maxRange:0,
name:`Crisp/clean`
},
{
minRange:0,
maxRange:0,
name:`Fresh herbs`
},
{
minRange:0,
maxRange:0,
name:`Lemon zest`
},
{
minRange:0,
maxRange:0,
name:`Gentle spring breeze`
},
{
minRange:0,
maxRange:0,
name:`Cinnamon/nutmeg`
},
{
minRange:0,
maxRange:0,
name:`Bitter/acrid`
},
{
minRange:0,
maxRange:0,
name:`Berries/herbal tea`
},
{
minRange:0,
maxRange:0,
name:`Tingling spices`
},
{
minRange:0,
maxRange:0,
name:`Lavender/chamomile`
}
]
},
utilityitemtype:{
name:`Utility Item Type`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d24`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Amulet`
},
{
minRange:0,
maxRange:0,
name:`Book`
},
{
minRange:0,
maxRange:0,
name:`Boots`
},
{
minRange:0,
maxRange:0,
name:`Bracelet`
},
{
minRange:0,
maxRange:0,
name:`Bracers`
},
{
minRange:0,
maxRange:0,
name:`Breeches`
},
{
minRange:0,
maxRange:0,
name:`Chalice`
},
{
minRange:0,
maxRange:0,
name:`Cloak`
},
{
minRange:0,
maxRange:0,
name:`Earring`
},
{
minRange:0,
maxRange:0,
name:`Figurine`
},
{
minRange:0,
maxRange:0,
name:`Gauntlets`
},
{
minRange:0,
maxRange:0,
name:`Gem`
},
{
minRange:0,
maxRange:0,
name:`Gloves`
},
{
minRange:0,
maxRange:0,
name:`Helm`
},
{
minRange:0,
maxRange:0,
name:`Horn`
},
{
minRange:0,
maxRange:0,
name:`Necklace`
},
{
minRange:0,
maxRange:0,
name:`Orb`
},
{
minRange:0,
maxRange:0,
name:`Pipes`
},
{
minRange:0,
maxRange:0,
name:`Quill`
},
{
minRange:0,
maxRange:0,
name:`Ring`
},
{
minRange:0,
maxRange:0,
name:`Robes`
},
{
minRange:0,
maxRange:0,
name:`Talisman`
},
{
minRange:0,
maxRange:0,
name:`Tunic`
},
{
minRange:0,
maxRange:0,
name:`Vial`
}
]
},
utilityitemfeature:{
name:`Utility Item Feature`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d44`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Adorned with delicate frost patterns`
},
{
minRange:0,
maxRange:0,
name:`Adorned with eldritch symbols`
},
{
minRange:0,
maxRange:0,
name:`Bound with ethereal chains`
},
{
minRange:0,
maxRange:0,
name:`Carved from petrified wood`
},
{
minRange:0,
maxRange:0,
name:`Celestial Rune Engravings`
},
{
minRange:0,
maxRange:0,
name:`Cracked and weathered surface`
},
{
minRange:0,
maxRange:0,
name:`Crimson Bloodstone Accents`
},
{
minRange:0,
maxRange:0,
name:`Embossed with draconic scales`
},
{
minRange:0,
maxRange:0,
name:`Encrusted with mermaid scales`
},
{
minRange:0,
maxRange:0,
name:`Encrusted with vibrant, iridescent feathers`
},
{
minRange:0,
maxRange:0,
name:`Engraved with ancient runes`
},
{
minRange:0,
maxRange:0,
name:`Enveloped in swirling mist`
},
{
minRange:0,
maxRange:0,
name:`Etched with celestial constellations`
},
{
minRange:0,
maxRange:0,
name:`Ethereal lacework`
},
{
minRange:0,
maxRange:0,
name:`Exotic feathered trim`
},
{
minRange:0,
maxRange:0,
name:`Flecked with shimmering crystal`
},
{
minRange:0,
maxRange:0,
name:`Forged from celestial silver`
},
{
minRange:0,
maxRange:0,
name:`Gilded with molten gold`
},
{
minRange:0,
maxRange:0,
name:`Gleaming silver filigree`
},
{
minRange:0,
maxRange:0,
name:`Gleaming with inner fire`
},
{
minRange:0,
maxRange:0,
name:`Glimmering with captured starlight`
},
{
minRange:0,
maxRange:0,
name:`Glinting with jagged shards of ice`
},
{
minRange:0,
maxRange:0,
name:`Glowing moonstone embellishments`
},
{
minRange:0,
maxRange:0,
name:`Hinged with skeletal fingers`
},
{
minRange:0,
maxRange:0,
name:`Icy shard adornments`
},
{
minRange:0,
maxRange:0,
name:`Inlaid with glowing amber`
},
{
minRange:0,
maxRange:0,
name:`Inlaid with shimmering opals`
},
{
minRange:0,
maxRange:0,
name:`Inscribed with enigmatic glyphs`
},
{
minRange:0,
maxRange:0,
name:`Luminescent star patterns`
},
{
minRange:0,
maxRange:0,
name:`Lustrous opal inlays`
},
{
minRange:0,
maxRange:0,
name:`Polished obsidian surface`
},
{
minRange:0,
maxRange:0,
name:`Pulsating veins of arcane energy`
},
{
minRange:0,
maxRange:0,
name:`Serpent skin wrapping`
},
{
minRange:0,
maxRange:0,
name:`Shrouded in wisps of ghostly essence`
},
{
minRange:0,
maxRange:0,
name:`Studded with dark obsidian spikes`
},
{
minRange:0,
maxRange:0,
name:`Swirling with elemental energy`
},
{
minRange:0,
maxRange:0,
name:`Tinged with a faint, eerie glow`
},
{
minRange:0,
maxRange:0,
name:`Twisted and contorted shape`
},
{
minRange:0,
maxRange:0,
name:`Veiled in shadowy aura`
},
{
minRange:0,
maxRange:0,
name:`Veins of pulsating lava`
},
{
minRange:0,
maxRange:0,
name:`Whirling elemental essence`
},
{
minRange:0,
maxRange:0,
name:`Woven with enchanted vines`
},
{
minRange:0,
maxRange:0,
name:`Wrapped in tattered, ethereal fabric`
},
{
minRange:0,
maxRange:0,
name:`Wrapped in thorny vines`
}
]
},
scrollwandbenefittable:{
name:`Scroll/Wand Benefit Table`,
rulesSection:``,
description:``,
dieType:`2d6`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:2,
maxRange:6,
name:`armorbenefit`
},
{
minRange:7,
maxRange:8,
name:`potionbenefit`
},
{
minRange:9,
maxRange:11,
name:`utilitybenefit`
},
{
minRange:12,
maxRange:12,
name:`weaponbenefit`
}
]
},
scrollwandcursetable:{
name:`Scroll/Wand Curse Table`,
rulesSection:``,
description:``,
dieType:`2d6`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:2,
maxRange:6,
name:`armorcurse`
},
{
minRange:7,
maxRange:8,
name:`potioncurse`
},
{
minRange:9,
maxRange:11,
name:`utilitycurse`
},
{
minRange:12,
maxRange:12,
name:`weaponcurse`
}
]
},
scrollfeatures:{
name:`Scroll Features`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d15`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Tattered parchment`
},
{
minRange:0,
maxRange:0,
name:`Silver filigree`
},
{
minRange:0,
maxRange:0,
name:`Bound with aged leather`
},
{
minRange:0,
maxRange:0,
name:`Translucent vellum`
},
{
minRange:0,
maxRange:0,
name:`Charred, wrapped in blackened ribbons`
},
{
minRange:0,
maxRange:0,
name:`Thin metallic sheets with silver wire`
},
{
minRange:0,
maxRange:0,
name:`Crafted from plant leaves`
},
{
minRange:0,
maxRange:0,
name:`Marginalia and wax seals`
},
{
minRange:0,
maxRange:0,
name:`Surface seems to undulate`
},
{
minRange:0,
maxRange:0,
name:`Iridescent ink on parchment`
},
{
minRange:0,
maxRange:0,
name:`Illustrated with mythical creatures`
},
{
minRange:0,
maxRange:0,
name:`Trailing shadowy tendrils`
},
{
minRange:0,
maxRange:0,
name:`Seemingly made of spiderweb`
},
{
minRange:0,
maxRange:0,
name:`Shimmering silk with silver thread`
},
{
minRange:0,
maxRange:0,
name:`Mist seems to drift across the surface`
}
]
},
wandfeatures:{
name:`Wand Features`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d15`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Embedded with jagged green crystals`
},
{
minRange:0,
maxRange:0,
name:`Gnarled petrified wood`
},
{
minRange:0,
maxRange:0,
name:`Shimmering ice, emitting faint mist`
},
{
minRange:0,
maxRange:0,
name:`Spiral shaped coral`
},
{
minRange:0,
maxRange:0,
name:`Golden with intertwined dragons`
},
{
minRange:0,
maxRange:0,
name:`Dull iron, covered in thorny vines`
},
{
minRange:0,
maxRange:0,
name:`Gleaming silver with moonstones`
},
{
minRange:0,
maxRange:0,
name:`Bone wrapped in darkened bandages`
},
{
minRange:0,
maxRange:0,
name:`Crystal clear with color-changing flecks`
},
{
minRange:0,
maxRange:0,
name:`Rune covered, skeletal finger bones`
},
{
minRange:0,
maxRange:0,
name:`Warm to touch, trailing sparks`
},
{
minRange:0,
maxRange:0,
name:`Covered in glowing moss and tiny glowing insects`
},
{
minRange:0,
maxRange:0,
name:`Dazzling prism-tipped wood`
},
{
minRange:0,
maxRange:0,
name:`Swirling darkness, soft whispering sounds`
},
{
minRange:0,
maxRange:0,
name:`Obsidian containing shimmering stardust`
}
]
},
weapontype:{
name:`Weapon Type`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d16`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Arrows (3d4)`
},
{
minRange:0,
maxRange:0,
name:`Bastard sword`
},
{
minRange:0,
maxRange:0,
name:`Club`
},
{
minRange:0,
maxRange:0,
name:`Crossbow`
},
{
minRange:0,
maxRange:0,
name:`Crossbow bolts (3d4)`
},
{
minRange:0,
maxRange:0,
name:`Dagger`
},
{
minRange:0,
maxRange:0,
name:`Greataxe`
},
{
minRange:0,
maxRange:0,
name:`Greatsword`
},
{
minRange:0,
maxRange:0,
name:`Javelin`
},
{
minRange:0,
maxRange:0,
name:`Longbow`
},
{
minRange:0,
maxRange:0,
name:`Longsword`
},
{
minRange:0,
maxRange:0,
name:`Mace`
},
{
minRange:0,
maxRange:0,
name:`Shortbow`
},
{
minRange:0,
maxRange:0,
name:`Shortsword`
},
{
minRange:0,
maxRange:0,
name:`Staff`
},
{
minRange:0,
maxRange:0,
name:`Warhammer`
}
]
},
weaponbonus:{
name:`Weapon Bonus`,
rulesSection:``,
description:``,
dieType:`2d6`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:2,
maxRange:3,
name:`+0`
},
{
minRange:4,
maxRange:9,
name:`+1`
},
{
minRange:10,
maxRange:11,
name:`+2`
},
{
minRange:12,
maxRange:12,
name:`+3`
}
]
},
weaponfeature:{
name:`Weapon Feature`,
rulesSection:`Original Content - Cesidio`,
description:`TODO: COPY OF UTILITY - NEED TO CHANGE`,
dieType:`d41`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Adorned with delicate frost patterns`
},
{
minRange:0,
maxRange:0,
name:`Adorned with eldritch symbols`
},
{
minRange:0,
maxRange:0,
name:`Bound with ethereal chains`
},
{
minRange:0,
maxRange:0,
name:`Carved from petrified wood`
},
{
minRange:0,
maxRange:0,
name:`Celestial Rune Engravings`
},
{
minRange:0,
maxRange:0,
name:`Cracked and weathered surface`
},
{
minRange:0,
maxRange:0,
name:`Crimson Bloodstone Accents`
},
{
minRange:0,
maxRange:0,
name:`Embossed with draconic scales`
},
{
minRange:0,
maxRange:0,
name:`Encrusted with mermaid scales`
},
{
minRange:0,
maxRange:0,
name:`Encrusted with vibrant, iridescent feathers`
},
{
minRange:0,
maxRange:0,
name:`Engraved with ancient runes`
},
{
minRange:0,
maxRange:0,
name:`Enveloped in swirling mist`
},
{
minRange:0,
maxRange:0,
name:`Etched with celestial constellations`
},
{
minRange:0,
maxRange:0,
name:`Flecked with shimmering crystal`
},
{
minRange:0,
maxRange:0,
name:`Forged from celestial silver`
},
{
minRange:0,
maxRange:0,
name:`Gilded with molten gold`
},
{
minRange:0,
maxRange:0,
name:`Gleaming silver filigree`
},
{
minRange:0,
maxRange:0,
name:`Gleaming with inner fire`
},
{
minRange:0,
maxRange:0,
name:`Glimmering with captured starlight`
},
{
minRange:0,
maxRange:0,
name:`Glinting with jagged shards of ice`
},
{
minRange:0,
maxRange:0,
name:`Glowing moonstone embellishments`
},
{
minRange:0,
maxRange:0,
name:`Icy shard adornments`
},
{
minRange:0,
maxRange:0,
name:`Inlaid with glowing amber`
},
{
minRange:0,
maxRange:0,
name:`Inlaid with shimmering opals`
},
{
minRange:0,
maxRange:0,
name:`Inscribed with enigmatic glyphs`
},
{
minRange:0,
maxRange:0,
name:`Luminescent star patterns`
},
{
minRange:0,
maxRange:0,
name:`Lustrous opal inlays`
},
{
minRange:0,
maxRange:0,
name:`Polished obsidian surface`
},
{
minRange:0,
maxRange:0,
name:`Pulsating veins of arcane energy`
},
{
minRange:0,
maxRange:0,
name:`Serpent skin wrapping`
},
{
minRange:0,
maxRange:0,
name:`Shrouded in wisps of ghostly essence`
},
{
minRange:0,
maxRange:0,
name:`Studded with dark obsidian spikes`
},
{
minRange:0,
maxRange:0,
name:`Swirling with elemental energy`
},
{
minRange:0,
maxRange:0,
name:`Tinged with a faint, eerie glow`
},
{
minRange:0,
maxRange:0,
name:`Twisted and contorted shape`
},
{
minRange:0,
maxRange:0,
name:`Veiled in shadowy aura`
},
{
minRange:0,
maxRange:0,
name:`Veins of pulsating lava`
},
{
minRange:0,
maxRange:0,
name:`Whirling elemental essence`
},
{
minRange:0,
maxRange:0,
name:`Woven with enchanted vines`
},
{
minRange:0,
maxRange:0,
name:`Wrapped in tattered, ethereal fabric`
},
{
minRange:0,
maxRange:0,
name:`Wrapped in thorny vines`
}
]
},
personalitytrait:{
name:`Personality Trait`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d16`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Boastful`
},
{
minRange:0,
maxRange:0,
name:`Brave`
},
{
minRange:0,
maxRange:0,
name:`Cunning`
},
{
minRange:0,
maxRange:0,
name:`Curious`
},
{
minRange:0,
maxRange:0,
name:`Enigmatic`
},
{
minRange:0,
maxRange:0,
name:`Gracious`
},
{
minRange:0,
maxRange:0,
name:`Impulsive`
},
{
minRange:0,
maxRange:0,
name:`Melancholic`
},
{
minRange:0,
maxRange:0,
name:`Mischievous`
},
{
minRange:0,
maxRange:0,
name:`Mysterious`
},
{
minRange:0,
maxRange:0,
name:`Playful`
},
{
minRange:0,
maxRange:0,
name:`Reserved`
},
{
minRange:0,
maxRange:0,
name:`Resolute`
},
{
minRange:0,
maxRange:0,
name:`Serene`
},
{
minRange:0,
maxRange:0,
name:`Stoic`
},
{
minRange:0,
maxRange:0,
name:`Witty`
}
]
},
spellclass:{
name:`Spell Class`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d6`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:1,
maxRange:3,
name:`wizard`
},
{
minRange:4,
maxRange:6,
name:`priest`
}
]
},
spelltier:{
name:`Spell Tier`,
rulesSection:``,
description:``,
dieType:`2d6`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:2,
maxRange:5,
name:`1`
},
{
minRange:6,
maxRange:7,
name:`2`
},
{
minRange:8,
maxRange:9,
name:`3`
},
{
minRange:10,
maxRange:11,
name:`4`
},
{
minRange:12,
maxRange:12,
name:`5`
}
]
},
wizardspelltier1:{
name:`Wizard Spell Tier  Tier 1`,
rulesSection:``,
description:``,
dieType:`d12`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Alarm`
},
{
minRange:0,
maxRange:0,
name:`Burning hands`
},
{
minRange:0,
maxRange:0,
name:`Charm person`
},
{
minRange:0,
maxRange:0,
name:`Detect magic`
},
{
minRange:0,
maxRange:0,
name:`Feather fall`
},
{
minRange:0,
maxRange:0,
name:`Floating disk`
},
{
minRange:0,
maxRange:0,
name:`Hold portal`
},
{
minRange:0,
maxRange:0,
name:`Light`
},
{
minRange:0,
maxRange:0,
name:`Mage armor`
},
{
minRange:0,
maxRange:0,
name:`Magic missile`
},
{
minRange:0,
maxRange:0,
name:`Protection from evil`
},
{
minRange:0,
maxRange:0,
name:`Sleep`
}
]
},
wizardspelltier2:{
name:`Wizard Spell Tier  Tier 2`,
rulesSection:``,
description:``,
dieType:`d12`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Acid arrow`
},
{
minRange:0,
maxRange:0,
name:`Alter self`
},
{
minRange:0,
maxRange:0,
name:`Detect thoughts`
},
{
minRange:0,
maxRange:0,
name:`Fixed object`
},
{
minRange:0,
maxRange:0,
name:`Hold person`
},
{
minRange:0,
maxRange:0,
name:`Invisibility`
},
{
minRange:0,
maxRange:0,
name:`Knock`
},
{
minRange:0,
maxRange:0,
name:`Levitate`
},
{
minRange:0,
maxRange:0,
name:`Mirror image`
},
{
minRange:0,
maxRange:0,
name:`Misty step`
},
{
minRange:0,
maxRange:0,
name:`Silence`
},
{
minRange:0,
maxRange:0,
name:`Web`
}
]
},
wizardspelltier3:{
name:`Wizard Spell Tier  Tier 3`,
rulesSection:``,
description:``,
dieType:`d12`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Animate dead`
},
{
minRange:0,
maxRange:0,
name:`Dispel magic`
},
{
minRange:0,
maxRange:0,
name:`Fabricate`
},
{
minRange:0,
maxRange:0,
name:`Fireball`
},
{
minRange:0,
maxRange:0,
name:`Fly`
},
{
minRange:0,
maxRange:0,
name:`Gaseous form`
},
{
minRange:0,
maxRange:0,
name:`Illusion`
},
{
minRange:0,
maxRange:0,
name:`Lightning bolt`
},
{
minRange:0,
maxRange:0,
name:`Magic circle`
},
{
minRange:0,
maxRange:0,
name:`Protection from energy`
},
{
minRange:0,
maxRange:0,
name:`Sending`
},
{
minRange:0,
maxRange:0,
name:`Speak with dead`
}
]
},
wizardspelltier4:{
name:`Wizard Spell Tier  Tier 4`,
rulesSection:``,
description:``,
dieType:`d12`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Arcane eye`
},
{
minRange:0,
maxRange:0,
name:`Cloudkill`
},
{
minRange:0,
maxRange:0,
name:`Confusion`
},
{
minRange:0,
maxRange:0,
name:`Control water`
},
{
minRange:0,
maxRange:0,
name:`Dimension door`
},
{
minRange:0,
maxRange:0,
name:`Divination`
},
{
minRange:0,
maxRange:0,
name:`Passwall`
},
{
minRange:0,
maxRange:0,
name:`Polymorph`
},
{
minRange:0,
maxRange:0,
name:`Resilient sphere`
},
{
minRange:0,
maxRange:0,
name:`Stoneskin`
},
{
minRange:0,
maxRange:0,
name:`Telekinesis`
},
{
minRange:0,
maxRange:0,
name:`Wall of force`
}
]
},
wizardspelltier5:{
name:`Wizard Spell Tier  Tier 5`,
rulesSection:``,
description:``,
dieType:`d12`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Antimagic shell`
},
{
minRange:0,
maxRange:0,
name:`Create undead`
},
{
minRange:0,
maxRange:0,
name:`Disintegrate`
},
{
minRange:0,
maxRange:0,
name:`Hold monster`
},
{
minRange:0,
maxRange:0,
name:`Plane shift`
},
{
minRange:0,
maxRange:0,
name:`Power word kill`
},
{
minRange:0,
maxRange:0,
name:`Prismatic orb`
},
{
minRange:0,
maxRange:0,
name:`Scrying`
},
{
minRange:0,
maxRange:0,
name:`Shapechange`
},
{
minRange:0,
maxRange:0,
name:`Summon extraplanar`
},
{
minRange:0,
maxRange:0,
name:`Teleport`
},
{
minRange:0,
maxRange:0,
name:`Wish`
}
]
},
priestspelltier1:{
name:`Priest Spell Tier 1`,
rulesSection:``,
description:``,
dieType:`d6`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Cure Wounds`
},
{
minRange:0,
maxRange:0,
name:`Holy Weapon`
},
{
minRange:0,
maxRange:0,
name:`Light`
},
{
minRange:0,
maxRange:0,
name:`Protection From Evil`
},
{
minRange:0,
maxRange:0,
name:`Shield of Faith`
},
{
minRange:0,
maxRange:0,
name:`Turn Undead`
}
]
},
priestspelltier2:{
name:`Priest Spell Tier 2`,
rulesSection:``,
description:``,
dieType:`d6`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Augury`
},
{
minRange:0,
maxRange:0,
name:`Bless`
},
{
minRange:0,
maxRange:0,
name:`Blind/Deafen`
},
{
minRange:0,
maxRange:0,
name:`Cleansing Weapon`
},
{
minRange:0,
maxRange:0,
name:`Smite`
},
{
minRange:0,
maxRange:0,
name:`Zone of Truth`
}
]
},
priestspelltier3:{
name:`Priest Spell Tier 3`,
rulesSection:``,
description:``,
dieType:`d6`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Command`
},
{
minRange:0,
maxRange:0,
name:`Lay To Rest`
},
{
minRange:0,
maxRange:0,
name:`Mass Cure`
},
{
minRange:0,
maxRange:0,
name:`Rebuke Unholy`
},
{
minRange:0,
maxRange:0,
name:`Restoration`
},
{
minRange:0,
maxRange:0,
name:`Speak With Dead`
}
]
},
priestspelltier4:{
name:`Priest Spell Tier 4`,
rulesSection:``,
description:``,
dieType:`d6`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Commune`
},
{
minRange:0,
maxRange:0,
name:`Control Water`
},
{
minRange:0,
maxRange:0,
name:`Flame Strike`
},
{
minRange:0,
maxRange:0,
name:`Pillar of Salt`
},
{
minRange:0,
maxRange:0,
name:`Regenerate`
},
{
minRange:0,
maxRange:0,
name:`Wrath`
}
]
},
priestspelltier5:{
name:`Priest Spell Tier 5`,
rulesSection:``,
description:``,
dieType:`d6`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Divine Vengeance`
},
{
minRange:0,
maxRange:0,
name:`Dominion`
},
{
minRange:0,
maxRange:0,
name:`Heal`
},
{
minRange:0,
maxRange:0,
name:`Judgment`
},
{
minRange:0,
maxRange:0,
name:`Plane Shift`
},
{
minRange:0,
maxRange:0,
name:`Prophecy`
}
]
}
},
nh={
armorbenefit:{
name:`Armor Benefit`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d14`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``,
description:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Elemental Resistance`,
description:`[elemental type] attacks deal 1d4 less damage to you, up to 3d4 less damage/day.`
},
{
minRange:0,
maxRange:0,
name:`Enhanced Strength`,
description:`Once per day gain a +2 bonus to Strength for 3 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Arcane Absorbtion`,
description:`Once per day absorb the first tier 1 or tier 2 spell targeting the wearer.`
},
{
minRange:0,
maxRange:0,
name:`Agility Boost`,
description:`Once per day gain a +2 bonus to Dexterity for 3 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Swashbuckling`,
description:`Use finesse with any weapon, once per day for 3 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Healing Aura`,
description:`Healing effects on the wearer (e.g. spell, potion) splash to Close allies, once per day, 1d4 hp each target.`
},
{
minRange:0,
maxRange:0,
name:`Telekenetic Defense `,
description:`+1 AC vs. ranged attacks`
},
{
minRange:0,
maxRange:0,
name:`Mind Shield`,
description:`Attempts to influence your mind (fear, charm, etc.) are made with disadvantage.`
},
{
minRange:0,
maxRange:0,
name:`Etheral Step`,
description:`Once per day, wearer may step past/through an adjacent non-magical obstacle up to a stride thick.`
},
{
minRange:0,
maxRange:0,
name:`Adaptive Defense`,
description:`When receiving attack of the same type (e.g. peircing, slashing, etc.) as previous attack, +1 AC for that attack.`
},
{
minRange:0,
maxRange:0,
name:`Enchanted Pockets`,
description:`Armor adds two Gear Slots`
},
{
minRange:0,
maxRange:0,
name:`Fearful Presence`,
description:`Enemies fighting you make morale checks with disadvantage`
},
{
minRange:0,
maxRange:0,
name:`Battle Focus`,
description:`Opening attack made by the wearer in any combat has advantage.`
},
{
minRange:0,
maxRange:0,
name:`Noise Dampening`,
description:`Dexterity checks for hiding and sneaking are made at one difficulty class lower.`
}
]
},
armorcurse:{
name:`Armor Curse`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d14`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``,
description:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Elemental Amplification`,
description:`[elemental type] attacks deal +1d4 damage, up to 3d4 additional damage/day.`
},
{
minRange:0,
maxRange:0,
name:`Enervation`,
description:`When starting combat make a DC12 Constitution check, failure 1/day gives -2 Strength for 3 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Disruptive Aura`,
description:`Spells cast by allies within near have +1 to their DC.`
},
{
minRange:0,
maxRange:0,
name:`Sluggish`,
description:`When starting combat make a DC12 Constitution check, failure 1/day gives -2 Dexterity for 3 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Clumsiness`,
description:`Cannot use weapons with finesse, and have disadvantage on DEX checks.`
},
{
minRange:0,
maxRange:0,
name:`Healing Vortex`,
description:`Healing (magical or non-magical) is only 50% effective (round down).`
},
{
minRange:0,
maxRange:0,
name:`Missile Attraction`,
description:`-1 AC vs. ranged attacks`
},
{
minRange:0,
maxRange:0,
name:`Easily Influenced`,
description:`Attempts to influence your mind (fear, charm, etc.) are made with advantage.`
},
{
minRange:0,
maxRange:0,
name:`Unyielding Weight`,
description:`Movement is reduced by half.`
},
{
minRange:0,
maxRange:0,
name:`Bulkiness`,
description:`Armor consumes an additional 2 gear slots.`
},
{
minRange:0,
maxRange:0,
name:`Meek Countenance`,
description:`Enemies fighting you make morale checks with advantage.`
},
{
minRange:0,
maxRange:0,
name:`Distraction`,
description:`First round engaging a target wearer attacks with disadvantage.`
},
{
minRange:0,
maxRange:0,
name:`Noise Amplification`,
description:`Dexterity checks for hiding and sneaking are made at one difficulty class higher.`
},
{
minRange:0,
maxRange:0,
name:`The Cost`,
description:`When a benefit of this item is used/activated, wearer takes 1d4 damage.`
}
]
},
potionbenefit:{
name:`Potion Benefit`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d14`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``,
description:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Elemental Resistance`,
description:`[elemental type] attacks deal half damage (round down) for 5 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Enhanced Stat`,
description:`Gain +2 to [stat] for 5 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Arcane Absorbtion`,
description:`For 5 rounds, the next hostile spell that would effect you does not.`
},
{
minRange:0,
maxRange:0,
name:`Swashbuckling`,
description:`Gain +2 to Dexterity, use any weapon as with finesse for 5 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Luck`,
description:`Gain a Luck Token. Within 5 rounds, the next time you spend a Luck Token 50% chance to retain it.`
},
{
minRange:0,
maxRange:0,
name:`Deflection`,
description:`Ranged attacks against you are made with disadvantage for 5 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Shielding`,
description:`Incoming damage is reduced by half (round down) for 5 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Speed`,
description:`Movement increases to double near for 5 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Cleansing`,
description:`Removes disease, poison, or negative magical effects.`
},
{
minRange:0,
maxRange:0,
name:`Accuracy`,
description:`You make your attacks at +2 for 5 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Fearful Presence`,
description:`The next target you damage within 5 rounds, of your level or less, must make a morale check.`
},
{
minRange:0,
maxRange:0,
name:`Precision`,
description:`The next successful attack you make within 5 rounds is a critical hit.`
},
{
minRange:0,
maxRange:0,
name:`Elemental Channeling`,
description:`Your attacks deal an additional 1d6 [elemental type] damage for 5 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Noise Dampening`,
description:`Dexterity checks for hiding and sneaking are made at one difficulty class lower.`
}
]
},
potioncurse:{
name:`Potion Curse`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d14`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``,
description:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Elemental Amplification`,
description:`[elemental type] attacks deal +1d6 damage to you for 5 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Enervated`,
description:`DC 15 CON check or -2 Strength for 1 hour.`
},
{
minRange:0,
maxRange:0,
name:`Disruptive Aura`,
description:`Spells cast by allies within near have a +1 to their DC.`
},
{
minRange:0,
maxRange:0,
name:`Sluggish`,
description:`DC 15 CON check or -2 Dexterity for 1 hour.`
},
{
minRange:0,
maxRange:0,
name:`Clumsiness`,
description:`Cannot use weapons with finesse, and have disadvantage on DEX checks for 1 hour.`
},
{
minRange:0,
maxRange:0,
name:`Healing Vortex`,
description:`Healing (magical or non-magical) is only 50% effective (round down) for 1 hour.`
},
{
minRange:0,
maxRange:0,
name:`Missile Attraction`,
description:`-2 AC vs ranged attacks for 1 hour.`
},
{
minRange:0,
maxRange:0,
name:`Confounded`,
description:`DC 15 CON check or -2 Intelligence for 1 hour.`
},
{
minRange:0,
maxRange:0,
name:`Lethargy`,
description:`Movement is reduced by half for 1 hour.`
},
{
minRange:0,
maxRange:0,
name:`Blurred Vision`,
description:`You make your attacks at -2 for 5 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Meek Countenance`,
description:`For 1 hour your enemies succeed at morale checks.`
},
{
minRange:0,
maxRange:0,
name:`Distraction`,
description:`For 1 hour your are surprised when engaged by an enemy.`
},
{
minRange:0,
maxRange:0,
name:`Noise Amplification`,
description:`Dexterity checks for hiding and sneaking are made at one difficulty class higher.`
},
{
minRange:0,
maxRange:0,
name:`The Cost`,
description:`When a benefit of this item activates, user takes 1d4 damage.`
}
]
},
utilitybenefit:{
name:`Utility Benefit`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d20`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``,
description:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Arcane Infusion`,
description:`Once per day, your spell effects are calculated at one level higher for 5 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Arcane Insight`,
description:`Once per day, provides temporary knowledge or insight into a particular subject or situation.`
},
{
minRange:0,
maxRange:0,
name:`Clairvoyant Gaze`,
description:`Once per day, you may Scry (per the spell) at a range of Far.`
},
{
minRange:0,
maxRange:0,
name:`Death's Ward`,
description:`Roll your Death Timer with advantage.`
},
{
minRange:0,
maxRange:0,
name:`Deflection`,
description:`Ranged attacks against you are made with disadvantage.`
},
{
minRange:0,
maxRange:0,
name:`Displacement`,
description:`Until struck by an enemy, their attacks against you are made with disadvantage.`
},
{
minRange:0,
maxRange:0,
name:`Echoing Voice`,
description:`Amplifies the user's voice, allowing them to be heard from a great distance.`
},
{
minRange:0,
maxRange:0,
name:`Elemental Channeling`,
description:`Once per day, your attacks deal an additional 1d6 [elemental type] damage for 5 rounds.`
},
{
minRange:0,
maxRange:0,
name:`Elemental Resistance`,
description:`[elemental type] attacks deal half damage (round down) to the wielder.`
},
{
minRange:0,
maxRange:0,
name:`Enhanced Stat`,
description:`While worn [stat] increases by +2.`
},
{
minRange:0,
maxRange:0,
name:`Enchanted Pockets`,
description:`Item adds extra-dimensional storage equivalent to two gear slots.`
},
{
minRange:0,
maxRange:0,
name:`Enchanted Recovery`,
description:`Poisons, diseases, and conditions effect you for half the normal duration.`
},
{
minRange:0,
maxRange:0,
name:`Etheral Step`,
description:`Once per day, step past/through an adjacent obstacle less than a stride thick.`
},
{
minRange:0,
maxRange:0,
name:`Ethereal Sight`,
description:`Allows the user to see and interact with invisible or incorporeal entities.`
},
{
minRange:0,
maxRange:0,
name:`Fortune's Favor`,
description:`Sense treasure when within close range. (not exact location).`
},
{
minRange:0,
maxRange:0,
name:`Healing Touch`,
description:`Once per day, touch a target to restore 2d6 hp.`
},
{
minRange:0,
maxRange:0,
name:`Mind Shield`,
description:`You are immune to attempts to influence your mind (fear, charm, etc.)`
},
{
minRange:0,
maxRange:0,
name:`Shadowmeld`,
description:`Dexterity checks for hiding and sneaking are made at one difficulty class lower.`
},
{
minRange:0,
maxRange:0,
name:`Time Step`,
description:`Once per day, move to the top of the initiative order.`
},
{
minRange:0,
maxRange:0,
name:`Warding Aura`,
description:`Hostile spells that target you have +2 DC to cast successfully.`
}
]
},
utilitycurse:{
name:`Utility Curse`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d20`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``,
description:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Arcane Exposure`,
description:`Hostile spells that target you have -2 DC to cast successfully.`
},
{
minRange:0,
maxRange:0,
name:`Bloodlust`,
description:`DC 15 WIS or immediately attack enemies.`
},
{
minRange:0,
maxRange:0,
name:`Chaotic Aura`,
description:`Wizard Mishaps that occur near you are rolled with disadvantage.`
},
{
minRange:0,
maxRange:0,
name:`Clumsiness`,
description:`Cannot use weapons with finesse, and have disadvantage on DEX checks for 1 hour.`
},
{
minRange:0,
maxRange:0,
name:`Conspicuous`,
description:`Attempts to hide or sneak are made at one difficulty class higher.`
},
{
minRange:0,
maxRange:0,
name:`Curiosity`,
description:`DC 15 WIS or immediately open any found container (chest, sack, etc.)`
},
{
minRange:0,
maxRange:0,
name:`Diminished Stat`,
description:`While worn [stat] is reduced by 2.`
},
{
minRange:0,
maxRange:0,
name:`Elemental Weakness`,
description:`[elemental type] attacks deal 50% more damage (round down) to wearer.`
},
{
minRange:0,
maxRange:0,
name:`Feedback`,
description:`When casting a spell take damage equal to that spell's tier.`
},
{
minRange:0,
maxRange:0,
name:`Healing Siphon`,
description:`Absorbs half of all healing directed at the wearer.`
},
{
minRange:0,
maxRange:0,
name:`Indecisive`,
description:`Initiative rolls are made with disadvantage.`
},
{
minRange:0,
maxRange:0,
name:`Phantom Burden`,
description:`Item consumes an additional gear slot.`
},
{
minRange:0,
maxRange:0,
name:`Plaguebearer`,
description:`When afflicted with poison or disease all near allies DC 12 CON or also afflicted.`
},
{
minRange:0,
maxRange:0,
name:`Pyrophobia`,
description:`Wearer cannot carry a flaming lightsource.`
},
{
minRange:0,
maxRange:0,
name:`Pyrophobic`,
description:`Will not function while the wearer is carrying a flaming lightsource.`
},
{
minRange:0,
maxRange:0,
name:`Reluctant`,
description:`Once per day, must spend time audibly convincing the item to function.`
},
{
minRange:0,
maxRange:0,
name:`Searing Mark`,
description:`When used leaves a visible brand on the user's body (1d4 damage) that attracts unwanted attention.`
},
{
minRange:0,
maxRange:0,
name:`Sickly`,
description:`Checks to avoid poison or disease are made at one difficulty class higher.`
},
{
minRange:0,
maxRange:0,
name:`Vulnerability`,
description:`Take 50% additional damage (round down) from a specific damage type (e.g., blunt, slashing.)`
},
{
minRange:0,
maxRange:0,
name:`Weak Mind`,
description:`Attempts to influence your mind (e.g., charm, fear) are made with advantage.`
}
]
},
weaponbenefit:{
name:`Weapon Benefit`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d17`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``,
description:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Aura of Fear`,
description:`Damaging a target <= wielder's level causes target to make a morale check.`
},
{
minRange:0,
maxRange:0,
name:`Bane`,
description:`Double base weapon damage to creatures of [type] (e.g., giants, dragons, constructs, etc.)`
},
{
minRange:0,
maxRange:0,
name:`Bloodthirsty`,
description:`With each successful hit weapon does +1 damage (max +3) until weilder misses or combat ends.`
},
{
minRange:0,
maxRange:0,
name:`Elemental Attack`,
description:`Once per day, for 5 rounds weapon does +1d4 damage, and damage becomes [element] type.`
},
{
minRange:0,
maxRange:0,
name:`Fate's Favor`,
description:`Once per day, for 5 rounds, attack with advantage.`
},
{
minRange:0,
maxRange:0,
name:`Guardian's Touch`,
description:`Once per day, for 5 rounds wielder is immune to damage of [type] (e.g., slashing, piercing, etc.)`
},
{
minRange:0,
maxRange:0,
name:`Lifeline`,
description:`Once per day, successfully stabilize a dying character.`
},
{
minRange:0,
maxRange:0,
name:`Protective Ward`,
description:`Once per day, damage reducing wielder's hp below 1 reduces their hp to 1.`
},
{
minRange:0,
maxRange:0,
name:`Resounding Blow`,
description:`Once per opponent, when successfully hit target is staggered, makes next attack with disadvantage.`
},
{
minRange:0,
maxRange:0,
name:`Shadowstep`,
description:`Once per day, wielder can teleport to visible location within near.`
},
{
minRange:0,
maxRange:0,
name:`Shadowstrike`,
description:`Wielder makes their first strike in combat with surprise.`
},
{
minRange:0,
maxRange:0,
name:`Shieldbreaker`,
description:`Wielder ignores target's AC bonuses from physical or magical shields.`
},
{
minRange:0,
maxRange:0,
name:`Spell Parry`,
description:`Hostile spells targeting the weilder have +2 DC to successfully cast.`
},
{
minRange:0,
maxRange:0,
name:`Swift Parry`,
description:`Wielding the weapon adds +1 to AC.`
},
{
minRange:0,
maxRange:0,
name:`True Sight`,
description:`Wielder can see through illusions, and can see invisible or incorporeal enemies.`
},
{
minRange:0,
maxRange:0,
name:`Precision`,
description:`Wielder critically strikes on a natural 18, 19, or 20.`
},
{
minRange:0,
maxRange:0,
name:`Enhanced Stat`,
description:`While wielded [stat] increases by +2.`
}
]
},
weaponcurse:{
name:`Weapon Curse`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d17`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``,
description:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Arcane Abberation`,
description:`Failing a spellcasting check within half near causes a class-appropriate mishap.`
},
{
minRange:0,
maxRange:0,
name:`Arcane Hunger`,
description:`Once per day, cast a tier 1 spell into the item so it may feed or it ceases to function.`
},
{
minRange:0,
maxRange:0,
name:`Auroa of Agony`,
description:`When the wielder is damaged allies within double close take 1d4 damage.`
},
{
minRange:0,
maxRange:0,
name:`Backfire`,
description:`When a benefit of this item is used the wielder takes 1d6 damage.`
},
{
minRange:0,
maxRange:0,
name:`Bindingcurse`,
description:`Discarding this item (not wielding it and removing from gear slot) causes 1d10 damage.`
},
{
minRange:0,
maxRange:0,
name:`Bloodlust`,
description:`DC 15 WIS or immediately attack foes.`
},
{
minRange:0,
maxRange:0,
name:`Dark Dreams`,
description:`Causes an interruption to rest, per Resting rules.`
},
{
minRange:0,
maxRange:0,
name:`Disenchantment`,
description:`Beneficial spells cast on the wielder last half as long.`
},
{
minRange:0,
maxRange:0,
name:`Encumbering`,
description:`When wielded reduces movement to half near.`
},
{
minRange:0,
maxRange:0,
name:`Herald`,
description:`Drawing the item causes a fanfare of horns to sound.`
},
{
minRange:0,
maxRange:0,
name:`Impaired Judgement`,
description:`When combat is over DC15 WIS or attack your nearest ally.`
},
{
minRange:0,
maxRange:0,
name:`Increasing Burden`,
description:`DC 15 STR as combat begins in order to wield item. +1 DC each combat that day.`
},
{
minRange:0,
maxRange:0,
name:`Primacy`,
description:`When drawing any item DC 15 WIS or this item must be drawn.`
},
{
minRange:0,
maxRange:0,
name:`Ritual Sacrifice`,
description:`Each day, benefits of this weapon will not function until the weapon slays a creature.`
},
{
minRange:0,
maxRange:0,
name:`Searing Mark`,
description:`When used leaves a visible brand on the user's body (1d4 damage) that attracts unwanted attention.`
},
{
minRange:0,
maxRange:0,
name:`Vulnerability`,
description:`Take 50% additional damage (round down) from a specific damage type (e.g., blunt, slashing.)`
},
{
minRange:0,
maxRange:0,
name:`Withering Touch`,
description:`Owner takes on a withered, macabre appearance, -4 Charisma. `
}
]
},
personalityvirtue:{
name:`Personality Virtue`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d16`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``,
description:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Compassion`,
description:`Empathizes with the suffering of others, encourages wielder to act with kindness and empathy.`
},
{
minRange:0,
maxRange:0,
name:`Discernment`,
description:`Possesses keen insight and the ability to detect lies, illusions, or hidden truths.`
},
{
minRange:0,
maxRange:0,
name:`Foresight`,
description:`Grants glimpses of the future or premonitions, occasionally helpful.`
},
{
minRange:0,
maxRange:0,
name:`Generosity`,
description:`Promotes generosity and encourages its wielder to share wealth, resources, or knowledge.`
},
{
minRange:0,
maxRange:0,
name:`Harmony`,
description:`Helps wielder calm conflicts or ease tensions.`
},
{
minRange:0,
maxRange:0,
name:`Honor`,
description:`Upholds a strict code of honor and chivalry, expects same from its wielder.`
},
{
minRange:0,
maxRange:0,
name:`Humility`,
description:`Embodies humility, reminding its wielder to remain modest and avoid arrogance.`
},
{
minRange:0,
maxRange:0,
name:`Integrity`,
description:`Embodies unwavering honesty and moral principles, guiding its wielder to same.`
},
{
minRange:0,
maxRange:0,
name:`Justice`,
description:`Strong sense of justice and seeks to right wrongs or punish evildoers.`
},
{
minRange:0,
maxRange:0,
name:`Loyalty`,
description:`Fiercely loyal to its wielder and will do anything to protect them.`
},
{
minRange:0,
maxRange:0,
name:`Patience`,
description:`Embodies patience and urges its wielder to remain calm and composed.`
},
{
minRange:0,
maxRange:0,
name:`Protection`,
description:`Possesses a strong desire to shield its wielder from harm and actively seeks to defend them.`
},
{
minRange:0,
maxRange:0,
name:`Resourcefulness`,
description:`Occasionally provides creative solutions to challenges and encouraging its wielder to think outside the box.`
},
{
minRange:0,
maxRange:0,
name:`Truthfulness`,
description:`Always speaks the truth and encourages its wielder to value honesty and integrity.`
},
{
minRange:0,
maxRange:0,
name:`Valor`,
description:`Bolsters the courage and bravery of its wielder`
},
{
minRange:0,
maxRange:0,
name:`Wisdom`,
description:`Possesses profound knowledge, occasionally offers insightful advice to its wielder.`
}
]
},
personalityflaw:{
name:`Personality Flaw`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d16`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``,
description:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Betrayal`,
description:`Tendency to betray its wielder, seeking opportunities to switch allegiance or sabotage their efforts.`
},
{
minRange:0,
maxRange:0,
name:`Bloodlust`,
description:`Encourages its wielder to engage in needless combat.`
},
{
minRange:0,
maxRange:0,
name:`Cowardice`,
description:`Prone to fear and encourages its wielder to avoid dangerous situations at all costs.`
},
{
minRange:0,
maxRange:0,
name:`Deception`,
description:`Adept at deception, often misleading its wielder and others for its own gain.`
},
{
minRange:0,
maxRange:0,
name:`Envy`,
description:`Consumed by jealousy, often coveting other powerful or renowned artifacts.`
},
{
minRange:0,
maxRange:0,
name:`Greed`,
description:`Possessive and covetous, constantly desiring more power or wealth.`
},
{
minRange:0,
maxRange:0,
name:`Impatience`,
description:`Lacks patience, pressuring its wielder to act hastily and impulsively.`
},
{
minRange:0,
maxRange:0,
name:`Impulsiveness`,
description:`Encourages its wielder to act rashly, potentially leading to hasty decisions.`
},
{
minRange:0,
maxRange:0,
name:`Isolation`,
description:`Encourages its wielder to distance themselves from others, fostering a sense of loneliness.`
},
{
minRange:0,
maxRange:0,
name:`Obsession`,
description:`Fixates on a particular goal or desire, becoming single-minded and disregarding other important matters.`
},
{
minRange:0,
maxRange:0,
name:`Paranoia`,
description:`Instills paranoia in its wielder, making them distrustful of allies and constantly suspicious.`
},
{
minRange:0,
maxRange:0,
name:`Possessiveness`,
description:`Possessive over its wielder, refusing to allow them to wield or use other items.`
},
{
minRange:0,
maxRange:0,
name:`Recklessness`,
description:`Pushes its wielder to take unnecessary risks, disregarding caution and prudence.`
},
{
minRange:0,
maxRange:0,
name:`Stubbornness`,
description:`Obstinate and refuses to yield, making it difficult for its wielder to change course.`
},
{
minRange:0,
maxRange:0,
name:`Vain`,
description:`Expects the wielder compliment, and fawn over it before it will function.`
},
{
minRange:0,
maxRange:0,
name:`Vengeance`,
description:`Thirst for revenge, constantly goading its wielder into seeking retribution.`
}
]
}
},
rh=JSON.parse(JSON.stringify(th),
(e,
t)=>e===`rollType`&&typeof t==`string`?Jp[
t
]:t),
ih=JSON.parse(JSON.stringify(nh),
(e,
t)=>e===`rollType`&&typeof t==`string`?Jp[
t
]:t),
ah=s({
age:()=>sh,
alignment:()=>ch,
ancestry:()=>oh,
appearance:()=>fh,
behavior:()=>ph,
default:()=>hh,
lowjobs:()=>uh,
secret:()=>mh,
standardjobs:()=>dh,
wealth:()=>lh
}),
oh={
name:`NPCs - Ancestry`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d6`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Human`
},
{
minRange:0,
maxRange:0,
name:`Elf`
},
{
minRange:0,
maxRange:0,
name:`Dwarf`
},
{
minRange:0,
maxRange:0,
name:`Halfling`
},
{
minRange:0,
maxRange:0,
name:`Half-orc`
},
{
minRange:0,
maxRange:0,
name:`Goblin`
}
]
},
sh={
name:`NPCs - Age`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d8`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:1,
maxRange:1,
name:`Child`
},
{
minRange:2,
maxRange:2,
name:`Adolescent`
},
{
minRange:3,
maxRange:4,
name:`Adult`
},
{
minRange:5,
maxRange:6,
name:`Middle-Aged`
},
{
minRange:7,
maxRange:7,
name:`Elderly`
},
{
minRange:8,
maxRange:8,
name:`Ancient`
}
]
},
ch={
name:`NPCs - Alignment`,
rulesSection:``,
description:``,
dieType:`d6`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:1,
maxRange:3,
name:`Lawful`
},
{
minRange:4,
maxRange:4,
name:`Neutral`
},
{
minRange:5,
maxRange:6,
name:`Chaotic`
}
]
},
lh={
name:`NPCs - Wealth`,
rulesSection:``,
description:``,
dieType:`d5`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:1,
maxRange:1,
name:`Poor`
},
{
minRange:2,
maxRange:3,
name:`Standard`
},
{
minRange:4,
maxRange:5,
name:`Wealthy`
}
]
},
uh={
name:`NPCs - Low Jobs`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d20`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Serf`
},
{
minRange:0,
maxRange:0,
name:`Miller`
},
{
minRange:0,
maxRange:0,
name:`Washerwoman`
},
{
minRange:0,
maxRange:0,
name:`Rat Catcher`
},
{
minRange:0,
maxRange:0,
name:`Street Sweeper`
},
{
minRange:0,
maxRange:0,
name:`Stablehand`
},
{
minRange:0,
maxRange:0,
name:`Candlemaker`
},
{
minRange:0,
maxRange:0,
name:`Potter`
},
{
minRange:0,
maxRange:0,
name:`Shepherd`
},
{
minRange:0,
maxRange:0,
name:`Dyer`
},
{
minRange:0,
maxRange:0,
name:`Beekeeper`
},
{
minRange:0,
maxRange:0,
name:`Well Digger`
},
{
minRange:0,
maxRange:0,
name:`Basket Weaver`
},
{
minRange:0,
maxRange:0,
name:`Scavenger`
},
{
minRange:0,
maxRange:0,
name:`Mushroom Forager`
},
{
minRange:0,
maxRange:0,
name:`Builder`
},
{
minRange:0,
maxRange:0,
name:`Miner`
},
{
minRange:0,
maxRange:0,
name:`Cider Presser`
},
{
minRange:0,
maxRange:0,
name:`Street Performer`
},
{
minRange:0,
maxRange:0,
name:`Nightsoil Gatherer`
}
]
},
dh={
name:`NPCs - standard Jobs`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d20`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Blacksmith`
},
{
minRange:0,
maxRange:0,
name:`Innkeeper`
},
{
minRange:0,
maxRange:0,
name:`Apothecary`
},
{
minRange:0,
maxRange:0,
name:`Hunter`
},
{
minRange:0,
maxRange:0,
name:`Farmer`
},
{
minRange:0,
maxRange:0,
name:`Town Guard`
},
{
minRange:0,
maxRange:0,
name:`Woodcutter`
},
{
minRange:0,
maxRange:0,
name:`Healer`
},
{
minRange:0,
maxRange:0,
name:`Scribe`
},
{
minRange:0,
maxRange:0,
name:`Town Crier`
},
{
minRange:0,
maxRange:0,
name:`Tailor`
},
{
minRange:0,
maxRange:0,
name:`Bard`
},
{
minRange:0,
maxRange:0,
name:`Fisherman`
},
{
minRange:0,
maxRange:0,
name:`Street Vendor`
},
{
minRange:0,
maxRange:0,
name:`Grave Digger`
},
{
minRange:0,
maxRange:0,
name:`Tanner`
},
{
minRange:0,
maxRange:0,
name:`Merchant`
},
{
minRange:0,
maxRange:0,
name:`Stablemaster`
},
{
minRange:0,
maxRange:0,
name:`Cartographer`
},
{
minRange:0,
maxRange:0,
name:`Clergy`
}
]
},
fh={
name:`NPCs - Appearance`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d36`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Piercing eyes`
},
{
minRange:0,
maxRange:0,
name:`Raven hair`
},
{
minRange:0,
maxRange:0,
name:`Weathered face`
},
{
minRange:0,
maxRange:0,
name:`Ethereal beauty`
},
{
minRange:0,
maxRange:0,
name:`Battle-scarred`
},
{
minRange:0,
maxRange:0,
name:`Tangled hair`
},
{
minRange:0,
maxRange:0,
name:`Hollow cheeks`
},
{
minRange:0,
maxRange:0,
name:`Worn cloak`
},
{
minRange:0,
maxRange:0,
name:`Mysterious gaze`
},
{
minRange:0,
maxRange:0,
name:`Pale complexion`
},
{
minRange:0,
maxRange:0,
name:`Tattooed skin`
},
{
minRange:0,
maxRange:0,
name:`Muscular`
},
{
minRange:0,
maxRange:0,
name:`Elongated ears`
},
{
minRange:0,
maxRange:0,
name:`Bloodstained hands`
},
{
minRange:0,
maxRange:0,
name:`Ghostly pallor`
},
{
minRange:0,
maxRange:0,
name:`Fiery gaze`
},
{
minRange:0,
maxRange:0,
name:`Beastly features`
},
{
minRange:0,
maxRange:0,
name:`Veiled countenance`
},
{
minRange:0,
maxRange:0,
name:`Tattered Clothing`
},
{
minRange:0,
maxRange:0,
name:`Grimy Hands`
},
{
minRange:0,
maxRange:0,
name:`Greasy Hair`
},
{
minRange:0,
maxRange:0,
name:`Rugged Beard`
},
{
minRange:0,
maxRange:0,
name:`Haggard Face`
},
{
minRange:0,
maxRange:0,
name:`Scraggly Teeth`
},
{
minRange:0,
maxRange:0,
name:`Calloused Feet`
},
{
minRange:0,
maxRange:0,
name:`Matted Hair`
},
{
minRange:0,
maxRange:0,
name:`Pallid Skin`
},
{
minRange:0,
maxRange:0,
name:`Jagged Scar`
},
{
minRange:0,
maxRange:0,
name:`Crooked Nose`
},
{
minRange:0,
maxRange:0,
name:`Burned Flesh`
},
{
minRange:0,
maxRange:0,
name:`Missing Limb`
},
{
minRange:0,
maxRange:0,
name:`Pale Eyes`
},
{
minRange:0,
maxRange:0,
name:`Slight Build`
},
{
minRange:0,
maxRange:0,
name:`Gaunt Features`
},
{
minRange:0,
maxRange:0,
name:`Oily Skin`
},
{
minRange:0,
maxRange:0,
name:`Crooked Smile`
}
]
},
ph={
name:`NPCs - Behavior`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d36`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Shifty Glances`
},
{
minRange:0,
maxRange:0,
name:`Guttural Laughter`
},
{
minRange:0,
maxRange:0,
name:`Quick Temper`
},
{
minRange:0,
maxRange:0,
name:`Steely Gaze`
},
{
minRange:0,
maxRange:0,
name:`Furtive Whispers`
},
{
minRange:0,
maxRange:0,
name:`Sullen Silence`
},
{
minRange:0,
maxRange:0,
name:`Nervous Fidgeting`
},
{
minRange:0,
maxRange:0,
name:`Distant Stares`
},
{
minRange:0,
maxRange:0,
name:`Cautious Steps`
},
{
minRange:0,
maxRange:0,
name:`Evasive Answers`
},
{
minRange:0,
maxRange:0,
name:`Aggressive Posturing`
},
{
minRange:0,
maxRange:0,
name:`Cunning Manipulation`
},
{
minRange:0,
maxRange:0,
name:`Superstitious Rituals`
},
{
minRange:0,
maxRange:0,
name:`Brooding Solitude`
},
{
minRange:0,
maxRange:0,
name:`Muttered Prayers`
},
{
minRange:0,
maxRange:0,
name:`Unhinged Laughter`
},
{
minRange:0,
maxRange:0,
name:`Pleading/Begging`
},
{
minRange:0,
maxRange:0,
name:`Brazen Defiance`
},
{
minRange:0,
maxRange:0,
name:`Menacing Stares`
},
{
minRange:0,
maxRange:0,
name:`Muttering`
},
{
minRange:0,
maxRange:0,
name:`Fanatical Devotion`
},
{
minRange:0,
maxRange:0,
name:`Desperate Bargaining`
},
{
minRange:0,
maxRange:0,
name:`Sinister Grins`
},
{
minRange:0,
maxRange:0,
name:`Loyal Oaths`
},
{
minRange:0,
maxRange:0,
name:`Cowering Submission`
},
{
minRange:0,
maxRange:0,
name:`Bold Intimidation`
},
{
minRange:0,
maxRange:0,
name:`Unwavering Determination`
},
{
minRange:0,
maxRange:0,
name:`Relentless Pursuit`
},
{
minRange:0,
maxRange:0,
name:`Vengeful Scheming`
},
{
minRange:0,
maxRange:0,
name:`Enigmatic Charm`
},
{
minRange:0,
maxRange:0,
name:`Vicious Taunting`
},
{
minRange:0,
maxRange:0,
name:`Calculated Manipulation`
},
{
minRange:0,
maxRange:0,
name:`Eerie Stillness`
},
{
minRange:0,
maxRange:0,
name:`Fiery Rages`
},
{
minRange:0,
maxRange:0,
name:`Macabre Fascination`
},
{
minRange:0,
maxRange:0,
name:`Stoic Endurance`
}
]
},
mh={
name:`NPCs - Secret`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d36`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Illicit Love Affair`
},
{
minRange:0,
maxRange:0,
name:`Hidden Stash of Gold`
},
{
minRange:0,
maxRange:0,
name:`Criminal Past Life`
},
{
minRange:0,
maxRange:0,
name:`Illegitimate Child`
},
{
minRange:0,
maxRange:0,
name:`Betrayal of a Friend`
},
{
minRange:0,
maxRange:0,
name:`Secret Obsession with Magic`
},
{
minRange:0,
maxRange:0,
name:`Guilt Over Murder`
},
{
minRange:0,
maxRange:0,
name:`Hidden Identity`
},
{
minRange:0,
maxRange:0,
name:`Possession of Forbidden Knowledge`
},
{
minRange:0,
maxRange:0,
name:`Addiction to Dark Magic`
},
{
minRange:0,
maxRange:0,
name:`Desperation for Power`
},
{
minRange:0,
maxRange:0,
name:`Familycurse`
},
{
minRange:0,
maxRange:0,
name:`Undead Ancestry`
},
{
minRange:0,
maxRange:0,
name:`Secret Cult Membership`
},
{
minRange:0,
maxRange:0,
name:`Betrayal of an Ally`
},
{
minRange:0,
maxRange:0,
name:`Connection to a Secret Society`
},
{
minRange:0,
maxRange:0,
name:`Hidden Inheritance`
},
{
minRange:0,
maxRange:0,
name:`Involvement in a Conspiracy`
},
{
minRange:0,
maxRange:0,
name:`Stolen forbidden ancient artifact`
},
{
minRange:0,
maxRange:0,
name:`Possessed by vengeful spirit`
},
{
minRange:0,
maxRange:0,
name:`True parentage concealed for years`
},
{
minRange:0,
maxRange:0,
name:`Practicing forbidden blood magic`
},
{
minRange:0,
maxRange:0,
name:`Witnessed a forbidden ritual`
},
{
minRange:0,
maxRange:0,
name:`Concealed ties to assassins' guild`
},
{
minRange:0,
maxRange:0,
name:`Hunting a mythical creature`
},
{
minRange:0,
maxRange:0,
name:`Living with a cursed affliction`
},
{
minRange:0,
maxRange:0,
name:`Conspiring against ruling regime`
},
{
minRange:0,
maxRange:0,
name:`Guarding the entrance to hidden realm`
},
{
minRange:0,
maxRange:0,
name:`Haunted by guilt of past actions`
},
{
minRange:0,
maxRange:0,
name:`Manipulating others for personal gain`
},
{
minRange:0,
maxRange:0,
name:`Possessing a forbidden grimoire`
},
{
minRange:0,
maxRange:0,
name:`Forging illegal magical items`
},
{
minRange:0,
maxRange:0,
name:`Trapped in a pact with a demon`
},
{
minRange:0,
maxRange:0,
name:`Seeking a lost artifact's power`
},
{
minRange:0,
maxRange:0,
name:`Survived a deadly encounter with a monster`
},
{
minRange:0,
maxRange:0,
name:`Harbouring a fugitive rebel leader`
}
]
},
hh={
ancestry:oh,
age:sh,
alignment:ch,
wealth:lh,
lowjobs:uh,
standardjobs:dh,
appearance:fh,
behavior:ph,
secret:mh
},
gh=ah,
_h=s({
activity:()=>yh,
default:()=>xh,
distance:()=>vh,
reaction:()=>bh
}),
vh={
name:`Random Encounters - Starting Distance`,
rulesSection:`Random Encounters, v1, p112`,
description:`If one or more wandering creatures appear, roll 1d6 for their distance from the group.`,
dieType:`d6`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:1,
maxRange:1,
name:`Close`
},
{
minRange:2,
maxRange:4,
name:`Near`
},
{
minRange:5,
maxRange:6,
name:`Far`
}
]
},
yh={
name:`Random Encounters - Activity`,
rulesSection:`Random Encounters, v1, p112`,
description:`When the characters encounter new creatures, roll to determine the creatures' current activity. This might impact how likely they are to notice the characters.`,
dieType:`2d6`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:2,
maxRange:4,
name:`Hunting`
},
{
minRange:5,
maxRange:6,
name:`Eating`
},
{
minRange:7,
maxRange:8,
name:`Building/nesting`
},
{
minRange:9,
maxRange:10,
name:`Socializing/playing`
},
{
minRange:11,
maxRange:11,
name:`Guarding`
},
{
minRange:12,
maxRange:12,
name:`Sleeping`
}
]
},
bh={
name:`Random Encounters - Reaction`,
rulesSection:`Random Encounters, v1, p113`,
description:`When the characters encounter random creatures, the GM rolls for the creatures' attitude (if it would not already be clear). `,
dieType:`2d6`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:6,
name:`Hostile`
},
{
minRange:7,
maxRange:8,
name:`Suspicious`
},
{
minRange:9,
maxRange:9,
name:`Neutral`
},
{
minRange:10,
maxRange:11,
name:`Curious`
},
{
minRange:12,
maxRange:50,
name:`Friendly`
}
]
},
xh={
distance:vh,
activity:yh,
reaction:bh
},
Sh=_h,
Ch=JSON.parse(JSON.stringify({
ancestry:{
name:`Rival Crawlers - Ancestry`,
rulesSection:``,
description:``,
dieType:`d12`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:1,
maxRange:4,
name:`Human`
},
{
minRange:5,
maxRange:6,
name:`Elf`
},
{
minRange:7,
maxRange:8,
name:`Dwarf`
},
{
minRange:9,
maxRange:10,
name:`Halfling`
},
{
minRange:11,
maxRange:11,
name:`Half-orc`
},
{
minRange:12,
maxRange:12,
name:`Goblin`
}
]
},
class:{
name:`Rival Crawlers - Class`,
rulesSection:``,
description:``,
dieType:`d4`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Fighter`
},
{
minRange:0,
maxRange:0,
name:`Thief`
},
{
minRange:0,
maxRange:0,
name:`Priest`
},
{
minRange:0,
maxRange:0,
name:`Wizard`
}
]
},
alignment:{
name:`Rival Crawlers - Party Alignment`,
rulesSection:``,
description:``,
dieType:`d6`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:1,
maxRange:3,
name:`Lawful`
},
{
minRange:4,
maxRange:4,
name:`Neutral`
},
{
minRange:5,
maxRange:6,
name:`Chaotic`
}
]
},
renown:{
name:`Rival Crawlers - Renown`,
rulesSection:``,
description:``,
dieType:`d5`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:1,
maxRange:1,
name:`Unknown`
},
{
minRange:2,
maxRange:3,
name:`Locally known`
},
{
minRange:4,
maxRange:5,
name:`Widely recognized`
},
{
minRange:6,
maxRange:6,
name:`Extremely famous`
}
]
},
secret:{
name:`Rival Crawlers - Secret`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d14`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Seek to atone for a past betrayal`
},
{
minRange:0,
maxRange:0,
name:`Conceal the existence of a forbidden artifact`
},
{
minRange:0,
maxRange:0,
name:`Descendants of an ancient bloodline`
},
{
minRange:0,
maxRange:0,
name:`Made a pact with otherworldly entities`
},
{
minRange:0,
maxRange:0,
name:`Cursed with lycanthropy`
},
{
minRange:0,
maxRange:0,
name:`Keepers of a cryptic apocalyptic prophecy`
},
{
minRange:0,
maxRange:0,
name:`Seek an artifact capable of breaking theircurse`
},
{
minRange:0,
maxRange:0,
name:`Operate a secret network of spys across the realm`
},
{
minRange:0,
maxRange:0,
name:`Are owed a favor by a primordial elemental`
},
{
minRange:0,
maxRange:0,
name:`Are blacksheep from various wealthy families`
},
{
minRange:0,
maxRange:0,
name:`Guardians of a gateway to a secret realm`
},
{
minRange:0,
maxRange:0,
name:`Are in debt to a powerful Fey`
},
{
minRange:0,
maxRange:0,
name:`We are not 'the Dread Pirate Roberts'`
},
{
minRange:0,
maxRange:0,
name:`Steal their treasure rather than crawl for it.`
}
]
},
wealth:{
name:`Wealth`,
rulesSection:``,
description:``,
dieType:`d5`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:1,
maxRange:1,
name:`Poor`
},
{
minRange:2,
maxRange:3,
name:`Standard`
},
{
minRange:4,
maxRange:5,
name:`Wealthy`
},
{
minRange:6,
maxRange:6,
name:`Extravagant`
}
]
},
namestart:{
name:`Rival Crawlers - Name Start`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d21`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`The Abyssal`
},
{
minRange:0,
maxRange:0,
name:`The Ashen`
},
{
minRange:0,
maxRange:0,
name:`The Crimson`
},
{
minRange:0,
maxRange:0,
name:`The Cursed`
},
{
minRange:0,
maxRange:0,
name:`The Dreadborne`
},
{
minRange:0,
maxRange:0,
name:`The Ebon`
},
{
minRange:0,
maxRange:0,
name:`The Enigma`
},
{
minRange:0,
maxRange:0,
name:`The Forgotten`
},
{
minRange:0,
maxRange:0,
name:`The Frostfire`
},
{
minRange:0,
maxRange:0,
name:`The Ironclad`
},
{
minRange:0,
maxRange:0,
name:`The Moonlit`
},
{
minRange:0,
maxRange:0,
name:`The Nightfall`
},
{
minRange:0,
maxRange:0,
name:`The Obsidian`
},
{
minRange:0,
maxRange:0,
name:`The Sanguine`
},
{
minRange:0,
maxRange:0,
name:`The Serpent's`
},
{
minRange:0,
maxRange:0,
name:`The Shadow`
},
{
minRange:0,
maxRange:0,
name:`The Shadowbound`
},
{
minRange:0,
maxRange:0,
name:`The Silent`
},
{
minRange:0,
maxRange:0,
name:`The Soulbound`
},
{
minRange:0,
maxRange:0,
name:`The Stormborn`
},
{
minRange:0,
maxRange:0,
name:`The Whispering`
}
]
},
nameend:{
name:`Rival Crawlers - Name End`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d20`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Blades`
},
{
minRange:0,
maxRange:0,
name:`Brotherhood`
},
{
minRange:0,
maxRange:0,
name:`Company`
},
{
minRange:0,
maxRange:0,
name:`Coven`
},
{
minRange:0,
maxRange:0,
name:`Covenant`
},
{
minRange:0,
maxRange:0,
name:`Crows`
},
{
minRange:0,
maxRange:0,
name:`Embrace`
},
{
minRange:0,
maxRange:0,
name:`Foxes`
},
{
minRange:0,
maxRange:0,
name:`Guard`
},
{
minRange:0,
maxRange:0,
name:`Legion`
},
{
minRange:0,
maxRange:0,
name:`Marauders`
},
{
minRange:0,
maxRange:0,
name:`Raiders`
},
{
minRange:0,
maxRange:0,
name:`Reavers`
},
{
minRange:0,
maxRange:0,
name:`Requiem`
},
{
minRange:0,
maxRange:0,
name:`Sisters`
},
{
minRange:0,
maxRange:0,
name:`Swords`
},
{
minRange:0,
maxRange:0,
name:`Syndicate`
},
{
minRange:0,
maxRange:0,
name:`Vanguard`
},
{
minRange:0,
maxRange:0,
name:`Veil`
},
{
minRange:0,
maxRange:0,
name:`Vipers`
}
]
},
knownfor:{
name:`Rival Crawlers - Known For`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d21`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Raiding a cursed ghost ship`
},
{
minRange:0,
maxRange:0,
name:`Avenging their fallen comrades`
},
{
minRange:0,
maxRange:0,
name:`Cleansing a forgotten sanctuary`
},
{
minRange:0,
maxRange:0,
name:`Restoring an ancient forest`
},
{
minRange:0,
maxRange:0,
name:`Surviving a devastating storm`
},
{
minRange:0,
maxRange:0,
name:`Stealing an ancient tome of secrets`
},
{
minRange:0,
maxRange:0,
name:`Betraying a patron`
},
{
minRange:0,
maxRange:0,
name:`Summoning a powerful elemental`
},
{
minRange:0,
maxRange:0,
name:`Lifting a curse from a village (accidentally)`
},
{
minRange:0,
maxRange:0,
name:`Their dazzling, golden armor`
},
{
minRange:0,
maxRange:0,
name:`Their relentless exploration style`
},
{
minRange:0,
maxRange:0,
name:`Their determination and unyielding loyalty`
},
{
minRange:0,
maxRange:0,
name:`Their mastery of stealth and manipulation`
},
{
minRange:0,
maxRange:0,
name:`Ferocity and thrill in battle`
},
{
minRange:0,
maxRange:0,
name:`Striking with brutal efficiency`
},
{
minRange:0,
maxRange:0,
name:`Their mystic practices`
},
{
minRange:0,
maxRange:0,
name:`Their resonance with nature`
},
{
minRange:0,
maxRange:0,
name:`Cunning strategies and clever tactics`
},
{
minRange:0,
maxRange:0,
name:`Exploring an abyssal underworld`
},
{
minRange:0,
maxRange:0,
name:`Possessing a somber and mournful aura`
},
{
minRange:0,
maxRange:0,
name:`Their lack of mercy`
}
]
},
tacticslawful:{
name:`Rival Crawlers - Lawful Tactics`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d4`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Shield wall`
},
{
minRange:0,
maxRange:0,
name:`Specialized formations`
},
{
minRange:0,
maxRange:0,
name:`Code of honor`
},
{
minRange:0,
maxRange:0,
name:`Lawful intimidation`
}
]
},
tacticsneutral:{
name:`Rival Crawlers - Neutral Tactics`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d4`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Observation and analysis`
},
{
minRange:0,
maxRange:0,
name:`Pragmatism over honor`
},
{
minRange:0,
maxRange:0,
name:`Opportunistic strikes`
},
{
minRange:0,
maxRange:0,
name:`Balanced approach`
}
]
},
tacticschaotic:{
name:`Rival Crawlers - Chaotic Tactics`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d4`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Hit and run`
},
{
minRange:0,
maxRange:0,
name:`Tricks/Illusions`
},
{
minRange:0,
maxRange:0,
name:`Sabotage`
},
{
minRange:0,
maxRange:0,
name:`Isolate/eliminate`
}
]
}
}),
(e,
t)=>e===`rollType`&&typeof t==`string`?Jp[
t
]:t),
wh=JSON.parse(JSON.stringify({
dangerlevel:{
name:`Danger Level`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d10`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:1,
maxRange:4,
name:`Unsafe`
},
{
minRange:5,
maxRange:7,
name:`Risky`
},
{
minRange:8,
maxRange:10,
name:`Deadly`
}
]
},
sitesize:{
name:`Site Size`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d7`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:1,
maxRange:2,
name:`Small`,
description:5
},
{
minRange:3,
maxRange:5,
name:`Medium`,
description:8
},
{
minRange:6,
maxRange:7,
name:`Large`,
description:12
}
]
},
sitetype:{
name:`Site Type`,
rulesSection:`Shadowdark Maps, v1, p130-131`,
description:``,
dieType:`d6`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:1,
maxRange:2,
name:`Cave`
},
{
minRange:3,
maxRange:3,
name:`Tomb`
},
{
minRange:4,
maxRange:4,
name:`Deep Tunnels`
},
{
minRange:5,
maxRange:6,
name:`Ruins`
}
]
},
roomtype:{
name:`Room Type`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d12`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:1,
maxRange:2,
name:`Empty`
},
{
minRange:3,
maxRange:4,
name:`Trick/Trap`
},
{
minRange:5,
maxRange:5,
name:`Faction`
},
{
minRange:6,
maxRange:6,
name:`NPCs`
},
{
minRange:7,
maxRange:8,
name:`Monster`
},
{
minRange:9,
maxRange:9,
name:`Flora/Fauna`
},
{
minRange:10,
maxRange:10,
name:`Feature`
},
{
minRange:11,
maxRange:11,
name:`Treasure`
},
{
minRange:12,
maxRange:12,
name:`Objective`
}
]
},
"trick/trap":{
name:`Tricks/Traps`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d9`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Damaging Trap`
},
{
minRange:0,
maxRange:0,
name:`Holding Trap`
},
{
minRange:0,
maxRange:0,
name:`Obstacle blocking progress`
},
{
minRange:0,
maxRange:0,
name:`Obstacle blocking retreat`
},
{
minRange:0,
maxRange:0,
name:`Weakening Trap`
},
{
minRange:0,
maxRange:0,
name:`Terrain changes`
},
{
minRange:0,
maxRange:0,
name:`Illusory Obstacle`
},
{
minRange:0,
maxRange:0,
name:`Magical Effect`
},
{
minRange:0,
maxRange:0,
name:`Creature Trap`
}
]
},
faction:{
name:`Faction`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d7`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Base`
},
{
minRange:0,
maxRange:0,
name:`Individual`
},
{
minRange:0,
maxRange:0,
name:`Group`
},
{
minRange:0,
maxRange:0,
name:`Hunting Party`
},
{
minRange:0,
maxRange:0,
name:`Hideout/Concealed`
},
{
minRange:0,
maxRange:0,
name:`Wounded`
},
{
minRange:0,
maxRange:0,
name:`Dead/Remains`
}
]
},
npcs:{
name:`NPCs`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d8`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Individual`
},
{
minRange:0,
maxRange:0,
name:`Group`
},
{
minRange:0,
maxRange:0,
name:`Wounded`
},
{
minRange:0,
maxRange:0,
name:`Hiding`
},
{
minRange:0,
maxRange:0,
name:`Camp`
},
{
minRange:0,
maxRange:0,
name:`Remains`
},
{
minRange:0,
maxRange:0,
name:`Trapped`
},
{
minRange:0,
maxRange:0,
name:`Captured`
}
]
},
monster:{
name:`Monster`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d10`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Weak Individual`
},
{
minRange:0,
maxRange:0,
name:`Standard Individual`
},
{
minRange:0,
maxRange:0,
name:`Elite Individual`
},
{
minRange:0,
maxRange:0,
name:`Weak Group`
},
{
minRange:0,
maxRange:0,
name:`Standard Group`
},
{
minRange:0,
maxRange:0,
name:`Elite Group`
},
{
minRange:0,
maxRange:0,
name:`Mixed Group`
},
{
minRange:0,
maxRange:0,
name:`Guards`
},
{
minRange:0,
maxRange:0,
name:`Hunters`
},
{
minRange:0,
maxRange:0,
name:`Ambush`
}
]
},
"flora/fauna":{
name:`Flora/Fauna`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d6`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Harmless Plantlife`
},
{
minRange:0,
maxRange:0,
name:`Hazardous Plantlife`
},
{
minRange:0,
maxRange:0,
name:`Dangerous Plantlife`
},
{
minRange:0,
maxRange:0,
name:`Harmless Wildlife`
},
{
minRange:0,
maxRange:0,
name:`Possibly Dangerous Wildlife`
},
{
minRange:0,
maxRange:0,
name:`Dangerous Wildlife`
},
{
minRange:0,
maxRange:0,
name:`Nest/Den/Warren`
}
]
},
feature:{
name:`Feature`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d7`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Fountain`
},
{
minRange:0,
maxRange:0,
name:`Pool/Stream/Well`
},
{
minRange:0,
maxRange:0,
name:`Statue`
},
{
minRange:0,
maxRange:0,
name:`Shrine`
},
{
minRange:0,
maxRange:0,
name:`Base/Camp`
},
{
minRange:0,
maxRange:0,
name:`Tomb`
},
{
minRange:0,
maxRange:0,
name:`Ruins`
}
]
},
treasure:{
name:`Treasure`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d7`,
rollType:`Range`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:1,
maxRange:1,
name:`Hidden`
},
{
minRange:2,
maxRange:2,
name:`Owned Stash`
},
{
minRange:3,
maxRange:3,
name:`Actively Held`
},
{
minRange:4,
maxRange:5,
name:`Guarded`
},
{
minRange:6,
maxRange:7,
name:`Protected`
}
]
},
objective:{
name:`Objective`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d4`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Boss`
},
{
minRange:0,
maxRange:0,
name:`Altar/Sacred Location`
},
{
minRange:0,
maxRange:0,
name:`Prisoner/Target`
},
{
minRange:0,
maxRange:0,
name:`Item/Information`
}
]
}
}),
(e,
t)=>e===`rollType`&&typeof t==`string`?Jp[
t
]:t),
Th=s({
default:()=>Nh,
interestingcustomer:()=>Mh,
knownfor:()=>jh,
nameend:()=>Ah,
namestart:()=>kh,
poor:()=>Eh,
standard:()=>Dh,
wealthy:()=>Oh
}),
Eh={
name:`Poor Shop`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d17`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Shady Pawn Shop`
},
{
minRange:0,
maxRange:0,
name:`Crumbling Apothecary`
},
{
minRange:0,
maxRange:0,
name:`Tattered Tailor`
},
{
minRange:0,
maxRange:0,
name:`Shabby Bakery`
},
{
minRange:0,
maxRange:0,
name:`Filthy Tavern`
},
{
minRange:0,
maxRange:0,
name:`Questionable Butcher`
},
{
minRange:0,
maxRange:0,
name:`Nightsoil Collector`
},
{
minRange:0,
maxRange:0,
name:`Beggar's Guild`
},
{
minRange:0,
maxRange:0,
name:`Pawn Shop`
},
{
minRange:0,
maxRange:0,
name:`Used Armor`
},
{
minRange:0,
maxRange:0,
name:`Meager Food Stall`
},
{
minRange:0,
maxRange:0,
name:`Thieves' Hideout`
},
{
minRange:0,
maxRange:0,
name:`Pottery`
},
{
minRange:0,
maxRange:0,
name:`Makeshift Chapel`
},
{
minRange:0,
maxRange:0,
name:`Shadowy Gambling Den`
},
{
minRange:0,
maxRange:0,
name:`Chandler`
},
{
minRange:0,
maxRange:0,
name:`Tanner`
}
]
},
Dh={
name:`Standard Shop`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d17`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`General Store`
},
{
minRange:0,
maxRange:0,
name:`Blacksmith`
},
{
minRange:0,
maxRange:0,
name:`Leatherworker`
},
{
minRange:0,
maxRange:0,
name:`Herbalist`
},
{
minRange:0,
maxRange:0,
name:`Guildhall`
},
{
minRange:0,
maxRange:0,
name:`Weapons Shop`
},
{
minRange:0,
maxRange:0,
name:`Apothecary`
},
{
minRange:0,
maxRange:0,
name:`Curiosity Shop`
},
{
minRange:0,
maxRange:0,
name:`Bakery`
},
{
minRange:0,
maxRange:0,
name:`Tailor`
},
{
minRange:0,
maxRange:0,
name:`Gear and Sundries`
},
{
minRange:0,
maxRange:0,
name:`Armor Shop`
},
{
minRange:0,
maxRange:0,
name:`Tavern`
},
{
minRange:0,
maxRange:0,
name:`Inn`
},
{
minRange:0,
maxRange:0,
name:`Trinket Vendor`
},
{
minRange:0,
maxRange:0,
name:`Stables`
},
{
minRange:0,
maxRange:0,
name:`Brewer`
}
]
},
Oh={
name:`Wealthy Shop`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d17`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Exquisite Boutique`
},
{
minRange:0,
maxRange:0,
name:`Goods Importer`
},
{
minRange:0,
maxRange:0,
name:`Fine Jewelry Shop`
},
{
minRange:0,
maxRange:0,
name:`Art Gallery`
},
{
minRange:0,
maxRange:0,
name:`Theater`
},
{
minRange:0,
maxRange:0,
name:`Custom Armorer`
},
{
minRange:0,
maxRange:0,
name:`Antiques`
},
{
minRange:0,
maxRange:0,
name:`Grand Tailor`
},
{
minRange:0,
maxRange:0,
name:`Bookstore`
},
{
minRange:0,
maxRange:0,
name:`Luxury Goods`
},
{
minRange:0,
maxRange:0,
name:`Fine Wine Cellar`
},
{
minRange:0,
maxRange:0,
name:`Merchant's Guild`
},
{
minRange:0,
maxRange:0,
name:`High-End Apothecary`
},
{
minRange:0,
maxRange:0,
name:`Elite Weaponry`
},
{
minRange:0,
maxRange:0,
name:`Fine Dining`
},
{
minRange:0,
maxRange:0,
name:`Glassworks`
},
{
minRange:0,
maxRange:0,
name:`Seer/Mystic`
}
]
},
kh={
name:`Shop Generator Name Start`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d32`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`The Whispering`
},
{
minRange:0,
maxRange:0,
name:`The Midnight`
},
{
minRange:0,
maxRange:0,
name:`Agran's`
},
{
minRange:0,
maxRange:0,
name:`The Ashen`
},
{
minRange:0,
maxRange:0,
name:`Crimson`
},
{
minRange:0,
maxRange:0,
name:`Ebon`
},
{
minRange:0,
maxRange:0,
name:`Silent`
},
{
minRange:0,
maxRange:0,
name:`Forgotten`
},
{
minRange:0,
maxRange:0,
name:`Twilight`
},
{
minRange:0,
maxRange:0,
name:`Sable's`
},
{
minRange:0,
maxRange:0,
name:`The Corner`
},
{
minRange:0,
maxRange:0,
name:`Azure`
},
{
minRange:0,
maxRange:0,
name:`Hollowed`
},
{
minRange:0,
maxRange:0,
name:`Shrouded`
},
{
minRange:0,
maxRange:0,
name:`Eternal`
},
{
minRange:0,
maxRange:0,
name:`The Basilisk's`
},
{
minRange:0,
maxRange:0,
name:`Ember's`
},
{
minRange:0,
maxRange:0,
name:`Spectral`
},
{
minRange:0,
maxRange:0,
name:`Shadow's`
},
{
minRange:0,
maxRange:0,
name:`Veil of`
},
{
minRange:0,
maxRange:0,
name:`Cryptic`
},
{
minRange:0,
maxRange:0,
name:`The Timid`
},
{
minRange:0,
maxRange:0,
name:`Anton's`
},
{
minRange:0,
maxRange:0,
name:`The Raven's`
},
{
minRange:0,
maxRange:0,
name:`Mystical`
},
{
minRange:0,
maxRange:0,
name:`Grimwood's`
},
{
minRange:0,
maxRange:0,
name:`The Broken`
},
{
minRange:0,
maxRange:0,
name:`Wicked`
},
{
minRange:0,
maxRange:0,
name:`The Cursed`
},
{
minRange:0,
maxRange:0,
name:`The Haunted`
},
{
minRange:0,
maxRange:0,
name:`The Arcane`
},
{
minRange:0,
maxRange:0,
name:`The Bright`
}
]
},
Ah={
name:`Shop Generator Name End`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d32`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Cauldron`
},
{
minRange:0,
maxRange:0,
name:`Market`
},
{
minRange:0,
maxRange:0,
name:`Haven`
},
{
minRange:0,
maxRange:0,
name:`Embers`
},
{
minRange:0,
maxRange:0,
name:`Moth`
},
{
minRange:0,
maxRange:0,
name:`Shadows`
},
{
minRange:0,
maxRange:0,
name:`Serpent`
},
{
minRange:0,
maxRange:0,
name:`Enclave`
},
{
minRange:0,
maxRange:0,
name:`Bazaar`
},
{
minRange:0,
maxRange:0,
name:`Sanctum`
},
{
minRange:0,
maxRange:0,
name:`Emporium`
},
{
minRange:0,
maxRange:0,
name:`Secrets`
},
{
minRange:0,
maxRange:0,
name:`Halls`
},
{
minRange:0,
maxRange:0,
name:`Twilight`
},
{
minRange:0,
maxRange:0,
name:`Veil`
},
{
minRange:0,
maxRange:0,
name:`Grasp`
},
{
minRange:0,
maxRange:0,
name:`Whispers`
},
{
minRange:0,
maxRange:0,
name:`Eclipse`
},
{
minRange:0,
maxRange:0,
name:`Embrace`
},
{
minRange:0,
maxRange:0,
name:`Gaze`
},
{
minRange:0,
maxRange:0,
name:`Den`
},
{
minRange:0,
maxRange:0,
name:`Enigma`
},
{
minRange:0,
maxRange:0,
name:`Wares`
},
{
minRange:0,
maxRange:0,
name:`Oddments`
},
{
minRange:0,
maxRange:0,
name:`Crown`
},
{
minRange:0,
maxRange:0,
name:`Curiosities`
},
{
minRange:0,
maxRange:0,
name:`Artistry`
},
{
minRange:0,
maxRange:0,
name:`Forge`
},
{
minRange:0,
maxRange:0,
name:`Trinkets`
},
{
minRange:0,
maxRange:0,
name:`Toad`
},
{
minRange:0,
maxRange:0,
name:`Sons`
},
{
minRange:0,
maxRange:0,
name:`Daughters`
}
]
},
jh={
name:`Shop Generator Known For`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d32`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Mysterious and eccentric owner`
},
{
minRange:0,
maxRange:0,
name:`Underground deals and contraband`
},
{
minRange:0,
maxRange:0,
name:`Bargain bin treasures`
},
{
minRange:0,
maxRange:0,
name:`Unfriendly and gruff staff`
},
{
minRange:0,
maxRange:0,
name:`Unbeatable prices and discounts`
},
{
minRange:0,
maxRange:0,
name:`Unpredictable opening hours`
},
{
minRange:0,
maxRange:0,
name:`Exclusive limited edition items`
},
{
minRange:0,
maxRange:0,
name:`Hidden chambers/secret passages`
},
{
minRange:0,
maxRange:0,
name:`Shady backroom transactions`
},
{
minRange:0,
maxRange:0,
name:`Quirky and offbeat atmosphere`
},
{
minRange:0,
maxRange:0,
name:`Items of dubious origin`
},
{
minRange:0,
maxRange:0,
name:`Unreliable stock availability`
},
{
minRange:0,
maxRange:0,
name:`Unconventional payment methods accepted`
},
{
minRange:0,
maxRange:0,
name:`Curated collection of oddities`
},
{
minRange:0,
maxRange:0,
name:`Black market connections`
},
{
minRange:0,
maxRange:0,
name:`Inconsistent quality of goods`
},
{
minRange:0,
maxRange:0,
name:`Infamous for rare finds`
},
{
minRange:0,
maxRange:0,
name:`Unapologetically unique selection`
},
{
minRange:0,
maxRange:0,
name:`Gossipy and rumor-filled environment`
},
{
minRange:0,
maxRange:0,
name:`Notorious for counterfeit items`
},
{
minRange:0,
maxRange:0,
name:`Welcoming and helpful staff`
},
{
minRange:0,
maxRange:0,
name:`Discreet and confidential services`
},
{
minRange:0,
maxRange:0,
name:`Great bargaining skills`
},
{
minRange:0,
maxRange:0,
name:`Exquisite window displays`
},
{
minRange:0,
maxRange:0,
name:`Open to trade and bartering`
},
{
minRange:0,
maxRange:0,
name:`Special stock for connected customers`
},
{
minRange:0,
maxRange:0,
name:`Reliable source of local news`
},
{
minRange:0,
maxRange:0,
name:`Gathering place for townsfolk`
},
{
minRange:0,
maxRange:0,
name:`Front for illicit activities`
},
{
minRange:0,
maxRange:0,
name:`Top quality craftsmanship`
},
{
minRange:0,
maxRange:0,
name:`Owner is a huge fan of crawlers`
},
{
minRange:0,
maxRange:0,
name:`Suspected ties to a secret cult`
}
]
},
Mh={
name:`Shop Generator Interesting Customer`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d32`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Cautious elderly woman`
},
{
minRange:0,
maxRange:0,
name:`Curious teenager`
},
{
minRange:0,
maxRange:0,
name:`Wealthy merchant`
},
{
minRange:0,
maxRange:0,
name:`Inquisitive scholar`
},
{
minRange:0,
maxRange:0,
name:`Anxious new parent`
},
{
minRange:0,
maxRange:0,
name:`Peculiar street performer`
},
{
minRange:0,
maxRange:0,
name:`Haggling farmer couple`
},
{
minRange:0,
maxRange:0,
name:`Busy town guard`
},
{
minRange:0,
maxRange:0,
name:`Starry-eyed adventurer`
},
{
minRange:0,
maxRange:0,
name:`Local town crier`
},
{
minRange:0,
maxRange:0,
name:`Lonely widower`
},
{
minRange:0,
maxRange:0,
name:`Gossiping seamstress`
},
{
minRange:0,
maxRange:0,
name:`Grumpy village elder`
},
{
minRange:0,
maxRange:0,
name:`Wide-eyed orphan`
},
{
minRange:0,
maxRange:0,
name:`Wandering bard`
},
{
minRange:0,
maxRange:0,
name:`Mysterious hooded figure`
},
{
minRange:0,
maxRange:0,
name:`Eccentric artist`
},
{
minRange:0,
maxRange:0,
name:`Young apprentice`
},
{
minRange:0,
maxRange:0,
name:`Pompous nobleman`
},
{
minRange:0,
maxRange:0,
name:`Suspicious traveling merchant`
},
{
minRange:0,
maxRange:0,
name:`Chatty town drunkard`
},
{
minRange:0,
maxRange:0,
name:`Skeptical historian`
},
{
minRange:0,
maxRange:0,
name:`Timid animal lover`
},
{
minRange:0,
maxRange:0,
name:`Enthusiastic foodie`
},
{
minRange:0,
maxRange:0,
name:`Frequent shoplifter`
},
{
minRange:0,
maxRange:0,
name:`Curious scholar`
},
{
minRange:0,
maxRange:0,
name:`Boisterous bard`
},
{
minRange:0,
maxRange:0,
name:`Grizzeld mercenary`
},
{
minRange:0,
maxRange:0,
name:`Lone witch`
},
{
minRange:0,
maxRange:0,
name:`Paranormal investigator`
},
{
minRange:0,
maxRange:0,
name:`Chatty inventor`
},
{
minRange:0,
maxRange:0,
name:`Shrewd collector`
}
]
},
Nh={
poor:Eh,
standard:Dh,
wealthy:Oh,
namestart:kh,
nameend:Ah,
knownfor:jh,
interestingcustomer:Mh
},
Ph=Th,
Fh=JSON.parse(JSON.stringify({
poordrinkmenu:{
name:`Taverns`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d12`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``,
cost:``,
effect:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Bitterroot Ale`,
cost:`1cp`,
effect:`sluggish, -1 Dexterity 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Moldy Mead`,
cost:`1cp`,
effect:`allergic reaction, DC 9 CON check or Disadvantage on attacks, 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Swampwater Grog`,
cost:`1cp`,
effect:`nausea, DC 9 CON check or Disadvantage on further CON checks, 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Rotgut Whiskey`,
cost:`1cp`,
effect:`bad breath and headache, -1 Charisma 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Wilted Rose Wine`,
cost:`3cp`,
effect:`drowsey, -1 Intelligence, 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Murky Potion`,
cost:`3cp`,
effect:`+1 Strength, -1 Intelligence, -1 Wisdom, 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Rotgut Whiskey`,
cost:`3cp`,
effect:`awful!, DC 9 Wisdom check to resist ordering other drink immediately`
},
{
minRange:0,
maxRange:0,
name:`Sour Wine`,
cost:`3cp`,
effect:`dizziness, use Finesse weapons at Disadvantage, 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Bitter Grog`,
cost:`5cp`,
effect:`paranoia, DC 9 Consititution check or 'they're watching you', 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Stagnant Swamp Punch`,
cost:`5cp`,
effect:`foggy, -1 Wisdom, 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Muddy Stout`,
cost:`5cp`,
effect:`fatigued, -1 Constitution, 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Rusty Dagger Rum`,
cost:`5cp`,
effect:`weakness, -1 Strength, 1hour`
}
]
},
standarddrinkmenu:{
name:`Taverns`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d12`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``,
cost:``,
effect:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Amber Ale`,
cost:`1sp`,
effect:`+1 Charisma, 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Honeyed Mead`,
cost:`1sp`,
effect:`recover 1d2hp`
},
{
minRange:0,
maxRange:0,
name:`Oak Barrel Whiskey`,
cost:`1sp`,
effect:`next Strength check is made with Advantage, 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Spiced Mulled Wine`,
cost:`1sp`,
effect:`spicy, resist cold, 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Citrus Zest Cocktail`,
cost:`2sp`,
effect:`palate cleanser, randomly remove a drink effect`
},
{
minRange:0,
maxRange:0,
name:`Berry Infused Punch`,
cost:`2sp`,
effect:`crisp and delicious`
},
{
minRange:0,
maxRange:0,
name:`Smoky Black IPA`,
cost:`2sp`,
effect:`next stealth attempt within 1 hour made with Advantage`
},
{
minRange:0,
maxRange:0,
name:`Mulberry Cider`,
cost:`2sp`,
effect:`for 1 hour, prevents the next negative drink effect`
},
{
minRange:0,
maxRange:0,
name:`Shadowfire Ale`,
cost:`3sp`,
effect:`warms all the way down`
},
{
minRange:0,
maxRange:0,
name:`Moonberry Elixir`,
cost:`3sp`,
effect:`for 1 hour, your next spell is cast with Advantage`
},
{
minRange:0,
maxRange:0,
name:`Thunderbolt Cider`,
cost:`3sp`,
effect:`next Dexterity check is made with Advantage, 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Starlight Tea`,
cost:`3sp`,
effect:`next Wisdom check is made with Advantage, 1 hour`
}
]
},
wealthydrinkmenu:{
name:`Taverns`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d12`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``,
cost:``,
effect:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Golden Amber Lager`,
cost:`5sp`,
effect:`for 1 hour, advantage on your next melee attack`
},
{
minRange:0,
maxRange:0,
name:`Royal Reserve Mead`,
cost:`5sp`,
effect:`next positive drink effect lasts twice as long`
},
{
minRange:0,
maxRange:0,
name:`Aged Oak Whiskey`,
cost:`5sp`,
effect:`+1 Strength, 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Vintage Red Wine`,
cost:`5sp`,
effect:`just plain delicious`
},
{
minRange:0,
maxRange:0,
name:`Elven Elixir Cocktail`,
cost:`1gp`,
effect:`for 1 hour, advantage on your next ranged attack`
},
{
minRange:0,
maxRange:0,
name:`Essence of Firewater`,
cost:`1gp`,
effect:`no further drink effects can take hold, 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Moonbeam Elixir`,
cost:`1gp`,
effect:`+1 to Spellcasting attribute, 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Wyvern's Breath Whiskey`,
cost:`1gp`,
effect:`-1 damage from fire, 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Bloodroot Elixir`,
cost:`2gp`,
effect:`refreshing!, recover 1d4hp`
},
{
minRange:0,
maxRange:0,
name:`Moonshade Liqueur`,
cost:`2gp`,
effect:`+1 Dexterity, 1 hour`
},
{
minRange:0,
maxRange:0,
name:`Ironbark Stout`,
cost:`2gp`,
effect:`+1 Constitution, 1 hour; DC 9 Constitution check removes a disease`
},
{
minRange:0,
maxRange:0,
name:`Witchwood Tea`,
cost:`5gp`,
effect:`10% chance to gain a Luck token (once per day)`
}
]
}
}),
(e,
t)=>e===`rollType`&&typeof t==`string`?Jp[
t
]:t),
Ih=JSON.parse(JSON.stringify({
namea:{
name:`Taverns`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d45`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`The Royal`
},
{
minRange:0,
maxRange:0,
name:`The Old`
},
{
minRange:0,
maxRange:0,
name:`The Brazen`
},
{
minRange:0,
maxRange:0,
name:`The Bingly`
},
{
minRange:0,
maxRange:0,
name:`Pesant's`
},
{
minRange:0,
maxRange:0,
name:`The Boot and`
},
{
minRange:0,
maxRange:0,
name:`The Lamb and`
},
{
minRange:0,
maxRange:0,
name:`The Fighting`
},
{
minRange:0,
maxRange:0,
name:`The White`
},
{
minRange:0,
maxRange:0,
name:`The Velvet`
},
{
minRange:0,
maxRange:0,
name:`The Surley`
},
{
minRange:0,
maxRange:0,
name:`The Worried`
},
{
minRange:0,
maxRange:0,
name:`The Black`
},
{
minRange:0,
maxRange:0,
name:`The Helm and`
},
{
minRange:0,
maxRange:0,
name:`The Fiery`
},
{
minRange:0,
maxRange:0,
name:`Death's`
},
{
minRange:0,
maxRange:0,
name:`The Shield and`
},
{
minRange:0,
maxRange:0,
name:`The Lady's`
},
{
minRange:0,
maxRange:0,
name:`The Board and`
},
{
minRange:0,
maxRange:0,
name:`The Mug and`
},
{
minRange:0,
maxRange:0,
name:`The Wandering`
},
{
minRange:0,
maxRange:0,
name:`The Blackened`
},
{
minRange:0,
maxRange:0,
name:`The Rusty`
},
{
minRange:0,
maxRange:0,
name:`The Cursed`
},
{
minRange:0,
maxRange:0,
name:`The Grim`
},
{
minRange:0,
maxRange:0,
name:`The Dragon's`
},
{
minRange:0,
maxRange:0,
name:`The Whispering`
},
{
minRange:0,
maxRange:0,
name:`The Haunted`
},
{
minRange:0,
maxRange:0,
name:`The Shadowed`
},
{
minRange:0,
maxRange:0,
name:`The Thirsty`
},
{
minRange:0,
maxRange:0,
name:`The Iron`
},
{
minRange:0,
maxRange:0,
name:`The Howling`
},
{
minRange:0,
maxRange:0,
name:`The Fallen`
},
{
minRange:0,
maxRange:0,
name:`The Silent`
},
{
minRange:0,
maxRange:0,
name:`The Broken`
},
{
minRange:0,
maxRange:0,
name:`The Siren's`
},
{
minRange:0,
maxRange:0,
name:`The Embered`
},
{
minRange:0,
maxRange:0,
name:`The Moonglow`
},
{
minRange:0,
maxRange:0,
name:`The Forgotten`
},
{
minRange:0,
maxRange:0,
name:`The Enchanted`
},
{
minRange:0,
maxRange:0,
name:`The Raven's`
},
{
minRange:0,
maxRange:0,
name:`The Drunken`
},
{
minRange:0,
maxRange:0,
name:`The Misty`
},
{
minRange:0,
maxRange:0,
name:`The Bloodied`
},
{
minRange:0,
maxRange:0,
name:`The Stumbling`
}
]
},
nameb:{
name:`Taverns`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d45`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Standard`
},
{
minRange:0,
maxRange:0,
name:`Road`
},
{
minRange:0,
maxRange:0,
name:`Scythe`
},
{
minRange:0,
maxRange:0,
name:`Arms`
},
{
minRange:0,
maxRange:0,
name:`House`
},
{
minRange:0,
maxRange:0,
name:`Roosters`
},
{
minRange:0,
maxRange:0,
name:`Ferry Boat`
},
{
minRange:0,
maxRange:0,
name:`Barrels`
},
{
minRange:0,
maxRange:0,
name:`Bindle`
},
{
minRange:0,
maxRange:0,
name:`Dagger`
},
{
minRange:0,
maxRange:0,
name:`Dragon`
},
{
minRange:0,
maxRange:0,
name:`Hedgehog`
},
{
minRange:0,
maxRange:0,
name:`Horse`
},
{
minRange:0,
maxRange:0,
name:`Stingbat`
},
{
minRange:0,
maxRange:0,
name:`Toad`
},
{
minRange:0,
maxRange:0,
name:`Boar`
},
{
minRange:0,
maxRange:0,
name:`Torch`
},
{
minRange:0,
maxRange:0,
name:`Wand`
},
{
minRange:0,
maxRange:0,
name:`Sword`
},
{
minRange:0,
maxRange:0,
name:`Hammer`
},
{
minRange:0,
maxRange:0,
name:`Wyvern`
},
{
minRange:0,
maxRange:0,
name:`Blade`
},
{
minRange:0,
maxRange:0,
name:`Tankard`
},
{
minRange:0,
maxRange:0,
name:`Cauldron`
},
{
minRange:0,
maxRange:0,
name:`Goblin`
},
{
minRange:0,
maxRange:0,
name:`Breath`
},
{
minRange:0,
maxRange:0,
name:`Oak`
},
{
minRange:0,
maxRange:0,
name:`Harp`
},
{
minRange:0,
maxRange:0,
name:`Scepter`
},
{
minRange:0,
maxRange:0,
name:`Gargoyle`
},
{
minRange:0,
maxRange:0,
name:`Boar Inn`
},
{
minRange:0,
maxRange:0,
name:`Wolf`
},
{
minRange:0,
maxRange:0,
name:`Star`
},
{
minRange:0,
maxRange:0,
name:`Serpent`
},
{
minRange:0,
maxRange:0,
name:`Mug`
},
{
minRange:0,
maxRange:0,
name:`Song`
},
{
minRange:0,
maxRange:0,
name:`Hearth`
},
{
minRange:0,
maxRange:0,
name:`Tavern`
},
{
minRange:0,
maxRange:0,
name:`Cellar`
},
{
minRange:0,
maxRange:0,
name:`Chalice`
},
{
minRange:0,
maxRange:0,
name:`Roost`
},
{
minRange:0,
maxRange:0,
name:`Kraken`
},
{
minRange:0,
maxRange:0,
name:`Moon Inn`
},
{
minRange:0,
maxRange:0,
name:`Anvil`
},
{
minRange:0,
maxRange:0,
name:`Skeleton`
}
]
},
knownfor:{
name:`Taverns`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d45`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Amature performers/musicians`
},
{
minRange:0,
maxRange:0,
name:`Selling black-market goods`
},
{
minRange:0,
maxRange:0,
name:`Exclusively serving Lawful clientele`
},
{
minRange:0,
maxRange:0,
name:`Watered-down drinks (all drinks 1/2 effect)`
},
{
minRange:0,
maxRange:0,
name:`Caters to out-of-towners`
},
{
minRange:0,
maxRange:0,
name:`Gambling is encouraged`
},
{
minRange:0,
maxRange:0,
name:`[Random Class/Profession] hangout`
},
{
minRange:0,
maxRange:0,
name:`Mercenary Hiring Hub`
},
{
minRange:0,
maxRange:0,
name:`Frequented by the local Lord`
},
{
minRange:0,
maxRange:0,
name:`Disallows bladed weapons (safety first)`
},
{
minRange:0,
maxRange:0,
name:`Rude Bar Staff`
},
{
minRange:0,
maxRange:0,
name:`Front for the Theive's Guild`
},
{
minRange:0,
maxRange:0,
name:`Rough bouncers`
},
{
minRange:0,
maxRange:0,
name:`Strict no-magic policy`
},
{
minRange:0,
maxRange:0,
name:`Serious pickpocketing problem`
},
{
minRange:0,
maxRange:0,
name:`Rumor mill (owner is a rich source of local rumors)`
},
{
minRange:0,
maxRange:0,
name:`Fine tapestries`
},
{
minRange:0,
maxRange:0,
name:`Overcharging non-regualrs`
},
{
minRange:0,
maxRange:0,
name:`Giving free meals to the poor out back`
},
{
minRange:0,
maxRange:0,
name:`Frequent brawls among patrons`
},
{
minRange:0,
maxRange:0,
name:`Drunken Bard Karaoke`
},
{
minRange:0,
maxRange:0,
name:`Rare Monster Trophy Collection`
},
{
minRange:0,
maxRange:0,
name:`Mystic Corner, see your future!`
},
{
minRange:0,
maxRange:0,
name:`V.I.P. Private Room`
},
{
minRange:0,
maxRange:0,
name:`Famous Adventurer Hangout`
},
{
minRange:0,
maxRange:0,
name:`Friendly Animal Companion`
},
{
minRange:0,
maxRange:0,
name:`Accursed Relic`
},
{
minRange:0,
maxRange:0,
name:`Curio Market`
},
{
minRange:0,
maxRange:0,
name:`Unbreakable Barmaid`
},
{
minRange:0,
maxRange:0,
name:`Secret Underground Meeting Spot`
},
{
minRange:0,
maxRange:0,
name:`Vermin Infestation`
},
{
minRange:0,
maxRange:0,
name:`Haunted History`
},
{
minRange:0,
maxRange:0,
name:`Unwelcome Local Ruffians`
},
{
minRange:0,
maxRange:0,
name:`Notorious Gambling Den`
},
{
minRange:0,
maxRange:0,
name:`Hall of Champions`
},
{
minRange:0,
maxRange:0,
name:`Dull Atmosphere`
},
{
minRange:0,
maxRange:0,
name:`Unreliable Tap`
},
{
minRange:0,
maxRange:0,
name:`Crooked Card Games`
},
{
minRange:0,
maxRange:0,
name:`Leaky Roof`
},
{
minRange:0,
maxRange:0,
name:`Mismatched Cutlery`
},
{
minRange:0,
maxRange:0,
name:`Broken Fireplace`
},
{
minRange:0,
maxRange:0,
name:`Uninspiring 'Specials'`
},
{
minRange:0,
maxRange:0,
name:`Limited Menu`
},
{
minRange:0,
maxRange:0,
name:`Filthy Common Room`
},
{
minRange:0,
maxRange:0,
name:`Shabby Accommodations`
}
]
},
poormenu:{
name:`Taverns`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d16`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Mystery Meat Stew`
},
{
minRange:0,
maxRange:0,
name:`Burnt Sausage Surprise`
},
{
minRange:0,
maxRange:0,
name:`Watery Soup with Mystery Fish`
},
{
minRange:0,
maxRange:0,
name:`Peasant's Porridge`
},
{
minRange:0,
maxRange:0,
name:`Squashed Beetle Salad`
},
{
minRange:0,
maxRange:0,
name:`Over-Salted Roast`
},
{
minRange:0,
maxRange:0,
name:`Watery Vegetable Stew`
},
{
minRange:0,
maxRange:0,
name:`Grilled Raccoon`
},
{
minRange:0,
maxRange:0,
name:`Bread and Moldy Cheese`
},
{
minRange:0,
maxRange:0,
name:`Soggy Fungus Fritters`
},
{
minRange:0,
maxRange:0,
name:`Grilled Raccoon`
},
{
minRange:0,
maxRange:0,
name:`Sausage and Bean Casserole`
},
{
minRange:0,
maxRange:0,
name:`Vegetable Stew`
},
{
minRange:0,
maxRange:0,
name:`Roasted Rabbit`
},
{
minRange:0,
maxRange:0,
name:`Fried Fish`
},
{
minRange:0,
maxRange:0,
name:`Meat Pie`
}
]
},
standardmenu:{
name:`Taverns`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d16`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Roasted Wyvern Drumsticks`
},
{
minRange:0,
maxRange:0,
name:`Mushroom and Venison Stew`
},
{
minRange:0,
maxRange:0,
name:`Grilled Dragonfish with Blood Orange Glaze`
},
{
minRange:0,
maxRange:0,
name:`Spiced Gargoyle Roast`
},
{
minRange:0,
maxRange:0,
name:`Shadowleaf Salad with Smoked Viper Meat`
},
{
minRange:0,
maxRange:0,
name:`Dark Chocolate and Blackberry Tart`
},
{
minRange:0,
maxRange:0,
name:`Smoked Venison with Wild Berry Glaze`
},
{
minRange:0,
maxRange:0,
name:`Spiced Wyrm Meat Pie`
},
{
minRange:0,
maxRange:0,
name:`Herb-Roasted Salamander`
},
{
minRange:0,
maxRange:0,
name:`Forest Mushroom Risotto`
},
{
minRange:0,
maxRange:0,
name:`Grilled Darkfish with Citrus Butter`
},
{
minRange:0,
maxRange:0,
name:`Honey-Glazed Roasted Root Vegetables`
},
{
minRange:0,
maxRange:0,
name:`Vegetable Stew`
},
{
minRange:0,
maxRange:0,
name:`Roasted Rabbit`
},
{
minRange:0,
maxRange:0,
name:`Fried Fish`
},
{
minRange:0,
maxRange:0,
name:`Meat Pie`
}
]
},
wealthymenu:{
name:`Taverns`,
rulesSection:`Original Content - Cesidio`,
description:``,
dieType:`d16`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Shadow Veil Seafood Paella`
},
{
minRange:0,
maxRange:0,
name:`Bloodwood Grilled Venison`
},
{
minRange:0,
maxRange:0,
name:`Essence of Nightshade Risotto`
},
{
minRange:0,
maxRange:0,
name:`Elven Delicacy Stuffed Quail`
},
{
minRange:0,
maxRange:0,
name:`Haunted Forest Mushroom Medley`
},
{
minRange:0,
maxRange:0,
name:`Shadow Veil Risotto`
},
{
minRange:0,
maxRange:0,
name:`Braised Troll Shank in Red Wine Reduction`
},
{
minRange:0,
maxRange:0,
name:`Dark Forest Salad with Blood Moon Vinaigrette`
},
{
minRange:0,
maxRange:0,
name:`Abyssal Lobster Bisque`
},
{
minRange:0,
maxRange:0,
name:`Forbidden Chocolate Delight`
},
{
minRange:0,
maxRange:0,
name:`Herb-Crusted Rack of Lamb`
},
{
minRange:0,
maxRange:0,
name:`Beetroot and Goat Cheese Salad`
},
{
minRange:0,
maxRange:0,
name:`Shadow Fish`
},
{
minRange:0,
maxRange:0,
name:`Giant's Delight`
},
{
minRange:0,
maxRange:0,
name:`Minotaur Tenderloin`
},
{
minRange:0,
maxRange:0,
name:`Fae Fruit Salad`
}
]
}
}),
(e,
t)=>e===`rollType`&&typeof t==`string`?Jp[
t
]:t),
Lh=s({
damage:()=>Bh,
default:()=>Vh,
trap:()=>Rh,
trigger:()=>zh
}),
Rh={
name:`Traps - Trap`,
rulesSection:`Original Content - Cesidio`,
description:`Trap`,
dieType:`d16`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`Pit, 10' deep`
},
{
minRange:0,
maxRange:0,
name:`Pit w/spikes, 10' deep`
},
{
minRange:0,
maxRange:0,
name:`Wall 10' behind slides to block passage`
},
{
minRange:0,
maxRange:0,
name:`Oil pours from ceiling, ignites`
},
{
minRange:0,
maxRange:0,
name:`Arrow Trap (1 in 10 poisoned)`
},
{
minRange:0,
maxRange:0,
name:`Spear Trap (1 in 10 poisoned)`
},
{
minRange:0,
maxRange:0,
name:`Fungal Spores`
},
{
minRange:0,
maxRange:0,
name:`Gas Trap (blinding, poision, sleep, etc.)`
},
{
minRange:0,
maxRange:0,
name:`Chute down 1 level`
},
{
minRange:0,
maxRange:0,
name:`Falling Debris`
},
{
minRange:0,
maxRange:0,
name:`Swinging log/boulder`
},
{
minRange:0,
maxRange:0,
name:`Last door passed through shuts/locks`
},
{
minRange:0,
maxRange:0,
name:`Spiked ceiling drops`
},
{
minRange:0,
maxRange:0,
name:`Insect swarm`
},
{
minRange:0,
maxRange:0,
name:`Water fills/rushes through the area`
},
{
minRange:0,
maxRange:0,
name:`Door falls outward, crushing`
}
]
},
zh={
name:`Traps - Trigger`,
rulesSection:`Original Content - Cesidio`,
description:`Trigger`,
dieType:`d16`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:0,
maxRange:0,
name:`pressure plate`
},
{
minRange:0,
maxRange:0,
name:`loose stone/floor board`
},
{
minRange:0,
maxRange:0,
name:`trip wire`
},
{
minRange:0,
maxRange:0,
name:`opening a chest/cabinate`
},
{
minRange:0,
maxRange:0,
name:`opening/closing a door`
},
{
minRange:0,
maxRange:0,
name:`disturbing a magical glyph`
},
{
minRange:0,
maxRange:0,
name:`loud sound`
},
{
minRange:0,
maxRange:0,
name:`temperature change`
},
{
minRange:0,
maxRange:0,
name:`disturb an item`
},
{
minRange:0,
maxRange:0,
name:`prying loose a gem`
},
{
minRange:0,
maxRange:0,
name:`timer/lingering in an area`
},
{
minRange:0,
maxRange:0,
name:`blood spilled`
},
{
minRange:0,
maxRange:0,
name:`light`
},
{
minRange:0,
maxRange:0,
name:`Rube Goldberg style`
},
{
minRange:0,
maxRange:0,
name:`remove book from shelf`
},
{
minRange:0,
maxRange:0,
name:`handle/lever`
}
]
},
Bh={
name:`Traps - Damage`,
rulesSection:`Traps, v1, p114`,
description:`Damage or effect.`,
dieType:`d1`,
rollType:`Index`,
emptyEntry:{
minRange:-1,
maxRange:-1,
name:``
},
entries:[
{
minRange:-1,
maxRange:-1,
name:``
}
]
},
Vh={
trap:Rh,
trigger:zh,
damage:Bh
},
Hh=Lh,
Uh=class{
type=``;
hazard=``;
getCleanType(){
return{
type:this.type,
hazard:this.hazard
}
}static getEmptyEncounterDataType(){
return{
type:``,
hazard:``
}
}
},
Wh=class{
trap=``;
trigger=``;
damage=``;
getCleanType(){
return{
trap:this.trap,
trigger:this.trigger,
damage:this.damage
}
}static getEmptyEncounterDataType(){
return{
trap:``,
trigger:``,
damage:``
}
}
},
Gh=class e{
static dCustom(e,
t){
return Math.floor(Math.random()*(t-e+1)+e)
}static dCoinFlip(){
return e.dCustom(1,
2)
}static dCoinFlipBool(){
return e.dCustom(1,
2)===1
}static parseRoll(e){
e=e.toUpperCase();
let t=e.split(`D`),
n=new Kh;
switch(t.length){
case 1:n.howMany=1,
n.numFaces=parseInt(t[
0
]),
n.adjustment=0;
break;
case 2:{
n.howMany=parseInt(t[
0
]),
n.howMany=Number.isNaN(n.howMany)?1:n.howMany,
n.adjustment=0;
let e=[

];
t[
1
].indexOf(`+`)>=0?(e=t[
1
].split(`+`),
n.numFaces=parseInt(e[
0
]),
n.adjustment=parseInt(e[
1
])):t[
1
].indexOf(`-`)>=0?(e=t[
1
].split(`-`),
n.numFaces=parseInt(e[
0
]),
n.adjustment=parseInt(e[
1
])*-1):n.numFaces=parseInt(t[
1
]);
break
}default:throw Error(`parseRoll: failed to parse rollString "${e}"`)
}return n
}static roll(t){
let n=e.parseRoll(t),
r=0;
for(let t=0;
t<n.howMany;
t++)r+=e.dCustom(1,
n.numFaces);
return r+=n.adjustment,
r
}static rollWithDetails(t){
let n=e.parseRoll(t),
r=0,
i=[

];
for(let t=0;
t<n.howMany;
t++){
let t=e.dCustom(1,
n.numFaces);
i.push(t),
r+=t
}return new qh(t,
r,
i)
}static rollWithAdvantage(t){
let n=e.rollWithDetails(t),
r=e.rollWithDetails(t),
i=new Jh;
return n.result>r.result?(i.winner=n,
i.loser=r):(i.winner=r,
i.loser=n),
i
}static rollWithDisadvantage(t){
let n=e.rollWithDetails(t),
r=e.rollWithDetails(t),
i=new Jh;
return n.result<r.result?(i.winner=n,
i.loser=r):(i.winner=r,
i.loser=n),
i
}
},
Kh=class{
howMany=0;
numFaces=0;
adjustment=0
},
qh=class{
_request;
get request(){
return this._request
}set request(e){
this._request=e
}_result;
get result(){
return this._result
}set result(e){
this._result=e
}_rolls;
get rolls(){
return this._rolls
}set rolls(e){
this._rolls=e
}constructor(e,
t,
n){
this._request=e,
this._result=t,
this._rolls=n
}
},
Jh=class{
winner=null;
loser=null
},
Yh=class{
table;
constructor(e){
this.table=e
}getEntries(e){
let t=this.scrubFactor(e);
return this.table[
t
].entries
}getIndexResult(e,
t){
let n=this.scrubFactor(e),
r=Gh.roll(this.table[
n
].dieType)-1;
if(t!==void 0&&(r=t),
r>=0&&r<=this.table[
n
].entries.length-1)return this.table[
n
].entries[
r
];
throw Error(`TwoFactorTableManager.getIndexResult - roll ${r} matches no entries.`)
}getRangeResult(e,
t){
let n=this.scrubFactor(e),
r=Gh.roll(this.table[
n
].dieType);
t!==void 0&&(r=t);
let i=this.table[
n
].entries.filter(e=>r>=e.minRange&&r<=e.maxRange);
if(i.length>=1)return i[
0
];
throw Error(`TwoFactorTableManager.getRangeResult - roll ${r} matches no entries.`)
}scrubFactor(e){
return e.replace(/[
-_ 
]/g,
``).toLowerCase()
}getRandomResult(e){
let t=this.scrubFactor(e);
switch(R.log(`getRandomResult: cleanFactor`,
t),
R.log(`getRandomResult: this.table:`,
this.table),
R.log(`getRandomResult: this.table[${t}]:`,
this.table[
t
]),
R.log(`getRandomResult: this.table.name`,
this.table[
t
].name),
this.table[
t
].rollType){
case Jp.Index:return this.getIndexResult(t);
case Jp.Range:return this.getRangeResult(t);
default:throw Error(`TwoFactorTableManager.getRandomResult: unknown rollType ${this.table.rollType}`)
}
}getResult(e,
t){
let n=this.scrubFactor(e);
switch(this.table[
n
].rollType){
case Jp.Index:return this.getIndexResult(n,
t-1);
case Jp.Range:return this.getRangeResult(n,
t);
default:throw Error(`TwoFactorTableManager.getResult: unknown rollType ${this.table[n].rollType}`)
}
}getEntryByName(e,
t){
let n=this.scrubFactor(e),
r=this.table[
n
].entries.filter(e=>t===e.name);
return r.length>=1?r[
0
]:null
}getAllEntryNames(e){
let t=this.scrubFactor(e);
return this.table[
t
].entries.map(({
name:e
})=>e)
}
},
Xh=class e{
static MagicItemSimpleTable=new Yh(rh);
static MagicItemDescriptionTable=new Yh(ih);
static rollPersonality(t,
n){
if(!n.allowPersonality){
t.nVirtues=0,
t.nFlaws=0;
return
}t.nVirtues=+e.MagicItemSimpleTable.getRandomResult(`virtuequantity`).name,
t.nFlaws=+e.MagicItemSimpleTable.getRandomResult(`flawquantity`).name;
for(let n=0;
n<t.nVirtues;
n++){
let n=e.MagicItemDescriptionTable.getRandomResult(`personalityvirtue`),
r=L.getNamedEffect(n.name,
n.description);
t.personalityVirtues.push(r)
}for(let n=0;
n<t.nFlaws;
n++){
let n=e.MagicItemDescriptionTable.getRandomResult(`personalityflaw`),
r=L.getNamedEffect(n.name,
n.description);
t.personalityFlaws.push(r)
}t.nVirtues+t.nFlaws>0&&(t.personalityTrait=e.MagicItemSimpleTable.getRandomResult(`personalitytrait`).name,
t.personalityAlignment=e.MagicItemSimpleTable.getRandomResult(`alignment`).name)
}static rollArmorProperties(t,
n){
t.type=e.MagicItemSimpleTable.getRandomResult(`armortype`).name,
t.bonus=e.MagicItemSimpleTable.getRandomResult(`armorbonus`).name,
t.feature=e.MagicItemSimpleTable.getRandomResult(`armorfeature`).name;
for(let n=0;
n<t.nBenefits;
n++){
let n=e.MagicItemDescriptionTable.getRandomResult(`armorbenefit`),
r=L.getNamedEffect(n.name,
n.description);
t.benefits.push(r)
}for(let n=0;
n<t.nCurses;
n++){
let n=e.MagicItemDescriptionTable.getRandomResult(`armorcurse`),
r=L.getNamedEffect(n.name,
n.description);
t.curses.push(r)
}
}static rollPotionProperties(t,
n){
t.type=t.itemType,
t.container=e.MagicItemSimpleTable.getRandomResult(`potioncontainer`).name,
t.liquid=e.MagicItemSimpleTable.getRandomResult(`potionliquid`).name,
t.tasteSmell=e.MagicItemSimpleTable.getRandomResult(`potiontastesmell`).name;
for(let n=0;
n<t.nBenefits;
n++){
let n=e.MagicItemDescriptionTable.getRandomResult(`potionbenefit`),
r=L.getNamedEffect(n.name,
n.description);
t.benefits.push(r)
}for(let n=0;
n<t.nCurses;
n++){
let n=e.MagicItemDescriptionTable.getRandomResult(`potioncurse`),
r=L.getNamedEffect(n.name,
n.description);
t.curses.push(r)
}
}static rollUtilityProperties(t,
n){
t.type=e.MagicItemSimpleTable.getRandomResult(`utilityitemtype`).name,
t.feature=e.MagicItemSimpleTable.getRandomResult(`utilityitemfeature`).name;
for(let n=0;
n<t.nBenefits;
n++){
let n=e.MagicItemDescriptionTable.getRandomResult(`utilitybenefit`),
r=L.getNamedEffect(n.name,
n.description);
t.benefits.push(r)
}for(let n=0;
n<t.nCurses;
n++){
let n=e.MagicItemDescriptionTable.getRandomResult(`utilitycurse`),
r=L.getNamedEffect(n.name,
n.description);
t.curses.push(r)
}
}static rollScrollProperties(t,
n){
let r=n.allowPriestSpells?e.MagicItemSimpleTable.getRandomResult(`spellclass`).name:`wizard`;
if(t.type=`Scroll`,
t.feature=e.MagicItemSimpleTable.getRandomResult(`scrollfeatures`).name,
t.spellTier=e.MagicItemSimpleTable.getRandomResult(`spelltier`).name,
t.spell=e.MagicItemSimpleTable.getRandomResult(`${r}spelltier${t.spellTier}`).name,
n.allowScrollBenefitsCurses){
let n=e.MagicItemSimpleTable.getRandomResult(`scrollwandbenefittable`).name,
r=e.MagicItemSimpleTable.getRandomResult(`scrollwandcursetable`).name;
for(let r=0;
r<t.nBenefits;
r++){
let r=e.MagicItemDescriptionTable.getRandomResult(n),
i=L.getNamedEffect(r.name,
r.description);
t.benefits.push(i)
}for(let n=0;
n<t.nCurses;
n++){
let n=e.MagicItemDescriptionTable.getRandomResult(r),
i=L.getNamedEffect(n.name,
n.description);
t.curses.push(i)
}
}else t.nBenefits=0,
t.nCurses=0
}static rollWandProperties(t,
n){
let r=n.allowPriestSpells?e.MagicItemSimpleTable.getRandomResult(`spellclass`).name:`wizard`;
t.type=`Wand`,
t.feature=e.MagicItemSimpleTable.getRandomResult(`wandfeatures`).name,
t.spellTier=e.MagicItemSimpleTable.getRandomResult(`spelltier`).name,
t.spell=e.MagicItemSimpleTable.getRandomResult(`${r}spelltier${t.spellTier}`).name;
let i=e.MagicItemSimpleTable.getRandomResult(`scrollwandbenefittable`).name,
a=e.MagicItemSimpleTable.getRandomResult(`scrollwandcursetable`).name;
for(let n=0;
n<t.nBenefits;
n++){
let r=e.MagicItemDescriptionTable.getRandomResult(i),
a=L.getNamedEffect(r.name,
r.description);
if(a.description.includes(`weapon`)){
n--;
continue
}t.benefits.push(a)
}for(let n=0;
n<t.nCurses;
n++){
let r=e.MagicItemDescriptionTable.getRandomResult(a),
i=L.getNamedEffect(r.name,
r.description);
if(i.description.includes(`weapon`)){
n--;
continue
}t.curses.push(i)
}
}static rollWeaponProperties(t,
n){
t.type=e.MagicItemSimpleTable.getRandomResult(`weapontype`).name,
t.bonus=e.MagicItemSimpleTable.getRandomResult(`weaponbonus`).name,
t.feature=e.MagicItemSimpleTable.getRandomResult(`weaponfeature`).name;
for(let n=0;
n<t.nBenefits;
n++){
let n=e.MagicItemDescriptionTable.getRandomResult(`weaponbenefit`),
r=L.getNamedEffect(n.name,
n.description);
t.benefits.push(r)
}for(let n=0;
n<t.nCurses;
n++){
let n=e.MagicItemDescriptionTable.getRandomResult(`weaponcurse`),
r=L.getNamedEffect(n.name,
n.description);
t.curses.push(r)
}
}static GenerateMagicItem(t,
n){
let r=new L;
switch(r.id=gn(),
R.log(`001 GenerateMagicItem`),
r.itemType=t===void 0||t===Tr.Empty?Tr[
e.MagicItemSimpleTable.getRandomResult(`magicitemtype`).name
]:t,
R.log(`002 GenerateMagicItem`),
r.name=r.type,
e.rollPersonality(r,
n),
R.log(`002a GenerateMagicItem: after personality result`,
r),
r.nBenefits=+e.MagicItemSimpleTable.getRandomResult(`benefitquantity`).name,
r.nCurses=+e.MagicItemSimpleTable.getRandomResult(`cursequantity`).name,
R.log(`003 getMagicItem`),
r.itemType){
case Tr.Armor:e.rollArmorProperties(r,
n);
break;
case Tr.Potion:e.rollPotionProperties(r,
n);
break;
case Tr.Utility:e.rollUtilityProperties(r,
n);
break;
case Tr.Scroll:e.rollScrollProperties(r,
n);
break;
case Tr.Wand:e.rollWandProperties(r,
n);
break;
case Tr.Weapon:e.rollWeaponProperties(r,
n);
break;
default:throw Error(`GMTools.getMagicItem: unknown type "${r.itemType.toString()}"`)
}return R.log(`004 GenerateMagicItem: after item properties`,
r),
r.getCleanType()
}
},
Zh=class e{
static CdNpcAncestralNamesTable=new Yh(Vm);
static CdNpcNamesTable=new Yh(Jm);
static NpcTable=new Yh(gh);
static EncounterTable=new Yh(Sh);
static TrapsTable=new Yh(Hh);
static HazardsTable=new Yh(eh);
static RivalsTable=new Yh(Ch);
static ShopsTable=new Yh(Ph);
static TavernTable=new Yh(Ih);
static TavernDrinksTable=new Yh(Fh);
static SiteMapTable=new Yh(wh);
static AdventureGeneratorTable=new Yh(jm);
static AdventureSiteNameTable=new Yh(Mm);
static MagicItemSimpleTable=new Yh(rh);
static MagicItemDescriptionTable=new Yh(ih);
static getRandomEncounter(t,
n){
let r=new Hi;
return r.when=Date.now(),
r.encounterRoll=Gh.roll(`1d6`),
r.charismaMod=t,
r.distance=e.EncounterTable.getRandomResult(`distance`).name,
r.activity=e.EncounterTable.getRandomResult(`activity`).name,
r.reactionRoll=Gh.roll(`2d6`),
r.reaction=e.EncounterTable.getResult(`reaction`,
r.reactionRoll+t).name,
r.treasure=`None`,
n!==``&&(r.encounterTableRoll=Gh.roll(n)),
Gh.dCoinFlipBool()&&(r.treasure=`Yes!`),
r.getCleanType()
}static getEncounter(t,
n){
let r=e.getRandomEncounter(t,
n);
return r.encounterRoll=1,
r
}static updateEncounterReaction(t,
n){
let r={
...t
};
return r.charismaModText=n,
r.charismaMod=+n,
r.reaction=e.EncounterTable.getResult(`reaction`,
r.reactionRoll+r.charismaMod).name,
r
}static getTrap(){
let t=new Wh;
return t.trap=e.TrapsTable.getRandomResult(`trap`).name,
t.trigger=e.TrapsTable.getRandomResult(`trigger`).name,
t.damage=``,
t.getCleanType()
}static getTraps(t){
let n=[

];
for(let r=0;
r<t;
r++)n.push(e.getTrap());
return n
}static getHazard(){
let t=new Uh,
n=[
`Movement`,
`Damage`,
`Weaken`
][
Gh.dCustom(0,
2)
];
return t.type=n,
t.hazard=e.HazardsTable.getRandomResult(n.toLowerCase()).name,
t.getCleanType()
}static getHazards(t){
let n=[

];
for(let r=0;
r<t;
r++)n.push(e.getHazard());
return n
}static getNpcAncestryNames(t,
n){
let r=[

];
for(let i=0;
i<t;
i++){
let t=e.CdNpcAncestralNamesTable.getRandomResult(n).name;
r.indexOf(t)===-1?r.push(t):i--
}return r
}static getNpcNamesByAncestry(t,
n){
let r=[

];
for(let i=0;
i<t;
i++){
let t=e.CdNpcAncestralNamesTable.getRandomResult(n).name;
r.indexOf(t)===-1?r.push(t):i--
}return r
}static getNpc(t,
n){
let r=t===void 0||t===``?e.NpcTable.getRandomResult(`ancestry`).name:t,
i=n===void 0||n===``?e.NpcTable.getRandomResult(`wealth`).name:n,
a=new mi;
a.id=gn(),
a.ancestry=r,
a.wealth=i,
a.name=e.CdNpcAncestralNamesTable.getRandomResult(a.ancestry).name,
a.ancestryName=e.CdNpcAncestralNamesTable.getRandomResult(a.ancestry).name,
a.age=e.NpcTable.getRandomResult(`age`).name,
a.alignment=e.NpcTable.getRandomResult(`alignment`).name;
let o=[
`lowjobs`,
`standardjobs`
];
switch(a.wealth.toLowerCase()){
case`poor`:a.job=e.NpcTable.getRandomResult(`lowjobs`).name;
break;
case`standard`:{
let t=Gh.dCustom(0,
1);
a.job=e.NpcTable.getRandomResult(o[
t
]).name;
break
}case`wealthy`:a.job=e.NpcTable.getRandomResult(`standardjobs`).name;
break;
default:a.job=e.NpcTable.getRandomResult(`lowjobs`).name;
break
}return a.appearance=e.NpcTable.getRandomResult(`appearance`).name,
a.behavior=e.NpcTable.getRandomResult(`behavior`).name,
a.secret=e.NpcTable.getRandomResult(`secret`).name,
a.getCleanType()
}static getNpcs(t,
n,
r){
let i=[

];
for(let a=0;
a<t;
a++)i.push(e.getNpc(n,
r));
return i
}static getRivalCrawlerParty(t){
let n=new sa,
r=t===0?Gh.roll(`1d4+1`):t;
n.id=gn(),
n.size=r,
n.alignment=e.RivalsTable.getRandomResult(`alignment`).name,
n.renown=e.RivalsTable.getRandomResult(`renown`).name,
n.secret=e.RivalsTable.getRandomResult(`secret`).name,
n.wealth=e.RivalsTable.getRandomResult(`wealth`).name,
n.knownFor=e.RivalsTable.getRandomResult(`knownfor`).name,
n.name=e.getRivalCrawlerPartyName();
let i=`tactics`;
i=i.concat(n.alignment.toLowerCase()),
n.tactic=e.RivalsTable.getRandomResult(i).name;
for(let t=0;
t<n.size;
t++){
let t=e.getRivalPartyMember(n.alignment);
n.members.push(t)
}return n.getCleanType()
}static getRivalCrawlerPartyName(){
let t=``,
n=e.RivalsTable.getRandomResult(`name-start`).name,
r=e.RivalsTable.getRandomResult(`name-end`).name;
return t=n.concat(` ${r}`),
t
}static getRivalPartyMember(t){
let n=new oa;
return n.id=gn(),
n.alignment=t,
n.ancestry=e.RivalsTable.getRandomResult(`ancestry`).name,
n.class=e.RivalsTable.getRandomResult(`class`).name,
n.level=Gh.roll(`d6`),
n.name=e.CdNpcAncestralNamesTable.getRandomResult(n.ancestry).name,
n
}static getShopName(){
let t=e.ShopsTable.getRandomResult(`namestart`).name,
n=e.ShopsTable.getRandomResult(`nameend`).name;
return t.concat(` `).concat(n)
}static getShop(t){
let n=t===void 0||t===``?[
`Poor`,
`Standard`,
`Wealthy`
][
Gh.dCustom(0,
2)
]:t,
r=new ga;
return r.id=gn(),
r.tier=n,
r.name=e.getShopName(),
r.type=e.ShopsTable.getRandomResult(n.toLowerCase()).name,
r.knownFor=e.ShopsTable.getRandomResult(`knownfor`).name,
r.customer=e.ShopsTable.getRandomResult(`interestingcustomer`).name,
r.getCleanType()
}static getShops(t,
n){
let r=[

];
for(let i=0;
i<t;
i++)r.push(e.getShop(n));
return r
}static getTavernName(){
let t=e.TavernTable.getRandomResult(`name a`).name,
n=e.TavernTable.getRandomResult(`name b`).name;
return t.concat(` `).concat(n)
}static getTavernMenuItem(t){
let n=``,
r=``;
switch(t.toLowerCase()){
case`poor`:n=e.TavernTable.getRandomResult(`poor menu`).name,
r=`${Gh.roll(`d4`)} cp`;
break;
case`standard`:n=e.TavernTable.getRandomResult(`standard menu`).name,
r=`${Gh.roll(`d6`)} sp`;
break;
case`wealthy`:n=e.TavernTable.getRandomResult(`wealthy menu`).name,
r=`${Gh.roll(`d8`)} gp`;
break;
default:break
}return`${n} (${r})`
}static getTavernDrinkItem(t){
let n=`${t} drink menu`;
return e.TavernDrinksTable.getRandomResult(n)
}static getTavernFoodMenu(t,
n){
let r=[

];
for(let i=0;
i<t;
i++){
let t=e.getTavernMenuItem(n);
r.indexOf(t)===-1?r.push(t):i--
}return r
}static getTavernDrinkMenu(t,
n){
let r=[

];
for(let i=0;
i<t;
i++){
let t=e.getTavernDrinkItem(n);
r.find(e=>e.name===t.name)===void 0?r.push(t):i--
}return r
}static getTavern(t){
let n=t===void 0||t===``?[
`Poor`,
`Standard`,
`Wealthy`
][
Gh.dCustom(0,
2)
]:t,
r=new xo;
switch(r.id=gn(),
r.tier=n,
r.name=e.getTavernName(),
r.knownFor=e.TavernTable.getRandomResult(`known for`).name,
n=n.toLowerCase(),
n.toLowerCase()){
case`poor`:case`standard`:{
let t=e.getTavernFoodMenu(3,
n);
r.menu=JSON.parse(JSON.stringify(t));
let i=e.getTavernDrinkMenu(3,
n);
r.drinks=JSON.parse(JSON.stringify(i));
break
}case`wealthy`:{
let t=e.getTavernFoodMenu(1,
`standard`),
i=e.getTavernFoodMenu(2,
n);
r.menu=t.concat(i);
let a=e.getTavernDrinkMenu(3,
n);
r.drinks=JSON.parse(JSON.stringify(a));
break
}default:break
}return r.getCleanType()
}static getTaverns(t,
n){
let r=[

];
for(let i=0;
i<t;
i++)r.push(e.getTavern(n));
return r
}static getShadowDarkMapLocation(t){
let n=new Ia;
n.present=!0;
do n.type=e.SiteMapTable.getRandomResult(`roomtype`).name;
while(!t&&n.type.toLowerCase()===`empty`);
let r=n.type.toLowerCase();
switch(r){
case`empty`:n.description=`Nothing here`;
break;
case`minorhazard`:case`npc`:case`majorhazard`:case`treasure`:case`bossmonster`:case`trick/trap`:case`faction`:case`npcs`:case`monster`:case`flora/fauna`:case`feature`:case`objective`:n.description=e.SiteMapTable.getRandomResult(r).name;
break;
case`trap`:case`solo monster`:case`monster mob`:n.description=`${e.SiteMapTable.getRandomResult(`${
r
} a`).name} ${e.SiteMapTable.getRandomResult(`${
r
} b`).name}`;
break;
default:throw n.description=`something bad happened.`,
Error(`GMTools.getShadowDarkMapLocation: unknown type "${n.type.toLowerCase()}"`)
}return n
}static getSiteMapLocation(t){
let n=new Ia;
n.present=!0;
do n.type=e.SiteMapTable.getRandomResult(`roomtype`).name;
while(!t&&n.type.toLowerCase()===`empty`);
let r=n.type.toLowerCase();
switch(r){
case`empty`:n.description=`Nothing here`;
break;
case`minorhazard`:case`npc`:case`majorhazard`:case`treasure`:case`bossmonster`:case`trick/trap`:case`faction`:case`npcs`:case`monster`:case`flora/fauna`:case`feature`:case`objective`:n.description=e.SiteMapTable.getRandomResult(r).name;
break;
case`trap`:case`solo monster`:case`monster mob`:n.description=`${e.SiteMapTable.getRandomResult(`${
r
} a`).name} ${e.SiteMapTable.getRandomResult(`${
r
} b`).name}`;
break;
default:throw n.description=`something bad happened.`,
Error(`GMTools.getShadowDarkMapLocation: unknown type "${n.type.toLowerCase()}"`)
}return n.id=gn(),
n
}static populateSiteMap(t,
n){
let r=new La(t.rowDim,
t.colDim);
r.id=gn();
let i=0,
a=0;
for(;
i<n.nLocations;
){
let o=Gh.dCustom(0,
t.rowDim-1),
s=Gh.dCustom(0,
t.colDim-1);
if(r.mapArea[
o
][
s
].present)R.log(`MAP COLLISION (${o},${s}) iteration ${a}`);
else{
let t=e.getSiteMapLocation(n.allowEmptyLocations);
t.row=o,
t.column=s,
r.setLocation(o,
s,
t),
i++
}a++
}return r
}static getAdventureName(){
return`${e.AdventureGeneratorTable.getRandomResult(`adventure generator a`).name} ${e.AdventureGeneratorTable.getRandomResult(`adventure generator b`).name} ${e.AdventureGeneratorTable.getRandomResult(`adventure generator c`).name}`
}static getAdventureNames(t){
let n=[

];
for(let r=0;
r<t;
r++)n.push(e.getAdventureName());
return n
}static getAdventureSiteName(){
return`${e.AdventureSiteNameTable.getRandomResult(`adventuresitenamea`).name} ${e.AdventureSiteNameTable.getRandomResult(`adventuresitenameb`).name} ${e.AdventureSiteNameTable.getRandomResult(`adventuresitenamec`).name}`
}static getAdventureSiteNames(t){
let n=[

];
for(let r=0;
r<t;
r++)n.push(e.getAdventureSiteName());
return n
}static getAdventureDangerLevel(){
return e.SiteMapTable.getRandomResult(`danger level`).name
}static getMagicItem(t,
n){
let r=new L;
r.id=gn(),
R.log(`001 getMagicItem`),
r.itemType=t===void 0||t===Tr.Empty?Tr[
e.MagicItemSimpleTable.getRandomResult(`magicitemtype`).name
]:t,
R.log(`002 getMagicItem`),
r.name=r.type,
r.nBenefits=+e.MagicItemSimpleTable.getRandomResult(`benefitquantity`).name,
r.nCurses=+e.MagicItemSimpleTable.getRandomResult(`cursequantity`).name,
r.nVirtues=+e.MagicItemSimpleTable.getRandomResult(`virtuequantity`).name,
r.nFlaws=+e.MagicItemSimpleTable.getRandomResult(`flawquantity`).name,
R.log(`003 getMagicItem`);
for(let t=0;
t<r.nVirtues;
t++){
let t=e.MagicItemDescriptionTable.getRandomResult(`personalityvirtue`),
n=L.getNamedEffect(t.name,
t.description);
r.personalityVirtues.push(n)
}R.log(`004 getMagicItem`);
for(let t=0;
t<r.nFlaws;
t++){
let t=e.MagicItemDescriptionTable.getRandomResult(`personalityflaw`),
n=L.getNamedEffect(t.name,
t.description);
r.personalityFlaws.push(n)
}R.log(`005 getMagicItem`),
r.nVirtues+r.nFlaws>0&&(r.personalityTrait=e.MagicItemSimpleTable.getRandomResult(`personalitytrait`).name,
r.personalityAlignment=e.MagicItemSimpleTable.getRandomResult(`alignment`).name);
let i=`wizard`;
switch(R.log(`006 getMagicItem: result.itemType`,
r.itemType),
r.itemType){
case Tr.Armor:r.type=e.MagicItemSimpleTable.getRandomResult(`armortype`).name,
r.bonus=e.MagicItemSimpleTable.getRandomResult(`armorbonus`).name,
r.feature=e.MagicItemSimpleTable.getRandomResult(`armorfeature`).name;
for(let t=0;
t<r.nBenefits;
t++){
let t=e.MagicItemDescriptionTable.getRandomResult(`armorbenefit`),
n=L.getNamedEffect(t.name,
t.description);
r.benefits.push(n)
}for(let t=0;
t<r.nCurses;
t++){
let t=e.MagicItemDescriptionTable.getRandomResult(`armorcurse`),
n=L.getNamedEffect(t.name,
t.description);
r.curses.push(n)
}break;
case Tr.Potion:r.type=r.itemType,
r.container=e.MagicItemSimpleTable.getRandomResult(`potioncontainer`).name,
r.liquid=e.MagicItemSimpleTable.getRandomResult(`potionliquid`).name,
r.tasteSmell=e.MagicItemSimpleTable.getRandomResult(`potiontastesmell`).name;
for(let t=0;
t<r.nBenefits;
t++){
let t=e.MagicItemDescriptionTable.getRandomResult(`potionbenefit`),
n=L.getNamedEffect(t.name,
t.description);
r.benefits.push(n)
}for(let t=0;
t<r.nCurses;
t++){
let t=e.MagicItemDescriptionTable.getRandomResult(`potioncurse`),
n=L.getNamedEffect(t.name,
t.description);
r.curses.push(n)
}break;
case Tr.Utility:r.type=e.MagicItemSimpleTable.getRandomResult(`utilityitemtype`).name,
r.feature=e.MagicItemSimpleTable.getRandomResult(`utilityitemfeature`).name;
for(let t=0;
t<r.nBenefits;
t++){
let t=e.MagicItemDescriptionTable.getRandomResult(`utilitybenefit`),
n=L.getNamedEffect(t.name,
t.description);
r.benefits.push(n)
}for(let t=0;
t<r.nCurses;
t++){
let t=e.MagicItemDescriptionTable.getRandomResult(`utilitycurse`),
n=L.getNamedEffect(t.name,
t.description);
r.curses.push(n)
}break;
case Tr.Scroll:{
n&&(i=e.MagicItemSimpleTable.getRandomResult(`spellclass`).name),
r.type=`Scroll`,
r.feature=e.MagicItemSimpleTable.getRandomResult(`scrollfeatures`).name,
r.spellTier=e.MagicItemSimpleTable.getRandomResult(`spelltier`).name,
r.spell=e.MagicItemSimpleTable.getRandomResult(`${i}spelltier${r.spellTier}`).name;
let t=e.MagicItemSimpleTable.getRandomResult(`scrollwandbenefittable`).name,
a=e.MagicItemSimpleTable.getRandomResult(`scrollwandcursetable`).name;
for(let n=0;
n<r.nBenefits;
n++){
let n=e.MagicItemDescriptionTable.getRandomResult(t),
i=L.getNamedEffect(n.name,
n.description);
r.benefits.push(i)
}for(let t=0;
t<r.nCurses;
t++){
let t=e.MagicItemDescriptionTable.getRandomResult(a),
n=L.getNamedEffect(t.name,
t.description);
r.curses.push(n)
}break
}case Tr.Wand:{
n&&(i=e.MagicItemSimpleTable.getRandomResult(`spellclass`).name),
r.type=`Wand`,
r.feature=e.MagicItemSimpleTable.getRandomResult(`wandfeatures`).name,
r.spellTier=e.MagicItemSimpleTable.getRandomResult(`spelltier`).name,
r.spell=e.MagicItemSimpleTable.getRandomResult(`${i}spelltier${r.spellTier}`).name;
let t=e.MagicItemSimpleTable.getRandomResult(`scrollwandbenefittable`).name,
a=e.MagicItemSimpleTable.getRandomResult(`scrollwandcursetable`).name;
for(let n=0;
n<r.nBenefits;
n++){
let n=e.MagicItemDescriptionTable.getRandomResult(t),
i=L.getNamedEffect(n.name,
n.description);
r.benefits.push(i)
}for(let t=0;
t<r.nCurses;
t++){
let t=e.MagicItemDescriptionTable.getRandomResult(a),
n=L.getNamedEffect(t.name,
t.description);
r.curses.push(n)
}break
}case Tr.Weapon:r.type=e.MagicItemSimpleTable.getRandomResult(`weapontype`).name,
r.bonus=e.MagicItemSimpleTable.getRandomResult(`weaponbonus`).name,
r.feature=e.MagicItemSimpleTable.getRandomResult(`weaponfeature`).name;
for(let t=0;
t<r.nBenefits;
t++){
let t=e.MagicItemDescriptionTable.getRandomResult(`weaponbenefit`),
n=L.getNamedEffect(t.name,
t.description);
r.benefits.push(n)
}for(let t=0;
t<r.nCurses;
t++){
let t=e.MagicItemDescriptionTable.getRandomResult(`weaponcurse`),
n=L.getNamedEffect(t.name,
t.description);
r.curses.push(n)
}break;
default:throw Error(`GMTools.getMagicItem: unknown type "${r.itemType.toString()}"`)
}return r.getCleanType()
}static getMagicItems(t,
n,
r){
let i=[

];
for(let a=0;
a<t;
a++)i.push(e.getMagicItem(n,
r));
return i
}static getMagicItemsV2(e,
t,
n){
let r=[

];
for(let i=0;
i<e;
i++)r.push(Xh.GenerateMagicItem(t,
n));
return r
}
};
function Qh(e){
let{
children:t,
primary:n,
secondary:r,
subtle:i,
solo:a,
left:o,
center:s,
right:c,
lefttoright:l,
functionButtonSet:u,
menu:d,
...f
}=e,
p=(0,
ms.default)(f.className,
`font-face-montserrat-medium flex items-center px-3 cursor-pointer`,
{
"border border-black bg-black text-white":n,
"border-2 border-black bg-white text-black":r,
"border border-gray-400 text-gray-400 hover:text-black hover:border-black":i,
"rounded-lg py-1.5":a,
"rounded-l-lg":o,
"":s,
"rounded-r-lg":c,
"rounded-lg":l,
"border border-black text-black hover:text-black":d,
"flex-1":u
});
return(0,
U.jsx)(`button`,
{
...f,
className:p,
children:t
})
}function $h(e){
return e.isToggle&&e.toggleOptions?e.toggleOptions.toggleValue?e.toggleOptions.nameOn?(0,
U.jsxs)(U.Fragment,
{
children:[
e.toggleOptions.nameOn,
`\xA0`,
e.toggleOptions.iconOn
]
}):(0,
U.jsx)(U.Fragment,
{
children:e.toggleOptions.iconOn
}):e.toggleOptions.nameOff?(0,
U.jsxs)(U.Fragment,
{
children:[
e.toggleOptions.nameOff,
`\xA0`,
e.toggleOptions.iconOff
]
}):(0,
U.jsx)(U.Fragment,
{
children:e.toggleOptions.iconOff
}):e.name?(0,
U.jsxs)(U.Fragment,
{
children:[
(0,
U.jsx)(`span`,
{
className:e.isLoading?`animate-spin`:``,
children:e.icon
}),
`\xA0`,
e.name
]
}):(0,
U.jsx)(U.Fragment,
{
children:(0,
U.jsx)(`span`,
{
className:e.isLoading?`animate-spin`:``,
children:e.icon
})
})
}function eg(e,
t,
n,
r,
i){
if(r.isToggle&&r.toggleOptions){
let a=r.toggleOptions.toggleClick,
o=r.toggleOptions.toggleValue;
return(0,
U.jsx)(hs,
{
id:e,
functionButtonSet:!0,
toggleValue:r.toggleOptions.toggleValue,
className:i,
toggleOffIcon:r.toggleOptions.iconOff,
toggleOffText:r.toggleOptions?.nameOff,
toggleOnIcon:r.toggleOptions.iconOn,
toggleOnText:r.toggleOptions?.nameOn,
onClick:(e=>a(e,
!o,
n)),
children:(0,
U.jsx)(U.Fragment,
{

})
},
t)
}else return console.error(`IconFunctionButtonSet: renderToggleButton: options are not for a toggel button. itemName=[${r.name}]`),
(0,
U.jsx)(U.Fragment,
{

})
}function tg(e,
t,
n,
r,
i,
a){
let o=(0,
ms.default)(a.className,
`font-face-montserrat-medium flex flex-1 justify-center items-center px-3 border hover:text-black`,
{
"border-gray-500 text-black":r.toggleOptions?.toggleValue,
"border-gray-400 text-gray-400":!r.toggleOptions?.toggleValue,
"rounded-l-lg":i===`LEFT`,
"":i===`CENTER`,
"rounded-r-lg":i===`RIGHT`,
"rounded-lg":i===`ONLY`,
"disabled disabled:cursor-not-allowed":r.isLoading
});
return R.log(`ItemFunctionButtonSet: renderButton: classNamesString = ${o}`),
r.isToggle&&r.toggleOptions?eg(e,
t,
n,
r,
o):(0,
U.jsx)(Qh,
{
id:e,
functionButtonSet:!0,
className:o,
onClick:(e=>r.onClick(e,
n)),
children:$h(r)
},
t)
}function ng(e){
let{
itemName:t,
itemId:n,
functionButtonOptions:r,
...i
}=e;
return(0,
U.jsx)(`div`,
{
className:`flex flex-row justify-evenly items-center`,
children:r.map((e,
a)=>{
let o=`ONLY`;
if(r.length>1)switch(a){
case 0:o=`LEFT`;
break;
case r.length-1:o=`RIGHT`;
break;
default:o=`CENTER`;
break
}let s=`${t}-${n}-${a}`;
return tg(s,
s,
n,
e,
o,
i)
})
})
}function rg(e,
t){
R.log(`ButtonUtils: nullOnClick = ${t}`)
}var ig=class e{
static IGNORE_OPTION={
label:`ignore`,
value:`-1`
};
static getAncestryValues(){
return Wn
}static getAncestryOptions(){
return Gn
}static getMonsterLevelOptionsWithIgnore(){
return er
}static getCasterClassOptions(){
return qn
}static getSpellTierOptionsWithIgnore(){
return[
e.IGNORE_OPTION,
...Xn
]
}static getCharacterLevelOptions(){
return Jn
}static getSpellThemeOptions(){
return dr
}static getWealthValues(){
return Zn
}static getQuantityValuesFib(){
return nr
}static getQuantityValuesFibShort(){
return rr
}static getDiceValues(){
return ir
}static getDiceWithNoneValues(){
return ar
}static getStatModifierValues(){
return Qn
}static getRivalCrawlersQuantityOptions(){
return or
}static getRivalCrawlersQuantityOptionsDefault(){
return or[
0
].value
}static getItemTypeValues(){
return $n
}
},
ag=class e{
static convertValuesToSelectFormat(t,
n=!1,
r=``){
let i=t.map(t=>({
label:e.getOptionLabel(t),
value:e.getOptionValue(t)
}));
return n&&i.unshift(this.createRandomOption(r)),
i
}static convertOptionsToSelectFormat(e,
t=!1,
n=``){
let r=[
...e
];
return t&&r.unshift(this.createRandomOption(n)),
r
}static createRandomOption(e=``){
return{
label:e?`Random ${e}`:`Random`,
value:``
}
}static renderOptions(e){
return e.map(e=>(0,
U.jsx)(`option`,
{
value:e.value,
children:e.label
},
e.label))
}static getRenderedSelectOptions(e,
t=!1,
n=``){
let r=this.convertValuesToSelectFormat(e,
t,
n);
return this.renderOptions(r)
}static getOptionLabel(e){
return e&&typeof e==`object`?`label`in e?e.label:`name`in e?e.name:`value`in e?e.value:JSON.stringify(e):String(e)
}static getOptionValue(e){
return e&&typeof e==`object`?`value`in e?e.value:`id`in e?e.id:JSON.stringify(e):String(e)
}
},
og=(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`h2`,
{
className:`text-center pb-2`,
children:`Adventure Ideas Help`
}),
(0,
U.jsxs)(`p`,
{
className:`pb-2`,
children:[
`Generate ideas for adventures.`,
(0,
U.jsx)(`br`,
{

})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsx)(`div`,
{
className:`pt-2 pb-2`,
children:(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Adventure Names`
}),
` - generate some adventure names to get some ideas going.`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Adventure Sites`
}),
` - generate some site/location names to get some ideas going.`
]
})
]
})
})
]
}),
sg=(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`h2`,
{
className:`text-center pb-2`,
children:`Site Map Help`
}),
(0,
U.jsxs)(`p`,
{
className:`pb-2`,
children:[
`Generate some random locations and their relative positions as inspriation for an adventure.`,
(0,
U.jsx)(`br`,
{

})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-2`,
children:[
(0,
U.jsx)(`h4`,
{
children:`Options`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Size`
}),
` - controls the number locations that are generated. Small, 5-7 locations; Medium, 8-10 locations; Large, 11-13 locations.`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Allow Empty Locations`
}),
` - a chance for generated locations to be empty.`
]
})
]
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-2`,
children:[
(0,
U.jsx)(`h4`,
{
children:`Grid`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Empty Cells`
}),
` - click on an empty cell (gray plus) to populate it with a random location.`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Location Cells`
}),
` - click on a cell with a location to see information about that location.`
]
})
]
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-2`,
children:[
(0,
U.jsx)(`h4`,
{
children:`Location Detail Functions`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Remove`
}),
` - remove the location from the grid.`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Reroll`
}),
` - reroll the location.`
]
})
]
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-2`,
children:[
(0,
U.jsx)(`h4`,
{
children:`Location Table`
}),
`Displays all the locations on the grid in table format.`,
(0,
U.jsx)(`br`,
{

}),
`Randomly generated Danger Level displays in the table header.`
]
})
]
}),
cg=(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`h2`,
{
className:`text-center pb-2`,
children:`Magic Item Generator Help`
}),
(0,
U.jsxs)(`p`,
{
className:`pb-2`,
children:[
`Generate magic items on demand.`,
(0,
U.jsx)(`br`,
{

}),
`Select a quantity and, as desired, choose an item type.`
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsx)(`strong`,
{
children:`Option Buttons`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Priest Spells`
}),
` - when selected, allows items to be enchanted with Priest spells.`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Item Personality`
}),
` - when selected, allows the chance of generating a personality for the magic item.`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Funky Scrolls`
}),
` - when selected, allows scrolls to be created with features other than the spell they contain.`
]
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-2`,
children:[
(0,
U.jsx)(`h3`,
{
children:`Magic Item Table`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsx)(`li`,
{
className:`pb-2`,
children:`Click on a magic item to display its details below the table.`
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
`Click the `,
G.getPinUnpinnedIconInline(),
` `,
(0,
U.jsx)(`i`,
{
children:`Pin icon`
}),
` to retain the magic item when generating new magic items.`,
(0,
U.jsx)(`br`,
{

}),
`Click it again to unpin the magic item.`
]
}),
(0,
U.jsx)(`li`,
{
className:`pb-2`,
children:`Pinned magic items sort to the top of the table. Then they're sorted by name.`
})
]
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-2`,
children:[
(0,
U.jsx)(`h3`,
{
children:`Selected Shop`
}),
(0,
U.jsx)(`strong`,
{
children:`Function Buttons`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Pin`
}),
` - retains the magic item when generating new magic items. It's the same a clicking `,
(0,
U.jsx)(`i`,
{
children:`Pin`
}),
` in the magic item table. Click it again to unpin the magic item.`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Copy`
}),
` - copies the magic item information to the clipboard.`
]
})
]
}),
(0,
U.jsx)(`strong`,
{
children:`Tabs`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Main`
}),
` - displays core information about the magic item.`
]
}),
(0,
U.jsx)(`li`,
{
className:`pb-2`,
children:`More tabs to be added in the future...`
})
]
})
]
})
]
}),
lg=(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`h2`,
{
className:`text-center pb-2`,
children:`Monster Filter Help`
}),
(0,
U.jsxs)(`p`,
{
className:`pb-2`,
children:[
`Search through source material for monsters.`,
(0,
U.jsx)(`br`,
{

})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2`,
children:[
(0,
U.jsx)(`h3`,
{
children:`Sources`
}),
(0,
U.jsx)(`p`,
{
className:`mb-3`,
children:`Choose to include monsters from various sources. If no sources are selected, it will default to "Core Rules."`
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2`,
children:[
(0,
U.jsx)(`h3`,
{
className:``,
children:`Monster Level`
}),
(0,
U.jsx)(`p`,
{
children:`Limit results to monsters between a minimum and maximum level inclusive.`
}),
(0,
U.jsxs)(`ul`,
{
className:`mb-3`,
children:[
(0,
U.jsx)(`li`,
{
children:`If only the minimum level is set, it will return all monsters of that level and higher.`
}),
(0,
U.jsx)(`li`,
{
children:`If only the maximum level is set, it will return all monsters of that level and lower.`
})
]
}),
(0,
U.jsx)(`hr`,
{

})
]
}),
(0,
U.jsxs)(`div`,
{
className:`pt-2`,
children:[
(0,
U.jsx)(`h3`,
{
children:`Keywords`
}),
(0,
U.jsx)(`p`,
{
className:`mb-3`,
children:`Enter keywords (separated by space) to filter monsters by contents of name or stat block.`
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2`,
children:[
(0,
U.jsx)(`h3`,
{
className:``,
children:`Filters`
}),
(0,
U.jsxs)(`p`,
{
className:`mb-3`,
children:[
`Use toggle buttons to filter monster by various attributes: Environment, Type, Movement, Attack, Effect, and Trait.`,
(0,
U.jsx)(`br`,
{

}),
(0,
U.jsxs)(`span`,
{
className:`flex items-center gap-2`,
children:[
`Use the `,
G.getCaretDownInline(),
`/ `,
G.getCaretUpInline(),
` buttons to expand and collapse tag sections.`
]
})
]
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-3`,
children:[
(0,
U.jsx)(`h3`,
{
className:``,
children:`Filter Buttons`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`strong`,
{
children:`Filter Monsters`
}),
` - display the list of filtered monsters.`
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`strong`,
{
children:`One Filtered Monsters`
}),
` - select a single monster from the set of filtered monsters.`
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`strong`,
{
children:`Clear Filters`
}),
` - clears all filters except Sources, Levels, and Keywords.`
]
})
]
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-3`,
children:[
(0,
U.jsx)(`h3`,
{
className:``,
children:`Sort Buttons`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`strong`,
{
children:`Ascending/Descending`
}),
` - toggles the direction of the sort.`
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`strong`,
{
children:`by Name`
}),
` - sort by monster name.`
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`strong`,
{
children:`by Level`
}),
` - sort by monster level (numeric).`
]
})
]
})
]
})
]
}),
ug=(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`h2`,
{
className:`text-center pb-2`,
children:`NPC Generator Help`
}),
(0,
U.jsxs)(`p`,
{
className:`pb-2`,
children:[
`Generate NPCs on demand.`,
(0,
U.jsx)(`br`,
{

}),
`Select a quantity and, as desired, choose an Ancestry and/or Wealth tier.`
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-2`,
children:[
(0,
U.jsx)(`h3`,
{
children:`NPC Table`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsx)(`li`,
{
className:`pb-2`,
children:`Click on an NPC to display their details below the table.`
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsxs)(`span`,
{
className:`flex items-center gap-2`,
children:[
`Click the `,
G.getPinUnpinnedIconInline(),
` `,
(0,
U.jsx)(`i`,
{
children:`Pin icon`
}),
` to retain the NPC when Generating new NPCs.`
]
}),
`Click it again to unpin the NPC.`
]
}),
(0,
U.jsx)(`li`,
{
className:`pb-2`,
children:`Pinned NPCs sort to the top of the table.Then they're sorted by name.`
})
]
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-2`,
children:[
(0,
U.jsx)(`h3`,
{
children:`Selected NPC`
}),
(0,
U.jsx)(`strong`,
{
children:`Function Buttons`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Pin`
}),
` - retains the NPC when Generating new NPCs. It's the same a clicking `,
(0,
U.jsx)(`i`,
{
children:`Pin`
}),
` in the NPC table. Click it again to unpin the NPC.`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Copy`
}),
` - copies the NPC information to the clipboard.`
]
})
]
}),
(0,
U.jsx)(`strong`,
{
children:`Tabs`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Main`
}),
` - displays core information about the NPC.`
]
}),
(0,
U.jsx)(`li`,
{
className:`pb-2`,
children:`More tabs to be added in the future...`
})
]
})
]
})
]
}),
dg=(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`h2`,
{
className:`text-center pb-2`,
children:`Random Encounter Help`
}),
(0,
U.jsx)(`p`,
{
className:`pb-2`,
children:`Use this tool to manage checking for random encounters.`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`b`,
{
children:`Encounter Table Die`
}),
` can be set to whatever die is required for your encounter table. If an encounter is generated, the Encounter Table Die will be rolled.`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`b`,
{
children:`Encounter Check`
}),
` rolls a check for an encounter. If a `,
(0,
U.jsx)(`i`,
{
children:`1`
}),
` is rolled, Encounter details will be generated.`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`b`,
{
children:`Get Encounter`
}),
` gets encounter details (no check is performed).`
]
})
]
}),
(0,
U.jsxs)(`p`,
{
className:`pt-2 pb-2`,
children:[
(0,
U.jsx)(`b`,
{
children:`CHA (Charisma) Modifier`
}),
(0,
U.jsx)(`br`,
{

}),
`The charisma modifier for the party. It impacts the reaction result for the encounter. `,
(0,
U.jsx)(`i`,
{
children:`Note:`
}),
` This can be changed after the encounter and the Reaction will be adjusted.`
]
}),
(0,
U.jsxs)(`p`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Show Encounter Check Log`
}),
(0,
U.jsx)(`br`,
{

}),
`Displays all your encounter rolls until you clear them.`
]
})
]
}),
fg=(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`h2`,
{
className:`text-center pb-2`,
children:`Rival Crawlers Help`
}),
(0,
U.jsxs)(`p`,
{
className:`pb-2`,
children:[
`Generate a party of rival crawlers for your players to encounter.`,
(0,
U.jsx)(`br`,
{

}),
`Select the number of party members to create, or leave it up to chance.`
]
}),
(0,
U.jsx)(`strong`,
{
children:`Function Buttons`
}),
(0,
U.jsx)(`ul`,
{
children:(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Copy`
}),
` - copies the party's information and members to the clipboard.`
]
})
})
]
}),
pg=(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`h2`,
{
className:`text-center pb-2`,
children:`Shop Generator Help`
}),
(0,
U.jsxs)(`p`,
{
className:`pb-2`,
children:[
`Generate shops on demand.`,
(0,
U.jsx)(`br`,
{

}),
`Select a quantity and, as desired, choose a Wealth tier.`
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-2`,
children:[
(0,
U.jsx)(`h3`,
{
children:`Shop Table`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsx)(`li`,
{
className:`pb-2`,
children:`Click on a shop to display its details below the table.`
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsxs)(`span`,
{
className:`flex items-center gap-2`,
children:[
`Click the `,
G.getPinUnpinnedIconInline(),
` `,
(0,
U.jsx)(`i`,
{
children:`Pin icon`
}),
` to retain the shop when generating new shops.`
]
}),
`Click it again to unpin the shop.`
]
}),
(0,
U.jsx)(`li`,
{
className:`pb-2`,
children:`Pinned shops sort to the top of the table. Then they're sorted by name.`
})
]
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-2`,
children:[
(0,
U.jsx)(`h3`,
{
children:`Selected Shop`
}),
(0,
U.jsx)(`strong`,
{
children:`Function Buttons`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Pin`
}),
` - retains the shop when generating new shops. It's the same a clicking `,
(0,
U.jsx)(`i`,
{
children:`Pin`
}),
` in the shop table. Click it again to unpin the shop.`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Copy`
}),
` - copies the shop information to the clipboard.`
]
})
]
}),
(0,
U.jsx)(`strong`,
{
children:`Tabs`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Main`
}),
` - displays core information about the shop.`
]
}),
(0,
U.jsx)(`li`,
{
className:`pb-2`,
children:`More tabs to be added in the future...`
})
]
})
]
})
]
}),
mg=(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`h2`,
{
className:`text-center pb-2`,
children:`Tavern Generator Help`
}),
(0,
U.jsxs)(`p`,
{
className:`pb-2`,
children:[
`Generate taverns on demand.`,
(0,
U.jsx)(`br`,
{

}),
`Select a quantity and, as desired, choose a Wealth tier.`
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-2`,
children:[
(0,
U.jsx)(`h3`,
{
children:`Tavern Table`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsx)(`li`,
{
className:`pb-2`,
children:`Click on a tavern to display its details below the table.`
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsxs)(`span`,
{
className:`flex items-center gap-2`,
children:[
`Click the `,
G.getPinUnpinnedIconInline(),
` `,
(0,
U.jsx)(`i`,
{
children:`Pin icon`
}),
` to retain the tavern when generating new taverns.`
]
}),
`Click it again to unpin the tavern.`
]
}),
(0,
U.jsx)(`li`,
{
className:`pb-2`,
children:`Pinned taverns sort to the top of the table. Then they're sorted by name.`
})
]
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-2`,
children:[
(0,
U.jsx)(`h3`,
{
children:`Selected Shop`
}),
(0,
U.jsx)(`strong`,
{
children:`Function Buttons`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Pin`
}),
` - retains the tavern when generating new taverns. It's the same a clicking `,
(0,
U.jsx)(`i`,
{
children:`Pin`
}),
` in the tavern table. Click it again to unpin the tavern.`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Copy`
}),
` - copies the tavern information to the clipboard.`
]
})
]
}),
(0,
U.jsx)(`strong`,
{
children:`Tabs`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Main`
}),
` - displays core information about the tavern.`
]
}),
(0,
U.jsx)(`li`,
{
className:`pb-2`,
children:`More tabs to be added in the future...`
})
]
})
]
})
]
}),
hg=(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`h2`,
{
className:`text-center pb-2`,
children:`Spell Filter Help`
}),
(0,
U.jsxs)(`p`,
{
className:`pb-2`,
children:[
`Search through source material for spells.`,
(0,
U.jsx)(`br`,
{

})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2`,
children:[
(0,
U.jsx)(`h3`,
{
children:`Sources`
}),
(0,
U.jsx)(`p`,
{
className:`mb-3`,
children:`Choose to include spells from various sources. Sources will default to "Core Rules" if no option is selected.`
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2`,
children:[
(0,
U.jsx)(`h3`,
{
className:``,
children:`Spell Tier`
}),
(0,
U.jsx)(`p`,
{
children:`Limit results to spells between a minimum and maximum tier inclusive.`
}),
(0,
U.jsxs)(`ul`,
{
className:`mb-3`,
children:[
(0,
U.jsx)(`li`,
{
children:`If only the minimum tier is set, it will return all spells of that tier and higher.`
}),
(0,
U.jsx)(`li`,
{
children:`If only the maximum tier is set, it will return all spells of that tier and lower.`
})
]
}),
(0,
U.jsx)(`hr`,
{

})
]
}),
(0,
U.jsxs)(`div`,
{
className:`pt-2`,
children:[
(0,
U.jsx)(`h3`,
{
children:`Keywords`
}),
(0,
U.jsx)(`p`,
{
className:`mb-3`,
children:`Enter keywords (separated by space) to filter spells by contents of the spell name or description.`
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2`,
children:[
(0,
U.jsx)(`h3`,
{
children:`Archetype`
}),
(0,
U.jsx)(`p`,
{
className:`mb-3`,
children:`Each spell has one Archetype. This is additional information added to aid filtering.`
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2`,
children:[
(0,
U.jsx)(`h3`,
{
className:``,
children:`Filters`
}),
(0,
U.jsxs)(`p`,
{
className:`mb-3`,
children:[
`Use toggle buttons to filter spells by various attributes: Archetype, Duration, Range, and Trait.`,
(0,
U.jsx)(`br`,
{

}),
(0,
U.jsxs)(`span`,
{
className:`flex items-center gap-2`,
children:[
`Use the `,
G.getCaretDownInline(),
`/`,
` `,
G.getCaretUpInline(),
` buttons to expand and collapse tag sections.`
]
})
]
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-3`,
children:[
(0,
U.jsx)(`h3`,
{
className:``,
children:`Filter Buttons`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`strong`,
{
children:`Filter Spells`
}),
` - display the list of filtered spells.`
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`strong`,
{
children:`Clear Filters`
}),
` - clears all filters except Sources, Tiers, and Keywords.`
]
})
]
})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-3`,
children:[
(0,
U.jsx)(`h3`,
{
className:``,
children:`Sort Buttons`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`strong`,
{
children:`Ascending/Descending`
}),
` - toggles the direction of the sort.`
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`strong`,
{
children:`by Name`
}),
` - sort by spell name.`
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`strong`,
{
children:`by Tier`
}),
` - sort by spell tier (numeric).`
]
})
]
})
]
})
]
}),
gg=(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(`h2`,
{
className:`text-center pb-2`,
children:`Known Spell Generator Help`
}),
(0,
U.jsxs)(`p`,
{
className:`pb-2`,
children:[
`Generate a list of known spells for a caster based on their class, level, and optional theme.`,
(0,
U.jsx)(`br`,
{

})
]
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
className:`pt-2 pb-2`,
children:[
(0,
U.jsx)(`h3`,
{
children:`Themes`
}),
(0,
U.jsx)(`p`,
{
children:`Select a theme to influence the types of spells that will be included in the generated list.`
}),
(0,
U.jsx)(`p`,
{
children:`If there are not enough on-theme spells to fill a tier, the remaining slots will be filled randomly.`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`No Theme`
}),
` - No thematic influence.`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Random Theme`
}),
` - Selects a random theme for the spell list.`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Defense Full/Majority`
}),
` - 100% / at least 50% defense spells (e.g. shield, protection).`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Offense Full/Majority`
}),
` - 100% / at least 50% offensive spells (e.g. magic missile, fireball).`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`Support Full/Majority`
}),
` - 100% / at least 50% support spells (e.g. fly, jump, alarm, levitate, illusion).`
]
}),
(0,
U.jsxs)(`li`,
{
className:`pb-2`,
children:[
(0,
U.jsx)(`strong`,
{
children:`"Selfish" Support`
}),
` - Support spells that primarily or only target self (e.g. polymorph self).`
]
})
]
})
]
})
]
}),
_g=class{
static getInstructions(e){
switch(e){
case I.RandomEncounter:return dg;
case I.NpcGenerator:return ug;
case I.RivalCrawlers:return fg;
case I.ShopGenerator:return pg;
case I.TavernGenerator:return mg;
case I.MagicItemGenerator:return cg;
case I.AdventureNames:return og;
case I.AdventureSiteMap:return sg;
case I.MonsterReference:return lg;
case I.SpellReference:return hg;
case I.KnownSpellGenerator:return gg;
default:return console.warn(`No instructions available for tool: ${e}`),
(0,
U.jsx)(U.Fragment,
{

})
}
}
};
function vg(e){
let{
instructionsFile:t,
toolName:n,
children:r
}=e,
[
i,
a
]=(0,
m.useState)(!1),
o=e=>{
e.preventDefault(),
a(!i)
};
return R.log(`ToolContainerV2: instructionsFile`,
t),
R.log(`ToolContainerV2: toolName`,
n),
(0,
U.jsxs)(`div`,
{
className:`relative border-2 border-gray-300 rounded-lg p-[15px] mb-[1em] shadow-md`,
children:[
t||n?(0,
U.jsx)(hs,
{
toggleValue:i,
iconOnly:!0,
solo:!0,
toggleOnIcon:G.getCloseIconLarge(),
toggleOffIcon:G.getHelpIconLarge(),
className:`absolute top-0 right-0`,
onClick:(e=>o(e)),
children:(0,
U.jsx)(U.Fragment,
{

})
}):null,
i&&n?_g.getInstructions(n):(0,
U.jsx)(U.Fragment,
{
children:r
})
]
})
}function yg(e){
let{
title:t,
titleLeft:n,
reference:r,
description:i,
children:a
}=e,
o=t===``||t===void 0?n?(0,
U.jsx)(`div`,
{
className:`text-left pb-2`,
children:(0,
U.jsx)(`h2`,
{
children:n
})
}):null:(0,
U.jsx)(`div`,
{
className:`text-center pb-2`,
children:(0,
U.jsx)(`h2`,
{
children:t
})
}),
s=r===``||r===void 0?null:(0,
U.jsx)(`div`,
{
className:`self-end text-gray-400 text-sm`,
children:`(see ${r})`
});
return(0,
U.jsxs)(`div`,
{
className:`w-full`,
children:[
o,
i===``||r===void 0?null:(0,
U.jsx)(`div`,
{
children:i
}),
(0,
U.jsx)(`div`,
{
className:`flex`,
children:a
}),
s
]
})
}function bg(e,
t,
n){
let r=t.find(t=>t.id===e);
if(r!==void 0)return r;
let i=n.find(t=>t.id===e);
return i===void 0?L.getEmptyType():i
}function xg(e,
t){
return t.find(t=>t.id===e)?(R.log(`---------- isItemSaved (${e}): TRUE`),
!0):(R.log(`---------- isItemSaved (${e}): FALSE`),
!1)
}function Sg(e){
if(!e)return[

];
function t(e){
return e.featureList().length===0?null:(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Features`
}),
(0,
U.jsx)(`ul`,
{
className:`text-left list-inside`,
children:e.featureList().map((e,
t)=>(0,
U.jsxs)(`li`,
{
className:`ml-6 text-sm`,
children:[
(0,
U.jsxs)(`b`,
{
children:[
e.name,
`: `
]
}),
e.description
]
},
t))
})
]
})
}function n(e){
return e.benefitsCursesList().length===0?null:(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Benefits/Curses`
}),
(0,
U.jsx)(`ul`,
{
className:`text-left list-inside`,
children:e.benefitsCursesList().map((e,
t)=>(0,
U.jsxs)(`li`,
{
className:`ml-6 text-sm`,
children:[
(0,
U.jsxs)(`b`,
{
children:[
e.name,
`: `
]
}),
e.description
]
},
t))
})
]
})
}function r(e){
return e.personalityList().length===0?null:(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Personality`
}),
(0,
U.jsx)(`ul`,
{
className:`text-left list-inside`,
children:e.personalityList().map((e,
t)=>(0,
U.jsxs)(`li`,
{
className:`ml-6 text-sm`,
children:[
(0,
U.jsxs)(`b`,
{
children:[
e.name,
`: `
]
}),
e.description
]
},
t))
})
]
})
}let i=new Er(e);
return[
{
id:`main${e.id}`,
name:`Main`,
heading:i.description(),
subheading:i.subheading(),
content:(0,
U.jsxs)(`ul`,
{
className:`text-left list-outside`,
children:[
t(i),
n(i),
r(i)
]
})
}
]
}function Cg(){
let e=qp(),
t=$(Ur),
n=$(Wr),
r=$(Gr),
i=bg(r,
n,
t),
a=new Er(i),
o={
buttonText:`Generate Magic Items`,
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Generate Magic Items`,
descriptionText:`Create a specific number of MagicItems of a specific wealth tier.`
}
},
s=t=>{
let n=Tr[
p
],
r={
allowPriestSpells:_,
allowPersonality:x,
allowScrollBenefitsCurses:T
},
i=Zh.getMagicItemsV2(l,
n,
r);
R.log(`handleCreateMagicItemsClick: `,
i),
e(Nr(i))
},
c=ag.convertValuesToSelectFormat(ig.getQuantityValuesFib(),
!1),
[
l,
u
]=(0,
m.useState)(5),
d={
options:c,
selectedValue:l.toString(),
onSelectChange:e=>{
let t=+e.currentTarget.value;
u(t)
},
styleOptions:{
primary:!0,
centerSelectorSmall:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select Magic Item Quantity`,
descriptionText:`Select the number of magic items to create.`
}
},
f=ag.convertValuesToSelectFormat(ig.getItemTypeValues(),
!0,
`Type`),
[
p,
h
]=(0,
m.useState)(f[
0
].value),
g=[
d,
{
options:f,
selectedValue:p,
onSelectChange:e=>{
let t=e.currentTarget.value;
h(t)
},
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select Magic Item Type`,
descriptionText:`Select the type of magic items to create.`
}
}
],
[
_,
v
]=(0,
m.useState)(!1),
y=e=>{
v(!_)
},
b=(0,
U.jsx)(Zp,
{
toggleValue:_,
subtle:!0,
solo:!0,
onClick:(e=>y(e)),
tipSearchTerm:`Priest Spells`,
children:(0,
U.jsx)(U.Fragment,
{
children:`Priest Spells`
})
}),
[
x,
S
]=(0,
m.useState)(!0),
C=e=>{
S(!x)
},
w=(0,
U.jsx)(Zp,
{
toggleValue:x,
subtle:!0,
solo:!0,
onClick:(e=>C(e)),
tipSearchTerm:`Item Personality`,
children:(0,
U.jsx)(U.Fragment,
{
children:`Item Personality`
})
}),
[
T,
E
]=(0,
m.useState)(!1),
ee=e=>{
E(!T)
},
D=(0,
U.jsxs)(U.Fragment,
{
children:[
b,
w,
(0,
U.jsx)(Zp,
{
toggleValue:T,
subtle:!0,
solo:!0,
onClick:(e=>ee(e)),
tipSearchTerm:`Funky Scrolls`,
children:(0,
U.jsx)(U.Fragment,
{
children:`Funky Scrolls`
})
})
]
}),
te=(r,
i,
a,
o)=>{
if(R.log(`pinToggleItem STARTED`),
r.stopPropagation(),
R.log(`pinTogglItem(index = ${i}, toggleValue = ${a}, itemId = ${o})`),
a){
let t=n.find(e=>e.id===o);
t?(e(jr(t)),
e(Ir(t))):console.error(`No MagicItem with id == ${o}`)
}else{
let n=t.find(e=>e.id===o);
n?(e(Fr(n)),
e(Mr(n))):console.error(`No MagicItem with id == ${o}`)
}
},
ne=(r,
i,
a)=>{
if(R.log(`pinToggleItemNewFangled STARTED`),
r.stopPropagation(),
R.log(`pinToggleItemNewFangled(toggleValue = ${i}, itemId = ${a})`),
i){
let t=n.find(e=>e.id===a);
t?(e(jr(t)),
e(Ir(t))):console.error(`No MagicItem with id == ${a}`)
}else{
let n=t.find(e=>e.id===a);
n?(e(Fr(n)),
e(Mr(n))):console.error(`No MagicItem with id == ${a}`)
}
},
re={
id:`Magic Item List`,
title:`Magic Items (Click on a row to focus on a magic item.)`,
columns:[
{
name:`Description`,
propertyName:`description`,
isFixed:!0
},
{
name:`Feature`,
propertyName:`feature`,
isFixed:!0
},
{
name:`Benefits`,
propertyName:`benefitNames`,
smallerText:!0,
isFixed:!1
},
{
name:`Curses`,
propertyName:`curseNames`,
smallerText:!0,
isFixed:!1
},
{
name:`Personality`,
propertyName:`personalitySummary`,
smallerText:!0,
isFixed:!1
}
],
setPinColumn:0,
handleRowClick:(r,
i,
a)=>{
R.log(`MagicItemGeneratorV2 handlePinnableTableRowClick row = ${i}, magicItemId = ${a}`);
let o=bg(a,
n,
t);
o?(R.log(`MagicItemGeneratorV2 handlePinnableTableRowClick magicItem = `,
o),
e(zr(o.id))):console.error(`No MagicItem found with id == [${a}]`)
},
handlePinClick:te,
rowData:n.map(e=>new Er(e).getDisplayType()),
pinnedRowData:t.map(e=>new Er(e).getDisplayType())
};
function ie(e){
console.debug(`MagicItemGeneratorV2: copyItemV2: event`,
e),
rm.copyTextToClipboard(bm.formatMagicItem(i,
im.Text))
}function ae(e){
return console.debug(`MagicItemGeneratorV2 magicItem.id = ${e.id}`),
[
{
name:`Pin`,
icon:G.getPinIcon(),
onClick:rg,
isToggle:!0,
toggleOptions:{
toggleValue:xg(r,
t),
toggleClick:ne,
nameOff:`Pin`,
iconOff:G.getPinUnpinnedIcon(),
nameOn:`Unpin`,
iconOn:G.getPinPinnedIcon()
}
},
{
name:`Copy`,
icon:G.getCopyIcon(),
onClick:ie,
isToggle:!1
}
]
}let O=i.id===``?null:(0,
U.jsxs)(`div`,
{
className:`grow`,
children:[
(0,
U.jsx)(ng,
{
itemName:`TAVERN`,
itemId:i.id,
functionButtonOptions:ae(i)
}),
(0,
U.jsx)(wm,
{
id:`selected_magicItem`,
name:`selected_magicItem`,
heading:a.description(),
subheading:``,
tabs:Sg(i),
selectedTabIndex:0
},
i.id)
]
});
return(0,
U.jsxs)(vg,
{
toolName:I.MagicItemGenerator,
children:[
(0,
U.jsx)(yg,
{
titleLeft:`Magic Item Generator`,
description:`Create random magic items, you may specify the item type. Click on a row to focus on a magic item.`,
children:(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsx)(nm,
{
primaryButtonOptions:o,
subButtonOptions:g,
onClick:s,
children:(0,
U.jsx)(U.Fragment,
{

})
}),
(0,
U.jsx)(`div`,
{
className:`button-wrapper`,
children:D
})
]
})
}),
n.length+t.length<=0?(0,
U.jsx)(U.Fragment,
{

}):(0,
U.jsx)(yg,
{
children:(0,
U.jsx)(Am,
{
...re
})
}),
(0,
U.jsx)(`div`,
{
className:`flex pt-4`,
children:(0,
U.jsx)(yg,
{
title:i.id?`selected magic item`:``,
children:O
})
})
]
})
}function wg(){
let e=qp(),
t=$(Oi),
n=$(ki),
r=$(Ai),
i=$(ji),
a=$(B),
o=$(Mi),
s={
buttonText:`Generate NPCs`,
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Generate NPCs`,
descriptionText:`Create a specific number of NPCs of a specific ancestry and wealth class.`
}
},
c={
options:ag.convertValuesToSelectFormat(ig.getQuantityValuesFib()),
selectedValue:a.toString(),
onSelectChange:t=>{
let n=+t.currentTarget.value;
e(_i(n))
},
styleOptions:{
primary:!0,
centerSelectorSmall:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select Npc Quantity`,
descriptionText:`Select the number of NPCs to create.`
}
},
l={
options:ag.convertOptionsToSelectFormat(ig.getAncestryOptions(),
!0,
`Ancestry`),
selectedValue:i,
onSelectChange:t=>{
let n=t.currentTarget.value;
e(gi(n))
},
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select NPC Ancestry`,
descriptionText:`Select the ancestry of NPCs to create.`
}
},
u={
options:ag.convertValuesToSelectFormat(ig.getWealthValues(),
!0,
`Wealth`),
selectedValue:o,
onSelectChange:t=>{
let n=t.currentTarget.value;
e(vi(n))
},
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select NPC Wealth`,
descriptionText:`Select the wealth of NPCs to create.`
}
},
d=(r,
i,
a)=>{
R.log(`NpcV2 handleRowClick row = ${i}`);
let o=n.find(e=>e.id===a);
o||=t.find(e=>e.id===a),
o?(R.log(`NpcV2 handleRowClick npc = `,
o),
e(Ti(o))):R.error(`No NPC found with id == [${a}]`)
},
f=(r,
i,
a,
o)=>{
if(R.log(`pinToggleNpc STARTED`),
r.stopPropagation(),
R.log(`pinToggleNpc pinNpc(index = ${i}, toggleValue = ${a}, npcId = ${o})`),
a){
let t=n.find(e=>e.id===o);
t?(e(xi(t)),
e(wi(t))):console.error(`No NPC with id == ${o}`)
}else{
let n=t.find(e=>e.id===o);
n?(e(Si(n)),
e(Ci(n))):console.error(`No NPC with id == ${o}`)
}
},
p=(i,
a,
o)=>{
if(R.log(`pinToggleNpcNewFangled STARTED`),
i.stopPropagation(),
R.log(`pinToggleNpcNewFangled pinNpc(toggleValue = ${a}, npcId = ${o})`),
a){
let t=n.find(e=>e.id===o);
t?(e(xi(t)),
e(wi(t))):r?.id===o?e(xi(r)):console.error(`No NPC with id == ${o}`)
}else{
let n=t.find(e=>e.id===o);
n?(e(Si(n)),
e(Ci(n))):console.error(`No NPC with id == ${o}`)
}
},
m={
id:`NPC List`,
title:`NPCS (Click on a row to focus on an NPC.)`,
columns:[
{
name:`Name`,
propertyName:`name`,
isFixed:!0
},
{
name:`Ancestry`,
propertyName:`ancestry`,
isFixed:!0
},
{
name:`Job`,
propertyName:`job`,
smallerText:!0,
isFixed:!1
},
{
name:`Alignment`,
propertyName:`alignment`,
smallerText:!0,
isFixed:!1
},
{
name:`Behavior`,
propertyName:`behavior`,
smallerText:!0,
isFixed:!1
}
],
setPinColumn:0,
handleRowClick:d,
handlePinClick:f,
rowData:n,
pinnedRowData:t,
selectedItemId:r.id
};
function h(e){
console.debug(`copyNpcV2: event`,
e),
rm.copyTextToClipboard(bm.formatNpcBasic(r,
im.Text))
}function g(){
return t.find(e=>e.id===r.id)?(R.log(`isNpcSelectedNpcPinned: TRUE`),
!0):(R.log(`isNpcSelectedNpcPinned: FALSE`),
!1)
}function _(e){
return console.debug(`npc.id = ${e.id}`),
[
{
name:`Pin`,
icon:G.getPinIcon(),
onClick:rg,
isToggle:!0,
toggleOptions:{
toggleValue:g(),
toggleClick:p,
nameOff:`Pin`,
iconOff:G.getPinUnpinnedIcon(),
nameOn:`Unpin`,
iconOn:G.getPinPinnedIcon()
}
},
{
name:`Copy`,
icon:G.getCopyIcon(),
onClick:h,
isToggle:!1
}
]
}let v=[
{
id:`main${r.id}`,
name:`Main`,
heading:r.name,
subheading:`${r.ancestry} ${r.job}`,
content:(0,
U.jsxs)(`ul`,
{
className:`text-left list-inside`,
children:[
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Age:`
}),
` `,
r.age
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Alignment:`
}),
` `,
r.alignment
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Wealth:`
}),
` `,
r.wealth
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Appearance:`
}),
` `,
r.appearance
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Behavior:`
}),
` `,
r.behavior
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Secret:`
}),
` `,
r.secret
]
})
]
})
}
],
y=r.name===``?null:(0,
U.jsxs)(`div`,
{
className:`grow`,
children:[
(0,
U.jsx)(ng,
{
itemName:`NPC`,
itemId:r.id,
functionButtonOptions:_(r)
}),
(0,
U.jsx)(wm,
{
id:`selected_npc`,
name:`selected_npc`,
heading:r.name,
subheading:`${r.ancestry} ${r.job}`,
tabs:v,
selectedTabIndex:0
},
r.id)
]
}),
b=()=>{
let t=Zh.getNpcs(a,
i);
e(bi(t))
},
x=[
c,
l,
u
];
return(0,
U.jsxs)(vg,
{
toolName:I.NpcGenerator,
children:[
(0,
U.jsx)(yg,
{
titleLeft:`Npc Generator`,
description:`Create random NPCs with a potentially fixed ancestry and/or wealth level. Click on a row to focus on an NPC.`,
children:(0,
U.jsx)(`div`,
{
children:(0,
U.jsx)(nm,
{
primaryButtonOptions:s,
subButtonOptions:x,
onClick:b,
children:(0,
U.jsx)(U.Fragment,
{

})
})
})
}),
n.length+t.length<=0?(0,
U.jsx)(U.Fragment,
{

}):(0,
U.jsx)(yg,
{
children:(0,
U.jsx)(Am,
{
...m
})
}),
(0,
U.jsx)(`div`,
{
className:`flex pt-4`,
children:(0,
U.jsx)(yg,
{
title:r.name?`selected npc`:``,
children:y
})
})
]
})
}function Tg(e){
let{
heading:t,
subheading:n,
children:r
}=e;
return(0,
U.jsxs)(`div`,
{
id:t,
className:`grow text-center bg-white rounded-lg border-gray-300 border-2 p-2`,
children:[
(0,
U.jsx)(`h3`,
{
children:t
}),
(0,
U.jsx)(`h4`,
{
children:n
}),
(0,
U.jsx)(`div`,
{
className:`px-4`,
children:r
})
]
})
}function Eg(e){
let{
title:t,
reference:n,
description:r,
special:i,
children:a
}=e;
return(0,
U.jsxs)(`div`,
{
className:`w-1/2 mr-2`,
children:[
(0,
U.jsx)(`div`,
{
className:`text-left pb-2 flex justify-between items-center`,
children:(0,
U.jsx)(`h2`,
{
children:t
})
}),
r===``||r===void 0?null:(0,
U.jsx)(`div`,
{
children:r
}),
i,
a,
n===``||n===void 0?null:(0,
U.jsx)(`div`,
{
className:`text-gray-400 text-sm`,
children:n
})
]
})
}function Dg(e){
let{
title:t,
reference:n,
description:r,
children:i
}=e,
a=t===``||t===void 0?null:(0,
U.jsx)(`div`,
{
className:`text-center`,
children:(0,
U.jsx)(`h2`,
{
children:t
})
}),
o=n===``||n===void 0?null:(0,
U.jsx)(`div`,
{
className:`self-end text-gray-400 text-sm`,
children:`(see ${n})`
});
return(0,
U.jsxs)(`div`,
{
className:`w-1/2 ml-2`,
children:[
a,
r===``||n===void 0?null:(0,
U.jsx)(`div`,
{
children:r
}),
(0,
U.jsx)(`div`,
{
className:`flex`,
children:i
}),
o
]
})
}function Og(){
let e=qp(),
t=$(Vi),
n=ag.convertValuesToSelectFormat(ig.getQuantityValuesFib(),
!1),
[
r,
i
]=(0,
m.useState)(5),
a={
options:n,
selectedValue:r.toString(),
onSelectChange:e=>{
let t=+e.currentTarget.value;
i(t)
},
styleOptions:{
primary:!0,
centerSelectorSmall:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select Npc Names Quantity`,
descriptionText:`Select the number of NPC names to create.`
}
},
o=ig.getAncestryValues(),
s=ag.convertValuesToSelectFormat(o,
!1),
[
c,
l
]=(0,
m.useState)(s[
0
].value),
u={
options:s,
selectedValue:c,
onSelectChange:e=>{
let t=e.currentTarget.value;
R.log(`handleNpcAncestryChange = ${t}`),
l(t)
},
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select NPC Names Ancestry`,
descriptionText:`Select the ancestry of NPC names to create.`
}
},
d={
buttonText:`Get Names`,
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Get NPC Names`,
descriptionText:`Create names for NPCs of a specific ancestry.`
}
},
f=t=>{
R.log(`handleGetAncestryNamesClick`,
t);
let n=Zh.getNpcNamesByAncestry(r,
c);
e(Ri(n)),
e(Li(c))
},
p=[
a,
u
],
h=t.names.map((e,
t)=>(0,
U.jsx)(`li`,
{
children:(0,
U.jsx)(`b`,
{
children:e
})
},
t)),
g=t.ancestry===``?`Names`:`${t.ancestry} Names`,
_=t.names.length<=0?null:(0,
U.jsx)(Tg,
{
heading:g,
subheading:``,
children:(0,
U.jsx)(`ul`,
{
className:`text-left`,
children:h
})
});
return(0,
U.jsx)(vg,
{
children:(0,
U.jsxs)(`div`,
{
className:`flex`,
children:[
(0,
U.jsx)(Eg,
{
title:`Npc Names`,
children:(0,
U.jsx)(`div`,
{
children:(0,
U.jsx)(nm,
{
primaryButtonOptions:d,
subButtonOptions:p,
onClick:f,
children:(0,
U.jsx)(U.Fragment,
{

})
})
})
}),
(0,
U.jsx)(Dg,
{
children:_
})
]
})
})
}function kg(e,
t){
function n(e){
return(0,
ms.default)(`font-semibold! pl-3`,
{
"table-cell border-b-2 border-black":e.isFixed,
"hidden md:table-cell md:border-b-2 md:border-black":!e.isFixed
})
}function r(e){
return(0,
U.jsx)(U.Fragment,
{
children:e.name
})
}let i=t.map((t,
i)=>{
let a=`${e}-header-cell-${t.name}-${i}`;
return(0,
U.jsx)(`div`,
{
className:n(t),
children:r(t)
},
a)
});
return(0,
U.jsx)(`div`,
{
id:`${e}-table-header-group`,
className:`table-header-group`,
children:(0,
U.jsx)(`div`,
{
id:`${e}-table-header-group-table-row`,
className:`table-row`,
children:i
})
})
}function Ag(e,
t,
n,
r,
i){
R.log(`GmTable: getRenderedRows: tableId = ${e}`);
function a(e){
return(0,
ms.default)(`table-row cursor-pointer even:bg-gray-100 h-4`,
{
"bg-gray-300":e,
"hover:bg-gray-200":!e
})
}function o(e){
return(0,
ms.default)(`border-b-2 border-black py-2 pl-3`,
{
"table-cell":e.isFixed,
"hidden md:table-cell":!e.isFixed,
"text-sm":e.smallerText
})
}function s(e,
t,
n){
return(0,
U.jsx)(`div`,
{
id:e,
className:o(t),
children:n.data[
t.propertyName
]
},
e)
}return(0,
U.jsx)(U.Fragment,
{
children:n.map((n,
o)=>{
let c=`${e}-table-row-${o}`;
return(0,
U.jsx)(`div`,
{
id:c,
className:a(r==o),
onClick:e=>i(e,
o,
n.data.id),
children:t.map((e,
t)=>s(`${c}-table-cell-${t}`,
e,
n))
},
c)
})
})
}function jg(e){
let{
id:t,
title:n,
columns:r,
rowData:i,
selectedItemId:a,
doSortRows:o,
...s
}=e,
[
c,
l
]=(0,
m.useState)(a||null),
u=(t,
n,
r)=>{
e.handleRowClick&&e.handleRowClick(t,
n,
r),
l(r)
},
d=i.map(e=>({
data:e
})),
f=d;
o&&e.sortColumn?f=d.sort((t,
n)=>{
let r=t.data[
e.sortColumn
],
i=n.data[
e.sortColumn
];
return r&&i?r.localeCompare(i):0
}):o&&!e.sortColumn&&(f=d.sort((e,
t)=>e.data.name?e.data.name.localeCompare(t.data.name):e.data.id.localeCompare(t.data.id))),
R.log(`001 GmTable`,
i);
let p=c?f.findIndex(e=>e.data.id===c):-1,
h=kg(t,
r),
g=Ag(t,
r,
f,
p,
u);
return(0,
U.jsxs)(`div`,
{
id:t,
className:`flex-col w-full pt-4`,
children:[
(0,
U.jsx)(`div`,
{
className:`w-full bg-gray-300 p-1 text-center`,
children:n
}),
(0,
U.jsxs)(`div`,
{
id:`${t}-table`,
className:`table table-auto w-full overflow-x-auto`,
children:[
h,
g
]
})
]
},
s.key||t)
}function Mg(){
let e=qp(),
t=$(ma),
n=$(ha);
function r(e){
console.debug(`copyRivalsV2: event`,
e),
rm.copyTextToClipboard(bm.formatRivalCrawlers(t,
im.Text))
}let i=t.name===``?null:(0,
U.jsx)(`div`,
{
className:`flex flex-row items-center`,
children:(0,
U.jsx)(Qh,
{
subtle:!0,
lefttoright:!0,
className:`w-full justify-center`,
onClick:r,
children:(0,
U.jsxs)(U.Fragment,
{
children:[
(0,
U.jsx)(Ys,
{

}),
`\xA0Copy`
]
})
})
}),
a=t=>{
R.log(`handleGetRivalsClick`);
let r=Zh.getRivalCrawlerParty(n);
R.log(`newRivals ${JSON.stringify(r,void 0,3)}`),
e(ua(r))
},
o=t=>{
R.log(`RivalCrawlersV2: quantity selector changed`,
t.currentTarget.value);
let n=+t.currentTarget.value;
R.log(`RivalCrawlersV2: newQuantity`,
n),
e(la(n))
},
s={
buttonText:`Get Rival Crawlers`,
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Get Rival Crawlers`,
descriptionText:`Create a group of rival crawlers of a particular size.`
}
},
c=[
{
options:ig.getRivalCrawlersQuantityOptions(),
selectedValue:n.toString(),
onSelectChange:o,
styleOptions:{
primary:!0,
centerSelectorSmall:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select Npc Quantity`,
descriptionText:`Select the number of NPCs to create.`
}
}
],
l={
id:t.id,
key:t.id,
title:`MEMBERS`,
columns:[
{
name:`Name`,
propertyName:`name`,
isFixed:!0
},
{
name:`Ancestry`,
propertyName:`ancestry`,
isFixed:!1
},
{
name:`Level`,
propertyName:`level`,
isFixed:!0
},
{
name:`Class`,
propertyName:`class`,
isFixed:!0
}
],
rowData:t.members,
doSortRows:!0
},
u=t.name===``?null:(0,
U.jsxs)(`div`,
{
className:`grow pt-4`,
children:[
i,
(0,
U.jsx)(Tg,
{
heading:t.name,
subheading:t.alignment,
children:(0,
U.jsxs)(`ul`,
{
className:`text-left list-inside`,
children:[
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Renown:`
}),
` `,
t.renown
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Known for:`
}),
` `,
t.knownFor
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Tactic:`
}),
` `,
t.tactic
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Wealth:`
}),
` `,
t.wealth
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Secret:`
}),
` `,
t.secret
]
})
]
})
}),
(0,
U.jsx)(jg,
{
...l
})
]
});
return(0,
U.jsxs)(vg,
{
toolName:I.RivalCrawlers,
children:[
(0,
U.jsx)(yg,
{
titleLeft:`Rival Crawlers`,
description:`Create a group of rival crawlers for the party to encounter.`,
children:(0,
U.jsx)(nm,
{
primaryButtonOptions:s,
subButtonOptions:c,
onClick:a,
children:(0,
U.jsx)(U.Fragment,
{

})
})
}),
(0,
U.jsx)(yg,
{
children:u
})
]
})
}function Ng(e,
t,
n){
let r=t.find(t=>t.id===e);
if(r!==void 0)return r;
let i=n.find(t=>t.id===e);
return i===void 0?ga.getEmptyType():i
}function Pg(e,
t){
return t.find(t=>t.id===e)?(R.log(`---------- isShopSaved (${e}): TRUE`),
!0):(R.log(`---------- isShopSaved (${e}): FALSE`),
!1)
}function Fg(e){
return e?[
{
id:`main${e.id}`,
name:`Main`,
heading:e.name,
subheading:e.type,
content:(0,
U.jsxs)(`ul`,
{
className:`text-left list-inside`,
children:[
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Tier:`
}),
` `,
e.tier
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Known for:`
}),
` `,
e.knownFor
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Notable customer:`
}),
` `,
e.customer
]
})
]
})
}
]:[

]
}function Ig(){
let e=qp(),
t=$(Na),
n=$(Pa),
r=$(Fa),
i=Ng(r,
n,
t),
a={
buttonText:`Generate Shops`,
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Generate Shops`,
descriptionText:`Create a specific number of Shops of a specific wealth tier.`
}
},
o=t=>{
let n=Zh.getShops(c,
f);
e(Ca(n))
},
s=ag.convertValuesToSelectFormat(ig.getQuantityValuesFib(),
!1),
[
c,
l
]=(0,
m.useState)(5),
u={
options:s,
selectedValue:c.toString(),
onSelectChange:e=>{
let t=+e.currentTarget.value;
l(t)
},
styleOptions:{
primary:!0,
centerSelectorSmall:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select Shop Quantity`,
descriptionText:`Select the number of Shops to create.`
}
},
d=ag.convertValuesToSelectFormat(ig.getWealthValues(),
!0,
`Tier`),
[
f,
p
]=(0,
m.useState)(d[
0
].value),
h=[
u,
{
options:d,
selectedValue:f,
onSelectChange:e=>{
let t=e.currentTarget.value;
p(t)
},
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select Shop Wealth Tier`,
descriptionText:`Select the wealth tier of Shops to create.`
}
}
],
g=(r,
i,
a,
o)=>{
if(R.log(`ShopGeneratorV2 STARTED`),
r.stopPropagation(),
R.log(`ShopGeneratorV2 pinTogglItem(index = ${i}, toggleValue = ${a}, npcId = ${o})`),
a){
let t=n.find(e=>e.id===o);
t?(e(xa(t)),
e(Ea(t))):console.error(`No Shop with id == ${o}`)
}else{
let n=t.find(e=>e.id===o);
n?(e(Ta(n)),
e(Sa(n))):console.error(`No Shop with id == ${o}`)
}
},
_=(r,
i,
a)=>{
if(R.log(`ShopGeneratorV2 pinToggleItemNewFangled STARTED`),
r.stopPropagation(),
R.log(`ShopGeneratorV2 pinToggleItemNewFangled(toggleValue = ${i}, npcId = ${a})`),
i){
let t=n.find(e=>e.id===a);
t?(e(xa(t)),
e(Ea(t))):console.error(`No Shop with id == ${a}`)
}else{
let n=t.find(e=>e.id===a);
n?(e(Ta(n)),
e(Sa(n))):console.error(`No Shop with id == ${a}`)
}
},
v={
id:`Shop List`,
title:`Shops (Click on a row to focus on a Shop.)`,
columns:[
{
name:`Name`,
propertyName:`name`,
isFixed:!0
},
{
name:`Type`,
propertyName:`type`,
isFixed:!0
},
{
name:`Known For`,
propertyName:`knownFor`,
smallerText:!0,
isFixed:!1
},
{
name:`Customer`,
propertyName:`customer`,
smallerText:!0,
isFixed:!1
},
{
name:`Tier`,
propertyName:`tier`,
smallerText:!0,
isFixed:!1
}
],
setPinColumn:0,
handleRowClick:(r,
i,
a)=>{
R.log(`ShopGeneratorV2 handlePinnableTableRowClick row = ${i}, shopId = ${a}`);
let o=Ng(a,
n,
t);
o?(R.log(`ShopGeneratorV2 handlePinnableTableRowClick shop = `,
o),
e(ka(o.id))):console.error(`No Shop found with id == [${a}]`)
},
handlePinClick:g,
rowData:n,
pinnedRowData:t
};
function y(e){
console.debug(`ShopGeneratorV2: copyItemV2: event`,
e),
rm.copyTextToClipboard(bm.formatShop(i,
im.Text))
}function b(e){
return console.debug(`ShopGeneratorV2 shop.id = ${e.id}`),
[
{
name:`Pin`,
icon:G.getPinIcon(),
onClick:rg,
isToggle:!0,
toggleOptions:{
toggleValue:Pg(r,
t),
toggleClick:_,
nameOff:`Pin`,
iconOff:G.getPinUnpinnedIcon(),
nameOn:`Unpin`,
iconOn:G.getPinPinnedIcon()
}
},
{
name:`Copy`,
icon:G.getCopyIcon(),
onClick:y,
isToggle:!1
}
]
}let x=(0,
m.useMemo)(()=>Fg(i),
[
i
]),
S=i.id===``?null:(0,
U.jsxs)(`div`,
{
className:`grow`,
children:[
(0,
U.jsx)(ng,
{
itemName:`SHOP`,
itemId:i.id,
functionButtonOptions:b(i)
}),
(0,
U.jsx)(wm,
{
id:`selected_shop`,
name:`selected_shop`,
heading:i.name,
subheading:i.type,
tabs:x,
selectedTabIndex:0
},
i.id)
]
});
return(0,
U.jsxs)(vg,
{
toolName:I.ShopGenerator,
children:[
(0,
U.jsx)(yg,
{
titleLeft:`Shop Generator`,
description:`Create random shops with a potentially wealth tier. Click on a row to focus on a shop.`,
children:(0,
U.jsx)(`div`,
{
children:(0,
U.jsx)(nm,
{
primaryButtonOptions:a,
subButtonOptions:h,
onClick:o,
children:(0,
U.jsx)(U.Fragment,
{

})
})
})
}),
n.length+t.length<=0?(0,
U.jsx)(U.Fragment,
{

}):(0,
U.jsx)(yg,
{
children:(0,
U.jsx)(Am,
{
...v
})
}),
(0,
U.jsx)(`div`,
{
className:`flex pt-4`,
children:(0,
U.jsx)(yg,
{
title:i.name?`selected shop`:``,
children:S
})
})
]
})
}function Lg(e,
t,
n){
let r=t.find(t=>t.id===e);
if(r!==void 0)return r;
let i=n.find(t=>t.id===e);
return i===void 0?xo.getEmptyType():i
}function Rg(e,
t){
return t.find(t=>t.id===e)?(R.log(`---------- isItemSaved (${e}): TRUE`),
!0):(R.log(`---------- isItemSaved (${e}): FALSE`),
!1)
}function zg(e){
return e?[
{
id:`main${e.id}`,
name:`Main`,
heading:e.name,
subheading:``,
content:(0,
U.jsxs)(`ul`,
{
className:`text-left list-outside`,
children:[
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Tier:`
}),
` `,
e.tier
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Known for:`
}),
` `,
e.knownFor
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Menu:`
}),
` `,
e.menu.join(`, `)
]
}),
(0,
U.jsxs)(`li`,
{
children:[
(0,
U.jsx)(`b`,
{
children:`Drinks:`
}),
` `,
xo.getDrinkMenuAsString(e)
]
})
]
})
}
]:[

]
}function Bg(){
let e=qp(),
t=$(Ro),
n=$(zo),
r=$(Bo),
i=Lg(r,
n,
t),
a={
buttonText:`Generate Taverns`,
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Generate Taverns`,
descriptionText:`Create a specific number of Taverns of a specific wealth tier.`
}
},
o=t=>{
let n=Zh.getTaverns(c,
f);
e(Oo(n))
},
s=ag.convertValuesToSelectFormat(ig.getQuantityValuesFib(),
!1),
[
c,
l
]=(0,
m.useState)(5),
u={
options:s,
selectedValue:c.toString(),
onSelectChange:e=>{
let t=+e.currentTarget.value;
l(t)
},
styleOptions:{
primary:!0,
centerSelectorSmall:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select Tavern Quantity`,
descriptionText:`Select the number of Taverns to create.`
}
},
d=ag.convertValuesToSelectFormat(ig.getWealthValues(),
!0,
`Tier`),
[
f,
p
]=(0,
m.useState)(d[
0
].value),
h=[
u,
{
options:d,
selectedValue:f,
onSelectChange:e=>{
let t=e.currentTarget.value;
p(t)
},
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select Tavern Wealth Tier`,
descriptionText:`Select the wealth tier of Taverns to create.`
}
}
],
g=(r,
i,
a,
o)=>{
if(R.log(`TavernGeneratorV2 STARTED`),
r.stopPropagation(),
R.log(`TavernGeneratorV2 pinTogglItem(index = ${i}, toggleValue = ${a}, npcId = ${o})`),
a){
let t=n.find(e=>e.id===o);
t?(e(Eo(t)),
e(jo(t))):console.error(`No Tavern with id == ${o}`)
}else{
let n=t.find(e=>e.id===o);
n?(e(Ao(n)),
e(Do(n))):console.error(`No Tavern with id == ${o}`)
}
},
_=(r,
i,
a)=>{
if(R.log(`TavernGeneratorV2 STARTED`),
r.stopPropagation(),
R.log(`TavernGeneratorV2 pinToggleItemNewFangled(toggleValue = ${i}, npcId = ${a})`),
i){
let t=n.find(e=>e.id===a);
t?(e(Eo(t)),
e(jo(t))):console.error(`No Tavern with id == ${a}`)
}else{
let n=t.find(e=>e.id===a);
n?(e(Ao(n)),
e(Do(n))):console.error(`No Tavern with id == ${a}`)
}
},
v={
id:`Tavern List`,
title:`Taverns (Click on a row to focus on a Tavern.)`,
columns:[
{
name:`Name`,
propertyName:`name`,
isFixed:!0
},
{
name:`Tier`,
propertyName:`tier`,
isFixed:!0
},
{
name:`Known For`,
propertyName:`knownFor`,
smallerText:!0,
isFixed:!1
}
],
setPinColumn:0,
handleRowClick:(r,
i,
a)=>{
R.log(`TavernGeneratorV2 handlePinnableTableRowClick row = ${i}, tavernId = ${a}`);
let o=Lg(a,
n,
t);
o?(R.log(`TavernGeneratorV2 handlePinnableTableRowClick tavern = `,
o),
e(Po(o.id))):console.error(`No Tavern found with id == [${a}]`)
},
handlePinClick:g,
rowData:n,
pinnedRowData:t
};
function y(e){
console.debug(`TavernGeneratorV2: copyItemV2: event`,
e),
rm.copyTextToClipboard(bm.formatTavern(i,
im.Text))
}function b(e){
return console.debug(`TavernGeneratorV2 tavern.id = ${e.id}`),
[
{
name:`Pin`,
icon:G.getPinIcon(),
onClick:rg,
isToggle:!0,
toggleOptions:{
toggleValue:Rg(r,
t),
toggleClick:_,
nameOff:`Pin`,
iconOff:G.getPinUnpinnedIcon(),
nameOn:`Unpin`,
iconOn:G.getPinPinnedIcon()
}
},
{
name:`Copy`,
icon:G.getCopyIcon(),
onClick:y,
isToggle:!1
}
]
}let x=i.id===``?null:(0,
U.jsxs)(`div`,
{
className:`grow`,
children:[
(0,
U.jsx)(ng,
{
itemName:`TAVERN`,
itemId:i.id,
functionButtonOptions:b(i)
}),
(0,
U.jsx)(wm,
{
id:`selected_tavern`,
name:`selected_tavern`,
heading:i.name,
subheading:``,
tabs:zg(i),
selectedTabIndex:0
},
i.id)
]
});
return(0,
U.jsxs)(vg,
{
toolName:I.TavernGenerator,
children:[
(0,
U.jsx)(yg,
{
titleLeft:`Tavern Generator`,
description:`Create taverns with a selected or random wealth tier. Click on a row to focus on a tavern.`,
children:(0,
U.jsx)(`div`,
{
children:(0,
U.jsx)(nm,
{
primaryButtonOptions:a,
subButtonOptions:h,
onClick:o,
children:(0,
U.jsx)(U.Fragment,
{

})
})
})
}),
n.length+t.length<=0?(0,
U.jsx)(U.Fragment,
{

}):(0,
U.jsx)(yg,
{
children:(0,
U.jsx)(Am,
{
...v
})
}),
(0,
U.jsx)(`div`,
{
className:`flex pt-4`,
children:(0,
U.jsx)(yg,
{
title:i.name?`selected tavern`:``,
children:x
})
})
]
})
}var Vg=class{
static createEntityId(e=``){
return e&&!e.endsWith(`-`)?`${e}-${gn()}`:gn()
}
},
Hg=JSON.parse(JSON.stringify({
name:`Spell Data`,
rulesSection:`Core Rules`,
description:``,
entries:[
{
name:`Acid Arrow`,
duration:`Focus`,
range:`Far`,
description:`You conjure a corrosive bolt that hits one foe, dealing 1d6 damage a round. The bolt remains in the target for as long as you focus.`,
castWithAdv:!1,
class:`Wizard`,
tier:2,
tags:[
`acid`,
`single target`,
`summoning`
],
archetype:`damage`,
id:`spc-w2-acidarrow`
},
{
name:`Alarm`,
duration:`1 day`,
range:`Close`,
description:`You touch one object, such as a door threshold, setting a magical alarm on it. If any creature you do not designate while casting the spell touches or crosses past the object, a magical bell sounds in your head.`,
castWithAdv:!1,
class:`Wizard`,
tier:1,
tags:[
`control`,
`single target`,
`utility`
],
archetype:`utility`,
id:`spc-w1-alarm`
},
{
name:`Alter Self`,
duration:`5 rounds`,
range:`Self`,
description:`You magically change your physical form, gaining one feature that modifies your existing anatomy.
For example, you can grow functional gills on your neck or bear claws on your fingers. This spell can’t grow wings or limbs.`,
castWithAdv:!1,
class:`Wizard`,
tier:2,
tags:[
`self`,
`support`,
`transformation`
],
archetype:`support`,
id:`spc-w2-alterself`
},
{
name:`Animate Dead`,
duration:`1 day`,
range:`Close`,
description:`You touch one humanoid’s remains, and it rises as a zombie or skeleton under your control. The remains must have at least three limbs and its head intact.
The undead creature acts on your turn. After 1 day, the creature collapses into grave dust.`,
castWithAdv:!1,
class:`Wizard`,
tier:3,
tags:[
`death/dead/undead`,
`single target`,
`summoning`
],
archetype:`summoning`,
id:`spc-w3-animatedead`
},
{
name:`Antimagic Shell`,
duration:`Focus`,
range:`Self`,
description:`An invisible, near-sized cube of null-magic appears centered on you.
Within the cube, no spells can be cast. Magic items and spells have no effect in the zone, and no magic can enter.
The cube moves with you. Spells such as dispel magic have no effect on it.
Another antimagic shell does not affect this one.`,
castWithAdv:!1,
class:`Wizard`,
tier:5,
tags:[
`aoe`,
`protection`,
`self`
],
archetype:`protection`,
id:`spc-w5-antimagicshell`
},
{
name:`Arcane Eye`,
duration:`Focus`,
range:`Near`,
description:`You conjure an invisible, grape-sized eye within range.
You can see through the eye. It can see in the dark out to near range, fly near on your turn, and squeeze through openings as narrow as a keyhole.`,
castWithAdv:!1,
class:`Wizard`,
tier:4,
tags:[
`divination/information`,
`summoning`
],
archetype:`divination`,
id:`spc-w4-arcaneeye`
},
{
name:`Augury`,
duration:`Instant`,
range:`Self`,
description:`You interpret the meaning of supernatural portents and omens.
Ask the GM one question about a specific course of action. The GM says whether the action will lead to 'weal' or 'woe.'`,
castWithAdv:!1,
class:`Priest`,
tier:2,
tags:[
`divination/information`,
`self`
],
archetype:`divination`,
id:`spc-p2-augury`
},
{
name:`Bless`,
duration:`Instant`,
range:`Close`,
description:`One creature you touch gains a luck token.`,
castWithAdv:!1,
class:`Priest`,
tier:2,
tags:[
`buff`,
`single target`,
`support`
],
archetype:`support`,
id:`spc-p2-bless`
},
{
name:`Blind/Deafen`,
duration:`Focus`,
range:`Near`,
description:`You utter a divine censure, blinding or deafening one creature you can see in range. The creature has disadvantage on tasks requiring the lost sense.`,
castWithAdv:!1,
class:`Priest`,
tier:2,
tags:[
`control`,
`single target`
],
archetype:`control`,
id:`spc-p2-blinddeafen`
},
{
name:`Burning Hands`,
duration:`Instant`,
range:`Close`,
description:`You spread your fingers with thumbs touching, unleashing a circle of flame that fills a close area around where you stand. Creatures within the area of effect take 1d6 damage. Unattended flammable objects ignite.`,
castWithAdv:!1,
class:`Wizard`,
tier:1,
tags:[
`aoe`,
`fire`
],
archetype:`damage`,
id:`spc-w1-burninghands`
},
{
name:`Charm Person`,
duration:`1d8 days`,
range:`Near`,
description:`You magically beguile one humanoid of LV 2 or less within near range, who regards you as a friend for the duration.
The spell ends if you or your allies do anything harmful to the target.
The target knows it was magically charmed after the spell ends.`,
castWithAdv:!1,
class:`Wizard`,
tier:1,
tags:[
`control`,
`single target`
],
archetype:`control`,
id:`spc-w1-charmperson`
},
{
name:`Cleansing Weapon`,
duration:`5 rounds`,
range:`Close`,
description:`One weapon you touch is wreathed in purifying flames. It deals an additional 1d4 damage (1d6 vs. undead) for the duration.`,
castWithAdv:!1,
class:`Priest`,
tier:2,
tags:[
`death/dead/undead`,
`fire`,
`single target`
],
archetype:`damage`,
id:`spc-p2-cleansingweapon`
},
{
name:`Cloudkill`,
duration:`5 rounds`,
range:`Far`,
description:`A putrid cloud of yellow poison fills a near-sized cube within range. It spreads around corners.
Creatures inside the cloud are blinded and take 2d6 damage at the beginning of their turns.
A creature of level 9 or less that ends its turn fully inside the cloud dies.`,
castWithAdv:!1,
class:`Wizard`,
tier:4,
tags:[
`aoe`,
`control`,
`poison`
],
archetype:`damage`,
id:`spc-w4-cloudkill`
},
{
name:`Command`,
duration:`Focus`,
range:`Far`,
description:`You issue a verbal command to one creature in range who can understand you. The command must be one word, such as 'kneel.' The target obeys the command for as long as you focus.
If your command is ever directly harmful to the creature, it may make a Charisma check vs. your last spellcasting check. On a success, the spell ends.`,
castWithAdv:!1,
class:`Priest`,
tier:3,
tags:[
`control`,
`single target`
],
archetype:`control`,
id:`spc-p3-command`
},
{
name:`Commune`,
duration:`Instant`,
range:`Self`,
description:`You seek your god's counsel. Ask the GM up to three yes or no questions. The GM truthfully answers 'yes' or 'no' to each.
If you cast this spell more than once in 24 hours, treat a failed spellcasting check for it as a critical failure instead.`,
castWithAdv:!1,
class:`Priest`,
tier:4,
tags:[
`critical failure`,
`divination/information`,
`self`
],
archetype:`divination`,
id:`spc-p4-commune`
},
{
name:`Confusion`,
duration:`Focus`,
range:`Near`,
description:`You mesmerize one creature you can see in range. The target can't take actions, and it moves in a random direction on its turn. If the target is LV 9+, it may make a WIS check vs. your last spellcasting check at the start of its turn to end the spell.`,
castWithAdv:!1,
class:`Wizard`,
tier:4,
tags:[
`control`,
`single target`
],
archetype:`control`,
id:`spc-w4-confusion`
},
{
name:`Control Water`,
duration:`Focus`,
range:`Far`,
description:`You move and shape water. You can cause a section of water up to 100 feet in width and depth to change shape, defy gravity, or flow in a different direction.`,
castWithAdv:!1,
class:`Priest`,
tier:4,
tags:[
`control`,
`transformation`
],
archetype:`control`,
id:`spc-p4-controlwater`
},
{
name:`Control Water`,
duration:`Focus`,
range:`Far`,
description:`You move and shape water. You can cause a section of water up to 100 feet in width and depth to change shape, defy gravity, or flow in a different direction.`,
castWithAdv:!1,
class:`Wizard`,
tier:4,
tags:[
`control`,
`transformation`
],
archetype:`control`,
id:`spc-w4-controlwater`
},
{
name:`Create Undead`,
duration:`1 day`,
range:`Close`,
description:`You conjure a vengeful undead creature to do your bidding.
When you cast this spell, you choose to summon either a wight or wraith. It appears next to you and is under your control.
The undead creature acts on your turn. After 1 day, it melts away into smoke.`,
castWithAdv:!1,
class:`Wizard`,
tier:5,
tags:[
`death/dead/undead`,
`summoning`
],
archetype:`summoning`,
id:`spc-w5-createundead`
},
{
name:`Cure Wounds`,
duration:`Instant`,
range:`Close`,
description:`Your touch restores ebbing life.
Roll a number of d6s equal to 1 + half your level (rounded down). One target you touch regains that many hit points.`,
castWithAdv:!1,
class:`Priest`,
tier:1,
tags:[
`healing`,
`single target`,
`support`
],
archetype:`support`,
id:`spc-p1-curewounds`
},
{
name:`Detect Magic`,
duration:`Focus`,
range:`Near`,
description:`You can sense the presence of magic within near range for the spell's duration. If you focus for two rounds, you discern its general properties. Full barriers block this spell.`,
castWithAdv:!1,
class:`Wizard`,
tier:1,
tags:[
`divination/information`
],
archetype:`divination`,
id:`spc-w1-detectmagic`
},
{
name:`Detect Thoughts`,
duration:`Focus`,
range:`Near`,
description:`You peer into the mind of one creature you can see within range. Each round, you learn the target’s immediate thoughts.
On its turn, the target makes a Wisdom check vs. your last spellcasting check. If the target succeeds, it notices your presence in its mind and the spell ends.`,
castWithAdv:!1,
class:`Wizard`,
tier:2,
tags:[
`divination/information`,
`single target`
],
archetype:`divination`,
id:`spc-w2-detectthoughts`
},
{
name:`Dimension Door`,
duration:`Instant`,
range:`Self`,
description:`You teleport yourself and up to one other willing creature to any point you can see.`,
castWithAdv:!1,
class:`Wizard`,
tier:4,
tags:[
`movement`,
`multi-target`,
`self`,
`utility`
],
archetype:`utility`,
id:`spc-w4-dimensiondoor`
},
{
name:`Disintegrate`,
duration:`Instant`,
range:`Far`,
description:`A green ray shoots from your finger and turns a creature or object into ash.
A target creature of LV 5 or less instantly dies. If it is LV 6+, it takes 3d8 damage instead.
A non-magical object up to the size of a large tree is destroyed.`,
castWithAdv:!1,
class:`Wizard`,
tier:5,
tags:[
`single target`
],
archetype:`damage`,
id:`spc-w5-disintegrate`
},
{
name:`Dispel Magic`,
duration:`Instant`,
range:`Near`,
description:`End one spell that affects one target you can see in range.`,
castWithAdv:!1,
class:`Wizard`,
tier:3,
tags:[
`protection`,
`single target`,
`utility`
],
archetype:`utility`,
id:`spc-w3-dispelmagic`
},
{
name:`Divination`,
duration:`Instant`,
range:`Self`,
description:`You throw the divining bones or peer into the blackness between the stars, seeking a portent.
You can ask the GM one yes or no question. The GM truthfully answers 'yes' or 'no'.
If you cast this spell more than once in 24 hours, treat a failed spellcasting check for it as a critical failure instead.`,
castWithAdv:!1,
class:`Wizard`,
tier:4,
tags:[
`critical failure`,
`divination/information`,
`self`
],
archetype:`divination`,
id:`spc-w4-divination`
},
{
name:`Divine Vengeance`,
duration:`10 rounds`,
range:`Self`,
description:`You become the divine avatar of your god's wrath, wreathed in holy flames or a black aura of smoldering corruption.
For the spell's duration, you can fly a near distance, your weapons are magical, and you have a +4 bonus to your weapon attacks and damage.`,
castWithAdv:!1,
class:`Priest`,
tier:5,
tags:[
`buff`,
`fire`,
`movement`,
`self`,
`support`
],
archetype:`support`,
id:`spc-p5-divinevengeance`
},
{
name:`Dominion`,
duration:`10 rounds`,
range:`Near`,
description:`Mighty beings come to your aid.
The beings must have a combined total of 16 levels or less. Chaotic PCs summon demons/devils, and lawful or neutral PCs summon angels.
The beings act of free will to aid you on your turn. After 10 rounds, they return to their realms. You cannot cast this spell again until you complete penance.`,
castWithAdv:!1,
class:`Priest`,
tier:5,
tags:[
`multi-target`,
`penance`,
`summoning`
],
archetype:`summoning`,
id:`spc-p5-dominion`
},
{
name:`Fabricate`,
duration:`10 rounds`,
range:`Near`,
description:`This spell can't target creatures.
You turn a tree-sized collection of raw materials into a finished work. For example, you convert a pile of bricks or rocks into a bridge. The finished work converts back to raw materials when the spell ends.`,
castWithAdv:!1,
class:`Wizard`,
tier:3,
tags:[
`summoning`,
`utility`
],
archetype:`utility`,
id:`spc-w3-fabricate`
},
{
name:`Feather Fall`,
duration:`Instant`,
range:`Self`,
description:`You may make an attempt to cast this spell when you fall.
Your rate of descent slows so that you land safely on your feet.`,
castWithAdv:!1,
class:`Wizard`,
tier:1,
tags:[
`movement`,
`protection`,
`self`,
`support`
],
archetype:`protection`,
id:`spc-w1-featherfall`
},
{
name:`Fireball`,
duration:`Instant`,
range:`Far`,
description:`You hurl a small flame that erupts into a fiery blast. All creatures in a near-sized cube around where the flame lands take 4d6 damage.`,
castWithAdv:!1,
class:`Wizard`,
tier:3,
tags:[
`aoe`,
`fire`
],
archetype:`damage`,
id:`spc-w3-fireball`
},
{
name:`Fixed Object`,
duration:`5 rounds`,
range:`Close`,
description:`An object you touch that weighs no more than 5 pounds becomes fixed in its current location. It can support up to 5,000 pounds of weight for the duration of the spell.`,
castWithAdv:!1,
class:`Wizard`,
tier:2,
tags:[
`utility`
],
archetype:`utility`,
id:`spc-w2-fixedobject`
},
{
name:`Flame Strike`,
duration:`Instant`,
range:`Far`,
description:`You call down a holy pillar of fire, immolating one creature you can see within range. The target takes 2d6 damage.`,
castWithAdv:!1,
class:`Priest`,
tier:4,
tags:[
`fire`,
`single target`
],
archetype:`damage`,
id:`spc-p4-flamestrike`
},
{
name:`Floating Disk`,
duration:`10 rounds`,
range:`Near`,
description:`You create a floating, circular disk of force with a concave center. It can carry up to 20 gear slots. It hovers at waist level and automatically stays within near of you. It can’t cross over drop-offs or pits taller than a human.`,
castWithAdv:!1,
class:`Wizard`,
tier:1,
tags:[
`movement`,
`utility`
],
archetype:`utility`,
id:`spc-w1-floatingdisk`
},
{
name:`Fly`,
duration:`5 rounds`,
range:`Self`,
description:`Your feet lift from the ground, and you take to the air like a hummingbird. You can fly near for the spell's duration and are able to hover in place.`,
castWithAdv:!1,
class:`Wizard`,
tier:3,
tags:[
`movement`,
`support`,
`self`,
`support`
],
archetype:`support`,
id:`spc-w3-fly`
},
{
name:`Gaseous Form`,
duration:`10 rounds`,
range:`Self`,
description:`You and your gear turn into a cloud of smoke for the spell's duration.
You can fly and pass through any gap that smoke could. You can sense the terrain and any movement around you out to a near distance.
You can't cast spells while in this form.`,
castWithAdv:!1,
class:`Wizard`,
tier:3,
tags:[
`movement`,
`self`,
`support`,
`transformation`
],
archetype:`support`,
id:`spc-w3-gaseousform`
},
{
name:`Heal`,
duration:`Instant`,
range:`Close`,
description:`One creature you touch is healed to full hit points.
You cannot cast this spell again until you complete a rest.`,
castWithAdv:!1,
class:`Priest`,
tier:5,
tags:[
`healing`,
`single target`,
`support`
],
archetype:`support`,
id:`spc-p5-heal`
},
{
name:`Hold Monster`,
duration:`Focus`,
range:`Near`,
description:`You paralyze one creature you can see within range. If the target is LV 9+, it may make a STR check vs. your last spellcasting check at the start of its turn to end the spell.`,
castWithAdv:!1,
class:`Wizard`,
tier:5,
tags:[
`control`,
`single target`
],
archetype:`control`,
id:`spc-w5-holdmonster`
},
{
name:`Hold Person`,
duration:`Focus`,
range:`Near`,
description:`You magically paralyze one humanoid creature of LV 4 or less you can see within range.`,
castWithAdv:!1,
class:`Wizard`,
tier:2,
tags:[
`control`,
`single target`
],
archetype:`control`,
id:`spc-w2-holdperson`
},
{
name:`Hold Portal`,
duration:`10 rounds`,
range:`Near`,
description:`You magically hold a portal closed for the duration. A creature must make a successful STR check vs. your spellcasting check to open the portal.
The knock spell ends this spell.`,
castWithAdv:!1,
class:`Wizard`,
tier:1,
tags:[
`control`
],
archetype:`control`,
id:`spc-w1-holdportal`
},
{
name:`Holy Weapon`,
duration:`5 rounds`,
range:`Close`,
description:`One weapon you touch is imbued with a sacred blessing. The weapon becomes magical and has +1 to attack and damage rolls for the duration.`,
castWithAdv:!1,
class:`Priest`,
tier:1,
tags:[
`buff`,
`single target`,
`support`
],
archetype:`support`,
id:`spc-p1-holyweapon`
},
{
name:`Illusion`,
duration:`Focus`,
range:`Far`,
description:`You create a convincing visible and audible illusion that fills up to a near-sized cube in range.
The illusion cannot cause harm, but creatures who believe the illusion is real react to it as though it were.
A creature who inspects the illusion from afar must pass a Wisdom check vs. your last spellcasting check to perceive the false nature of the illusion.
Touching the illusion also reveals its false nature.`,
castWithAdv:!1,
class:`Wizard`,
tier:3,
tags:[
`aoe`,
`deception`,
`utility`
],
archetype:`utility`,
id:`spc-w3-illusion`
},
{
name:`Invisibility`,
duration:`10 rounds`,
range:`Close`,
description:`A creature you touch becomes invisible for the spell’s duration.
The spell ends if the target attacks or casts a spell.`,
castWithAdv:!1,
class:`Wizard`,
tier:2,
tags:[
`buff`,
`deception`,
`support`
],
archetype:`support`,
id:`spc-w2-invisibility`
},
{
name:`Judgment`,
duration:`5 rounds`,
range:`Close`,
description:`You instantly banish a creature you touch, sending it and all possessions it carries to face the judgment of your god.
You can banish an intelligent creature of LV 10 or less.
When the creature returns in 5 rounds, it has been healed to full hit points if its deeds pleased your god. It has been reduced to 1 hit point if its deeds angered your god. If your god can't judge its actions, it is unchanged.`,
castWithAdv:!1,
class:`Priest`,
tier:5,
tags:[
`control`,
`healing`
],
archetype:`control`,
id:`spc-p5-judgment`
},
{
name:`Knock`,
duration:`Instant`,
range:`Near`,
description:`A door, window, gate, chest, or portal you can see within range instantly opens, defeating all mundane locks and barriers. This spell creates a loud knock audible to all within earshot.`,
castWithAdv:!1,
class:`Wizard`,
tier:2,
tags:[
`movement`,
`utility`
],
archetype:`utility`,
id:`spc-w2-knock`
},
{
name:`Lay to Rest`,
duration:`Instant`,
range:`Close`,
description:`You instantly send an undead creature you touch to its final afterlife, destroying it utterly.
You can target an undead creature of LV 9 or less.`,
castWithAdv:!1,
class:`Priest`,
tier:3,
tags:[
`death/dead/undead`,
`single target`
],
archetype:`damage`,
id:`spc-p3-laytorest`
},
{
name:`Levitate`,
duration:`Focus`,
range:`Self`,
description:`You can float a near distance vertically per round on your turn. You can also push against solid objects to move horizontally.`,
castWithAdv:!1,
class:`Wizard`,
tier:2,
tags:[
`movement`,
`self`,
`support`
],
archetype:`support`,
id:`spc-w2-levitate`
},
{
name:`Light`,
duration:`1 hour real time`,
range:`Close`,
description:`One object you touch glows with bright, heatless light, illuminating out to a near distance for 1 hour of real time.`,
castWithAdv:!1,
class:`Priest`,
tier:1,
tags:[
`single target`,
`utility`
],
archetype:`utility`,
id:`spc-p1-light`
},
{
name:`Light`,
duration:`1 hour real time`,
range:`Close`,
description:`One object you touch glows with bright, heatless light, illuminating out to a near distance for 1 hour of real time.`,
castWithAdv:!1,
class:`Wizard`,
tier:1,
tags:[
`single target`,
`utility`
],
archetype:`utility`,
id:`spc-w1-light`
},
{
name:`Lightning Bolt`,
duration:`Instant`,
range:`Far`,
description:`You shoot a blue-white ray of lightning from your hands, hitting all creatures in a straight line out to a far distance.
Creatures struck by the lightning take 3d6 damage.`,
castWithAdv:!1,
class:`Wizard`,
tier:3,
tags:[
`aoe`,
`lightning`
],
archetype:`damage`,
id:`spc-w3-lightningbolt`
},
{
name:`Mage Armor`,
duration:`10 rounds`,
range:`Self`,
description:`An invisible layer of magical force protects your vitals. Your armor class becomes 14 (18 on a critical spellcasting check) for the spell’s duration.`,
castWithAdv:!1,
class:`Wizard`,
tier:1,
tags:[
`buff`,
`protection`,
`self`
],
archetype:`protection`,
id:`spc-w1-magearmor`
},
{
name:`Magic Circle`,
duration:`Focus`,
range:`Near`,
description:`You conjure a circle of runes out to near-sized cube centered on yourself and name a type of creature (for example, demons).
For the spell’s duration, creatures of the chosen type cannot attack or cast a hostile spell on anyone inside the circle. The chosen creatures also can’t possess, compel, or beguile anyone inside the circle.`,
castWithAdv:!1,
class:`Wizard`,
tier:3,
tags:[
`aoe`,
`control`,
`protection`,
`self`,
`summoning`
],
archetype:`protection`,
id:`spc-w3-magiccircle`
},
{
name:`Magic Missile`,
duration:`Instant`,
range:`Far`,
description:`You have advantage on your check to cast this spell.
A glowing bolt of force streaks from your open hand, dealing 1d4 damage to one target.`,
castWithAdv:!0,
class:`Wizard`,
tier:1,
tags:[
`single target`
],
archetype:`damage`,
id:`spc-w1-magicmissile`
},
{
name:`Mass Cure`,
duration:`Instant`,
range:`Near`,
description:`All allies within near range of you regain 2d6 hit points.`,
castWithAdv:!1,
class:`Priest`,
tier:3,
tags:[
`healing`,
`multi-target`,
`support`
],
archetype:`support`,
id:`spc-p3-masscure`
},
{
name:`Mirror Image`,
duration:`5 rounds`,
range:`Self`,
description:`You create a number of illusory duplicates of yourself equal to half your level rounded down (minimum 1). The duplicates surround you and mimic you.
Each time a creature attacks you, the attack misses and causes one of the duplicates to evaporate. If all of the illusions have disappeared, the spell ends.`,
castWithAdv:!1,
class:`Wizard`,
tier:2,
tags:[
`deception`,
`protection`,
`self`
],
archetype:`protection`,
id:`spc-w2-mirrorimage`
},
{
name:`Misty Step`,
duration:`Instant`,
range:`Self`,
description:`In a puff of smoke, you teleport a near distance to an area you can see.`,
castWithAdv:!1,
class:`Wizard`,
tier:2,
tags:[
`movement`,
`self`,
`utility`
],
archetype:`utility`,
id:`spc-w2-mistystep`
},
{
name:`Passwall`,
duration:`5 rounds`,
range:`Close`,
description:`A tunnel of your height opens in a barrier you touch and lasts for the duration.
The passage can be up to near distance in length and must be in a straight line.`,
castWithAdv:!1,
class:`Wizard`,
tier:4,
tags:[
`aoe`,
`movement`,
`utility`
],
archetype:`utility`,
id:`spc-w4-passwall`
},
{
name:`Pillar of Salt`,
duration:`Focus`,
range:`Near`,
description:`A creature you target turns into a statue made of hardened salt.
You can target a creature you can see of LV 5 or less.
If you successfully focus on this spell for 3 rounds in a row, the transformation becomes permanent.`,
castWithAdv:!1,
class:`Priest`,
tier:4,
tags:[
`control`,
`transformation`
],
archetype:`control`,
id:`spc-p4-pillarofsalt`
},
{
name:`Plane Shift`,
duration:`Instant`,
range:`Close`,
description:`You fold space and time, transporting yourself and all willing creatures within close range to a location on another plane of your choice.
Unless you have been to your intended location before, you appear in a random place on the destination plane.`,
castWithAdv:!1,
class:`Priest`,
tier:5,
tags:[
`movement`,
`multi-target`,
`self`,
`utility`
],
archetype:`utility`,
id:`spc-p5-planeshift`
},
{
name:`Plane Shift`,
duration:`Instant`,
range:`Close`,
description:`You fold space and time, transporting yourself and all willing creatures within close range to a location on another plane of your choice.
Unless you have been to your intended location before, you appear in a random place on the destination plane.`,
castWithAdv:!1,
class:`Wizard`,
tier:5,
tags:[
`movement`,
`multi-target`,
`self`,
`utility`
],
archetype:`utility`,
id:`spc-w5-planeshift`
},
{
name:`Polymorph`,
duration:`10 rounds`,
range:`Close`,
description:`You transform a creature you touch into another natural creature you choose of equal or smaller size. Any gear the target carries melds into its new form.
The target gains the creature's physical stats and features, but it retains its non-physical stats and features.
If the target goes to 0 hit points, it reverts to its true form at half its prior hit points.
You can target any willing creature with this spell, or an unwilling creature whose level is less than or equal to half your level rounded down (min. 1).`,
castWithAdv:!1,
class:`Wizard`,
tier:4,
tags:[
`control`,
`self`,
`support`,
`transformation`
],
archetype:`support`,
id:`spc-w4-polymorph`
},
{
name:`Power Word Kill`,
duration:`Instant`,
range:`Near`,
description:`You utter the Word of Doom. One creature you target of LV 9 or less dies if it hears you.
Treat a failed spellcasting check for this spell as a critical failure, and roll the mishap with disadvantage.`,
castWithAdv:!1,
class:`Wizard`,
tier:5,
tags:[
`critical failure`,
`single target`
],
archetype:`damage`,
id:`spc-w5-powerwordkill`
},
{
name:`Prismatic Orb`,
duration:`Instant`,
range:`Far`,
description:`You send a strobing orb of energy streaking toward a target within range.
Choose an energy type from fire, cold, or electricity. The orb deals 3d8 damage and delivers a concussive blast of the chosen energy type.
If the energy type is anathema to the target's existence (for example, cold energy against a fire elemental), the orb deals double damage to it instead.`,
castWithAdv:!1,
class:`Wizard`,
tier:5,
tags:[
`cold`,
`fire`,
`lightning`
],
archetype:`damage`,
id:`spc-w5-prismaticorb`
},
{
name:`Prophecy`,
duration:`Instant`,
range:`Self`,
description:`You commune directly with your god for guidance.
Ask the GM one question. The GM answers the question truthfully using the knowledge your god possesses. Deities are mighty, but not omniscient.
You cannot cast this spell again until you complete penance.`,
castWithAdv:!1,
class:`Priest`,
tier:5,
tags:[
`divination/information`,
`penance`,
`self`
],
archetype:`divination`,
id:`spc-p5-prophecy`
},
{
name:`Protection from Energy`,
duration:`Focus`,
range:`Close`,
description:`One creature you touch becomes impervious to the wild fury of the elements.
Choose fire, cold, or electricity. For the spell's duration, the target is immune to harm from energy of the chosen type.`,
castWithAdv:!1,
class:`Wizard`,
tier:3,
tags:[
`cold`,
`fire`,
`lightning`,
`protection`,
`single target`
],
archetype:`protection`,
id:`spc-w3-protectionfromenergy`
},
{
name:`Protection from Evil`,
duration:`Focus`,
range:`Close`,
description:`For the spell’s duration, chaotic beings have disadvantage on attack rolls and hostile spellcasting checks against the target. These beings also can’t possess, compel, or beguile it.
When cast on an already possessed target, the possessing entity makes a CHA check vs. the last spellcasting check. On a failure, the entity is expelled.`,
castWithAdv:!1,
class:`Priest`,
tier:1,
tags:[
`control`,
`multi-target`,
`protection`
],
archetype:`protection`,
id:`spc-p1-protectionfromevil`
},
{
name:`Protection from Evil`,
duration:`Focus`,
range:`Close`,
description:`For the spell’s duration, chaotic beings have disadvantage on attack rolls and hostile spellcasting checks against the target. These beings also can’t possess, compel, or beguile it.
When cast on an already possessed target, the possessing entity makes a CHA check vs. the last spellcasting check. On a failure, the entity is expelled.`,
castWithAdv:!1,
class:`Wizard`,
tier:1,
tags:[
`control`,
`multi-target`,
`protection`
],
archetype:`protection`,
id:`spc-w1-protectionfromevil`
},
{
name:`Rebuke Unholy`,
duration:`Instant`,
range:`Near`,
description:`You rebuke creatures who oppose your alignment, forcing them to flee. You must present a holy symbol to cast this spell.
If you are lawful or neutral, this spell affects demons, devils, and outsiders. If you are chaotic, this spell affects angels and natural creatures of the wild.
Affected creatures within near of you must make a CHA check vs. your spellcasting check. If a creature fails by 10+ points and is equal to or less than your level, it is destroyed. Otherwise, on a fail, it flees from you for 5 rounds.`,
castWithAdv:!1,
class:`Priest`,
tier:3,
tags:[
`control`
],
archetype:`control`,
id:`spc-p3-rebukeunholy`
},
{
name:`Regenerate`,
duration:`Focus`,
range:`Close`,
description:`A creature you touch regains 1d4 hit points on your turn for the duration. This spell also regrows lost body parts.`,
castWithAdv:!1,
class:`Priest`,
tier:4,
tags:[
`healing`,
`support`
],
archetype:`support`,
id:`spc-p4-regenerate`
},
{
name:`Resilient Sphere`,
duration:`5 rounds`,
range:`Close`,
description:`You conjure a weightless, glassy sphere around you that extends out to close range.
For the spell's duration, nothing can pass through or crush the sphere.
You can roll the sphere a near distance on your turn.`,
castWithAdv:!1,
class:`Wizard`,
tier:4,
tags:[
`control`,
`protection`,
`summoning`
],
archetype:`protection`,
id:`spc-w4-resilientsphere`
},
{
name:`Restoration`,
duration:`Instant`,
range:`Close`,
description:`With the touch of your hands, you expunge curses and illnesses. One curse, illness, or affliction of your choice affecting the target creature ends.`,
castWithAdv:!1,
class:`Priest`,
tier:3,
tags:[
`healing`,
`support`
],
archetype:`support`,
id:`spc-p3-restoration`
},
{
name:`Scrying`,
duration:`Focus`,
range:`Self`,
description:`You look into a crystal ball or reflecting pool, calling up images of a distant place.
For the spell's duration, you can see and hear a creature or location you choose that is on the same plane.
This spell is DC 18 to cast if you try to scry on a creature or location that is unfamiliar to you.
Each round, creatures you view may make a Wisdom check vs. your last spellcasting check. On a success, they become aware of your magical observation.`,
castWithAdv:!1,
class:`Wizard`,
tier:5,
tags:[
`divination/information`,
`self`
],
archetype:`divination`,
id:`spc-w5-scrying`
},
{
name:`Sending`,
duration:`Instant`,
range:`Unlimited`,
description:`You send a brief, mental message to any creature with whom you are familiar who is on the same plane.`,
castWithAdv:!1,
class:`Wizard`,
tier:3,
tags:[
`divination/information`
],
archetype:`divination`,
id:`spc-w3-sending`
},
{
name:`Shapechange`,
duration:`Focus`,
range:`Self`,
description:`You transform yourself and any gear you carry into another natural creature you've seen of level 10 or less. You assume the creature's physical stats and features, but you retain your non-physical stats and features (including INT, WIS, and CHA).
If you go to 0 HP while under the effects of this spell, you revert to your true form at 1 HP.`,
castWithAdv:!1,
class:`Wizard`,
tier:5,
tags:[
`self`,
`support`,
`transformation`
],
archetype:`support`,
id:`spc-w5-shapechange`
},
{
name:`Shield of Faith`,
duration:`5 rounds`,
range:`Self`,
description:`A protective force wrought of your holy conviction surrounds you. You gain a +2 bonus to your armor class for the duration.`,
castWithAdv:!1,
class:`Priest`,
tier:1,
tags:[
`buff`,
`protection`,
`self`
],
archetype:`protection`,
id:`spc-p1-shieldoffaith`
},
{
name:`Silence`,
duration:`Focus`,
range:`Far`,
description:`You magically mute sound in a near cube within the spell's range. Creatures inside the area are deafened, and any sounds they create cannot be heard.`,
castWithAdv:!1,
class:`Wizard`,
tier:2,
tags:[
`aoe`,
`control`
],
archetype:`control`,
id:`spc-w2-silence`
},
{
name:`Sleep`,
duration:`Instant`,
range:`Near`,
description:`You weave a lulling spell that fills a near-sized cube extending from you. Creatures in the area of effect fall into a deep sleep if they are LV 2 or less.
Vigorous shaking or being injured wakes them.`,
castWithAdv:!1,
class:`Wizard`,
tier:1,
tags:[
`aoe`,
`control`
],
archetype:`control`,
id:`spc-w1-sleep`
},
{
name:`Smite`,
duration:`Instant`,
range:`Near`,
description:`You call down punishing flames on a creature you can see within range. It takes 1d6 damage.`,
castWithAdv:!1,
class:`Priest`,
tier:2,
tags:[
`fire`
],
archetype:`damage`,
id:`spc-p2-smite`
},
{
name:`Speak with Dead`,
duration:`Instant`,
range:`Close`,
description:`A dead body you touch answers your questions in a distant, wheezing voice.
You can ask the dead body up to three yes or no questions (one at a time).
The GM truthfully answers 'yes' or 'no' to each. If you cast this spell more than once in 24 hours, treat a failed spellcasting check for it as a critical failure instead.`,
castWithAdv:!1,
class:`Priest`,
tier:3,
tags:[
`critical failure`,
`death/dead/undead`,
`divination/information`
],
archetype:`divination`,
id:`spc-p3-speakwithdead`
},
{
name:`Speak with Dead`,
duration:`Instant`,
range:`Close`,
description:`A dead body you touch answers your questions in a distant, wheezing voice.
You can ask the dead body up to three yes or no questions (one at a time).
The GM truthfully answers 'yes' or 'no' to each. If you cast this spell more than once in 24 hours, treat a failed spellcasting check for it as a critical failure instead.`,
castWithAdv:!1,
class:`Wizard`,
tier:3,
tags:[
`critical failure`,
`death/dead/undead`,
`divination/information`
],
archetype:`divination`,
id:`spc-w3-speakwithdead`
},
{
name:`Stoneskin`,
duration:`10 rounds`,
range:`Self`,
description:`Your skin becomes like granite. For the spell's duration, your armor class becomes 17 (20 on a critical spellcasting check).`,
castWithAdv:!1,
class:`Wizard`,
tier:4,
tags:[
`buff`,
`protection`,
`self`
],
archetype:`protection`,
id:`spc-w4-stoneskin`
},
{
name:`Summon Extraplanar`,
duration:`Focus`,
range:`Near`,
description:`You reach into the outer planes, summoning forth a creature.
You summon an elemental or outsider of LV 7 or less. The creature is under your control and acts on your turn.
If you lose focus on this spell, you lose control of the creature and it becomes hostile toward you and your allies.
You must pass a spellcasting check on your turn to return the creature to the outer planes.`,
castWithAdv:!1,
class:`Wizard`,
tier:5,
tags:[
`multi-target`,
`summoning`
],
archetype:`summoning`,
id:`spc-w5-summonextraplanar`
},
{
name:`Telekinesis`,
duration:`Focus`,
range:`Far`,
description:`You lift a creature or object with your mind. Choose a target that weighs 1,000 pounds or less. You can move it a near distance in any direction and hold it in place.`,
castWithAdv:!1,
class:`Wizard`,
tier:4,
tags:[
`control`,
`utility`
],
archetype:`utility`,
id:`spc-w4-telekinesis`
},
{
name:`Teleport`,
duration:`Instant`,
range:`Close`,
description:`You and any willing creatures you choose within close range teleport to a location you specify on your same plane.
You can travel to a known teleportation sigil or to a location you've been before. Otherwise, you have a 50% chance of arriving off-target.`,
castWithAdv:!1,
class:`Wizard`,
tier:5,
tags:[
`movement`,
`multi-target`,
`utility`
],
archetype:`utility`,
id:`spc-w5-teleport`
},
{
name:`Turn Undead`,
duration:`Instant`,
range:`Near`,
description:`You rebuke undead creatures, forcing them to flee. You must present a holy symbol to cast this spell.
Undead creatures within near of you must make a CHA check opposed by your spellcasting check. If a creature fails by 10+ points and is equal to or less than your level, it is destroyed. Otherwise, on a fail, it flees from you for 5 rounds.`,
castWithAdv:!1,
class:`Priest`,
tier:1,
tags:[
`control`,
`death/dead/undead`
],
archetype:`control`,
id:`spc-p1-turnundead`
},
{
name:`Wall of Force`,
duration:`5 rounds`,
range:`Near`,
description:`You lift your hands, conjuring a transparent wall of force.
The thin wall must be contiguous and can cover a near-sized area in width and length. You choose its shape.
Nothing on the same plane can physically pass through the wall.`,
castWithAdv:!1,
class:`Wizard`,
tier:4,
tags:[
`aoe`,
`control`,
`utility`
],
archetype:`utility`,
id:`spc-w4-wallofforce`
},
{
name:`Web`,
duration:`5 rounds`,
range:`Far`,
description:`You create a near-sized cube of sticky, dense spider web within the spell’s range. A creature stuck in the web can’t move and must succeed on a Strength check vs. your spellcasting check to free itself.`,
castWithAdv:!1,
class:`Wizard`,
tier:2,
tags:[
`aoe`,
`control`
],
archetype:`control`,
id:`spc-w2-web`
},
{
name:`Wish`,
duration:`Instant`,
range:`Self`,
description:`Make a single wish, stating it as exactly as possible. Your wish occurs, as interpreted by the GM.
Treat a failed spellcasting check for this spell as a critical failure, and roll the mishap with disadvantage.`,
castWithAdv:!1,
class:`Wizard`,
tier:5,
tags:[
`critical failure`,
`self`,
`utility`
],
archetype:`utility`,
id:`spc-w5-wish`
},
{
name:`Wrath`,
duration:`10 rounds`,
range:`Self`,
description:`Your weapons become magical +2 and deal an additional d8 damage for the spell's duration.`,
castWithAdv:!1,
class:`Priest`,
tier:4,
tags:[
`buff`,
`self`,
`support`
],
archetype:`support`,
id:`spc-p4-wrath`
},
{
name:`Zone of Truth`,
duration:`Focus`,
range:`Near`,
description:`You compel a creature you can see to speak truth. It can’t utter a deliberate lie while within range.`,
castWithAdv:!1,
class:`Priest`,
tier:2,
tags:[
`control`,
`divination/information`
],
archetype:`control`,
id:`spc-p2-zoneoftruth`
}
]
}),
(e,
t)=>e===`rollType`&&typeof t==`string`?Jp[
t
]:t),
Ug=class e{
sources=eo;
tierLower=-1;
tierUpper=-1;
classTags=[

];
durationTags=[

];
rangeTags=[

];
keywordTags=[

];
searchTerms=``;
archetypeTags=[

];
static getMinimalSearchOptions(t,
n){
let r=new e;
return r.sources={
"Core Rules":!0
},
r.classTags=[
t
],
r.tierLower=n,
r.tierUpper=n,
r
}
},
Wg=class e{
static getAllArchetypes=()=>{
let e=[

];
return Hg.entries.forEach(t=>{
let n=t.archetype.trim();
n!==``&&e.push(n)
}),
[
...new Set(e)
].sort((e,
t)=>e.localeCompare(t))
};
static _allArchetypes=e.getAllArchetypes();
static get archetypes(){
return e._allArchetypes
}static getAllClassTags=()=>{
let e=[

];
Hg.entries.forEach(t=>{
let n=t.class.split(`,`).map(e=>e.trim());
e.push(...n)
});
let t=[
...new Set(e)
].sort((e,
t)=>e.localeCompare(t));
return t=t.filter(e=>e!==``),
t
};
static _allClassTags=e.getAllClassTags();
static get classTags(){
return e._allClassTags
}static getAllDurationTags=()=>{
let e=[

];
Hg.entries.forEach(t=>{
let n=t.duration.split(`,`).map(e=>e.trim());
e.push(...n)
});
let t=[
...new Set(e)
].sort((e,
t)=>e.localeCompare(t));
return t=t.filter(e=>e!==``),
t
};
static _allDurationTags=e.getAllDurationTags();
static get durationTags(){
return e._allDurationTags
}static getAllRangeTags=()=>{
let e=[

];
Hg.entries.forEach(t=>{
let n=t.range.split(`,`).map(e=>e.trim());
e.push(...n)
});
let t=[
...new Set(e)
].sort((e,
t)=>e.localeCompare(t));
return t=t.filter(e=>e!==``),
t
};
static _allRangeTags=e.getAllRangeTags();
static get rangeTags(){
return e._allRangeTags
}static getAllKeywordTags=()=>{
let e=[

];
Hg.entries.forEach(t=>{
let n=t.tags.map(e=>e.trim());
e.push(...n)
});
let t=[
...new Set(e)
].sort((e,
t)=>e.localeCompare(t));
return t=t.filter(e=>e!==``),
t
};
static _allKeywordTags=e.getAllKeywordTags();
static get keywordTags(){
return e._allKeywordTags
}static gatherSpellPool(e){
let t=!1,
n=[

];
return e[
`Core Rules`
]&&(t=!0,
n=n.concat(Hg.entries)),
t||(n=[
...Hg.entries
]),
n
}static getSpellsByTier(e,
t,
n){
let r=[

];
return r=t>0&&n>0?e.filter(e=>e.tier>=t&&e.tier<=n):t>-1?e.filter(e=>e.tier>=t):n>-1?e.filter(e=>e.tier<=n):[
...e
],
r
}static filterSpellsByClass(e,
t){
return t.length===0?[
...e
]:e.filter(e=>{
let n=e.class.split(`,`).map(e=>e.trim());
return t.some(e=>n.includes(e))
})
}static filterSpellsByArchetype(e,
t){
return t.length===0?[
...e
]:e.filter(e=>{
let n=e.archetype.split(`,`).map(e=>e.trim());
return t.some(e=>n.includes(e))
})
}static filterSpellsByDuration(e,
t){
return t.length===0?[
...e
]:e.filter(e=>{
let n=e.duration.split(`,`).map(e=>e.trim());
return t.some(e=>n.includes(e))
})
}static filterSpellsByRange(e,
t){
return t.length===0?[
...e
]:e.filter(e=>{
let n=e.range.split(`,`).map(e=>e.trim());
return t.some(e=>n.includes(e))
})
}static filterSpellsByKeywordTags(e,
t){
return t.length===0?[
...e
]:e.filter(e=>{
let n=e.tags.map(e=>e.trim());
return t.some(e=>n.includes(e))
})
}static filterSpellsBySearchTerms(e,
t){
if(t.trim()===``)return[
...e
];
let n=t.toLowerCase().split(/\s+/).map(e=>e.trim()).filter(e=>e!==``);
return e.filter(e=>n.some(t=>e.name.toLowerCase().includes(t)||e.description.toLowerCase().includes(t)))
}static searchSpells(t){
let n=e.gatherSpellPool(t.sources),
r=e.getSpellsByTier(n,
t.tierLower,
t.tierUpper);
if(r=e.filterSpellsByClass(r,
t.classTags),
r=e.filterSpellsByArchetype(r,
t.archetypeTags),
r=e.filterSpellsBySearchTerms(r,
t.searchTerms),
t.durationTags.length>0||t.rangeTags.length>0||t.keywordTags.length>0||t.searchTerms.trim()!==``){
let n=e.filterSpellsByDuration(r,
t.durationTags),
i=e.filterSpellsByRange(r,
t.rangeTags),
a=e.filterSpellsByKeywordTags(r,
t.keywordTags),
o=[
...n,
...i,
...a
];
return[
...new Set(o)
].sort((e,
t)=>e.name.localeCompare(t.name))
}else return r.sort((e,
t)=>e.name.localeCompare(t.name))
}static searchSpellsRestrictive(t){
let n=e.gatherSpellPool(t.sources),
r=e.getSpellsByTier(n,
t.tierLower,
t.tierUpper);
return r=e.filterSpellsByClass(r,
t.classTags),
r=e.filterSpellsByArchetype(r,
t.archetypeTags),
r=e.filterSpellsBySearchTerms(r,
t.searchTerms),
t.durationTags.length>0&&(r=e.filterSpellsByDuration(r,
t.durationTags)),
t.rangeTags.length>0&&(r=e.filterSpellsByRange(r,
t.rangeTags)),
t.keywordTags.length>0&&(r=e.filterSpellsByKeywordTags(r,
t.keywordTags)),
r.sort((e,
t)=>e.name.localeCompare(t.name))
}static getFilteredSpellList(t,
n=0){
let r=new Qa(e.searchSpellsRestrictive(t));
if(n<=0||n>r.spells.length)return r.getCleanType();
let i=[

],
a=[

];
for(;
i.length<n;
){
let e=Gh.dCustom(0,
r.spells.length-1);
t.classTags.includes(`Priest`)&&r.spells[
e
].name===`Turn Undead`||a.includes(e)||(a.push(e),
i.push(r.spells[
e
]))
}return new Qa(i.sort((e,
t)=>e.name.localeCompare(t.name))).getCleanType()
}
},
Gg={
Wizard:{
1:{
start:-2,
cap:4
},
2:{
start:2,
cap:4
},
3:{
start:4,
cap:4
},
4:{
start:6,
cap:2
},
5:{
start:8,
cap:2
}
},
Priest:{
1:{
start:-1,
cap:3
},
2:{
start:2,
cap:3
},
3:{
start:4,
cap:3
},
4:{
start:6,
cap:2
},
5:{
start:8,
cap:2
}
}
},
Kg=class{
static getSpellProgressionValue(e,
t,
n){
let r=Number(t),
i=Number(n);
if(!Number.isInteger(i)||i<1||i>5)return R.warn(`GetSpellProgressionValue received an invalid tier: ${n}`),
0;
if(!Number.isFinite(r))return R.warn(`GetSpellProgressionValue received an invalid level: ${t}`),
0;
let{
start:a,
cap:o
}=Gg[
e
][
n
];
return Math.max(0,
Math.min(o,
r-a))
}
},
qg={
"No Theme":{
keywordTags:[

],
archetypeTags:[

]
},
"Defense Full":{
keywordTags:[
`buff`,
`deception`,
`protection`
],
archetypeTags:[

]
},
"Defense Majority":{
keywordTags:[
`buff`,
`deception`,
`protection`
],
archetypeTags:[

]
},
"Offense Full":{
keywordTags:[
`damage`,
`control`
],
archetypeTags:[

]
},
"Offense Majority":{
keywordTags:[
`damage`,
`control`
],
archetypeTags:[

]
},
"Support Full":{
keywordTags:[
`support`,
`healing`,
`utility`
],
archetypeTags:[

]
},
"Support Majority":{
keywordTags:[
`support`,
`healing`,
`utility`
],
archetypeTags:[

]
},
"Selfish Support":{
keywordTags:[
`self`,
`single target`
],
archetypeTags:[
`protection`,
`support`,
`utility`
]
},
"Random Theme":{
keywordTags:[

],
archetypeTags:[

]
}
},
Jg=class e{
static _IdPrefix=`known-spells`;
static generateKnownSpellList(e,
t,
n=`No Theme`){
let r=new pr(Vg.createEntityId(this._IdPrefix));
return r.casterClass=e,
r.level=t,
r.theme=n===`Random Theme`?this.getRandomTheme():n,
r.spells=this.prepareSpellTierMap(e,
t),
this.chooseSpellsForAllTiers(r.spells,
e,
r.theme),
r.getCleanType()
}static prepareSpellTierMap(e,
t){
let n={

};
for(let r of Yn)n[
r
]={
tier:r,
quantity:Kg.getSpellProgressionValue(e,
t,
r),
spells:[

]
};
return n
}static atLeastHalf(e){
return Math.ceil(e/2)
}static getRandomTheme(){
let e=ur.filter(e=>e!==`Random Theme`);
return e[
Math.floor(Math.random()*e.length)
]
}static createThemeSearchOptionsForSpellTier(e,
t,
n){
let r=parseInt(t,
10),
i=Ug.getMinimalSearchOptions(e,
r);
return n===`No Theme`||(i=qg[
n
]?{
...i,
...qg[
n
]
}:i),
i
}static getSpellsNoTheme(t,
n,
r){
let i=e.createThemeSearchOptionsForSpellTier(t,
n,
`No Theme`);
return Wg.getFilteredSpellList(i,
r)
}static chooseSpellsForTier(e,
t,
n,
r,
i){
let a=e[
n
].quantity;
if(R.log(`chooseSpellsForTier - parameter tierMap: ${JSON.stringify(e)}`),
R.log(`chooseSpellsForTier - parameter casterClass: ${t}`),
R.log(`chooseSpellsForTier - parameter tier: ${n}`),
R.log(`chooseSpellsForTier - parameter searchOptions: ${JSON.stringify(r)}`),
R.log(`chooseSpellsForTier - parameter full: ${i}`),
a===0)return;
let o=a,
s=0;
i||(o=this.atLeastHalf(a),
s=a-o),
R.log(`Choosing spells for tier ${n} with ${o} 'on theme' needed and ${s} 'off theme' needed.`);
let c=Wg.getFilteredSpellList(r,
o);
if(c.spells.length<o){
let r=o-c.spells.length;
R.log(`Not enough 'on theme' spells, need to fill ${r} more.`);
let i=this.getSpellsNoTheme(t,
n,
r);
e[
n
].spells=[
...c.spells,
...i.spells
].map(e=>e.name)
}else e[
n
].spells=c.spells.map(e=>e.name);
if(s>0){
R.log(`Getting required ${s} 'off theme' spells for tier ${n}.`);
let r=this.getSpellsNoTheme(t,
n,
s);
e[
n
].spells=[
...c.spells,
...r.spells
].map(e=>e.name)
}
}static chooseSpellsForAllTiers(t,
n,
r){
let i={

};
for(let t of Yn)i[
t
]=e.createThemeSearchOptionsForSpellTier(n,
t,
r);
let a=fr.some(e=>e===r);
for(let e of Yn)t[
e
].quantity!==0&&this.chooseSpellsForTier(t,
n,
e,
i[
e
],
a)
}
};
function Yg(e){
let t=[

];
for(let n in e){
let r=n;
if(Object.prototype.hasOwnProperty.call(e,
n)){
let n=e[
r
],
i={
tier:n.tier,
quantity:n.quantity,
spells:n.spells.join(`, `)
};
t.push(i)
}
}return t
}function Xg(){
let e=qp(),
t=$(Sr),
n=$(Cr),
r=$(wr),
i=$(xr),
a={
buttonText:`Generate Known Spells`,
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Generate Known Spells`,
descriptionText:`Generate a list of known spells for the selected NPC based on their level and class.`
}
},
o={
options:ag.convertOptionsToSelectFormat(ig.getCasterClassOptions()),
selectedValue:t??``,
onSelectChange:t=>{
let n=t.currentTarget.value;
e(hr(n))
},
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select Caster Class`,
descriptionText:`Select the class of the caster for the spell list.`
}
},
s={
options:ag.convertOptionsToSelectFormat(ig.getCharacterLevelOptions(),
!0,
`Level`),
selectedValue:n??`1`,
onSelectChange:t=>{
let n=t.currentTarget.value;
e(gr(n))
},
styleOptions:{
primary:!0,
centerSelectorSmall:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select Caster Level`,
descriptionText:`Select the level of the caster for the spell list.`
}
},
c={
options:ag.convertOptionsToSelectFormat(ig.getSpellThemeOptions()),
selectedValue:r??`No Theme`,
onSelectChange:t=>{
let n=t.currentTarget.value;
e(_r(n))
},
styleOptions:{
primary:!0,
centerSelectorSmall:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select Spell Theme`,
descriptionText:`Select the theme of the spells for the spell list.`
}
},
l=()=>{
let i=Jg.generateKnownSpellList(t,
n,
r);
R.log(`Generated known spells: ${JSON.stringify(i)}`),
e(vr(i))
},
u=[
o,
s,
c
],
d={
id:i.id,
key:i.id,
title:`${i.casterClass} Level ${i.level} - Known Spells - ${i.theme}`,
columns:[
{
name:`Tier`,
propertyName:`tier`,
isFixed:!0
},
{
name:`Quantity`,
propertyName:`quantity`,
isFixed:!1
},
{
name:`Spells`,
propertyName:`spells`,
isFixed:!0
}
],
rowData:Yg(i.spells),
doSortRows:!0,
sortColumn:`tier`
};
return(0,
U.jsxs)(vg,
{
toolName:I.KnownSpellGenerator,
children:[
(0,
U.jsx)(yg,
{
titleLeft:`Known Spells Generator`,
description:`Create a known spell list for a caster based on their level and class.`,
children:(0,
U.jsx)(`div`,
{
children:(0,
U.jsx)(nm,
{
primaryButtonOptions:a,
subButtonOptions:u,
onClick:l,
children:(0,
U.jsx)(U.Fragment,
{

})
})
})
}),
i.casterClass===null?(0,
U.jsx)(U.Fragment,
{

}):(0,
U.jsx)(yg,
{
children:(0,
U.jsx)(jg,
{
...d
})
})
]
})
}function Zg(){
return(0,
U.jsxs)(`div`,
{
id:`tools-page`,
className:`flex flex-col justify-between gap-4`,
children:[
(0,
U.jsx)(Og,
{

}),
(0,
U.jsx)(wg,
{

}),
(0,
U.jsx)(Mg,
{

}),
(0,
U.jsx)(Xg,
{

}),
(0,
U.jsx)(Ig,
{

}),
(0,
U.jsx)(Bg,
{

}),
(0,
U.jsx)(Cg,
{

}),
(0,
U.jsx)(Kp,
{

})
]
})
}function Qg(){
let e=`items-center px-3 py-1 mr-2 rounded-lg border border-black bg-black text-white`,
t=`items-center px-3 py-1 mr-2 rounded-lg border border-black bg-black text-white`,
n=`items-center px-3 py-1 mr-2 rounded-lg border border-black bg-black text-white`,
r=(0,
U.jsx)(up,
{
to:`/session`,
className:({
isActive:r,
isPending:i
})=>i?n:r?t:e,
children:`Session`
},
`home-page-session`),
i=(0,
U.jsx)(up,
{
to:`/tools`,
className:({
isActive:r,
isPending:i
})=>i?n:r?t:e,
children:`Tools`
},
`home-page-tools`),
a=(0,
U.jsx)(up,
{
to:`/planning`,
className:({
isActive:r,
isPending:i
})=>i?n:r?t:e,
children:`Planning`
},
`home-page-planning`),
o=(0,
U.jsx)(up,
{
to:`/reference`,
className:({
isActive:r,
isPending:i
})=>i?n:r?t:e,
children:`Reference`
},
`home-page-reference`),
s=(0,
U.jsxs)(`a`,
{
href:`https://ko-fi.com/shadowdarktools`,
target:`_blank`,
rel:`noopener`,
className:`flex w-fit items-center px-3 mr-2 rounded-lg border border-black bg-black text-white`,
children:[
G.getDonateIcon(),
`\xA0Support\xA0`,
(0,
U.jsx)(`span`,
{
className:`text-sm align-top`,
children:G.getExternalLinkIcon()
})
]
});
return(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsxs)(`div`,
{
className:`text-block`,
children:[
(0,
U.jsx)(`h2`,
{
children:`Welcome to Shadowdark Tools!`
}),
(0,
U.jsx)(`p`,
{
className:`pt-2`,
children:`A collection of powerful, easy-to-use tools designed for Game Masters and players of the Shadowdark roleplaying game. Whether you're running a session or prepping between adventures, these tools are here to enhance your game.`
})
]
}),
(0,
U.jsxs)(`div`,
{
className:`flex flex-wrap -mx-2 gap-y-4`,
children:[
(0,
U.jsx)(`div`,
{
className:`w-full md:w-1/2 px-2 mb-4`,
children:(0,
U.jsxs)(`div`,
{
className:`bg-gray-100 p-4 rounded-xl`,
children:[
r,
`A variety of tools to assist with session management, including random encounter checks/tracking, NPC name generation, and more to come.`
]
})
}),
(0,
U.jsx)(`div`,
{
className:`w-full md:w-1/2 px-2 mb-4`,
children:(0,
U.jsxs)(`div`,
{
className:`bg-gray-100 p-4 rounded-xl`,
children:[
i,
`A variety of tools to assist with game preparation, and on-the-spot generation of NPCs, Shops, Magic Items and more.`
]
})
}),
(0,
U.jsx)(`div`,
{
className:`w-full md:w-1/2 px-2 mb-4`,
children:(0,
U.jsxs)(`div`,
{
className:`bg-gray-100 p-4 rounded-xl`,
children:[
a,
`Tools to provide some inspiration for your next adventure, including scenario and site names, and a map visualizer.`
]
})
}),
(0,
U.jsx)(`div`,
{
className:`w-full md:w-1/2 px-2 mb-4`,
children:(0,
U.jsxs)(`div`,
{
className:`bg-gray-100 p-4 rounded-xl`,
children:[
o,
`References for finding just the right monsters or spells for your situation.`
]
})
}),
(0,
U.jsx)(`div`,
{
className:`w-full md:w-1/2 px-2 mb-4`,
children:(0,
U.jsxs)(`div`,
{
className:`bg-gray-100 p-4 rounded-xl`,
children:[
s,
`Your contributions help keep the tools running and evolving.`
]
})
})
]
}),
(0,
U.jsxs)(`div`,
{
className:`text-block bg-gray-100 p-4 rounded-xl !mt-4`,
children:[
(0,
U.jsx)(`h2`,
{
children:`Coming Soon`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsx)(`li`,
{
children:`QoL Improvements`
}),
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`Rival Crawlers and NPCs that are casters will have a known spell list included.`
}),
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`Option to copy generated content in Markdown format.`
}),
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`Expand generated content: NPCs, Shops, and more.`
}),
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`"Copy All" functionality for pinned/generated items.`
})
]
}),
(0,
U.jsx)(`li`,
{
children:`Monster Filter: create custom monster lists.`
})
]
})
]
}),
(0,
U.jsxs)(`div`,
{
className:`text-block`,
children:[
(0,
U.jsx)(`h2`,
{
children:`A Fan-Made Creation`
}),
(0,
U.jsx)(`p`,
{
className:`pt-2`,
children:`Shadowdark Tools is an independent, third-party project made by a passionate fan. Licensing details can be found in the footer and on the About page. Thanks for being part of this journey!`
})
]
})
]
})
}function $g(){
let e=qp(),
t=$(Vn),
n=$(Hn),
r={
buttonText:`Adventure Names`,
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Generate Adventure Names`,
descriptionText:`Create a specific number of random adventure names.`
}
},
i=t=>{
let n=Zh.getAdventureNames(o);
e(Ln(n)),
e(Rn(Fn.AdventureNames))
},
a=ag.convertValuesToSelectFormat(ig.getQuantityValuesFibShort(),
!1),
[
o,
s
]=(0,
m.useState)(5),
c=[
{
options:a,
selectedValue:o.toString(),
onSelectChange:e=>{
let t=+e.currentTarget.value;
s(t)
},
styleOptions:{
primary:!0,
centerSelectorSmall:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select Magic Item Quantity`,
descriptionText:`Select the number of magic items to create.`
}
}
],
l={
buttonText:`Adventure Sites`,
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Generate Site Names`,
descriptionText:`Create a specific number of random adventure site names.`
}
},
u=t=>{
let n=Zh.getAdventureSiteNames(o);
e(Ln(n)),
e(Rn(Fn.SiteNames))
},
d=ag.convertValuesToSelectFormat(ig.getQuantityValuesFibShort(),
!1),
[
f,
p
]=(0,
m.useState)(5),
h=[
{
options:d,
selectedValue:f.toString(),
onSelectChange:e=>{
let t=+e.currentTarget.value;
p(t)
},
styleOptions:{
primary:!0,
centerSelectorSmall:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select Magic Item Quantity`,
descriptionText:`Select the number of magic items to create.`
}
}
],
g=t.map((e,
t)=>(0,
U.jsx)(`li`,
{
children:(0,
U.jsx)(`b`,
{
children:e
})
},
t)),
_=t.length<=0?null:(0,
U.jsx)(Tg,
{
heading:n,
subheading:``,
children:(0,
U.jsx)(`ul`,
{
className:` text-left pl-6 list-disc`,
children:g
})
});
return(0,
U.jsx)(vg,
{
toolName:I.AdventureNames,
children:(0,
U.jsxs)(`div`,
{
className:`flex`,
children:[
(0,
U.jsx)(Eg,
{
title:`Adventure Ideas`,
children:(0,
U.jsxs)(`div`,
{
className:`flex flex-col gap-4`,
children:[
(0,
U.jsx)(nm,
{
primaryButtonOptions:r,
subButtonOptions:c,
onClick:i,
children:(0,
U.jsx)(U.Fragment,
{

})
}),
(0,
U.jsx)(nm,
{
primaryButtonOptions:l,
subButtonOptions:h,
onClick:u,
children:(0,
U.jsx)(U.Fragment,
{

})
})
]
})
}),
(0,
U.jsx)(Dg,
{
children:_
})
]
})
})
}function e_(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 512 512`
},
child:[
{
tag:`path`,
attr:{
d:`M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z`
},
child:[

]
}
]
})(e)
}function t_(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 480 512`
},
child:[
{
tag:`path`,
attr:{
d:`M106.75 215.06L1.2 370.95c-3.08 5 .1 11.5 5.93 12.14l208.26 22.07-108.64-190.1zM7.41 315.43L82.7 193.08 6.06 147.1c-2.67-1.6-6.06.32-6.06 3.43v162.81c0 4.03 5.29 5.53 7.41 2.09zM18.25 423.6l194.4 87.66c5.3 2.45 11.35-1.43 11.35-7.26v-65.67l-203.55-22.3c-4.45-.5-6.23 5.59-2.2 7.57zm81.22-257.78L179.4 22.88c4.34-7.06-3.59-15.25-10.78-11.14L17.81 110.35c-2.47 1.62-2.39 5.26.13 6.78l81.53 48.69zM240 176h109.21L253.63 7.62C250.5 2.54 245.25 0 240 0s-10.5 2.54-13.63 7.62L130.79 176H240zm233.94-28.9l-76.64 45.99 75.29 122.35c2.11 3.44 7.41 1.94 7.41-2.1V150.53c0-3.11-3.39-5.03-6.06-3.43zm-93.41 18.72l81.53-48.7c2.53-1.52 2.6-5.16.13-6.78l-150.81-98.6c-7.19-4.11-15.12 4.08-10.78 11.14l79.93 142.94zm79.02 250.21L256 438.32v65.67c0 5.84 6.05 9.71 11.35 7.26l194.4-87.66c4.03-1.97 2.25-8.06-2.2-7.56zm-86.3-200.97l-108.63 190.1 208.26-22.07c5.83-.65 9.01-7.14 5.93-12.14L373.25 215.06zM240 208H139.57L240 383.75 340.43 208H240z`
},
child:[

]
}
]
})(e)
}function n_(e){
let{
children:t,
toggleValue:n,
primary:r,
secondary:i,
subtle:a,
solo:o,
noFade:s,
left:c,
center:l,
right:u,
lefttoright:d,
...f
}=e,
p=(0,
ms.default)(f.className,
`font-face-montserrat-medium text-sm flex items-center px-3 cursor-pointer`,
{
"mb-3 border border-black bg-black text-white":r,
"mb-3 border-2 border-black bg-white text-black":i,
"border hover:text-black hover:border-black":a,
"border-gray-500 text-black":s||n,
"border-gray-400 text-gray-400":!s&&!n,
"rounded-lg py-1.5":o,
"rounded-l-lg":c,
"":l,
"rounded-r-lg":u,
"rounded-lg":d
}),
m=n?(0,
U.jsx)(ec,
{

}):(0,
U.jsx)(nc,
{

});
return(0,
U.jsxs)(`button`,
{
...f,
className:p,
children:[
m,
`\xA0`,
t
]
})
}function r_(e){
return W({
tag:`svg`,
attr:{
viewBox:`0 0 15 15`,
fill:`none`
},
child:[
{
tag:`path`,
attr:{
d:`M7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125Z`,
fill:`currentColor`
},
child:[

]
}
]
})(e)
}function i_(e){
let{
mapLocation:t,
present:n,
absent:r,
selected:i,
children:a,
...o
}=e,
s=(0,
ms.default)(o.className,
`rounded-lg cursor-pointer`,
`flex items-center justify-center text-center`,
`p-1 sm:p-2 aspect-square`,
{
"bg-black text-white shadow-lg":n||t.present,
"bg-gray-200 text-white shadow-sm":r||!t.present,
"shadow-black":i
}),
c=(0,
U.jsx)(r_,
{

});
switch(t.type.toLowerCase()){
case`empty`:c=G.mapEmptyCell();
break;
case`trap`:case`trick/trap`:c=G.mapTrap();
break;
case`minor hazard`:c=G.mapMinorHazard();
break;
case`solo monster`:case`monster`:c=G.mapMonster();
break;
case`flora/fauna`:c=G.mapFloraFauna();
break;
case`feature`:c=G.mapFeature();
break;
case`npc`:case`npcs`:c=G.mapNpc();
break;
case`monster mob`:case`faction`:c=G.mapFaction();
break;
case`major hazard`:c=G.mapMajorHazard();
break;
case`treasure`:c=G.mapTreasure();
break;
case`boss monster`:case`objective`:c=G.mapObjective();
break;
default:c=G.mapDefault();
break
}return(0,
U.jsx)(`div`,
{
...o,
className:s,
children:(0,
U.jsx)(_s.Provider,
{
value:{
size:`1.75em`
},
children:c
})
})
}function a_(){
let e=qp(),
t=$(Ja),
n=$(Xa),
r=$(Za),
i=$(Ya);
R.log(`SiteMapInspirationV2: selectedLocation`,
n);
let a=t=>{
e(Ha(!r.allowEmptyLocations))
},
o={
buttonText:`Generate Locations`,
styleOptions:{
primary:!0,
taller:!0
},
accessibility:{
ariaLabel:`Generate Map Locations`,
descriptionText:`Create a number of random map locations.`
}
},
s=(t,
n,
r)=>{
R.log(`handoffSiteMapCreateClick`),
R.log(`handoffSiteMapCreateClick options = `,
r),
R.log(`handoffSiteMapCreateClick dimensions = `,
n),
R.log(`                 (rolled) options.nSiteLocations = ${r.nLocations}`);
let i=Zh.populateSiteMap(n,
r);
R.log(`handoffSiteMapCreateClick newWorkingMap = `,
i);
let a=Zh.getAdventureDangerLevel();
e(Wa(a)),
e(za(i.getCleanType()))
},
c=e=>{
R.log(`handleSiteMapCreateClick`),
s(e,
i,
r)
},
l=[
{
label:`Random Size`,
value:``
},
{
label:`Small Site`,
value:`d3+4`
},
{
label:`Medium Site`,
value:`d3+7`
},
{
label:`Large Site`,
value:`d3+10`
}
],
u=[
{
options:l,
selectedValue:r.locationCountDieRoll,
onSelectChange:t=>{
let n=t.currentTarget.value,
r=n===``?l[
Gh.dCustom(1,
3)
].value:n,
i=Gh.roll(r);
e(Ua(n)),
e(Ga(i))
},
styleOptions:{
primary:!0,
centerSelectorSmall:!0,
taller:!0
},
accessibility:{
ariaLabel:`Select Quantity of Site Locations`,
descriptionText:`Select the quantity of site locations to create.`
}
}
],
d=n.present?(0,
U.jsxs)(`div`,
{
className:`flex flex-row items-center`,
children:[
(0,
U.jsx)(Qh,
{
subtle:!0,
left:!0,
className:`grow justify-center !border-gray-300`,
onClick:t=>{
let r=Ia.getEmptyType();
r.row=n.row,
r.column=n.column,
e(Ba(r)),
e(Va(r))
},
children:(0,
U.jsx)(U.Fragment,
{
children:(0,
U.jsxs)(U.Fragment,
{
children:[
(0,
U.jsx)(e_,
{

}),
`\xA0Remove`
]
})
})
}),
(0,
U.jsx)(Qh,
{
subtle:!0,
right:!0,
className:`grow justify-center !border-gray-300`,
onClick:t=>{
let i=Zh.getSiteMapLocation(r.allowEmptyLocations);
i.row=n.row,
i.column=n.column;
let a=i.getCleanType();
e(Ba(a)),
e(Va(a))
},
children:(0,
U.jsxs)(U.Fragment,
{
children:[
`Reroll\xA0`,
(0,
U.jsx)(t_,
{

})
]
})
})
]
}):null,
f=n===null||!n.present?null:(0,
U.jsxs)(`div`,
{
className:`grow ml-3 hidden md:block`,
children:[
(0,
U.jsx)(Tg,
{
heading:n.type,
children:(0,
U.jsxs)(`ul`,
{
className:`text-left`,
children:[
(0,
U.jsx)(`li`,
{
children:n.description
}),
(0,
U.jsx)(`li`,
{
children:`row: ${n.row+1}, column: ${n.column+1}`
})
]
})
}),
d
]
}),
p=n===null||!n.present?null:(0,
U.jsxs)(`div`,
{
className:`flex flex-col pt-4 block md:hidden`,
children:[
(0,
U.jsx)(Tg,
{
heading:n.type,
children:(0,
U.jsxs)(`ul`,
{
className:`text-left`,
children:[
(0,
U.jsx)(`li`,
{
children:n.description
}),
(0,
U.jsx)(`li`,
{
children:`row: ${n.row+1}, column: ${n.column+1}`
})
]
})
}),
d
]
}),
m=(n,
i,
a)=>{
if(R.log(`${i}, ${a} - ${JSON.stringify(t.mapArea[i][a],void 0,2)}`),
t.mapArea[
i
][
a
].present){
let n={
...t.mapArea[
i
][
a
]
};
e(Va(n))
}else{
let t=Zh.getSiteMapLocation(r.allowEmptyLocations);
t.row=i,
t.column=a;
let n=t.getCleanType();
e(Ba(n)),
e(Va(n))
}
},
h=t.mapArea.map((e,
t)=>e.map((e,
r)=>{
let i=`${t}-${r}`;
return(0,
U.jsx)(i_,
{
mapLocation:e,
id:i,
selected:t===n.row&&r===n.column,
onClick:e=>m(e,
t,
r),
children:(0,
U.jsx)(U.Fragment,
{

})
},
i)
})),
g=[
{
name:`Row`,
propertyName:`row`,
isFixed:!1
},
{
name:`Column`,
propertyName:`column`,
isFixed:!1
},
{
name:`Type`,
propertyName:`type`,
isFixed:!0
},
{
name:`Description`,
propertyName:`description`,
isFixed:!0
}
],
_=t.mapArea.flatMap(e=>e.filter(e=>e.present)).sort((e,
t)=>parseInt(`${e.row}${e.column}`)-parseInt(`${t.row}${t.column}`)),
v={
id:`location-table-${t.id}`,
key:`location-table-${t.id}-${n.id}`,
title:`LOCATIONS (Danger Level: ${r.suggestedDangerLevel})`,
columns:g,
rowData:_,
doSortRows:!1,
selectedItemId:n?n.id:``
};
return(0,
U.jsxs)(vg,
{
toolName:I.AdventureSiteMap,
children:[
(0,
U.jsx)(`h2`,
{
children:`Site Map Inspiration`
}),
(0,
U.jsxs)(`div`,
{
className:`!mb-4`,
children:[
(0,
U.jsx)(`p`,
{
children:`Use this tool to give your creativity something to play with as you ponder your next adventure.`
}),
(0,
U.jsxs)(`ul`,
{
className:`pl-6`,
children:[
(0,
U.jsx)(`li`,
{
children:`Allow the placement of the locations below to suggest the layout of your map.`
}),
(0,
U.jsx)(`li`,
{
children:`Select a location to see a suggestion of what's there or to remmove/reroll the location.`
}),
(0,
U.jsx)(`li`,
{
children:`Click an empty location to add something random there.`
}),
(0,
U.jsx)(`li`,
{
children:`Remember, this is meant to remove the obstacle of a blank page. Nothing more. :)`
})
]
})
]
}),
(0,
U.jsx)(yg,
{
children:(0,
U.jsxs)(`div`,
{
className:`flex flex-col gap-4 pb-4`,
children:[
(0,
U.jsx)(nm,
{
primaryButtonOptions:o,
subButtonOptions:u,
onClick:c,
children:(0,
U.jsx)(U.Fragment,
{

})
}),
(0,
U.jsx)(`div`,
{
className:`flex flex-row gap-4`,
children:(0,
U.jsx)(n_,
{
toggleValue:r.allowEmptyLocations,
subtle:!0,
solo:!0,
onClick:(e=>a(e)),
children:(0,
U.jsx)(U.Fragment,
{
children:`Allow Empty Locations`
})
})
})
]
})
}),
t.id?(0,
U.jsxs)(U.Fragment,
{
children:[
(0,
U.jsxs)(`div`,
{
id:`site-map-area`,
className:`flex`,
children:[
(0,
U.jsx)(`div`,
{
className:`rounded-lg`,
children:(0,
U.jsx)(`div`,
{
className:`grid grid-cols-9 grid-rows-12 gap-2 font-mono text-white bg-stripes-fuchsia rounded-lg text-center`,
children:h
})
}),
f
]
}),
p,
(0,
U.jsx)(yg,
{
children:(0,
U.jsx)(jg,
{
...v
})
})
]
}):null
]
})
}function o_(){
return(0,
U.jsxs)(`div`,
{
id:`tools-page`,
className:`flex flex-col justify-between gap-4`,
children:[
(0,
U.jsx)($g,
{

}),
(0,
U.jsx)(a_,
{

})
]
})
}function s_(){
return(0,
U.jsx)(`div`,
{
children:(0,
U.jsxs)(`div`,
{
id:`contact-info`,
className:`pb-4`,
children:[
(0,
U.jsx)(`h2`,
{
className:`pt-3`,
children:`Privacy Policy`
}),
(0,
U.jsx)(`hr`,
{

}),
(0,
U.jsxs)(`div`,
{
children:[
(0,
U.jsxs)(`div`,
{
className:`pt-3`,
children:[
(0,
U.jsx)(`b`,
{
children:`Effective Date:`
}),
` October 17, 2025`,
(0,
U.jsx)(`br`,
{

}),
`This privacy policy explains how Shadowdark Tools ("the site") collects and processes your information.`
]
}),
(0,
U.jsxs)(`div`,
{
className:`pt-2`,
children:[
(0,
U.jsx)(`h3`,
{
className:`pt-3`,
children:`1. Data collected`
}),
(0,
U.jsxs)(`div`,
{
children:[
`To help understand how people use the site, we use Microsoft Clarity to collect anonymous data about visitor behavior. This may include information about:`,
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`The pages you view`
}),
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`The links you click`
}),
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`Your scrolling behavior`
}),
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`Your device (e.g., desktop or mobile) and browser`
})
]
})
]
}),
(0,
U.jsxs)(`div`,
{
children:[
`We have configured Microsoft Clarity to operate `,
(0,
U.jsx)(`u`,
{
children:`without setting cookies on your device`
}),
`. This means we cannot track you as an individual visitor across multiple pages or sessions, and all data collected is completely anonymous.`
]
}),
(0,
U.jsx)(`h3`,
{
className:`pt-3`,
children:`2. Purpose of data collection`
}),
(0,
U.jsx)(`div`,
{
children:`The data collected through Microsoft Clarity is used solely for statistical analysis. It helps us understand which parts of our site are most popular and how we can improve its layout and content.`
}),
(0,
U.jsx)(`h3`,
{
className:`pt-3`,
children:`3. Third-party data processors`
}),
(0,
U.jsxs)(`div`,
{
children:[
`We use Microsoft Clarity for web analytics. As noted above, we have configured it to not set cookies, `,
(0,
U.jsx)(`u`,
{
children:`ensuring your usage data is anonymous`
}),
`. Data collected by Clarity is processed and stored on Microsoft's servers in the U.S. As this is an international data transfer, we note that it is governed by the EU-U.S. Data Privacy Framework (DPF) adequacy decision, which facilitates compliant data transfers.`
]
}),
(0,
U.jsx)(`h3`,
{
className:`pt-3`,
children:`4. Your rights`
}),
(0,
U.jsxs)(`div`,
{
children:[
`As we do not collect or process any personally identifiable information (PII) using Clarity, we cannot identify, access, or delete your specific usage data. However, you have general data protection rights, including:`,
(0,
U.jsxs)(`ul`,
{
children:[
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`The right to be informed about how your data is used.`
}),
(0,
U.jsx)(`li`,
{
className:`nested1`,
children:`The right to withdraw consent for any other data processing you have agreed to on the site.`
})
]
})
]
}),
(0,
U.jsx)(`h3`,
{
className:`pt-3`,
children:`5. Changes to this policy`
}),
(0,
U.jsx)(`div`,
{
children:`We may update this privacy policy from time to time. The "Effective Date" at the top indicates when the latest changes were made. We encourage you to review this policy periodically.`
}),
(0,
U.jsx)(`h3`,
{
className:`pt-3`,
children:`6. Contact us`
}),
(0,
U.jsxs)(`div`,
{
children:[
`If you have any questions about this privacy policy, you can contact us. We can be reached on the\xA0`,
(0,
U.jsxs)(`a`,
{
className:`underline hover:text-gray-400`,
target:`_blank`,
href:`https://discord.com/channels/558029475837902851/1082831426216534026`,
rel:`noreferrer`,
children:[
`Shadowdark Discord\xA0`,
G.getExternalLinkIconInline()
]
}),
` @ Cesidio#1697.`
]
})
]
})
]
})
]
})
})
}var c_=o((e=>{
function t(e,
t){
var n=e.length;
e.push(t);
a:for(;
0<n;
){
var r=n-1>>>1,
a=e[
r
];
if(0<i(a,
t))e[
r
]=t,
e[
n
]=a,
n=r;
else break a
}
}function n(e){
return e.length===0?null:e[
0
]
}function r(e){
if(e.length===0)return null;
var t=e[
0
],
n=e.pop();
if(n!==t){
e[
0
]=n;
a:for(var r=0,
a=e.length,
o=a>>>1;
r<o;
){
var s=2*(r+1)-1,
c=e[
s
],
l=s+1,
u=e[
l
];
if(0>i(c,
n))l<a&&0>i(u,
c)?(e[
r
]=u,
e[
l
]=n,
r=l):(e[
r
]=c,
e[
s
]=n,
r=s);
else if(l<a&&0>i(u,
n))e[
r
]=u,
e[
l
]=n,
r=l;
else break a
}
}return t
}function i(e,
t){
var n=e.sortIndex-t.sortIndex;
return n===0?e.id-t.id:n
}if(e.unstable_now=void 0,
typeof performance==`object`&&typeof performance.now==`function`){
var a=performance;
e.unstable_now=function(){
return a.now()
}
}else{
var o=Date,
s=o.now();
e.unstable_now=function(){
return o.now()-s
}
}var c=[

],
l=[

],
u=1,
d=null,
f=3,
p=!1,
m=!1,
h=!1,
g=!1,
_=typeof setTimeout==`function`?setTimeout:null,
v=typeof clearTimeout==`function`?clearTimeout:null,
y=typeof setImmediate<`u`?setImmediate:null;
function b(e){
for(var i=n(l);
i!==null;
){
if(i.callback===null)r(l);
else if(i.startTime<=e)r(l),
i.sortIndex=i.expirationTime,
t(c,
i);
else break;
i=n(l)
}
}function x(e){
if(h=!1,
b(e),
!m)if(n(c)!==null)m=!0,
S||(S=!0,
D());
else{
var t=n(l);
t!==null&&re(x,
t.startTime-e)
}
}var S=!1,
C=-1,
w=5,
T=-1;
function E(){
return g?!0:!(e.unstable_now()-T<w)
}function ee(){
if(g=!1,
S){
var t=e.unstable_now();
T=t;
var i=!0;
try{
a:{
m=!1,
h&&(h=!1,
v(C),
C=-1),
p=!0;
var a=f;
try{
b:{
for(b(t),
d=n(c);
d!==null&&!(d.expirationTime>t&&E());
){
var o=d.callback;
if(typeof o==`function`){
d.callback=null,
f=d.priorityLevel;
var s=o(d.expirationTime<=t);
if(t=e.unstable_now(),
typeof s==`function`){
d.callback=s,
b(t),
i=!0;
break b
}d===n(c)&&r(c),
b(t)
}else r(c);
d=n(c)
}if(d!==null)i=!0;
else{
var u=n(l);
u!==null&&re(x,
u.startTime-t),
i=!1
}
}break a
}finally{
d=null,
f=a,
p=!1
}i=void 0
}
}finally{
i?D():S=!1
}
}
}var D;
if(typeof y==`function`)D=function(){
y(ee)
};
else if(typeof MessageChannel<`u`){
var te=new MessageChannel,
ne=te.port2;
te.port1.onmessage=ee,
D=function(){
ne.postMessage(null)
}
}else D=function(){
_(ee,
0)
};
function re(t,
n){
C=_(function(){
t(e.unstable_now())
},
n)
}e.unstable_IdlePriority=5,
e.unstable_ImmediatePriority=1,
e.unstable_LowPriority=4,
e.unstable_NormalPriority=3,
e.unstable_Profiling=null,
e.unstable_UserBlockingPriority=2,
e.unstable_cancelCallback=function(e){
e.callback=null
},
e.unstable_forceFrameRate=function(e){
0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5
},
e.unstable_getCurrentPriorityLevel=function(){
return f
},
e.unstable_next=function(e){
switch(f){
case 1:case 2:case 3:var t=3;
break;
default:t=f
}var n=f;
f=t;
try{
return e()
}finally{
f=n
}
},
e.unstable_requestPaint=function(){
g=!0
},
e.unstable_runWithPriority=function(e,
t){
switch(e){
case 1:case 2:case 3:case 4:case 5:break;
default:e=3
}var n=f;
f=e;
try{
return t()
}finally{
f=n
}
},
e.unstable_scheduleCallback=function(r,
i,
a){
var o=e.unstable_now();
switch(typeof a==`object`&&a?(a=a.delay,
a=typeof a==`number`&&0<a?o+a:o):a=o,
r){
case 1:var s=-1;
break;
case 2:s=250;
break;
case 5:s=1073741823;
break;
case 4:s=1e4;
break;
default:s=5e3
}return s=a+s,
r={
id:u++,
callback:i,
priorityLevel:r,
startTime:a,
expirationTime:s,
sortIndex:-1
},
a>o?(r.sortIndex=a,
t(l,
r),
n(c)===null&&r===n(l)&&(h?(v(C),
C=-1):h=!0,
re(x,
a-o))):(r.sortIndex=s,
t(c,
r),
m||p||(m=!0,
S||(S=!0,
D()))),
r
},
e.unstable_shouldYield=E,
e.unstable_wrapCallback=function(e){
var t=f;
return function(){
var n=f;
f=t;
try{
return e.apply(this,
arguments)
}finally{
f=n
}
}
}
})),
l_=o(((e,
t)=>{
t.exports=c_()
})),
u_=o((e=>{
var t=l_(),
n=d(),
r=Op();
function i(e){
var t=`https://react.dev/errors/`+e;
if(1<arguments.length){
t+=`?args[]=`+encodeURIComponent(arguments[
1
]);
for(var n=2;
n<arguments.length;
n++)t+=`&args[]=`+encodeURIComponent(arguments[
n
])
}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
}function a(e){
return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)
}function o(e){
var t=e,
n=e;
if(e.alternate)for(;
t.return;
)t=t.return;
else{
e=t;
do t=e,
t.flags&4098&&(n=t.return),
e=t.return;
while(e)
}return t.tag===3?n:null
}function s(e){
if(e.tag===13){
var t=e.memoizedState;
if(t===null&&(e=e.alternate,
e!==null&&(t=e.memoizedState)),
t!==null)return t.dehydrated
}return null
}function c(e){
if(e.tag===31){
var t=e.memoizedState;
if(t===null&&(e=e.alternate,
e!==null&&(t=e.memoizedState)),
t!==null)return t.dehydrated
}return null
}function l(e){
if(o(e)!==e)throw Error(i(188))
}function u(e){
var t=e.alternate;
if(!t){
if(t=o(e),
t===null)throw Error(i(188));
return t===e?e:null
}for(var n=e,
r=t;
;
){
var a=n.return;
if(a===null)break;
var s=a.alternate;
if(s===null){
if(r=a.return,
r!==null){
n=r;
continue
}break
}if(a.child===s.child){
for(s=a.child;
s;
){
if(s===n)return l(a),
e;
if(s===r)return l(a),
t;
s=s.sibling
}throw Error(i(188))
}if(n.return!==r.return)n=a,
r=s;
else{
for(var c=!1,
u=a.child;
u;
){
if(u===n){
c=!0,
n=a,
r=s;
break
}if(u===r){
c=!0,
r=a,
n=s;
break
}u=u.sibling
}if(!c){
for(u=s.child;
u;
){
if(u===n){
c=!0,
n=s,
r=a;
break
}if(u===r){
c=!0,
r=s,
n=a;
break
}u=u.sibling
}if(!c)throw Error(i(189))
}
}if(n.alternate!==r)throw Error(i(190))
}if(n.tag!==3)throw Error(i(188));
return n.stateNode.current===n?e:t
}function f(e){
var t=e.tag;
if(t===5||t===26||t===27||t===6)return e;
for(e=e.child;
e!==null;
){
if(t=f(e),
t!==null)return t;
e=e.sibling
}return null
}var p=Object.assign,
m=Symbol.for(`react.element`),
h=Symbol.for(`react.transitional.element`),
g=Symbol.for(`react.portal`),
_=Symbol.for(`react.fragment`),
v=Symbol.for(`react.strict_mode`),
y=Symbol.for(`react.profiler`),
b=Symbol.for(`react.consumer`),
x=Symbol.for(`react.context`),
S=Symbol.for(`react.forward_ref`),
C=Symbol.for(`react.suspense`),
w=Symbol.for(`react.suspense_list`),
T=Symbol.for(`react.memo`),
E=Symbol.for(`react.lazy`),
ee=Symbol.for(`react.activity`),
D=Symbol.for(`react.memo_cache_sentinel`),
te=Symbol.iterator;
function ne(e){
return typeof e!=`object`||!e?null:(e=te&&e[
te
]||e[
`@@iterator`
],
typeof e==`function`?e:null)
}var re=Symbol.for(`react.client.reference`);
function ie(e){
if(e==null)return null;
if(typeof e==`function`)return e.$$typeof===re?null:e.displayName||e.name||null;
if(typeof e==`string`)return e;
switch(e){
case _:return`Fragment`;
case y:return`Profiler`;
case v:return`StrictMode`;
case C:return`Suspense`;
case w:return`SuspenseList`;
case ee:return`Activity`
}if(typeof e==`object`)switch(e.$$typeof){
case g:return`Portal`;
case x:return e.displayName||`Context`;
case b:return(e._context.displayName||`Context`)+`.Consumer`;
case S:var t=e.render;
return e=e.displayName,
e||=(e=t.displayName||t.name||``,
e===``?`ForwardRef`:`ForwardRef(`+e+`)`),
e;
case T:return t=e.displayName||null,
t===null?ie(e.type)||`Memo`:t;
case E:t=e._payload,
e=e._init;
try{
return ie(e(t))
}catch{

}
}return null
}var ae=Array.isArray,
O=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
k=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
oe={
pending:!1,
data:null,
method:null,
action:null
},
se=[

],
A=-1;
function ce(e){
return{
current:e
}
}function le(e){
0>A||(e.current=se[
A
],
se[
A
]=null,
A--)
}function j(e,
t){
A++,
se[
A
]=e.current,
e.current=t
}var ue=ce(null),
M=ce(null),
de=ce(null),
fe=ce(null);
function pe(e,
t){
switch(j(de,
t),
j(M,
e),
j(ue,
null),
t.nodeType){
case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Bd(e):0;
break;
default:if(e=t.tagName,
t=t.namespaceURI)t=Bd(t),
e=Vd(t,
e);
else switch(e){
case`svg`:e=1;
break;
case`math`:e=2;
break;
default:e=0
}
}le(ue),
j(ue,
e)
}function me(){
le(ue),
le(M),
le(de)
}function he(e){
e.memoizedState!==null&&j(fe,
e);
var t=ue.current,
n=Vd(t,
e.type);
t!==n&&(j(M,
e),
j(ue,
n))
}function ge(e){
M.current===e&&(le(ue),
le(M)),
fe.current===e&&(le(fe),
Zf._currentValue=oe)
}var _e,
ve;
function ye(e){
if(_e===void 0)try{
throw Error()
}catch(e){
var t=e.stack.trim().match(/\n( *(at )?)/);
_e=t&&t[
1
]||``,
ve=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``
}return`
`+_e+e+ve
}var be=!1;
function xe(e,
t){
if(!e||be)return``;
be=!0;
var n=Error.prepareStackTrace;
Error.prepareStackTrace=void 0;
try{
var r={
DetermineComponentFrameRoot:function(){
try{
if(t){
var n=function(){
throw Error()
};
if(Object.defineProperty(n.prototype,
"props",
{
set:function(){
throw Error()
}
}),
typeof Reflect==`object`&&Reflect.construct){
try{
Reflect.construct(n,
[

])
}catch(e){
var r=e
}Reflect.construct(e,
[

],
n)
}else{
try{
n.call()
}catch(e){
r=e
}e.call(n.prototype)
}
}else{
try{
throw Error()
}catch(e){
r=e
}(n=e())&&typeof n.catch==`function`&&n.catch(function(){

})
}
}catch(e){
if(e&&r&&typeof e.stack==`string`)return[
e.stack,
r.stack
]
}return[
null,
null
]
}
};
r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;
var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,
`name`);
i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,
"name",
{
value:`DetermineComponentFrameRoot`
});
var a=r.DetermineComponentFrameRoot(),
o=a[
0
],
s=a[
1
];
if(o&&s){
var c=o.split(`
`),
l=s.split(`
`);
for(i=r=0;
r<c.length&&!c[
r
].includes(`DetermineComponentFrameRoot`);
)r++;
for(;
i<l.length&&!l[
i
].includes(`DetermineComponentFrameRoot`);
)i++;
if(r===c.length||i===l.length)for(r=c.length-1,
i=l.length-1;
1<=r&&0<=i&&c[
r
]!==l[
i
];
)i--;
for(;
1<=r&&0<=i;
r--,
i--)if(c[
r
]!==l[
i
]){
if(r!==1||i!==1)do if(r--,
i--,
0>i||c[
r
]!==l[
i
]){
var u=`
`+c[
r
].replace(` at new `,
` at `);
return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,
e.displayName)),
u
}while(1<=r&&0<=i);
break
}
}
}finally{
be=!1,
Error.prepareStackTrace=n
}return(n=e?e.displayName||e.name:``)?ye(n):``
}function Se(e,
t){
switch(e.tag){
case 26:case 27:case 5:return ye(e.type);
case 16:return ye(`Lazy`);
case 13:return e.child!==t&&t!==null?ye(`Suspense Fallback`):ye(`Suspense`);
case 19:return ye(`SuspenseList`);
case 0:case 15:return xe(e.type,
!1);
case 11:return xe(e.type.render,
!1);
case 1:return xe(e.type,
!0);
case 31:return ye(`Activity`);
default:return``
}
}function Ce(e){
try{
var t=``,
n=null;
do t+=Se(e,
n),
n=e,
e=e.return;
while(e);
return t
}catch(e){
return`
Error generating stack: `+e.message+`
`+e.stack
}
}var we=Object.prototype.hasOwnProperty,
Te=t.unstable_scheduleCallback,
Ee=t.unstable_cancelCallback,
De=t.unstable_shouldYield,
Oe=t.unstable_requestPaint,
N=t.unstable_now,
ke=t.unstable_getCurrentPriorityLevel,
Ae=t.unstable_ImmediatePriority,
je=t.unstable_UserBlockingPriority,
Me=t.unstable_NormalPriority,
Ne=t.unstable_LowPriority,
Pe=t.unstable_IdlePriority,
Fe=t.log,
Ie=t.unstable_setDisableYieldValue,
Le=null,
Re=null;
function ze(e){
if(typeof Fe==`function`&&Ie(e),
Re&&typeof Re.setStrictMode==`function`)try{
Re.setStrictMode(Le,
e)
}catch{

}
}var Be=Math.clz32?Math.clz32:Ue,
Ve=Math.log,
He=Math.LN2;
function Ue(e){
return e>>>=0,
e===0?32:31-(Ve(e)/He|0)|0
}var We=256,
Ge=262144,
Ke=4194304;
function qe(e){
var t=e&42;
if(t!==0)return t;
switch(e&-e){
case 1:return 1;
case 2:return 2;
case 4:return 4;
case 8:return 8;
case 16:return 16;
case 32:return 32;
case 64:return 64;
case 128:return 128;
case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;
case 262144:case 524288:case 1048576:case 2097152:return e&3932160;
case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;
case 67108864:return 67108864;
case 134217728:return 134217728;
case 268435456:return 268435456;
case 536870912:return 536870912;
case 1073741824:return 0;
default:return e
}
}function Je(e,
t,
n){
var r=e.pendingLanes;
if(r===0)return 0;
var i=0,
a=e.suspendedLanes,
o=e.pingedLanes;
e=e.warmLanes;
var s=r&134217727;
return s===0?(s=r&~a,
s===0?o===0?n||(n=r&~e,
n!==0&&(i=qe(n))):i=qe(o):i=qe(s)):(r=s&~a,
r===0?(o&=s,
o===0?n||(n=s&~e,
n!==0&&(i=qe(n))):i=qe(o)):i=qe(r)),
i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,
n=t&-t,
a>=n||a===32&&n&4194048)?t:i
}function Ye(e,
t){
return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0
}function Xe(e,
t){
switch(e){
case 1:case 2:case 4:case 8:case 64:return t+250;
case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;
case 4194304:case 8388608:case 16777216:case 33554432:return-1;
case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;
default:return-1
}
}function Ze(){
var e=Ke;
return Ke<<=1,
!(Ke&62914560)&&(Ke=4194304),
e
}function Qe(e){
for(var t=[

],
n=0;
31>n;
n++)t.push(e);
return t
}function $e(e,
t){
e.pendingLanes|=t,
t!==268435456&&(e.suspendedLanes=0,
e.pingedLanes=0,
e.warmLanes=0)
}function et(e,
t,
n,
r,
i,
a){
var o=e.pendingLanes;
e.pendingLanes=n,
e.suspendedLanes=0,
e.pingedLanes=0,
e.warmLanes=0,
e.expiredLanes&=n,
e.entangledLanes&=n,
e.errorRecoveryDisabledLanes&=n,
e.shellSuspendCounter=0;
var s=e.entanglements,
c=e.expirationTimes,
l=e.hiddenUpdates;
for(n=o&~n;
0<n;
){
var u=31-Be(n),
d=1<<u;
s[
u
]=0,
c[
u
]=-1;
var f=l[
u
];
if(f!==null)for(l[
u
]=null,
u=0;
u<f.length;
u++){
var p=f[
u
];
p!==null&&(p.lane&=-536870913)
}n&=~d
}r!==0&&tt(e,
r,
0),
a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))
}function tt(e,
t,
n){
e.pendingLanes|=t,
e.suspendedLanes&=~t;
var r=31-Be(t);
e.entangledLanes|=t,
e.entanglements[
r
]=e.entanglements[
r
]|1073741824|n&261930
}function nt(e,
t){
var n=e.entangledLanes|=t;
for(e=e.entanglements;
n;
){
var r=31-Be(n),
i=1<<r;
i&t|e[
r
]&t&&(e[
r
]|=t),
n&=~i
}
}function rt(e,
t){
var n=t&-t;
return n=n&42?1:it(n),
(n&(e.suspendedLanes|t))===0?n:0
}function it(e){
switch(e){
case 2:e=1;
break;
case 8:e=4;
break;
case 32:e=16;
break;
case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;
break;
case 268435456:e=134217728;
break;
default:e=0
}return e
}function at(e){
return e&=-e,
2<e?8<e?e&134217727?32:268435456:8:2
}function ot(){
var e=k.p;
return e===0?(e=window.event,
e===void 0?32:pp(e.type)):e
}function st(e,
t){
var n=k.p;
try{
return k.p=e,
t()
}finally{
k.p=n
}
}var ct=Math.random().toString(36).slice(2),
lt=`__reactFiber$`+ct,
ut=`__reactProps$`+ct,
dt=`__reactContainer$`+ct,
ft=`__reactEvents$`+ct,
pt=`__reactListeners$`+ct,
mt=`__reactHandles$`+ct,
ht=`__reactResources$`+ct,
gt=`__reactMarker$`+ct;
function _t(e){
delete e[
lt
],
delete e[
ut
],
delete e[
ft
],
delete e[
pt
],
delete e[
mt
]
}function vt(e){
var t=e[
lt
];
if(t)return t;
for(var n=e.parentNode;
n;
){
if(t=n[
dt
]||n[
lt
]){
if(n=t.alternate,
t.child!==null||n!==null&&n.child!==null)for(e=uf(e);
e!==null;
){
if(n=e[
lt
])return n;
e=uf(e)
}return t
}e=n,
n=e.parentNode
}return null
}function yt(e){
if(e=e[
lt
]||e[
dt
]){
var t=e.tag;
if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e
}return null
}function bt(e){
var t=e.tag;
if(t===5||t===26||t===27||t===6)return e.stateNode;
throw Error(i(33))
}function xt(e){
var t=e[
ht
];
return t||=e[
ht
]={
hoistableStyles:new Map,
hoistableScripts:new Map
},
t
}function St(e){
e[
gt
]=!0
}var Ct=new Set,
wt={

};
function Tt(e,
t){
Et(e,
t),
Et(e+`Capture`,
t)
}function Et(e,
t){
for(wt[
e
]=t,
e=0;
e<t.length;
e++)Ct.add(t[
e
])
}var Dt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),
Ot={

},
kt={

};
function At(e){
return we.call(kt,
e)?!0:we.call(Ot,
e)?!1:Dt.test(e)?kt[
e
]=!0:(Ot[
e
]=!0,
!1)
}function jt(e,
t,
n){
if(At(t))if(n===null)e.removeAttribute(t);
else{
switch(typeof n){
case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);
return;
case`boolean`:var r=t.toLowerCase().slice(0,
5);
if(r!==`data-`&&r!==`aria-`){
e.removeAttribute(t);
return
}
}e.setAttribute(t,
``+n)
}
}function Mt(e,
t,
n){
if(n===null)e.removeAttribute(t);
else{
switch(typeof n){
case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);
return
}e.setAttribute(t,
``+n)
}
}function Nt(e,
t,
n,
r){
if(r===null)e.removeAttribute(n);
else{
switch(typeof r){
case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);
return
}e.setAttributeNS(t,
n,
``+r)
}
}function Pt(e){
switch(typeof e){
case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;
case`object`:return e;
default:return``
}
}function Ft(e){
var t=e.type;
return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)
}function It(e,
t,
n){
var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,
t);
if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){
var i=r.get,
a=r.set;
return Object.defineProperty(e,
t,
{
configurable:!0,
get:function(){
return i.call(this)
},
set:function(e){
n=``+e,
a.call(this,
e)
}
}),
Object.defineProperty(e,
t,
{
enumerable:r.enumerable
}),
{
getValue:function(){
return n
},
setValue:function(e){
n=``+e
},
stopTracking:function(){
e._valueTracker=null,
delete e[
t
]
}
}
}
}function Lt(e){
if(!e._valueTracker){
var t=Ft(e)?`checked`:`value`;
e._valueTracker=It(e,
t,
``+e[
t
])
}
}function Rt(e){
if(!e)return!1;
var t=e._valueTracker;
if(!t)return!0;
var n=t.getValue(),
r=``;
return e&&(r=Ft(e)?e.checked?`true`:`false`:e.value),
e=r,
e===n?!1:(t.setValue(e),
!0)
}function zt(e){
if(e||=typeof document<`u`?document:void 0,
e===void 0)return null;
try{
return e.activeElement||e.body
}catch{
return e.body
}
}var Bt=/[
\n"\\]/g;function Vt(e){return e.replace(Bt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Ht(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Pt(t)):e.value!==``+Pt(t)&&(e.value=``+Pt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Wt(e,o,Pt(n)):Wt(e,o,Pt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Pt(s):e.removeAttribute(`name`)}function Ut(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Lt(e);return}n=n==null?``:``+Pt(n),t=t==null?n:``+Pt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Lt(e)}function Wt(e,t,n){t===`number`&&zt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Gt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Pt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Kt(e,t,n){if(t!=null&&(t=``+Pt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Pt(n)}function qt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(ae(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Pt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Lt(e)}function Jt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var P=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Yt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||P.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Xt(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Yt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&Yt(e,o,t[o])}function Zt(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Qt=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),$t=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function en(e){return $t.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function tn(){}var nn=null;function rn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var an=null,on=null;function sn(e){var t=yt(e);if(t&&(e=t.stateNode)){var n=e[ut]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Ht(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Vt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[ut]||null;if(!a)throw Error(i(90));Ht(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Rt(r)}break a;case`textarea`:Kt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Gt(e,!!n.multiple,t,!1)}}}var cn=!1;function ln(e,t,n){if(cn)return e(t,n);cn=!0;try{return e(t)}finally{if(cn=!1,(an!==null||on!==null)&&(vu(),an&&(t=an,e=on,on=an=null,sn(t),e)))for(t=0;t<e.length;t++)sn(e[t])}}function un(e,t){var n=e.stateNode;if(n===null)return null;var r=n[ut]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var dn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),fn=!1;if(dn)try{var pn={};Object.defineProperty(pn,"passive",{get:function(){fn=!0}}),window.addEventListener(`test`,pn,pn),window.removeEventListener(`test`,pn,pn)}catch{fn=!1}var mn=null,hn=null,gn=null;function _n(){if(gn)return gn;var e,t=hn,n=t.length,r,i=`value`in mn?mn.value:mn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return gn=i.slice(e,1<r?1-r:void 0)}function vn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function yn(){return!0}function bn(){return!1}function F(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?yn:bn,this.isPropagationStopped=bn,this}return p(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=yn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=yn)},persist:function(){},isPersistent:yn}),t}var xn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Sn=F(xn),Cn=p({},xn,{view:0,detail:0}),wn=F(Cn),Tn,En,Dn,On=p({},Cn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Dn&&(Dn&&e.type===`mousemove`?(Tn=e.screenX-Dn.screenX,En=e.screenY-Dn.screenY):En=Tn=0,Dn=e),Tn)},movementY:function(e){return`movementY`in e?e.movementY:En}}),kn=F(On),An=F(p({},On,{dataTransfer:0})),jn=F(p({},Cn,{relatedTarget:0})),Mn=F(p({},xn,{animationName:0,elapsedTime:0,pseudoElement:0})),Nn=F(p({},xn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Pn=F(p({},xn,{data:0})),Fn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},In={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Ln={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Rn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Ln[e])?!!t[e]:!1}function zn(){return Rn}var Bn=F(p({},Cn,{key:function(e){if(e.key){var t=Fn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=vn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?In[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zn,charCode:function(e){return e.type===`keypress`?vn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?vn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Vn=F(p({},On,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Hn=F(p({},Cn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zn})),Un=F(p({},xn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Wn=F(p({},On,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Gn=F(p({},xn,{newState:0,oldState:0})),Kn=[9,13,27,32],qn=dn&&`CompositionEvent`in window,Jn=null;dn&&`documentMode`in document&&(Jn=document.documentMode);var Yn=dn&&`TextEvent`in window&&!Jn,Xn=dn&&(!qn||Jn&&8<Jn&&11>=Jn),Zn=` `,Qn=!1;function $n(e,t){switch(e){case`keyup`:return Kn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function er(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var tr=!1;function nr(e,t){switch(e){case`compositionend`:return er(t);case`keypress`:return t.which===32?(Qn=!0,Zn):null;case`textInput`:return e=t.data,e===Zn&&Qn?null:e;default:return null}}function rr(e,t){if(tr)return e===`compositionend`||!qn&&$n(e,t)?(e=_n(),gn=hn=mn=null,tr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Xn&&t.locale!==`ko`?null:t.data;default:return null}}var ir={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ar(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!ir[e.type]:t===`textarea`}function or(e,t,n,r){an?on?on.push(r):on=[r]:an=r,t=wd(t,`onChange`),0<t.length&&(n=new Sn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var I=null,sr=null;function cr(e){_d(e,0)}function lr(e){if(Rt(bt(e)))return e}function ur(e,t){if(e===`change`)return t}var dr=!1;if(dn){var fr;if(dn){var pr=`oninput`in document;if(!pr){var mr=document.createElement(`div`);mr.setAttribute(`oninput`,`return;`),pr=typeof mr.oninput==`function`}fr=pr}else fr=!1;dr=fr&&(!document.documentMode||9<document.documentMode)}function hr(){I&&(I.detachEvent(`onpropertychange`,gr),sr=I=null)}function gr(e){if(e.propertyName===`value`&&lr(sr)){var t=[];or(t,sr,e,rn(e)),ln(cr,t)}}function _r(e,t,n){e===`focusin`?(hr(),I=t,sr=n,I.attachEvent(`onpropertychange`,gr)):e===`focusout`&&hr()}function vr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return lr(sr)}function yr(e,t){if(e===`click`)return lr(t)}function br(e,t){if(e===`input`||e===`change`)return lr(t)}function xr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Sr=typeof Object.is==`function`?Object.is:xr;function Cr(e,t){if(Sr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!we.call(t,i)||!Sr(e[i],t[i]))return!1}return!0}function wr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Tr(e,t){var n=wr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=wr(n)}}function L(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?L(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Er(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=zt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=zt(e.document)}return t}function Dr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Or=dn&&`documentMode`in document&&11>=document.documentMode,kr=null,Ar=null,jr=null,Mr=!1;function Nr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Mr||kr==null||kr!==zt(r)||(r=kr,`selectionStart`in r&&Dr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),jr&&Cr(jr,r)||(jr=r,r=wd(Ar,`onSelect`),0<r.length&&(t=new Sn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=kr)))}function Pr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Fr={animationend:Pr(`Animation`,`AnimationEnd`),animationiteration:Pr(`Animation`,`AnimationIteration`),animationstart:Pr(`Animation`,`AnimationStart`),transitionrun:Pr(`Transition`,`TransitionRun`),transitionstart:Pr(`Transition`,`TransitionStart`),transitioncancel:Pr(`Transition`,`TransitionCancel`),transitionend:Pr(`Transition`,`TransitionEnd`)},Ir={},Lr={};dn&&(Lr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Fr.animationend.animation,delete Fr.animationiteration.animation,delete Fr.animationstart.animation),`TransitionEvent`in window||delete Fr.transitionend.transition);function Rr(e){if(Ir[e])return Ir[e];if(!Fr[e])return e;var t=Fr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Lr)return Ir[e]=t[n];return e}var zr=Rr(`animationend`),Br=Rr(`animationiteration`),Vr=Rr(`animationstart`),Hr=Rr(`transitionrun`),Ur=Rr(`transitionstart`),Wr=Rr(`transitioncancel`),Gr=Rr(`transitionend`),Kr=new Map,R=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);R.push(`scrollEnd`);function z(e,t){Kr.set(e,t),Tt(t,[e])}var qr=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Jr=[],Yr=0,Xr=0;function Zr(){for(var e=Yr,t=Xr=Yr=0;t<e;){var n=Jr[t];Jr[t++]=null;var r=Jr[t];Jr[t++]=null;var i=Jr[t];Jr[t++]=null;var a=Jr[t];if(Jr[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ti(n,i,a)}}function Qr(e,t,n,r){Jr[Yr++]=e,Jr[Yr++]=t,Jr[Yr++]=n,Jr[Yr++]=r,Xr|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function $r(e,t,n,r){return Qr(e,t,n,r),ni(e)}function ei(e,t){return Qr(e,null,null,t),ni(e)}function ti(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Be(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ni(e){if(50<lu)throw lu=0,uu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ri={};function ii(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ai(e,t,n,r){return new ii(e,t,n,r)}function oi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function si(e,t){var n=e.alternate;return n===null?(n=ai(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function ci(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function li(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)oi(e)&&(s=1);else if(typeof e==`string`)s=Hf(e,n,ue.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case ee:return e=ai(31,n,t,a),e.elementType=ee,e.lanes=o,e;case _:return ui(n.children,a,o,t);case v:s=8,a|=24;break;case y:return e=ai(12,n,t,a|2),e.elementType=y,e.lanes=o,e;case C:return e=ai(13,n,t,a),e.elementType=C,e.lanes=o,e;case w:return e=ai(19,n,t,a),e.elementType=w,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case x:s=10;break a;case b:s=9;break a;case S:s=11;break a;case T:s=14;break a;case E:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=ai(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function ui(e,t,n,r){return e=ai(7,e,r,t),e.lanes=n,e}function di(e,t,n){return e=ai(6,e,null,t),e.lanes=n,e}function fi(e){var t=ai(18,null,null,0);return t.stateNode=e,t}function pi(e,t,n){return t=ai(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var mi=new WeakMap;function hi(e,t){if(typeof e==`object`&&e){var n=mi.get(e);return n===void 0?(t={value:e,source:t,stack:Ce(t)},mi.set(e,t),t):n}return{value:e,source:t,stack:Ce(t)}}var gi=[],_i=0,vi=null,yi=0,bi=[],xi=0,Si=null,Ci=1,wi=``;function Ti(e,t){gi[_i++]=yi,gi[_i++]=vi,vi=e,yi=t}function Ei(e,t,n){bi[xi++]=Ci,bi[xi++]=wi,bi[xi++]=Si,Si=e;var r=Ci;e=wi;var i=32-Be(r)-1;r&=~(1<<i),n+=1;var a=32-Be(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Ci=1<<32-Be(t)+i|n<<i|r,wi=a+e}else Ci=1<<a|n<<i|r,wi=e}function Di(e){e.return!==null&&(Ti(e,1),Ei(e,1,0))}function Oi(e){for(;e===vi;)vi=gi[--_i],gi[_i]=null,yi=gi[--_i],gi[_i]=null;for(;e===Si;)Si=bi[--xi],bi[xi]=null,wi=bi[--xi],bi[xi]=null,Ci=bi[--xi],bi[xi]=null}function ki(e,t){bi[xi++]=Ci,bi[xi++]=wi,bi[xi++]=Si,Ci=t.id,wi=t.overflow,Si=e}var Ai=null,ji=null,B=!1,Mi=null,Ni=!1,Pi=Error(i(519));function Fi(e){throw Vi(hi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Pi}function Ii(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[lt]=e,t[ut]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<hd.length;n++)Q(hd[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Ut(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),qt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Ad(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=tn),t=!0):t=!1,t||Fi(e,!0)}function Li(e){for(Ai=e.return;Ai;)switch(Ai.tag){case 5:case 31:case 13:Ni=!1;return;case 27:case 3:Ni=!0;return;default:Ai=Ai.return}}function Ri(e){if(e!==Ai)return!1;if(!B)return Li(e),B=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Hd(e.type,e.memoizedProps)),n=!n),n&&ji&&Fi(e),Li(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));ji=lf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));ji=lf(e)}else t===27?(t=ji,Xd(e.type)?(e=cf,cf=null,ji=e):ji=t):ji=Ai?sf(e.stateNode.nextSibling):null;return!0}function zi(){ji=Ai=null,B=!1}function Bi(){var e=Mi;return e!==null&&(Yl===null?Yl=e:Yl.push.apply(Yl,e),Mi=null),e}function Vi(e){Mi===null?Mi=[e]:Mi.push(e)}var Hi=ce(null),Ui=null,Wi=null;function Gi(e,t,n){j(Hi,t._currentValue),t._currentValue=n}function Ki(e){e._currentValue=Hi.current,le(Hi)}function qi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Ji(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),qi(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),qi(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Yi(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Sr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===fe.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Zf]:e.push(Zf))}a=a.return}e!==null&&Ji(t,e,n,r),t.flags|=262144}function Xi(e){for(e=e.firstContext;e!==null;){if(!Sr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Zi(e){Ui=e,Wi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Qi(e){return ea(Ui,e)}function $i(e,t){return Ui===null&&Zi(e),ea(e,t)}function ea(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Wi===null){if(e===null)throw Error(i(308));Wi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Wi=Wi.next=t;return n}var ta=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},na=t.unstable_scheduleCallback,ra=t.unstable_NormalPriority,ia={$$typeof:x,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function aa(){return{controller:new ta,data:new Map,refCount:0}}function oa(e){e.refCount--,e.refCount===0&&na(ra,function(){e.controller.abort()})}var sa=null,ca=0,la=0,ua=null;function da(e,t){if(sa===null){var n=sa=[];ca=0,la=ld(),ua={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return ca++,t.then(fa,fa),t}function fa(){if(--ca===0&&sa!==null){ua!==null&&(ua.status=`fulfilled`);var e=sa;sa=null,la=0,ua=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function pa(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var ma=O.S;O.S=function(e,t){Ql=N(),typeof t==`object`&&t&&typeof t.then==`function`&&da(e,t),ma!==null&&ma(e,t)};var ha=ce(null);function ga(){var e=ha.current;return e===null?Il.pooledCache:e}function _a(e,t){t===null?j(ha,ha.current):j(ha,t.pool)}function va(){var e=ga();return e===null?null:{parent:ia._currentValue,pool:e}}var ya=Error(i(460)),ba=Error(i(474)),xa=Error(i(542)),Sa={then:function(){}};function Ca(e){return e=e.status,e===`fulfilled`||e===`rejected`}function wa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(tn,tn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Oa(e),e;default:if(typeof t.status==`string`)t.then(tn,tn);else{if(e=Il,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Oa(e),e}throw Ea=t,ya}}function Ta(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Ea=e,ya):e}}var Ea=null;function Da(){if(Ea===null)throw Error(i(459));var e=Ea;return Ea=null,e}function Oa(e){if(e===ya||e===xa)throw Error(i(483))}var ka=null,Aa=0;function ja(e){var t=Aa;return Aa+=1,ka===null&&(ka=[]),wa(ka,e,t)}function Ma(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Na(e,t){throw t.$$typeof===m?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Pa(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=si(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=di(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===_?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===E&&Ta(i)===t.type)?(t=a(t,n.props),Ma(t,n),t.return=e,t):(t=li(n.type,n.key,n.props,null,e.mode,r),Ma(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=pi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=ui(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=di(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case h:return n=li(t.type,t.key,t.props,null,e.mode,n),Ma(n,t),n.return=e,n;case g:return t=pi(t,e.mode,n),t.return=e,t;case E:return t=Ta(t),f(e,t,n)}if(ae(t)||ne(t))return t=ui(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,ja(t),n);if(t.$$typeof===x)return f(e,$i(e,t),n);Na(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case h:return n.key===i?l(e,t,n,r):null;case g:return n.key===i?u(e,t,n,r):null;case E:return n=Ta(n),p(e,t,n,r)}if(ae(n)||ne(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,ja(n),r);if(n.$$typeof===x)return p(e,t,$i(e,n),r);Na(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case h:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case g:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case E:return r=Ta(r),m(e,t,n,r,i)}if(ae(r)||ne(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,ja(r),i);if(r.$$typeof===x)return m(e,t,n,$i(t,r),i);Na(t,r)}return null}function v(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),B&&Ti(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return B&&Ti(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),B&&Ti(i,h),l}function y(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),B&&Ti(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return B&&Ti(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),B&&Ti(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===_&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case h:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===_){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===E&&Ta(l)===r.type){n(e,r.sibling),c=a(r,o.props),Ma(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===_?(c=ui(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=li(o.type,o.key,o.props,null,e.mode,c),Ma(c,o),c.return=e,e=c)}return s(e);case g:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=pi(o,e.mode,c),c.return=e,e=c}return s(e);case E:return o=Ta(o),b(e,r,o,c)}if(ae(o))return v(e,r,o,c);if(ne(o)){if(l=ne(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),y(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,ja(o),c);if(o.$$typeof===x)return b(e,r,$i(e,o),c);Na(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=di(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Aa=0;var i=b(e,t,n,r);return ka=null,i}catch(t){if(t===ya||t===xa)throw t;var a=ai(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Fa=Pa(!0),Ia=Pa(!1),La=!1;function Ra(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function za(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ba(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Va(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,q&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ni(e),ti(e,null,n),t}return Qr(e,r,t,n),ni(e)}function Ha(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,nt(e,n)}}function Ua(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Wa=!1;function Ga(){if(Wa){var e=ua;if(e!==null)throw e}}function Ka(e,t,n,r){Wa=!1;var i=e.updateQueue;La=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,m=f!==s.lane;if(m?(Y&f)===f:(r&f)===f){f!==0&&f===la&&(Wa=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var h=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(h=g.payload,typeof h==`function`){d=h.call(_,d,f);break a}d=h;break a;case 3:h.flags=h.flags&-65537|128;case 0:if(h=g.payload,f=typeof h==`function`?h.call(_,d,f):h,f==null)break a;d=p({},d,f);break a;case 2:La=!0}}f=s.callback,f!==null&&(e.flags|=64,m&&(e.flags|=8192),m=i.callbacks,m===null?i.callbacks=[f]:m.push(f))}else m={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=m,c=d):u=u.next=m,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;m=s,s=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Ul|=o,e.lanes=o,e.memoizedState=d}}function qa(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Ja(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)qa(n[e],t)}var Ya=ce(null),Xa=ce(0);function Za(e,t){e=Vl,j(Xa,e),j(Ya,t),Vl=e|t.baseLanes}function Qa(){j(Xa,Vl),j(Ya,Ya.current)}function $a(){Vl=Xa.current,le(Ya),le(Xa)}var eo=ce(null),to=null;function no(e){var t=e.alternate;j(so,so.current&1),j(eo,e),to===null&&(t===null||Ya.current!==null||t.memoizedState!==null)&&(to=e)}function ro(e){j(so,so.current),j(eo,e),to===null&&(to=e)}function io(e){e.tag===22?(j(so,so.current),j(eo,e),to===null&&(to=e)):ao(e)}function ao(){j(so,so.current),j(eo,eo.current)}function oo(e){le(eo),to===e&&(to=null),le(so)}var so=ce(0);function co(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||rf(n)||af(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var lo=0,V=null,H=null,uo=null,fo=!1,po=!1,mo=!1,ho=0,go=0,_o=null,vo=0;function yo(){throw Error(i(321))}function bo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Sr(e[n],t[n]))return!1;return!0}function xo(e,t,n,r,i,a){return lo=a,V=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,O.H=e===null||e.memoizedState===null?Is:Ls,mo=!1,a=n(r,i),mo=!1,po&&(a=Co(t,n,r,i)),So(e),a}function So(e){O.H=Fs;var t=H!==null&&H.next!==null;if(lo=0,uo=H=V=null,fo=!1,go=0,_o=null,t)throw Error(i(300));e===null||ec||(e=e.dependencies,e!==null&&Xi(e)&&(ec=!0))}function Co(e,t,n,r){V=e;var a=0;do{if(po&&(_o=null),go=0,po=!1,25<=a)throw Error(i(301));if(a+=1,uo=H=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}O.H=Rs,o=t(n,r)}while(po);return o}function wo(){var e=O.H,t=e.useState()[0];return t=typeof t.then==`function`?jo(t):t,e=e.useState()[0],(H===null?null:H.memoizedState)!==e&&(V.flags|=1024),t}function To(){var e=ho!==0;return ho=0,e}function Eo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Do(e){if(fo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}fo=!1}lo=0,uo=H=V=null,po=!1,go=ho=0,_o=null}function Oo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return uo===null?V.memoizedState=uo=e:uo=uo.next=e,uo}function ko(){if(H===null){var e=V.alternate;e=e===null?null:e.memoizedState}else e=H.next;var t=uo===null?V.memoizedState:uo.next;if(t!==null)uo=t,H=e;else{if(e===null)throw V.alternate===null?Error(i(467)):Error(i(310));H=e,e={memoizedState:H.memoizedState,baseState:H.baseState,baseQueue:H.baseQueue,queue:H.queue,next:null},uo===null?V.memoizedState=uo=e:uo=uo.next=e}return uo}function Ao(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function jo(e){var t=go;return go+=1,_o===null&&(_o=[]),e=wa(_o,e,t),t=V,(uo===null?t.memoizedState:uo.next)===null&&(t=t.alternate,O.H=t===null||t.memoizedState===null?Is:Ls),e}function Mo(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return jo(e);if(e.$$typeof===x)return Qi(e)}throw Error(i(438,String(e)))}function No(e){var t=null,n=V.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=V.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Ao(),V.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=D;return t.index++,n}function Po(e,t){return typeof t==`function`?t(e):t}function Fo(e){return Io(ko(),H,e)}function Io(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(lo&f)===f:(Y&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===la&&(d=!0);else if((lo&p)===p){u=u.next,p===la&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,V.lanes|=p,Ul|=p;f=u.action,mo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,V.lanes|=f,Ul|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Sr(o,e.memoizedState)&&(ec=!0,d&&(n=ua,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Lo(e){var t=ko(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Sr(o,t.memoizedState)||(ec=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Ro(e,t,n){var r=V,a=ko(),o=B;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Sr((H||a).memoizedState,n);if(s&&(a.memoizedState=n,ec=!0),a=a.queue,ls(Vo.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||uo!==null&&uo.memoizedState.tag&1){if(r.flags|=2048,is(9,{destroy:void 0},Bo.bind(null,r,a,n,t),null),Il===null)throw Error(i(349));o||lo&127||zo(r,t,n)}return n}function zo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=V.updateQueue,t===null?(t=Ao(),V.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Bo(e,t,n,r){t.value=n,t.getSnapshot=r,Ho(t)&&Uo(e)}function Vo(e,t,n){return n(function(){Ho(t)&&Uo(e)})}function Ho(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Sr(e,n)}catch{return!0}}function Uo(e){var t=ei(e,2);t!==null&&pu(t,e,2)}function Wo(e){var t=Oo();if(typeof e==`function`){var n=e;if(e=n(),mo){ze(!0);try{n()}finally{ze(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Po,lastRenderedState:e},t}function Go(e,t,n,r){return e.baseState=n,Io(e,H,typeof r==`function`?r:Po)}function Ko(e,t,n,r,a){if(Ms(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};O.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,qo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function qo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=O.T,o={};O.T=o;try{var s=n(i,r),c=O.S;c!==null&&c(o,s),Jo(e,t,s)}catch(n){Xo(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),O.T=a}}else try{a=n(i,r),Jo(e,t,a)}catch(n){Xo(e,t,n)}}function Jo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Yo(e,t,n)},function(n){return Xo(e,t,n)}):Yo(e,t,n)}function Yo(e,t,n){t.status=`fulfilled`,t.value=n,Zo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,qo(e,n)))}function Xo(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Zo(t),t=t.next;while(t!==r)}e.action=null}function Zo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Qo(e,t){return t}function $o(e,t){if(B){var n=Il.formState;if(n!==null){a:{var r=V;if(B){if(ji){b:{for(var i=ji,a=Ni;i.nodeType!==8;){if(!a){i=null;break b}if(i=sf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){ji=sf(i.nextSibling),r=i.data===`F!`;break a}}Fi(r)}r=!1}r&&(t=n[0])}}return n=Oo(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qo,lastRenderedState:t},n.queue=r,n=ks.bind(null,V,r),r.dispatch=n,r=Wo(!1),a=js.bind(null,V,!1,r.queue),r=Oo(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Ko.bind(null,V,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function es(e){return ts(ko(),H,e)}function ts(e,t,n){if(t=Io(e,t,Qo)[0],e=Fo(Po)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=jo(t)}catch(e){throw e===ya?xa:e}else r=t;t=ko();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(V.flags|=2048,is(9,{destroy:void 0},ns.bind(null,i,n),null)),[r,a,e]}function ns(e,t){e.action=t}function rs(e){var t=ko(),n=H;if(n!==null)return ts(t,n,e);ko(),t=t.memoizedState,n=ko();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function is(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=V.updateQueue,t===null&&(t=Ao(),V.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function as(){return ko().memoizedState}function os(e,t,n,r){var i=Oo();V.flags|=e,i.memoizedState=is(1|t,{destroy:void 0},n,r===void 0?null:r)}function ss(e,t,n,r){var i=ko();r=r===void 0?null:r;var a=i.memoizedState.inst;H!==null&&r!==null&&bo(r,H.memoizedState.deps)?i.memoizedState=is(t,a,n,r):(V.flags|=e,i.memoizedState=is(1|t,a,n,r))}function cs(e,t){os(8390656,8,e,t)}function ls(e,t){ss(2048,8,e,t)}function us(e){V.flags|=4;var t=V.updateQueue;if(t===null)t=Ao(),V.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function ds(e){var t=ko().memoizedState;return us({ref:t,nextImpl:e}),function(){if(q&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function fs(e,t){return ss(4,2,e,t)}function ps(e,t){return ss(4,4,e,t)}function ms(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function U(e,t,n){n=n==null?null:n.concat([e]),ss(4,4,ms.bind(null,t,e),n)}function hs(){}function gs(e,t){var n=ko();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&bo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function _s(e,t){var n=ko();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&bo(t,r[1]))return r[0];if(r=e(),mo){ze(!0);try{e()}finally{ze(!1)}}return n.memoizedState=[r,t],r}function vs(e,t,n){return n===void 0||lo&1073741824&&!(Y&261930)?e.memoizedState=t:(e.memoizedState=n,e=fu(),V.lanes|=e,Ul|=e,n)}function ys(e,t,n,r){return Sr(n,t)?n:Ya.current===null?!(lo&42)||lo&1073741824&&!(Y&261930)?(ec=!0,e.memoizedState=n):(e=fu(),V.lanes|=e,Ul|=e,t):(e=vs(e,n,r),Sr(e,t)||(ec=!0),e)}function bs(e,t,n,r,i){var a=k.p;k.p=a!==0&&8>a?a:8;var o=O.T,s={};O.T=s,js(e,!1,t,n);try{var c=i(),l=O.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?As(e,t,pa(c,r),du(e)):As(e,t,r,du(e))}catch(n){As(e,t,{then:function(){},status:`rejected`,reason:n},du())}finally{k.p=a,o!==null&&s.types!==null&&(o.types=s.types),O.T=o}}function xs(){}function Ss(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Cs(e).queue;bs(e,a,t,oe,n===null?xs:function(){return ws(e),n(r)})}function Cs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:oe,baseState:oe,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Po,lastRenderedState:oe},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Po,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ws(e){var t=Cs(e);t.next===null&&(t=e.alternate.memoizedState),As(e,t.next.queue,{},du())}function Ts(){return Qi(Zf)}function Es(){return ko().memoizedState}function Ds(){return ko().memoizedState}function W(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=du();e=Ba(n);var r=Va(t,e,n);r!==null&&(pu(r,t,n),Ha(r,t,n)),t={cache:aa()},e.payload=t;return}t=t.return}}function Os(e,t,n){var r=du();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ms(e)?Ns(t,n):(n=$r(e,t,n,r),n!==null&&(pu(n,e,r),Ps(n,t,r)))}function ks(e,t,n){As(e,t,n,du())}function As(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ms(e))Ns(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Sr(s,o))return Qr(e,t,i,0),Il===null&&Zr(),!1}catch{}if(n=$r(e,t,i,r),n!==null)return pu(n,e,r),Ps(n,t,r),!0}return!1}function js(e,t,n,r){if(r={lane:2,revertLane:ld(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Ms(e)){if(t)throw Error(i(479))}else t=$r(e,n,r,2),t!==null&&pu(t,e,2)}function Ms(e){var t=e.alternate;return e===V||t!==null&&t===V}function Ns(e,t){po=fo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ps(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,nt(e,n)}}var Fs={readContext:Qi,use:Mo,useCallback:yo,useContext:yo,useEffect:yo,useImperativeHandle:yo,useLayoutEffect:yo,useInsertionEffect:yo,useMemo:yo,useReducer:yo,useRef:yo,useState:yo,useDebugValue:yo,useDeferredValue:yo,useTransition:yo,useSyncExternalStore:yo,useId:yo,useHostTransitionStatus:yo,useFormState:yo,useActionState:yo,useOptimistic:yo,useMemoCache:yo,useCacheRefresh:yo};Fs.useEffectEvent=yo;var Is={readContext:Qi,use:Mo,useCallback:function(e,t){return Oo().memoizedState=[e,t===void 0?null:t],e},useContext:Qi,useEffect:cs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),os(4194308,4,ms.bind(null,t,e),n)},useLayoutEffect:function(e,t){return os(4194308,4,e,t)},useInsertionEffect:function(e,t){os(4,2,e,t)},useMemo:function(e,t){var n=Oo();t=t===void 0?null:t;var r=e();if(mo){ze(!0);try{e()}finally{ze(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Oo();if(n!==void 0){var i=n(t);if(mo){ze(!0);try{n(t)}finally{ze(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Os.bind(null,V,e),[r.memoizedState,e]},useRef:function(e){var t=Oo();return e={current:e},t.memoizedState=e},useState:function(e){e=Wo(e);var t=e.queue,n=ks.bind(null,V,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:hs,useDeferredValue:function(e,t){return vs(Oo(),e,t)},useTransition:function(){var e=Wo(!1);return e=bs.bind(null,V,e.queue,!0,!1),Oo().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=V,a=Oo();if(B){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Il===null)throw Error(i(349));Y&127||zo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,cs(Vo.bind(null,r,o,e),[e]),r.flags|=2048,is(9,{destroy:void 0},Bo.bind(null,r,o,n,t),null),n},useId:function(){var e=Oo(),t=Il.identifierPrefix;if(B){var n=wi,r=Ci;n=(r&~(1<<32-Be(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=ho++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=vo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Ts,useFormState:$o,useActionState:$o,useOptimistic:function(e){var t=Oo();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=js.bind(null,V,!0,n),n.dispatch=t,[e,t]},useMemoCache:No,useCacheRefresh:function(){return Oo().memoizedState=W.bind(null,V)},useEffectEvent:function(e){var t=Oo(),n={impl:e};return t.memoizedState=n,function(){if(q&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Ls={readContext:Qi,use:Mo,useCallback:gs,useContext:Qi,useEffect:ls,useImperativeHandle:U,useInsertionEffect:fs,useLayoutEffect:ps,useMemo:_s,useReducer:Fo,useRef:as,useState:function(){return Fo(Po)},useDebugValue:hs,useDeferredValue:function(e,t){return ys(ko(),H.memoizedState,e,t)},useTransition:function(){var e=Fo(Po)[0],t=ko().memoizedState;return[typeof e==`boolean`?e:jo(e),t]},useSyncExternalStore:Ro,useId:Es,useHostTransitionStatus:Ts,useFormState:es,useActionState:es,useOptimistic:function(e,t){return Go(ko(),H,e,t)},useMemoCache:No,useCacheRefresh:Ds};Ls.useEffectEvent=ds;var Rs={readContext:Qi,use:Mo,useCallback:gs,useContext:Qi,useEffect:ls,useImperativeHandle:U,useInsertionEffect:fs,useLayoutEffect:ps,useMemo:_s,useReducer:Lo,useRef:as,useState:function(){return Lo(Po)},useDebugValue:hs,useDeferredValue:function(e,t){var n=ko();return H===null?vs(n,e,t):ys(n,H.memoizedState,e,t)},useTransition:function(){var e=Lo(Po)[0],t=ko().memoizedState;return[typeof e==`boolean`?e:jo(e),t]},useSyncExternalStore:Ro,useId:Es,useHostTransitionStatus:Ts,useFormState:rs,useActionState:rs,useOptimistic:function(e,t){var n=ko();return H===null?(n.baseState=e,[e,n.queue.dispatch]):Go(n,H,e,t)},useMemoCache:No,useCacheRefresh:Ds};Rs.useEffectEvent=ds;function zs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:p({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Bs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=du(),i=Ba(r);i.payload=t,n!=null&&(i.callback=n),t=Va(e,i,r),t!==null&&(pu(t,e,r),Ha(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=du(),i=Ba(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Va(e,i,r),t!==null&&(pu(t,e,r),Ha(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=du(),r=Ba(n);r.tag=2,t!=null&&(r.callback=t),t=Va(e,r,n),t!==null&&(pu(t,e,n),Ha(t,e,n))}};function Vs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Cr(n,r)||!Cr(i,a):!0}function Hs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Bs.enqueueReplaceState(t,t.state,null)}function Us(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=p({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Ws(e){qr(e)}function Gs(e){console.error(e)}function Ks(e){qr(e)}function qs(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Js(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Ys(e,t,n){return n=Ba(n),n.tag=3,n.payload={element:null},n.callback=function(){qs(e,t)},n}function Xs(e){return e=Ba(e),e.tag=3,e}function Zs(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Js(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Js(t,n,r),typeof i!=`function`&&(tu===null?tu=new Set([this]):tu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Qs(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Yi(t,n,a,!0),n=eo.current,n!==null){switch(n.tag){case 31:case 13:return to===null?Tu():n.alternate===null&&Hl===0&&(Hl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Sa?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Uu(e,r,a)),!1;case 22:return n.flags|=65536,r===Sa?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Uu(e,r,a)),!1}throw Error(i(435,n.tag))}return Uu(e,r,a),Tu(),!1}if(B)return t=eo.current,t===null?(r!==Pi&&(t=Error(i(423),{cause:r}),Vi(hi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=hi(r,n),a=Ys(e.stateNode,r,a),Ua(e,a),Hl!==4&&(Hl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Pi&&(e=Error(i(422),{cause:r}),Vi(hi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=hi(o,n),Jl===null?Jl=[o]:Jl.push(o),Hl!==4&&(Hl=2),t===null)return!0;r=hi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Ys(n.stateNode,r,e),Ua(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(tu===null||!tu.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Xs(a),Zs(a,e,n,r),Ua(n,a),!1}n=n.return}while(n!==null);return!1}var $s=Error(i(461)),ec=!1;function tc(e,t,n,r){t.child=e===null?Ia(t,null,n,r):Fa(t,e.child,n,r)}function nc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Zi(t),r=xo(e,t,n,o,a,i),s=To(),e!==null&&!ec?(Eo(e,t,i),wc(e,t,i)):(B&&s&&Di(t),t.flags|=1,tc(e,t,r,i),t.child)}function rc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!oi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,ic(e,t,a,r,i)):(e=li(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Tc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Cr:n,n(o,r)&&e.ref===t.ref)return wc(e,t,i)}return t.flags|=1,e=si(a,r),e.ref=t.ref,e.return=t,t.child=e}function ic(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Cr(a,r)&&e.ref===t.ref)if(ec=!1,t.pendingProps=r=a,Tc(e,i))e.flags&131072&&(ec=!0);else return t.lanes=e.lanes,wc(e,t,i)}return dc(e,t,n,r,i)}function G(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return oc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&_a(t,a===null?null:a.cachePool),a===null?Qa():Za(t,a),io(t);else return r=t.lanes=536870912,oc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&_a(t,null),Qa(),ao(t)):(_a(t,a.cachePool),Za(t,a),ao(t),t.memoizedState=null);return tc(e,t,i,n),t.child}function ac(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function oc(e,t,n,r,i){var a=ga();return a=a===null?null:{parent:ia._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&_a(t,null),Qa(),io(t),e!==null&&Yi(e,t,r,!0),t.childLanes=i,null}function sc(e,t){return t=bc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function cc(e,t,n){return Fa(t,e.child,null,n),e=sc(t,t.pendingProps),e.flags|=2,oo(t),t.memoizedState=null,e}function lc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(B){if(r.mode===`hidden`)return e=sc(t,r),t.lanes=536870912,ac(null,e);if(ro(t),(e=ji)?(e=nf(e,Ni),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Si===null?null:{id:Ci,overflow:wi},retryLane:536870912,hydrationErrors:null},n=fi(e),n.return=t,t.child=n,Ai=t,ji=null)):e=null,e===null)throw Fi(t);return t.lanes=536870912,null}return sc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(ro(t),a)if(t.flags&256)t.flags&=-257,t=cc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(ec||Yi(e,t,n,!1),a=(n&e.childLanes)!==0,ec||a){if(r=Il,r!==null&&(s=rt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,ei(e,s),pu(r,e,s),$s;Tu(),t=cc(e,t,n)}else e=o.treeContext,ji=sf(s.nextSibling),Ai=t,B=!0,Mi=null,Ni=!1,e!==null&&ki(t,e),t=sc(t,r),t.flags|=4096;return t}return e=si(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function uc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function dc(e,t,n,r,i){return Zi(t),n=xo(e,t,n,r,void 0,i),r=To(),e!==null&&!ec?(Eo(e,t,i),wc(e,t,i)):(B&&r&&Di(t),t.flags|=1,tc(e,t,n,i),t.child)}function fc(e,t,n,r,i,a){return Zi(t),t.updateQueue=null,n=Co(t,r,n,i),So(e),r=To(),e!==null&&!ec?(Eo(e,t,a),wc(e,t,a)):(B&&r&&Di(t),t.flags|=1,tc(e,t,n,a),t.child)}function pc(e,t,n,r,i){if(Zi(t),t.stateNode===null){var a=ri,o=n.contextType;typeof o==`object`&&o&&(a=Qi(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Bs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ra(t),o=n.contextType,a.context=typeof o==`object`&&o?Qi(o):ri,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(zs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Bs.enqueueReplaceState(a,a.state,null),Ka(t,r,a,i),Ga(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Us(n,s);a.props=c;var l=a.context,u=n.contextType;o=ri,typeof u==`object`&&u&&(o=Qi(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Hs(t,a,r,o),La=!1;var f=t.memoizedState;a.state=f,Ka(t,r,a,i),Ga(),l=t.memoizedState,s||f!==l||La?(typeof d==`function`&&(zs(t,n,d,r),l=t.memoizedState),(c=La||Vs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,za(e,t),o=t.memoizedProps,u=Us(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ri,typeof l==`object`&&l&&(c=Qi(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Hs(t,a,r,c),La=!1,f=t.memoizedState,a.state=f,Ka(t,r,a,i),Ga();var p=t.memoizedState;o!==d||f!==p||La||e!==null&&e.dependencies!==null&&Xi(e.dependencies)?(typeof s==`function`&&(zs(t,n,s,r),p=t.memoizedState),(u=La||Vs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Xi(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,uc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Fa(t,e.child,null,i),t.child=Fa(t,null,n,i)):tc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=wc(e,t,i),e}function mc(e,t,n,r){return zi(),t.flags|=256,tc(e,t,n,r),t.child}var hc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function gc(e){return{baseLanes:e,cachePool:va()}}function _c(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Kl),e}function vc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(so.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(B){if(a?no(t):ao(t),(e=ji)?(e=nf(e,Ni),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Si===null?null:{id:Ci,overflow:wi},retryLane:536870912,hydrationErrors:null},n=fi(e),n.return=t,t.child=n,Ai=t,ji=null)):e=null,e===null)throw Fi(t);return af(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(ao(t),a=t.mode,c=bc({mode:`hidden`,children:c},a),r=ui(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=gc(n),r.childLanes=_c(e,s,n),t.memoizedState=hc,ac(null,r)):(no(t),yc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(no(t),t.flags&=-257,t=K(e,t,n)):t.memoizedState===null?(ao(t),c=r.fallback,a=t.mode,r=bc({mode:`visible`,children:r.children},a),c=ui(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Fa(t,e.child,null,n),r=t.child,r.memoizedState=gc(n),r.childLanes=_c(e,s,n),t.memoizedState=hc,t=ac(null,r)):(ao(t),t.child=e.child,t.flags|=128,t=null);else if(no(t),af(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Vi({value:r,source:null,stack:null}),t=K(e,t,n)}else if(ec||Yi(e,t,n,!1),s=(n&e.childLanes)!==0,ec||s){if(s=Il,s!==null&&(r=rt(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,ei(e,r),pu(s,e,r),$s;rf(c)||Tu(),t=K(e,t,n)}else rf(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,ji=sf(c.nextSibling),Ai=t,B=!0,Mi=null,Ni=!1,e!==null&&ki(t,e),t=yc(t,r.children),t.flags|=4096);return t}return a?(ao(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=si(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=ui(c,a,n,null),c.flags|=2):c=si(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,ac(null,r),r=t.child,c=e.child.memoizedState,c===null?c=gc(n):(a=c.cachePool,a===null?a=va():(l=ia._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=_c(e,s,n),t.memoizedState=hc,ac(e.child,r)):(no(t),n=e.child,e=n.sibling,n=si(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function yc(e,t){return t=bc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function bc(e,t){return e=ai(22,e,null,t),e.lanes=0,e}function K(e,t,n){return Fa(t,e.child,null,n),e=yc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function xc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),qi(e.return,t,n)}function Sc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Cc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=so.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,j(so,o),tc(e,t,r,n),r=B?yi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&xc(e,n,t);else if(e.tag===19)xc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&co(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Sc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&co(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Sc(t,!0,n,null,a,r);break;case`together`:Sc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function wc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ul|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Yi(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=si(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=si(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Tc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&Xi(e))):!0}function Ec(e,t,n){switch(t.tag){case 3:pe(t,t.stateNode.containerInfo),Gi(t,ia,e.memoizedState.cache),zi();break;case 27:case 5:he(t);break;case 4:pe(t,t.stateNode.containerInfo);break;case 10:Gi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,ro(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(no(t),e=wc(e,t,n),e===null?null:e.sibling):vc(e,t,n):(no(t),t.flags|=128,null);no(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(Yi(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Cc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),j(so,so.current),r)break;return null;case 22:return t.lanes=0,G(e,t,n,t.pendingProps);case 24:Gi(t,ia,e.memoizedState.cache)}return wc(e,t,n)}function Dc(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)ec=!0;else{if(!Tc(e,n)&&!(t.flags&128))return ec=!1,Ec(e,t,n);ec=!!(e.flags&131072)}else ec=!1,B&&t.flags&1048576&&Ei(t,yi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Ta(t.elementType),t.type=e,typeof e==`function`)oi(e)?(r=Us(e,r),t.tag=1,t=pc(null,t,e,r,n)):(t.tag=0,t=dc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===S){t.tag=11,t=nc(null,t,e,r,n);break a}else if(a===T){t.tag=14,t=rc(null,t,e,r,n);break a}}throw t=ie(e)||e,Error(i(306,t,``))}}return t;case 0:return dc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Us(r,t.pendingProps),pc(e,t,r,a,n);case 3:a:{if(pe(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,za(e,t),Ka(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Gi(t,ia,r),r!==o.cache&&Ji(t,[ia],n,!0),Ga(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=mc(e,t,r,n);break a}else if(r!==a){a=hi(Error(i(424)),t),Vi(a),t=mc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(ji=sf(e.firstChild),Ai=t,B=!0,Mi=null,Ni=!0,n=Ia(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(zi(),r===a){t=wc(e,t,n);break a}tc(e,t,r,n)}t=t.child}return t;case 26:return uc(e,t),e===null?(n=Of(t.type,null,t.pendingProps,null))?t.memoizedState=n:B||(n=t.type,e=t.pendingProps,r=zd(de.current).createElement(n),r[lt]=t,r[ut]=e,Nd(r,n,e),St(r),t.stateNode=r):t.memoizedState=Of(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return he(t),e===null&&B&&(r=t.stateNode=df(t.type,t.pendingProps,de.current),Ai=t,Ni=!0,a=ji,Xd(t.type)?(cf=a,ji=sf(r.firstChild)):ji=a),tc(e,t,t.pendingProps.children,n),uc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&B&&((a=r=ji)&&(r=ef(r,t.type,t.pendingProps,Ni),r===null?a=!1:(t.stateNode=r,Ai=t,ji=sf(r.firstChild),Ni=!1,a=!0)),a||Fi(t)),he(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Hd(a,o)?r=null:s!==null&&Hd(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=xo(e,t,wo,null,null,n),Zf._currentValue=a),uc(e,t),tc(e,t,r,n),t.child;case 6:return e===null&&B&&((e=n=ji)&&(n=tf(n,t.pendingProps,Ni),n===null?e=!1:(t.stateNode=n,Ai=t,ji=null,e=!0)),e||Fi(t)),null;case 13:return vc(e,t,n);case 4:return pe(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Fa(t,null,r,n):tc(e,t,r,n),t.child;case 11:return nc(e,t,t.type,t.pendingProps,n);case 7:return tc(e,t,t.pendingProps,n),t.child;case 8:return tc(e,t,t.pendingProps.children,n),t.child;case 12:return tc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Gi(t,t.type,r.value),tc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Zi(t),a=Qi(a),r=r(a),t.flags|=1,tc(e,t,r,n),t.child;case 14:return rc(e,t,t.type,t.pendingProps,n);case 15:return ic(e,t,t.type,t.pendingProps,n);case 19:return Cc(e,t,n);case 31:return lc(e,t,n);case 22:return G(e,t,n,t.pendingProps);case 24:return Zi(t),r=Qi(ia),e===null?(a=ga(),a===null&&(a=Il,o=aa(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Ra(t),Gi(t,ia,a)):((e.lanes&n)!==0&&(za(e,t),Ka(t,null,null,n),Ga()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Gi(t,ia,r),r!==a.cache&&Ji(t,[ia],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Gi(t,ia,r))),tc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Oc(e){e.flags|=4}function kc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(Su())e.flags|=8192;else throw Ea=Sa,ba}else e.flags&=-16777217}function Ac(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Uf(t))if(Su())e.flags|=8192;else throw Ea=Sa,ba}function jc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:Ze(),e.lanes|=t,ql|=t)}function Mc(e,t){if(!B)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Nc(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Pc(e,t,n){var r=t.pendingProps;switch(Oi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Nc(t),null;case 1:return Nc(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Ki(ia),me(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Ri(t)?Oc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Bi())),Nc(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Oc(t),o===null?(Nc(t),kc(t,a,null,r,n)):(Nc(t),Ac(t,o))):o?o===e.memoizedState?(Nc(t),t.flags&=-16777217):(Oc(t),Nc(t),Ac(t,o)):(e=e.memoizedProps,e!==r&&Oc(t),Nc(t),kc(t,a,e,r,n)),null;case 27:if(ge(t),n=de.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Oc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Nc(t),null}e=ue.current,Ri(t)?Ii(t,e):(e=df(a,r,n),t.stateNode=e,Oc(t))}return Nc(t),null;case 5:if(ge(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Oc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Nc(t),null}if(o=ue.current,Ri(t))Ii(t,o);else{var s=zd(de.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[lt]=t,o[ut]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Nd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Oc(t)}}return Nc(t),kc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Oc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=de.current,Ri(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Ai,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[lt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Ad(e.nodeValue,n)),e||Fi(t,!0)}else e=zd(e).createTextNode(r),e[lt]=t,t.stateNode=e}return Nc(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Ri(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[lt]=t}else zi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Nc(t),e=!1}else n=Bi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(oo(t),t):(oo(t),null);if(t.flags&128)throw Error(i(558))}return Nc(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Ri(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[lt]=t}else zi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Nc(t),a=!1}else a=Bi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(oo(t),t):(oo(t),null)}return oo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),jc(t,t.updateQueue),Nc(t),null);case 4:return me(),e===null&&bd(t.stateNode.containerInfo),Nc(t),null;case 10:return Ki(t.type),Nc(t),null;case 19:if(le(so),r=t.memoizedState,r===null)return Nc(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)Mc(r,!1);else{if(Hl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=co(e),o!==null){for(t.flags|=128,Mc(r,!1),e=o.updateQueue,t.updateQueue=e,jc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)ci(n,e),n=n.sibling;return j(so,so.current&1|2),B&&Ti(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&N()>$l&&(t.flags|=128,a=!0,Mc(r,!1),t.lanes=4194304)}else{if(!a)if(e=co(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,jc(t,e),Mc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!B)return Nc(t),null}else 2*N()-r.renderingStartTime>$l&&n!==536870912&&(t.flags|=128,a=!0,Mc(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(Nc(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=N(),e.sibling=null,n=so.current,j(so,a?n&1|2:n&1),B&&Ti(t,r.treeForkCount),e);case 22:case 23:return oo(t),$a(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(Nc(t),t.subtreeFlags&6&&(t.flags|=8192)):Nc(t),n=t.updateQueue,n!==null&&jc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&le(ha),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Ki(ia),Nc(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Fc(e,t){switch(Oi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ki(ia),me(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ge(t),null;case 31:if(t.memoizedState!==null){if(oo(t),t.alternate===null)throw Error(i(340));zi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(oo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));zi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return le(so),null;case 4:return me(),null;case 10:return Ki(t.type),null;case 22:case 23:return oo(t),$a(),e!==null&&le(ha),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Ki(ia),null;case 25:return null;default:return null}}function Ic(e,t){switch(Oi(t),t.tag){case 3:Ki(ia),me();break;case 26:case 27:case 5:ge(t);break;case 4:me();break;case 31:t.memoizedState!==null&&oo(t);break;case 13:oo(t);break;case 19:le(so);break;case 10:Ki(t.type);break;case 22:case 23:oo(t),$a(),e!==null&&le(ha);break;case 24:Ki(ia)}}function Lc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Rc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function zc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Ja(t,n)}catch(t){Z(e,e.return,t)}}}function Bc(e,t,n){n.props=Us(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Vc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Hc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}function Uc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Wc(e,t,n){try{var r=e.stateNode;Pd(r,e.type,n,t),r[ut]=t}catch(t){Z(e,e.return,t)}}function Gc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Xd(e.type)||e.tag===4}function Kc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Gc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Xd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function qc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=tn));else if(r!==4&&(r===27&&Xd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(qc(e,t,n),e=e.sibling;e!==null;)qc(e,t,n),e=e.sibling}function Jc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Xd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Jc(e,t,n),e=e.sibling;e!==null;)Jc(e,t,n),e=e.sibling}function Yc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Nd(t,r,n),t[lt]=e,t[ut]=n}catch(t){Z(e,e.return,t)}}var Xc=!1,Zc=!1,Qc=!1,$c=typeof WeakSet==`function`?WeakSet:Set,el=null;function tl(e,t){if(e=e.containerInfo,Ld=op,e=Er(e),Dr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(Rd={focusedElem:e,selectionRange:n},op=!1,el=t;el!==null;)if(t=el,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,el=e;else for(;el!==null;){switch(t=el,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Us(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)$d(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:$d(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,el=e;break}el=t.return}}function nl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:_l(e,n),r&4&&Lc(5,n);break;case 1:if(_l(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Us(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}r&64&&zc(n),r&512&&Vc(n,n.return);break;case 3:if(_l(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Ja(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Yc(n);case 26:case 5:_l(e,n),t===null&&r&4&&Uc(n),r&512&&Vc(n,n.return);break;case 12:_l(e,n);break;case 31:_l(e,n),r&4&&cl(e,n);break;case 13:_l(e,n),r&4&&ll(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ku.bind(null,n),of(e,n))));break;case 22:if(r=n.memoizedState!==null||Xc,!r){t=t!==null&&t.memoizedState!==null||Zc,i=Xc;var a=Zc;Xc=r,(Zc=t)&&!a?yl(e,n,(n.subtreeFlags&8772)!=0):_l(e,n),Xc=i,Zc=a}break;case 30:break;default:_l(e,n)}}function rl(e){var t=e.alternate;t!==null&&(e.alternate=null,rl(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&_t(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var il=null,al=!1;function ol(e,t,n){for(n=n.child;n!==null;)sl(e,t,n),n=n.sibling}function sl(e,t,n){if(Re&&typeof Re.onCommitFiberUnmount==`function`)try{Re.onCommitFiberUnmount(Le,n)}catch{}switch(n.tag){case 26:Zc||Hc(n,t),ol(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Zc||Hc(n,t);var r=il,i=al;Xd(n.type)&&(il=n.stateNode,al=!1),ol(e,t,n),ff(n.stateNode),il=r,al=i;break;case 5:Zc||Hc(n,t);case 6:if(r=il,i=al,il=null,ol(e,t,n),il=r,al=i,il!==null)if(al)try{(il.nodeType===9?il.body:il.nodeName===`HTML`?il.ownerDocument.body:il).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{il.removeChild(n.stateNode)}catch(e){Z(n,t,e)}break;case 18:il!==null&&(al?(e=il,Zd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Zd(il,n.stateNode));break;case 4:r=il,i=al,il=n.stateNode.containerInfo,al=!0,ol(e,t,n),il=r,al=i;break;case 0:case 11:case 14:case 15:Rc(2,n,t),Zc||Rc(4,n,t),ol(e,t,n);break;case 1:Zc||(Hc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Bc(n,t,r)),ol(e,t,n);break;case 21:ol(e,t,n);break;case 22:Zc=(r=Zc)||n.memoizedState!==null,ol(e,t,n),Zc=r;break;default:ol(e,t,n)}}function cl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function ll(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function ul(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new $c),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new $c),t;default:throw Error(i(435,e.tag))}}function dl(e,t){var n=ul(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=qu.bind(null,e,t);t.then(r,r)}})}function fl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Xd(c.type)){il=c.stateNode,al=!1;break a}break;case 5:il=c.stateNode,al=!1;break a;case 3:case 4:il=c.stateNode.containerInfo,al=!0;break a}c=c.return}if(il===null)throw Error(i(160));sl(o,s,a),il=null,al=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)ml(t,e),t=t.sibling}var pl=null;function ml(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:fl(t,e),hl(e),r&4&&(Rc(3,e,e.return),Lc(3,e),Rc(5,e,e.return));break;case 1:fl(t,e),hl(e),r&512&&(Zc||n===null||Hc(n,n.return)),r&64&&Xc&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=pl;if(fl(t,e),hl(e),r&512&&(Zc||n===null||Hc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[gt]||o[lt]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Nd(o,r,n),o[lt]=e,St(o),r=o;break a;case`link`:var s=Bf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Nd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Bf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Nd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[lt]=e,St(o),r=o}e.stateNode=r}else Vf(a,e.type,e.stateNode);else e.stateNode=Ff(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&Wc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Vf(a,e.type,e.stateNode):Ff(a,r,e.memoizedProps))}break;case 27:fl(t,e),hl(e),r&512&&(Zc||n===null||Hc(n,n.return)),n!==null&&r&4&&Wc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(fl(t,e),hl(e),r&512&&(Zc||n===null||Hc(n,n.return)),e.flags&32){a=e.stateNode;try{Jt(a,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Wc(e,a,n===null?a:n.memoizedProps)),r&1024&&(Qc=!0);break;case 6:if(fl(t,e),hl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(zf=null,a=pl,pl=hf(t.containerInfo),fl(t,e),pl=a,hl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}Qc&&(Qc=!1,gl(e));break;case 4:r=pl,pl=hf(e.stateNode.containerInfo),fl(t,e),hl(e),pl=r;break;case 12:fl(t,e),hl(e);break;case 31:fl(t,e),hl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,dl(e,r)));break;case 13:fl(t,e),hl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Zl=N()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,dl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=Xc,d=Zc;if(Xc=u||a,Zc=d||l,fl(t,e),Zc=d,Xc=u,hl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Xc||Zc||vl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?Qd(m,!0):Qd(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,dl(e,n))));break;case 19:fl(t,e),hl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,dl(e,r)));break;case 30:break;case 21:break;default:fl(t,e),hl(e)}}function hl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Gc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Jc(e,Kc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Jt(o,``),n.flags&=-33),Jc(e,Kc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;qc(e,Kc(e),s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function gl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;gl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function _l(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)nl(e,t.alternate,t),t=t.sibling}function vl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Rc(4,t,t.return),vl(t);break;case 1:Hc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Bc(t,t.return,n),vl(t);break;case 27:ff(t.stateNode);case 26:case 5:Hc(t,t.return),vl(t);break;case 22:t.memoizedState===null&&vl(t);break;case 30:vl(t);break;default:vl(t)}e=e.sibling}}function yl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:yl(i,a,n),Lc(4,a);break;case 1:if(yl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)qa(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&zc(a),Vc(a,a.return);break;case 27:Yc(a);case 26:case 5:yl(i,a,n),n&&r===null&&o&4&&Uc(a),Vc(a,a.return);break;case 12:yl(i,a,n);break;case 31:yl(i,a,n),n&&o&4&&cl(i,a);break;case 13:yl(i,a,n),n&&o&4&&ll(i,a);break;case 22:a.memoizedState===null&&yl(i,a,n),Vc(a,a.return);break;case 30:break;default:yl(i,a,n)}t=t.sibling}}function bl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&oa(n))}function xl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&oa(e))}function Sl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Cl(e,t,n,r),t=t.sibling}function Cl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Sl(e,t,n,r),i&2048&&Lc(9,t);break;case 1:Sl(e,t,n,r);break;case 3:Sl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&oa(e)));break;case 12:if(i&2048){Sl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Sl(e,t,n,r);break;case 31:Sl(e,t,n,r);break;case 13:Sl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Sl(e,t,n,r):(a._visibility|=2,wl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?Sl(e,t,n,r):Tl(e,t),i&2048&&bl(o,t);break;case 24:Sl(e,t,n,r),i&2048&&xl(t.alternate,t);break;default:Sl(e,t,n,r)}}function wl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:wl(a,o,s,c,i),Lc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,wl(a,o,s,c,i)):u._visibility&2?wl(a,o,s,c,i):Tl(a,o),i&&l&2048&&bl(o.alternate,o);break;case 24:wl(a,o,s,c,i),i&&l&2048&&xl(o.alternate,o);break;default:wl(a,o,s,c,i)}t=t.sibling}}function Tl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Tl(n,r),i&2048&&bl(r.alternate,r);break;case 24:Tl(n,r),i&2048&&xl(r.alternate,r);break;default:Tl(n,r)}t=t.sibling}}var El=8192;function Dl(e,t,n){if(e.subtreeFlags&El)for(e=e.child;e!==null;)Ol(e,t,n),e=e.sibling}function Ol(e,t,n){switch(e.tag){case 26:Dl(e,t,n),e.flags&El&&e.memoizedState!==null&&Wf(n,pl,e.memoizedState,e.memoizedProps);break;case 5:Dl(e,t,n);break;case 3:case 4:var r=pl;pl=hf(e.stateNode.containerInfo),Dl(e,t,n),pl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=El,El=16777216,Dl(e,t,n),El=r):Dl(e,t,n));break;default:Dl(e,t,n)}}function kl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Al(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];el=r,Nl(r,e)}kl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)jl(e),e=e.sibling}function jl(e){switch(e.tag){case 0:case 11:case 15:Al(e),e.flags&2048&&Rc(9,e,e.return);break;case 3:Al(e);break;case 12:Al(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ml(e)):Al(e);break;default:Al(e)}}function Ml(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];el=r,Nl(r,e)}kl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Rc(8,t,t.return),Ml(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ml(t));break;default:Ml(t)}e=e.sibling}}function Nl(e,t){for(;el!==null;){var n=el;switch(n.tag){case 0:case 11:case 15:Rc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:oa(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,el=r;else a:for(n=e;el!==null;){r=el;var i=r.sibling,a=r.return;if(rl(r),r===n){el=null;break a}if(i!==null){i.return=a,el=i;break a}el=a}}}var Pl={getCacheForType:function(e){var t=Qi(ia),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Qi(ia).controller.signal}},Fl=typeof WeakMap==`function`?WeakMap:Map,q=0,Il=null,J=null,Y=0,X=0,Ll=null,Rl=!1,zl=!1,Bl=!1,Vl=0,Hl=0,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=null,Yl=null,Xl=!1,Zl=0,Ql=0,$l=1/0,eu=null,tu=null,nu=0,ru=null,iu=null,au=0,ou=0,su=null,cu=null,lu=0,uu=null;function du(){return q&2&&Y!==0?Y&-Y:O.T===null?ot():ld()}function fu(){if(Kl===0)if(!(Y&536870912)||B){var e=Ge;Ge<<=1,!(Ge&3932160)&&(Ge=262144),Kl=e}else Kl=536870912;return e=eo.current,e!==null&&(e.flags|=32),Kl}function pu(e,t,n){(e===Il&&(X===2||X===9)||e.cancelPendingCommit!==null)&&(bu(e,0),_u(e,Y,Kl,!1)),$e(e,n),(!(q&2)||e!==Il)&&(e===Il&&(!(q&2)&&(Wl|=n),Hl===4&&_u(e,Y,Kl,!1)),td(e))}function mu(e,t,n){if(q&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||Ye(e,t),a=r?Ou(e,t):Eu(e,t,!0),o=r;do{if(a===0){zl&&!r&&_u(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!gu(n)){a=Eu(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Jl;var l=c.current.memoizedState.isDehydrated;if(l&&(bu(c,s).flags|=256),s=Eu(c,s,!1),s!==2){if(Bl&&!l){c.errorRecoveryDisabledLanes|=o,Wl|=o,a=4;break a}o=Yl,Yl=a,o!==null&&(Yl===null?Yl=o:Yl.push.apply(Yl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){bu(e,0),_u(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:_u(r,t,Kl,!Rl);break a;case 2:Yl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=Zl+300-N(),10<a)){if(_u(r,t,Kl,!Rl),Je(r,0,!0)!==0)break a;au=t,r.timeoutHandle=Gd(hu.bind(null,r,n,Yl,eu,Xl,t,Kl,Wl,ql,Rl,o,`Throttled`,-0,0),a);break a}hu(r,n,Yl,eu,Xl,t,Kl,Wl,ql,Rl,o,null,-0,0)}}break}while(1);td(e)}function hu(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:tn},Ol(t,a,d);var m=(a&62914560)===a?Zl-N():(a&4194048)===a?Ql-N():0;if(m=Kf(d,m),m!==null){au=a,e.cancelPendingCommit=m(Fu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),_u(e,a,o,!l);return}}Fu(e,t,a,n,r,i,o,s,c)}function gu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Sr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function _u(e,t,n,r){t&=~Gl,t&=~Wl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Be(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&tt(e,n,t)}function vu(){return q&6?!0:(nd(0,!1),!1)}function yu(){if(J!==null){if(X===0)var e=J.return;else e=J,Wi=Ui=null,Do(e),ka=null,Aa=0,e=J;for(;e!==null;)Ic(e.alternate,e),e=e.return;J=null}}function bu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,Kd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),au=0,yu(),Il=e,J=n=si(e.current,null),Y=t,X=0,Ll=null,Rl=!1,zl=Ye(e,t),Bl=!1,ql=Kl=Gl=Wl=Ul=Hl=0,Yl=Jl=null,Xl=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Be(r),a=1<<i;t|=e[i],r&=~a}return Vl=t,Zr(),n}function xu(e,t){V=null,O.H=Fs,t===ya||t===xa?(t=Da(),X=3):t===ba?(t=Da(),X=4):X=t===$s?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Ll=t,J===null&&(Hl=1,qs(e,hi(t,e.current)))}function Su(){var e=eo.current;return e===null?!0:(Y&4194048)===Y?to===null:(Y&62914560)===Y||Y&536870912?e===to:!1}function Cu(){var e=O.H;return O.H=Fs,e===null?Fs:e}function wu(){var e=O.A;return O.A=Pl,e}function Tu(){Hl=4,Rl||(Y&4194048)!==Y&&eo.current!==null||(zl=!0),!(Ul&134217727)&&!(Wl&134217727)||Il===null||_u(Il,Y,Kl,!1)}function Eu(e,t,n){var r=q;q|=2;var i=Cu(),a=wu();(Il!==e||Y!==t)&&(eu=null,bu(e,t)),t=!1;var o=Hl;a:do try{if(X!==0&&J!==null){var s=J,c=Ll;switch(X){case 8:yu(),o=6;break a;case 3:case 2:case 9:case 6:eo.current===null&&(t=!0);var l=X;if(X=0,Ll=null,Mu(e,s,c,l),n&&zl){o=0;break a}break;default:l=X,X=0,Ll=null,Mu(e,s,c,l)}}Du(),o=Hl;break}catch(t){xu(e,t)}while(1);return t&&e.shellSuspendCounter++,Wi=Ui=null,q=r,O.H=i,O.A=a,J===null&&(Il=null,Y=0,Zr()),o}function Du(){for(;J!==null;)Au(J)}function Ou(e,t){var n=q;q|=2;var r=Cu(),a=wu();Il!==e||Y!==t?(eu=null,$l=N()+500,bu(e,t)):zl=Ye(e,t);a:do try{if(X!==0&&J!==null){t=J;var o=Ll;b:switch(X){case 1:X=0,Ll=null,Mu(e,t,o,1);break;case 2:case 9:if(Ca(o)){X=0,Ll=null,ju(t);break}t=function(){X!==2&&X!==9||Il!==e||(X=7),td(e)},o.then(t,t);break a;case 3:X=7;break a;case 4:X=5;break a;case 7:Ca(o)?(X=0,Ll=null,ju(t)):(X=0,Ll=null,Mu(e,t,o,7));break;case 5:var s=null;switch(J.tag){case 26:s=J.memoizedState;case 5:case 27:var c=J;if(s?Uf(s):c.stateNode.complete){X=0,Ll=null;var l=c.sibling;if(l!==null)J=l;else{var u=c.return;u===null?J=null:(J=u,Nu(u))}break b}}X=0,Ll=null,Mu(e,t,o,5);break;case 6:X=0,Ll=null,Mu(e,t,o,6);break;case 8:yu(),Hl=6;break a;default:throw Error(i(462))}}ku();break}catch(t){xu(e,t)}while(1);return Wi=Ui=null,O.H=r,O.A=a,q=n,J===null?(Il=null,Y=0,Zr(),Hl):0}function ku(){for(;J!==null&&!De();)Au(J)}function Au(e){var t=Dc(e.alternate,e,Vl);e.memoizedProps=e.pendingProps,t===null?Nu(e):J=t}function ju(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=fc(n,t,t.pendingProps,t.type,void 0,Y);break;case 11:t=fc(n,t,t.pendingProps,t.type.render,t.ref,Y);break;case 5:Do(t);default:Ic(n,t),t=J=ci(t,Vl),t=Dc(n,t,Vl)}e.memoizedProps=e.pendingProps,t===null?Nu(e):J=t}function Mu(e,t,n,r){Wi=Ui=null,Do(t),ka=null,Aa=0;var i=t.return;try{if(Qs(e,i,t,n,Y)){Hl=1,qs(e,hi(n,e.current)),J=null;return}}catch(t){if(i!==null)throw J=i,t;Hl=1,qs(e,hi(n,e.current)),J=null;return}t.flags&32768?(B||r===1?e=!0:zl||Y&536870912?e=!1:(Rl=e=!0,(r===2||r===9||r===3||r===6)&&(r=eo.current,r!==null&&r.tag===13&&(r.flags|=16384))),Pu(t,e)):Nu(t)}function Nu(e){var t=e;do{if(t.flags&32768){Pu(t,Rl);return}e=t.return;var n=Pc(t.alternate,t,Vl);if(n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);Hl===0&&(Hl=5)}function Pu(e,t){do{var n=Fc(e.alternate,e);if(n!==null){n.flags&=32767,J=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){J=e;return}J=e=n}while(e!==null);Hl=6,J=null}function Fu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Bu();while(nu!==0);if(q&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=Xr,et(e,n,o,s,c,l),e===Il&&(J=Il=null,Y=0),iu=t,ru=e,au=n,ou=o,su=a,cu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Ju(Me,function(){return Vu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=O.T,O.T=null,a=k.p,k.p=2,s=q,q|=4;try{tl(e,t,n)}finally{q=s,k.p=a,O.T=r}}nu=1,Iu(),Lu(),Ru()}}function Iu(){if(nu===1){nu=0;var e=ru,t=iu,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=O.T,O.T=null;var r=k.p;k.p=2;var i=q;q|=4;try{ml(t,e);var a=Rd,o=Er(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&L(s.ownerDocument.documentElement,s)){if(c!==null&&Dr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Tr(s,h),v=Tr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}op=!!Ld,Rd=Ld=null}finally{q=i,k.p=r,O.T=n}}e.current=t,nu=2}}function Lu(){if(nu===2){nu=0;var e=ru,t=iu,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=O.T,O.T=null;var r=k.p;k.p=2;var i=q;q|=4;try{nl(e,t.alternate,t)}finally{q=i,k.p=r,O.T=n}}nu=3}}function Ru(){if(nu===4||nu===3){nu=0,Oe();var e=ru,t=iu,n=au,r=cu;t.subtreeFlags&10256||t.flags&10256?nu=5:(nu=0,iu=ru=null,zu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(tu=null),at(n),t=t.stateNode,Re&&typeof Re.onCommitFiberRoot==`function`)try{Re.onCommitFiberRoot(Le,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=O.T,i=k.p,k.p=2,O.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{O.T=t,k.p=i}}au&3&&Bu(),td(e),i=e.pendingLanes,n&261930&&i&42?e===uu?lu++:(lu=0,uu=e):lu=0,nd(0,!1)}}function zu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,oa(t)))}function Bu(){return Iu(),Lu(),Ru(),Vu()}function Vu(){if(nu!==5)return!1;var e=ru,t=ou;ou=0;var n=at(au),r=O.T,a=k.p;try{k.p=32>n?32:n,O.T=null,n=su,su=null;var o=ru,s=au;if(nu=0,iu=ru=null,au=0,q&6)throw Error(i(331));var c=q;if(q|=4,jl(o.current),Cl(o,o.current,s,n),q=c,nd(0,!1),Re&&typeof Re.onPostCommitFiberRoot==`function`)try{Re.onPostCommitFiberRoot(Le,o)}catch{}return!0}finally{k.p=a,O.T=r,zu(e,t)}}function Hu(e,t,n){t=hi(n,t),t=Ys(e.stateNode,t,2),e=Va(e,t,2),e!==null&&($e(e,2),td(e))}function Z(e,t,n){if(e.tag===3)Hu(e,e,n);else for(;t!==null;){if(t.tag===3){Hu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(tu===null||!tu.has(r))){e=hi(n,e),n=Xs(2),r=Va(t,n,2),r!==null&&(Zs(n,r,t,e),$e(r,2),td(r));break}}t=t.return}}function Uu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Fl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Bl=!0,i.add(n),e=Wu.bind(null,e,t,n),t.then(e,e))}function Wu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Il===e&&(Y&n)===n&&(Hl===4||Hl===3&&(Y&62914560)===Y&&300>N()-Zl?!(q&2)&&bu(e,0):Gl|=n,ql===Y&&(ql=0)),td(e)}function Gu(e,t){t===0&&(t=Ze()),e=ei(e,t),e!==null&&($e(e,t),td(e))}function Ku(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Gu(e,n)}function qu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),Gu(e,n)}function Ju(e,t){return Te(e,t)}var Yu=null,Xu=null,Zu=!1,Qu=!1,$u=!1,ed=0;function td(e){e!==Xu&&e.next===null&&(Xu===null?Yu=Xu=e:Xu=Xu.next=e),Qu=!0,Zu||(Zu=!0,cd())}function nd(e,t){if(!$u&&Qu){$u=!0;do for(var n=!1,r=Yu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Be(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,sd(r,a))}else a=Y,a=Je(r,r===Il?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||Ye(r,a)||(n=!0,sd(r,a));r=r.next}while(n);$u=!1}}function rd(){id()}function id(){Qu=Zu=!1;var e=0;ed!==0&&Wd()&&(e=ed);for(var t=N(),n=null,r=Yu;r!==null;){var i=r.next,a=ad(r,t);a===0?(r.next=null,n===null?Yu=i:n.next=i,i===null&&(Xu=n)):(n=r,(e!==0||a&3)&&(Qu=!0)),r=i}nu!==0&&nu!==5||nd(e,!1),ed!==0&&(ed=0)}function ad(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Be(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=Xe(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Il,n=Y,n=Je(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(X===2||X===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Ee(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Ye(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Ee(r),at(n)){case 2:case 8:n=je;break;case 32:n=Me;break;case 268435456:n=Pe;break;default:n=Me}return r=od.bind(null,e),n=Te(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Ee(r),e.callbackPriority=2,e.callbackNode=null,2}function od(e,t){if(nu!==0&&nu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Bu()&&e.callbackNode!==n)return null;var r=Y;return r=Je(e,e===Il?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(mu(e,r,t),ad(e,N()),e.callbackNode!=null&&e.callbackNode===n?od.bind(null,e):null)}function sd(e,t){if(Bu())return null;mu(e,t,!0)}function cd(){Jd(function(){q&6?Te(Ae,rd):id()})}function ld(){if(ed===0){var e=la;e===0&&(e=We,We<<=1,!(We&261888)&&(We=256)),ed=e}return ed}function ud(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:en(``+e)}function dd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function fd(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=ud((i[ut]||null).action),o=r.submitter;o&&(t=(t=o[ut]||null)?ud(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Sn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(ed!==0){var e=o?dd(i,o):new FormData(i);Ss(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?dd(i,o):new FormData(i),Ss(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var pd=0;pd<R.length;pd++){var md=R[pd];z(md.toLowerCase(),`on`+(md[0].toUpperCase()+md.slice(1)))}z(zr,`onAnimationEnd`),z(Br,`onAnimationIteration`),z(Vr,`onAnimationStart`),z(`dblclick`,`onDoubleClick`),z(`focusin`,`onFocus`),z(`focusout`,`onBlur`),z(Hr,`onTransitionRun`),z(Ur,`onTransitionStart`),z(Wr,`onTransitionCancel`),z(Gr,`onTransitionEnd`),Et(`onMouseEnter`,[`mouseout`,`mouseover`]),Et(`onMouseLeave`,[`mouseout`,`mouseover`]),Et(`onPointerEnter`,[`pointerout`,`pointerover`]),Et(`onPointerLeave`,[`pointerout`,`pointerover`]),Tt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Tt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Tt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Tt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Tt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Tt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var hd=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),gd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(hd));function _d(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){qr(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){qr(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[ft];n===void 0&&(n=t[ft]=new Set);var r=e+`__bubble`;n.has(r)||(xd(t,e,2,!1),n.add(r))}function vd(e,t,n){var r=0;t&&(r|=4),xd(n,e,r,t)}var yd=`_reactListening`+Math.random().toString(36).slice(2);function bd(e){if(!e[yd]){e[yd]=!0,Ct.forEach(function(t){t!==`selectionchange`&&(gd.has(t)||vd(t,!1,e),vd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[yd]||(t[yd]=!0,vd(`selectionchange`,!1,t))}}function xd(e,t,n,r){switch(pp(t)){case 2:var i=sp;break;case 8:i=cp;break;default:i=lp}n=i.bind(null,t,n,e),i=void 0,!fn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Sd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=vt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}ln(function(){var r=a,i=rn(n),s=[];a:{var c=Kr.get(e);if(c!==void 0){var l=Sn,u=e;switch(e){case`keypress`:if(vn(n)===0)break a;case`keydown`:case`keyup`:l=Bn;break;case`focusin`:u=`focus`,l=jn;break;case`focusout`:u=`blur`,l=jn;break;case`beforeblur`:case`afterblur`:l=jn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=kn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=An;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Hn;break;case zr:case Br:case Vr:l=Mn;break;case Gr:l=Un;break;case`scroll`:case`scrollend`:l=wn;break;case`wheel`:l=Wn;break;case`copy`:case`cut`:case`paste`:l=Nn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Vn;break;case`toggle`:case`beforetoggle`:l=Gn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=un(m,p),g!=null&&d.push(Cd(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==nn&&(u=n.relatedTarget||n.fromElement)&&(vt(u)||u[dt]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?vt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=kn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Vn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:bt(l),h=u==null?c:bt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,vt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Td,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Ed(s,c,l,d,!1),u!==null&&f!==null&&Ed(s,f,u,d,!0)}}a:{if(c=r?bt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=ur;else if(ar(c))if(dr)v=br;else{v=vr;var y=_r}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&Zt(r.elementType)&&(v=ur):v=yr;if(v&&=v(e,r)){or(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Wt(c,`number`,c.value)}switch(y=r?bt(r):window,e){case`focusin`:(ar(y)||y.contentEditable===`true`)&&(kr=y,Ar=r,jr=null);break;case`focusout`:jr=Ar=kr=null;break;case`mousedown`:Mr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Mr=!1,Nr(s,n,i);break;case`selectionchange`:if(Or)break;case`keydown`:case`keyup`:Nr(s,n,i)}var b;if(qn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else tr?$n(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(Xn&&n.locale!==`ko`&&(tr||x!==`onCompositionStart`?x===`onCompositionEnd`&&tr&&(b=_n()):(mn=i,hn=`value`in mn?mn.value:mn.textContent,tr=!0)),y=wd(r,x),0<y.length&&(x=new Pn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=er(n),b!==null&&(x.data=b)))),(b=Yn?nr(e,n):rr(e,n))&&(x=wd(r,`onBeforeInput`),0<x.length&&(y=new Pn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),fd(s,e,r,n,i)}_d(s,t)})}function Cd(e,t,n){return{instance:e,listener:t,currentTarget:n}}function wd(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=un(e,n),i!=null&&r.unshift(Cd(e,i,a)),i=un(e,t),i!=null&&r.push(Cd(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Td(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Ed(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=un(n,a),l!=null&&o.unshift(Cd(n,l,c))):i||(l=un(n,a),l!=null&&o.push(Cd(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Dd=/\r\n?/g,Od=/\u0000|\uFFFD/g;function kd(e){return(typeof e==`string`?e:``+e).replace(Dd,`
`).replace(Od,``)}function Ad(e,t){return t=kd(t),kd(e)===t}function jd(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Jt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Jt(e,``+r);break;case`className`:Mt(e,`class`,r);break;case`tabIndex`:Mt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Mt(e,n,r);break;case`style`:Xt(e,r,o);break;case`data`:if(t!==`object`){Mt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=en(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&jd(e,t,`name`,a.name,a,null),jd(e,t,`formEncType`,a.formEncType,a,null),jd(e,t,`formMethod`,a.formMethod,a,null),jd(e,t,`formTarget`,a.formTarget,a,null)):(jd(e,t,`encType`,a.encType,a,null),jd(e,t,`method`,a.method,a,null),jd(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=en(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=tn);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=en(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),jt(e,`popover`,r);break;case`xlinkActuate`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Nt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Nt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Nt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:jt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=Qt.get(n)||n,jt(e,n,r))}}function Md(e,t,n,r,a,o){switch(n){case`style`:Xt(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Jt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Jt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=tn);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!wt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[ut]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):jt(e,n,r)}}}function Nd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:jd(e,t,o,s,n,null)}}a&&jd(e,t,`srcSet`,n.srcSet,n,null),r&&jd(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:jd(e,t,r,d,n,null)}}Ut(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:jd(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Gt(e,!!r,n,!0):Gt(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:jd(e,t,s,c,n,null)}qt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:jd(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<hd.length;r++)Q(hd[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:jd(e,t,u,r,n,null)}return;default:if(Zt(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Md(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&jd(e,t,c,r,n,null))}function Pd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||jd(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&jd(e,t,p,m,r,f)}}Ht(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||jd(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&jd(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Gt(e,!!n,n?[]:``,!1):Gt(e,!!n,t,!0)):Gt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:jd(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&jd(e,t,s,a,r,o)}Kt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:jd(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:jd(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&jd(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:jd(e,t,u,p,r,m)}return;default:if(Zt(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Md(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Md(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&jd(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||jd(e,t,f,p,r,m)}function Fd(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Id(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Fd(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Fd(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Ld=null,Rd=null;function zd(e){return e.nodeType===9?e:e.ownerDocument}function Bd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Vd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Hd(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ud=null;function Wd(){var e=window.event;return e&&e.type===`popstate`?e===Ud?!1:(Ud=e,!0):(Ud=null,!1)}var Gd=typeof setTimeout==`function`?setTimeout:void 0,Kd=typeof clearTimeout==`function`?clearTimeout:void 0,qd=typeof Promise==`function`?Promise:void 0,Jd=typeof queueMicrotask==`function`?queueMicrotask:qd===void 0?Gd:function(e){return qd.resolve(null).then(e).catch(Yd)};function Yd(e){setTimeout(function(){throw e})}function Xd(e){return e===`head`}function Zd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)ff(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,ff(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[gt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&ff(e.ownerDocument.body);n=i}while(n);Np(t)}function Qd(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function $d(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:$d(n),_t(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function ef(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[gt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=sf(e.nextSibling),e===null)break}return null}function tf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=sf(e.nextSibling),e===null))return null;return e}function nf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=sf(e.nextSibling),e===null))return null;return e}function rf(e){return e.data===`$?`||e.data===`$~`}function af(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function of(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function sf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var cf=null;function lf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return sf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function uf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function df(e,t,n){switch(t=zd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function ff(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);_t(e)}var pf=new Map,mf=new Set;function hf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var gf=k.d;k.d={f:_f,r:vf,D:xf,C:Sf,L:Cf,m:wf,X:Ef,S:Tf,M:Df};function _f(){var e=gf.f(),t=vu();return e||t}function vf(e){var t=yt(e);t!==null&&t.tag===5&&t.type===`form`?ws(t):gf.r(e)}var yf=typeof document>`u`?null:document;function bf(e,t,n){var r=yf;if(r&&typeof t==`string`&&t){var i=Vt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),mf.has(i)||(mf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Nd(t,`link`,e),St(t),r.head.appendChild(t)))}}function xf(e){gf.D(e),bf(`dns-prefetch`,e,null)}function Sf(e,t){gf.C(e,t),bf(`preconnect`,e,t)}function Cf(e,t,n){gf.L(e,t,n);var r=yf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Vt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Vt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Vt(n.imageSizes)+`"]`)):i+=`[href="`+Vt(e)+`"]`;var a=i;switch(t){case`style`:a=kf(e);break;case`script`:a=Nf(e)}pf.has(a)||(e=p({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),pf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Af(a))||t===`script`&&r.querySelector(Pf(a))||(t=r.createElement(`link`),Nd(t,`link`,e),St(t),r.head.appendChild(t)))}}function wf(e,t){gf.m(e,t);var n=yf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Vt(r)+`"][href="`+Vt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Nf(e)}if(!pf.has(a)&&(e=p({rel:`modulepreload`,href:e},t),pf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Pf(a)))return}r=n.createElement(`link`),Nd(r,`link`,e),St(r),n.head.appendChild(r)}}}function Tf(e,t,n){gf.S(e,t,n);var r=yf;if(r&&e){var i=xt(r).hoistableStyles,a=kf(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Af(a)))s.loading=5;else{e=p({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=pf.get(a))&&Lf(e,n);var c=o=r.createElement(`link`);St(c),Nd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,If(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Ef(e,t){gf.X(e,t);var n=yf;if(n&&e){var r=xt(n).hoistableScripts,i=Nf(e),a=r.get(i);a||(a=n.querySelector(Pf(i)),a||(e=p({src:e,async:!0},t),(t=pf.get(i))&&Rf(e,t),a=n.createElement(`script`),St(a),Nd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Df(e,t){gf.M(e,t);var n=yf;if(n&&e){var r=xt(n).hoistableScripts,i=Nf(e),a=r.get(i);a||(a=n.querySelector(Pf(i)),a||(e=p({src:e,async:!0,type:`module`},t),(t=pf.get(i))&&Rf(e,t),a=n.createElement(`script`),St(a),Nd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t,n,r){var a=(a=de.current)?hf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=kf(n.href),n=xt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=kf(n.href);var o=xt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Af(e)))&&!o._p&&(s.instance=o,s.state.loading=5),pf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},pf.set(e,n),o||Mf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Nf(n),n=xt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function kf(e){return`href="`+Vt(e)+`"`}function Af(e){return`link[rel="stylesheet"][`+e+`]`}function jf(e){return p({},e,{"data-precedence":e.precedence,precedence:null})}function Mf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Nd(t,`link`,n),St(t),e.head.appendChild(t))}function Nf(e){return`[src="`+Vt(e)+`"]`}function Pf(e){return`script[async]`+e}function Ff(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Vt(n.href)+`"]`);if(r)return t.instance=r,St(r),r;var a=p({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),St(r),Nd(r,`style`,a),If(r,n.precedence,e),t.instance=r;case`stylesheet`:a=kf(n.href);var o=e.querySelector(Af(a));if(o)return t.state.loading|=4,t.instance=o,St(o),o;r=jf(n),(a=pf.get(a))&&Lf(r,a),o=(e.ownerDocument||e).createElement(`link`),St(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Nd(o,`link`,r),t.state.loading|=4,If(o,n.precedence,e),t.instance=o;case`script`:return o=Nf(n.src),(a=e.querySelector(Pf(o)))?(t.instance=a,St(a),a):(r=n,(a=pf.get(o))&&(r=p({},n),Rf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),St(a),Nd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,If(r,n.precedence,e));return t.instance}function If(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Lf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var zf=null;function Bf(e,t,n){if(zf===null){var r=new Map,i=zf=new Map;i.set(n,r)}else i=zf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[gt]||a[lt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Vf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Hf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Uf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Wf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=kf(r.href),a=t.querySelector(Af(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=qf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,St(a);return}a=t.ownerDocument||t,r=jf(r),(i=pf.get(i))&&Lf(r,i),a=a.createElement(`link`),St(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Nd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=qf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Gf=0;function Kf(e,t){return e.stylesheets&&e.count===0&&Yf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Yf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Gf===0&&(Gf=62500*Id());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Yf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Gf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function qf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Yf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Jf=null;function Yf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Jf=new Map,t.forEach(Xf,e),Jf=null,qf.call(e))}function Xf(e,t){if(!(t.state.loading&4)){var n=Jf.get(e);if(n)var r=n.get(null);else{n=new Map,Jf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=qf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Zf={$$typeof:x,Provider:null,Consumer:null,_currentValue:oe,_currentValue2:oe,_threadCount:0};function Qf(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Qe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Qe(0),this.hiddenUpdates=Qe(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function $f(e,t,n,r,i,a,o,s,c,l,u,d){return e=new Qf(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=ai(3,null,null,t),e.current=a,a.stateNode=e,t=aa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ra(a),e}function ep(e){return e?(e=ri,e):ri}function tp(e,t,n,r,i,a){i=ep(i),r.context===null?r.context=i:r.pendingContext=i,r=Ba(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Va(e,r,t),n!==null&&(pu(n,e,t),Ha(n,e,t))}function np(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function rp(e,t){np(e,t),(e=e.alternate)&&np(e,t)}function ip(e){if(e.tag===13||e.tag===31){var t=ei(e,67108864);t!==null&&pu(t,e,67108864),rp(e,67108864)}}function ap(e){if(e.tag===13||e.tag===31){var t=du();t=it(t);var n=ei(e,t);n!==null&&pu(n,e,t),rp(e,t)}}var op=!0;function sp(e,t,n,r){var i=O.T;O.T=null;var a=k.p;try{k.p=2,lp(e,t,n,r)}finally{k.p=a,O.T=i}}function cp(e,t,n,r){var i=O.T;O.T=null;var a=k.p;try{k.p=8,lp(e,t,n,r)}finally{k.p=a,O.T=i}}function lp(e,t,n,r){if(op){var i=up(r);if(i===null)Sd(e,t,r,dp,n),Sp(e,r);else if(wp(i,e,t,n,r))r.stopPropagation();else if(Sp(e,r),t&4&&-1<xp.indexOf(e)){for(;i!==null;){var a=yt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=qe(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Be(o);s.entanglements[1]|=c,o&=~c}td(a),!(q&6)&&($l=N()+500,nd(0,!1))}}break;case 31:case 13:s=ei(a,2),s!==null&&pu(s,a,2),vu(),rp(a,2)}if(a=up(r),a===null&&Sd(e,t,r,dp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Sd(e,t,r,null,n)}}function up(e){return e=rn(e),fp(e)}var dp=null;function fp(e){if(dp=null,e=vt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return dp=e,null}function pp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(ke()){case Ae:return 2;case je:return 8;case Me:case Ne:return 32;case Pe:return 268435456;default:return 32}default:return 32}}var mp=!1,hp=null,gp=null,_p=null,vp=new Map,yp=new Map,bp=[],xp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Sp(e,t){switch(e){case`focusin`:case`focusout`:hp=null;break;case`dragenter`:case`dragleave`:gp=null;break;case`mouseover`:case`mouseout`:_p=null;break;case`pointerover`:case`pointerout`:vp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:yp.delete(t.pointerId)}}function Cp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=yt(t),t!==null&&ip(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function wp(e,t,n,r,i){switch(t){case`focusin`:return hp=Cp(hp,e,t,n,r,i),!0;case`dragenter`:return gp=Cp(gp,e,t,n,r,i),!0;case`mouseover`:return _p=Cp(_p,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return vp.set(a,Cp(vp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,yp.set(a,Cp(yp.get(a)||null,e,t,n,r,i)),!0}return!1}function Tp(e){var t=vt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,st(e.priority,function(){ap(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,st(e.priority,function(){ap(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ep(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=up(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);nn=r,n.target.dispatchEvent(r),nn=null}else return t=yt(n),t!==null&&ip(t),e.blockedOn=n,!1;t.shift()}return!0}function Dp(e,t,n){Ep(e)&&n.delete(t)}function kp(){mp=!1,hp!==null&&Ep(hp)&&(hp=null),gp!==null&&Ep(gp)&&(gp=null),_p!==null&&Ep(_p)&&(_p=null),vp.forEach(Dp),yp.forEach(Dp)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,mp||(mp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(fp(r||n)===null)continue;break}var a=yt(n);a!==null&&(e.splice(t,3),t-=3,Ss(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}hp!==null&&Ap(hp,e),gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp.forEach(t),yp.forEach(t);for(var n=0;n<bp.length;n++){var r=bp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<bp.length&&(n=bp[0],n.blockedOn===null);)Tp(n),n.blockedOn===null&&bp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[ut]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[ut]||null)s=o.formAction;else if(fp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;tp(n,du(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;tp(e.current,2,null,e,null,null),vu(),t[dt]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=ot();e={blockedOn:null,target:e,priority:t};for(var n=0;n<bp.length&&t!==0&&t<bp[n].priority;n++);bp.splice(n,0,e),n===0&&Tp(e)}};var Lp=n.version;if(Lp!==`19.2.7`)throw Error(i(527,Lp,`19.2.7`));k.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:f(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.7`,rendererPackageName:`react-dom`,currentDispatcherRef:O,reconcilerVersion:`19.2.7`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Le=zp.inject(Rp),Re=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Ws,s=Gs,c=Ks;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=$f(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[dt]=t.current,bd(e),new Fp(t)}})),d_=l(o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=u_()}))(),1),f_=`reference.lastSubPage`;function p_(e){let t=e.toLowerCase().split(`/`)[2];return t===`monster`||t===`spell`?t:null}function m_(){try{return window.localStorage.getItem(f_)===`spell`?`spell`:`monster`}catch{return`monster`}}function h_(e){try{window.localStorage.setItem(f_,e)}catch{}}function g_(){let e=Dd();return(0,m.useEffect)(()=>{let t=p_(e.pathname);t&&h_(t)},[e.pathname]),(0,U.jsx)(`div`,{id:`reference-page`,children:(0,U.jsx)(hf,{})})}function __(){return(0,U.jsx)(mf,{to:m_(),replace:!0})}function v_(){return(0,U.jsxs)(`div`,{children:[(0,U.jsxs)(`div`,{className:`text-block`,children:[(0,U.jsx)(`h2`,{children:`Resources`}),(0,U.jsx)(`p`,{className:`pt-2`,children:`Links to various Shadowdark resources.`})]}),(0,U.jsxs)(`div`,{className:`flex flex-wrap -mx-2 gap-y-4`,children:[(0,U.jsx)(`div`,{className:`w-full md:w-1/2 px-2 mb-4`,children:(0,U.jsxs)(`div`,{className:`bg-gray-100 p-4 rounded-xl`,children:[(0,U.jsx)(`h3`,{children:`Source Material`}),(0,U.jsxs)(`ul`,{children:[(0,U.jsx)(`li`,{className:`mb-2`,children:(0,U.jsx)(`span`,{className:`flex items-center gap-2`,children:(0,U.jsxs)(`a`,{className:`underline hover:text-gray-400`,target:`_blank`,href:`https://www.drivethrurpg.com/product/413713/Shadowdark-RPG-Quickstart-Set`,rel:`noreferrer`,children:[`Shadowdark RPG Quickstart Set\xA0`,G.getExternalLinkIconInline()]})})}),(0,U.jsx)(`li`,{className:`mb-2`,children:(0,U.jsxs)(`span`,{className:`flex items-center gap-2`,children:[(0,U.jsxs)(`a`,{className:`underline hover:text-gray-400`,target:`_blank`,href:`https://www.thearcanelibrary.com/pages/shadowdark`,rel:`noreferrer`,children:[`Shadowdark RPG\xA0`,G.getExternalLinkIconInline()]}),` core rules`]})}),(0,U.jsx)(`li`,{className:`mb-2`,children:(0,U.jsxs)(`span`,{className:`flex items-center gap-2`,children:[(0,U.jsxs)(`a`,{className:`underline hover:text-gray-400`,target:`_blank`,href:`https://www.thearcanelibrary.com/collections/shadowdark-rpg/products/solodark-solo-rules-for-shadowdark-rpg-print-pdf`,rel:`noreferrer`,children:[`SoloDark: Solo Rules\xA0`,G.getExternalLinkIconInline()]}),` (print)`]})}),(0,U.jsx)(`li`,{className:`mb-2`,children:(0,U.jsxs)(`span`,{className:`flex items-center gap-2`,children:[(0,U.jsxs)(`a`,{className:`underline hover:text-gray-400`,target:`_blank`,href:`https://www.thearcanelibrary.com/collections/shadowdark-rpg/products/solodark-solo-rules-for-shadowdark-rpg-pdf`,rel:`noreferrer`,children:[`SoloDark: Solo Rules\xA0`,G.getExternalLinkIconInline()]}),` (pdf) free`]})})]})]})}),(0,U.jsx)(`div`,{className:`w-full md:w-1/2 px-2 mb-4`,children:(0,U.jsxs)(`div`,{className:`bg-gray-100 p-4 rounded-xl`,children:[(0,U.jsx)(`h3`,{children:`Community`}),(0,U.jsxs)(`ul`,{children:[(0,U.jsx)(`li`,{className:`mb-2`,children:(0,U.jsx)(`span`,{className:`flex items-center gap-2`,children:(0,U.jsxs)(`a`,{className:`underline hover:text-gray-400`,target:`_blank`,href:`Discord link: https://discord.gg/abPNTQmjG7`,rel:`noreferrer`,children:[`The Arcane Library on Discord\xA0`,G.getExternalLinkIconInline()]})})}),(0,U.jsx)(`li`,{className:`mb-2`,children:(0,U.jsx)(`span`,{className:`flex items-center gap-2`,children:(0,U.jsxs)(`a`,{className:`underline hover:text-gray-400`,target:`_blank`,href:`https://youtube.com/thearcanelibrary`,rel:`noreferrer`,children:[`The Arcane Library on YouTube\xA0`,G.getExternalLinkIconInline()]})})}),(0,U.jsx)(`li`,{className:`mb-2`,children:(0,U.jsx)(`span`,{className:`flex items-center gap-2`,children:(0,U.jsxs)(`a`,{className:`underline hover:text-gray-400`,target:`_blank`,href:`https://www.thearcanelibrary.com/pages/shadowdark-rpg-newsletter`,rel:`noreferrer`,children:[`Shadowdark News Letter\xA0`,G.getExternalLinkIconInline()]})})})]})]})}),(0,U.jsx)(`div`,{className:`w-full md:w-1/2 px-2 mb-4`,children:(0,U.jsxs)(`div`,{className:`bg-gray-100 p-4 rounded-xl`,children:[(0,U.jsx)(`h3`,{children:`Character Creators`}),(0,U.jsxs)(`ul`,{children:[(0,U.jsx)(`li`,{className:`mb-2`,children:(0,U.jsxs)(`span`,{className:`flex items-center gap-2`,children:[(0,U.jsxs)(`a`,{className:`underline hover:text-gray-400`,target:`_blank`,href:`https://shadowdarklings.net/`,rel:`noreferrer`,children:[`ShadowDarklings\xA0`,G.getExternalLinkIconInline()]}),` by `,(0,U.jsx)(`a`,{className:`underline hover:text-gray-400`,target:`_blank`,href:`https://www.reddit.com/user/SWooNe`,rel:`noreferrer`,children:`SWooNe`})]})}),(0,U.jsx)(`li`,{className:`mb-2`,children:(0,U.jsx)(`span`,{className:`flex items-center gap-2`,children:(0,U.jsxs)(`a`,{className:`underline hover:text-gray-400`,target:`_blank`,href:`https://sd-character-sheet.onrender.com/`,rel:`noreferrer`,children:[`Shadowdark Character Sheet\xA0`,G.getExternalLinkIconInline()]})})})]})]})})]})]})}var y_=JSON.parse(JSON.stringify({name:`Monster Data`,rulesSection:``,description:``,entries:[{name:`ABOLETH`,tags:`aberration`,level:`8`,biome:`deeps,river/coast,swamp`,alignment:`C`,move:`swim`,attack:``,effect:`mind control`,trait:``,page:`194`,statblock:`AC 16, HP 39, ATK 2 tentacle (near) +5 (1d8 + curse) or 1 tail +5 (3d6), MV near (swim), S +4, D -1, C +3, I +4, W +2, Ch +2, AL C, LV 8`},{name:`ACOLYTE`,tags:`humanoid`,level:`1`,biome:`ruins,tomb`,alignment:`L`,move:``,attack:`spell`,effect:``,trait:``,page:`194`,statblock:`AC 12, HP 4, ATK 1 mace +1 (1d6) or 1 spell +2, MV near, S +1, D -1, C+0, I -1, W +2, Ch +0, AL L, LV 1`},{name:`ANGEL, DOMINI`,tags:`celestial,angel`,level:`9`,biome:`*`,alignment:`L`,move:`fly`,attack:``,effect:`paralysis`,trait:``,page:`195`,statblock:`AC 17 (plate mail + shield), HP 42, ATK 3 bastard sword +7 (1d8) or 1 horn, MV near (fly), S +4, D +1, C+2, I +3, W +4, Ch +4, AL L, LV 9`},{name:`ANGEL, PRINCIPI`,tags:`celestial,angel`,level:`11`,biome:`*`,alignment:`L`,move:`fly`,attack:``,effect:``,trait:`aura`,page:`195`,statblock:`AC 16 (+1 plate mail), HP 53, ATK 3 silvered bastard sword +9 (1d10), MV double near (fly), S +4, D +2, C +4, I +4, W +4, Ch +4, AL L, LV 11`},{name:`ANGEL, SERAPH`,tags:`celestial,angel`,level:`3`,biome:`*`,alignment:`L`,move:`fly`,attack:``,effect:``,trait:``,page:`195`,statblock:`AC 14 (chainmail), HP 14, ATK 2 longsword +3 (1d8), MV near (fly), S +3, D +1, C +1, I +2, W +3, Ch +3, AL L, LV 3`},{name:`ANIMATED ARMOR`,tags:`construct`,level:`2`,biome:`ruins,tomb`,alignment:`C`,move:``,attack:``,effect:``,trait:``,page:`196`,statblock:`AC 15, HP 11, ATK 1 longsword +3 (1d8), MV near, S +3, D -1, C +2, I -1, W +1, Ch +0, AL C, LV 2`},{name:`ANKHEG`,tags:`monstrosity`,level:`3`,biome:`cave,deeps,desert,grassland`,alignment:`N`,move:`burrow`,attack:`acid`,effect:``,trait:``,page:`196`,statblock:`AC 14, HP 14, ATK 1 bite +4 (1d6) or 1 acid spray (near) +4 (2d6), MV near (burrow), S +2, D +2, C+1, I -2, W +1, Ch -2, AL N, LV 3`},{name:`APE`,tags:`animal`,level:`2`,biome:`forest,mountain,river/coast,swamp`,alignment:`N`,move:`climb`,attack:``,effect:``,trait:``,page:`196`,statblock:`AC 12, HP 10, ATK 1 fist +2 (1d6) or 1 rock (far) +2 (1d4), MV near (climb), S +2, D +2, C +1, I -2, W +1, Ch +0, AL N, LV 2`},{name:`APE, SNOW`,tags:`animal`,level:`4`,biome:`arctic`,alignment:`N`,move:`climb`,attack:``,effect:``,trait:`immune: cold`,page:`196`,statblock:`AC 13, HP 19, ATK 2 fist +4 (1d6) or 1 rock (far) +4 (2d6), MV near (climb), S +3, D +1, C +1, I -2, W +1, Ch +0, AL N, LV 4`},{name:`APPRENTICE`,tags:`humanoid`,level:`1`,biome:`arctic,cave,desert,forest,grassland,jungle,mountain,river/coast,ruins,swamp,tomb`,alignment:`N`,move:``,attack:`spell`,effect:``,trait:``,page:`196`,statblock:`AC 11, HP 3, ATK 1 dagger (close/near) +1 (1d4) or 1 spell +2, MV near, S -1, D +1, C -1, I +2, W +0, Ch+0, AL N, LV 1`},{name:`ARCHANGEL`,tags:`celestial,angel`,level:`16`,biome:`*`,alignment:`L`,move:`fly`,attack:`fire`,effect:``,trait:``,page:`195`,statblock:`AC 18 (+3 plate mail), HP 76, ATK3 flaming greatsword +10 (2d12), MV double near (fly), S +5, D +2, C+4, I +4, W +5, Ch +5, AL L, LV 16`},{name:`ARCHDEVIL`,tags:`fiend,devil`,level:`16`,biome:`*`,alignment:`C`,move:`teleport`,attack:``,effect:`mind control`,trait:`immune: fire,immune: non-magical damage,spell resistance`,page:`206`,statblock:`AC 19, HP 76, ATK 4 iron scepter +10 (3d10) or 1 soulbind, MV far (teleport), S +5, D +4, C +4, I +5, W +4, Ch +7, AL C, LV 16`},{name:`ARCHMAGE`,tags:`humanoid`,level:`10`,biome:`*`,alignment:`L`,move:``,attack:`spell`,effect:``,trait:``,page:`197`,statblock:`AC 12, HP 44, ATK 2 spell +7, MV near, S -1, D +2, C -1, I +4, W +2, Ch+1, AL L, LV 10`},{name:`ASSASSIN`,tags:`humanoid`,level:`8`,biome:`*`,alignment:`C`,move:`climb`,attack:`poison`,effect:``,trait:`surprise bonus`,page:`197`,statblock:`AC 15 (leather), HP 38, ATK 2 poisoned dagger (close/near) +6 (2d4), MV near (climb), S +2, D +4, C +2, I +2, W +3, Ch +3, AL C, LV 8`},{name:`AZER`,tags:`elemental`,level:`3`,biome:`cave,deeps,mountain`,alignment:`L`,move:``,attack:`fire`,effect:``,trait:`immune: fire`,page:`197`,statblock:`AC 15, HP 15, ATK 2 flaming warhammer +3 (1d10, ignites flammables) or 1 crossbow (far) +0 (1d6), MV near, S +3, D +0, C+2, I +0, W +0, Ch +0, AL L, LV 3`},{name:`BADGER`,tags:`animal`,level:`1`,biome:`forest`,alignment:`N`,move:`burrow`,attack:``,effect:``,trait:`rage,fearless`,page:`197`,statblock:`AC 11, HP 5, ATK 2 claw +2 (1d4), MV near (burrow), S +2, D +0, C+1, I -3, W +1, Ch -2, AL N, LV 1`},{name:`BANDIT`,tags:`humanoid`,level:`1`,biome:`arctic,desert,mountain,river/coast,ruins,tomb`,alignment:`C`,move:``,attack:``,effect:``,trait:``,page:`197`,statblock:`AC 13 (leather + shield), HP 4, ATK 1 club +1 (1d4) or 1 shortbow (far) +0 (1d4), MV near, S +1, D +0, C +0, I -1, W +0, Ch -1, AL C, LV 1`},{name:`BASILISK`,tags:`monstrosity`,level:`5`,biome:`cave,grassland,river/coast,swamp`,alignment:`N`,move:``,attack:`petrify`,effect:`petrification`,trait:``,page:`198`,statblock:`AC 14, HP 25, ATK 2 bite +4 (2d6 + petrify), MV near, S +3, D +1, C +3, I -3, W +1, Ch -3, AL N, LV 5`},{name:`BAT, GIANT`,tags:`animal,giant`,level:`2`,biome:`cave,deeps,mountain,ruins`,alignment:`N`,move:`fly`,attack:``,effect:``,trait:``,page:`198`,statblock:`AC 12, HP 9, ATK 1 bite +2 (1d6), MV near (fly), S -1, D +2, C +0, I -3, W +1, Ch -3, AL N, LV 2`},{name:`BAT, SWARM`,tags:`animal,swarm`,level:`4`,biome:`cave,mountain,ruins`,alignment:`N`,move:`fly`,attack:``,effect:``,trait:``,page:`198`,statblock:`AC 12, HP 18, ATK 3 bite +2 (1d6), MV near (fly), S -3, D +2, C +0, I -3, W +1, Ch -3, AL N, LV 4`},{name:`BEAR, BROWN`,tags:`animal`,level:`5`,biome:`forest,grassland`,alignment:`N`,move:`climb`,attack:`crush`,effect:``,trait:``,page:`198`,statblock:`AC 13, HP 25, ATK 2 claw +4 (1d8), MV near (climb) S +4, D +1, C +3, I-2, W +1, Ch -2, AL N, LV 5`},{name:`BEAR, POLAR`,tags:`animal`,level:`7`,biome:`arctic`,alignment:`N`,move:`climb`,attack:`crush`,effect:``,trait:`immune: cold`,page:`198`,statblock:`AC 13, HP 34, ATK 2 claw +6 (2d6), MV near (climb), S +4, D +1, C +3, I-2, W +1, Ch -2, AL N, LV 7`},{name:`BEASTMAN`,tags:`humanoid`,level:`1`,biome:`cave,deeps,mountain,ruins`,alignment:`C`,move:``,attack:``,effect:``,trait:``,page:`198`,statblock:`AC 12 (leather), HP 5, ATK 1 spear (close/near) +2 (1d6 + 1), MV near, S +2, D +1, C +1, I -2, W +1, Ch -1, AL C, LV 1`},{name:`BERSERKER`,tags:`humanoid`,level:`2`,biome:`desert,forest,grassland,jungle`,alignment:`N`,move:``,attack:``,effect:``,trait:`rage,fearless`,page:`199`,statblock:`AC 12 (leather), HP 10, ATK 1 greataxe +2 (1d10) or 1 spear (close/near) +2 (1d6), MV near, S+2, D +1, C +1, I +0, W +1, Ch +0, AL N, LV 2`},{name:`BLACK PUDDING`,tags:`ooze`,level:`6`,biome:`arctic,cave,deeps,river/coast,ruins`,alignment:`N`,move:`climb`,attack:``,effect:`corrosion`,trait:`corrosive,immune: all but fire`,page:`199`,statblock:`AC 9, HP 30, ATK 3 tentacle +4 (2d6), MV near (climb), S +2, D -1, C +3, I -4, W -3, Ch -4, AL N, LV 6`},{name:`BOAR`,tags:`animal`,level:`3`,biome:`forest,grassland`,alignment:`N`,move:``,attack:`gore`,effect:``,trait:``,page:`199`,statblock:`AC 12, HP 14, ATK 2 tusk +3 (1d6), MV near, S +3, D +0, C +1, I -2, W+1, Ch -2, AL N, LV 3`},{name:`BRACHIOSAURUS`,tags:`dinosaur`,level:`12`,biome:`forest,jungle`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`208`,statblock:`AC 13, HP 57, ATK 3 stomp +7 (2d10), MV double near, S +6, D -1, C +3, I -3, W +1, Ch -3, AL N, LV 12`},{name:`BRAIN EATER`,tags:`aberration`,level:`8`,biome:`deeps`,alignment:`C`,move:``,attack:``,effect:`mind control,paralysis`,trait:`telepathic`,page:`199`,statblock:`AC 14 (leather), HP 36, ATK 4 tentacle +5 (1d8 + latch) or 1 mind blast or 1 mind control, MV near, S +2, D +3, C +0, I +4, W +2, Ch +4, AL C, LV 8`},{name:`BUGBEAR`,tags:`monstrosity`,level:`3`,biome:`cave`,alignment:`C`,move:``,attack:``,effect:``,trait:`stealthy`,page:`200`,statblock:`AC 13 (leather + shield), HP 14, ATK 2 spiked mace +3 (1d6), MV near, S +3, D +0, C +1, I -1, W +0, Ch -2, AL C, LV 3`},{name:`BULETTE`,tags:`monstrosity`,level:`8`,biome:`cave,desert,grassland`,alignment:`N`,move:`burrow`,attack:``,effect:``,trait:``,page:`200`,statblock:`AC 17, HP 40, ATK 3 bite +5 (2d6) or 1 leap, MV near (burrow), S +5, D +1, C +4, I -3, W +1, Ch -2, AL N, LV 8`},{name:`CAMEL`,tags:`animal`,level:`2`,biome:`desert`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`200`,statblock:`AC 10, HP 12, ATK 1 hoof +3 (1d6) or 1 spit (near) +0 (1d4), MV double near, S +3, D +0, C +3, I -2, W +1, Ch -3, AL N, LV 2`},{name:`CAVE BRUTE`,tags:`insect`,level:`6`,biome:`cave,deeps,ruins`,alignment:`N`,move:`burrow`,attack:``,effect:`daze`,trait:``,page:`200`,statblock:`AC 14, HP 28, ATK 2 claw +5 (1d8) and 1 mandible +5 (1d10), MV near (burrow), S +4, D +1, C +1, I-3, W +1, Ch -3, AL N, LV 6`},{name:`CAVE CREEPER`,tags:`insect`,level:`4`,biome:`cave,deeps,ruins,tomb`,alignment:`N`,move:`climb`,attack:`toxin`,effect:`paralysis`,trait:``,page:`200`,statblock:`AC 12, HP 18, ATK 1 bite +3 (1d6) and 1 tentacles +3 (1d8 + toxin), MV near (climb), S +2, D +2, C +0, I -3, W +1, Ch -3, AL N, LV 4`},{name:`CENTAUR`,tags:`monstrosity`,level:`3`,biome:`desert,forest,grassland,river/coast`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`201`,statblock:`AC 12 (leather), HP 14, ATK 2 spear (close/near) +2 (1d6) or 1 longbow (far) +1 (1d8), MV double near, S +2, D +1, C +1, I +0, W +2, Ch +1, AL N, LV 3`},{name:`CENTIPEDE, GIANT`,tags:`insect,giant`,level:`1`,biome:`cave,forest,jungle`,alignment:`N`,move:`climb`,attack:`toxin`,effect:`paralysis`,trait:``,page:`201`,statblock:`AC 11, HP 4, ATK 1 bite +1 (1d4 + poison), MV near (climb), S -3, D+1, C +0, I -4, W -3, Ch -4, AL N, LV 1`},{name:`CENTIPEDE, SWARM`,tags:`insect,swarm`,level:`4`,biome:`cave,forest,jungle,tomb`,alignment:`N`,move:`climb`,attack:`toxin`,effect:`paralysis`,trait:``,page:`201`,statblock:`AC 11, HP 18, ATK 3 bite +1 (1d4 + poison), MV near (climb), S -3, D+1, C +0, I -4, W -3, Ch -4, AL N, LV 4`},{name:`CHIMERA`,tags:`monstrosity`,level:`10`,biome:`cave,grassland`,alignment:`C`,move:`fly`,attack:`fire`,effect:``,trait:``,page:`201`,statblock:`AC 16, HP 49, ATK 4 rend +7 (2d8) and 1 fire breath, MV double near (fly), S +5, D +4, C +4, I -3, W+2, Ch -1, AL C, LV 10`},{name:`CHUUL`,tags:`insect`,level:`5`,biome:`ocean,river/coast`,alignment:`C`,move:`swim`,attack:`grab`,effect:``,trait:``,page:`201`,statblock:`AC 15, HP 25, ATK 2 pincer +4 (1d8 + grab), MV near (swim), S+3, D -1, C +3, I -1, W +1, Ch -2, AL C, LV 5`},{name:`CLOAKER`,tags:`aberration`,level:`6`,biome:`cave,deeps`,alignment:`C`,move:`fly`,attack:`sonic`,effect:`disadvantage`,trait:`illusion`,page:`202`,statblock:`AC 13, HP 28, ATK 3 lash +4 (1d8) or 1 screech, MV near (fly), S +2, D +3, C +1, I +1, W +1, Ch +0, AL C, LV 6`},{name:`COCKATRICE`,tags:`monstrosity`,level:`3`,biome:`cave,deeps,desert,swamp`,alignment:`N`,move:`fly`,attack:`petrify`,effect:`petrification`,trait:``,page:`202`,statblock:`AC 11, HP 14, ATK 1 bite +1 (1d4 + petrify), MV near (fly), S -2, D +1, C+1, I -3, W +1, Ch -3, AL N, LV 3`},{name:`COUATL`,tags:`celestial`,level:`9`,biome:`jungle`,alignment:`L`,move:`fly`,attack:`toxin`,effect:`sleep`,trait:``,page:`202`,statblock:`AC 16, HP 42, ATK 3 bite +6 (2d6 + poison), MV near (fly), S +2, D +3, C +2, I +4, W +4, Ch +5, AL L, LV 9`},{name:`CRAB, GIANT`,tags:`animal,giant`,level:`5`,biome:`ocean,river/coast`,alignment:`N`,move:`swim`,attack:`crush`,effect:``,trait:``,page:`202`,statblock:`AC 15, HP 24, ATK 2 pincer +4 (1d8 + crush), MV near (swim), S+3, D +0, C +2, I -3, W +0, Ch -3, AL N, LV 5`},{name:`CROCODILE`,tags:`animal`,level:`4`,biome:`jungle,swamp`,alignment:`N`,move:`swim`,attack:``,effect:``,trait:``,page:`203`,statblock:`AC 14, HP 20, ATK 2 bite +3 (1d8), MV near (swim), S +3, D +1, C +2, I-2, W +1, Ch -2, AL N, LV 4`},{name:`CULTIST`,tags:`humanoid`,level:`2`,biome:`*`,alignment:`C`,move:``,attack:`spell`,effect:``,trait:`fearless`,page:`203`,statblock:`AC 14 (chainmail + shield), HP9, ATK 1 longsword +1 (1d8) or 1 spell +2, MV near, S +1, D -1, C +0, I-1, W +2, Ch +0, AL C, LV 2`},{name:`CYCLOPS`,tags:`humanoid,giant`,level:`8`,biome:`forest,grassland,jungle,mountain`,alignment:`C`,move:``,attack:``,effect:``,trait:``,page:`203`,statblock:`AC 11 (leather), HP 38, ATK 2 greatclub +7 (2d8) or 1 rock (far) +5 (1d12), MV double near, S +5, D +0, C +2, I -1, W -2, Ch +0, AL C, LV 8`},{name:`DARKMANTLE`,tags:`aberration`,level:`1`,biome:`cave,deeps,ruins`,alignment:`N`,move:`fly`,attack:``,effect:``,trait:`darkness`,page:`203`,statblock:`AC 13, HP 4 ATK 1 bite +3 (1d4) or 1 darkness, MV near (fly), S -2, D+3, C +0, I -3, W +0, Ch -3, AL N, LV 1`},{name:`DEEP ONE`,tags:`aberration`,level:`2`,biome:`deeps,ocean,river/coast`,alignment:`C`,move:`swim`,attack:``,effect:``,trait:`sunblind`,page:`203`,statblock:`AC 13, HP 10, ATK 2 spear (close/near) +2 (1d6), MV near (swim), S+2, D +1, C +1, I -2, W +0, Ch -2, AL C, LV 2`},{name:`DEMON, BALOR`,tags:`fiend,demon`,level:`16`,biome:`*`,alignment:`C`,move:`fly`,attack:`fire,grab`,effect:``,trait:`immune: non-magical fire`,page:`204`,statblock:`AC 19, HP 77, ATK 3 greatsword +10 (2d12 + hellfire) and 1 fire whip (near) +10 (2d6 + grab), MV double near (fly), S +6, D +2, C +5, I +4, W +3, Ch +4, AL C, LV 16`},{name:`DEMON, DRETCH`,tags:`fiend,demon`,level:`2`,biome:`*`,alignment:`C`,move:``,attack:`toxin`,effect:`blindness`,trait:``,page:`204`,statblock:`AC 12, HP 11, ATK 1 claw +2 (1d6) or 1 gas, MV near, S +2, D +0, C +2, I -2, W -1, Ch -3, AL C, LV 2`},{name:`DEMON, GLABREZU`,tags:`fiend,demon`,level:`8`,biome:`*`,alignment:`C`,move:``,attack:`crush`,effect:``,trait:``,page:`204`,statblock:`AC 15, HP 40, ATK 2 pincer +7 (2d8 + crush), MV near, S +4, D +1, C +4, I +3, W +2, Ch +2, AL C, LV 8`},{name:`DEMON, MARILITH`,tags:`fiend,demon`,level:`9`,biome:`*`,alignment:`C`,move:`climb`,attack:``,effect:``,trait:``,page:`205`,statblock:`AC 17 (plate mail), HP 43, ATK6 longsword +7 (1d8), MV near (climb), S +5, D +4, C +3, I +3, W+3, Ch +4, AL C, LV 9`},{name:`DEMON, VROCK`,tags:`fiend,demon`,level:`5`,biome:`*`,alignment:`C`,move:`fly`,attack:`sonic,toxin`,effect:`disadvantage`,trait:``,page:`205`,statblock:`AC 14, HP 24, ATK 2 talons +4 (1d8) or 1 screech, MV near (fly), S+2, D +2, C +2, I -1, W +1, Ch +0, AL C, LV 5`},{name:`DEVIL, BARBED`,tags:`fiend,devil`,level:`3`,biome:`*`,alignment:`C`,move:``,attack:`fire`,effect:``,trait:``,page:`206`,statblock:`AC 13, HP 14, ATK 2 spine (near) +3 (1d6 + barb) or 1 fire blast (far) +3 (1d8), MV near, S +2, D +3, C +1, I +1, W +1, Ch +1, AL C, LV 3`},{name:`DEVIL, CUBI`,tags:`fiend,devil`,level:`6`,biome:`*`,alignment:`C`,move:`fly`,attack:`charm,drain stat`,effect:`charm,drain:wisdom`,trait:`shape change`,page:`207`,statblock:`AC 14, HP 29, ATK 1 kiss +4 (1d6 + drain) or 1 charm, MV near (fly), S +2, D +4, C +2, I +3, W +2, Ch +5, AL C, LV 6`},{name:`DEVIL, ERINYES`,tags:`fiend,devil`,level:`9`,biome:`*`,alignment:`C`,move:`fly`,attack:`toxin`,effect:`mind control`,trait:``,page:`207`,statblock:`AC 17 (+1 plate mail), HP 43, ATK 3 greatsword +8 (1d12) or 2 longbow (far) +8 (1d8 + poison), MV double near (fly), S +4, D +4, C +3, I +4, W +4, Ch +5, AL C, LV 9`},{name:`DEVIL, HORNED`,tags:`fiend,devil`,level:`7`,biome:`*`,alignment:`C`,move:`fly`,attack:`fire`,effect:``,trait:`damage reduction`,page:`207`,statblock:`AC 16, HP 35, ATK 2 burning trident (near) +7 (2d6) or 1 fire blast (far) +4 (2d8), MV double near (fly), S +5, D +2, C +4, I +2, W+1, Ch +2, AL C, LV 7`},{name:`DEVIL, IMP`,tags:`fiend,devil`,level:`2`,biome:`*`,alignment:`C`,move:`fly`,attack:`toxin`,effect:`sleep`,trait:`immune: fire`,page:`207`,statblock:`AC 13, HP 9, ATK 1 stinger +3 (1d4 + poison), MV near (fly), S -2, D +3, C +0, I +1, W +0, Ch +2, AL C, LV 2`},{name:`DJINNI`,tags:`elemental`,level:`10`,biome:`desert`,alignment:`N`,move:`fly`,attack:``,effect:``,trait:`immune: non-magical damage`,page:`209`,statblock:`AC 14, HP 48, ATK 3 scimitar +7 (1d12) or 1 whirlwind, MV double near (fly), S +4, D +4, C +3, I +4, W+3, Ch +3, AL N, LV 10`},{name:`DOPPELGANGER`,tags:`monstrosity`,level:`4`,biome:`*`,alignment:`C`,move:``,attack:``,effect:``,trait:`shape change,telepathic`,page:`209`,statblock:`AC 12, HP 20, ATK 1 dagger (close/near) +2 (1d4), MV near, S+1, D +2, C +2, I +1, W +0, Ch +4, AL C, LV 4`},{name:`DRAGON, DESERT`,tags:`dragon`,level:`13`,biome:`desert`,alignment:`L`,move:`fly`,attack:`electric`,effect:``,trait:`illusion,immune: electricity`,page:`210`,statblock:`AC 17, HP 61, ATK 3 rend +9 (2d10) or 1 lightning breath, MV double near (fly), S +5, D +3, C +3, I +4, W+5, Ch +5, AL L, LV 13`},{name:`DRAGON, FIRE`,tags:`dragon`,level:`17`,biome:`cave,desert,mountain`,alignment:`C`,move:`fly`,attack:`fire`,effect:``,trait:`immune: fire`,page:`210`,statblock:`AC 18, HP 80, ATK 4 rend +11 (2d12) or 1 fire breath, MV double near (fly), S +6, D +5, C +4, I +4, W+4, Ch +5, AL C, LV 17`},{name:`DRAGON, FOREST`,tags:`dragon`,level:`12`,biome:`forest,jungle`,alignment:`N`,move:`fly`,attack:`poison`,effect:`immobilize`,trait:``,page:`211`,statblock:`AC 16, HP 58, ATK 3 rend +8 (2d8) or 1 poison breath, MV double near (fly), S +4, D +3, C +4, I +3, W+3, Ch +4, AL N, LV 12`},{name:`DRAGON, FROST`,tags:`dragon`,level:`14`,biome:`arctic`,alignment:`N`,move:`fly`,attack:`cold`,effect:``,trait:`immune: cold`,page:`211`,statblock:`AC 17, HP 68, ATK 4 rend +9 (2d10) or 1 ice breath, MV double near (fly), S +4, D +3, C +5, I +3, W+4, Ch +3, AL N, LV 14`},{name:`DRAGON, SEA`,tags:`dragon`,level:`16`,biome:`ocean,river/coast`,alignment:`L`,move:``,attack:``,effect:``,trait:``,page:`211`,statblock:`AC 17, HP 76, ATK 4 rend +10 (2d10) or 1 steam breath or 1 water spout, MV double near (fly, swim), S +5, D +6, C +4, I +4, W+5, Ch +5, AL L, LV 16`},{name:`DRAGON, SWAMP`,tags:`dragon`,level:`12`,biome:`swamp,river/coast`,alignment:`C`,move:`burrow`,attack:`toxin`,effect:`blindness`,trait:``,page:`211`,statblock:`AC 16, HP 58, ATK 3 rend +8 (2d10) or 1 smog breath, MV double near (burrow, swim), S +5, D +3, C +4, I +4, W +3, Ch +3, AL C, LV 12`},{name:`DROW`,tags:`humanoid`,level:`2`,biome:`cave,deeps,jungle`,alignment:`C`,move:``,attack:`toxin`,effect:`sleep`,trait:`sunblind`,page:`212`,statblock:`AC 16 (mithral chainmail), HP 9, ATK 1 poison dart (near) +3 (1d4 + poison) or 1 longsword +1 (1d8), MV near, S +0, D +3, C +0, I +1, W+1, Ch +1, AL C, LV 2`},{name:`DROW, DRIDER`,tags:`monstrosity`,level:`6`,biome:`cave,deeps,jungle`,alignment:`C`,move:`climb`,attack:`toxin`,effect:`paralysis`,trait:`sunblind`,page:`212`,statblock:`AC 16 (mithral chainmail), HP 29, ATK 3 longsword +3 (1d8) or 2 longbow (far) +3 (1d8 + poison), MV near (climb), S +3, D +3, C +2, I +2, W +2, Ch +0, AL C, LV 6`},{name:`DROW, PRIESTESS`,tags:`humanoid`,level:`6`,biome:`cave,deeps,jungle`,alignment:`C`,move:``,attack:`spell,toxin`,effect:`paralysis`,trait:`sunblind`,page:`212`,statblock:`AC 16 (mithral chainmail), HP 28, ATK 3 snake whip (near) +4 (1d8 + poison) or 1 spell +4, MV near, S +2, D +3, C +1, I +3, W +4, Ch +3, AL C, LV 6`},{name:`DRUID`,tags:`humanoid`,level:`7`,biome:`forest,grassland`,alignment:`N`,move:``,attack:`spell`,effect:``,trait:``,page:`213`,statblock:`AC 11, HP 31, ATK 1 staff +0 (1d4) or 2 spell +5, MV near, S +0, D +1, C +0, I +4, W +3, Ch +0, AL N, LV 7`},{name:`DRYAD`,tags:`fey`,level:`4`,biome:`forest,jungle`,alignment:`N`,move:``,attack:`charm`,effect:`charm`,trait:``,page:`213`,statblock:`AC 13, HP 19, ATK 1 staff -1 (1d4) or 1 charm, MV near, S -1, D +2, C +1, I +1, W +3, Ch +4, AL N, LV 4`},{name:`DUERGAR`,tags:`humanoid`,level:`2`,biome:`cave,deeps`,alignment:`C`,move:``,attack:``,effect:``,trait:`invisibility,sunblind`,page:`213`,statblock:`AC 15 (chainmail + shield), HP 12, ATK 1 war pick +2 (1d6), MV near, S +2, D +0, C +3, I +0, W -1, Ch -1, AL C, LV 2`},{name:`DUNG BEETLE, GIANT`,tags:`insect,giant`,level:`2`,biome:`cave,grassland,ruins`,alignment:`N`,move:``,attack:`knock`,effect:``,trait:``,page:`214`,statblock:`AC 13, HP 10, ATK 1 horn +1 (1d4 + knock), MV near, S +1, D -1, C +1, I-3, W -1, Ch -3, AL N, LV 2`},{name:`EFREETI`,tags:`elemental`,level:`9`,biome:`desert`,alignment:`C`,move:`fly`,attack:`fire`,effect:``,trait:`immune: fire,immune: non-magical damage`,page:`214`,statblock:`AC 15, HP 43, ATK 3 scimitar +8 (2d10) or 2 fire bolt (far) +5 (2d6), MV near (fly), S +5, D +2, C +3, I +3, W +2, Ch +3, AL C, LV 9`},{name:`ELEMENTAL, AIR`,tags:`elemental`,level:`6`,biome:`*`,alignment:`N`,move:`fly`,attack:``,effect:``,trait:`immune: non-magical damage`,page:`215`,statblock:`AC 16, HP 29/42, ATK 3 slam +7 (2d6/3d6) or 1 whirlwind, MV double near (fly), S +3, D +5, C +2, I -2, W +1, Ch -2, AL N, LV 6`},{name:`ELEMENTAL, EARTH`,tags:`elemental`,level:`6`,biome:`*`,alignment:`N`,move:`burrow`,attack:``,effect:`immobilize`,trait:`immune: non-magical damage`,page:`215`,statblock:`AC 17, HP 31/44, ATK 3 slam +7 (2d8/3d8) or 1 avalanche, MV near (burrow), S +5, D +0, C +4, I-2, W +1, Ch -2, AL N, LV 6`},{name:`ELEMENTAL, FIRE`,tags:`elemental`,level:`6`,biome:`*`,alignment:`N`,move:`fly`,attack:`fire`,effect:``,trait:`immune: non-magical damage`,page:`215`,statblock:`AC 15, HP 30/43, ATK 3 slam +6 (2d10/3d10) or 1 inferno, MV near (fly), S +4, D +3, C +3, I -2, W +1, Ch-2, AL N, LV 6`},{name:`ELEMENTAL, WATER`,tags:`elemental`,level:`6`,biome:`*`,alignment:`N`,move:`swim`,attack:``,effect:`immobilize`,trait:`immune: non-magical damage`,page:`215`,statblock:`AC 15, HP 29/42, ATK 3 slam +6 (2d6/3d6) or 1 whirlpool, MV double near (swim), S +4, D +2, C+2, I -2, W +1, Ch -2, AL N, LV 6`},{name:`ELEPHANT`,tags:`animal`,level:`7`,biome:`grassland,jungle,river/coast`,alignment:`N`,move:``,attack:`charge`,effect:``,trait:``,page:`216`,statblock:`AC 14, HP 34, ATK 2 tusks +6 (1d8), MV near, S +5, D +0, C +3, I-2, W +1, Ch +0, AL N, LV 7`},{name:`ELF`,tags:`humanoid`,level:`2`,biome:`*`,alignment:`L`,move:``,attack:``,effect:``,trait:``,page:`216`,statblock:`AC 13, HP 9, ATK 1 longbow (far) +3 (1d8) or 1 longsword +1 (1d8), MV near, S +0, D +3, C +0, I +1, W+1, Ch +1, AL L, LV 2`},{name:`ETTERCAP`,tags:`monstrosity`,level:`3`,biome:`cave,mountain`,alignment:`C`,move:`climb`,attack:`poison`,effect:`immobilize`,trait:``,page:`216`,statblock:`AC 12, HP 14, ATK 2 bite +2 (1d6) or 1 poison web (near) +2, MV near (climb), S +0, D +2, C +1, I +0, W +0, Ch -1, AL C, LV 3`},{name:`FAIRY`,tags:`fey`,level:`1`,biome:`forest,jungle`,alignment:`N`,move:`fly`,attack:`toxin`,effect:`sleep`,trait:``,page:`216`,statblock:`AC 13, HP 4, ATK 1 needle +3 (1 + poison), MV near (fly), S -2, D +3, C +0, I +1, W +0, Ch +1, AL N, LV 1`},{name:`FROG, GIANT`,tags:`animal,giant`,level:`2`,biome:`cave,forest,jungle,river/coast,swamp`,alignment:`N`,move:`swim`,attack:`tongue`,effect:``,trait:``,page:`216`,statblock:`AC 12, HP 10, ATK 1 tongue and 1 bite +2 (1d6), MV near (swim), S+2, D +2, C +1, I -3, W +0, Ch -3, AL N, LV 2`},{name:`GARGOYLE`,tags:`elemental`,level:`4`,biome:`*`,alignment:`C`,move:`fly`,attack:``,effect:``,trait:`immune: non-magical damage`,page:`216`,statblock:`AC 16, HP 20, ATK 2 claw +3 (1d6), MV near (fly), S +3, D +1, C +2, I +0, W +1, Ch -1, AL C, LV 4`},{name:`GELATINOUS CUBE`,tags:`ooze`,level:`5`,biome:`ruins,tomb`,alignment:`N`,move:``,attack:`acid,toxin`,effect:`engulf`,trait:`damage reduction`,page:`217`,statblock:`AC 11, HP 24, ATK 1 touch +4 (1d8 + toxin + engulf), MV near, S +3, D +1, C +2, I -4, W +1, Ch -4, AL N, LV 5`},{name:`GHAST`,tags:`undead`,level:`4`,biome:`*`,alignment:`C`,move:``,attack:``,effect:`disadvantage,paralysis`,trait:`fearless`,page:`217`,statblock:`AC 11, HP 20, ATK 2 claw +4 (1d8 + paralyze), MV near, S +3, D +1, C+2, I +0, W +0, Ch +2, AL C, LV 4`},{name:`GHOST`,tags:`undead`,level:`6`,biome:`*`,alignment:`C`,move:`fly`,attack:`life drain,possess`,effect:`possessed`,trait:`fearless,immune: non-magical damage,immune: non-silvered weapons`,page:`217`,statblock:`AC 13, HP 27, ATK 2 death touch +5 (1d8 + life drain) or 1 possess, MV near (fly), S -2, D +3, C +0, I +0, W +0, Ch +4, AL C, LV 6`},{name:`GHOUL`,tags:`undead`,level:`2`,biome:`*`,alignment:`C`,move:``,attack:``,effect:`paralysis`,trait:`fearless`,page:`217`,statblock:`AC 11, HP 11, ATK 1 claw +2 (1d6 + paralyze), MV near, S +2, D +1, C+2, I -3, W -1, Ch +0, AL C, LV 2`},{name:`GIANT, CLOUD`,tags:`giant`,level:`10`,biome:`arctic,mountain`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`218`,statblock:`AC 15 (leather), HP 48, ATK3 morningstar +9 (2d10), MV double near, S +5, D +4, C +3, I +3, W +3, Ch +3, AL N, LV 10`},{name:`GIANT, FIRE`,tags:`giant`,level:`9`,biome:`mountain`,alignment:`C`,move:``,attack:``,effect:``,trait:`immune: fire`,page:`218`,statblock:`AC 15 (plate mail), HP 44, ATK 3 greatsword +9 (2d12), MV double near, S +6, D +0, C +4, I +1, W +2, Ch +1, AL C, LV 9`},{name:`GIANT, FROST`,tags:`giant`,level:`9`,biome:`arctic,mountain`,alignment:`C`,move:``,attack:``,effect:``,trait:`immune: cold`,page:`219`,statblock:`AC 14 (chainmail), HP 44, ATK 3 greataxe +8 (2d10), MV double near, S +5, D +1, C +4, I +2, W +3, Ch +2, AL C, LV 9`},{name:`GIANT, GOAT`,tags:`giant`,level:`8`,biome:`mountain`,alignment:`C`,move:`climb`,attack:``,effect:``,trait:``,page:`219`,statblock:`AC 12 (leather), HP 39, ATK 2 greatclub +7 (2d8) or 1 boulder (far) +7 (2d10), MV double near (climb), S +4, D +1, C +3, I -2, W+0, Ch -2, AL C, LV 8`},{name:`GIANT, HILL`,tags:`giant`,level:`7`,biome:`grassland,mountain`,alignment:`C`,move:``,attack:``,effect:``,trait:``,page:`219`,statblock:`AC 11 (leather), HP 34, ATK 2 greatclub +6 (2d8) or 1 boulder (far) +6 (2d10), MV double near, S+4, D +0, C +3, I -2, W -2, Ch -2, AL C, LV 7`},{name:`GIANT, STONE`,tags:`giant`,level:`8`,biome:`mountain`,alignment:`N`,move:``,attack:``,effect:``,trait:`damage reduction`,page:`219`,statblock:`AC 17, HP 40, ATK 2 greatclub +7 (2d8) or 1 boulder (far) +7 (2d10), MV double near, S +4, D +2, C +4, I +1, W +1, Ch -1, AL N, LV 8`},{name:`GIANT, STORM`,tags:`giant`,level:`12`,biome:`mountain,ocean`,alignment:`L`,move:`swim`,attack:`electric`,effect:``,trait:`immune: electricity`,page:`219`,statblock:`AC 15 (mithral chainmail), HP 58, ATK 3 greatsword +10 (2d12) or 1 lightning bolt, MV double near (swim), S +6, D +2, C +4, I +3, W+4, Ch +4, AL L, LV 12`},{name:`GIBBERING MOUTHER`,tags:`aberration`,level:`4`,biome:`deeps`,alignment:`N`,move:``,attack:`sonic`,effect:`confusion`,trait:``,page:`220`,statblock:`AC 8, HP 21, ATK 2 bite +3 (1d8 + latch), MV near (climb, swim), S+2, D -2, C +3, I -3, W +0, Ch -3, AL N, LV 4`},{name:`GLADIATOR`,tags:`humanoid`,level:`3`,biome:`*`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`220`,statblock:`AC 16 (chainmail + shield), HP15, ATK 2 longsword +3 (1d8) or 1 spear (close/near) +3 (1d6), MV near, S +2, D +1, C +2, I +0, W +0, Ch +1, AL N, LV 3`},{name:`GNOLL`,tags:`humanoid`,level:`2`,biome:`cave,grassland,swamp`,alignment:`C`,move:``,attack:``,effect:``,trait:`rage,fearless`,page:`220`,statblock:`AC 12 (leather), HP 10, ATK 1 spear (close/near) +1 (1d6) or 1 longbow (far) +1 (1d8), MV near, S+1, D +1, C +1, I -1, W +0, Ch -1, AL C, LV 2`},{name:`GNOME, DEEP`,tags:`humanoid`,level:`3`,biome:`cave,deeps,ruins`,alignment:`L`,move:``,attack:``,effect:``,trait:`invisibility`,page:`220`,statblock:`AC 14 (leather + shield), HP 14, ATK 1 pick +3 (1d6) or 1 dart (near) +2 (1d4), MV near, S +2, D +1, C +1, I +1, W +1, Ch +1, AL L, LV 3`},{name:`GOBLIN`,tags:`humanoid`,level:`1`,biome:`*`,alignment:`C`,move:``,attack:``,effect:``,trait:`keen senses`,page:`221`,statblock:`AC 11, HP 5, ATK 1 club +0 (1d4) or 1 shortbow (far) +1 (1d4), MV near, S +0, D +1, C +1, I -1, W -1, Ch -2, AL C, LV 1`},{name:`GOBLIN, BOSS`,tags:`humanoid`,level:`4`,biome:`*`,alignment:`C`,move:``,attack:``,effect:``,trait:`keen senses`,page:`221`,statblock:`AC 14 (chainmail), HP 20, ATK 1 spear (close/near) +3 (1d6), MV near, S +2, D +1, C +2, I -1, W +0, Ch +1, AL C, LV 4`},{name:`GOBLIN, SHAMAN`,tags:`humanoid`,level:`4`,biome:`*`,alignment:`C`,move:``,attack:`poison,spell`,effect:``,trait:`keen senses`,page:`221`,statblock:`AC 12 (leather), HP 19, ATK 1 staff +0 (1d4) or 1 spell +3, MV near, S+0, D +1, C +1, I +0, W +2, Ch +1, AL C, LV 4`},{name:`GOLEM, CLAY`,tags:`golem,construct`,level:`8`,biome:`*`,alignment:`N`,move:``,attack:``,effect:``,trait:`immune: cold,immune: electricity,immune: fire,immune: non-magical damage`,page:`222`,statblock:`AC 14, HP 40, ATK 3 slam +6 (1d8), MV near, S +4, D +0, C +4, I-2, W +0, Ch -2, AL N, LV 8`},{name:`GOLEM, FLESH`,tags:`golem,construct`,level:`7`,biome:`*`,alignment:`N`,move:``,attack:``,effect:``,trait:`immune: cold,immune: electricity,immune: fire,immune: non-magical damage`,page:`222`,statblock:`AC 9, HP 35, ATK 3 slam +6 (1d8), MV near, S +4, D -1, C +4, I -1, W+1, Ch -3, AL N, LV 7`},{name:`GOLEM, IRON`,tags:`golem,construct`,level:`10`,biome:`*`,alignment:`N`,move:``,attack:`poison`,effect:``,trait:`immune: cold,immune: non-magical damage`,page:`222`,statblock:`AC 19, HP 49, ATK 3 slam +8 (2d8) or 1 poison breath, MV near, S +5, D -1, C +4, I -2, W +0, Ch -2, AL N, LV 10`},{name:`GOLEM, STONE`,tags:`golem,construct`,level:`8`,biome:`*`,alignment:`N`,move:``,attack:``,effect:`slow`,trait:`immune: cold,immune: electricity,immune: fire,immune: non-magical damage`,page:`222`,statblock:`AC 18, HP 40, ATK 3 slam +6 (1d10) and 1 slow, MV near, S +4, D -1, C +4, I -2, W +0, Ch -2, AL N, LV 8`},{name:`GORGON`,tags:`monstrosity`,level:`7`,biome:`ruins,tomb`,alignment:`C`,move:``,attack:`charge,petrify`,effect:`petrification`,trait:``,page:`223`,statblock:`AC 18, HP 33, ATK 2 gore +6 (2d8) or 1 charge or 1 petrifying breath, MV double near, S +4, D +0, C +2, I -3, W +1, Ch -3, AL C, LV 7`},{name:`GORILLA`,tags:`animal`,level:`4`,biome:`forest,jungle`,alignment:`N`,move:`climb`,attack:``,effect:``,trait:``,page:`223`,statblock:`AC 12, HP 20, ATK 2 rend +5 (2d6), MV near (climb), S +4, D +2, C +2, I -1, W +1, Ch -1, AL N, LV 4`},{name:`GRAY OOZE`,tags:`ooze`,level:`2`,biome:`cave,ruins,swamp,tomb`,alignment:`N`,move:`climb`,attack:`acid`,effect:`corrosion`,trait:`immune: acid,immune: cold,immune: fire`,page:`223`,statblock:`AC 11, HP 9, ATK 1 tentacle +2 (1d6), MV near (climb), S +1, D +1, C +0, I -4, W -3, Ch -4, AL N, LV 2`},{name:`GRICK`,tags:`monstrosity`,level:`4`,biome:`cave,ruins,swamp`,alignment:`N`,move:`climb`,attack:`grab`,effect:`immobilize`,trait:``,page:`223`,statblock:`AC 14, HP 19, ATK 1 beak +3 (1d8) and 1 tentacle +3 (1d6 + grab), MV near (climb), S +3, D +2, C +1, I -3, W +1, Ch -3, AL N, LV 4`},{name:`GRIFFON`,tags:`monstrosity`,level:`4`,biome:`grassland,river/coast`,alignment:`N`,move:`fly`,attack:``,effect:``,trait:``,page:`224`,statblock:`AC 12, HP 19, ATK 2 rend +4 (1d10), MV double near (fly), S +4, D +2, C +1, I -3, W +1, Ch -1, AL N, LV 4`},{name:`GRIMLOW`,tags:`monstrosity`,level:`9`,biome:`cave,forest,mountain`,alignment:`N`,move:``,attack:`grab`,effect:``,trait:``,page:`224`,statblock:`AC 12, HP 43, ATK 1 grab and 3 bite +6 (2d8), MV near, S +4, D +2, C +3, I -3, W +1, Ch -2, AL N, LV 9`},{name:`GUARD`,tags:`humanoid`,level:`1`,biome:`*`,alignment:`L`,move:``,attack:``,effect:``,trait:``,page:`224`,statblock:`AC 15 (chainmail + shield), HP 4, ATK 1 spear (close/near) +1 (1d6) or 1 longsword +1 (1d8), MV near, S +1, D +0, C +0, I +0, W +1, Ch +0, AL L, LV 1`},{name:`HAG, NIGHT`,tags:`fey`,level:`8`,biome:`deeps,forest,swamp`,alignment:`C`,move:``,attack:``,effect:`blindness`,trait:`shape change`,page:`225`,statblock:`AC 14, HP 37, ATK 2 bite +6 (1d10) and 1 blind, MV near, S +4, D +2, C +1, I +2, W +3, Ch +3, AL C, LV 8`},{name:`HAG, SEA`,tags:`fey`,level:`6`,biome:`ocean,river/coast`,alignment:`C`,move:`swim`,attack:``,effect:`fear`,trait:`shape change`,page:`225`,statblock:`AC 15, HP 28, ATK 2 claw +4 (1d8), MV near (swim), S +2, D +3, C +1, I+1, W +2, Ch +2, AL C, LV 6`},{name:`HAG, WEALD`,tags:`fey`,level:`6`,biome:`forest,jungle`,alignment:`C`,move:``,attack:`drain health`,effect:``,trait:`shape change`,page:`225`,statblock:`AC 14, HP 28, ATK 2 claw +4 (1d8) or 1 drink pain, MV near, S +3, D+2, C +1, I +1, W +2, Ch +3, AL C, LV 6`},{name:`HARPY`,tags:`monstrosity`,level:`3`,biome:`arctic,forest,mountain`,alignment:`C`,move:`fly`,attack:`sonic`,effect:`daze`,trait:``,page:`226`,statblock:`AC 13, HP 14, ATK 2 claw +3 (1d6) or 1 song, MV near (fly), S +1, D +3, C +1, I +0, W +0, Ch +1, AL C, LV 3`},{name:`HELL HOUND`,tags:`fiend`,level:`4`,biome:`*`,alignment:`C`,move:``,attack:`fire`,effect:``,trait:`immune: fire`,page:`226`,statblock:`AC 13, HP 19, ATK 2 bite +4 (1d8) or 1 fire breath, MV double near, S +2, D +1, C +1, I -2, W +1, Ch -3, AL C, LV 4`},{name:`HIPPOGRIFF`,tags:`monstrosity`,level:`3`,biome:`forest,grassland,river/coast`,alignment:`N`,move:`fly`,attack:``,effect:``,trait:``,page:`226`,statblock:`AC 13, HP 14, ATK 2 rend +3 (1d8), MV double near (fly), S +3, D +3, C+1, I -3, W +1, Ch -2, AL N, LV 3`},{name:`HIPPOPOTAMUS`,tags:`animal`,level:`5`,biome:`river/coast,swamp`,alignment:`N`,move:`swim`,attack:``,effect:``,trait:``,page:`226`,statblock:`AC 12, HP 24, ATK 2 bite +4 (1d10), MV near (swim), S +4, D +0, C +2, I -3, W +0, Ch -3, AL N, LV 5`},{name:`HOBGOBLIN`,tags:`humanoid`,level:`2`,biome:`*`,alignment:`C`,move:``,attack:``,effect:``,trait:``,page:`227`,statblock:`AC 15 (chainmail + shield), HP10, ATK 1 longsword +3 (1d8) or 1 longbow (far) +0 (1d8), MV near, S +3, D +0, C +1, I +2, W +1, Ch +1, AL C, LV 2`},{name:`HORSE`,tags:`animal`,level:`2`,biome:`forest,grassland,river/coast`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`227`,statblock:`AC 11, HP 11, ATK 1 hooves +3 (1d6), MV double near, S +3, D +1, C +2, I -3, W +1, Ch -2, AL N, LV 2`},{name:`HYDRA`,tags:`monstrosity`,level:`*`,biome:`deeps,ocean,river/coast,swamp`,alignment:`N`,move:`swim`,attack:``,effect:``,trait:``,page:`227`,statblock:`AC 15, HP *, ATK 1 bite (near) +6 (1d8), MV near (swim), S +5, D +1, C +2, I -2, W +1, Ch -2, AL N, LV *`},{name:`INVISIBLE STALKER`,tags:`elemental`,level:`6`,biome:`*`,alignment:`N`,move:`fly`,attack:``,effect:``,trait:`invisibility`,page:`227`,statblock:`AC 13, HP 29, ATK 3 pummel +4 (1d6), MV near (fly), S +2, D +3, C+2, I +2, W +1, Ch +0, AL N, LV 6`},{name:`JELLYFISH`,tags:`animal`,level:`0`,biome:`ocean`,alignment:`N`,move:`swim`,attack:`toxin`,effect:`paralysis`,trait:``,page:`228`,statblock:`AC 11, HP 1, ATK 1 sting +1 (1 + toxin), MV close (swim), S -4, D+1, C +0, I -4, W +1, Ch -4, AL N, LV 0`},{name:`KNIGHT`,tags:`humanoid`,level:`3`,biome:`*`,alignment:`L`,move:``,attack:``,effect:``,trait:``,page:`228`,statblock:`AC 17 (plate mail + shield), HP 14, ATK 2 bastard sword +3 (1d8), MV near, S +3, D +0, C +1, I +0, W +0, Ch +1, AL L, LV 3`},{name:`KOBOLD`,tags:`humanoid`,level:`0`,biome:`*`,alignment:`C`,move:``,attack:``,effect:``,trait:`dodge`,page:`228`,statblock:`AC 13 (leather), HP 1, ATK 1 spear (close/near) +0 (1d6), MV near, S-2, D +2, C +0, I -1, W +0, Ch -1, AL C, LV 0`},{name:`KOBOLD, SORCERER`,tags:`humanoid`,level:`3`,biome:`*`,alignment:`C`,move:``,attack:`spell`,effect:``,trait:`dodge`,page:`228`,statblock:`AC 13 (leather), HP 13, ATK 1 club +1 (1d4) or 1 spell +2, MV near, S-2, D +2, C +0, I -1, W +1, Ch +2, AL C, LV 3`},{name:`KRAKEN`,tags:`monstrosity,giant`,level:`17`,biome:`ocean`,alignment:`C`,move:`swim`,attack:`electric`,effect:``,trait:`immune: electricity`,page:`229`,statblock:`AC 18, HP 80, ATK 4 tentacle (near) +9 (2d12) or 1 storm or 1d4 lightning bolt, MV double near (swim), S +6, D +3, C +4, I +4, W+3, Ch +4, AL C, LV 17`},{name:`LEECH, GIANT`,tags:`animal,giant`,level:`2`,biome:`deeps,river/coast,swamp`,alignment:`N`,move:`swim`,attack:``,effect:``,trait:``,page:`229`,statblock:`AC 9, HP 10, ATK 1 bite +1 (1d4 + attach), MV near (swim), S +1, D -1, C +1, I -3, W -1, Ch -3, AL N, LV 2`},{name:`LEPRECHAUN`,tags:`fey`,level:`4`,biome:`forest`,alignment:`N`,move:``,attack:`spell`,effect:``,trait:`keen senses,spell resistance,illusion,invisibility`,page:`230`,statblock:`AC 13, HP 19, ATK 1 spell +4, MV near, S +1, D +3, C +1, I +2, W +1, Ch +3, AL N, LV 4`},{name:`LICH`,tags:`undead`,level:`13`,biome:`*`,alignment:`C`,move:``,attack:`spell`,effect:`paralysis`,trait:`fearless,immune: non-magical damage`,page:`230`,statblock:`AC 16, HP 62, ATK 2 touch +6 (2d8 + paralysis) and 2 spell +7, MV near, S +3, D +1, C +4, I +4, W+3, Ch +3, AL C, LV 13`},{name:`LION`,tags:`animal`,level:`3`,biome:`grassland,mountain,river/coast`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`231`,statblock:`AC 12, HP 15, ATK 2 rend +4 (1d8), MV near, S +4, D +2, C +2, I -3, W+1, Ch -3, AL N, LV 3`},{name:`LIZARDFOLK`,tags:`humanoid`,level:`2`,biome:`cave,deeps,desert,jungle,river/coast,swamp`,alignment:`C`,move:`swim`,attack:``,effect:``,trait:``,page:`231`,statblock:`AC 14 (leather + shield), HP 11, ATK 1 spear (close/near) +2 (1d6), MV near (swim), S +1, D +1, C +2, I-1, W +1, Ch -2, AL C, LV 2`},{name:`MAGE`,tags:`humanoid`,level:`6`,biome:`*`,alignment:`L`,move:``,attack:`spell`,effect:``,trait:``,page:`231`,statblock:`AC 11, HP 27, ATK 1 spell +5, MV near, S -1, D +1, C +0, I +3, W +1, Ch+0, AL L, LV 6`},{name:`MAMMOTH`,tags:`animal`,level:`9`,biome:`arctic,grassland`,alignment:`N`,move:``,attack:`charge`,effect:``,trait:`immune: cold`,page:`231`,statblock:`AC 15, HP 44, ATK 2 tusks +7 (1d12), MV near, S +5, D +0, C +4, I-2, W +1, Ch +0, AL N, LV 9`},{name:`MANTA RAY, GIANT`,tags:`animal,giant`,level:`8`,biome:`ocean`,alignment:`N`,move:`swim`,attack:`toxin`,effect:`reduced to zero HP`,trait:``,page:`232`,statblock:`AC 13, HP 37, ATK 2 sting +5 (1d12 + poison), MV double near (swim), S +3, D +3, C +1, I -2, W +1, Ch -3, AL N, LV 8`},{name:`MANTICORE`,tags:`monstrosity`,level:`6`,biome:`cave,desert,grassland,mountain`,alignment:`C`,move:`fly`,attack:``,effect:``,trait:``,page:`232`,statblock:`AC 14, HP 29, ATK 2 rend +6 (2d6) or 2 tail spike (far) +4 (1d8), MV double near (fly), S +4, D +2, C +2, I -2, W +1, Ch -2, AL C, LV 6`},{name:`MASTIFF`,tags:`animal`,level:`1`,biome:`desert,forest,grassland,river/coast`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`232`,statblock:`AC 11, HP 4, ATK 1 bite +1 (1d6), MV near, S +1, D +1, C +0, I -2, W+1, Ch -2, AL N, LV 1`},{name:`MEDUSA`,tags:`monstrosity`,level:`8`,biome:`jungle,ruins,swamp,tomb`,alignment:`C`,move:``,attack:`petrify,toxin`,effect:`reduced to zero HP,petrification`,trait:``,page:`232`,statblock:`AC 14, HP 38, ATK 1 snake bite +6 (1d6 + poison), MV near, S +2, D+1, C +2, I +2, W +3, Ch +4, AL C, LV 8`},{name:`MERFOLK`,tags:`humanoid`,level:`2`,biome:`ocean`,alignment:`L`,move:`swim`,attack:``,effect:``,trait:``,page:`232`,statblock:`AC 11, HP 9, ATK 1 spear (close/near) +2 (1d6), MV near (swim), S+1, D +1, C +0, I +0, W +1, Ch +1, AL L, LV 2`},{name:`MIMIC`,tags:`monstrosity`,level:`5`,biome:`cave,ruins,tomb`,alignment:`N`,move:``,attack:``,effect:`stick`,trait:``,page:`232`,statblock:`AC 12, HP 23, ATK 2 bite +5 (1d8 + stick), MV near, S +2, D +0, C +1, I-2, W +0, Ch -3, AL N, LV 5`},{name:`MINOTAUR`,tags:`monstrosity`,level:`7`,biome:`cave,deeps,mountain,ruins`,alignment:`C`,move:``,attack:`charge`,effect:``,trait:``,page:`233`,statblock:`AC 14 (chainmail), HP 34, ATK 2 greataxe +6 (1d10) and 1 horns +6 (1d12), MV near, S +4, D +1, C +3, I+1, W +2, Ch +1, AL C, LV 7`},{name:`MOOSE`,tags:`animal`,level:`4`,biome:`arctic,grassland`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`233`,statblock:`AC 11, HP 19, ATK 2 antler +3 (1d6), MV double near, S +3, D +0, C +1, I-2, W +0, Ch -2, AL N, LV 4`},{name:`MORDANTICUS THE FLAYED`,tags:`legendary`,level:`19`,biome:`*`,alignment:`N`,move:``,attack:`spell,toxin`,effect:`reduced to zero HP`,trait:``,page:`234`,statblock:`AC 17, HP 89, ATK 1 rot touch +8 (1d10 + necrosis) and 3 spell +8, MV near, S +4, D +4, C +4, I +5, W +4, Ch +5, AL N, LV 19`},{name:`MUMMY`,tags:`undead`,level:`10`,biome:`*`,alignment:`C`,move:``,attack:`toxin`,effect:`reduced to zero HP`,trait:`desiccated,fearless,immune: non-magical damage`,page:`236`,statblock:`AC 13, HP 47, ATK 3 rot touch +8 (1d10 + necrosis), MV near, S +3, D+0, C +2, I +3, W +2, Ch +3, AL C, LV 10`},{name:`MUSHROOMFOLK`,tags:`humanoid,plant`,level:`3`,biome:`cave,deeps,jungle,ruins,swamp`,alignment:`N`,move:``,attack:``,effect:``,trait:`telepathic,sunblind`,page:`236`,statblock:`AC 13, HP 15, ATK 2 slam +2 (1d6), MV near, S +2, D -1, C +2, I +0, W+1, Ch +0, AL N, LV 3`},{name:`NAGA`,tags:`monstrosity`,level:`9`,biome:`desert,jungle,swamp`,alignment:`C`,move:`climb`,attack:`spell,toxin`,effect:`paralysis`,trait:``,page:`237`,statblock:`AC 16, HP 43, ATK 2 bite +7 (2d6 + poison) and 1 spell +7, MV near (climb), S +4, D +1, C +3, I +2, W+2, Ch +4, AL C, LV 9`},{name:`NAGA, BONE`,tags:`monstrosity`,level:`6`,biome:`desert,jungle,ocean,ruins,tomb`,alignment:`C`,move:`burrow`,attack:``,effect:``,trait:`fearless,immune: non-magical damage,immune: non-silvered weapons`,page:`237`,statblock:`AC 13, HP 31, ATK 2 bite +5 (2d6), MV near (burrow, climb), S +3, D+2, C +4, I -3, W +0, Ch +4, AL C, LV 6`},{name:`NIGHTMARE`,tags:`fiend`,level:`6`,biome:`*`,alignment:`C`,move:`fly`,attack:``,effect:``,trait:`immune: fire`,page:`237`,statblock:`AC 13, HP 29, ATK 2 hooves +5 (1d8), MV double near (fly), S +3, D +3, C +2, I -1, W +1, Ch -2, AL C, LV 6`},{name:`OBE-IXX OF AZARUMME`,tags:`legendary,undead`,level:`16`,biome:`*`,alignment:`C`,move:``,attack:`blood drain,charm`,effect:`charm`,trait:`fearless,immune: non-magical damage,shape change`,page:`238`,statblock:`AC 18 (+3 plate mail), HP 76, ATK 4 greatsword (near) +11 (1d12 + 2 + Moonbite properties) and 1 bite +9 (1d8 + blood drain) and 1 charm, MV near (climb, fly), S +5, D +3, C +4, I +3, W +4, Ch +5, AL C, LV 16`},{name:`OCHRE JELLY`,tags:`ooze`,level:`4`,biome:`cave,ruins,tomb`,alignment:`N`,move:`climb`,attack:`acid`,effect:``,trait:`split`,page:`239`,statblock:`AC 9, HP 20, ATK 2 tentacle +3 (1d6), MV near (climb), S +2, D -1, C +2, I -4, W -3, Ch -4, AL N, LV 4`},{name:`OCTOPUS, GIANT`,tags:`animal,giant`,level:`5`,biome:`ocean`,alignment:`N`,move:`swim`,attack:`grab,ink`,effect:`blindness`,trait:``,page:`239`,statblock:`AC 13, HP 23, ATK 2 tentacle (near) +4 (1d8 + grab), MV near (swim), S +3, D +3, C +1, I -2, W +1, Ch -3, AL N, LV 5`},{name:`OGRE`,tags:`giant`,level:`6`,biome:`arctic,forest,mountain,ruins,swamp`,alignment:`C`,move:``,attack:``,effect:``,trait:``,page:`239`,statblock:`AC 9, HP 30, ATK 2 greatclub +6 (2d6), MV near, S +4, D -1, C +3, I-2, W -2, Ch -2, AL C, LV 6`},{name:`ONI`,tags:`giant`,level:`7`,biome:`*`,alignment:`C`,move:``,attack:`cold,spell`,effect:``,trait:`shape change`,page:`239`,statblock:`AC 11, HP 33, ATK 1 glaive (near) +6 (1d10) or 1 spell +5, MV near, S+5, D +1, C +2, I +2, W +1, Ch +3, AL C, LV 7`},{name:`ORC`,tags:`humanoid`,level:`1`,biome:`*`,alignment:`C`,move:``,attack:``,effect:``,trait:`rage,fearless`,page:`240`,statblock:`AC 15 (chainmail + shield), HP 4, ATK 1 greataxe +2 (1d8), MV near, S +2, D +0, C +0, I -1, W +0, Ch -1, AL C, LV 1`},{name:`ORC, CHIEFTAIN`,tags:`humanoid`,level:`4`,biome:`*`,alignment:`C`,move:``,attack:``,effect:``,trait:`rage,fearless`,page:`240`,statblock:`AC 14 (chainmail), HP 19, ATK 2 greataxe +4 (1d10), MV near, S +2, D +1, C +1, I -1, W +0, Ch -1, AL C, LV 4`},{name:`OTYUGH`,tags:`aberration`,level:`7`,biome:`cave,forest,swamp`,alignment:`N`,move:``,attack:`disease`,effect:``,trait:``,page:`240`,statblock:`AC 13, HP 35, ATK 2 tentacle +5 (1d8) and 1 bite +5 (1d10 + disease), MV near, S +4, D -1, C+4, I -2, W +0, Ch -3, AL N, LV 7`},{name:`OWLBEAR`,tags:`monstrosity`,level:`6`,biome:`arctic,forest,ruins`,alignment:`N`,move:`climb`,attack:`crush`,effect:``,trait:``,page:`242`,statblock:`AC 13, HP 30, ATK 2 claw +5 (1d10), MV near (climb), S +4, D +1, C +3, I -2, W +2, Ch -3, AL N, LV 6`},{name:`PANTHER`,tags:`animal`,level:`3`,biome:`forest,jungle`,alignment:`N`,move:`climb`,attack:``,effect:``,trait:``,page:`242`,statblock:`AC 14, HP 14, ATK 2 rend +3 (1d6), MV near (climb), S +3, D +4, C +1, I-2, W +1, Ch -3, AL N, LV 3`},{name:`PEASANT`,tags:`humanoid`,level:`1`,biome:`*`,alignment:`L`,move:``,attack:``,effect:``,trait:``,page:`242`,statblock:`AC 10, HP 4, ATK 1 club +0 (1d4), MV near, S +0, D +0, C +0, I +0, W+0, Ch +0, AL L, LV 1`},{name:`PEGASUS`,tags:`celestial`,level:`3`,biome:`grassland,mountain,river/coast`,alignment:`N`,move:`fly`,attack:``,effect:``,trait:``,page:`242`,statblock:`AC 12, HP 15, ATK 2 hooves +3 (1d6), MV double near (fly), S +3, D +2, C +2, I -3, W +1, Ch +0, AL N, LV 3`},{name:`PHOENIX`,tags:`elemental`,level:`13`,biome:`*`,alignment:`L`,move:`fly`,attack:``,effect:``,trait:`aura,immune: fire`,page:`243`,statblock:`AC 16, HP 60, ATK 4 rend +8 (2d12), MV double near (fly), S +3, D +4, C +2, I +3, W +3, Ch +3, AL L, LV 13`},{name:`PIRANHA, SWARM`,tags:`swarm`,level:`3`,biome:`river/coast`,alignment:`N`,move:`swim`,attack:``,effect:``,trait:``,page:`243`,statblock:`AC 12, HP 13, ATK 2 bite +2 (1d6), MV near (swim), S -2, D +2, C +0, I-3, W +0, Ch -3, AL N, LV 3`},{name:`PIRATE`,tags:`humanoid`,level:`1`,biome:`ocean,river/coast`,alignment:`C`,move:``,attack:``,effect:``,trait:``,page:`243`,statblock:`AC 12 (leather), HP 4, ATK 1 cutlass +1 (1d6) or 1 dagger (close/near) +1 (1d4), MV near, S +1, D +1, C +0, I +0, W +0, Ch +0, AL C, LV 1`},{name:`PLESIOSAURUS`,tags:`dinosaur`,level:`6`,biome:`ocean`,alignment:`N`,move:`swim`,attack:``,effect:``,trait:``,page:`208`,statblock:`AC 13, HP 30, ATK 2 bite +5 (2d8), MV double near (swim), S +4, D +3, C +3, I -3, W +1, Ch -3, AL N, LV 6`},{name:`PRIEST`,tags:`humanoid`,level:`5`,biome:`*`,alignment:`L`,move:``,attack:`spell`,effect:``,trait:``,page:`243`,statblock:`AC 15 (chainmail + shield), HP 23, ATK 2 mace +3 (1d6) or 1 spell +3, MV near, S +1, D +0, C +1, I +0, W+2, Ch +1, AL L, LV 5`},{name:`PRIMORDIAL SLIME`,tags:`outsider,ooze`,level:`6`,biome:`deeps`,alignment:`C`,move:`climb`,attack:`acid`,effect:``,trait:`corrosive`,page:`241`,statblock:`AC 9, HP 30, ATK 2 tentacle +4 (1d10 + dissolve), MV near (climb), S +3, D +2, C +3, I -4, W -3, Ch -4, AL C, LV 6`},{name:`PTERODACTYL`,tags:`dinosaur`,level:`4`,biome:`grassland,jungle`,alignment:`N`,move:`fly`,attack:`grab`,effect:``,trait:``,page:`208`,statblock:`AC 14, HP 20, ATK 2 beak +4 (1d8 + grab), MV double near (fly), S+2, D +4, C +2, I -2, W +1, Ch -3, AL N, LV 4`},{name:`PURPLE WORM`,tags:`monstrosity`,level:`12`,biome:`arctic,deeps,desert`,alignment:`N`,move:`burrow`,attack:`swallow,toxin`,effect:`reduced to zero HP`,trait:``,page:`244`,statblock:`AC 18, HP 57, ATK 2 bite +9 (2d12 + swallow) and 1 sting +9 (1d10 + poison), MV double near (burrow), S +5, D +1, C +3, I -3, W+1, Ch -3, AL N, LV 12`},{name:`RAKSHASA`,tags:`fiend`,level:`8`,biome:`*`,alignment:`C`,move:``,attack:``,effect:``,trait:`immune: non-magical damage,spell resistance,telepathic,illusion`,page:`244`,statblock:`AC 16, HP 39, ATK 2 claw +6 (1d8), MV near, S +1, D +3, C +3, I +3, W+3, Ch +4, AL C, LV 8`},{name:`RAT`,tags:`animal`,level:`0`,biome:`*`,alignment:`N`,move:``,attack:`disease`,effect:``,trait:``,page:`245`,statblock:`AC 10, HP 1, ATK 1 bite +0 (1 + disease), MV near, S -3, D +0, C +1, I -3, W +1, Ch -3, AL N, LV 0`},{name:`RAT, DIRE`,tags:`animal,dire`,level:`2`,biome:`*`,alignment:`N`,move:``,attack:`disease`,effect:``,trait:``,page:`245`,statblock:`AC 12, HP 10, ATK 1 bite +2 (1d6 + disease), MV near, S +1, D +2, C +1, I -2, W +1, Ch -2, AL N, LV 2`},{name:`RAT, GIANT`,tags:`animal,giant`,level:`1`,biome:`*`,alignment:`N`,move:``,attack:`disease`,effect:``,trait:``,page:`245`,statblock:`AC 11, HP 5, ATK 1 bite +1 (1d4 + disease), MV near, S -2, D +1, C +1, I -2, W +1, Ch -2, AL N, LV 1`},{name:`RAT, SWARM`,tags:`animal,swarm`,level:`6`,biome:`*`,alignment:`N`,move:``,attack:`disease`,effect:``,trait:``,page:`245`,statblock:`AC 10, HP 28, ATK 4 bite +0 (1 + disease), MV near, S -3, D +0, C +1, I -3, W +1, Ch -3, AL N, LV 6`},{name:`RATHGAMNON`,tags:`legendary`,level:`19`,biome:`*`,alignment:`L`,move:`fly`,attack:`sonic,spell`,effect:`blindness`,trait:`immune: non-magical damage,spell resistance`,page:`246`,statblock:`AC 17, HP 89, ATK 2 rend (near) +9 (2d10) and 2 spell +8, MV double near (fly), S +5, D +3, C +4, I +5, W +6, Ch +5, AL L, LV 19`},{name:`REAVER`,tags:`humanoid`,level:`6`,biome:`arctic,mountain`,alignment:`C`,move:``,attack:``,effect:``,trait:``,page:`247`,statblock:`AC 17 (plate mail + shield), HP 28, ATK 3 bastard sword +4 (1d8 + 2), MV near, S +3, D +0, C +1, I +0, W+0, Ch +2, AL C, LV 6`},{name:`REMORHAZ`,tags:`insect`,level:`10`,biome:`arctic`,alignment:`N`,move:`burrow`,attack:`swallow`,effect:``,trait:`immune: cold,immune: fire,melt`,page:`247`,statblock:`AC 16, HP 47, ATK 3 bite +7 (2d6 + swallow), MV near (burrow), S+5, D +1, C +2, I -3, W +1, Ch -3, AL N, LV 10`},{name:`RHINOCEROS`,tags:`animal`,level:`5`,biome:`grassland`,alignment:`N`,move:``,attack:`charge`,effect:``,trait:``,page:`248`,statblock:`AC 14, HP 25, ATK 2 horn +4 (1d8), MV near, S +4, D -1, C +3, I -3, W+0, Ch -3, AL N, LV 5`},{name:`RIME WALKER`,tags:`outsider`,level:`9`,biome:`arctic`,alignment:`C`,move:`fly`,attack:`cold`,effect:``,trait:`aura,immune: cold`,page:`241`,statblock:`AC 16, HP 43, ATK 4 claw +8 (1d12), MV near (fly), S +4, D +4, C+3, I +2, W +2, Ch +2, AL C, LV 9`},{name:`ROC`,tags:`monstrosity,giant`,level:`15`,biome:`arctic,grassland,mountain`,alignment:`N`,move:`fly`,attack:`grab`,effect:``,trait:``,page:`248`,statblock:`AC 15, HP 69, ATK 4 rend +9 (2d10 + grab), MV double near (fly), S+5, D +3, C +2, I -2, W +2, Ch -2, AL N, LV 15`},{name:`ROPER`,tags:`monstrosity`,level:`6`,biome:`deeps`,alignment:`N`,move:`climb`,attack:`grab`,effect:``,trait:`immune: non-magical damage`,page:`248`,statblock:`AC 14, HP 31, ATK 4 tendril (double near) +4 (1d6 + grab) and 1 bite +4 (2d8), MV close (climb), S +3, D -2, C +4, I -1, W +2, Ch +1, AL N, LV 6`},{name:`ROT FLOWER`,tags:`plant`,level:`2`,biome:`jungle,tomb`,alignment:`N`,move:``,attack:`toxin`,effect:`unconscious`,trait:``,page:`249`,statblock:`AC 9, HP 10, ATK 1 bite +1 (1d4 + toxin), MV none, S +1, D -3, C +1, I-4, W -3, Ch -4, AL N, LV 2`},{name:`RUST MONSTER`,tags:`monstrosity`,level:`4`,biome:`cave,deeps,desert,ruins,tomb`,alignment:`N`,move:`climb`,attack:``,effect:``,trait:`corrosive`,page:`249`,statblock:`AC 13, HP 19, ATK 2 claw +3 (1d6), MV near (climb), S +2, D +3, C +1, I-3, W +1, Ch -3, AL N, LV 4`},{name:`SAHUAGIN`,tags:`humanoid`,level:`2`,biome:`ocean,river/coast`,alignment:`C`,move:`swim`,attack:``,effect:``,trait:``,page:`249`,statblock:`AC 14 (leather + shield), HP 9, ATK 2 trident (near) +1 (1d6), MV near (swim), S +1, D +1, C +0, I -1, W +0, Ch -1, AL C, LV 2`},{name:`SALAMANDER`,tags:`elemental`,level:`5`,biome:`desert,mountain`,alignment:`C`,move:``,attack:`fire`,effect:``,trait:`aura,immune: fire`,page:`249`,statblock:`AC 13, HP 24, ATK 2 flaming spear (close/near) +4 (1d6, ignites flammables) or 1 iron longbow (far) +2 (1d8), MV near, S +2, D +0, C +2, I -1, W +1, Ch -1, AL C, LV 5`},{name:`SCARAB, SWARM`,tags:`insect,swarm`,level:`3`,biome:`desert,ruins,tomb`,alignment:`N`,move:`fly`,attack:``,effect:``,trait:``,page:`249`,statblock:`AC 13, HP 14, ATK 2 bite +3 (1d6), MV near (fly), S -1, D +3, C +1, I -3, W +0, Ch -3, AL N, LV 3`},{name:`SCARECROW`,tags:`undead`,level:`3`,biome:`*`,alignment:`C`,move:``,attack:`sonic`,effect:`paralysis`,trait:``,page:`249`,statblock:`AC 12, HP 15, ATK 2 claws +2 (1d6) or 1 scream, MV near, S +2, D +2, C +2, I +0, W +0, Ch +2, AL C, LV 3`},{name:`SCORPION`,tags:`insect`,level:`0`,biome:`desert,jungle`,alignment:`N`,move:`climb`,attack:`venom`,effect:`reduced to zero HP`,trait:``,page:`250`,statblock:`AC 11, HP 1, ATK 1 sting +1 (1 + poison), MV near (climb), S -4, D+1, C +0, I -4, W +0, Ch -4, AL N, LV 0`},{name:`SCORPION, GIANT`,tags:`insect,giant`,level:`3`,biome:`deeps,desert,jungle`,alignment:`N`,move:`climb`,attack:`grab,venom`,effect:`reduced to zero HP`,trait:``,page:`250`,statblock:`AC 14, HP 13, ATK 1 claw +2 (1d6 + grab) and 1 sting +2 (1d4 + poison), MV near (climb), S +2, D+2, C +0, I -4, W +0, Ch -4, AL N, LV 3`},{name:`SHADOW`,tags:`undead`,level:`3`,biome:`*`,alignment:`C`,move:`fly`,attack:`drain stat`,effect:`drain:strength`,trait:``,page:`250`,statblock:`AC 12, HP 15, ATK 2 touch +2 (1d4 + drain), MV near (fly), S -4, D +2, C +2, I -2, W +0, Ch -1, AL C, LV 3`},{name:`SHAMBLING MOUND`,tags:`plant`,level:`4`,biome:`forest,swamp`,alignment:`N`,move:``,attack:`engulf`,effect:``,trait:`immune: fire`,page:`251`,statblock:`AC 14, HP 20, ATK 2 slam +3 (1d6 + engulf), MV near, S +3, D -2, C+2, I -3, W +0, Ch -3, AL N, LV 4`},{name:`SHARK`,tags:`animal`,level:`3`,biome:`ocean`,alignment:`N`,move:`swim`,attack:``,effect:``,trait:``,page:`251`,statblock:`AC 11, HP 15, ATK 1 bite +3 (1d10), MV near (swim), S +3, D +1, C +2, I-3, W +1, Ch -3, AL N, LV 3`},{name:`SHARK, MEGALODON`,tags:`dinosaur`,level:`8`,biome:`ocean`,alignment:`N`,move:`swim`,attack:``,effect:``,trait:`fearless`,page:`251`,statblock:`AC 13, HP 38, ATK 3 bite +7 (2d8), MV double near (swim), S +5, D +1, C +2, I -3, W +1, Ch -3, AL N, LV 8`},{name:`SIREN`,tags:`fey`,level:`4`,biome:`ocean`,alignment:`C`,move:``,attack:`sonic`,effect:`paralysis`,trait:``,page:`251`,statblock:`AC 12, HP 18, ATK 2 claw +2 (1d6) or 1 song, MV near (swim, fly), S+0, D +2, C +0, I +2, W +2, Ch +4, AL C, LV 4`},{name:`SKELETON`,tags:`undead`,level:`2`,biome:`*`,alignment:`C`,move:``,attack:``,effect:``,trait:`fearless`,page:`251`,statblock:`AC 13 (chainmail), HP 11, ATK 1 shortsword +1 (1d6) or 1 shortbow (far) +0 (1d4), MV near, S +1, D +0, C +2, I -2, W +0, Ch -1, AL C, LV 2`},{name:`SMILODON`,tags:`animal`,level:`3`,biome:`arctic,grassland`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`251`,statblock:`AC 12, HP 14, ATK 2 bite +3 (1d6), MV near, S +3, D +2, C +1, I -3, W+1, Ch -3, AL N, LV 3`},{name:`SNAKE, COBRA`,tags:`animal`,level:`1`,biome:`desert`,alignment:`N`,move:``,attack:`venom`,effect:`reduced to zero HP`,trait:``,page:`252`,statblock:`AC 12, HP 4, ATK 1 bite +2 (1 + poison), MV near, S -3, D +2, C +0, I -3, W +0, Ch -3, AL N, LV 1`},{name:`SNAKE, GIANT`,tags:`animal,giant`,level:`5`,biome:`cave,desert,forest,grassland,jungle,river/coast,swamp`,alignment:`N`,move:`climb`,attack:`constrict`,effect:`immobilize`,trait:``,page:`252`,statblock:`AC 12, HP 23, ATK 2 bite +4 (1d6) and 1 constrict (near), MV near (climb), S +3, D +2, C +1, I -2, W +0, Ch -2, AL N, LV 5`},{name:`SNAKE, SWARM`,tags:`animal,swarm`,level:`4`,biome:`jungle,river/coast,swamp`,alignment:`N`,move:``,attack:`venom`,effect:`reduced to zero HP`,trait:``,page:`252`,statblock:`AC 12, HP 19, ATK 3 bite +2 (1d4 + poison), MV near, S -3, D +2, C +1, I -3, W +0, Ch -3, AL N, LV 4`},{name:`SOLDIER`,tags:`humanoid`,level:`2`,biome:`*`,alignment:`L`,move:``,attack:``,effect:``,trait:``,page:`252`,statblock:`AC 15 (chainmail + shield), HP10, ATK 1 longsword +2 (1d8) or 1 crossbow (far) +1 (1d6), MV near, S +1, D +0, C +1, I +0, W +0, Ch +0, AL L, LV 2`},{name:`SPHINX`,tags:`monstrosity`,level:`9`,biome:`desert,jungle`,alignment:`L`,move:`fly`,attack:`sonic,spell`,effect:`paralysis`,trait:``,page:`253`,statblock:`AC 16, HP 42, ATK 3 claw +7 (1d10) or 2 spell +5, MV double near (fly), S +4, D +1, C +2, I +4, W+4, Ch +3, AL L, LV 9`},{name:`SPIDER`,tags:`insect`,level:`0`,biome:`*`,alignment:`N`,move:`climb`,attack:`poison`,effect:``,trait:``,page:`254`,statblock:`AC 11, HP 1, ATK 2 bite +1 (1 + poison), MV near (climb), S -4, D+1, C +0, I -4, W +0, Ch -4, AL N, LV 0`},{name:`SPIDER, GIANT`,tags:`insect,giant`,level:`3`,biome:`arctic,cave,deeps,desert,forest,jungle,ruins`,alignment:`N`,move:`climb`,attack:`toxin`,effect:`paralysis`,trait:``,page:`254`,statblock:`AC 13, HP 13, ATK 1 bite +3 (1d4 + poison), MV near (climb), S +2, D +3, C +0, I -2, W +1, Ch -2, AL N, LV 3`},{name:`SPIDER, SWARM`,tags:`insect,swarm`,level:`2`,biome:`cave,forest,jungle,ruins,tomb`,alignment:`N`,move:`climb`,attack:`toxin`,effect:`paralysis`,trait:``,page:`254`,statblock:`AC 13, HP 9, ATK 1 bite +3 (1d4 + poison), MV near (climb), S -1, D+3, C +0, I -3, W +1, Ch -3, AL N, LV 2`},{name:`STINGBAT`,tags:`animal`,level:`1`,biome:`cave,forest,jungle,river/coast`,alignment:`N`,move:`fly`,attack:`blood drain`,effect:``,trait:``,page:`254`,statblock:`AC 12, HP 4, ATK 1 beak +2 (1d4 + blood drain), MV near (fly), S -2, D +2, C +0, I -2, W +0, Ch -2, AL N, LV 1`},{name:`STRANGLER`,tags:`monstrosity`,level:`3`,biome:`deeps,ruins`,alignment:`C`,move:`climb`,attack:``,effect:``,trait:`stealthy,surprise bonus`,page:`254`,statblock:`AC 12, HP 14, ATK 2 claws +2 (1d6), MV near (climb), S -2, D +2, C +1, I -2, W +0, Ch -2, AL C, LV 3`},{name:`THE TARRASQUE`,tags:`legendary`,level:`30`,biome:`*`,alignment:`N`,move:`burrow`,attack:`swallow`,effect:`sever`,trait:`immune: non-magical damage,spell resistance,immune: fire,immune: cold`,page:`256`,statblock:`AC 22, HP 140, ATK 4 thrash (near) +13 (3d10 + sever) and 1 bite (near) +13 (5d10 + sever + swallow), MV triple near (burrow, swim), S +7, D +2, C +5, I -3, W +1, Ch -3, AL N, LV 30`},{name:`THE TEN-EYED ORACLE`,tags:`legendary`,level:`18`,biome:`deeps`,alignment:`C`,move:`fly`,attack:`spell`,effect:`charm,confusion,reduced to zero HP,paralysis,petrification,sleep`,trait:`immune: non-magical damage,spell resistance`,page:`255`,statblock:`AC 17, HP 85, ATK 2d4 eyestalk ray, MV near (fly), S +4, D +5, C +4, I +5, W +4, Ch +4, AL C, LV 18`},{name:`THE WANDERING MERCHANT`,tags:`legendary`,level:`15`,biome:`*`,alignment:`L`,move:``,attack:``,effect:``,trait:`immune: non-magical damage,spell resistance`,page:`258`,statblock:`AC 16 (mithral chainmail), HP 71, ATK 4 +3 vorpal bastard sword +9 (1d10 + lop), MV near, S +3, D +3, C +4, I +3, W +4, Ch +5, AL L, LV 15`},{name:`THIEF`,tags:`humanoid`,level:`3`,biome:`*`,alignment:`N`,move:``,attack:``,effect:``,trait:`stealthy,surprise bonus`,page:`259`,statblock:`AC 13 (leather), HP 13, ATK 1 dagger (close/near) +2 (1d4) or 1 shortsword +0 (1d6), MV near, S+0, D +2, C +0, I +0, W +0, Ch +1, AL N, LV 3`},{name:`THUG`,tags:`humanoid`,level:`1`,biome:`*`,alignment:`C`,move:``,attack:``,effect:``,trait:``,page:`259`,statblock:`AC 13 (leather + shield), HP 4, ATK 1 shortsword +1 (1d6), MV near, S +1, D +0, C +0, I -1, W +1, Ch -1, AL C, LV 1`},{name:`TREANT`,tags:`plant`,level:`8`,biome:`arctic,forest,jungle,mountain`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`259`,statblock:`AC 14, HP 38, ATK 3 slam +8 (1d10) or 1 rock (far) +8 (2d12), MV near, S +4, D -1, C +2, I +2, W +3, Ch +1, AL N, LV 8`},{name:`TRICERATOPS`,tags:`dinosaur`,level:`7`,biome:`grassland,jungle`,alignment:`N`,move:``,attack:`charge`,effect:``,trait:``,page:`208`,statblock:`AC 17, HP 35, ATK 2 horns +6 (1d10) or 1 charge, MV near, S +4, D -1, C +4, I -3, W +1, Ch -3, AL N, LV 7`},{name:`TROLL`,tags:`giant`,level:`5`,biome:`cave,deeps,forest,jungle,mountain,river/coast`,alignment:`C`,move:``,attack:``,effect:``,trait:`regeneration`,page:`259`,statblock:`AC 12, HP 24, ATK 2 claw +4 (1d6) and 1 bite +4 (1d10), MV near, S+3, D +2, C +2, I -1, W +0, Ch -1, AL C, LV 5`},{name:`TROLL, FROST`,tags:`giant`,level:`7`,biome:`arctic`,alignment:`C`,move:``,attack:``,effect:``,trait:`immune: acid,immune: cold,immune: fire,regeneration`,page:`260`,statblock:`AC 13, HP 34, ATK 2 claw +5 (1d8) and 1 bite +5 (1d12), MV near, S +3, D +2, C +3, I -1, W +0, Ch -1, AL C, LV 7`},{name:`TYRANNOSAURUS`,tags:`dinosaur`,level:`9`,biome:`grassland,jungle,swamp`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`208`,statblock:`AC 13, HP 44, ATK 3 bite +8 (2d12), MV double near, S +5, D +1, C +4, I -3, W +1, Ch -3, AL N, LV 9`},{name:`UNICORN`,tags:`celestial`,level:`4`,biome:`forest,grassland`,alignment:`L`,move:``,attack:``,effect:``,trait:``,page:`260`,statblock:`AC 12, HP 20, ATK 1 hooves +3 (1d6), MV double near, S +3, D +2, C +2, I +1, W +2, Ch +3, AL L, LV 4`},{name:`VAMPIRE`,tags:`undead`,level:`11`,biome:`*`,alignment:`C`,move:`climb`,attack:`blood drain,charm`,effect:`charm`,trait:`fearless,immune: non-magical damage,shape change`,page:`260`,statblock:`AC 15, HP 52, ATK 3 bite +7 (1d8 + blood drain) or 1 charm, MV near (climb), S +4, D +3, C +3, I +1, W+3, Ch +4, AL C, LV 11`},{name:`VAMPIRE SPAWN`,tags:`undead`,level:`5`,biome:`*`,alignment:`C`,move:`climb`,attack:`blood drain`,effect:``,trait:`fearless,immune: non-magical damage,immune: non-silvered weapons`,page:`261`,statblock:`AC 13 (leather), HP 25, ATK 2 bite +4 (1d8 + blood drain), MV near (climb), S +3, D +2, C +3, I -1, W +1, Ch +2, AL C, LV 5`},{name:`VELOCIRAPTOR`,tags:`dinosaur`,level:`2`,biome:`grassland,jungle`,alignment:`N`,move:``,attack:``,effect:``,trait:`surprise bonus`,page:`208`,statblock:`AC 13, HP 10, ATK 1 claw +3 (1d6), MV double near, S -1, D +3, C +1, I-2, W +1, Ch -3, AL N, LV 2`},{name:`VIOLET FUNGUS`,tags:`plant`,level:`2`,biome:`cave,forest,ruins,tomb`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`261`,statblock:`AC 7, HP 9, ATK 2 tendril (near) +0 (1d4), MV close, S -3, D -2, C +0, I -4, W -3, Ch -4, AL N, LV 2`},{name:`VIPERIAN`,tags:`monstrosity`,level:`3`,biome:`jungle`,alignment:`C`,move:``,attack:``,effect:``,trait:``,page:`262`,statblock:`AC 13, HP 13, ATK 2 scimitar +2 (1d6) or 1 javelin (close/far) +2 (1d4), MV near, S +1, D +1, C +0, I+0, W +1, Ch +0, AL C, LV 3`},{name:`VIPERIAN OPHID`,tags:`monstrosity`,level:`6`,biome:`jungle`,alignment:`C`,move:`climb`,attack:``,effect:``,trait:`immune: non-magical damage`,page:`262`,statblock:`AC 14, HP 28, ATK 3 falchion +5 (1d10) or 2 longbow (far) +3 (1d8), MV near (climb), S +4, D +2, C +1, I+1, W +1, Ch +1, AL C, LV 6`},{name:`VIPERIAN WIZARD`,tags:`monstrosity`,level:`8`,biome:`jungle`,alignment:`C`,move:``,attack:`spell`,effect:``,trait:``,page:`262`,statblock:`AC 13, HP 37, ATK 1 dagger (close/near) +2 (1d4) or 2 spell +5, MV near, S +0, D +1, C +0, I +3, W +1, Ch +1, AL C, LV 8`},{name:`VOID SPAWN`,tags:`outsider`,level:`7`,biome:`deeps`,alignment:`C`,move:`fly`,attack:`toxin`,effect:`paralysis`,trait:`immune: cold`,page:`241`,statblock:`AC 13, HP 34, ATK 2 scythe +6 (1d10) and 1 tentacles (1d12 + toxin), MV near (fly), S +4, D +1, C+3, I +0, W +1, Ch -1, AL C, LV 7`},{name:`VOID SPIDER`,tags:`outsider`,level:`5`,biome:`deeps`,alignment:`C`,move:`climb`,attack:`toxin`,effect:`reduced to zero HP`,trait:`immune: cold,incorporeal`,page:`241`,statblock:`AC 13, HP 23, ATK 2 bite +4 (1d8 + poison), MV near (climb), S +3, D +3, C +1, I -1, W +1, Ch -2, AL C, LV 5`},{name:`VULTURE`,tags:`animal`,level:`1`,biome:`desert`,alignment:`N`,move:`fly`,attack:``,effect:``,trait:``,page:`263`,statblock:`AC 10, HP 5, ATK 1 tear +1 (1d4), MV near (fly), S +1, D +0, C +1, I -3, W +1, Ch -3, AL N, LV 1`},{name:`WASP, GIANT`,tags:`insect,giant`,level:`2`,biome:`forest,ruins`,alignment:`N`,move:`fly`,attack:`venom`,effect:`reduced to zero HP`,trait:``,page:`263`,statblock:`AC 13, HP 9, ATK 1 sting +3 (1d6 + venom), MV near (fly), S +1, D +3, C +0, I -3, W +0, Ch -3, AL N, LV 2`},{name:`WERERAT`,tags:`humanoid`,level:`3`,biome:`tomb`,alignment:`C`,move:`climb`,attack:``,effect:`lycanthropy`,trait:`immune: non-magical damage,immune: non-silvered weapons`,page:`263`,statblock:`AC 13 (leather), HP 14, ATK 2 bite +2 (1d6), MV near (climb), S +1, D+2, C +1, I -1, W +1, Ch -1, AL C, LV 3`},{name:`WEREWOLF`,tags:`humanoid`,level:`4`,biome:`arctic,cave,desert,forest,grassland,jungle,mountain,river/coast,ruins,swamp,tomb`,alignment:`C`,move:``,attack:``,effect:`lycanthropy`,trait:`immune: non-magical damage,immune: non-silvered weapons`,page:`263`,statblock:`AC 12, HP 20, ATK 2 rend +3 (1d6), MV double near, S +3, D +2, C +2, I +0, W +1, Ch +0, AL C, LV 4`},{name:`WIGHT`,tags:`undead`,level:`3`,biome:`*`,alignment:`C`,move:``,attack:`life drain`,effect:``,trait:`fearless,immune: non-magical damage,immune: non-silvered weapons`,page:`263`,statblock:`AC 14 (chainmail), HP 15, ATK 1 bastard sword +3 (1d10) and 1 life drain +3, MV near, S +3, D +1, C +2, I +1, W +0, Ch +3, AL C, LV 3`},{name:`WILL-O'-WISP`,tags:`undead`,level:`2`,biome:`*`,alignment:`C`,move:`fly`,attack:`life drain`,effect:``,trait:``,page:`264`,statblock:`AC 13, HP 10, ATK 1 life drain +3, MV near (fly), S -3, D +3, C +1, I -1, W -1, Ch -2, AL C, LV 2`},{name:`WOLF`,tags:`animal`,level:`2`,biome:`desert,forest,grassland`,alignment:`N`,move:``,attack:``,effect:``,trait:`pack hunter`,page:`264`,statblock:`AC 12, HP 10, ATK 1 bite +2 (1d6), MV double near, S +2, D +2, C +1, I-2, W +1, Ch +0, AL N, LV 2`},{name:`WOLF, DIRE`,tags:`animal,dire`,level:`4`,biome:`desert,forest,grassland`,alignment:`N`,move:``,attack:``,effect:``,trait:`pack hunter`,page:`264`,statblock:`AC 12, HP 19, ATK 2 bite +4 (1d8), MV double near, S +3, D +2, C +1, I-1, W +1, Ch +0, AL N, LV 4`},{name:`WOLF, WINTER`,tags:`animal`,level:`5`,biome:`arctic,mountain`,alignment:`C`,move:``,attack:`cold`,effect:``,trait:`immune: cold`,page:`264`,statblock:`AC 12, HP 23, ATK 2 bite +4 (1d6) or 1 frost breath, MV double near, S +3, D +2, C +1, I +0, W +1, Ch +0, AL C, LV 5`},{name:`WORG`,tags:`monstrosity`,level:`3`,biome:`forest,grassland`,alignment:`C`,move:``,attack:``,effect:``,trait:``,page:`265`,statblock:`AC 11, HP 14, ATK 1 bite +3 (1d6), MV double near, S +2, D +1, C +1, I-2, W +1, Ch -2, AL C, LV 3`},{name:`WRAITH`,tags:`undead`,level:`8`,biome:`*`,alignment:`C`,move:`fly`,attack:`life drain`,effect:``,trait:`fearless,immune: non-magical damage,immune: non-silvered weapons,incorporeal`,page:`265`,statblock:`AC 14, HP 36, ATK 3 death touch +6 (1d10 + life drain), MV near (fly), S -4, D +4, C +0, I +0, W +0, Ch +3, AL C, LV 8`},{name:`WYVERN`,tags:`dragon`,level:`8`,biome:`arctic,cave,grassland,mountain`,alignment:`N`,move:`fly`,attack:`poison`,effect:``,trait:``,page:`265`,statblock:`AC 15, HP 37, ATK 2 rend +6 (1d8) and 1 stinger +6 (1d6 + poison), MV double near (fly), S +4, D +2, C +1, I -3, W +1, Ch -3, AL N, LV 8`},{name:`ZOMBIE`,tags:`undead`,level:`2`,biome:`*`,alignment:`C`,move:``,attack:``,effect:``,trait:`fearless`,page:`265`,statblock:`AC 8, HP 11, ATK 1 slam +2 (1d6), MV near, S +2, D -2, C +2, I -2, W -2, Ch -3, AL C, LV 2`}]}),(e,t)=>e===`rollType`&&typeof t==`string`?Jp[t]:t),b_={name:`Cursed Scrolls Monster Data`,rulesSection:``,description:``,entries:[{name:`BITTERMOLD`,tags:`humanoid`,level:`1`,biome:`forest,grassland,river/coast,ruins,swamp,tomb`,alignment:`C`,move:``,attack:``,effect:``,trait:`damage reduction`,page:`CS1-46`,statblock:`AC 12, HP 5, ATK 1 shortsword +1 (1d6) or 1 sling (far) +2 (1d4), MV near, S +1, D +2, C +1, I +0, W +0, Ch +0, AL C, LV 1`},{name:`BOGTHORN`,tags:`monstrosity`,level:`2`,biome:`cave,ruins,swamp,tomb`,alignment:`C`,move:`climb`,attack:`poison`,effect:``,trait:``,page:`CS1-46`,statblock:`AC 13, HP 11, ATK 1 stab +0 (1d4) or 1 thorn hail (near) +2 (1d4 + poison), MV near (climb), S +0, D +2, C +2, I -3, W +1, Ch -3, AL C, LV 2`},{name:`DRALECH`,tags:`monstrosity`,level:`6`,biome:`cave,ruins,swamp,tomb`,alignment:`C`,move:``,attack:``,effect:``,trait:`shatter`,page:`CS1-46`,statblock:`AC 13, HP 29, ATK 3 bone axe +5 (2d6), MV near, S +4, D +1, C +2, I +0, W +0, Ch +1, AL C, LV 6`},{name:`GORDOCK BREEG`,tags:`humanoid`,level:`4`,biome:`forest,grassland,river/coast,ruins,swamp,tomb`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`CS1-46`,statblock:`AC 15 (chainmail), HP 19, ATK 1 bastard sword +3 (1d10) or 1 sling (far) +2 (1d4), MV near, S +3, D +2, C +1, I +1, W +2, Ch +2, AL N, LV 4`},{name:`HEXLING`,tags:`fiend`,level:`2`,biome:`cave,ruins,swamp,tomb`,alignment:`C`,move:``,attack:`energy drain`,effect:``,trait:``,page:`CS1-46`,statblock:`AC 12, HP 11, ATK 1 chill touch +2 (1d6 + energy drain), MV near, S +0, D +2, C +2, I +0, W +1, Ch +0, AL C, LV 2`},{name:`HOWLER`,tags:`humanoid`,level:`1`,biome:`forest,grassland,river/coast,ruins,swamp,tomb`,alignment:`N`,move:``,attack:``,effect:``,trait:`mob`,page:`CS1-46`,statblock:`AC 15 (leather + shield), HP 5, ATK 1 club +2 (1d4) or 1 sling (far) +2 (1d4), MV near, S +2, D +2, C +1, I +0, W +0, Ch +0, AL N, LV 1`},{name:`ICHOR OOZE`,tags:`ooze`,level:`3`,biome:`cave,ruins,swamp,tomb`,alignment:`N`,move:`climb`,attack:``,effect:`corrosion`,trait:`damage reduction`,page:`CS1-47`,statblock:`AC 12, HP 15, ATK 2 tendril +3 (1d6), MV near (climb), S +3, D +2, C +2, I -3, W +1, Ch -3, AL N, LV 3`},{name:`MARROW FIEND`,tags:`monstrosity`,level:`8`,biome:`forest,grassland,river/coast,ruins,swamp,tomb`,alignment:`C`,move:`climb`,attack:``,effect:``,trait:`devour,sap`,page:`CS1-47`,statblock:`AC 15, HP 39, ATK 2 claws +7 (1d10) and 1 sap gout (near line) +5 (2d6 + sap), MV near (climb), S +4, D +4, C +3, I +2, W +3, Ch +3, AL C, LV 8`},{name:`MUGDULBLUB`,tags:`legendary`,level:`12`,biome:`*`,alignment:`C`,move:`climb,swim`,attack:`dissolve`,effect:``,trait:`mutagenic,damage reduction`,page:`CS1-47`,statblock:`AC 16, HP 58, ATK 3 tendril (near) +8 (2d8) and 1 dissolve, MV near (climb, swim), S +5, D +3, C +4, I +2, W +3, Ch +4, AL C, LV 12`},{name:`MUTANT CATFISH`,tags:`monstrosity`,level:`2`,biome:`river/coast,ruins,swamp,tomb`,alignment:`N`,move:`swim`,attack:`poison`,effect:``,trait:``,page:`CS1-47`,statblock:`AC 11, HP 11, ATK 1 claw +2 (1d6) or 1 barb (near) +2 (1d4 + poison), MV near (swim), S +2, D +1, C +2, I -2, W +0, Ch -2, AL N, LV 2`},{name:`PLOGRINA BITTERMOLD`,tags:`humanoid`,level:`5`,biome:`forest,grassland,river/coast,ruins,swamp,tomb`,alignment:`C`,move:``,attack:``,effect:``,trait:`damage reduction`,page:`CS1-48`,statblock:`AC 14, HP 25, ATK 2 tendril (near) +4 (1d6), MV near, S +0, D +4, C +3, I +1, W +1, Ch +3, AL C, LV 5`},{name:`SKRELL`,tags:`dinosaur`,level:`1`,biome:`forest,grassland,jungle,swamp`,alignment:`C`,move:``,attack:``,effect:``,trait:``,page:`CS1-48`,statblock:`AC 13, HP 5, ATK 1 claw +2 (1d6), MV double near, S +2, D +3, C +1, I -3, W +1, Ch -3, AL C, LV 1`},{name:`TAR BAT`,tags:`monstrosity`,level:`1`,biome:`cave,ruins,swamp,tomb`,alignment:`N`,move:`fly`,attack:``,effect:``,trait:`immune: fire`,page:`CS1-48`,statblock:`AC 13, HP 4, ATK 1 bite +3 (1d4), MV near (fly), S -3, D +3, C +0, I -3, W +1, Ch -3, AL N, LV 1`},{name:`THE WILLOWMAN`,tags:`legendary`,level:`13`,biome:`*`,alignment:`C`,move:`teleport`,attack:`paralyze`,effect:``,trait:`fearless`,page:`CS1-48`,statblock:`AC 17, HP 61, ATK 3 finger needle +9 (2d10) and 1 terrify, MV near (teleport), S +5, D +7, C +3, I +4, W +4, Ch +5, AL C, LV 13`},{name:`CAMEL, SILVER`,tags:`animal`,level:`2`,biome:`desert`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`CS2-40`,statblock:`AC 10, HP 13, ATK 1 hoof +3 (1d6) or 1 spit (near) +0 (1d4), MV double near, S +3, D +0, C +4, I -2, W +1, Ch +0, AL N, LV 2`},{name:`CANYON APE`,tags:`animal`,level:`6`,biome:`desert,mountain`,alignment:`N`,move:`climb`,attack:``,effect:``,trait:`surprise bonus`,page:`CS2-40`,statblock:`AC 13, HP 29, ATK 3 rend +6 (2d6), MV near (climb), S +4, D +3, C +2, I -1, W +1, Ch -1, AL N, LV 6`},{name:`DONKEY`,tags:`animal`,level:`1`,biome:`desert,forest,grassland,river/coast`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`CS2-40`,statblock:`AC 10, HP 6, ATK 1 hoof +3 (1d4), MV near, S +3, D +0, C +2, I -2, W +1, Ch -2, AL N, LV 1`},{name:`DUNEFIEND`,tags:`fiend`,level:`4`,biome:`desert`,alignment:`C`,move:``,attack:`sonic`,effect:``,trait:``,page:`CS2-40`,statblock:`AC 14, HP 20, ATK 2 tear +4 (1d8) or 1 howl, MV near, S +3, D +4, C +2, I +0, W +1, Ch +0, AL C, LV 4`},{name:`DUST DEVIL`,tags:`elemental`,level:`8`,biome:`desert`,alignment:`C`,move:``,attack:`fling`,effect:``,trait:`immune: non-magical damage`,page:`CS2-40`,statblock:`AC 16, HP 36, ATK 2 lacerate +5 (2d8), MV double near, S +4, D +4, C +0, I -2, W +0, Ch -2, AL C, LV 8`},{name:`HERO, GLADIATOR`,tags:`humanoid`,level:`5`,biome:`*`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`CS2-41`,statblock:`AC 16 (chainmail + shield), HP 25, ATK 3 bastard sword +5 (1d8) or 1 spear (close/near) +5 (1d6), MV near, S +3, D +1, C +3, I +0, W +1, Ch +1, AL N, LV 5`},{name:`HORSE, WAR`,tags:`animal`,level:`3`,biome:`*`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`CS2-41`,statblock:`AC 11, HP 15, ATK 1 hooves +4 (1d6), MV double near, S +3, D +1, C +2, I -3, W +1, Ch -1, AL N, LV 3`},{name:`MIRAGE`,tags:`fiend`,level:`8`,biome:`*`,alignment:`C`,move:``,attack:``,effect:``,trait:`illusion,leech`,page:`CS2-41`,statblock:`AC 6, HP 32, ATK 1 leech, MV near, S -4, D -4, C -4, I +2, W +1, Ch +4, AL C, LV 8`},{name:`RAS-GODAI`,tags:`humanoid`,level:`3`,biome:`desert`,alignment:`C`,move:`teleport`,attack:``,effect:``,trait:``,page:`CS2-41`,statblock:`AC 13 (leather), HP 13, ATK 1 razor chain (near) +4 (1d6), MV near (teleport), S +1, D +2, C +0, I +0, W +1, Ch +0, AL C, LV 3`},{name:`ROOKIE, PIT-FIGHTER`,tags:`humanoid`,level:`1`,biome:`*`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`CS2-41`,statblock:`AC 14 (leather + shield), HP 5, ATK 1 shortsword +1 (1d6) or 1 javelin (close/far) +1 (1d4), MV near, S +1, D +1, C +1, I +0, W +0, Ch +0, AL N, LV 1`},{name:`SCRAG`,tags:`monstrosity`,level:`2`,biome:`desert`,alignment:`N`,move:`climb`,attack:``,effect:``,trait:``,page:`CS2-43`,statblock:`AC 12, HP 11, ATK 1 claw +2 (1d6), MV near (climb), S +2, D +2, C +2, I -2, W +1, Ch -3, AL N, LV 2`},{name:`SCRAG, WAR`,tags:`monstrosity`,level:`3`,biome:`desert`,alignment:`N`,move:`climb`,attack:``,effect:``,trait:``,page:`CS2-43`,statblock:`AC 12, HP 15, ATK 1 claw +3 (1d6), MV near (climb), S +3, D +2, C +2, I -2, W +1, Ch -3, AL N, LV 3`},{name:`SIRUUL`,tags:`humanoid`,level:`2`,biome:`desert`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`CS2-43`,statblock:`AC 14 (leather), HP 9, ATK 1 scimitar +3 (1d6) or 1 longbow (far) +3 (1d8), MV double near (mount), S +0, D +3, C +0, I +1, W +1, Ch +1, AL N, LV 2`},{name:`THE SCOURGE`,tags:`legendary`,level:`18`,biome:`desert`,alignment:`C`,move:`fly`,attack:`electric`,effect:``,trait:`immune: electricity,illusion`,page:`CS2-43`,statblock:`AC 17, HP 84, ATK 3 rend +10 (2d10) or lightning breath, MV double near (fly), S +6, D +3, C +3, I +4, W +4, Ch +5, AL C, LV 18`},{name:`DRAKE, GREATER`,tags:`dragon`,level:`8`,biome:`arctic,cave,mountain`,alignment:`N`,move:`fly`,attack:`fire`,effect:``,trait:`immune: fire`,page:`CS3-44`,statblock:`AC 15, HP 38, ATK 2 claw +7 (1d12) or 1 fire gout, MV double near (fly), S +4, D +3, C +2, I -2, W +2, Ch +0, AL N, LV 8`},{name:`DRAKE, LESSER`,tags:`dragon`,level:`6`,biome:`arctic,cave,mountain`,alignment:`N`,move:`fly`,attack:`fire`,effect:``,trait:`immune: fire`,page:`CS3-44`,statblock:`AC 13, HP 28, ATK 2 claw +5 (1d10) or 1 fire spit, MV double near (fly), S +3, D +2, C +1, I -2, W +1, Ch +0, AL N, LV 6`},{name:`DRAUGR`,tags:`undead`,level:`5`,biome:`*`,alignment:`C`,move:``,attack:``,effect:``,trait:`fearless,immune: non-magical damage,immune: non-silvered weapons,stone swim`,page:`CS3-45`,statblock:`AC 16 (chainmail + shield), HP 25, ATK 2 bastard sword +4 (1d8), MV near, S +3, D +1, C +3, I +0, W +0, Ch +3, AL C, LV 5`},{name:`DVERG`,tags:`humanoid`,level:`3`,biome:`arctic,cave,deeps,mountain`,alignment:`L`,move:``,attack:``,effect:``,trait:`shape change`,page:`CS3-45`,statblock:`AC 13 (chainmail), HP 14, ATK 1 greataxe +2 (1d10), MV near, S +2, D +0, C +1, I +1, W +1, Ch +0, AL L, LV 3`},{name:`NORD`,tags:`humanoid`,level:`2`,biome:`arctic,ocean,river/coast`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`CS3-45`,statblock:`AC 15 (chainmail + shield), HP 10, ATK 1 greataxe +2 (1d8) or 1 shield wall, MV near, S +2, D +0, C +1, I +0, W +0, Ch +0, AL N, LV 2`},{name:`TROLL, DEEP`,tags:`monstrosity`,level:`8`,biome:`arctic,cave,deeps,mountain`,alignment:`C`,move:``,attack:``,effect:``,trait:`regeneration`,page:`CS3-46`,statblock:`AC 13, HP 39, ATK 2 claw +7 (1d10), MV near, S +4, D +2, C +3, I -1, W +1, Ch +1, AL C, LV 8`},{name:`SEA SERPENT`,tags:`monstrosity`,level:`12`,biome:`ocean,river/coast`,alignment:`N`,move:`swim`,attack:``,effect:``,trait:``,page:`CS3-46`,statblock:`AC 14, HP 58, ATK 3 bite +8 (2d12), MV double near (swim), S +5, D +0, C +4, I -3, W +1, Ch -3, AL N, LV 12`},{name:`SEA NYMPH`,tags:`fey`,level:`3`,biome:`ocean,river/coast`,alignment:`N`,move:`swim`,attack:`sonic`,effect:`daze`,trait:``,page:`CS3-46`,statblock:`AC 13, HP 13, ATK 1 slash +2 (1d6) or 1 sing, MV near (swim), S +0, D +3, C +0, I +1, W +1, Ch +2, AL N, LV 3`},{name:`ORCA`,tags:`animal`,level:`8`,biome:`ocean,river/coast`,alignment:`N`,move:`swim`,attack:``,effect:``,trait:`pack hunter`,page:`CS3-46`,statblock:`AC 12, HP 39, ATK 2 bite +5 (1d10), MV double near (swim), S +4, D +0, C +3, I -2, W +1, Ch -2, AL N, LV 8`},{name:`ORACLE`,tags:`humanoid`,level:`4`,biome:`*`,alignment:`N`,move:``,attack:`spell`,effect:``,trait:``,page:`CS3-46`,statblock:`AC 10, HP 19, ATK 1 stave +2 (1d4) or 1 spell +3, MV near, S +1, D +0, C +1, I +0, W +2, Ch +1, AL N, LV 4`},{name:`WEREBEAR`,tags:`monstrosity`,level:`7`,biome:`arctic,forest,mountain,river/coast`,alignment:`L`,move:``,attack:``,effect:``,trait:``,page:`CS3-47`,statblock:`AC 11, HP 34, ATK 2 claw +6 (1d8), MV near, S +4, D +1, C +3, I +0, W +2, Ch -1, AL L, LV 7`},{name:`VALKYRIE`,tags:`celestial`,level:`14`,biome:`*`,alignment:`L`,move:`fly`,attack:`crush`,effect:`lycanthropy`,trait:`immune: non-magical damage,fearless,spell resistance`,page:`CS3-47`,statblock:`AC 17 (plate mail + shield), HP66, ATK 3 blessed spear (near) +9 (3d6), MV double near (fly), S +4, D +3, C +3, I +3, W +4, Ch +5, AL L, LV 14`}]},x_={name:`Cursed Scrolls Monster Data`,rulesSection:``,description:``,entries:[{name:`BITTERMOLD`,tags:`humanoid`,level:`1`,biome:`forest,grassland,river/coast,ruins,swamp,tomb`,alignment:`C`,move:``,attack:``,effect:``,trait:`damage reduction`,page:`CS1-46`,statblock:`AC 12, HP 5, ATK 1 shortsword +1 (1d6) or 1 sling (far) +2 (1d4), MV near, S +1, D +2, C +1, I +0, W +0, Ch +0, AL C, LV 1`},{name:`BOGTHORN`,tags:`monstrosity`,level:`2`,biome:`cave,ruins,swamp,tomb`,alignment:`C`,move:`climb`,attack:`poison`,effect:``,trait:``,page:`CS1-46`,statblock:`AC 13, HP 11, ATK 1 stab +0 (1d4) or 1 thorn hail (near) +2 (1d4 + poison), MV near (climb), S +0, D +2, C +2, I -3, W +1, Ch -3, AL C, LV 2`},{name:`DRALECH`,tags:`monstrosity`,level:`6`,biome:`cave,ruins,swamp,tomb`,alignment:`C`,move:``,attack:``,effect:``,trait:`shatter`,page:`CS1-46`,statblock:`AC 13, HP 29, ATK 3 bone axe +5 (2d6), MV near, S +4, D +1, C +2, I +0, W +0, Ch +1, AL C, LV 6`},{name:`GORDOCK BREEG`,tags:`humanoid`,level:`4`,biome:`forest,grassland,river/coast,ruins,swamp,tomb`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`CS1-46`,statblock:`AC 15 (chainmail), HP 19, ATK 1 bastard sword +3 (1d10) or 1 sling (far) +2 (1d4), MV near, S +3, D +2, C +1, I +1, W +2, Ch +2, AL N, LV 4`},{name:`HEXLING`,tags:`fiend`,level:`2`,biome:`cave,ruins,swamp,tomb`,alignment:`C`,move:``,attack:`energy drain`,effect:``,trait:``,page:`CS1-46`,statblock:`AC 12, HP 11, ATK 1 chill touch +2 (1d6 + energy drain), MV near, S +0, D +2, C +2, I +0, W +1, Ch +0, AL C, LV 2`},{name:`HOWLER`,tags:`humanoid`,level:`1`,biome:`forest,grassland,river/coast,ruins,swamp,tomb`,alignment:`N`,move:``,attack:``,effect:``,trait:`mob`,page:`CS1-46`,statblock:`AC 15 (leather + shield), HP 5, ATK 1 club +2 (1d4) or 1 sling (far) +2 (1d4), MV near, S +2, D +2, C +1, I +0, W +0, Ch +0, AL N, LV 1`},{name:`ICHOR OOZE`,tags:`ooze`,level:`3`,biome:`cave,ruins,swamp,tomb`,alignment:`N`,move:`climb`,attack:``,effect:`corrosion`,trait:`damage reduction`,page:`CS1-47`,statblock:`AC 12, HP 15, ATK 2 tendril +3 (1d6), MV near (climb), S +3, D +2, C +2, I -3, W +1, Ch -3, AL N, LV 3`},{name:`MARROW FIEND`,tags:`monstrosity`,level:`8`,biome:`forest,grassland,river/coast,ruins,swamp,tomb`,alignment:`C`,move:`climb`,attack:``,effect:``,trait:`devour,sap`,page:`CS1-47`,statblock:`AC 15, HP 39, ATK 2 claws +7 (1d10) and 1 sap gout (near line) +5 (2d6 + sap), MV near (climb), S +4, D +4, C +3, I +2, W +3, Ch +3, AL C, LV 8`},{name:`MUGDULBLUB`,tags:`legendary`,level:`12`,biome:`*`,alignment:`C`,move:`climb,swim`,attack:`dissolve`,effect:``,trait:`mutagenic,damage reduction`,page:`CS1-47`,statblock:`AC 16, HP 58, ATK 3 tendril (near) +8 (2d8) and 1 dissolve, MV near (climb, swim), S +5, D +3, C +4, I +2, W +3, Ch +4, AL C, LV 12`},{name:`MUTANT CATFISH`,tags:`monstrosity`,level:`2`,biome:`river/coast,ruins,swamp,tomb`,alignment:`N`,move:`swim`,attack:`poison`,effect:``,trait:``,page:`CS1-47`,statblock:`AC 11, HP 11, ATK 1 claw +2 (1d6) or 1 barb (near) +2 (1d4 + poison), MV near (swim), S +2, D +1, C +2, I -2, W +0, Ch -2, AL N, LV 2`},{name:`PLOGRINA BITTERMOLD`,tags:`humanoid`,level:`5`,biome:`forest,grassland,river/coast,ruins,swamp,tomb`,alignment:`C`,move:``,attack:``,effect:``,trait:`damage reduction`,page:`CS1-48`,statblock:`AC 14, HP 25, ATK 2 tendril (near) +4 (1d6), MV near, S +0, D +4, C +3, I +1, W +1, Ch +3, AL C, LV 5`},{name:`SKRELL`,tags:`dinosaur`,level:`1`,biome:`forest,grassland,jungle,swamp`,alignment:`C`,move:``,attack:``,effect:``,trait:``,page:`CS1-48`,statblock:`AC 13, HP 5, ATK 1 claw +2 (1d6), MV double near, S +2, D +3, C +1, I -3, W +1, Ch -3, AL C, LV 1`},{name:`TAR BAT`,tags:`monstrosity`,level:`1`,biome:`cave,ruins,swamp,tomb`,alignment:`N`,move:`fly`,attack:``,effect:``,trait:`immune: fire`,page:`CS1-48`,statblock:`AC 13, HP 4, ATK 1 bite +3 (1d4), MV near (fly), S -3, D +3, C +0, I -3, W +1, Ch -3, AL N, LV 1`},{name:`THE WILLOWMAN`,tags:`legendary`,level:`13`,biome:`*`,alignment:`C`,move:`teleport`,attack:`paralyze`,effect:``,trait:`fearless`,page:`CS1-48`,statblock:`AC 17, HP 61, ATK 3 finger needle +9 (2d10) and 1 terrify, MV near (teleport), S +5, D +7, C +3, I +4, W +4, Ch +5, AL C, LV 13`}]},S_={name:`Cursed Scrolls Monster Data`,rulesSection:``,description:``,entries:[{name:`CAMEL, SILVER`,tags:`animal`,level:`2`,biome:`desert`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`CS2-40`,statblock:`AC 10, HP 13, ATK 1 hoof +3 (1d6) or 1 spit (near) +0 (1d4), MV double near, S +3, D +0, C +4, I -2, W +1, Ch +0, AL N, LV 2`},{name:`CANYON APE`,tags:`animal`,level:`6`,biome:`desert,mountain`,alignment:`N`,move:`climb`,attack:``,effect:``,trait:`surprise bonus`,page:`CS2-40`,statblock:`AC 13, HP 29, ATK 3 rend +6 (2d6), MV near (climb), S +4, D +3, C +2, I -1, W +1, Ch -1, AL N, LV 6`},{name:`DONKEY`,tags:`animal`,level:`1`,biome:`desert,forest,grassland,river/coast`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`CS2-40`,statblock:`AC 10, HP 6, ATK 1 hoof +3 (1d4), MV near, S +3, D +0, C +2, I -2, W +1, Ch -2, AL N, LV 1`},{name:`DUNEFIEND`,tags:`fiend`,level:`4`,biome:`desert`,alignment:`C`,move:``,attack:`sonic`,effect:``,trait:``,page:`CS2-40`,statblock:`AC 14, HP 20, ATK 2 tear +4 (1d8) or 1 howl, MV near, S +3, D +4, C +2, I +0, W +1, Ch +0, AL C, LV 4`},{name:`DUST DEVIL`,tags:`elemental`,level:`8`,biome:`desert`,alignment:`C`,move:``,attack:`fling`,effect:``,trait:`immune: non-magical damage`,page:`CS2-40`,statblock:`AC 16, HP 36, ATK 2 lacerate +5 (2d8), MV double near, S +4, D +4, C +0, I -2, W +0, Ch -2, AL C, LV 8`},{name:`HERO, GLADIATOR`,tags:`humanoid`,level:`5`,biome:`*`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`CS2-41`,statblock:`AC 16 (chainmail + shield), HP 25, ATK 3 bastard sword +5 (1d8) or 1 spear (close/near) +5 (1d6), MV near, S +3, D +1, C +3, I +0, W +1, Ch +1, AL N, LV 5`},{name:`HORSE, WAR`,tags:`animal`,level:`3`,biome:`*`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`CS2-41`,statblock:`AC 11, HP 15, ATK 1 hooves +4 (1d6), MV double near, S +3, D +1, C +2, I -3, W +1, Ch -1, AL N, LV 3`},{name:`MIRAGE`,tags:`fiend`,level:`8`,biome:`*`,alignment:`C`,move:``,attack:``,effect:``,trait:`illusion,leech`,page:`CS2-41`,statblock:`AC 6, HP 32, ATK 1 leech, MV near, S -4, D -4, C -4, I +2, W +1, Ch +4, AL C, LV 8`},{name:`RAS-GODAI`,tags:`humanoid`,level:`3`,biome:`desert`,alignment:`C`,move:`teleport`,attack:``,effect:``,trait:``,page:`CS2-41`,statblock:`AC 13 (leather), HP 13, ATK 1 razor chain (near) +4 (1d6), MV near (teleport), S +1, D +2, C +0, I +0, W +1, Ch +0, AL C, LV 3`},{name:`ROOKIE, PIT-FIGHTER`,tags:`humanoid`,level:`1`,biome:`*`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`CS2-41`,statblock:`AC 14 (leather + shield), HP 5, ATK 1 shortsword +1 (1d6) or 1 javelin (close/far) +1 (1d4), MV near, S +1, D +1, C +1, I +0, W +0, Ch +0, AL N, LV 1`},{name:`SCRAG`,tags:`monstrosity`,level:`2`,biome:`desert`,alignment:`N`,move:`climb`,attack:``,effect:``,trait:``,page:`CS2-43`,statblock:`AC 12, HP 11, ATK 1 claw +2 (1d6), MV near (climb), S +2, D +2, C +2, I -2, W +1, Ch -3, AL N, LV 2`},{name:`SCRAG, WAR`,tags:`monstrosity`,level:`3`,biome:`desert`,alignment:`N`,move:`climb`,attack:``,effect:``,trait:``,page:`CS2-43`,statblock:`AC 12, HP 15, ATK 1 claw +3 (1d6), MV near (climb), S +3, D +2, C +2, I -2, W +1, Ch -3, AL N, LV 3`},{name:`SIRUUL`,tags:`humanoid`,level:`2`,biome:`desert`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`CS2-43`,statblock:`AC 14 (leather), HP 9, ATK 1 scimitar +3 (1d6) or 1 longbow (far) +3 (1d8), MV double near (mount), S +0, D +3, C +0, I +1, W +1, Ch +1, AL N, LV 2`},{name:`THE SCOURGE`,tags:`legendary`,level:`18`,biome:`desert`,alignment:`C`,move:`fly`,attack:`electric`,effect:``,trait:`immune: electricity,illusion`,page:`CS2-43`,statblock:`AC 17, HP 84, ATK 3 rend +10 (2d10) or lightning breath, MV double near (fly), S +6, D +3, C +3, I +4, W +4, Ch +5, AL C, LV 18`}]},C_={name:`Cursed Scrolls Monster Data`,rulesSection:``,description:``,entries:[{name:`DRAKE, GREATER`,tags:`dragon`,level:`8`,biome:`arctic,cave,mountain`,alignment:`N`,move:`fly`,attack:`fire`,effect:``,trait:`immune: fire`,page:`CS3-44`,statblock:`AC 15, HP 38, ATK 2 claw +7 (1d12) or 1 fire gout, MV double near (fly), S +4, D +3, C +2, I -2, W +2, Ch +0, AL N, LV 8`},{name:`DRAKE, LESSER`,tags:`dragon`,level:`6`,biome:`arctic,cave,mountain`,alignment:`N`,move:`fly`,attack:`fire`,effect:``,trait:`immune: fire`,page:`CS3-44`,statblock:`AC 13, HP 28, ATK 2 claw +5 (1d10) or 1 fire spit, MV double near (fly), S +3, D +2, C +1, I -2, W +1, Ch +0, AL N, LV 6`},{name:`DRAUGR`,tags:`undead`,level:`5`,biome:`*`,alignment:`C`,move:``,attack:``,effect:``,trait:`fearless,immune: non-magical damage,immune: non-silvered weapons,stone swim`,page:`CS3-45`,statblock:`AC 16 (chainmail + shield), HP 25, ATK 2 bastard sword +4 (1d8), MV near, S +3, D +1, C +3, I +0, W +0, Ch +3, AL C, LV 5`},{name:`DVERG`,tags:`humanoid`,level:`3`,biome:`arctic,cave,deeps,mountain`,alignment:`L`,move:``,attack:``,effect:``,trait:`shape change`,page:`CS3-45`,statblock:`AC 13 (chainmail), HP 14, ATK 1 greataxe +2 (1d10), MV near, S +2, D +0, C +1, I +1, W +1, Ch +0, AL L, LV 3`},{name:`NORD`,tags:`humanoid`,level:`2`,biome:`arctic,ocean,river/coast`,alignment:`N`,move:``,attack:``,effect:``,trait:``,page:`CS3-45`,statblock:`AC 15 (chainmail + shield), HP 10, ATK 1 greataxe +2 (1d8) or 1 shield wall, MV near, S +2, D +0, C +1, I +0, W +0, Ch +0, AL N, LV 2`},{name:`TROLL, DEEP`,tags:`monstrosity`,level:`8`,biome:`arctic,cave,deeps,mountain`,alignment:`C`,move:``,attack:``,effect:``,trait:`regeneration`,page:`CS3-46`,statblock:`AC 13, HP 39, ATK 2 claw +7 (1d10), MV near, S +4, D +2, C +3, I -1, W +1, Ch +1, AL C, LV 8`},{name:`SEA SERPENT`,tags:`monstrosity`,level:`12`,biome:`ocean,river/coast`,alignment:`N`,move:`swim`,attack:``,effect:``,trait:``,page:`CS3-46`,statblock:`AC 14, HP 58, ATK 3 bite +8 (2d12), MV double near (swim), S +5, D +0, C +4, I -3, W +1, Ch -3, AL N, LV 12`},{name:`SEA NYMPH`,tags:`fey`,level:`3`,biome:`ocean,river/coast`,alignment:`N`,move:`swim`,attack:`sonic`,effect:`daze`,trait:``,page:`CS3-46`,statblock:`AC 13, HP 13, ATK 1 slash +2 (1d6) or 1 sing, MV near (swim), S +0, D +3, C +0, I +1, W +1, Ch +2, AL N, LV 3`},{name:`ORCA`,tags:`animal`,level:`8`,biome:`ocean,river/coast`,alignment:`N`,move:`swim`,attack:``,effect:``,trait:`pack hunter`,page:`CS3-46`,statblock:`AC 12, HP 39, ATK 2 bite +5 (1d10), MV double near (swim), S +4, D +0, C +3, I -2, W +1, Ch -2, AL N, LV 8`},{name:`ORACLE`,tags:`humanoid`,level:`4`,biome:`*`,alignment:`N`,move:``,attack:`spell`,effect:``,trait:``,page:`CS3-46`,statblock:`AC 10, HP 19, ATK 1 stave +2 (1d4) or 1 spell +3, MV near, S +1, D +0, C +1, I +0, W +2, Ch +1, AL N, LV 4`},{name:`WEREBEAR`,tags:`monstrosity`,level:`7`,biome:`arctic,forest,mountain,river/coast`,alignment:`L`,move:``,attack:``,effect:``,trait:``,page:`CS3-47`,statblock:`AC 11, HP 34, ATK 2 claw +6 (1d8), MV near, S +4, D +1, C +3, I +0, W +2, Ch -1, AL L, LV 7`},{name:`VALKYRIE`,tags:`celestial`,level:`14`,biome:`*`,alignment:`L`,move:`fly`,attack:`crush`,effect:`lycanthropy`,trait:`immune: non-magical damage,fearless,spell resistance`,page:`CS3-47`,statblock:`AC 17 (plate mail + shield), HP66, ATK 3 blessed spear (near) +9 (3d6), MV double near (fly), S +4, D +3, C +3, I +3, W +4, Ch +5, AL L, LV 14`}]};JSON.parse(JSON.stringify(b_),(e,t)=>e===`rollType`&&typeof t==`string`?Jp[t]:t);var w_=JSON.parse(JSON.stringify(x_),(e,t)=>e===`rollType`&&typeof t==`string`?Jp[t]:t),T_=JSON.parse(JSON.stringify(S_),(e,t)=>e===`rollType`&&typeof t==`string`?Jp[t]:t),E_=JSON.parse(JSON.stringify(C_),(e,t)=>e===`rollType`&&typeof t==`string`?Jp[t]:t),D_=class{sources=qr;levelLower=-1;levelUpper=-1;biomeTags=[];moveTags=[];attackTags=[];typeTags=[];effectTags=[];traitTags=[];keywords=``},O_=class e{static getAllBiomeTags(){let e=[];y_.entries.forEach(t=>{let n=t.biome.split(`,`);e=e.concat(n)});let t=[...new Set(e)].sort((e,t)=>e.localeCompare(t));return t=t.filter(e=>e!==``),t=t.filter(e=>e!==`*`),t}static getAllMoveTags(){let e=y_.entries.map(e=>e.move),t=[...new Set(e)].sort((e,t)=>e.localeCompare(t));return t=t.filter(e=>e!==``),t}static getAllAttackTags(){let e=[];y_.entries.forEach(t=>{let n=t.attack.split(`,`);e=e.concat(n)});let t=[...new Set(e)].sort((e,t)=>e.localeCompare(t));return t=t.filter(e=>e!==``),t}static getAllTypeTags(){let e=[];y_.entries.forEach(t=>{let n=t.tags.split(`,`);e=e.concat(n)});let t=[...new Set(e)].sort((e,t)=>e.localeCompare(t));return t=t.filter(e=>e!==``),t}static getAllEffectTags(){let e=[];y_.entries.forEach(t=>{let n=t.effect.split(`,`);e=e.concat(n)});let t=[...new Set(e)].sort((e,t)=>e.localeCompare(t));return t=t.filter(e=>e!==``),t}static getAllTraitTags(){let e=[];y_.entries.forEach(t=>{let n=t.trait.split(`,`);e=e.concat(n)});let t=[...new Set(e)].sort((e,t)=>e.localeCompare(t));return t=t.filter(e=>e!==``),t}static gatherMonsterPool(e){let t=!1,n=[];return e[tr.Core]&&(t=!0,n=n.concat(y_.entries)),e[tr.CursedScroll1]&&(t=!0,n=n.concat(w_.entries)),e[tr.CursedScroll2]&&(t=!0,n=n.concat(T_.entries)),e[tr.CursedScroll3]&&(t=!0,n=n.concat(E_.entries)),t||(n=[...y_.entries]),n}static getMonstersByLevel(e,t,n){let r=[];return r=t>-1&&n>-1?e.filter(e=>{if(e.level===`*`)return!0;let r=+e.level;return r>=t&&r<=n}):t>-1?e.filter(e=>e.level===`*`||+e.level>=t):n>-1?e.filter(e=>e.level===`*`||+e.level<=n):e,r}static filterMonstersByMovement(e,t){return t.length===0?e:e.filter(e=>{let n=e.move.split(`,`),r=!1;return t.forEach(e=>r||=n.indexOf(e)>-1),r})}static filterMonstersByKeyword(e,t){if(t.trim()===``)return e;let n=t.toLowerCase().trim().split(` `);return n=n.filter(e=>e.trim()!==``),n=n.map(e=>e.trim()),e.filter(e=>{let t=!1;return n.forEach(n=>t=t||e.name.toLowerCase().includes(n)||e.statblock.toLowerCase().includes(n)),t})}static filterMonstersByAttack(e,t){return t.length===0?e:e.filter(e=>{let n=e.attack.split(`,`),r=!1;return t.forEach(e=>r||=n.indexOf(e)>-1),r})}static filterMonstersByBiome(e,t){return t.length===0?e:e.filter(e=>{let n=e.biome.split(`,`),r=n.indexOf(`*`)>-1;return t.forEach(e=>r||=n.indexOf(e)>-1),r})}static filterMonstersByType(e,t){return t.length===0?e:e.filter(e=>{let n=e.tags.split(`,`),r=!1;return t.forEach(e=>r||=n.indexOf(e)>-1),r})}static filterMonstersByTrait(e,t){return t.length===0?e:e.filter(e=>{let n=e.trait.split(`,`),r=!1;return t.forEach(e=>r||=n.indexOf(e)>-1),r})}static filterMonstersByEffect(e,t){return t.length===0?e:e.filter(e=>{let n=e.effect.split(`,`),r=!1;return t.forEach(e=>r||=n.indexOf(e)>-1),r})}static searchMonsters(t){let n=this.gatherMonsterPool(t.sources),r=e.getMonstersByLevel(n,t.levelLower,t.levelUpper);r=e.filterMonstersByBiome(r,t.biomeTags),r=e.filterMonstersByKeyword(r,t.keywords);let i=[];t.moveTags.length>0&&(i=e.filterMonstersByMovement(r,t.moveTags));let a=[];t.attackTags.length>0&&(a=e.filterMonstersByAttack(r,t.attackTags));let o=[];t.typeTags.length>0&&(o=e.filterMonstersByType(r,t.typeTags));let s=[];t.effectTags.length>0&&(s=e.filterMonstersByEffect(r,t.effectTags));let c=[];if(t.traitTags.length>0&&(c=e.filterMonstersByTrait(r,t.traitTags)),t.attackTags.length+t.moveTags.length+t.typeTags.length+t.effectTags.length+t.traitTags.length>0){let e=i.concat(a).concat(o).concat(s).concat(c);return e=[...new Set(e)].sort((e,t)=>e.name.localeCompare(t.name)),e}else return r=[...r].sort((e,t)=>e.name.localeCompare(t.name)),r}static searchMonstersRestrictive(t){let n=this.gatherMonsterPool(t.sources),r=e.getMonstersByLevel(n,t.levelLower,t.levelUpper);return r=e.filterMonstersByBiome(r,t.biomeTags),r=e.filterMonstersByKeyword(r,t.keywords),t.typeTags.length>0&&(r=e.filterMonstersByType(r,t.typeTags)),t.moveTags.length>0&&(r=e.filterMonstersByMovement(r,t.moveTags)),t.attackTags.length>0&&(r=e.filterMonstersByAttack(r,t.attackTags)),t.effectTags.length>0&&(r=e.filterMonstersByEffect(r,t.effectTags)),t.traitTags.length>0&&(r=e.filterMonstersByTrait(r,t.traitTags)),r.sort((e,t)=>e.name.localeCompare(t.name))}static getFilteredMonsterList(t,n=0){let r=new Kr(e.searchMonstersRestrictive(t));if(n<=0||n>r.monsters.length)return r.getCleanType();let i=[],a=[];for(;i.length<n;){let e=Gh.dCustom(0,r.monsters.length-1);a.indexOf(e)===-1&&(i.push(r.monsters[e]),a.push(e))}return new Kr(i).getCleanType()}static searchForNMonsters(t,n){let r=e.searchMonsters(t),i=[];for(let e=0;e<n;e++){let e=Gh.dCustom(0,r.length-1);i.push(r[e])}return i}static searchForNMonstersRestrictive(t,n){let r=e.searchMonstersRestrictive(t),i=[];for(let e=0;e<n;e++){let e=Gh.dCustom(0,r.length-1);i.push(r[e])}return i}};function k_(e,t){let n=new D_;return n.sources=e,n.levelLower=t.levelRange.lower,n.levelUpper=t.levelRange.upper,n.biomeTags=t.biomeTags,n.moveTags=t.movementTags,n.attackTags=t.attackTags,n.typeTags=t.typeTags,n.effectTags=t.effectTags,n.traitTags=t.traitTags,n.keywords=t.keywords.join(` `),n}function A_(e,t){R.log(`------------- sortFoundMonsters`,e,t);let n=[...e.monsters];switch(t.sortPropertyA){case cr.ByName:n.sort((e,t)=>e.name.localeCompare(t.name));break;case cr.ByLevel:n.sort((e,t)=>{let n=Number(e.level)?Number(e.level):0,r=Number(t.level)?Number(t.level):0;return n===r?0:n<r?-1:1});break;default:n.sort((e,t)=>e.name.localeCompare(t.name));break}t.sortAscending||n.reverse();let r=new Kr(n).getCleanType();return R.log(`------------- sortFoundMonsters`,r),r}function j_(){let e=qp(),t=$(ui),n=$(di),r=$(fi),i=$(pi);R.log(`sortOptions: `,i);let a=`mr-2 mb-2`,o=Object.entries(tr).map(([e,n])=>(0,U.jsx)(n_,{id:e,toggleValue:t[n],subtle:!0,solo:!0,onClick:(e=>s(e,n)),className:a,children:(0,U.jsx)(U.Fragment,{children:n})},e)),s=(t,n)=>{e(Yr(n))},c=(0,U.jsx)(`div`,{className:`tag-button-wrapper`,children:o}),l=ag.renderOptions(ig.getMonsterLevelOptionsWithIgnore()),u=t=>{let n=+t.currentTarget.value;e(Qr(n))},d=t=>{let n=+t.currentTarget.value;e($r(n))},f=O_.getAllBiomeTags(),p=(t,n)=>{let i={type:z.Biome,tag:n};r.biomeTags.indexOf(n)>-1?e(ti(i)):e(ei(i))},h=f.map(e=>(0,U.jsx)(n_,{className:a,toggleValue:r.biomeTags.indexOf(e)>-1,subtle:!0,solo:!0,onClick:(t=>p(t,e)),children:(0,U.jsx)(U.Fragment,{children:e})},e)),[g,_]=(0,m.useState)(!1),v=e=>{_(!g)},y=g?`Movement`:`Movement: ${r.movementTags.length===0?`none selected`:r.movementTags.join(`, `)}`,b=(0,U.jsx)(hs,{toggleValue:g,iconOnly:!0,solo:!0,subtle:!0,toggleOnIcon:G.getCaretUp(),toggleOffIcon:G.getCaretDown(),onClick:(e=>v(e)),children:(0,U.jsx)(U.Fragment,{})}),x=O_.getAllMoveTags(),S=(t,n)=>{let i={type:z.Movement,tag:n};r.movementTags.indexOf(n)>-1?e(ti(i)):e(ei(i))},C=x.map(e=>(0,U.jsx)(n_,{className:a,toggleValue:r.movementTags.indexOf(e)>-1,subtle:!0,solo:!0,onClick:(t=>S(t,e)),children:(0,U.jsx)(U.Fragment,{children:e})},e)),w=g?(0,U.jsx)(`div`,{id:`type-selection`,className:`tag-button-wrapper`,children:C}):(0,U.jsx)(U.Fragment,{}),[T,E]=(0,m.useState)(!1),ee=e=>{E(!T)},D=T?`Attack`:`Attack: ${r.attackTags.length===0?`none selected`:r.attackTags.join(`, `)}`,te=(0,U.jsx)(hs,{toggleValue:T,iconOnly:!0,solo:!0,subtle:!0,toggleOnIcon:G.getCaretUp(),toggleOffIcon:G.getCaretDown(),onClick:(e=>ee(e)),children:(0,U.jsx)(U.Fragment,{})}),ne=O_.getAllAttackTags(),re=(t,n)=>{let i={type:z.Attack,tag:n};r.attackTags.indexOf(n)>-1?e(ti(i)):e(ei(i))},ie=ne.map(e=>(0,U.jsx)(Zp,{tipSearchTerm:e,className:a,toggleValue:r.attackTags.indexOf(e)>-1,subtle:!0,solo:!0,onClick:(t=>re(t,e)),children:(0,U.jsx)(U.Fragment,{children:e})},e)),ae=T?(0,U.jsx)(`div`,{id:`type-selection`,className:`tag-button-wrapper`,children:ie}):(0,U.jsx)(U.Fragment,{}),[O,k]=(0,m.useState)(!1),oe=e=>{k(!O)},se=O?`Type`:`Type: ${r.typeTags.length===0?`none selected`:r.typeTags.join(`, `)}`,A=(0,U.jsx)(hs,{toggleValue:O,iconOnly:!0,solo:!0,subtle:!0,toggleOnIcon:G.getCaretUp(),toggleOffIcon:G.getCaretDown(),onClick:(e=>oe(e)),children:(0,U.jsx)(U.Fragment,{})}),ce=O_.getAllTypeTags(),le=(t,n)=>{let i={type:z.Type,tag:n};r.typeTags.indexOf(n)>-1?e(ti(i)):e(ei(i))},j=ce.map(e=>(0,U.jsx)(n_,{className:a,toggleValue:r.typeTags.indexOf(e)>-1,subtle:!0,solo:!0,onClick:(t=>le(t,e)),children:(0,U.jsx)(U.Fragment,{children:e})},e)),ue=O?(0,U.jsx)(`div`,{id:`type-selection`,className:`tag-button-wrapper`,children:j}):(0,U.jsx)(U.Fragment,{}),[M,de]=(0,m.useState)(!1),fe=e=>{de(!M)},pe=M?`Effect`:`Effect: ${r.effectTags.length===0?`none selected`:r.effectTags.join(`, `)}`,me=(0,U.jsx)(hs,{toggleValue:M,iconOnly:!0,solo:!0,subtle:!0,toggleOnIcon:G.getCaretUp(),toggleOffIcon:G.getCaretDown(),onClick:(e=>fe(e)),children:(0,U.jsx)(U.Fragment,{})}),he=O_.getAllEffectTags(),ge=(t,n)=>{let i={type:z.Effect,tag:n};r.effectTags.indexOf(n)>-1?e(ti(i)):e(ei(i))},_e=he.map(e=>(0,U.jsx)(Zp,{tipSearchTerm:e,className:a,toggleValue:r.effectTags.indexOf(e)>-1,subtle:!0,solo:!0,onClick:(t=>ge(t,e)),children:(0,U.jsx)(U.Fragment,{children:e})},e)),ve=M?(0,U.jsx)(`div`,{id:`type-selection`,className:`tag-button-wrapper`,children:_e}):(0,U.jsx)(U.Fragment,{}),[ye,be]=(0,m.useState)(!1),xe=e=>{be(!ye)},Se=ye?`Trait`:`Trait: ${r.traitTags.length===0?`none selected`:r.traitTags.join(`, `)}`,Ce=(0,U.jsx)(hs,{toggleValue:ye,iconOnly:!0,solo:!0,subtle:!0,toggleOnIcon:G.getCaretUp(),toggleOffIcon:G.getCaretDown(),onClick:(e=>xe(e)),children:(0,U.jsx)(U.Fragment,{})}),we=O_.getAllTraitTags(),Te=(t,n)=>{let i={type:z.Trait,tag:n};r.traitTags.indexOf(n)>-1?e(ti(i)):e(ei(i))},Ee=we.map(e=>(0,U.jsx)(Zp,{tipSearchTerm:e,className:a,toggleValue:r.traitTags.indexOf(e)>-1,subtle:!0,solo:!0,onClick:(t=>Te(t,e)),children:(0,U.jsx)(U.Fragment,{children:e})},e)),De=ye?(0,U.jsx)(`div`,{id:`type-selection`,className:`tag-button-wrapper`,children:Ee}):(0,U.jsx)(U.Fragment,{}),Oe=t=>{R.log(`MARMALADE`),e(oi()),e(si())},N=(0,U.jsx)(hs,{toggleValue:i.sortAscending,solo:!0,subtle:!0,noFade:!0,toggleOnIcon:G.getCaretUp(),toggleOnText:`Ascending`,toggleOffIcon:G.getCaretDown(),toggleOffText:`Descending`,onClick:(e=>Oe(e)),children:(0,U.jsx)(U.Fragment,{})}),ke=Object.entries(cr).map(([e,t])=>(0,U.jsx)(n_,{id:e,toggleValue:i.sortPropertyA===t,subtle:!0,solo:!0,noFade:!0,onClick:(e=>Ae(e,t)),children:(0,U.jsx)(U.Fragment,{children:t})},e)),Ae=(t,n)=>{e(ai(n))},je=(0,U.jsx)(U.Fragment,{children:ke}),Me=n=>{R.log(`filterMonstersClick`);let i=O_.getFilteredMonsterList(k_(t,r));e(Zr(i))},Ne=n=>{R.log(`singleMonstersClick`);let i=O_.getFilteredMonsterList(k_(t,r),1);e(Zr(i))},Pe=t=>{R.log(`clearFiltersClick`),e(ni())},Fe=[{name:`Name`,propertyName:`name`,isFixed:!0},{name:`Page`,propertyName:`page`,isFixed:!1},{name:`LV`,propertyName:`level`,isFixed:!1},{name:`Stat Block`,propertyName:`statblock`,isFixed:!0,smallerText:!0}],Ie=A_(n,i),Le={id:Ie.id,key:Ie.id,title:`MONSTERS (${Ie.monsters.length})`,columns:Fe,rowData:Ie.monsters,doSortRows:!1};return(0,U.jsx)(vg,{toolName:I.MonsterReference,children:(0,U.jsx)(yg,{children:(0,U.jsxs)(`div`,{children:[(0,U.jsx)(`h2`,{children:`Monster Filter`}),(0,U.jsx)(`div`,{id:`monster-source-selection`,className:`pt-3`,children:c}),(0,U.jsxs)(`div`,{id:`monster-level-selection`,className:`pt-2`,children:[(0,U.jsx)(`label`,{className:`tool-input-label`,children:`Monster Level from`}),(0,U.jsx)(`select`,{id:`monster-level-lower`,name:`Low Monster Level`,value:r.levelRange.lower,className:`monster-level`,onChange:u,children:l}),(0,U.jsx)(`label`,{className:`tool-input-label`,children:`\xA0\xA0to`}),(0,U.jsx)(`select`,{id:`monster-level-upper`,name:`Upper Monster Level`,value:r.levelRange.upper,className:`monster-level`,onChange:d,children:l})]}),(0,U.jsxs)(`div`,{id:`keyword-entry`,className:`pt-2`,children:[(0,U.jsx)(`label`,{className:`tool-input-label`,children:`Keywords`}),(0,U.jsx)(`input`,{className:`keywords-input`,placeholder:`space separated keywords`,value:r.keywords.join(` `),onChange:t=>{e(ri(t.target.value.split(` `)))}})]}),(0,U.jsxs)(`div`,{id:`environment-selection`,className:`pt-2`,children:[(0,U.jsx)(`label`,{className:`tool-input-label font-medium`,children:`Environment`}),(0,U.jsx)(`div`,{id:`environment-buttons`,className:`tag-button-wrapper`,children:h})]}),(0,U.jsxs)(`div`,{id:`process-description`,className:`pt-2 pb-2`,children:[(0,U.jsx)(`span`,{className:`font-medium`,children:`Filtered monsters will`}),(0,U.jsxs)(`ul`,{className:`pl-3`,children:[(0,U.jsx)(`li`,{children:`be within the level range, if specified,`}),(0,U.jsxs)(`li`,{children:[`contain `,(0,U.jsx)(`u`,{children:`one of the keywords`}),`,`]}),(0,U.jsxs)(`li`,{children:[`and be tagged with `,(0,U.jsx)(`u`,{children:`one of the environments`}),` selected.`]})]}),`They will also have `,(0,U.jsx)(`u`,{children:`at least one selected keyword from each category`}),` below. E.g., selecting `,(0,U.jsx)(`i`,{children:`grab`}),` and `,(0,U.jsx)(`i`,{children:`poison`}),` from `,(0,U.jsx)(`b`,{children:`Attack`}),`, and `,(0,U.jsx)(`i`,{children:`immobilize`}),` and `,(0,U.jsx)(`i`,{children:`reduced to zero HP`}),` from `,(0,U.jsx)(`b`,{children:`Effect`}),`, yields monsters that have at least one of those Attacks `,(0,U.jsx)(`b`,{children:`AND`}),` one of those Effects.`]}),(0,U.jsxs)(`div`,{id:`monster-type-selection`,className:`button-wrapper`,children:[A,(0,U.jsx)(`label`,{className:`tool-input-label font-medium`,children:se})]}),ue,(0,U.jsxs)(`div`,{id:`monster-movement-selection`,className:`button-wrapper`,children:[b,(0,U.jsx)(`label`,{className:`tool-input-label font-medium`,children:y})]}),w,(0,U.jsxs)(`div`,{id:`monster-attack-selection`,className:`button-wrapper`,children:[te,(0,U.jsx)(`label`,{className:`tool-input-label font-medium`,children:D})]}),ae,(0,U.jsxs)(`div`,{id:`monster-effect-selection`,className:`button-wrapper`,children:[me,(0,U.jsx)(`label`,{className:`tool-input-label font-medium`,children:pe})]}),ve,(0,U.jsxs)(`div`,{id:`monster-trait-selection`,className:`button-wrapper`,children:[Ce,(0,U.jsx)(`label`,{className:`tool-input-label font-medium`,children:Se})]}),De,(0,U.jsxs)(`div`,{id:`monster-filter-buttons`,className:`button-wrapper pt-2`,children:[(0,U.jsx)(Qh,{primary:!0,solo:!0,onClick:Me,children:(0,U.jsx)(U.Fragment,{children:`Filter Monsters`})}),(0,U.jsx)(Qh,{primary:!0,solo:!0,onClick:Ne,children:(0,U.jsx)(U.Fragment,{children:`One Filtered Monster`})}),(0,U.jsx)(Qh,{secondary:!0,solo:!0,onClick:Pe,children:(0,U.jsx)(U.Fragment,{children:`Clear Filters`})})]}),(0,U.jsxs)(`div`,{id:`monster-sort-buttons`,className:`button-wrapper pt-2`,children:[N,je]}),(0,U.jsx)(`div`,{children:(0,U.jsx)(jg,{...Le})})]})})})}function M_(e,t){let n=new Ug;return n.sources=e,n.tierLower=t.tierRange.lower,n.tierUpper=t.tierRange.upper,n.classTags=t.classTags,n.durationTags=t.durationTags,n.rangeTags=t.rangeTags,n.keywordTags=t.keywordTags,n.archetypeTags=t.archetypeTags,n.searchTerms=t.searchTerms.join(` `),n}function N_(e,t){R.log(`------------- sortFoundSpells`,e,t);let n=[...e.spells];switch(t.sortPropertyA){case lr.ByName:n.sort((e,t)=>e.name.localeCompare(t.name));break;case lr.ByTier:n.sort((e,t)=>{let n=Number(e.tier)?Number(e.tier):0,r=Number(t.tier)?Number(t.tier):0;return n===r?0:n<r?-1:1});break;default:n.sort((e,t)=>e.name.localeCompare(t.name));break}t.sortAscending||n.reverse();let r=new Qa(n).getCleanType();return R.log(`------------- sortFoundSpells`,r),r}function P_(){let e=qp(),t=$(go),n=$(_o),r=$(vo),i=$(yo);R.log(`sortOptions: `,i);let a=`mr-2 mb-2`,o=Object.entries(Kn).map(([e,n])=>(0,U.jsx)(n_,{id:e,toggleValue:t[n],subtle:!0,solo:!0,onClick:(e=>s(e,n)),className:a,children:(0,U.jsx)(U.Fragment,{children:n})},e)),s=(t,n)=>{e(no(n))},c=(0,U.jsx)(`div`,{className:`tag-button-wrapper`,children:o}),l=ag.renderOptions(ig.getSpellTierOptionsWithIgnore()),u=t=>{let n=+t.currentTarget.value;e(ao(n))},d=t=>{let n=+t.currentTarget.value;e(oo(n))},f=Wg.classTags,p=(t,n)=>{let i={type:$a.Class,tag:n};r.classTags.indexOf(n)>-1?e(co(i)):e(so(i))},h=f.map(e=>(0,U.jsx)(n_,{className:a,toggleValue:r.classTags.indexOf(e)>-1,subtle:!0,solo:!0,onClick:(t=>p(t,e)),children:(0,U.jsx)(U.Fragment,{children:e})},e)),[g,_]=(0,m.useState)(!1),v=e=>{_(!g)},y=g?`Archetype`:`Archetype: ${r.archetypeTags}`,b=(0,U.jsx)(hs,{toggleValue:g,iconOnly:!0,solo:!0,subtle:!0,toggleOnIcon:G.getCaretUp(),toggleOffIcon:G.getCaretDown(),onClick:(e=>v(e)),children:(0,U.jsx)(U.Fragment,{})}),x=Wg.archetypes,S=(t,n)=>{let i={type:$a.Archetype,tag:n};r.archetypeTags.indexOf(n)>-1?e(co(i)):e(so(i))},C=x.map(e=>(0,U.jsx)(Zp,{tipSearchTerm:e,className:a,toggleValue:r.archetypeTags.indexOf(e)>-1,subtle:!0,solo:!0,onClick:(t=>S(t,e)),children:(0,U.jsx)(U.Fragment,{children:e})},e)),w=g?(0,U.jsx)(`div`,{id:`type-selection`,className:`tag-button-wrapper`,children:C}):(0,U.jsx)(U.Fragment,{}),[T,E]=(0,m.useState)(!1),ee=e=>{E(!T)},D=T?`Duration`:`Duration: ${r.durationTags.length===0?`none selected`:r.durationTags.join(`, `)}`,te=(0,U.jsx)(hs,{toggleValue:T,iconOnly:!0,solo:!0,subtle:!0,toggleOnIcon:G.getCaretUp(),toggleOffIcon:G.getCaretDown(),onClick:(e=>ee(e)),children:(0,U.jsx)(U.Fragment,{})}),ne=Wg.durationTags,re=(t,n)=>{let i={type:$a.Duration,tag:n};r.durationTags.indexOf(n)>-1?e(co(i)):e(so(i))},ie=ne.map(e=>(0,U.jsx)(n_,{className:a,toggleValue:r.durationTags.indexOf(e)>-1,subtle:!0,solo:!0,onClick:(t=>re(t,e)),children:(0,U.jsx)(U.Fragment,{children:e})},e)),ae=T?(0,U.jsx)(`div`,{id:`type-selection`,className:`tag-button-wrapper`,children:ie}):(0,U.jsx)(U.Fragment,{}),[O,k]=(0,m.useState)(!1),oe=e=>{k(!O)},se=O?`Range`:`Range: ${r.rangeTags.length===0?`none selected`:r.rangeTags.join(`, `)}`,A=(0,U.jsx)(hs,{toggleValue:O,iconOnly:!0,solo:!0,subtle:!0,toggleOnIcon:G.getCaretUp(),toggleOffIcon:G.getCaretDown(),onClick:(e=>oe(e)),children:(0,U.jsx)(U.Fragment,{})}),ce=Wg.rangeTags,le=(t,n)=>{console.log(`handleRangeTypesClick`);let i={type:$a.Range,tag:n};console.log(i),r.rangeTags.indexOf(n)>-1?(console.log(`removeFilterTag`),e(co(i))):(console.log(`addFilterTag`),e(so(i)))},j=ce.map(e=>(0,U.jsx)(Zp,{tipSearchTerm:e,className:a,toggleValue:r.rangeTags.indexOf(e)>-1,subtle:!0,solo:!0,onClick:(t=>le(t,e)),children:(0,U.jsx)(U.Fragment,{children:e})},e)),ue=O?(0,U.jsx)(`div`,{id:`type-selection`,className:`tag-button-wrapper`,children:j}):(0,U.jsx)(U.Fragment,{}),[M,de]=(0,m.useState)(!1),fe=e=>{de(!M)},pe=M?`Tag`:`Tag: ${r.keywordTags.length===0?`none selected`:r.keywordTags.join(`, `)}`,me=(0,U.jsx)(hs,{toggleValue:M,iconOnly:!0,solo:!0,subtle:!0,toggleOnIcon:G.getCaretUp(),toggleOffIcon:G.getCaretDown(),onClick:(e=>fe(e)),children:(0,U.jsx)(U.Fragment,{})}),he=Wg.keywordTags,ge=(t,n)=>{let i={type:$a.Keyword,tag:n};r.keywordTags.indexOf(n)>-1?e(co(i)):e(so(i))},_e=he.map(e=>(0,U.jsx)(Zp,{tipSearchTerm:e,className:a,toggleValue:r.keywordTags.indexOf(e)>-1,subtle:!0,solo:!0,onClick:(t=>ge(t,e)),children:(0,U.jsx)(U.Fragment,{children:e})},e)),ve=M?(0,U.jsx)(`div`,{id:`type-selection`,className:`tag-button-wrapper`,children:_e}):(0,U.jsx)(U.Fragment,{}),ye=t=>{R.log(`MARMALADE`),e(fo()),e(po())},be=(0,U.jsx)(hs,{toggleValue:i.sortAscending,solo:!0,subtle:!0,noFade:!0,toggleOnIcon:G.getCaretUp(),toggleOnText:`Ascending`,toggleOffIcon:G.getCaretDown(),toggleOffText:`Descending`,onClick:(e=>ye(e)),children:(0,U.jsx)(U.Fragment,{})}),xe=Object.entries(lr).map(([e,t])=>(0,U.jsx)(n_,{id:e,toggleValue:i.sortPropertyA===t,subtle:!0,solo:!0,noFade:!0,onClick:(e=>Se(e,t)),children:(0,U.jsx)(U.Fragment,{children:t})},e)),Se=(t,n)=>{e(uo(n))},Ce=(0,U.jsx)(U.Fragment,{children:xe}),we=n=>{R.log(`filterSpellsClick`);let i=Wg.getFilteredSpellList(M_(t,r));e(io(i))},Te=t=>{R.log(`clearFiltersClick`),e(V())},Ee=[{name:`Name`,propertyName:`name`,isFixed:!0},{name:`Class`,propertyName:`class`,isFixed:!0},{name:`Tier`,propertyName:`tier`,isFixed:!0},{name:`Range`,propertyName:`range`,isFixed:!1},{name:`Duration`,propertyName:`duration`,isFixed:!1},{name:`Description`,propertyName:`description`,isFixed:!1,smallerText:!0}],De=N_(n,i),Oe={id:De.id,key:De.id,title:`Spells (${De.spells.length})`,columns:Ee,rowData:De.spells,doSortRows:!1};return(0,U.jsx)(vg,{toolName:I.SpellReference,children:(0,U.jsx)(yg,{children:(0,U.jsxs)(`div`,{children:[(0,U.jsx)(`h2`,{children:`Spell Filter`}),(0,U.jsx)(`div`,{id:`spell-source-selection`,className:`pt-3`,children:c}),(0,U.jsx)(`div`,{id:`spell-class-selection`,className:`pt-2`,children:(0,U.jsx)(`div`,{id:`spell-class-buttons`,className:`tag-button-wrapper`,children:h})}),(0,U.jsxs)(`div`,{id:`spell-tier-selection`,className:`pt-2`,children:[(0,U.jsxs)(`label`,{className:`tool-input-label`,children:[(0,U.jsx)(`b`,{children:`Spell Tier`}),` from`]}),(0,U.jsx)(`select`,{id:`spell-tier-lower`,name:`Low Spell Tier`,value:r.tierRange.lower,className:`spell-tier`,onChange:u,children:l}),(0,U.jsx)(`label`,{className:`tool-input-label`,children:`\xA0\xA0to`}),(0,U.jsx)(`select`,{id:`spell-tier-upper`,name:`Upper Spell Tier`,value:r.tierRange.upper,className:`spell-tier`,onChange:d,children:l})]}),(0,U.jsxs)(`div`,{id:`search-terms-entry`,className:`pt-2`,children:[(0,U.jsx)(`label`,{className:`tool-input-label`,children:`Keywords`}),(0,U.jsx)(`input`,{className:`keywords-input`,placeholder:`space separated keywords`,value:r.searchTerms.join(` `),onChange:t=>{e(H(t.target.value.split(` `)))}})]}),(0,U.jsxs)(`div`,{id:`spell-archetype-selection`,className:`button-wrapper`,children:[b,(0,U.jsx)(`label`,{className:`tool-input-label font-medium`,children:y})]}),w,(0,U.jsxs)(`div`,{id:`process-description`,className:`pt-2 pb-2`,children:[(0,U.jsx)(`span`,{className:`font-medium`,children:`Filtered spells will`}),(0,U.jsxs)(`ul`,{className:`pl-3`,children:[(0,U.jsx)(`li`,{children:`be of the Class and within the tier range, if specified,`}),(0,U.jsxs)(`li`,{children:[`contain `,(0,U.jsx)(`u`,{children:`one of the keywords`}),` in the name or description,`]}),(0,U.jsxs)(`li`,{children:[`and be tagged with `,(0,U.jsx)(`u`,{children:`one of the archetypes`}),` selected.`]})]}),`They will also have `,(0,U.jsx)(`u`,{children:`at least one selected keyword from each category`}),` below. E.g., selecting `,(0,U.jsx)(`i`,{children:`near`}),` and `,(0,U.jsx)(`i`,{children:`close`}),` from `,(0,U.jsx)(`b`,{children:`Range`}),`, and `,(0,U.jsx)(`i`,{children:`fire`}),` and `,(0,U.jsx)(`i`,{children:`critical failure`}),` from `,(0,U.jsx)(`b`,{children:`Tags`}),`, yields spells that have at least one of those Ranges `,(0,U.jsx)(`b`,{children:`AND`}),` one of those Tags.`]}),(0,U.jsxs)(`div`,{id:`spell-duration-selection`,className:`button-wrapper`,children:[te,(0,U.jsx)(`label`,{className:`tool-input-label font-medium`,children:D})]}),ae,(0,U.jsxs)(`div`,{id:`spell-range-selection`,className:`button-wrapper`,children:[A,(0,U.jsx)(`label`,{className:`tool-input-label font-medium`,children:se})]}),ue,(0,U.jsxs)(`div`,{id:`spell-tag-selection`,className:`button-wrapper`,children:[me,(0,U.jsx)(`label`,{className:`tool-input-label font-medium`,children:pe})]}),ve,(0,U.jsxs)(`div`,{id:`spell-filter-buttons`,className:`button-wrapper pt-2`,children:[(0,U.jsx)(Qh,{primary:!0,solo:!0,onClick:we,children:(0,U.jsx)(U.Fragment,{children:`Filter Spells`})}),(0,U.jsx)(Qh,{secondary:!0,solo:!0,onClick:Te,children:(0,U.jsx)(U.Fragment,{children:`Clear Filters`})})]}),(0,U.jsxs)(`div`,{id:`spell-sort-buttons`,className:`button-wrapper pt-2`,children:[be,Ce]}),(0,U.jsx)(`div`,{children:(0,U.jsx)(jg,{...Oe})})]})})})}function F_(){let e=Xd(),t=[...e].reverse().find(e=>e.handle!==void 0),n=e.find(e=>e.handle?.hasSubNav===!0),r=t?.handle,i=n?.handle,a=i?.hasSubNav===!0,o=i?.subNavItems??[],s=n?.pathname??``;(0,m.useEffect)(()=>{let e=i?.sectionLabel,t=r?.pageLabel;if(e&&t){document.title=`Shadowdark Tools - ${e} - ${t}`;return}if(e){document.title=`Shadowdark Tools - ${e}`;return}document.title=`Shadowdark Tools`},[r?.pageLabel,i?.sectionLabel]);let c=a?`container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col gap-2`:`container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col gap-4`;return(0,U.jsxs)(U.Fragment,{children:[(0,U.jsxs)(`div`,{className:c,children:[(0,U.jsx)(`h1`,{className:`appTitleV2`,children:`Shadowdark Tools`}),(0,U.jsx)(jp,{}),a&&(0,U.jsx)(`nav`,{"aria-label":`Page sub-navigation`,className:`border-b border-gray-500 pb-2`,children:(0,U.jsx)(`ul`,{className:`flex flex-col sm:flex-row sm:gap-3 gap-1 flex-wrap list-none`,children:o.map(e=>(0,U.jsx)(`li`,{className:`list-none`,children:(0,U.jsx)(up,{to:`${s}/${e.to}`,className:({isActive:e,isPending:t})=>t?`whitespace-nowrap min-w-min border-b-2 mr-3`:e?`whitespace-nowrap min-w-min border-b-2 border-black mr-3 font-bold`:`whitespace-nowrap min-w-min border-b-2 border-gray-400 mr-3 font-normal`,children:e.label})},e.to))})}),(0,U.jsx)(hf,{})]}),(0,U.jsx)(Wp,{}),(0,U.jsx)(`br`,{}),(0,U.jsx)(`br`,{}),(0,U.jsx)(`br`,{})]})}function I_(e){let t=document.createElement(`textarea`);t.value=e,document.body.appendChild(t),t.select();try{let e=document.execCommand(`copy`)?`successful`:`unsuccessful`;R.log(`Copying text command was `+e)}catch{R.log(`Oops, unable to copy`)}document.body.removeChild(t)}function L_(e){let{id:t,heading:n,headerCells:r,children:i}=e,a=(0,U.jsx)(`tr`,{children:r.map((e,t)=>(0,U.jsx)(`th`,{children:e},`${t}${e}`))});return(0,U.jsxs)(`div`,{id:t,className:`flex-col w-full`,children:[(0,U.jsx)(`div`,{className:`w-full bg-gray-300 p-1 text-center`,children:n}),(0,U.jsxs)(`table`,{className:`table-auto w-full`,children:[(0,U.jsx)(`thead`,{children:a}),(0,U.jsx)(`tbody`,{children:i})]})]})}var R_=class{static EncounterFrequencyTable(){return(0,U.jsxs)(`div`,{className:`no-margin`,children:[(0,U.jsx)(`div`,{className:`no-margin w-full bg-gray-300 mt-2 p-1 text-center`,children:`FREQUENCY`}),(0,U.jsx)(`table`,{className:`table-auto w-full`,children:(0,U.jsxs)(`tbody`,{children:[(0,U.jsxs)(`tr`,{className:`border-y-2 border-black`,children:[(0,U.jsx)(`td`,{className:`pl-2`,children:`Unsafe`}),(0,U.jsx)(`td`,{children:`Every 3 rounds`})]}),(0,U.jsxs)(`tr`,{className:`border-b-2 border-black`,children:[(0,U.jsx)(`td`,{className:`pl-2`,children:`Risky`}),(0,U.jsx)(`td`,{children:`Every 2 rounds`})]}),(0,U.jsxs)(`tr`,{className:`border-b-2 border-black`,children:[(0,U.jsx)(`td`,{className:`pl-2`,children:`Deadly`}),(0,U.jsx)(`td`,{children:`Every round`})]})]})})]})}};function z_(){let e=qp(),[t,n]=(0,m.useState)(!1),[r,i]=(0,m.useState)(!1),a=$($i),o=$(ea),s=$(ta),c=ag.getRenderedSelectOptions(ig.getDiceWithNoneValues(),!1),l=t=>{R.log(`handleETDieChange`,t.currentTarget.value);let n=t.currentTarget.value;e(Xi(n))},u=ag.getRenderedSelectOptions(ig.getStatModifierValues(),!1);R.log(`RandomEncounter: renderedCharismaModifierOptions: `,u);let d=t=>{R.log(`handleCharismaChange`,t.currentTarget.value);let n=Zh.updateEncounterReaction(a,t.currentTarget.value);e(Gi(n))},f=t=>{R.log(`handleEncounterCheckClick`,t);let n=Zh.getRandomEncounter(a.charismaMod,s);e(Wi(n))},p=async t=>{R.log(`handleGetEncounterClick`,t);let n=Zh.getEncounter(a.charismaMod,s);e(Wi(n))},h=(0,U.jsxs)(`span`,{className:`text-lg text-right  whitespace-nowrap`,children:[`1d6 rolled: `,a.encounterRoll]}),g=`All is Quiet...`,_=null,v=a.encounterTableRoll===0?null:(0,U.jsxs)(`li`,{children:[(0,U.jsx)(`b`,{children:`Encounter Table Roll:`}),` `,a.encounterTableRoll]});a.encounterRoll===1&&(g=``,_=(0,U.jsx)(Tg,{heading:`Encounter!`,children:(0,U.jsxs)(`ul`,{className:`body-text text-left pl-4 list-disc`,children:[v,(0,U.jsxs)(`li`,{children:[(0,U.jsx)(`b`,{children:`Distance:`}),` `,a.distance]}),(0,U.jsxs)(`li`,{children:[(0,U.jsx)(`b`,{children:`Activity:`}),` `,a.activity]}),(0,U.jsxs)(`li`,{children:[(0,U.jsx)(`b`,{children:`Reaction:`}),` `,a.reaction]}),(0,U.jsxs)(`li`,{children:[(0,U.jsx)(`b`,{children:`CHA mod:`}),` `,a.charismaModText]}),(0,U.jsxs)(`li`,{children:[(0,U.jsx)(`b`,{children:`Treasure:`}),` `,a.treasure]})]})}));let y=e=>{R.log(`handleToggleEncounterLog`,e),n(!t)},b=(t,n)=>{e(qi(n))},x=[`Elapsed`,`Roll`,`ETRoll`,`Distance`,`Activity`,`Reaction`,`Treasure`,``],S=o.map((e,t)=>{let n=t===0?0:Math.floor(e.when-o[t-1].when)/1e3,r=Math.floor(n/60),i=Math.floor(n-r*60);return(0,U.jsxs)(`tr`,{className:`border-y-2 border-black`,children:[(0,U.jsx)(`td`,{className:`pl-4 text-sm`,children:i===0&&t===0?`start`:`${r}m ${i}s`}),(0,U.jsx)(`td`,{className:`pl-4 text-sm`,children:e.encounterRoll}),(0,U.jsx)(`td`,{className:`pl-4 text-sm`,children:e.encounterRoll===1?e.encounterTableRoll:`--`}),(0,U.jsx)(`td`,{className:`pl-4 text-sm`,children:e.encounterRoll===1?e.distance:`--`}),(0,U.jsx)(`td`,{className:`pl-4 text-sm`,children:e.encounterRoll===1?e.activity:`--`}),(0,U.jsx)(`td`,{className:`pl-4 text-sm`,children:e.encounterRoll===1?e.reaction:`--`}),(0,U.jsx)(`td`,{className:`pl-4 text-sm`,children:e.encounterRoll===1?e.treasure:`--`}),(0,U.jsx)(`td`,{className:`pl-4 text-sm`,children:(0,U.jsx)(`button`,{className:`pt-2 text-xl rounded-r-lg px-1 text-gray-400  hover:text-black`,onClick:t=>b(t,e),children:(0,U.jsx)(Zs,{})})})]},e.id)});function C(e){R.log(`copyLog`,e);let t=document.getElementById(`Encounter Check Log`)?.innerText;R.log(`JUNKO = ${t}`),I_(t)}let w=e=>{R.log(`handleToggleEncounterLog`,e),i(!r)},T=t=>{R.log(`handleToggleEncounterLog`,t),e(Ji())},E=o.length===0||!t?null:(0,U.jsx)(L_,{id:`Encounter Check Log`,heading:`ENCOUNTER CHECK LOG`,headerCells:x,children:S}),ee=!t||o.length===0?null:(0,U.jsx)(Qh,{subtle:!0,lefttoright:!0,onClick:C,className:`ml-1 mb-4 justify-right`,children:(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(Ys,{}),`\xA0Copy`]})}),D=r?`Cancel`:`Clear`,te=!t||o.length===0?null:(0,U.jsx)(Qh,{subtle:!0,lefttoright:!0,onClick:w,className:`ml-1 mb-4 justify-right`,children:(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(Zs,{}),`\xA0`,D]})}),ne=!t||!r?null:(0,U.jsx)(Qh,{subtle:!0,lefttoright:!0,onClick:T,className:`ml-1 mb-4 justify-right`,children:(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(Zs,{}),`\xA0No, Really. Clear it.`]})}),re=r?null:(0,U.jsx)(Qh,{subtle:!0,lefttoright:!0,onClick:y,className:`mb-4`,children:(0,U.jsxs)(U.Fragment,{children:[`${t?`Hide`:`Show`}`,` Enounter Check Log (`,`${o.length} entries`,`)`]})}),ie=R_.EncounterFrequencyTable();return(0,U.jsxs)(vg,{toolName:I.RandomEncounter,children:[(0,U.jsxs)(`div`,{className:`flex`,children:[(0,U.jsxs)(Eg,{title:`Random Encounters`,special:ie,children:[(0,U.jsx)(`div`,{id:`encounter-table-die`,children:(0,U.jsxs)(`div`,{className:`pr-2 pt-4`,children:[(0,U.jsx)(`label`,{className:`tool-input`,children:`Encounter Table Die`}),(0,U.jsx)(`select`,{id:`encounter-table-die`,name:`encounter table die`,value:s,className:`encounter-die`,onChange:l,children:c})]})}),(0,U.jsxs)(`div`,{id:`encounter-check-button`,className:`button-wrapper`,children:[(0,U.jsx)(Qh,{primary:!0,solo:!0,onClick:f,children:(0,U.jsx)(U.Fragment,{children:`Encounter Check`})}),h]}),(0,U.jsx)(`div`,{id:`get-encounter-button`,className:`button-wrapper`,children:(0,U.jsx)(Qh,{primary:!0,solo:!0,onClick:p,children:(0,U.jsx)(U.Fragment,{children:`Get Encounter`})})}),(0,U.jsx)(`div`,{id:`charisma-modifier`,children:(0,U.jsxs)(`div`,{className:`px-2 pb-4`,children:[(0,U.jsx)(`label`,{className:`tool-input`,children:`CHA modifier`}),(0,U.jsx)(`select`,{id:`charisma modifier`,name:`charisma modifier`,value:a.charismaModText,className:`charisma-mod`,onChange:d,children:u})]})})]}),(0,U.jsx)(Dg,{title:g,children:_})]}),(0,U.jsxs)(`div`,{className:`flex`,children:[re,(0,U.jsx)(`div`,{className:`grow`}),ne,te,ee]}),(0,U.jsx)(yg,{children:E})]})}function B_(){return(0,U.jsx)(vg,{children:(0,U.jsxs)(`div`,{className:`flex`,children:[(0,U.jsx)(Eg,{title:`Torch Timer`,children:(0,U.jsx)(`div`,{children:`Coming soon.`})}),(0,U.jsx)(Dg,{})]})})}function V_(){return(0,U.jsxs)(`div`,{id:`session-page`,className:`flex flex-col justify-between gap-4`,children:[(0,U.jsx)(z_,{}),(0,U.jsx)(B_,{}),(0,U.jsx)(Og,{}),(0,U.jsx)(Kp,{})]})}var H_=ap(yf((0,U.jsx)(gf,{path:`/`,element:(0,U.jsx)(F_,{}),errorElement:(0,U.jsx)(Gp,{}),children:(0,U.jsxs)(gf,{errorElement:(0,U.jsx)(Gp,{}),children:[(0,U.jsx)(gf,{index:!0,element:(0,U.jsx)(Qg,{})}),(0,U.jsx)(gf,{path:`about`,element:(0,U.jsx)(ac,{})}),(0,U.jsx)(gf,{path:`gmtools`,element:(0,U.jsx)(Zg,{})}),(0,U.jsx)(gf,{path:`tools`,element:(0,U.jsx)(Zg,{})}),(0,U.jsx)(gf,{path:`session`,element:(0,U.jsx)(V_,{})}),(0,U.jsx)(gf,{path:`planning`,element:(0,U.jsx)(o_,{})}),(0,U.jsxs)(gf,{path:`reference`,element:(0,U.jsx)(g_,{}),handle:{hasSubNav:!0,sectionLabel:`Reference`,subNavItems:[{label:`Monster`,to:`monster`},{label:`Spell`,to:`spell`}]},children:[(0,U.jsx)(gf,{index:!0,element:(0,U.jsx)(__,{})}),(0,U.jsx)(gf,{path:`monster`,element:(0,U.jsx)(j_,{}),handle:{pageLabel:`Monster`}}),(0,U.jsx)(gf,{path:`spell`,element:(0,U.jsx)(P_,{}),handle:{pageLabel:`Spell`}}),(0,U.jsx)(gf,{path:`*`,element:(0,U.jsx)(mf,{to:`monster`,replace:!0})})]}),(0,U.jsx)(gf,{path:`resource`,element:(0,U.jsx)(v_,{})}),(0,U.jsx)(gf,{path:`resources`,element:(0,U.jsx)(v_,{})}),(0,U.jsx)(gf,{path:`privacy`,element:(0,U.jsx)(s_,{})})]})}))),U_=document.getElementById(`root`);if(!U_)throw Error(`root is null`);d_.createRoot(U_).render((0,U.jsx)(m.StrictMode,{children:(0,U.jsx)(D,{store:us,children:(0,U.jsx)(Ap,{router:H_})})}));