import { isEven } from "./math";

describe("isEven", () => {
	it("should return true for even numbers", () => {
		expect(isEven(2)).toEqual(true);
	});

	it("should return false for odd numbers", () => {
		expect(isEven(3)).toEqual(false);
	});
});
