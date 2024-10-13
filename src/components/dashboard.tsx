'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home, Calendar, Utensils, Activity, Lightbulb, Send,Users, Settings, TrendingUp } from 'lucide-react'
import ChatbotMessages from './chatbot-messages'
import Aura from '@/components/aura.png'

// Mock data for the hormone trend graph
const hormoneData = [
  { day: 1, estrogen: 30, progesterone: 5},
  { day: 7, estrogen: 100, progesterone: 5},
  { day: 14, estrogen: 150, progesterone: 10},
  { day: 21, estrogen: 80, progesterone: 120},
  { day: 28, estrogen: 40, progesterone: 60},
]


export default function Dashboard() {
  return (
    <div className="flex h-screen bg-custom-color">
      {/* Side Navigation */}
      <nav className="w-64 bg-white shadow-md">
        <div className="p-4 pt-2">
          <div className="relative w-20 h-20">
          {/* Image */}
          <img 
            src={Aura.src}
            alt="Description" 
            className="w-full h-auto"
            width={50}
            height={50}
          />
          
          {/* Text overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold italic bg-black bg-opacity-50 p-4">
              ki
            </h2>
          </div>
        </div>
          <ul className="space-y-2">
            <NavItem icon={<Home size={20} />} label="Home" active />
            <NavItem icon={<Calendar size={20} />} label="Calendar" />
            <NavItem icon={<TrendingUp size={20} />} label="Trends" />
            <NavItem icon={<Users size={20} />} label="Community" />
            <NavItem icon={<Settings size={20} />} label="Settings" />
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto ">
        <h1 className="text-3xl font-bold mb-6 text-primary">Welcome Back, <em>Rachel!</em></h1>

        {/* Hormone Trend Graph */}
        <Card className="mb-6 bg-card shadow-xl">
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
                <Line type="monotone" dataKey="progesterone" stroke="#FF69B4" name="Progesterone" />
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
      <aside className="w-80 bg-white shadow-md p-4 ">
        <h2 className="text-xl font-bold mb-4 text-primary pl-10"><em>Understand Your Cycle</em></h2>
        <div className="h-[calc(100vh-8rem)] overflow-auto mb-4 bg-gray-50 rounded p-2">
          <ChatbotMessages />
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
    <Card className="shadow-2xl bg-card ">
      <CardHeader >
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