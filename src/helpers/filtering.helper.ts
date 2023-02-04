import { getCardId, getCardName } from "./cards.helpers"

interface FilterAndSortValues {
	sortBy: string | null
	filterType: string | null
}

interface getCardsToHideAndSortResponse {
	cardsToHide: Element[],
	cardsToSort: Element[]
}

const getCardsToHideAndSort = (cardElems: Element[], filterType: string) =>
  cardElems.reduce((result, cardElem: Element) => {
    const typeElems = cardElem.querySelectorAll('.Pill')
    const types = Array.prototype.map.call(typeElems, (typeElem: Element) => typeElem.textContent)
		
    if (types.includes(filterType)) {
      result.cardsToSort.push(cardElem)
    } else {
      result.cardsToHide.push(cardElem)
    }

    return result
  }, { cardsToHide: [], cardsToSort: [] } as getCardsToHideAndSortResponse)


const filterPokemonCards = (
	filterType: string,
	pokemonCardElems: Element[]
): Element[] => {
	if (filterType === 'all') {
		return pokemonCardElems
	}

  const { cardsToHide, cardsToSort } = getCardsToHideAndSort(pokemonCardElems, filterType)

  cardsToHide.forEach((cardElem: Element) => cardElem.classList.add('Pokedex__card--is-hidden'))

  return cardsToSort
}

const sortPokemonCards = (
	sortBy: string,
	pokemonCardElems: Element[],
	containerElem: Element
): void => {
  pokemonCardElems.sort((cardA: Element, cardB: Element) => {
    switch (sortBy) {
      case 'id-asc':
        return (getCardId(cardA) || Infinity) - (getCardId(cardB) || Infinity)
      case 'id-desc':
        return (getCardId(cardB) || Infinity) - (getCardId(cardA) || Infinity)
      case 'name-asc':
        return (getCardName(cardA) || '\0').localeCompare(getCardName(cardB) || '\0')
      case 'name-desc':
        return (getCardName(cardB) || '\0').localeCompare(getCardName(cardA) || '\0')
      default:
        // Return zero if no sort order is specified
        return 0
    }
  })

	const fragment = new DocumentFragment()
	pokemonCardElems.forEach((elem) => fragment.appendChild(elem))
	containerElem.appendChild(fragment)
}

export const filterAndSortPokemonCards = (
	sortBy: string,
	filterType: string,
	pokemonCardElems: NodeListOf<Element>
): Promise<void> => {
	return new Promise((resolve, reject) => {
		const cardsContainerElem = document.querySelector('.Pokedex__grid')
	
		if (cardsContainerElem) {
			const filteredPokemonCards = filterPokemonCards(filterType, Array.from(pokemonCardElems))
			sortPokemonCards(sortBy, filteredPokemonCards, cardsContainerElem)
			resolve()
		} else {
			reject(new Error('The element `Pokedex__grid` is either missing or has been renamed.'))
		}
	})
}

export const getUrlFilterValues = (): FilterAndSortValues => {
	const url = new URL(window.location.href)
	const searchParams = new URLSearchParams(url.search)
	const sortBy = searchParams.get('sortBy')
	const filterType = searchParams.get('filterType')

	return {
		sortBy,
		filterType
	}
}
