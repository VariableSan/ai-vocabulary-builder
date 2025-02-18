import { defineStore } from 'pinia'
import type { Grade } from 'ts-fsrs'
import { createEmptyCard, FSRS, generatorParameters } from 'ts-fsrs'
import { FSRS_PARAMETERS, type Card } from '~/shared'
import { IndexedDBStorage } from '~/shared/storage/services/indexeddb'

export const useCardStore = defineStore('cards', () => {
	const storage = new IndexedDBStorage()
	const fsrs = new FSRS(generatorParameters(FSRS_PARAMETERS))

	const cards = ref<Card[]>([])
	const loading = ref(false)

	async function init() {
		loading.value = true
		try {
			await storage.init()
			await loadCards()
		} catch (e) {
			console.error(e)
		} finally {
			loading.value = false
		}
	}

	async function loadCards() {
		cards.value = await storage.getCards()
	}

	async function addCard(front: string, back: string) {
		const date = new Date()

		const card: Card = {
			...createEmptyCard(),
			id: crypto.randomUUID(),
			front,
			back,
			created: date.getTime(),
			modified: date.getTime(),
		}

		await storage.saveCard(card)
		cards.value.push(card)
	}

	async function reviewCard(cardId: string, grade: Grade) {
		// TODO: optimize this
		const card = cards.value.find((c) => c.id === cardId)
		if (!card) return

		const dateNow = Date.now()
		const newState = fsrs.next(card, dateNow, grade)
		const updatedCard: Card = {
			...card,
			...newState.card,
			modified: dateNow,
		}

		await storage.saveCard(updatedCard)
		Object.assign(card, updatedCard)
	}

	async function clearDatabase() {
		try {
			await storage.clearDatabase()
			cards.value = []
		} catch (e) {
			console.error(e)
		}
	}

	return {
		cards,
		loading,
		init,
		addCard,
		reviewCard,
		loadCards,
		clearDatabase,
	}
})
