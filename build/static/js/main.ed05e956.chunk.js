(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),u=t.n(o),c=(t(20),t(2)),l=function(e){var n=e.filter,t=e.handleChange;return r.a.createElement("div",null,"filter by this text ",r.a.createElement("input",{value:n,onChange:t}))},i=function(e){var n=e.submitter,t=e.newName,a=e.handleNameChange,o=e.newNumber,u=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:o,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=function(e){var n=e.persons,t=e.filter,a=e.deletePerson;return r.a.createElement("div",null,""!==t?n.filter(function(e){return e.name.toLowerCase().includes(t)}).map(function(e){return r.a.createElement("p",{key:e.name},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return a(e)}},"delete"))}):n.map(function(e){return r.a.createElement("p",{key:e.name},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return a(e)}},"delete"))}))},m=t(3),d=t.n(m),f="/api/persons",b=function(e){return d.a.post(f,e).then(function(e){return e.data})},p=function(){return d.a.get(f).then(function(e){return e.data})},g=function(e){return d.a.delete("".concat(f,"/").concat(e)).then(function(e){console.log("delete request response ",e.data)})},h=function(e,n){return d.a.put("".concat(f,"/").concat(e),n).then(function(e){return console.log("update contact response ",e.data),e.data})},v=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"successMessage"},n)},E=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"errorMessage"},n)},w=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),m=Object(c.a)(u,2),d=m[0],f=m[1],w=Object(a.useState)(""),y=Object(c.a)(w,2),j=y[0],N=y[1],O=Object(a.useState)(""),C=Object(c.a)(O,2),k=C[0],S=C[1],x=Object(a.useState)(null),P=Object(c.a)(x,2),T=P[0],A=P[1],D=Object(a.useState)(null),J=Object(c.a)(D,2),M=J[0],q=J[1];Object(a.useEffect)(function(){p().then(function(e){o(e)})},[]);var B=function(e,n){n?(A(e),setTimeout(function(){A(null)},3e3)):(q(e),setTimeout(function(){q(null)},3e3))};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(v,{message:T}),r.a.createElement(E,{message:M}),r.a.createElement(l,{handleChange:function(e){f(e.target.value)},filter:d}),r.a.createElement("h2",null,"Add a new contact"),r.a.createElement(i,{submitter:function(e){e.preventDefault();var n={name:j,number:k},a=function(){return t.find(function(e){return e.name===n.name})};if(console.log("getting undefined means name doesnt exist yet ---\x3e",a()),""===j)return window.alert("Name spot is empty");if(""===k)return window.alert("Number spot is empty");if(void 0===a())console.log("name to add",n),b(n).then(function(e){console.log("added person",e),o(t.concat(e)),B("".concat(e.name," added successfully"),!0),N(""),S("")}).catch(function(e){console.log(e.response.data),B(e.response.data.error,!1)});else if(window.confirm("".concat(j," already exists. Do you want to update the number"))){var r=t.find(function(e){return j===e.name}).id;console.log("objToUpudate",r),h(r,n).then(function(e){return B("".concat(e.name,"'s new number ").concat(e.number," added successfully"),!0),o(t.map(function(n){return n.id!==r?n:e}))}).catch(function(e){B("".concat(j," has already been removed from server or the number belongs to someone else"),!1)})}},newName:j,handleNameChange:function(e){N(e.target.value),console.log(j)},newNumber:k,handleNumberChange:function(e){console.log(e.target.value),S(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(s,{persons:t,filter:d,deletePerson:function(e){window.confirm("Are you sure you want to delete ".concat(e.name))&&(console.log("delete person",e.id),g(e.id),B("".concat(e.name," deleted"),!0),o(t.filter(function(n){return n.id!==e.id})))}}))};u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.ed05e956.chunk.js.map