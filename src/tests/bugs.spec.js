import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {
	assignBug,
	getBugsAssignedToUser,
	getUnresolvedBugs,
	loadBugs,
	markResolveBug,
	postBug,
} from "../store/bugs";
import configureStore from "../store/configureStore";

describe("bugsSlice", () => {
	let store;
	let fakeAxios;

	beforeEach(() => {
		fakeAxios = new MockAdapter(axios);
		store = configureStore();
	});

	const getBugSlice = () => store.getState().entities.bugs;
	const createState = () => ({
		entities: {
			bugs: {
				list: [],
			},
		},
	});

	describe("post bugs to server", () => {
		it("should add new bug to the store if it's saved to the server", async () => {
			// Arrange
			const bug = { description: "a" };
			const fakeSavedBug = { ...bug, id: 1 };
			fakeAxios.onPost("/bugs").reply(200, fakeSavedBug);

			// Act
			await store.dispatch(postBug(bug));

			// Assert
			expect(getBugSlice().list).toContainEqual(fakeSavedBug);
		});

		it("shouldn't add bug to the store if it isn't saved to the server", async () => {
			// Arrange
			const bug = { description: "a" };
			fakeAxios.onPost("/bugs").reply(500);

			// Act
			await store.dispatch(postBug(bug));

			// Assert
			expect(getBugSlice().list).toHaveLength(0);
		});
	});

	describe("resolving bugs", () => {
		it("should resolve bug in the store if it is resolved by the server", async () => {
			// Arrange
			const bug = { id: 1, resolved: false };
			fakeAxios.onPost("/bugs").reply(200, bug);
			fakeAxios
				.onPatch(`/bugs/${bug.id}`)
				.reply(200, { ...bug, resolved: true });

			// Act
			await store.dispatch(postBug(bug));
			await store.dispatch(markResolveBug(bug.id));
			// Assert
			expect(getBugSlice().list[0].resolved).toBe(true);
		});

		it("shouldn't resolve bug in the store if it isn't resolved by the server", async () => {
			// Arrange
			const bug = { resolved: false, id: 1 };
			fakeAxios.onPost("/bugs").reply(200, bug);
			fakeAxios.onPatch(`/bugs/${bug.id}`).reply(500);

			// Act
			await store.dispatch(postBug(bug));
			await store.dispatch(markResolveBug(bug.id));
			// Assert
			expect(getBugSlice().list[0].resolved).toBe(false);
		});
	});

	describe("unresolved bugs", () => {
		it("should get all the unresolved bugs", async () => {
			// Arrange
			const state = createState();
			state.entities.bugs.list = [
				{ id: 1, description: "a", resolved: true },
				{ id: 2, description: "a", resolved: false },
				{ id: 3, description: "a", resolved: false },
				{ id: 4, description: "a", resolved: true, userId: 3 },
			];

			// Act
			const result = getUnresolvedBugs(state);

			// Assert
			expect(result).toHaveLength(2);
		});
	});

	describe("assign bugs", () => {
		it("get assigned bugs of a user", () => {
			const state = createState();
			state.entities.bugs.list = [
				{ id: 1, description: "a", resolved: true },
				{ id: 2, description: "a", resolved: false, userId: 2 },
				{ id: 3, description: "a", resolved: false, userId: 1 },
				{ id: 4, description: "a", resolved: true, userId: 1 },
			];
			const result = getBugsAssignedToUser(1)(state);
			expect(result.length).toBe(2);
		});

		describe("assign bugs to user", () => {
			it("when server sends data", async () => {
				// Arrange
				const bug = { id: 1 };
				const useraddedBug = { ...bug, userId: 1 };
				fakeAxios.onPost(`/bugs`).reply(200, bug);
				fakeAxios.onPatch(`/bugs/${bug.id}`).reply(200, useraddedBug);

				// Act
				await store.dispatch(postBug(bug));
				await store.dispatch(assignBug(useraddedBug.id, useraddedBug.userId));

				// Assert
				expect(getBugSlice().list[0].userId).toBe(useraddedBug.userId);
			});

			it("when server returns error", async () => {
				// Arrange
				const bug = { id: 1, userId: 5 };
				const useraddedBug = { ...bug, userId: 1 };
				fakeAxios.onPost(`/bugs`).reply(200, bug);
				fakeAxios.onPatch(`/bugs/${bug.id}`).reply(500);

				// Act
				await store.dispatch(postBug(bug));
				await store.dispatch(assignBug(useraddedBug.id, useraddedBug.userId));

				// Assert
				expect(getBugSlice().list[0].userId).toBe(bug.userId);
			});
		});
	});

	describe("loading bugs", () => {
		describe("when exists in cache", () => {
			it("should not be requested by the server", async () => {
				fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);
				await store.dispatch(loadBugs());
				await store.dispatch(loadBugs());
				expect(fakeAxios.history.get.length).toBe(1);
			});
		});

		describe("when doesn't exist in cache", () => {
			it("should fetch data from the server load bugs in the store if server sends data", async () => {
				// Arrange
				fakeAxios.onGet(`/bugs`).reply(200, [{ id: 1 }]);

				// Act
				await store.dispatch(loadBugs());

				// Assert
				expect(getBugSlice().list).toHaveLength(1);
			});

			describe("loading indicators", () => {
				it("loading is true when bugs are being fetched", () => {
					// Arrange
					fakeAxios.onGet(`/bugs`).reply(() => {
						expect(getBugSlice().loading).toBe(true);
						return [200, [{ id: 1 }]];
					});
					// Act
					store.dispatch(loadBugs());
				});

				it("loading is false after the bugs are fetched", async () => {
					// Arrange
					fakeAxios.onGet(`/bugs`).reply(200, [{ id: 1 }]);

					// Act
					await store.dispatch(loadBugs());
					// Assert
					expect(getBugSlice().loading).toBe(false);
				});

				it("loading is false is server returns error", async () => {
					// Arrange
					fakeAxios.onGet(`/bugs`).reply(500);
					// Act
					await store.dispatch(loadBugs());
					// Assert
					expect(getBugSlice().loading).toBe(false);
				});
			});
		});
	});
});
