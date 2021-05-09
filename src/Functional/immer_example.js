import { produce } from "immer";

let profile = {
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
};

const updateName = obj => {
	return produce(obj, draft => {
		draft.name.first = "changed";
	});
};

console.log(updateName(profile));
