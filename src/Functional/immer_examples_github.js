import produce from "immer";

// object mutations
const todosObj = {
	id1: { done: false, body: "Take out the trash" },
	id2: { done: false, body: "Check Email" },
};

// add
const addedTodosObj = produce(todosObj, draft => {
	draft["id3"] = { done: false, body: "Buy bananas" };
});

// delete
const deletedTodosObj = produce(todosObj, draft => {
	delete draft["id1"];
});

// update
const updatedTodosObj = produce(todosObj, draft => {
	draft["id1"].done = true;
});

// array mutations
const todosArray = [
	{ id: "id1", done: false, body: "Take out the trash" },
	{ id: "id2", done: false, body: "Check Email" },
];

// add
const addedTodosArray = produce(todosArray, draft => {
	draft.push({ id: "id3", done: false, body: "Buy bananas" });
});

// delete
const deletedTodosArray = produce(todosArray, draft => {
	draft.splice(
		draft.findIndex(todo => todo.id === "id1"),
		1
	);
	import produce from "immer";

	// object mutations
	const todosObj = {
		id1: { done: false, body: "Take out the trash" },
		id2: { done: false, body: "Check Email" },
	};

	// add
	const addedTodosObj = produce(todosObj, draft => {
		draft["id3"] = { done: false, body: "Buy bananas" };
	});

	// delete
	const deletedTodosObj = produce(todosObj, draft => {
		delete draft["id1"];
	});

	// update
	const updatedTodosObj = produce(todosObj, draft => {
		draft["id1"].done = true;
	});

	// array mutations
	const todosArray = [
		{ id: "id1", done: false, body: "Take out the trash" },
		{ id: "id2", done: false, body: "Check Email" },
	];

	// add
	const addedTodosArray = produce(todosArray, draft => {
		draft.push({ id: "id3", done: false, body: "Buy bananas" });
	});

	// delete
	const deletedTodosArray = produce(todosArray, draft => {
		draft.splice(
			draft.findIndex(todo => todo.id === "id1"),
			1
		);
	});

	// update
	const updatedTodosArray = produce(todosArray, draft => {
		draft[draft.findIndex(todo => todo.id === "id1")].done = true;
	});
	// return draft.filter(bug => bug.id !== 1);
});

// update
const updatedTodosArray = produce(todosArray, draft => {
	draft[draft.findIndex(todo => todo.id === "id1")].done = true;
});
