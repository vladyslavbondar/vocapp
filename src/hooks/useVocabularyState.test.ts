import { renderHook, act } from "@testing-library/react";
import { useVocabularyState } from "./useVocabularyState";
import { VocabularyWord } from "../types";

describe("useVocabularyState", () => {
	const mockWords: VocabularyWord[] = [
		{ id: 1, originalWord: "hello", translations: "привіт" },
		{ id: 2, originalWord: "world", translations: "світ" },
		{ id: 3, originalWord: "test", translations: "тест" },
	];

	it("should initialize with empty array when no initial words provided", () => {
		const { result } = renderHook(() => useVocabularyState());

		expect(result.current.words).toEqual([]);
		expect(result.current.currentWord).toBeUndefined();
		expect(result.current.isLastElement).toBe(false);
		expect(result.current.haveAllUpdated).toBe(false);
	});

	it("should initialize with shuffled words when initial words provided", () => {
		const { result } = renderHook(() => useVocabularyState(mockWords));

		expect(result.current.words.length).toBe(mockWords.length);
		expect(result.current.words).toEqual(expect.arrayContaining(mockWords));
		expect(result.current.currentWord).toBeDefined();
		expect(mockWords).toContainEqual(result.current.currentWord);
	});

	it("should move to next word correctly", () => {
		const { result } = renderHook(() => useVocabularyState(mockWords));
		const firstWord = result.current.currentWord;

		act(() => {
			result.current.next();
		});

		expect(result.current.currentWord).not.toEqual(firstWord);
	});

	it("should not move past the last word", () => {
		const { result } = renderHook(() => useVocabularyState(mockWords));

		// Move to last word
		act(() => {
			result.current.next();
			result.current.next();
		});

		const lastWord = result.current.currentWord;

		act(() => {
			result.current.next();
		});

		expect(result.current.currentWord).toEqual(lastWord);
		expect(result.current.isLastElement).toBe(true);
	});

	it("should move to previous word correctly", () => {
		const { result } = renderHook(() => useVocabularyState(mockWords));

		act(() => {
			result.current.next();
		});

		const secondWord = result.current.currentWord;

		act(() => {
			result.current.previous();
		});

		expect(result.current.currentWord).not.toEqual(secondWord);
	});

	it("should not move before the first word", () => {
		const { result } = renderHook(() => useVocabularyState(mockWords));
		const firstWord = result.current.currentWord;

		act(() => {
			result.current.previous();
		});

		expect(result.current.currentWord).toEqual(firstWord);
	});

	it("should update word correctly", () => {
		const { result } = renderHook(() => useVocabularyState(mockWords));
		const updatedWord = {
			...mockWords[0],
			translations: "updated translation",
		};

		act(() => {
			result.current.updateWord(updatedWord);
		});

		expect(result.current.words).toContainEqual(updatedWord);
	});

	it("should update and move to next word", () => {
		const { result } = renderHook(() => useVocabularyState(mockWords));
		const firstWord = result.current.currentWord;
		const updatedWord = { ...firstWord!, translations: "updated translation" };

		act(() => {
			result.current.updateAndNext(updatedWord);
		});

		expect(result.current.words).toContainEqual(updatedWord);
		expect(result.current.currentWord).not.toEqual(firstWord);
	});

	it("should set haveAllUpdated when updating last word", () => {
		const { result } = renderHook(() => useVocabularyState(mockWords));

		// Move to last word
		act(() => {
			result.current.next();
			result.current.next();
		});

		const lastWord = result.current.currentWord;
		const updatedWord = { ...lastWord!, translations: "updated translation" };

		act(() => {
			result.current.updateAndNext(updatedWord);
		});

		expect(result.current.haveAllUpdated).toBe(true);
	});

	it("should update all words correctly", () => {
		const { result } = renderHook(() => useVocabularyState(mockWords));
		const newWords: VocabularyWord[] = [
			{ id: 4, originalWord: "new", translations: "новий" },
			{ id: 5, originalWord: "words", translations: "слова" },
		];

		act(() => {
			result.current.resetVocabualryState(newWords);
		});

		expect(result.current.words.length).toBe(newWords.length);
		expect(result.current.words).toEqual(expect.arrayContaining(newWords));
		expect(result.current.haveAllUpdated).toBe(false);
	});
});
