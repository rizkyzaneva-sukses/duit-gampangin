/**
 * WhatsApp message parser — rule-based (regex + keyword)
 * Parse "makan siang 25rb" → { nominal: 25000, category: "Makan", confident: true }
 * 
 * Supported formats: 25rb, 25k, 25.000, 25ribu, 1,5jt, 1.500.000
 */

interface ParseResult {
  nominal: number | null
  category: string | null
  confident: boolean
  originalText: string
}

// Keyword → category mapping (default, can be extended per household via ParseRule)
const defaultCategoryKeywords: Record<string, string[]> = {
  'Makan': ['makan', 'makanan', 'food', 'gofood', 'grabfood', 'sarapan', 'siang', 'malam', 'nasi', 'ayam', 'mie', 'kopi', 'snack', 'jajan'],
  'Transport': ['bensin', 'bbm', 'grab', 'gojek', 'tol', 'parkir', 'bus', 'kereta', 'transport', 'ojek', 'taksi'],
  'Belanja Bulanan': ['belanja', 'supermarket', 'minimarket', 'indomaret', 'alfamart', 'pasar', 'sayur', 'buah'],
  'Listrik & Air': ['listrik', 'air', 'pdam', 'pln'],
  'Internet & Pulsa': ['pulsa', 'internet', 'wifi', 'data', 'kuota'],
  'Kondangan & Sumbangan': ['kondangan', 'sumbangan', 'hadiah', 'kado'],
}

/**
 * Parse nominal from text
 * Supports: 25rb, 25k, 25.000, 25ribu, 1,5jt, 1.500.000, 25000
 */
function parseNominal(text: string): number | null {
  // Remove spaces and normalize
  const clean = text.toLowerCase().replace(/\s+/g, '')

  // Pattern: number followed by multiplier
  const patterns = [
    { regex: /(\d+(?:[.,]\d+)?)\s*jt/i, multiplier: 1000000 },
    { regex: /(\d+(?:[.,]\d+)?)\s*juta/i, multiplier: 1000000 },
    { regex: /(\d+(?:[.,]\d+)?)\s*rb/i, multiplier: 1000 },
    { regex: /(\d+(?:[.,]\d+)?)\s*ribu/i, multiplier: 1000 },
    { regex: /(\d+(?:[.,]\d+)?)\s*k(?!\w)/i, multiplier: 1000 },
  ]

  for (const { regex, multiplier } of patterns) {
    const match = clean.match(regex)
    if (match) {
      const num = parseFloat(match[1].replace(',', '.'))
      return Math.round(num * multiplier)
    }
  }

  // Plain number with dots (e.g., 25.000 or 1.500.000)
  const dotMatch = clean.match(/^(\d{1,3}(?:\.\d{3})+)$/)
  if (dotMatch) {
    return parseInt(dotMatch[1].replace(/\./g, ''), 10)
  }

  // Plain number (e.g., 25000)
  const plainMatch = clean.match(/^(\d+)$/)
  if (plainMatch) {
    return parseInt(plainMatch[1], 10)
  }

  return null
}

/**
 * Guess category from keywords in text
 */
function guessCategory(text: string): { category: string | null; confident: boolean } {
  const lower = text.toLowerCase()

  for (const [category, keywords] of Object.entries(defaultCategoryKeywords)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        return { category, confident: true }
      }
    }
  }

  return { category: null, confident: false }
}

/**
 * Parse a WhatsApp message into a transaction
 */
export function parseWaMessage(text: string): ParseResult {
  const nominal = parseNominal(text)
  const { category, confident } = guessCategory(text)

  return {
    nominal,
    category,
    confident: nominal !== null && confident,
    originalText: text,
  }
}

/**
 * Check if message is a command
 */
export function isCommand(text: string): string | null {
  const lower = text.toLowerCase().trim()
  const commands = ['saldo', 'sisa anggaran', 'sisa', 'target', 'batal', 'help', 'bantuan']
  for (const cmd of commands) {
    if (lower === cmd || lower.startsWith(cmd + ' ')) return cmd
  }
  return null
}
