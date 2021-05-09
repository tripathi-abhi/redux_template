import { Map } from "immutable";

const immute = str => {
	return str.split(".");
};

let immutableMap = Map({
	name: {
		first: "Abhishek",
		last: {
			value: "Tripathi",
		},
	},
	Address: {
		city: "Varanasi",
		country: "India",
	},
});
immutableMap = immutableMap.setIn(immute("name.last.value"), "changed");
console.log(immutableMap.toJS());
