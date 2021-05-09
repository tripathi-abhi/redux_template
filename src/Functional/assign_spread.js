const experimentObj = {
	name: {
		first: "Abhishek",
		last: "Tripathi",
	},
	adress: {
		country: "India",
		city: "Renukut",
	},
};

const updated = Object.assign({}, experimentObj, {
	name: Object.assign({}, experimentObj.name, { last: "last" }),
});

const updated = {
	...experimentObj,
	name: { ...experimentObj.name, last: "chnagedAgain" },
};

experimentObj.name.first = "changedagain"; // shallow copy. i.e, the updated and experimentObject share the same properties which are not changed.
experimentObj.adress.city = "changedaddress"; // address property is shared by both the objects.
console.log(updated);
console.log(experimentObj);
