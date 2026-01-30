'use client'

import React, { useState } from 'react'

export default function MemberForm({ onAdd }: { onAdd: (name: string) => void }) {
  const [name, setName] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setName('')
  }

  return (
    <form onSubmit={submit} className="flex gap-2 mb-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do membro"
        className="border p-2 rounded flex-1"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">Adicionar</button>
    </form>
  )
}
