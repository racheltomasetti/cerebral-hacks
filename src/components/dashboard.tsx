'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home, Calendar, Utensils, Activity, Lightbulb, Send } from 'lucide-react'

// Mock data for the hormone trend graph
const hormoneData = [
  { day: 1, estrogen: 30, progesterone: 5, testosterone: 15 },
  { day: 7, estrogen: 100, progesterone: 5, testosterone: 20 },
  { day: 14, estrogen: 150, progesterone: 10, testosterone: 25 },
  { day: 21, estrogen: 80, progesterone: 120, testosterone: 18 },
  { day: 28, estrogen: 40, progesterone: 60, testosterone: 15 },
]

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Navigation */}
      <nav className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-primary mb-6">CycleSync</h2>
          <ul className="space-y-2">
            <NavItem icon={<Home size={20} />} label="Home" active />
            <NavItem icon={<Calendar size={20} />} label="Cycle Tracker" />
            <NavItem icon={<Utensils size={20} />} label="Nutrition" />
            <NavItem icon={<Activity size={20} />} label="Exercise" />
            <NavItem icon={<Lightbulb size={20} />} label="Insights" />
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-primary">Your Cycle Dashboard</h1>

        {/* Hormone Trend Graph */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Hormone Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hormoneData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" label={{ value: 'Day of Cycle', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Hormone Levels', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="estrogen" stroke="#8884d8" name="Estrogen" />
                <Line type="monotone" dataKey="progesterone" stroke="#82ca9d" name="Progesterone" />
                <Line type="monotone" dataKey="testosterone" stroke="#ffc658" name="Testosterone" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Widget title="Hormone Profile" content={<HormoneProfile />} />
          <Widget title="Nutrition" content={<NutritionWidget />} />
          <Widget title="Exercise" content={<ExerciseWidget />} />
          <Widget title="Productivity" content={<ProductivityWidget />} />
        </div>
      </main>

      {/* Chatbot Panel */}
      <aside className="w-80 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4 text-primary">CycleSync Assistant</h2>
        <div className="h-[calc(100vh-8rem)] overflow-auto mb-4 bg-gray-50 rounded p-2">
          {/* Chat messages would go here */}
        </div>
        <div className="flex">
          <Input placeholder="Ask a question..." className="flex-grow mr-2" />
          <Button size="icon">
            <Send size={20} />
          </Button>
        </div>
      </aside>
    </div>
  )
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <li>
      <a
        href="#"
        className={`flex items-center space-x-3 p-2 rounded-lg ${
          active ? 'bg-primary text-primary-foreground' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {icon}
        <span>{label}</span>
      </a>
    </li>
  )
}

function Widget({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )
}

function HormoneProfile() {
  return (
    <div>
      <p className="font-semibold">Current Phase: Follicular</p>
      <ul className="mt-2 space-y-1">
        <li>Estrogen: Rising</li>
        <li>Progesterone: Low</li>
        <li>Testosterone: Stable</li>
      </ul>
    </div>
  )
}

function NutritionWidget() {
  return (
    <div>
      <p className="mb-2">Recommended foods for your current phase:</p>
      <ul className="list-disc list-inside">
        <li>Leafy greens</li>
        <li>Berries</li>
        <li>Lean proteins</li>
      </ul>
    </div>
  )
}

function ExerciseWidget() {
  return (
    <div>
      <p className="mb-2">Today's recommended workout:</p>
      <p className="font-semibold">30 min High-Intensity Interval Training (HIIT)</p>
      <p className="text-sm text-gray-600 mt-1">Great for boosting energy and metabolism!</p>
    </div>
  )
}

function ProductivityWidget() {
  return (
    <div>
      <p className="mb-2">Productivity Tips:</p>
      <ul className="list-disc list-inside">
        <li>Focus on creative tasks</li>
        <li>Schedule important meetings</li>
        <li>Start new projects</li>
      </ul>
    </div>
  )
}