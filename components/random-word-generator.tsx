'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RandomWord {
  word: string
  type: string
}

const API_KEY = 'YOUR_API_NINJA_KEY' // Replace with your actual API key

export default function RandomWordGenerator() {
  const [word, setWord] = useState<RandomWord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [wordType, setWordType] = useState<string>('any')

  const fetchRandomWord = async () => {
    setLoading(true)
    setError(null)
    try {
      const url = `https://api.api-ninjas.com/v1/randomword${wordType !== 'any' ? `?type=${wordType}` : ''}`
      const response = await fetch(url, {
        headers: {
          'X-Api-Key': API_KEY
        }
      })
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      setWord(data)
    } catch (err) {
      console.log(err)
      setError('An error occurred while fetching the data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomWord()
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Random Word Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select onValueChange={(value) => setWordType(value)} defaultValue="any">
            <SelectTrigger>
              <SelectValue placeholder="Select word type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="noun">Noun</SelectItem>
              <SelectItem value="verb">Verb</SelectItem>
              <SelectItem value="adjective">Adjective</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {word && !loading && !error && (
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-semibold">{word.word}</h2>
            <p className="text-lg text-gray-500 capitalize">{word.type}</p>
          </div>
        )}
        <Button 
          onClick={fetchRandomWord} 
          className="w-full mt-4"
          disabled={loading}
        >
          Generate New Word
        </Button>
      </CardContent>
    </Card>
  )
}