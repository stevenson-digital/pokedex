import { hexToHsl } from '../helpers/colors.helper'
import { getAverageColor } from 'fast-average-color-node';
import type { Sprite } from '../components/Card.astro'

export interface PokeApiResponsePokemon {
	name: string
	url: string
}

interface PokeApiPokemonType {
	slot: number,
	type: {
		name: string,
		url: string
	}
}

export interface PokemonColors {
	colorLight: string
	colorDefault: string
	colorDark: string
}

export interface PokemonCard {
	id: number
	name: string
	sprites: Record<string, Sprite>
	types: string[]
	colors: PokemonColors
}

const getPokemonByName = async (pokeApiBaseUrl: string, name: string): Promise<any> => {
	const response = await fetch(`${pokeApiBaseUrl}/${name}`)
	
	if (response.ok) {
		const data = await response.json()
		return data
	} else {
		throw new Error(response.statusText)
	} 
}

export const getPokemonColors = async (spriteUrl: string): Promise<PokemonColors> => {
	const averageColor = await getAverageColor(spriteUrl)
	
	let colors = {
		colorLight: 'lightgrey',
		colorDefault: 'grey',
		colorDark: 'darkgrey'
	}
	
	if (averageColor.hex) {
		colors = hexToHsl(averageColor.hex)
	}

	return colors
}

const getPokemonCardsData = async (
	pokemon: PokeApiResponsePokemon[],
	pokeApiBaseUrl: string
): Promise<PokemonCard[]> => {
	const pokemonCards = pokemon.map(async (p): Promise<PokemonCard> => {
		const pokemonData = await getPokemonByName(pokeApiBaseUrl, p.name)
		let { id, name, sprites, types } = pokemonData

		const colors = await getPokemonColors(sprites.front_default)
		
		types = types.map((t: PokeApiPokemonType) => t.type.name)
		
		return { id, name, sprites, colors, types }
	});

	return Promise.all(pokemonCards)
}

export const getPokemonCards = async(
	pokeApiBaseUrl: string
): Promise<PokemonCard[]> => {
	const getAllKantoPokemon = await fetch(`${pokeApiBaseUrl}?limit=151`)
	const getAllKantoPokemonData = await getAllKantoPokemon.json()
	const allKantoPokemon = getAllKantoPokemonData.results as PokeApiResponsePokemon[]
	
	const resolvedPokemon = await getPokemonCardsData(
		allKantoPokemon,
		pokeApiBaseUrl
	)

	return resolvedPokemon
}
