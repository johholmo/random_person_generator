'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RandomPerson {
  name: { first: string; last: string }
  email: string
  picture: { large: string }
  location: { city: string; country: string }
}

export function RandomPersonGeneratorComponent() {
  const [person, setPerson] = useState<RandomPerson | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRandomPerson = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://randomuser.me/api/')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      setPerson(data.results[0])
    } catch (err) {
      console.log(err)
      setError('An error occurred while fetching the data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomPerson()
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Random Person Generator</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {person && !loading && !error && (
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={person.picture.large} alt={`${person.name.first} ${person.name.last}`} />
              <AvatarFallback>{person.name.first[0]}{person.name.last[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{person.name.first} {person.name.last}</h2>
            <p className="text-sm text-gray-500">{person.email}</p>
            <p className="text-sm text-gray-500">{person.location.city}, {person.location.country}</p>
          </div>
        )}
        <Button 
          onClick={fetchRandomPerson} 
          className="w-full mt-4"
          disabled={loading}
        >
          Generate New Person
        </Button>
      </CardContent>
    </Card>
  )
}