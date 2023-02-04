export const getCardId = (card: Element): number | null => {
  const idElement = card.querySelector('.Card__id')
	const rawId = idElement?.textContent
  return rawId ? parseInt(rawId.slice(1)) : null
}

export const getCardName = (card: Element): string | null => {
  const nameElement = card.querySelector('.Card__heading')
  return nameElement ? nameElement.textContent : null
}
