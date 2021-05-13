import {
	postBug,
	addBug,
	bugsRequested,
	bugsRequestFailed,
} from "../store/bugs";
import { apicallBegan } from "../store/api";

describe("bugs", () => {
	describe("action creators test", () => {
		it("add bug test", () => {
			const data = { description: "a" };
			const result = postBug(data);
			const expectedResult = {
				type: apicallBegan.type,
				payload: {
					url: "/bugs",
					method: "post",
					data,
					onSuccess: addBug.type,
					onRequest: bugsRequested.type,
					onError: bugsRequestFailed.type,
				},
			};

			expect(result).toEqual(expectedResult);
		});
	});
});
