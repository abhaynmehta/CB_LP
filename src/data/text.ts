// Split a word into letter spans (each knows its index) for the letter-by-letter rise and lean.
export const letters = (s: string) => s.split('').map((c, i) => `<span class="ch" style="--i:${i}">${c}</span>`).join('');
